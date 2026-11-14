import React, { memo } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IconFeatureCard } from "@/components/ui/IconFeatureCard";
import { WHAT_WE_DO_DEFAULTS, type WhatWeDoData } from "./constants";
import styles from "./WhatWeDoSection.module.css";

export interface WhatWeDoSectionProps {
  data?: Partial<WhatWeDoData>;
  className?: string;
}

/**
 * @component WhatWeDoSection
 * @description "What We Do" capability cards section using SectionHeader and IconFeatureCard.
 */
export const WhatWeDoSection = memo(function WhatWeDoSection({
  data,
  className = "",
}: WhatWeDoSectionProps) {
  const content: WhatWeDoData = {
    ...WHAT_WE_DO_DEFAULTS,
    ...data,
  };

  return (
    <section
      className={`${styles.section} ${className}`.trim()}
      aria-labelledby="what-we-do-heading"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <SectionHeader
          id="what-we-do-heading"
          badgeText={content.badge.text}
          align="center"
          size="default"
          title={{
            line1: content.headline.line1,
            line2: content.headline.line2,
          }}
        />

        {/* 8 Capability Cards Grid */}
        <div className={styles.cardsGrid}>
          {content.items.map((item) => (
            <IconFeatureCard
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default WhatWeDoSection;

