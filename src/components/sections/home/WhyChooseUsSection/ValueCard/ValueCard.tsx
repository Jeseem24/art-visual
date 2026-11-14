import React, { memo } from "react";
import styles from "./ValueCard.module.css";

export interface ValueCardProps {
  /** Numeric label, e.g. "01", "02" */
  number: string;
  /** Primary card title */
  title: string;
  /** Detailed card description */
  description: string;
  /** Optional custom class name */
  className?: string;
}

/**
 * @component ValueCard
 * @description Value proposition card component.
 */
export const ValueCard = memo(function ValueCard({
  number,
  title,
  description,
  className = "",
}: ValueCardProps) {
  return (
    <article className={`${styles.card} ${className}`.trim()}>
      <span className={styles.number} aria-hidden="true">
        {number}
      </span>
      <div className={styles.content}>
        <h3 className={styles.title}>
          {title}
        </h3>
        <p className={styles.description}>
          {description}
        </p>
      </div>
    </article>
  );
});

