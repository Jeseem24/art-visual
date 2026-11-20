import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Next.js App Router robots.txt generation
 * Controls search engine crawler behavior:
 * - Configures dedicated userAgent directives for major search engines (Googlebot, Bingbot, Applebot, *).
 * - Disallows private studio, internal API routes, and draft-mode preview endpoints.
 * - Points crawlers to the canonical absolute sitemap URL with resilient siteConfig fallback.
 * - Declares the canonical host domain.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url).replace(/\/+$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/", "/api/", "/draft-mode/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
