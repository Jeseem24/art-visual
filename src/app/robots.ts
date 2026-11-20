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

  const disallowedPaths = [
    "/studio",
    "/studio/*",
    "/api/*",
    "/draft-mode/*",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: disallowedPaths,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
