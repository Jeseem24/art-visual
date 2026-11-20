import React, { memo } from "react";
import { HeroHeader } from "@/components/ui/HeroHeader";
import { ABOUT_HERO_DEFAULTS, AboutHeroData } from "./constants";
import styles from "./AboutHeroSection.module.css";

export interface AboutHeroSectionProps {
  data?: Partial<AboutHeroData>;
  className?: string;
}

/**
 * @component AboutHeroSection
 * @description Hero introduction section for the About page, reusing the HeroHeader component.
 */
export const AboutHeroSection = memo(function AboutHeroSection({
  data,
  className = "",
}: AboutHeroSectionProps) {
  const headline = data?.headline ?? ABOUT_HERO_DEFAULTS.headline;
  const subtitle = data?.subtitle ?? ABOUT_HERO_DEFAULTS.subtitle;
  const isDefaultHeadline =
    headline.line1 === ABOUT_HERO_DEFAULTS.headline.line1 &&
    headline.line2Prefix === ABOUT_HERO_DEFAULTS.headline.line2Prefix;

  return (
    <section className={`${styles.hero} ${className}`.trim()} aria-label="About Hero">
      <div className={styles.container}>
        <HeroHeader
          as="h1"
          headlineMaxWidth={945}
          headline={{
            line1: (
              <>
                <span className={styles.desktopOnly}>
                  {headline.line1}
                </span>
                <span className={styles.mobileLine}>
                  {isDefaultHeadline ? "We Turn Stories" : headline.line1}
                </span>
              </>
            ),
            line2: (
              <>
                <span className={styles.desktopOnly}>
                  {headline.line2Prefix}{" "}
                  <span className={styles.highlight}>{headline.line2Highlight}</span>
                </span>
                <span className={styles.mobileOnly}>
                  <span className={styles.mobileLine}>
                    {isDefaultHeadline ? "Into Visual" : headline.line2Prefix}
                  </span>
                  <span className={`${styles.mobileLine} ${styles.highlight}`}>
                    {headline.line2Highlight}
                  </span>
                </span>
              </>
            ),
          }}
          subtitle={subtitle}
        />
      </div>
    </section>
  );
});

export default AboutHeroSection;
