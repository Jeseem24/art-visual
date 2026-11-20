import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export const runtime = "nodejs";

interface SanityWebhookBody {
  _id?: string;
  _type?: string;
  slug?: { current?: string } | string;
}

interface InvalidationTarget {
  tags: string[];
  paths: { path: string; type?: "page" | "layout" }[];
}

/**
 * Route & Tag Invalidation Mapping
 * Directs incoming document types to their exact affected cache tags and routes.
 */
const TYPE_TARGET_MAP: Record<string, InvalidationTarget> = {
  homePage: {
    tags: ["homePage"],
    paths: [{ path: "/", type: "page" }],
  },
  aboutPage: {
    tags: ["aboutPage"],
    paths: [{ path: "/about", type: "page" }],
  },
  servicesPage: {
    tags: ["servicesPage"],
    paths: [{ path: "/services", type: "page" }],
  },
  serviceItem: {
    tags: ["serviceItem", "servicesPage"],
    paths: [
      { path: "/services", type: "page" },
      { path: "/", type: "page" },
    ],
  },
  workPage: {
    tags: ["workPage"],
    paths: [{ path: "/work", type: "page" }],
  },
  featuredWork: {
    tags: ["featuredWork", "workPage"],
    paths: [
      { path: "/work", type: "page" },
      { path: "/", type: "page" },
      { path: "/about", type: "page" },
    ],
  },
  testimonial: {
    tags: ["testimonial"],
    paths: [
      { path: "/", type: "page" },
      { path: "/about", type: "page" },
    ],
  },
  faqItem: {
    tags: ["faqItem"],
    paths: [{ path: "/", type: "page" }],
  },
  contactPage: {
    tags: ["contactPage"],
    paths: [{ path: "/contact", type: "page" }],
  },
  navbarSettings: {
    tags: ["navbarSettings", "layout"],
    paths: [{ path: "/", type: "layout" }],
  },
  ctaBanner: {
    tags: ["ctaBanner", "layout"],
    paths: [{ path: "/", type: "layout" }],
  },
  siteSettings: {
    tags: ["siteSettings", "layout"],
    paths: [{ path: "/", type: "layout" }],
  },
};

/**
 * POST /api/revalidate
 * Handles webhook notifications from Sanity Content Lake.
 * Verifies cryptographic HMAC SHA-256 signature and purges affected tags/paths.
 */
export async function POST(req: NextRequest) {
  try {
    const secret =
      process.env.SANITY_REVALIDATE_SECRET || "artvisual_prod_reval_9b7c841f3e2a05d6";

    if (!secret) {
      console.error("[Revalidate API] Missing SANITY_REVALIDATE_SECRET environment variable.");
      return NextResponse.json(
        { message: "Server misconfiguration: SANITY_REVALIDATE_SECRET is missing." },
        { status: 500 }
      );
    }

    const { isValidSignature, body } = await parseBody<SanityWebhookBody>(
      req,
      secret,
      true // waitForContentLakeEventualConsistency
    );

    if (!isValidSignature) {
      console.warn("[Revalidate API] Request rejected: Invalid HMAC signature.");
      return NextResponse.json(
        { message: "Invalid signature." },
        { status: 401 }
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: "Bad request: missing document _type in payload." },
        { status: 400 }
      );
    }

    const docType = body._type;
    const target = TYPE_TARGET_MAP[docType];
    const slug = typeof body.slug === "string" ? body.slug : body.slug?.current;

    const purgedTags: string[] = [];
    const purgedPaths: string[] = [];

    if (target) {
      // 1. Purge specific cache tags
      for (const tag of target.tags) {
        revalidateTag(tag, "max");
        purgedTags.push(tag);
      }

      // 2. Purge corresponding user-facing routes
      for (const { path, type } of target.paths) {
        revalidatePath(path, type);
        purgedPaths.push(type ? `${path} (${type})` : path);
      }

      // 3. Purge dynamic slug-specific paths and tags if present
      if (slug) {
        revalidateTag(slug, "max");
        purgedTags.push(slug);

        if (docType === "serviceItem") {
          const servicePath = `/services/${slug}`;
          revalidatePath(servicePath, "page");
          purgedPaths.push(`${servicePath} (page)`);
        }
      }
    } else {
      // Fallback: Unknown document type purges global layout to ensure consistency
      revalidatePath("/", "layout");
      purgedPaths.push("/ (layout fallback)");
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      documentType: docType,
      purgedTags,
      purgedPaths,
      now: Date.now(),
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("[Revalidate API] Error processing revalidation webhook:", err);
    return NextResponse.json(
      { message: "Internal server error.", error: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * GET /api/revalidate
 * Authenticated manual trigger for testing or admin manual cache invalidation.
 * Example: GET /api/revalidate?secret=...&tag=homePage
 */
export async function GET(req: NextRequest) {
  const secret =
    process.env.SANITY_REVALIDATE_SECRET || "artvisual_prod_reval_9b7c841f3e2a05d6";
  const providedSecret = req.nextUrl.searchParams.get("secret");

  if (!secret || providedSecret !== secret) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid or missing secret." },
      { status: 401 }
    );
  }

  const tag = req.nextUrl.searchParams.get("tag");
  const path = req.nextUrl.searchParams.get("path");

  if (tag) {
    revalidateTag(tag, "max");
    return NextResponse.json({ revalidatedTag: tag, now: Date.now() });
  }

  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidatedPath: path, now: Date.now() });
  }

  // Purge entire site layout if neither is specified
  revalidatePath("/", "layout");
  return NextResponse.json({ revalidatedAll: true, now: Date.now() });
}
