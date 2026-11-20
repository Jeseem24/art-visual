import React from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { FeaturedWorksSection } from "@/components/sections/home/FeaturedWorksSection";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { WhyChooseUsSection } from "@/components/sections/home/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { FAQSection } from "@/components/sections/home/FAQSection";
import { CTABannerSection } from "@/components/sections/home/CTABannerSection";
import { CTA_BANNER_DEFAULTS } from "@/components/sections/home/CTABannerSection/constants";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  HOME_PAGE_QUERY,
  SERVICES_QUERY,
  FEATURED_WORKS_QUERY,
  TESTIMONIALS_QUERY,
  FAQS_QUERY,
  SITE_SETTINGS_QUERY,
  CTA_BANNER_QUERY,
} from "@/sanity/lib/queries";
import { siteConfig } from "@/config/site";
import {
  HERO_DEFAULTS,
} from "@/components/sections/home/HeroSection/constants";
import {
  HERO_SHOWCASE_CARDS,
  type ShowcaseCardItem,
} from "@/components/sections/home/HeroShowcase/constants";
import {
  ABOUT_SECTION_DEFAULTS,
} from "@/components/sections/home/AboutSection/constants";
import {
  WHY_CHOOSE_US_DEFAULTS,
} from "@/components/sections/home/WhyChooseUsSection/constants";
import {
  SERVICES_ITEMS,
  SERVICES_HEADER_DEFAULTS,
  type ServiceItem,
} from "@/components/sections/home/ServicesSection/constants";
import {
  FEATURED_WORKS_ITEMS,
  FEATURED_WORKS_DEFAULTS,
  type WorkItem,
} from "@/components/sections/home/FeaturedWorksSection/constants";
import {
  TESTIMONIALS_DEFAULTS,
  type TestimonialItem,
} from "@/components/sections/home/TestimonialsSection/constants";
import {
  FAQ_DEFAULTS,
  type FAQItemData,
} from "@/components/sections/home/FAQSection/constants";
import styles from "./HomePage.module.css";

interface SanitySiteSettings {
  [key: string]: unknown;
  brandName?: string;
  tagline?: string;
  brandDescription?: string;
  faviconUrl?: string;
  logoUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  location?: string;
  whatsappNumber?: string;
}

interface HomePageCmsData {
  [key: string]: unknown;
  heroLocationPill?: string;
  heroHeadlineLine1Text?: string;
  heroHeadlineLine1Highlight?: string;
  heroHeadlineLine2Text?: string;
  heroSubtitle?: string;
  heroCtaLabel?: string;
  heroCtaHref?: string;
  heroShowcaseCards?: Array<{ id?: string; title?: string; description?: string; image?: string; videoSrc?: string; _key?: string }>;
  aboutBadge?: string;
  aboutTitleLine1?: string;
  aboutTitleLine2?: string;
  aboutStoryHighlight?: string;
  aboutStoryBody?: string;
  aboutParagraph1?: string;
  aboutParagraph2?: string;
  aboutVideoSrc?: string;
  aboutVideoAlt?: string;
  aboutRibbonItems?: Array<string | { id?: string; title?: string; text?: string }>;
  aboutCtaLabel?: string;
  aboutCtaHref?: string;
  whyChooseUsBadge?: string;
  whyChooseUsHeadlineLine1?: string;
  whyChooseUsHeadlineLine2?: string;
  whyChooseUsCards?: Array<{ _key?: string; number?: string; title?: string; description?: string }>;
  servicesBadge?: string;
  servicesTitleLine1?: string;
  servicesTitleLine2?: string;
  worksBadge?: string;
  worksHeadline?: string;
  testimonialsBadge?: string;
  testimonialsHeadlineLine1?: string;
  testimonialsHeadlineLine2?: string;
  faqBadge?: string;
  faqHeadline?: string;
}

interface CtaBannerCmsData {
  badgeText?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  descriptionHighlight?: string;
  descriptionBody?: string;
  buttonLabel?: string;
  buttonHref?: string;
  reelStrip1Urls?: string[];
  reelStrip2Urls?: string[];
}

/**
 * Dynamic SEO metadata for the home page.
 * Synchronizes with Sanity Site Settings (Brand Name, Tagline, Bio Description).
 */
