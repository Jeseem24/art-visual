import React, { memo } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./ServiceDetailAboutSection.module.css";

export interface ServiceDetailAboutSectionProps {
  /** Subtitle badge label (e.g., "Overview") */
  badgeText: string;
  /** Section headline: string or structured { line1, line2, text } */
  headline: string | { line1?: string; line2?: string; text?: string };
  /** Narrative paragraphs describing the service */
  paragraphs: string[];
  /** Optional custom CSS class name */
  className?: string;
}

/**
 * @component ServiceDetailAboutSection
 * @description Service overview introduction with left-aligned SectionHeader and editorial copy.
 */
export const ServiceDetailAboutSection = memo(function ServiceDetailAboutSection({
  badgeText,
  headline,
  paragraphs,
  className = "",
}: ServiceDetailAboutSectionProps) {
  const fullText =
    typeof headline === "string"
      ? headline
      : headline.text || `${headline.line1 || ""} ${headline.line2 || ""}`.trim();

  const hasMobileSplit =
    typeof headline === "object" && Boolean(headline.line1 && headline.line2);

  const titleNode = hasMobileSplit ? (
    <>
      <span className={styles.desktopHeadline}>{fullText}</span>
      <span className={styles.mobileHeadline}>
        <span className={styles.mobileLine}>{(headline as any).line1}</span>
        <span className={styles.mobileLine}>{(headline as any).line2}</span>
      </span>
    </>
  ) : (
    fullText
  );

  return (
    <section
      className={`${styles.section} ${className}`.trim()}
      aria-labelledby="service-detail-about-heading"
    >
      <div className={styles.container}>
        <SectionHeader
          id="service-detail-about-heading"
          badgeText={badgeText}
          align="left"
          size="compact"
          title={titleNode}
        />

        {paragraphs.length > 0 && (
          <div className={styles.paragraphsWrapper}>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

export default ServiceDetailAboutSection;
