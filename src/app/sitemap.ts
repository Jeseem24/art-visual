import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Next.js App Router sitemap.xml generation
 * Lists all indexed public pages for search engines.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const lastModified = new Date();

  const publicRoutes = ["", "/about", "/services", "/work", "/contact"];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : 0.8,
  }));
}
