import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { SERVICE_DETAIL_SLUGS } from "@/data/servicesDetails";
import { sanityFetch } from "@/sanity/lib/fetch";

/**
 * Next.js App Router sitemap.xml generation
 * Lists all indexed public pages, dynamic service routes, and portfolio work routes for search engines.
 * Ensures resilient fallback to siteConfig.url if NEXT_PUBLIC_SITE_URL is not set.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url || "https://art-visual.vercel.app";
  const baseUrl = rawBaseUrl.replace(/\/+$/, "");
  const lastModified = new Date();

  // Static core routes with calibrated priority and changeFrequency
  const staticRouteConfigs: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/services", changeFrequency: "weekly", priority: 0.9 },
    { path: "/work", changeFrequency: "weekly", priority: 0.9 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  ];

  const mainPages: MetadataRoute.Sitemap = staticRouteConfigs.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Dynamic services routes (/services/[slug])
  const sanityServices = await sanityFetch<Array<{ slug?: string; _updatedAt?: string }>>({
    query: `*[_type == "serviceItem" && defined(slug.current)]{ "slug": slug.current, "_updatedAt": _updatedAt }`,
    fallback: [],
    tags: ["serviceItem"],
  });

  const serviceUpdatedAtMap = new Map<string, Date>();
  for (const item of sanityServices) {
    if (item.slug && item._updatedAt) {
      serviceUpdatedAtMap.set(item.slug, new Date(item._updatedAt));
    }
  }

  const allServiceSlugs = Array.from(
    new Set([
      ...SERVICE_DETAIL_SLUGS,
      ...sanityServices.map((s) => s.slug).filter((s): s is string => Boolean(s)),
    ])
  );

  const servicePages: MetadataRoute.Sitemap = allServiceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: serviceUpdatedAtMap.get(slug) || lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Support portfolio works or dynamic works if slugs exist
  const sanityWorks = await sanityFetch<Array<{ slug?: string; _updatedAt?: string }>>({
    query: `*[_type == "featuredWork" && defined(slug.current)]{ "slug": slug.current, "_updatedAt": _updatedAt }`,
    fallback: [],
    tags: ["featuredWork"],
  });

  const validWorkSlugs = sanityWorks
    .map((w) => ({
      slug: w.slug,
      lastModified: w._updatedAt ? new Date(w._updatedAt) : lastModified,
    }))
    .filter((w): w is { slug: string; lastModified: Date } => Boolean(w.slug));

  const workPages: MetadataRoute.Sitemap = validWorkSlugs.map((item) => ({
    url: `${baseUrl}/work/${item.slug}`,
    lastModified: item.lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...mainPages, ...servicePages, ...workPages];
}
