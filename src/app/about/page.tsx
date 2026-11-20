import React from "react";
import type { Metadata } from "next";
import { AboutHeroSection } from "@/components/sections/about/AboutHeroSection";
import { WhoWeAreSection } from "@/components/sections/about/WhoWeAreSection";
import { VisionMissionSection } from "@/components/sections/about/VisionMissionSection";
import { WhatWeDoSection } from "@/components/sections/about/WhatWeDoSection";
import { CreativeProcessSection } from "@/components/sections/about/CreativeProcessSection";
import { FeaturedWorksSection } from "@/components/sections/home/FeaturedWorksSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { CTABannerSection } from "@/components/sections/home/CTABannerSection";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  ABOUT_PAGE_QUERY,
  FEATURED_WORKS_QUERY,
  TESTIMONIALS_QUERY,
} from "@/sanity/lib/queries";
import { ABOUT_HERO_DEFAULTS } from "@/components/sections/about/AboutHeroSection/constants";
import { WHO_WE_ARE_DEFAULTS } from "@/components/sections/about/WhoWeAreSection/constants";
import { VISION_MISSION_DEFAULTS } from "@/components/sections/about/VisionMissionSection/constants";
import { WHAT_WE_DO_DEFAULTS } from "@/components/sections/about/WhatWeDoSection/constants";
import { CREATIVE_PROCESS_DEFAULTS } from "@/components/sections/about/CreativeProcessSection/constants";
import {
  FEATURED_WORKS_ITEMS,
  type WorkItem,
} from "@/components/sections/home/FeaturedWorksSection/constants";
import {
  TESTIMONIALS_DEFAULTS,
  type TestimonialItem,
} from "@/components/sections/home/TestimonialsSection/constants";
import styles from "./AboutPage.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "We plan, shoot and finish brand films, product videos, social content and event coverage. We turn stories into visual experiences.",
  openGraph: {
    title: "About Us | Art Visual",
    description:
      "We plan, shoot and finish brand films, product videos, social content and event coverage. We turn stories into visual experiences.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Art Visual",
    description:
      "We plan, shoot and finish brand films, product videos, social content and event coverage. We turn stories into visual experiences.",
  },
};

interface VisionMissionCmsItem {
  _key?: string;
  title?: string;
  description?: string;
  variant?: "solidRed" | "outlined";
}

interface WhatWeDoCmsCard {
  _key?: string;
  title?: string;
  description?: string;
  icon?: string;
}

interface ProcessCmsStep {
  _key?: string;
  number?: number;
  label?: string;
  title?: string;
  description?: string;
}

interface AboutPageCmsData {
  [key: string]: unknown;
  heroHeadlineLine1?: string;
  heroHeadlineLine2Prefix?: string;
  heroHeadlineLine2Highlight?: string;
  heroSubtitle?: string;
  whoWeAreBadge?: string;
  whoWeAreHeadlineLine1?: string;
  whoWeAreHeadlineLine2?: string;
  whoWeAreStoryHighlight?: string;
  whoWeAreStoryBody?: string;
  whoWeAreParagraph1?: string;
  whoWeAreParagraph2?: string;
  whoWeAreParagraphs?: string[];
  whoWeAreVideoSrc?: string;
  whoWeAreImageSrc?: string;
  whoWeAreVideoAlt?: string;
  visionTitle?: string;
  visionDescription?: string;
  missionTitle?: string;
  missionDescription?: string;
  visionMissionItems?: VisionMissionCmsItem[];
  whatWeDoBadge?: string;
  whatWeDoHeadlineLine1?: string;
  whatWeDoHeadlineLine2?: string;
  whatWeDoCards?: WhatWeDoCmsCard[];
  processBadge?: string;
  processHeadlineLine1?: string;
  processHeadlineLine2?: string;
  processSteps?: ProcessCmsStep[];
}

export const revalidate = 10;

