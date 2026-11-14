import React, { memo } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WHO_WE_ARE_DEFAULTS, type WhoWeAreData } from "./constants";
import styles from "./WhoWeAreSection.module.css";

export interface WhoWeAreSectionProps {
  data?: Partial<WhoWeAreData>;
  className?: string;
}

/**
 * @component WhoWeAreSection
 * @description Narrative section showcasing company story, mission, and studio photo.
 */
export const WhoWeAreSection = memo(function WhoWeAreSection({
  data,
  className = "",
}: WhoWeAreSectionProps) {
  const content: WhoWeAreData = {
    ...WHO_WE_ARE_DEFAULTS,
    ...data,
  };

  return (
    <section
      className={`${styles.section} ${className}`.trim()}
      aria-labelledby="who-we-are-heading"
    >
      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          {/* Left Column: Heading & Story Paragraphs */}
          <div className={styles.leftColumn}>
            <SectionHeader
              id="who-we-are-heading"
              badgeText={content.badge.text}
              align="left"
              size="default"
              className={styles.sectionHeader}
              title={{
                line1: content.headline.line1,
                line2: content.headline.line2,
              }}
            />

            <div className={styles.paragraphsWrapper}>
              {content.paragraphs.map((paragraph, index) => (
                <p key={index} className={styles.storyParagraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Image Asset */}
          <div className={styles.rightColumn}>
            <div className={styles.imageFrame}>
              <Image
                src={content.image.src}
                alt={content.image.alt}
                width={content.image.width}
                height={content.image.height}
                className={styles.image}
                sizes="(max-width: 1024px) 100vw, 735px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default WhoWeAreSection;

