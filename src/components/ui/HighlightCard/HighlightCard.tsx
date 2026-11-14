import React, { memo } from "react";
import { CardTitle } from "@/components/ui/CardTitle";
import { CardDescription } from "@/components/ui/CardDescription";
import styles from "./HighlightCard.module.css";

export interface HighlightCardProps {
  /** Card heading text */
  title: string;
  /** Card description body */
  description: string;
  /** Style variant: 'solidRed' (#CD3743 fill) or 'outlined' (white with dark border) */
  variant?: "solidRed" | "outlined";
  /** Optional custom CSS class name */
  className?: string;
}

/**
 * @component HighlightCard
 * @description Reusable statement/feature card composed of CardTitle and CardDescription.
 */
export const HighlightCard = memo(function HighlightCard({
  title,
  description,
  variant = "outlined",
  className = "",
}: HighlightCardProps) {
  const isRed = variant === "solidRed";
  const variantClass = isRed ? styles.variantSolidRed : styles.variantOutlined;

  return (
    <article className={`${styles.card} ${variantClass} ${className}`.trim()}>
      <CardTitle
        as="h3"
        size="default"
        tone={isRed ? "white" : "black"}
        className={styles.title}
      >
        {title}
      </CardTitle>

      <CardDescription
        size="xl"
        tone={isRed ? "white" : "muted"}
        className={styles.description}
      >
        {description}
      </CardDescription>
    </article>
  );
});

export default HighlightCard;

