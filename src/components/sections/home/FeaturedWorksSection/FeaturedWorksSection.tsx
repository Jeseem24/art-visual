import React, { memo } from "react";
import { WorkCard } from "./WorkCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FEATURED_WORKS_DEFAULTS, FEATURED_WORKS_ITEMS, type WorkItem } from "./constants";
import styles from "./FeaturedWorksSection.module.css";

export interface FeaturedWorksSectionProps {
  /** Subtitle text */
  badgeText?: string;
  /** Primary headline */
  headline?: string;
  /** List of featured work projects */
  items?: WorkItem[];
  /** Optional custom class name */
  className?: string;
}

/**
 * @component FeaturedWorksSection
 * @description Featured Works section with infinite looping project carousel and CTA button.
 */
export const FeaturedWorksSection = memo(function FeaturedWorksSection({
  badgeText = FEATURED_WORKS_DEFAULTS.badge.text,
  headline = FEATURED_WORKS_DEFAULTS.headline.text,
  items = FEATURED_WORKS_ITEMS,
  className = "",
}: FeaturedWorksSectionProps) {
  return (
    <section className={`${styles.section} ${className}`} aria-labelledby="featured-works-heading">
      <div className={styles.container}>
        {/* Section Header */}
        <SectionHeader
          id="featured-works-heading"
          badgeText={badgeText}
          title={
            headline === FEATURED_WORKS_DEFAULTS.headline.text ? (
              <>
                <span className={styles.desktopHeadline}>{headline}</span>
                <span className={styles.mobileHeadline}>
                  <span className={styles.mobileLine}>Creativity in</span>
                  <span className={styles.mobileLine}>Every Frame</span>
                </span>
              </>
            ) : (
              headline
            )
          }
        />
      </div>

      {/* Showcase Carousel Track */}
      <div
        className={styles.carouselWrapper}
        role="region"
        aria-label="Featured Works Showcase"
      >
        <div className={styles.marqueeTrack}>
          {/* Set 1: Primary Track */}
          <div className={styles.cardsGroup}>
            {items.map((item) => (
              <WorkCard
                key={`primary-${item.id}`}
                title={item.title}
                imageSrc={item.imageSrc}
                alt={item.alt}
              />
            ))}
          </div>

          {/* Set 2: Duplicate Track for Seamless Loop */}
          <div className={styles.cardsGroup} aria-hidden="true">
            {items.map((item) => (
              <WorkCard
                key={`duplicate-${item.id}`}
                title={item.title}
                imageSrc={item.imageSrc}
                alt={item.alt}
              />
            ))}
          </div>
        </div>
      </div>

      {/* View All Works CTA Button */}
      <div className={styles.ctaWrapper}>
        <Button
          href="/work"
          className={styles.viewAllButton}
        >
          View all Works
        </Button>
      </div>
    </section>
  );
});

export default FeaturedWorksSection;
