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

  // Determine Origin safely
  const origin = req.nextUrl.origin.replace("0.0.0.0", "localhost");
  const referer = req.headers.get("referer") || "";
  const secFetchSite = req.headers.get("sec-fetch-site");

  // Allow authorization via matching secret OR Studio navigation origin
  const isAuthorized =
    (providedSecret && secret && providedSecret === secret) ||
    referer.includes("/studio") ||
    referer.startsWith(origin) ||
    secFetchSite === "same-origin";

  if (!isAuthorized) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid or missing draft preview authorization." },
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

  return NextResponse.redirect(new URL(destination, origin));
}
