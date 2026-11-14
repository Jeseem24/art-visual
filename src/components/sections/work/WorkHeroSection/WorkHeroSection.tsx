import React, { memo } from "react";
import { HeroHeader } from "@/components/ui/HeroHeader";
import { WORK_HERO_DEFAULTS, type WorkHeroData } from "./constants";
import styles from "./WorkHeroSection.module.css";

export interface WorkHeroSectionProps {
  data?: Partial<WorkHeroData>;
  className?: string;
}

/**
 * @component WorkHeroSection
 * @description Hero introduction section for the Work page reusing HeroHeader.
 */
export const WorkHeroSection = memo(function WorkHeroSection({
  data,
  className = "",
}: WorkHeroSectionProps) {
  const headline = data?.headline ?? WORK_HERO_DEFAULTS.headline;
  const subtitle = data?.subtitle ?? WORK_HERO_DEFAULTS.subtitle;

  return (
    <section
      className={`${styles.hero} ${className}`.trim()}
      aria-label="Work Hero"
    >
      <div className={styles.container}>
        <HeroHeader
          as="h1"
          headlineMaxWidth={1021}
          subtitleMaxWidth={774}
          className={styles.heroHeader}
          headline={{
            line1: (
              <>
                <span className={styles.desktopHeadline}>
                  <span className={styles.desktopLine}>{headline.line1}</span>
                  <span className={styles.desktopLine}>
                    {headline.line2Prefix}{" "}
                    <span className={styles.highlight}>{headline.line2Highlight}</span>
                  </span>
                </span>
                <span className={styles.mobileHeadline}>
                  <span className={styles.mobileLine}>Bringing Stories</span>
                  <span className={styles.mobileLine}>to Life Through</span>
                  <span className={styles.mobileLine}>
                    <span className={styles.highlight}>Our Work.</span>
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

export default WorkHeroSection;
