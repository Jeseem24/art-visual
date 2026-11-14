import React, { memo } from "react";
import styles from "./CardDescription.module.css";

export interface CardDescriptionProps {
  children: React.ReactNode;
  /** Size variant */
  size?: "default" | "compact" | "large" | "xl";
  /** Tone variant */
  tone?: "muted" | "subtle" | "white";
  /** Truncate text to N lines */
  clamp?: 1 | 2 | 3;
  /** HTML element */
  as?: "p" | "span" | "div";
  /** Optional custom CSS class name */
  className?: string;
}

/**
 * @component CardDescription
 * @description Standardized card body copy with muted opacity and optional line clamp.
 */
export const CardDescription = memo(function CardDescription({
  children,
  size = "default",
  tone = "muted",
  clamp,
  as: Component = "p",
  className = "",
}: CardDescriptionProps) {
  const sizeClass =
    size === "compact"
      ? styles.sizeCompact
      : size === "large"
      ? styles.sizeLarge
      : size === "xl"
      ? styles.sizeXl
      : styles.sizeDefault;

  const toneClass =
    tone === "subtle"
      ? styles.toneSubtle
      : tone === "white"
      ? styles.toneWhite
      : styles.toneMuted;

  const clampClass = clamp ? styles[`clamp${clamp}`] : "";

  return (
    <Component
      className={`${styles.cardDescription} ${sizeClass} ${toneClass} ${clampClass} ${className}`.trim()}
    >
      {children}
    </Component>
  );
});

export default CardDescription;

