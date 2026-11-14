import React, { memo, useId } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./ServiceSplitHighlightsSection.module.css";

export interface ServiceHighlightCardItem {
  id: string;
  title: string;
  description: string;
}

export interface ServiceSplitHighlightsSectionProps {
  /** Optional HTML id for section anchor navigation */
  id?: string;
  /** Subtitle badge text rendered above the headline */
  badgeText: string;
  /** Section headline as a single string or two-line object */
  headline: { line1: string; line2: string } | string;
  /** Highlight cards displayed in a 2x2 grid */
  cards: ServiceHighlightCardItem[];
  /** Path or URL for the showcase photograph */
  imageSrc: string;
  /** Meaningful alt text for the showcase photograph */
  imageAlt: string;
  /** Placement of the image column on desktop (default: "left") */
  imagePosition?: "left" | "right";
  /** Optional additional class name for page-level spacing overrides */
  className?: string;
}

/**
 * @component ServiceSplitHighlightsSection
 * @description Reusable split-layout section pairing a rounded shoot photograph
 * with a left-aligned SectionHeader and a 2x2 highlight card grid.
 * Supports image-left ("What We Offer") and image-right ("What You'll Receive") variants.
 */
export const ServiceSplitHighlightsSection = memo(
  function ServiceSplitHighlightsSection({
    id,
    badgeText,
    headline,
    cards,
    imageSrc,
    imageAlt,
    imagePosition = "left",
    className = "",
  }: ServiceSplitHighlightsSectionProps) {
    const reactId = useId();
    const headingId = id
      ? `${id}-heading`
      : `service-split-highlights-${reactId}`;

    const positionClass =
      imagePosition === "right" ? styles.imageRight : styles.imageLeft;

    const resolvedTitle =
      typeof headline === "object" && headline.line1 && headline.line2
        ? { line1: headline.line1, line2: headline.line2 }
        : headline;

    return (
      <section
        id={id}
        className={`${styles.section} ${className}`.trim()}
        aria-labelledby={headingId}
      >
        <div className={styles.container}>
          <div className={`${styles.splitGrid} ${positionClass}`}>
            {/* Content Column: Header + 2x2 Highlight Cards */}
            <div className={styles.contentColumn}>
              <SectionHeader
                id={headingId}
                badgeText={badgeText}
                align="left"
                size="compact"
                title={resolvedTitle}
                className={styles.sectionHeader}
              />

              <div className={styles.cardsGrid}>
                {cards.map((card) => (
                  <article key={card.id} className={styles.card}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardDescription}>
                      {card.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Media Column: Showcase Shoot Image */}
            <div className={styles.mediaColumn}>
              <div className={styles.imageFrame}>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 825px"
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default ServiceSplitHighlightsSection;
