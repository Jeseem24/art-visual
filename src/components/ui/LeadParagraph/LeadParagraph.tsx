import React, { memo } from "react";
import styles from "./LeadParagraph.module.css";

export interface LeadParagraphProps {
  children: React.ReactNode;
  /** Size variant: 'large' (About hero scale ~50px), 'medium' (editorial scale ~24px), 'small' (~20px) */
  size?: "large" | "medium" | "small";
  /** Tone variant */
  tone?: "dark" | "muted" | "subtle" | "white";
  /** Maximum width in px, rem, or CSS string */
  maxWidth?: string | number;
  /** HTML element to render */
  as?: "p" | "div" | "span";
  /** Optional custom CSS class name */
  className?: string;
}

/**
 * @component LeadParagraph
 * @description Editorial narrative and lead intro paragraph with responsive clamp typography.
 */
export const LeadParagraph = memo(function LeadParagraph({
  children,
  size = "medium",
  tone = "muted",
  maxWidth,
  as: Component = "p",
  className = "",
}: LeadParagraphProps) {
  const sizeClass =
    size === "large"
      ? styles.sizeLarge
      : size === "small"
      ? styles.sizeSmall
      : styles.sizeMedium;

  const toneClass =
    tone === "dark"
      ? styles.toneDark
      : tone === "subtle"
      ? styles.toneSubtle
      : tone === "white"
      ? styles.toneWhite
      : styles.toneMuted;

  const styleObj = maxWidth !== undefined ? { maxWidth } : undefined;

  return (
    <Component
      className={`${styles.leadParagraph} ${sizeClass} ${toneClass} ${className}`.trim()}
      style={styleObj}
    >
      {children}
    </Component>
  );
});

export default LeadParagraph;

