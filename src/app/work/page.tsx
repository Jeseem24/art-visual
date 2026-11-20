import React from "react";
import type { Metadata } from "next";
import { WorkHeroSection } from "@/components/sections/work/WorkHeroSection";
import { WorkShowcaseSection } from "@/components/sections/work/WorkShowcaseSection";
import { CTABannerSection } from "@/components/sections/home/CTABannerSection";
import { sanityFetch } from "@/sanity/lib/fetch";
import { PORTFOLIO_WORKS_QUERY, WORK_PAGE_QUERY } from "@/sanity/lib/queries";
import { WORK_PROJECTS, type WorkProjectItem, type WorkCategory } from "@/data/worksData";
import { WORK_HERO_DEFAULTS } from "@/components/sections/work/WorkHeroSection/constants";
import styles from "./WorkPage.module.css";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore our creative portfolio of brand films, commercials, product videos, and visual stories crafted with creativity and passion.",
  openGraph: {
    title: "Our Work | Art Visual",
    description:
      "Explore our creative portfolio of brand films, commercials, product videos, and visual stories crafted with creativity and passion.",
    url: "/work",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work | Art Visual",
    description:
      "Explore our creative portfolio of brand films, commercials, product videos, and visual stories crafted with creativity and passion.",
  },
};

interface WorkPageCmsData {
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

  return (
    <div className={styles.workPage}>
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
