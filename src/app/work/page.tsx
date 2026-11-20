import React from "react";
import type { Metadata } from "next";
import { WorkHeroSection } from "@/components/sections/work/WorkHeroSection";
import { WorkShowcaseSection } from "@/components/sections/work/WorkShowcaseSection";
import { CTABannerSection } from "@/components/sections/home/CTABannerSection";
import { BreadcrumbJsonLd, VideoObjectJsonLd } from "@/components/seo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { PORTFOLIO_WORKS_QUERY, WORK_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { siteConfig, formatSocialDescription } from "@/config/site";
import { WORK_PROJECTS, type WorkProjectItem, type WorkCategory } from "@/data/worksData";
import { WORK_HERO_DEFAULTS } from "@/components/sections/work/WorkHeroSection/constants";
import styles from "./WorkPage.module.css";

/**
 * Dynamic SEO metadata for the Work / Portfolio page.
 * Synchronizes with Sanity Work Page data, projects catalog, and Site Settings.
 */
export async function generateMetadata(): Promise<Metadata> {
  const [pageData, siteSettings, rawProjects] = await Promise.all([
    sanityFetch<WorkPageCmsData | null>({
      query: WORK_PAGE_QUERY,
      fallback: null,
      tags: ["workPage"],
    }),
    sanityFetch<{
      brandName?: string;
      metaKeywords?: string[];
      ogImageUrl?: string;
    } | null>({
      query: SITE_SETTINGS_QUERY,
      fallback: null,
      tags: ["siteSettings", "workPage"],
    }),
    sanityFetch<readonly WorkProjectCmsItem[]>({
      query: PORTFOLIO_WORKS_QUERY,
      fallback: WORK_PROJECTS,
      tags: ["featuredWork", "workPage"],
    }),
  ]);

  const rawBrand = siteSettings?.brandName || siteConfig.name;
  const brandName = rawBrand.toLowerCase() === "art visual" ? "Art Visual" : rawBrand;
  const pageTitle = pageData?.seoTitle || "Our Work";
  const fullTitle = `${pageTitle} | ${brandName}`;

  const description =
    pageData?.seoDescription ||
    pageData?.heroSubtitle ||
    "Explore our creative portfolio of brand films, commercials, product videos, and visual stories crafted with creativity and passion.";

  const projectKeywords = rawProjects
    .slice(0, 8)
    .map((p) => p.projectName || p.title)
    .filter((title): title is string => Boolean(title))
    .map((t) => `${t.toLowerCase()} film`);

  const portfolioKeywords = [
    ...(pageData?.seoKeywords || []),
    "video production portfolio",
    "commercial showreel",
    "brand film portfolio",
    "client video showcase",
    "product commercial examples",
    "corporate films Chennai",
    "cinematography portfolio",
    "commercial director showreel",
    "high impact video case studies",
    ...projectKeywords,
    ...(siteSettings?.metaKeywords || []),
  ];

  const ogImageUrl = pageData?.ogImageUrl || siteSettings?.ogImageUrl || "/opengraph-image";
  const socialDescription = formatSocialDescription(description);

  return {
    title: pageTitle,
    description,
    keywords: Array.from(new Set(portfolioKeywords)),
    alternates: {
      canonical: "/work",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/work",
      siteName: brandName,
      title: fullTitle,
      description: socialDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${brandName} Portfolio of Commercial Films & Brand Videos`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: socialDescription,
      creator: "@artvisual",
      images: [ogImageUrl],
    },
  };
}

interface WorkPageCmsData {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogImageUrl?: string;
  ogImageAlt?: string;
  heroHeadlineLine1?: string;
  heroHeadlineLine2Prefix?: string;
  heroHeadlineLine2Highlight?: string;
  heroSubtitle?: string;
  categories?: string[];
}

interface WorkProjectCmsItem {
  id?: string;
  projectName?: string;
  title?: string;
  category?: Exclude<WorkCategory, "All Projects">;
  brandName?: string;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
}

export const revalidate = 10;

export default async function WorkPage() {
  const [pageData, rawProjects] = await Promise.all([
    sanityFetch<WorkPageCmsData | null>({
      query: WORK_PAGE_QUERY,
      fallback: null,
      tags: ["workPage"],
    }),
    sanityFetch<readonly WorkProjectCmsItem[]>({
      query: PORTFOLIO_WORKS_QUERY,
      fallback: WORK_PROJECTS,
      tags: ["featuredWork", "workPage"],
    }),
  ]);

  const heroData = pageData
    ? {
        headline: {
          line1:
            pageData.heroHeadlineLine1 || WORK_HERO_DEFAULTS.headline.line1,
          line2Prefix:
            pageData.heroHeadlineLine2Prefix ||
            WORK_HERO_DEFAULTS.headline.line2Prefix,
          line2Highlight:
            pageData.heroHeadlineLine2Highlight ||
            WORK_HERO_DEFAULTS.headline.line2Highlight,
        },
        subtitle: pageData.heroSubtitle || WORK_HERO_DEFAULTS.subtitle,
      }
    : undefined;

  const projects: readonly WorkProjectItem[] = rawProjects.map((p, index) => {
    const fallback = WORK_PROJECTS[index] || WORK_PROJECTS[0];
    return {
      id: p.id || fallback.id,
      projectName: p.projectName || p.title || fallback.projectName,
      category: p.category || fallback.category,
      brandName: p.brandName || fallback.brandName,
      imageSrc: p.imageSrc || fallback.imageSrc,
      videoSrc: p.videoSrc || fallback.videoSrc,
      imageAlt: p.imageAlt || p.title || fallback.imageAlt,
    };
  });

  const videoProjects = projects
    .filter((p) => Boolean(p.videoSrc))
    .slice(0, 6)
    .map((p) => ({
      name: `${p.projectName} - ${p.brandName} (${p.category})`,
      description: `${p.category} film for ${p.brandName} produced by Art Visual.`,
      thumbnailUrl: p.imageSrc,
      contentUrl: p.videoSrc,
      duration: "PT1M00S",
    }));

  return (
    <div className={styles.workPage}>
      <BreadcrumbJsonLd items={[{ name: "Our Work", path: "/work" }]} />
      {videoProjects.map((v, i) => (
        <VideoObjectJsonLd
          key={`video-proj-${i}`}
          video={v}
          id={`video-work-${i}`}
        />
      ))}
      {/* Hero Header */}
      <WorkHeroSection data={heroData} />

      {/* Category Filter Bar & Portfolio Grid */}
      <WorkShowcaseSection projects={projects} />

      {/* Call To Action Banner */}
      <CTABannerSection
        className={styles.ctaBanner}
        data={{
          headline: {
            text: "Have a Story to Tell? Let's Create It.",
            line1: "Have a Story to Tell?",
            line2: "Let's Create It.",
          },
        }}
      />
    </div>
  );
}