export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await sanityFetch<SanitySiteSettings | null>({
    query: SITE_SETTINGS_QUERY,
    fallback: null,
    tags: ["siteSettings", "homePage"],
  });

  const rawBrand = siteSettings?.brandName || siteConfig.name;
  const brandName = rawBrand.toLowerCase() === "art visual" ? "Art Visual" : rawBrand;
  const title = `${brandName} | ${siteSettings?.tagline || siteConfig.tagline}`;

  const description =
    siteSettings?.brandDescription || siteConfig.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: brandName,
      images: siteSettings?.logoUrl
        ? [{ url: siteSettings.logoUrl, alt: brandName }]
        : [{ url: "/images/art-visual-logo.png", alt: brandName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const revalidate = 10;

export default async function HomePage() {
  // Fetch live CMS content in parallel with resilient local defaults
  const [
    homeData,
    servicesData,
    featuredWorksData,
    testimonialsData,
    faqsData,
    ctaBannerDataRaw,
  ] = await Promise.all([
    sanityFetch<HomePageCmsData | null>({
      query: HOME_PAGE_QUERY,
      fallback: null,
      tags: ["homePage"],
    }),
    sanityFetch<ServiceItem[]>({
      query: SERVICES_QUERY,
      fallback: SERVICES_ITEMS,
      tags: ["serviceItem", "homePage"],
    }),
    sanityFetch<WorkItem[]>({
      query: FEATURED_WORKS_QUERY,
      fallback: FEATURED_WORKS_ITEMS,
      tags: ["featuredWork", "homePage"],
    }),
    sanityFetch<TestimonialItem[]>({
      query: TESTIMONIALS_QUERY,
      fallback: TESTIMONIALS_DEFAULTS.items,
      tags: ["testimonial", "homePage"],
    }),
    sanityFetch<FAQItemData[]>({
      query: FAQS_QUERY,
      fallback: FAQ_DEFAULTS.items,
      tags: ["faqItem", "homePage"],
    }),
    sanityFetch<CtaBannerCmsData | null>({
      query: CTA_BANNER_QUERY,
      fallback: null,
      tags: ["ctaBanner", "homePage"],
    }),
  ]);

  const heroBadge = homeData?.heroLocationPill || HERO_DEFAULTS.badge.text;
  const heroSubtitle = homeData?.heroSubtitle || HERO_DEFAULTS.subtitle;
  const heroHeadline = homeData?.heroHeadlineLine1Text
    ? {
        line1Text: homeData.heroHeadlineLine1Text,
        line1Highlight:
          homeData.heroHeadlineLine1Highlight ||
          HERO_DEFAULTS.headline.line1Highlight,
        line2Text:
          homeData.heroHeadlineLine2Text || HERO_DEFAULTS.headline.line2Text,
      }
    : HERO_DEFAULTS.headline;
  const heroCta = homeData?.heroCtaLabel
    ? {
        label: homeData.heroCtaLabel,
        href: homeData.heroCtaHref || HERO_DEFAULTS.cta.href,
      }
    : HERO_DEFAULTS.cta;

  const aboutSectionData = homeData
    ? {
        badge: {
          text: homeData.aboutBadge || ABOUT_SECTION_DEFAULTS.badge.text,
        },
        headline: {
          text: `${homeData.aboutTitleLine1 || ABOUT_SECTION_DEFAULTS.headline.line1}\n${homeData.aboutTitleLine2 || ABOUT_SECTION_DEFAULTS.headline.line2}`,
          line1:
            homeData.aboutTitleLine1 || ABOUT_SECTION_DEFAULTS.headline.line1,
          line2:
            homeData.aboutTitleLine2 || ABOUT_SECTION_DEFAULTS.headline.line2,
        },
        story: {
          highlight:
            homeData.aboutStoryHighlight ||
            homeData.aboutParagraph1 ||
            ABOUT_SECTION_DEFAULTS.story.highlight,
          body:
            homeData.aboutStoryBody ||
            homeData.aboutParagraph2 ||
            ABOUT_SECTION_DEFAULTS.story.body,
        },
        media: {
          videoSrc:
            homeData.aboutVideoSrc || ABOUT_SECTION_DEFAULTS.media.videoSrc,
          alt:
            homeData.aboutVideoAlt || ABOUT_SECTION_DEFAULTS.media.alt,
        },
        photo: ABOUT_SECTION_DEFAULTS.photo,
        ribbon: {
          items:
            homeData.aboutRibbonItems && homeData.aboutRibbonItems.length > 0
              ? homeData.aboutRibbonItems
                  .map((item) =>
                    typeof item === "string" ? item : item.text || item.title || ""
                  )
                  .filter(Boolean)
              : ABOUT_SECTION_DEFAULTS.ribbon.items,
        },
        cta: {
          label: homeData.aboutCtaLabel || ABOUT_SECTION_DEFAULTS.cta.label,
          href: homeData.aboutCtaHref || ABOUT_SECTION_DEFAULTS.cta.href,
        },
      }
    : undefined;

  const whyChooseUsData = homeData
    ? {
        badge: {
          text:
            homeData.whyChooseUsBadge || WHY_CHOOSE_US_DEFAULTS.badge.text,
        },
        headline: {
          text: `${homeData.whyChooseUsHeadlineLine1 || WHY_CHOOSE_US_DEFAULTS.headline.line1} ${homeData.whyChooseUsHeadlineLine2 || WHY_CHOOSE_US_DEFAULTS.headline.line2}`,
          line1:
            homeData.whyChooseUsHeadlineLine1 ||
            WHY_CHOOSE_US_DEFAULTS.headline.line1,
          line2:
            homeData.whyChooseUsHeadlineLine2 ||
            WHY_CHOOSE_US_DEFAULTS.headline.line2,
        },
        items:
          homeData.whyChooseUsCards && homeData.whyChooseUsCards.length > 0
            ? homeData.whyChooseUsCards.map((card: { _key?: string; number?: string; title?: string; description?: string }, idx: number) => ({
                id: card._key || `why-${idx}`,
                number: card.number || `0${idx + 1}`,
                title: card.title || "",
                description: card.description || "",
              }))
            : WHY_CHOOSE_US_DEFAULTS.items,
      }
    : undefined;

  const formattedServices: ServiceItem[] = servicesData.map((item, index) => {
    const fallback = SERVICES_ITEMS[index] || SERVICES_ITEMS[0];
    return {
      id: item.id || (item as unknown as { _id?: string })._id || fallback.id,
      title: item.title || fallback.title,
      description: item.description || fallback.description,
      videoSrc: item.videoSrc || fallback.videoSrc,
      posterSrc: item.posterSrc || fallback.posterSrc,
      href:
        item.href ||
        ((item as unknown as { slug?: string }).slug
          ? `/services/${(item as unknown as { slug?: string }).slug}`
          : fallback.href),
      ctaLabel: item.ctaLabel || fallback.ctaLabel || "View service",
    };
  });

  const formattedWorks: WorkItem[] = featuredWorksData.map((item, index) => {
    const fallback = FEATURED_WORKS_ITEMS[index] || FEATURED_WORKS_ITEMS[0];
    return {
      id: item.id || fallback.id,
      title: item.title || fallback.title,
      slug: item.slug || fallback.slug,
      imageSrc: item.imageSrc || fallback.imageSrc,
      videoSrc: item.videoSrc,
      alt: item.title || fallback.alt,
      category: item.category || fallback.category,
      href: item.slug ? `/work` : (item.href || fallback.href),
    };
  });

  const formattedTestimonials: TestimonialItem[] = testimonialsData.map(
    (item, index) => {
      const fallback =
        TESTIMONIALS_DEFAULTS.items[index] || TESTIMONIALS_DEFAULTS.items[0];
      return {
        id: item.id || fallback.id,
        name: item.name || fallback.name,
        role: item.role || fallback.role,
        avatar: item.avatar || fallback.avatar,
        rating: item.rating || fallback.rating,
        quote: item.quote || fallback.quote,
      };
    }
  );

  const formattedShowcaseCards: readonly ShowcaseCardItem[] | undefined =
    homeData?.heroShowcaseCards && homeData.heroShowcaseCards.length > 0
      ? homeData.heroShowcaseCards.map((card, idx) => {
          const fallback =
            HERO_SHOWCASE_CARDS[idx] || HERO_SHOWCASE_CARDS[0];
          return {
            id: card.id || card._key || fallback.id,
            title: card.title || fallback.title,
            description: card.description || fallback.description,
            image: card.image || fallback.image,
            videoSrc: card.videoSrc || fallback.videoSrc,
            rotationDeg: fallback.rotationDeg,
          };
        })
      : undefined;

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <HeroSection
        badgeText={heroBadge}
        headline={heroHeadline}
        subtitle={heroSubtitle}
        cta={heroCta}
        showcaseCards={formattedShowcaseCards}
      />

      {/* Services Overview */}
      <ServicesSection
        badgeText={homeData?.servicesBadge || SERVICES_HEADER_DEFAULTS.badge.text}
        titleLine1={
          homeData?.servicesTitleLine1 || SERVICES_HEADER_DEFAULTS.title.line1
        }
        titleLine2={
          homeData?.servicesTitleLine2 || SERVICES_HEADER_DEFAULTS.title.line2
        }
        services={formattedServices}
      />

      {/* Featured Projects */}
      <FeaturedWorksSection
        badgeText={homeData?.worksBadge || FEATURED_WORKS_DEFAULTS.badge.text}
        headline={homeData?.worksHeadline || FEATURED_WORKS_DEFAULTS.headline.text}
        items={formattedWorks}
      />

      {/* About Company */}
      <AboutSection data={aboutSectionData} />

      {/* Why Choose Us */}
      <WhyChooseUsSection data={whyChooseUsData} />

      {/* Client Testimonials */}
      <TestimonialsSection
        data={{
          badge: {
            text:
              homeData?.testimonialsBadge || TESTIMONIALS_DEFAULTS.badge.text,
          },
          headline: {
            text: `${homeData?.testimonialsHeadlineLine1 || TESTIMONIALS_DEFAULTS.headline.line1} ${homeData?.testimonialsHeadlineLine2 || TESTIMONIALS_DEFAULTS.headline.line2}`,
            line1:
              homeData?.testimonialsHeadlineLine1 ||
              TESTIMONIALS_DEFAULTS.headline.line1,
            line2:
              homeData?.testimonialsHeadlineLine2 ||
              TESTIMONIALS_DEFAULTS.headline.line2,
          },
          items: formattedTestimonials,
        }}
      />

      {/* Frequently Asked Questions */}
      <FAQSection
        data={{
          badge: {
            text: homeData?.faqBadge || FAQ_DEFAULTS.badge.text,
          },
          headline: {
            text: homeData?.faqHeadline || FAQ_DEFAULTS.headline.text,
          },
          items: faqsData,
        }}
      />

      {/* Call To Action Banner */}
      <CTABannerSection
        data={
          ctaBannerDataRaw
            ? {
                badge: {
                  text:
                    ctaBannerDataRaw.badgeText ||
                    CTA_BANNER_DEFAULTS.badge.text,
                },
                headline: {
                  line1:
                    ctaBannerDataRaw.headlineLine1 ||
                    CTA_BANNER_DEFAULTS.headline.line1,
                  line2:
                    ctaBannerDataRaw.headlineLine2 ||
                    CTA_BANNER_DEFAULTS.headline.line2,
                  text: `${ctaBannerDataRaw.headlineLine1 || CTA_BANNER_DEFAULTS.headline.line1} ${ctaBannerDataRaw.headlineLine2 || CTA_BANNER_DEFAULTS.headline.line2}`,
                },
                description: {
                  highlight:
                    ctaBannerDataRaw.descriptionHighlight ||
                    CTA_BANNER_DEFAULTS.description.highlight,
                  body:
                    ctaBannerDataRaw.descriptionBody ||
                    CTA_BANNER_DEFAULTS.description.body,
                },
                ctaButton: {
                  label:
                    ctaBannerDataRaw.buttonLabel ||
                    CTA_BANNER_DEFAULTS.ctaButton.label,
                  href:
                    ctaBannerDataRaw.buttonHref ||
                    CTA_BANNER_DEFAULTS.ctaButton.href,
                },
                reelStrip1: {
                  items:
                    ctaBannerDataRaw.reelStrip1Urls &&
                    ctaBannerDataRaw.reelStrip1Urls.length > 0
                      ? ctaBannerDataRaw.reelStrip1Urls.map(
                          (url: string, idx: number) => ({
                            id: `strip1-cms-${idx}`,
                            image: url,
                            alt: "Art Visual Production Reel",
                          })
                        )
                      : CTA_BANNER_DEFAULTS.reelStrip1.items,
                },
                reelStrip2: {
                  items:
                    ctaBannerDataRaw.reelStrip2Urls &&
                    ctaBannerDataRaw.reelStrip2Urls.length > 0
                      ? ctaBannerDataRaw.reelStrip2Urls.map(
                          (url: string, idx: number) => ({
                            id: `strip2-cms-${idx}`,
                            image: url,
                            alt: "Art Visual Production Reel",
                          })
                        )
                      : CTA_BANNER_DEFAULTS.reelStrip2.items,
                },
              }
            : undefined
        }
        className={styles.ctaBanner}
      />
    </div>
  );
}
