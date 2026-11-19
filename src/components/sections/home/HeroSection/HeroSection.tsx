import React, { memo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { HeroShowcase } from "@/components/sections/home/HeroShowcase";
import { HERO_DEFAULTS } from "./constants";
import type { ShowcaseCardItem } from "@/components/sections/home/HeroShowcase/constants";
import styles from "./HeroSection.module.css";

export interface HeroSectionProps {
  /** Location badge text */
  badgeText?: string;
  /** Primary headline lines */
  headline?: {
    line1Text: string;
    line1Highlight: string;
    line2Text: string;
  };
  /** Subtitle text */
  subtitle?: string;
  /** CTA button config */
  cta?: {
    label: string;
    href: string;
  };
  /** Optional hero showcase cards */
  showcaseCards?: readonly ShowcaseCardItem[];
  /** Custom class name */
  className?: string;
}

/**
 * Outline video camera vector icon
 */
const VideoCameraOutlineIcon = () => (
  <svg
    width="18.32"
    height="14.39"
    viewBox="0 0 18.3169 14.3918"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      opacity="0.65"
      d="M17.3356 2.90903L14.7189 4.41568V1.30835C14.7189 0.586713 14.1322 0 13.4106 0H1.30835C0.586713 0 0 0.586713 0 1.30835V13.0835C0 13.8051 0.586713 14.3918 1.30835 14.3918H13.4106C14.1322 14.3918 14.7189 13.8051 14.7189 13.0835V9.97616L17.3356 11.4828C17.7711 11.7343 18.3169 11.4194 18.3169 10.9186V3.4753C18.3169 2.97241 17.7711 2.65758 17.3356 2.90903ZM13.247 12.9199H1.47189V1.47189H13.247V12.9199ZM16.845 9.50597L14.7189 8.28349V6.1104L16.845 4.88587V9.50597ZM2.94379 4.08859H5.2334C5.32335 4.08859 5.39694 4.015 5.39694 3.92505V2.94379C5.39694 2.85384 5.32335 2.78024 5.2334 2.78024H2.94379C2.85384 2.78024 2.78024 2.85384 2.78024 2.94379V3.92505C2.78024 4.015 2.85384 4.08859 2.94379 4.08859Z"
      fill="#CD3743"
    />
  </svg>
);

/**
 * CTA Arrow Vector Icon
 */
const CtaArrowVector = () => (
  <svg
    width="23.08"
    height="20.92"
    viewBox="0 0 23.079 20.9235"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M0 10.4618H21.5548M11.8552 20.1614L21.5548 10.4618L11.8552 0.762079"
      stroke="white"
      strokeWidth="2.15548"
    />
  </svg>
);

/**
 * @component HeroSection
 * @description Main Homepage Hero section with location badge, display headline,
 * subtitle, call-to-action button, and showcase card fan.
 */
export const HeroSection = memo(function HeroSection({
  badgeText = HERO_DEFAULTS.badge.text,
  headline = HERO_DEFAULTS.headline,
  subtitle = HERO_DEFAULTS.subtitle,
  cta = HERO_DEFAULTS.cta,
  showcaseCards,
  className = "",
}: HeroSectionProps) {
  return (
    <section className={`${styles.hero} ${className}`}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          
          {/* Location Badge */}
          <div className={styles.badgeWrapper}>
            <Badge icon={<VideoCameraOutlineIcon />} variant="locationPill">
              {badgeText}
            </Badge>
          </div>

          {/* Display Headline */}
          <h1 className={styles.headline}>
            <span className={styles.headlineLine}>
              {headline.line1Text}{" "}
              <span className={styles.highlight}>{headline.line1Highlight}</span>
            </span>
            <span className={styles.headlineLine}>
              {headline.line2Text}
            </span>
          </h1>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            {subtitle}
          </p>

          {/* Call-to-Action Button with divider and showcase cards */}
          <div className={styles.ctaRow}>
            <Link href={cta.href} className={styles.ctaButton}>
              <span className={styles.ctaText}>{cta.label}</span>
              <span className={styles.ctaDivider} aria-hidden="true" />
              <span className={styles.ctaArrow} aria-hidden="true">
                <CtaArrowVector />
              </span>
            </Link>

            <HeroShowcase cards={showcaseCards} />
          </div>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;


