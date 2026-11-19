import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Next.js App Router robots.txt generation
 * Controls search engine crawler behavior:
 * - Allows indexing of all public marketing pages.
 * - Explicitly blocks all search crawlers from /studio and /api routes.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/"],
      },
      {
        userAgent: ["Googlebot", "Bingbot", "Applebot"],
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
