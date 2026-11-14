import React, { memo } from "react";
import { TestimonialCard } from "./TestimonialCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  TESTIMONIALS_DEFAULTS,
  type TestimonialsData,
} from "./constants";
import styles from "./TestimonialsSection.module.css";

export interface TestimonialsSectionProps {
  /** Optional custom data overrides */
  data?: Partial<TestimonialsData>;
  /** Optional custom class name */
  className?: string;
}

/**
 * @component TestimonialsSection
 * @description Testimonials section displaying client feedback in a responsive grid.
 */
export const TestimonialsSection = memo(function TestimonialsSection({
  data = TESTIMONIALS_DEFAULTS,
  className = "",
}: TestimonialsSectionProps) {
  const content = { ...TESTIMONIALS_DEFAULTS, ...data };

  return (
    <section
      className={`${styles.section} ${className}`.trim()}
      aria-labelledby="testimonials-heading"
    >
      <div className={styles.container}>
        {/* Section Header (Light theme) */}
        <SectionHeader
          id="testimonials-heading"
          theme="light"
          className={styles.header}
          headlineClassName={styles.headline}
          badgeText={content.badge.text}
          title={
            content.headline.line1 && content.headline.line2
              ? { line1: content.headline.line1, line2: content.headline.line2 }
              : content.headline.text
          }
        />

        {/* Testimonial Cards Grid (Desktop & Tablet) */}
        <div className={styles.cardsGrid}>
          {content.items.map((item) => (
            <TestimonialCard
              key={item.id}
              id={item.id}
              name={item.name}
              role={item.role}
              avatar={item.avatar}
              rating={item.rating}
              quote={item.quote}
            />
          ))}
        </div>

        {/* Moving Testimonial Marquee (Mobile only <= 767px) */}
        <div className={styles.mobileMarqueeWrapper}>
          <div className={styles.mobileMarqueeTrack}>
            {[...content.items, ...content.items].map((item, idx) => (
              <TestimonialCard
                key={`${item.id}-mobile-${idx}`}
                id={item.id}
                name={item.name}
                role={item.role}
                avatar={item.avatar}
                rating={item.rating}
                quote={item.quote}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

