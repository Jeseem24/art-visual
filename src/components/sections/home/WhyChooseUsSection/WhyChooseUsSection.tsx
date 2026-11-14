import React, { memo } from "react";
import { ValueCard } from "./ValueCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WHY_CHOOSE_US_DEFAULTS, type WhyChooseUsData } from "./constants";
import styles from "./WhyChooseUsSection.module.css";

export interface WhyChooseUsSectionProps {
  /** Optional custom data overrides */
  data?: Partial<WhyChooseUsData>;
  /** Optional custom class name */
  className?: string;
}

/**
 * @component WhyChooseUsSection
 * @description Why Choose Us section with 6 value proposition cards.
 */
export const WhyChooseUsSection = memo(function WhyChooseUsSection({
  data = WHY_CHOOSE_US_DEFAULTS,
  className = "",
}: WhyChooseUsSectionProps) {
  const content = { ...WHY_CHOOSE_US_DEFAULTS, ...data };

  return (
    <section
      className={`${styles.section} ${className}`.trim()}
      aria-labelledby="why-choose-us-heading"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <SectionHeader
          id="why-choose-us-heading"
          className={styles.header}
          headlineClassName={styles.headline}
          badgeText={content.badge.text}
          title={
            content.headline.line1 && content.headline.line2
              ? { line1: content.headline.line1, line2: content.headline.line2 }
              : content.headline.text
          }
        />

        {/* 6 Value Cards Grid */}
        <div className={styles.cardsGrid}>
          {content.items.map((item) => (
            <ValueCard
              key={item.id}
              number={item.number}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

