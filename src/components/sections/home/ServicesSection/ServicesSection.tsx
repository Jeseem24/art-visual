import React, { memo } from "react";
import { ServiceCard } from "./ServiceCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICES_HEADER_DEFAULTS, SERVICES_ITEMS, type ServiceItem } from "./constants";
import styles from "./ServicesSection.module.css";

export interface ServicesSectionProps {
  /** Subtitle text */
  badgeText?: string;
  /** Primary headline line 1 */
  titleLine1?: string;
  /** Primary headline line 2 */
  titleLine2?: string;
  /** Services list */
  services?: ServiceItem[];
  /** Optional custom class name */
  className?: string;
}

/**
 * @component ServicesSection
 * @description Services section displaying overview grid of video production capabilities.
 */
export const ServicesSection = memo(function ServicesSection({
  badgeText = SERVICES_HEADER_DEFAULTS.badge.text,
  titleLine1 = SERVICES_HEADER_DEFAULTS.title.line1,
  titleLine2 = SERVICES_HEADER_DEFAULTS.title.line2,
  services = SERVICES_ITEMS,
  className = "",
}: ServicesSectionProps) {
  return (
    <section className={`${styles.section} ${className}`} aria-labelledby="services-heading">
      <div className={styles.container}>
        {/* Section Header */}
        <SectionHeader
          id="services-heading"
          badgeText={badgeText}
          title={{ line1: titleLine1, line2: titleLine2 }}
        />

        {/* Services Grid */}
        <div className={styles.cardsGrid}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              videoSrc={service.videoSrc}
              href={service.href}
              ctaLabel={service.ctaLabel}
            />
          ))}
        </div>

        {/* View All Services CTA Button */}
        <div className={styles.ctaWrapper}>
          <Button
            href="/services"
            className={styles.viewAllButton}
          >
            View all Services
          </Button>
        </div>
      </div>
    </section>
  );
});

export default ServicesSection;

