import React, { memo } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProcessStepBadge, ProcessStepCard } from "@/components/ui/ProcessStepCard";
import {
  SERVICES_PROCESS_DEFAULTS,
  type ServicesProcessData,
} from "./constants";
import styles from "./ServicesProcessSection.module.css";

export interface ServicesProcessSectionProps {
  data?: Partial<ServicesProcessData>;
  className?: string;
}

/**
 * @component ServicesProcessSection
 * @description "Our Creative Process" 3-column grid showcase for the Services page.
 */
export const ServicesProcessSection = memo(function ServicesProcessSection({
  data,
  className = "",
}: ServicesProcessSectionProps) {
  const content: ServicesProcessData = {
    ...SERVICES_PROCESS_DEFAULTS,
    ...data,
  };

  return (
    <section
      className={`${styles.section} ${className}`.trim()}
      aria-labelledby="services-process-heading"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <SectionHeader
          id="services-process-heading"
          badgeText={content.badge.text}
          align="center"
          size="compact"
          title={
            <>
              <span className={styles.desktopHeadline}>
                <span className={styles.desktopLine}>{content.headline.line1}</span>
                <span className={styles.desktopLine}>{content.headline.line2}</span>
              </span>
              <span className={styles.mobileHeadline}>
                <span className={styles.mobileLine}>From the First Idea to</span>
                <span className={styles.mobileLine}>The Final Frame, We</span>
                <span className={styles.mobileLine}>Make Every Step Count.</span>
              </span>
            </>
          }
        />

        {/* 5-Step Grid (3 top row + 2 bottom row on desktop) */}
        <div className={styles.stepsGrid}>
          {content.steps.map((step) => (
            <div key={step.id} className={styles.stepItem}>
              <ProcessStepBadge
                stepNumber={step.number}
                label={step.label}
                labelAlign="center"
              />
              <ProcessStepCard
                title={step.title}
                description={step.description}
                className={styles.stepCard}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default ServicesProcessSection;

