import React, { memo } from "react";
import styles from "./CardTitle.module.css";

export interface CardTitleProps {
  children: React.ReactNode;
  /** Semantic heading tag */
  as?: "h2" | "h3" | "h4" | "span";
  /** Size variant */
  size?: "default" | "compact" | "large";
  /** Color tone */
  tone?: "dark" | "black" | "white";
  /** Turn red on hover (or when parent .group container is hovered) */
  hoverEffect?: boolean;
  /** Optional custom CSS class name */
  className?: string;
}

/**
 * @component CardTitle
 * @description Standardized card heading with Outfit font, 600 weight, and uppercase styling.
 */
export const CardTitle = memo(function CardTitle({
  children,
  as: Component = "h3",
  size = "default",
  tone = "dark",
  hoverEffect = false,
  className = "",
}: CardTitleProps) {
  const sizeClass =
    size === "compact"
      ? styles.sizeCompact
      : size === "large"
      ? styles.sizeLarge
      : styles.sizeDefault;

  const toneClass =
    tone === "white"
      ? styles.toneWhite
      : tone === "black"
      ? styles.toneBlack
      : styles.toneDark;

  const hoverClass = hoverEffect ? styles.interactive : "";

  return (
    <Component className={`${styles.cardTitle} ${sizeClass} ${toneClass} ${hoverClass} ${className}`.trim()}>
      {children}
    </Component>
  );
});

export default CardTitle;

