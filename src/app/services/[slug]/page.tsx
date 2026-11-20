import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SERVICE_DETAIL_SLUGS,
  getServiceDetailBySlug,
  type ServiceDetailData,
} from "@/data/servicesDetails";
import { ServiceDetailHeroSection } from "@/components/sections/services/ServiceDetailHeroSection";
import { ServiceDetailAboutSection } from "@/components/sections/services/ServiceDetailAboutSection";
import { ServiceSplitHighlightsSection } from "@/components/sections/services/ServiceSplitHighlightsSection";
import { ServicesProcessSection } from "@/components/sections/services/ServicesProcessSection";
import { FeaturedWorksSection } from "@/components/sections/home/FeaturedWorksSection";
import { WhyChooseUsSection } from "@/components/sections/home/WhyChooseUsSection";
import { FAQSection } from "@/components/sections/home/FAQSection";
import { CTABannerSection } from "@/components/sections/home/CTABannerSection";
import { FAQ_DEFAULTS } from "@/components/sections/home/FAQSection/constants";
import {
  BreadcrumbJsonLd,
  ServiceJsonLd,
  FAQJsonLd,
  VideoObjectJsonLd,
} from "@/components/seo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteConfig } from "@/config/site";
import styles from "./ServiceDetailPage.module.css";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 10;

/**
 * Pre-generate static routes for all configured service slugs (both static and CMS).
 */
export async function generateStaticParams() {
  const sanitySlugs = await sanityFetch<Array<{ slug?: string }>>({
    query: `*[_type == "serviceItem" && defined(slug.current)]{ "slug": slug.current }`,
    fallback: [],
    tags: ["serviceItem"],
  });

  const allSlugs = Array.from(
    new Set([
      ...SERVICE_DETAIL_SLUGS,
      ...sanitySlugs.map((s) => s.slug).filter((s): s is string => Boolean(s)),
    ])
  );

  return allSlugs.map((slug) => ({ slug }));
}

/**
 * Resolve service details combining Sanity CMS data and resilient local contracts.
 */
async function resolveService(slug: string): Promise<ServiceDetailData | null> {
  const localService = getServiceDetailBySlug(slug);
  const sanityItem = await sanityFetch<{
    title?: string;
    description?: string;
    videoSrc?: string;
  } | null>({
    query: `*[_type == "serviceItem" && slug.current == $slug][0]{
      title,
      description,
      "videoSrc": video.asset->url
    }`,
    params: { slug },
    fallback: null,
    tags: ["serviceItem", slug],
  });

  if (!localService && !sanityItem) {
    return null;
  }

  if (localService) {
    return {
      ...localService,
      fullTitle: sanityItem?.title || localService.fullTitle,
      titlePrefix: sanityItem?.title
        ? sanityItem.title.split(" ").slice(0, -1).join(" ") || sanityItem.title
        : localService.titlePrefix,
      titleHighlight: sanityItem?.title
        ? sanityItem.title.split(" ").slice(-1)[0]
        : localService.titleHighlight,
      videoSrc: sanityItem?.videoSrc || localService.videoSrc,
      aboutSection: {
        ...localService.aboutSection,
        paragraphs: sanityItem?.description
          ? [sanityItem.description, ...localService.aboutSection.paragraphs.slice(1)]
          : localService.aboutSection.paragraphs,
      },
    };
  }

  const title = sanityItem?.title || slug;
  const words = title.split(" ");
  const titleHighlight = words.length > 1 ? words[words.length - 1] : title;
  const titlePrefix = words.length > 1 ? words.slice(0, -1).join(" ") : "";

  return {
    slug,
    titlePrefix,
    titleHighlight,
    fullTitle: title,
    videoSrc: sanityItem?.videoSrc || "/videos/reel.mp4",
    posterSrc: "",
    aboutSection: {
      badgeText: "Our Offering",
      headline: {
        text: title,
      },
      paragraphs: [
        sanityItem?.description || "High-end cinematic video production tailored for modern brands.",
        "From pre-production strategy to final color grading and mastering, we handle every stage of the creative production pipeline.",
      ],
    },
    offerSection: {
      badgeText: "What We Offer",
      headline: {
        line1: "Creative Solutions That",
        line2: "Make an Impact",
      },
      imageSrc: "/images/works/monsoon-roast.png",
      imageAlt: title,
      cards: [
        {
          id: "strategy",
          title: "Creative Concept & Scripting",
          description: "Developing narrative arcs and storyboards that capture your brand essence.",
        },
        {
          id: "production",
          title: "Full-Scale Production",
          description: "Cinema-grade cinema cameras, lighting design, and experienced directing talent.",
        },
        {
          id: "post",
          title: "Post-Production Mastery",
          description: "Color grading, precision sound design, and custom visual effects.",
        },
        {
          id: "delivery",
          title: "Multi-Format Deliverables",
          description: "Platform-optimized exports across 16:9 4K, 9:16 vertical reels, and social cutdowns.",
        },
      ],
    },
    receiveSection: {
      badgeText: "What You'll Receive",
      headline: {
        line1: "Polished Assets Ready",
        line2: "For Global Launch",
      },
      imageSrc: "/images/works/kaveri-looms.png",
      imageAlt: `${title} Deliverables`,
      cards: [
        {
          id: "master",
          title: "Master 4K Video Files",
          description: "ProRes and high-bitrate MP4 masters ready for broadcast and web.",
        },
        {
          id: "cutdowns",
          title: "Social Media Cutdowns",
          description: "High-retention 15s and 30s vertical reels formatted for Instagram and YouTube.",
        },
        {
          id: "stills",
          title: "High-Resolution Frame Grabs",
          description: "Key promotional stills exported for web, press, and print marketing.",
        },
        {
          id: "rights",
          title: "Full Commercial Usage Rights",
          description: "Unrestricted perpetuity licensing for all brand channels and advertising.",
        },
      ],
    },
    ctaSection: {
      headline: {
        text: "Ready to Create Your Film?",
        line1: "Ready to Create",
        line2: "Your Film?",
      },
      buttonLabel: "Start a Project",
      description: {
        highlight: "Tell us about your brand,",
        body: " timeline and vision. We will follow up with concepts and an estimate.",
      },
    },
  };
}

