import React, { memo } from "react";
import { CardTitle } from "@/components/ui/CardTitle";
import { CardDescription } from "@/components/ui/CardDescription";
import { DisplayNumber } from "@/components/ui/DisplayNumber";
import styles from "./ProcessStepCard.module.css";

export interface ProcessStepBadgeProps {
  /** Numeric step index (e.g. 1, 2, 3...) */
  stepNumber: number | string;
  /** Short uppercase step label (e.g. "Discover", "Plan") */
  label: string;
  /** Horizontal alignment of label above badge box (default: 'center') */
  labelAlign?: "center" | "left" | "right";
  /** Optional custom CSS class name */
  className?: string;
}

/**
 * @component ProcessStepBadge
 * @description Reusable dark rounded numbered step indicator with label, built using DisplayNumber.
 */
export const ProcessStepBadge = memo(function ProcessStepBadge({
  stepNumber,
  label,
  labelAlign = "center",
  className = "",
}: ProcessStepBadgeProps) {
  const alignClass =
    labelAlign === "right"
      ? styles.badgeAlignRight
      : labelAlign === "left"
      ? styles.badgeAlignLeft
      : styles.badgeAlignCenter;

  return (
    <div className={`${styles.badgeWrapper} ${alignClass} ${className}`.trim()}>
      <p className={styles.stepLabel}>{label}</p>
      <div className={styles.numberBox}>
        <DisplayNumber
          value={stepNumber}
          pad={false}
          size="compact"
          color="white"
          decorative={false}
          className={styles.numberText}
        />
      </div>
    </div>
  );
});

export interface ProcessStepCardProps {
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Optional custom CSS class name */
  className?: string;
}

/**
 * @component ProcessStepCard
 * @description Reusable process step card built using CardTitle and CardDescription.
 */
export const ProcessStepCard = memo(function ProcessStepCard({
  title,
  description,
  className = "",
}: ProcessStepCardProps) {
  return (
    <article className={`group ${styles.card} ${className}`.trim()}>
      <CardTitle
        as="h3"
        size="compact"
        tone="black"
        hoverEffect
        className={styles.title}
      >
        {title}
      </CardTitle>

      <CardDescription
        size="default"
        tone="muted"
        className={styles.description}
      >
        {description}
      </CardDescription>
    </article>
  );
});

export default ProcessStepCard;

