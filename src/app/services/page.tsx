import React from "react";
import type { Metadata } from "next";
import { ServicesHeroSection } from "@/components/sections/services/ServicesHeroSection";
import { ServicesCatalogSection } from "@/components/sections/services/ServicesCatalogSection";
import { ServicesProcessSection } from "@/components/sections/services/ServicesProcessSection";
import { WhyChooseUsSection } from "@/components/sections/home/WhyChooseUsSection";
import { CTABannerSection } from "@/components/sections/home/CTABannerSection";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SERVICES_QUERY, SERVICES_PAGE_QUERY } from "@/sanity/lib/queries";
import {
  SERVICES_CATALOG_ITEMS,
} from "@/components/sections/services/ServicesCatalogSection/constants";
import { SERVICES_HERO_DEFAULTS } from "@/components/sections/services/ServicesHeroSection/constants";
import type { ServiceItem } from "@/components/sections/home/ServicesSection/constants";
import styles from "./ServicesPage.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "We bring ideas to life through creative video production, cinematic storytelling, and innovative visual solutions.",
  openGraph: {
    title: "Services | Art Visual",
    description:
      "We bring ideas to life through creative video production, cinematic storytelling, and innovative visual solutions.",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Art Visual",
    description:
      "We bring ideas to life through creative video production, cinematic storytelling, and innovative visual solutions.",
  },
};

interface ServicesPageCmsData {
  heroHeadlineLine1?: string;
  heroHeadlineLine2Prefix?: string;
  heroHeadlineLine2Highlight?: string;
  heroSubtitle?: string;
  catalogBadge?: string;
  catalogTitleLine1?: string;
  catalogTitleLine2?: string;
}

interface RawServiceCmsItem {
  id?: string;
  _id?: string;
  title?: string;
  description?: string;
  videoSrc?: string;
  posterSrc?: string;
  href?: string;
  slug?: string;
  ctaLabel?: string;
}

export const revalidate = 10;

export default async function ServicesPage() {
  const [pageData, rawServices] = await Promise.all([
    sanityFetch<ServicesPageCmsData | null>({
      query: SERVICES_PAGE_QUERY,
      fallback: null,
      tags: ["servicesPage"],
    }),
    sanityFetch<RawServiceCmsItem[]>({
      query: SERVICES_QUERY,
      fallback: SERVICES_CATALOG_ITEMS,
      tags: ["serviceItem", "servicesPage"],
    }),
  ]);

  const heroData = pageData
    ? {
        headline: {
          line1:
            pageData.heroHeadlineLine1 || SERVICES_HERO_DEFAULTS.headline.line1,
          line2Prefix:
            pageData.heroHeadlineLine2Prefix ||
            SERVICES_HERO_DEFAULTS.headline.line2Prefix,
          line2Highlight:
            pageData.heroHeadlineLine2Highlight ||
            SERVICES_HERO_DEFAULTS.headline.line2Highlight,
        },
        subtitle: pageData.heroSubtitle || SERVICES_HERO_DEFAULTS.subtitle,
      }
    : undefined;

  const formattedServices: ServiceItem[] = rawServices.map((item, index) => {
    const fallback = SERVICES_CATALOG_ITEMS[index] || SERVICES_CATALOG_ITEMS[0];
    return {
      id: item.id || item._id || fallback.id,
      title: item.title || fallback.title,
      description: item.description || fallback.description,
      videoSrc: item.videoSrc || fallback.videoSrc,
      posterSrc: item.posterSrc || fallback.posterSrc,
      href: item.href || (item.slug ? `/services/${item.slug}` : fallback.href),
      ctaLabel: item.ctaLabel || fallback.ctaLabel || "View service",
    };
  });

  return (
    <div className={styles.servicesPage}>
      {/* Hero Introduction */}
      <ServicesHeroSection data={heroData} />

      {/* 3x3 Creative Services Grid */}
      <ServicesCatalogSection
        badgeText={pageData?.catalogBadge}
        titleLine1={pageData?.catalogTitleLine1}
        titleLine2={pageData?.catalogTitleLine2}
        services={formattedServices}
      />

      {/* Our Creative Process 3-Column Grid */}
      <ServicesProcessSection />

      {/* Why Brands Trust Our Creative Vision */}
      <WhyChooseUsSection />

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
