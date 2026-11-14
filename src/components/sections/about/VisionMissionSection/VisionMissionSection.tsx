import React, { memo } from "react";
import { HighlightCard } from "@/components/ui/HighlightCard";
import { VISION_MISSION_DEFAULTS, type VisionMissionData } from "./constants";
import styles from "./VisionMissionSection.module.css";

export interface VisionMissionSectionProps {
  data?: Partial<VisionMissionData>;
  className?: string;
}

/**
 * @component VisionMissionSection
 * @description Side-by-side Vision and Mission cards section reusing the HighlightCard primitive.
 */
export const VisionMissionSection = memo(function VisionMissionSection({
  data,
  className = "",
}: VisionMissionSectionProps) {
  const items = data?.items ?? VISION_MISSION_DEFAULTS.items;

  return (
    <section
      className={`${styles.section} ${className}`.trim()}
      aria-label="Our Vision and Mission"
    >
      <div className={styles.container}>
        <div className={styles.cardsGrid}>
          {items.map((item) => (
            <HighlightCard
              key={item.id}
              title={item.title}
              description={item.description}
              variant={item.variant}
              className={styles.card}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default VisionMissionSection;