/**
 * Generate dynamic SEO metadata, service-specific keywords, canonical, and OpenGraph per service slug.
 */
export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await resolveService(slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested video production service could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = service.fullTitle;
  const description =
    service.aboutSection.paragraphs[0] ||
    `High-impact ${service.fullTitle} services tailored for modern brands. Production, cinematography, and post-production.`;

  const serviceKeywords = [
    service.fullTitle.toLowerCase(),
    `${service.fullTitle.toLowerCase()} services`,
    `${service.fullTitle.toLowerCase()} Chennai`,
    `${service.fullTitle.toLowerCase()} India`,
    "commercial video production",
    "brand film production",
    "creative cinematography",
    "professional video agency",
    service.titlePrefix.toLowerCase(),
    service.titleHighlight.toLowerCase(),
    "high-impact brand video",
    "video production company",
  ];

  const ogImage =
    service.offerSection.imageSrc ||
    service.receiveSection.imageSrc ||
    service.posterSrc ||
    "/images/services/offer-shoot.png";

  return {
    title,
    description,
    keywords: serviceKeywords,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `/services/${slug}`,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${siteConfig.name} Commercial Video Production`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      creator: "@artvisual",
      images: [ogImage],
    },
  };
}

/**
 * Dynamic service detail page composed in section order.
 */
export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await resolveService(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className={styles.serviceDetailPage}>
      <BreadcrumbJsonLd
        items={[
          { name: "Services", path: "/services" },
          { name: service.fullTitle, path: `/services/${slug}` },
        ]}
      />
      <ServiceJsonLd
        service={{
          title: service.fullTitle,
          description: service.aboutSection.paragraphs[0] || "",
          slug: service.slug,
          posterSrc: service.posterSrc || "/images/art-visual-logo.png",
          imageSrc: service.offerSection?.imageSrc,
        }}
      />
      <FAQJsonLd items={FAQ_DEFAULTS.items} />
      <VideoObjectJsonLd
        video={{
          name: `${service.fullTitle} Production Reel`,
          description:
            service.aboutSection.paragraphs[0] ||
            `Cinematic ${service.fullTitle} showcase by Art Visual.`,
          thumbnailUrl: service.posterSrc || "/images/art-visual-logo.png",
          contentUrl: service.videoSrc,
          duration: "PT1M15S",
        }}
      />
      {/* Filmstrip Hero & Service Title */}
      <ServiceDetailHeroSection
        titlePrefix={service.titlePrefix}
        titleHighlight={service.titleHighlight}
        videoSrc={service.videoSrc}
        posterSrc={service.posterSrc}
        alt={service.fullTitle}
        className={styles.heroSection}
      />

      {/* About Service Introduction */}
      <ServiceDetailAboutSection
        badgeText={service.aboutSection.badgeText}
        headline={service.aboutSection.headline}
        paragraphs={service.aboutSection.paragraphs}
        className={styles.aboutSection}
      />

      {/* What We Offer (Image Left, 2x2 Cards Right) */}
      <ServiceSplitHighlightsSection
        id="what-we-offer"
        badgeText={service.offerSection.badgeText}
        headline={service.offerSection.headline}
        cards={service.offerSection.cards}
        imageSrc={service.offerSection.imageSrc}
        imageAlt={service.offerSection.imageAlt}
        imagePosition="left"
        className={styles.offerSection}
      />

      {/* Our Creative Process 3-Column Grid */}
      <ServicesProcessSection className={styles.processSection} />

      {/* What You'll Receive (2x2 Cards Left, Image Right) */}
      <ServiceSplitHighlightsSection
        id="what-you-receive"
        badgeText={service.receiveSection.badgeText}
        headline={service.receiveSection.headline}
        cards={service.receiveSection.cards}
        imageSrc={service.receiveSection.imageSrc}
        imageAlt={service.receiveSection.imageAlt}
        imagePosition="right"
        className={styles.receiveSection}
      />

      {/* Featured Works Showcase Carousel */}
      <FeaturedWorksSection className={styles.featuredWorks} />

      {/* Why Choose Us Value Cards */}
      <WhyChooseUsSection className={styles.whyChooseUs} />

      {/* Frequently Asked Questions */}
      <FAQSection className={styles.faqSection} />

      {/* Call To Action Banner */}
      <CTABannerSection
        className={styles.ctaBanner}
        data={{
          headline: service.ctaSection.headline,
          ctaButton: {
            label: service.ctaSection.buttonLabel,
            href: "/contact",
          },
          ...(service.ctaSection.description
            ? { description: service.ctaSection.description }
            : {}),
        }}
        mobileData={{
          badge: {
            text: "Start a project",
          },
          headline: {
            text: "Have a Story to Tell? Let's Create It.",
            line1: "Have a Story to Tell?",
            line2: "Let's Create It.",
          },
          description: {
            highlight: "Send a line about your product,",
            body: " your audience and your date. We reply with ideas and a rough quote.",
          },
          ctaButton: {
            label: "Let's Talk",
            href: "/contact",
          },
        }}
      />
    </div>
  );
}
