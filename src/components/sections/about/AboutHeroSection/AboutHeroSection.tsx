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
                  We Turn Stories
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
                  <span className={styles.mobileLine}>Into Visual</span>
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
