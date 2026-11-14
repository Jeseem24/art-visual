import React, { memo } from "react";
import styles from "./DisplayNumber.module.css";

export interface DisplayNumberProps {
  /** Numeric or text value, e.g. "01", 1, "02" */
  value: string | number;
  /** Whether to auto-pad single digits (e.g. 1 -> "01"). Default: true */
  pad?: boolean;
  /** Size variant */
  size?: "default" | "compact" | "large";
  /** Color variant */
  color?: "red" | "dark" | "white" | "muted";
  /** Whether the element is purely decorative (adds aria-hidden="true"). Default: true */
  decorative?: boolean;
  /** Optional custom CSS class name */
  className?: string;
}

/**
 * @component DisplayNumber
 * @description Oversized Bebas Neue numeral for steps, numbered value cards, and indexes.
 */
export const DisplayNumber = memo(function DisplayNumber({
  value,
  pad = true,
  size = "default",
  color = "red",
  decorative = true,
  className = "",
}: DisplayNumberProps) {
  const formattedValue =
    pad && typeof value === "number" && value < 10
      ? `0${value}`
      : pad && typeof value === "string" && /^\d$/.test(value)
      ? `0${value}`
      : String(value);

  const sizeClass =
    size === "compact"
      ? styles.sizeCompact
      : size === "large"
      ? styles.sizeLarge
      : styles.sizeDefault;

  const colorClass =
    color === "dark"
      ? styles.colorDark
      : color === "white"
      ? styles.colorWhite
      : color === "muted"
      ? styles.colorMuted
      : styles.colorRed;

  return (
    <span
      className={`${styles.displayNumber} ${sizeClass} ${colorClass} ${className}`.trim()}
      aria-hidden={decorative ? "true" : undefined}
    >
      {formattedValue}
    </span>
  );
});

export default DisplayNumber;

