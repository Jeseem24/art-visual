import { draftMode } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const TYPE_REDIRECT_MAP: Record<string, string> = {
  homePage: "/",
  aboutPage: "/about",
  servicesPage: "/services",
  serviceItem: "/services",
  workPage: "/work",
  featuredWork: "/work",
  contactPage: "/contact",
  navbarSettings: "/",
  ctaBanner: "/",
  siteSettings: "/",
  testimonial: "/",
  faqItem: "/",
};

/**
 * GET /api/draft-mode/enable
 * Enables Next.js Draft Mode to preview unpublished Sanity drafts in a new tab.
 * Example: /api/draft-mode/enable?secret=...&type=featuredWork
 */
export async function GET(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const { searchParams } = req.nextUrl;
  const providedSecret = searchParams.get("secret");
  const docType = searchParams.get("type") || "homePage";
  const explicitPath = searchParams.get("path");

  // Validate Secret
  if (!secret || providedSecret !== secret) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid or missing draft preview secret." },
      { status: 401 }
    );
  }

  // Enable Draft Mode in Next.js (sets draft cookie)
  const draft = await draftMode();
  draft.enable();

  // Determine Redirect Target safely to prevent open redirect vulnerabilities
  let destination = "/";
  if (explicitPath && explicitPath.startsWith("/") && !explicitPath.startsWith("//") && !explicitPath.startsWith("/\\")) {
    destination = explicitPath;
  } else if (docType && TYPE_REDIRECT_MAP[docType]) {
    destination = TYPE_REDIRECT_MAP[docType];
  }

  // Determine host and protocol from request headers to prevent 0.0.0.0 redirection
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const cleanHost = host.replace("0.0.0.0", "localhost");
  const redirectTarget = `${proto}://${cleanHost}${destination}`;

  return NextResponse.redirect(new URL(redirectTarget));
}
