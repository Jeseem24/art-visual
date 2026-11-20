import React from "react";
import type { Metadata } from "next";
import { ContactHeroSection } from "@/components/sections/contact/ContactHeroSection";
import { ContactInquirySection } from "@/components/sections/contact/ContactInquirySection";
import { WhyChooseUsSection } from "@/components/sections/home/WhyChooseUsSection";
import { CTABannerSection } from "@/components/sections/home/CTABannerSection";
import { BreadcrumbJsonLd } from "@/components/seo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { CONTACT_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { siteConfig, formatSocialDescription } from "@/config/site";
import { CONTACT_HERO_DEFAULTS } from "@/components/sections/contact/ContactHeroSection/constants";
import { CONTACT_INQUIRY_DEFAULTS } from "@/components/sections/contact/ContactInquirySection/constants";
import styles from "./ContactPage.module.css";

/**
 * Dynamic SEO metadata for the Contact page.
 * Synchronizes with Sanity Contact Page data and Site Settings.
 */
export async function generateMetadata(): Promise<Metadata> {
  const [contactData, siteSettings] = await Promise.all([
    sanityFetch<ContactPageCmsData | null>({
      query: CONTACT_PAGE_QUERY,
      fallback: null,
      tags: ["contactPage"],
    }),
    sanityFetch<{
      brandName?: string;
      metaKeywords?: string[];
      ogImageUrl?: string;
    } | null>({
      query: SITE_SETTINGS_QUERY,
      fallback: null,
      tags: ["siteSettings", "contactPage"],
    }),
  ]);

  const rawBrand = siteSettings?.brandName || siteConfig.name;
  const brandName = rawBrand.toLowerCase() === "art visual" ? "Art Visual" : rawBrand;
  const pageTitle = contactData?.seoTitle || "Contact Us";
  const fullTitle = `${pageTitle} | ${brandName}`;

  const description =
    contactData?.seoDescription ||
    contactData?.heroSubtitle ||
    "Have a creative idea or a project in mind? Let's connect and bring your vision to life through powerful visual storytelling.";

  const contactKeywords = [
    ...(contactData?.seoKeywords || []),
    "contact video production company",
    "hire commercial video agency",
    "video production quote Chennai",
    "commercial film production inquiry",
    "brand film estimate",
    "hire videographer Chennai",
    "video production consultation",
    "video agency contact details",
    ...(siteSettings?.metaKeywords || []),
  ];

  const ogImageUrl = contactData?.ogImageUrl || siteSettings?.ogImageUrl || "/opengraph-image";
  const socialDescription = formatSocialDescription(description);

  return {
    title: pageTitle,
    description,
    keywords: Array.from(new Set(contactKeywords)),
    alternates: {
      canonical: "/contact",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/contact",
      siteName: brandName,
      title: fullTitle,
      description: socialDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Contact ${brandName} Video Production Studio`,
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

interface ContactPageCmsData {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogImageUrl?: string;
  ogImageAlt?: string;
  heroHeadlineLine1Prefix?: string;
  heroHeadlineLine1Highlight?: string;
  heroHeadlineLine2?: string;
  heroSubtitle?: string;
  inquiryBadge?: string;
  inquiryHeadline?: string;
  formTitle?: string;
  submitButtonLabel?: string;
  studioImageSrc?: string;
  serviceOptions?: Array<{ value: string; label: string }>;
  contactEmail?: string;
  contactPhone?: string;
  contactLocation?: string;
}

export const revalidate = 10;

export default async function ContactPage() {
  const contactData = await sanityFetch<ContactPageCmsData | null>({
    query: CONTACT_PAGE_QUERY,
    fallback: null,
    tags: ["contactPage"],
  });

  const heroData = contactData
    ? {
        headline: {
          line1Prefix:
            contactData.heroHeadlineLine1Prefix ||
            CONTACT_HERO_DEFAULTS.headline.line1Prefix,
          line1Highlight:
            contactData.heroHeadlineLine1Highlight ||
            CONTACT_HERO_DEFAULTS.headline.line1Highlight,
          line2:
            contactData.heroHeadlineLine2 ||
            CONTACT_HERO_DEFAULTS.headline.line2,
        },
        subtitle: contactData.heroSubtitle || CONTACT_HERO_DEFAULTS.subtitle,
      }
    : undefined;

  const inquiryData = contactData
    ? {
        badgeText:
          contactData.inquiryBadge || CONTACT_INQUIRY_DEFAULTS.badgeText,
        headline:
          contactData.inquiryHeadline || CONTACT_INQUIRY_DEFAULTS.headline,
        formTitle: contactData.formTitle || CONTACT_INQUIRY_DEFAULTS.formTitle,
        submitLabel:
          contactData.submitButtonLabel || CONTACT_INQUIRY_DEFAULTS.submitLabel,
        serviceOptions:
          contactData.serviceOptions && contactData.serviceOptions.length > 0
            ? contactData.serviceOptions
            : CONTACT_INQUIRY_DEFAULTS.serviceOptions,
        studioImage: {
          ...CONTACT_INQUIRY_DEFAULTS.studioImage,
          src:
            contactData.studioImageSrc ||
            CONTACT_INQUIRY_DEFAULTS.studioImage.src,
        },
        contactItems: [
          {
            ...CONTACT_INQUIRY_DEFAULTS.contactItems[0],
            value:
              contactData.contactEmail ||
              CONTACT_INQUIRY_DEFAULTS.contactItems[0].value,
            href: contactData.contactEmail
              ? `mailto:${contactData.contactEmail}`
              : CONTACT_INQUIRY_DEFAULTS.contactItems[0].href,
          },
          {
            ...CONTACT_INQUIRY_DEFAULTS.contactItems[1],
            value:
              contactData.contactPhone ||
              CONTACT_INQUIRY_DEFAULTS.contactItems[1].value,
            href: contactData.contactPhone
              ? `tel:${contactData.contactPhone.replace(/\s+/g, "")}`
              : CONTACT_INQUIRY_DEFAULTS.contactItems[1].href,
          },
          {
            ...CONTACT_INQUIRY_DEFAULTS.contactItems[2],
            value:
              contactData.contactLocation ||
              CONTACT_INQUIRY_DEFAULTS.contactItems[2].value,
          },
        ],
      }
    : undefined;

  return (
    <div className={styles.contactPage}>
      <BreadcrumbJsonLd items={[{ name: "Contact Us", path: "/contact" }]} />
      {/* Hero Header */}
      <ContactHeroSection data={heroData} />

      {/* Contact Details & Inquiry Form */}
      <ContactInquirySection data={inquiryData} />

      {/* Why Choose Us Trust Factors */}
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