export default async function AboutPage() {
  const [aboutData, featuredWorksData, testimonialsData] = await Promise.all([
    sanityFetch<AboutPageCmsData | null>({
      query: ABOUT_PAGE_QUERY,
      fallback: null,
      tags: ["aboutPage"],
    }),
    sanityFetch<WorkItem[]>({
      query: FEATURED_WORKS_QUERY,
      fallback: FEATURED_WORKS_ITEMS,
      tags: ["featuredWork", "aboutPage"],
    }),
    sanityFetch<TestimonialItem[]>({
      query: TESTIMONIALS_QUERY,
      fallback: TESTIMONIALS_DEFAULTS.items,
      tags: ["testimonial", "aboutPage"],
    }),
  ]);

  const heroData = aboutData
    ? {
        headline: {
          line1:
            aboutData.heroHeadlineLine1 || ABOUT_HERO_DEFAULTS.headline.line1,
          line2Prefix:
            aboutData.heroHeadlineLine2Prefix ||
            ABOUT_HERO_DEFAULTS.headline.line2Prefix,
          line2Highlight:
            aboutData.heroHeadlineLine2Highlight ||
            ABOUT_HERO_DEFAULTS.headline.line2Highlight,
        },
        subtitle: aboutData.heroSubtitle || ABOUT_HERO_DEFAULTS.subtitle,
      }
    : undefined;

  const whoWeAreData = aboutData
    ? {
        badge: {
          text: aboutData.whoWeAreBadge || WHO_WE_ARE_DEFAULTS.badge.text,
        },
        headline: {
          line1:
            aboutData.whoWeAreHeadlineLine1 ||
            WHO_WE_ARE_DEFAULTS.headline.line1,
          line2:
            aboutData.whoWeAreHeadlineLine2 ||
            WHO_WE_ARE_DEFAULTS.headline.line2,
        },
        paragraphs:
          aboutData.whoWeAreParagraphs &&
          aboutData.whoWeAreParagraphs.length > 0
            ? aboutData.whoWeAreParagraphs
            : [
                aboutData.whoWeAreParagraph1 ||
                  WHO_WE_ARE_DEFAULTS.paragraphs[0],
                aboutData.whoWeAreParagraph2 ||
                  WHO_WE_ARE_DEFAULTS.paragraphs[1],
              ].filter(Boolean),
        image: {
          ...WHO_WE_ARE_DEFAULTS.image,
          src: aboutData.whoWeAreImageSrc || WHO_WE_ARE_DEFAULTS.image.src,
        },
      }
    : undefined;

  const visionMissionData = aboutData
    ? {
        items:
          aboutData.visionMissionItems &&
          aboutData.visionMissionItems.length > 0
            ? aboutData.visionMissionItems.map((item: VisionMissionCmsItem, idx: number) => ({
                id: item._key || `vm-${idx}`,
                title: item.title || "",
                description: item.description || "",
                variant: item.variant || (idx === 0 ? "solidRed" : "outlined"),
              }))
            : [
                {
                  ...VISION_MISSION_DEFAULTS.items[0],
                  title:
                    aboutData.visionTitle ||
                    VISION_MISSION_DEFAULTS.items[0].title,
                  description:
                    aboutData.visionDescription ||
                    VISION_MISSION_DEFAULTS.items[0].description,
                },
                {
                  ...VISION_MISSION_DEFAULTS.items[1],
                  title:
                    aboutData.missionTitle ||
                    VISION_MISSION_DEFAULTS.items[1].title,
                  description:
                    aboutData.missionDescription ||
                    VISION_MISSION_DEFAULTS.items[1].description,
                },
              ],
      }
    : undefined;

  const whatWeDoData = aboutData
    ? {
        badge: {
          text: aboutData.whatWeDoBadge || WHAT_WE_DO_DEFAULTS.badge.text,
        },
        headline: {
          line1:
            aboutData.whatWeDoHeadlineLine1 ||
            WHAT_WE_DO_DEFAULTS.headline.line1,
          line2:
            aboutData.whatWeDoHeadlineLine2 ||
            WHAT_WE_DO_DEFAULTS.headline.line2,
        },
        items:
          aboutData.whatWeDoCards && aboutData.whatWeDoCards.length > 0
            ? aboutData.whatWeDoCards.map((card: WhatWeDoCmsCard, idx: number) => {
                const fallback =
                  WHAT_WE_DO_DEFAULTS.items[idx] || WHAT_WE_DO_DEFAULTS.items[0];
                return {
                  id: card._key || `cap-${idx}`,
                  title: card.title || fallback.title,
                  description: card.description || fallback.description,
                  icon: card.icon || fallback.icon,
                };
              })
            : WHAT_WE_DO_DEFAULTS.items,
      }
    : undefined;

  const creativeProcessData = aboutData
    ? {
        badge: {
          text: aboutData.processBadge || CREATIVE_PROCESS_DEFAULTS.badge.text,
        },
        headline: {
          line1:
            aboutData.processHeadlineLine1 ||
            CREATIVE_PROCESS_DEFAULTS.headline.line1,
          line2:
            aboutData.processHeadlineLine2 ||
            CREATIVE_PROCESS_DEFAULTS.headline.line2,
        },
        steps:
          aboutData.processSteps && aboutData.processSteps.length > 0
            ? aboutData.processSteps.map((step: ProcessCmsStep, idx: number) => {
                const fallback =
                  CREATIVE_PROCESS_DEFAULTS.steps[idx] ||
                  CREATIVE_PROCESS_DEFAULTS.steps[0];
                return {
                  id: step._key || `step-${idx}`,
                  number: step.number || idx + 1,
                  label: step.label || fallback.label,
                  title: step.title || fallback.title,
                  description: step.description || fallback.description,
                  desktopPosition: fallback.desktopPosition,
                  labelAlign: fallback.labelAlign,
                };
              })
            : CREATIVE_PROCESS_DEFAULTS.steps,
      }
    : undefined;

  const formattedWorks: WorkItem[] = featuredWorksData.map((item, index) => {
    const fallback = FEATURED_WORKS_ITEMS[index] || FEATURED_WORKS_ITEMS[0];
    return {
      id: item.id || fallback.id,
      title: item.title || fallback.title,
      slug: item.slug || fallback.slug,
      imageSrc: item.imageSrc || fallback.imageSrc,
      alt: item.title || fallback.alt,
      category: item.category || fallback.category,
      href: item.slug ? `/work/${item.slug}` : fallback.href,
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

  return (
    <div className={styles.aboutPage}>
      {/* Hero Header */}
      <AboutHeroSection data={heroData} />

      {/* Who We Are Story Section */}
      <WhoWeAreSection data={whoWeAreData} />

      {/* Vision & Mission Statements */}
      <VisionMissionSection data={visionMissionData} />

      {/* What We Do Capabilities Grid */}
      <WhatWeDoSection data={whatWeDoData} />

      {/* Our Creative Process Timeline */}
      <CreativeProcessSection
        className={styles.creativeProcess}
        data={creativeProcessData}
      />

      {/* Featured Projects */}
      <FeaturedWorksSection
        className={styles.featuredWorks}
        items={formattedWorks}
      />

      {/* Client Testimonials */}
      <TestimonialsSection
        className={styles.testimonials}
        data={{ items: formattedTestimonials }}
      />

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
