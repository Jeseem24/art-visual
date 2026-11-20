import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { SERVICE_DETAIL_SLUGS } from "@/data/servicesDetails";
import { sanityFetch } from "@/sanity/lib/fetch";

/**
 * Next.js App Router sitemap.xml generation
 * Lists all indexed public pages and dynamic service routes for search engines.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const lastModified = new Date();

  const staticRoutes = ["", "/about", "/services", "/work", "/contact"];

  const sanitySlugs = await sanityFetch<Array<{ slug?: string }>>({
    query: `*[_type == "serviceItem" && defined(slug.current)]{ "slug": slug.current }`,
    fallback: [],
    tags: ["serviceItem"],
  });

  const allServiceSlugs = Array.from(
    new Set([
      ...SERVICE_DETAIL_SLUGS,
      ...sanitySlugs.map((s) => s.slug).filter((s): s is string => Boolean(s)),
    ])
  );

  const mainPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : 0.8,
  }));

  const servicePages: MetadataRoute.Sitemap = allServiceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...mainPages, ...servicePages];
}
