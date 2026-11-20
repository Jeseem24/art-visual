import React, { memo } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProcessStepBadge, ProcessStepCard } from "@/components/ui/ProcessStepCard";
import { CREATIVE_PROCESS_DEFAULTS, type CreativeProcessData } from "./constants";
import styles from "./CreativeProcessSection.module.css";

export interface CreativeProcessSectionProps {
  data?: Partial<CreativeProcessData>;
  className?: string;
}

/**
 * @component CreativeProcessSection
 * @description "Our Creative Process" curved 5-step timeline on desktop and vertical timeline on mobile.
 */
export const CreativeProcessSection = memo(function CreativeProcessSection({
  data,
  className = "",
}: CreativeProcessSectionProps) {
  const content: CreativeProcessData = {
    ...CREATIVE_PROCESS_DEFAULTS,
    ...data,
  };

  const isDefaultHeadline =
    content.headline.line1 === CREATIVE_PROCESS_DEFAULTS.headline.line1 &&
    content.headline.line2 === CREATIVE_PROCESS_DEFAULTS.headline.line2;

  return (
    <section
      className={`${styles.section} ${className}`.trim()}
      aria-labelledby="creative-process-heading"
    >
      {/* Section Header */}
      <div className={styles.headerContainer}>
        <SectionHeader
          id="creative-process-heading"
          badgeText={content.badge.text}
          align="center"
          size="default"
          title={
            <>
              <span className={styles.desktopHeadline}>
                <span className={styles.desktopLine}>{content.headline.line1}</span>
                <span className={styles.desktopLine}>{content.headline.line2}</span>
              </span>
              <span className={styles.mobileHeadline}>
                {isDefaultHeadline ? (
                  <>
                    <span className={styles.mobileLine}>From the First Idea to</span>
                    <span className={styles.mobileLine}>The Final Frame, We</span>
                    <span className={styles.mobileLine}>Make Every Step Count.</span>
                  </>
                ) : (
                  <>
                    <span className={styles.mobileLine}>{content.headline.line1}</span>
                    <span className={styles.mobileLine}>{content.headline.line2}</span>
                  </>
                )}
              </span>
            </>
          }
        />
      </div>

      {/* Desktop Curved Timeline */}
      <div className={styles.desktopTimeline}>
        <svg
          viewBox="0 0 1920 1850"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.curveSvg}
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <g transform="translate(40, -21) rotate(14)">
            <path
              d="M12.5033 234.252C21.6792 211.074 54.9904 184.508 91.1377 155.449C355.839 -57.3447 743.34 -32.4456 934.649 229.168C945.636 244.193 955.92 259.888 965.348 276.052M2209.15 956.986C2197.91 973.733 2192.41 980.312 2187.76 986.991C2039.82 1222.92 1726.27 1234.88 1581.57 990.904C1459.3 784.733 1376.84 313.649 1026.35 274.924C1006.69 272.752 986.192 273.252 965.348 276.052M965.348 276.052C1053.69 427.528 1066.8 620.116 878.315 686.957C840.844 700.245 787.724 702.783 745.765 682.122C510.401 566.229 755.252 304.278 965.348 276.052Z"
              stroke="#CD3743"
              strokeWidth="25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>

        {content.steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className={`${styles.badgeNode} ${styles[`badgeStep${index}`]}`}>
              <ProcessStepBadge
                stepNumber={step.number}
                label={step.label}
                labelAlign={step.labelAlign}
              />
            </div>

            <div className={`${styles.cardNode} ${styles[`cardStep${index}`]}`}>
              <ProcessStepCard title={step.title} description={step.description} />
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Mobile & Tablet Horizontal Scroll Timeline  */}
      <div className={styles.mobileScrollContainer}>
        <div className={styles.mobileTimelineCanvas}>
          {/* Mobile Curved Ribbon Vector (Inline SVG for 100% reliable rendering across DevTools & mobile browsers) */}
          <div className={styles.mobileCurveWrapper} aria-hidden="true">
            <div className={styles.mobileCurveRotator}>
              <div className={styles.mobileCurveInner}>
                <svg
                  preserveAspectRatio="none"
                  overflow="visible"
                  viewBox="0 0 1581.96 524.266"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.mobileCurveSvg}
                >
                  <path
                    d="M8.01495 150.161C13.8969 135.304 35.2502 118.274 58.4215 99.6465C228.101 -36.7594 476.499 -20.7984 599.133 146.902C606.216 156.588 611.534 167.471 615.275 179.032M1573.95 516.252C840.286 423.342 882.59 201.057 657.917 176.233C644.989 174.805 630.421 175.915 615.275 179.032M615.275 179.032C518.036 199.045 397.014 301.794 533.579 346.619C593.831 366.396 640.573 257.199 615.275 179.032Z"
                    strokeWidth="16.0256"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#CD3743"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* 5 Steps: Badges & Cards */}
          {content.steps.map((step, idx) => (
            <React.Fragment key={`mobile-${step.id}`}>
              <div className={`${styles.mobileBadgeNode} ${styles[`mobileBadgeStep${idx}`]}`}>
                <ProcessStepBadge
                  stepNumber={step.number}
                  label={step.label}
                  labelAlign="center"
                  className={styles.mobileBadgeOverride}
                />
              </div>

              <div className={`${styles.mobileCardNode} ${styles[`mobileCardStep${idx}`]}`}>
                <ProcessStepCard
                  title={step.title}
                  description={step.description}
                  className={styles.mobileCardOverride}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
});

export default CreativeProcessSection;

