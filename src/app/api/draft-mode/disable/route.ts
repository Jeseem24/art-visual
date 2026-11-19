import { draftMode } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * GET /api/draft-mode/disable
 * Disables Next.js Draft Mode and redirects back to standard published viewing.
 */
export async function GET(req: NextRequest) {
  const draft = await draftMode();
  draft.disable();

  const rawRedirect = req.nextUrl.searchParams.get("redirect") || "/";
  const redirectUrl = (rawRedirect.startsWith("/") && !rawRedirect.startsWith("//") && !rawRedirect.startsWith("/\\"))
    ? rawRedirect
    : "/";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const cleanHost = host.replace("0.0.0.0", "localhost");
  const target = `${proto}://${cleanHost}${redirectUrl}`;

  const response = NextResponse.redirect(new URL(target));
  
  // Explicitly clear both draft cookies across entire domain
  response.cookies.set("__prerender_bypass", "", { path: "/", maxAge: 0 });
  response.cookies.set("__next_preview_data", "", { path: "/", maxAge: 0 });

  return response;
}
