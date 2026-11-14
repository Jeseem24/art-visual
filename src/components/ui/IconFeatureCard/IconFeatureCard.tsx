import React, { memo } from "react";
import Image from "next/image";
import { CardTitle } from "@/components/ui/CardTitle";
import { CardDescription } from "@/components/ui/CardDescription";
import styles from "./IconFeatureCard.module.css";

export interface IconFeatureCardProps {
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** SVG icon path */
  icon: string;
  /** Optional icon alt text (decorative by default) */
  iconAlt?: string;
  /** Optional custom CSS class name */
  className?: string;
}

/**
 * @component IconFeatureCard
 * @description Reusable capability/service card featuring a red rounded icon badge,
 * CardTitle, and CardDescription.
 */
export const IconFeatureCard = memo(function IconFeatureCard({
  title,
  description,
  icon,
  iconAlt = "",
  className = "",
}: IconFeatureCardProps) {
  return (
    <article className={`group ${styles.card} ${className}`.trim()}>
      {/* Red Icon Container */}
      <div className={styles.iconBadge} aria-hidden={iconAlt === ""}>
        <Image
          src={icon}
          alt={iconAlt}
          width={27}
          height={27}
          className={styles.iconImage}
          unoptimized
        />
      </div>

      {/* Title */}
      <CardTitle
        as="h3"
        size="compact"
        tone="black"
        hoverEffect
        className={styles.title}
      >
        {title}
      </CardTitle>

      {/* Description */}
      <CardDescription
        size="xl"
        tone="muted"
        className={styles.description}
      >
        {description}
      </CardDescription>
    </article>
  );
});

export default IconFeatureCard;

