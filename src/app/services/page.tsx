import React from "react";
import type { Metadata } from "next";
import { ServicesHeroSection } from "@/components/sections/services/ServicesHeroSection";
import { ServicesCatalogSection } from "@/components/sections/services/ServicesCatalogSection";
import { ServicesProcessSection } from "@/components/sections/services/ServicesProcessSection";
import { WhyChooseUsSection } from "@/components/sections/home/WhyChooseUsSection";
import { CTABannerSection } from "@/components/sections/home/CTABannerSection";
import { BreadcrumbJsonLd, ServicesCatalogJsonLd } from "@/components/seo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SERVICES_QUERY, SERVICES_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { siteConfig, formatSocialDescription } from "@/config/site";
import {
  SERVICES_CATALOG_ITEMS,
} from "@/components/sections/services/ServicesCatalogSection/constants";
import { SERVICES_HERO_DEFAULTS } from "@/components/sections/services/ServicesHeroSection/constants";
import type { ServiceItem } from "@/components/sections/home/ServicesSection/constants";
import styles from "./ServicesPage.module.css";

/**
 * Dynamic SEO metadata for the Services catalog page.
 * Synchronizes with Sanity Services Page data and Site Settings.
 */
export async function generateMetadata(): Promise<Metadata> {
  const [pageData, siteSettings, rawServices] = await Promise.all([
    sanityFetch<ServicesPageCmsData | null>({
      query: SERVICES_PAGE_QUERY,
      fallback: null,
      tags: ["servicesPage"],
    }),
    sanityFetch<{
      brandName?: string;
      metaKeywords?: string[];
      ogImageUrl?: string;
    } | null>({
      query: SITE_SETTINGS_QUERY,
      fallback: null,
      tags: ["siteSettings", "servicesPage"],
    }),
    sanityFetch<RawServiceCmsItem[]>({
      query: SERVICES_QUERY,
      fallback: SERVICES_CATALOG_ITEMS,
      tags: ["serviceItem", "servicesPage"],
    }),
  ]);

  const rawBrand = siteSettings?.brandName || siteConfig.name;
  const brandName = rawBrand.toLowerCase() === "art visual" ? "Art Visual" : rawBrand;
  const pageTitle = pageData?.seoTitle || "Services";
  const fullTitle = `${pageTitle} | ${brandName}`;

  const description =
    pageData?.seoDescription ||
    pageData?.heroSubtitle ||
    "We bring ideas to life through creative video production, cinematic storytelling, and innovative visual solutions.";

  const dynamicServiceKeywords = rawServices
    .map((s) => s.title)
    .filter((title): title is string => Boolean(title))
    .map((t) => t.toLowerCase());

  const catalogKeywords = [
    ...(pageData?.seoKeywords || []),
    "video production services",
    "commercial video production services",
    "brand films",
    "corporate video production",
    "product videography",
    "promotional advertising video",
    "event video coverage",
    "social media video content",
    "full-service video production Chennai",
    "cinematography and post-production services",
    ...dynamicServiceKeywords,
    ...(siteSettings?.metaKeywords || []),
  ];

  const ogImageUrl = pageData?.ogImageUrl || siteSettings?.ogImageUrl || "/images/services/offer-shoot.png";
  const socialDescription = formatSocialDescription(description);

  return {
    title: pageTitle,
    description,
    keywords: Array.from(new Set(catalogKeywords)),
    alternates: {
      canonical: "/services",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/services",
      siteName: brandName,
      title: fullTitle,
      description: socialDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${brandName} Video Production Services`,
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

interface ServicesPageCmsData {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogImageUrl?: string;
  ogImageAlt?: string;
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
      <BreadcrumbJsonLd items={[{ name: "Services", path: "/services" }]} />
      <ServicesCatalogJsonLd
        services={formattedServices.map((s) => ({
          title: s.title,
          description: s.description,
          slug: s.href?.replace(/^\/services\//, "") || "",
          posterSrc: s.posterSrc,
        }))}
      />
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
