import React, { memo } from "react";
import { HeroHeader } from "@/components/ui/HeroHeader";
import { SERVICES_HERO_DEFAULTS, type ServicesHeroData } from "./constants";
import styles from "./ServicesHeroSection.module.css";

export interface ServicesHeroSectionProps {
  data?: Partial<ServicesHeroData>;
  className?: string;
}

/**
 * @component ServicesHeroSection
 * @description Hero introduction section for the Services page reusing HeroHeader.
 */
export const ServicesHeroSection = memo(function ServicesHeroSection({
  data,
  className = "",
}: ServicesHeroSectionProps) {
  const headline = data?.headline ?? SERVICES_HERO_DEFAULTS.headline;
  const subtitle = data?.subtitle ?? SERVICES_HERO_DEFAULTS.subtitle;

  return (
    <section
      className={`${styles.hero} ${className}`.trim()}
      aria-label="Services Hero"
    >
      <div className={styles.container}>
        <HeroHeader
          as="h1"
          headlineMaxWidth={1021}
          subtitleMaxWidth={760}
          className={styles.heroHeader}
          headline={{
            line1: (
              <>
                <span className={styles.desktopOnly}>{headline.line1}</span>
                <span className={styles.mobileOnly}>
                  <span className={styles.mobileLine}>Creative Vision.</span>
                  <span className={styles.mobileLine}>Powerful Visuals.</span>
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
                  <span className={styles.mobileLine}>Meaningful</span>
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

export default ServicesHeroSection;

