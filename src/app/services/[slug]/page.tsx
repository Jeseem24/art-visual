import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SERVICE_DETAIL_SLUGS,
  getServiceDetailBySlug,
} from "@/data/servicesDetails";
import { ServiceDetailHeroSection } from "@/components/sections/services/ServiceDetailHeroSection";
import { ServiceDetailAboutSection } from "@/components/sections/services/ServiceDetailAboutSection";
import { ServiceSplitHighlightsSection } from "@/components/sections/services/ServiceSplitHighlightsSection";
import { ServicesProcessSection } from "@/components/sections/services/ServicesProcessSection";
import { FeaturedWorksSection } from "@/components/sections/home/FeaturedWorksSection";
import { WhyChooseUsSection } from "@/components/sections/home/WhyChooseUsSection";
import { FAQSection } from "@/components/sections/home/FAQSection";
import { CTABannerSection } from "@/components/sections/home/CTABannerSection";
import styles from "./ServiceDetailPage.module.css";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-generate static routes for all configured service slugs.
 */
export function generateStaticParams() {
  return SERVICE_DETAIL_SLUGS.map((slug) => ({ slug }));
}

/**
 * Generate dynamic SEO title and description per service slug.
 */
export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetailBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.fullTitle,
    description: service.aboutSection.paragraphs[0],
  };
}

/**
 * Dynamic service detail page composed in exact Figma 182:1807 section order.
 */
export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceDetailBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className={styles.serviceDetailPage}>
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
