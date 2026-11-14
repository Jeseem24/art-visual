import React, { memo } from "react";
import styles from "./HeroHeader.module.css";

export interface HeroHeaderProps {
  /** Optional badge component, e.g. <Badge>...</Badge> */
  badge?: React.ReactNode;
  /** Primary display headline lines */
  headline: {
    line1: React.ReactNode;
    line2?: React.ReactNode;
  };
  /** Subtitle description string or element */
  subtitle?: React.ReactNode;
  /** Custom max-width for the headline (e.g. 858, 945, "945px") */
  headlineMaxWidth?: number | string;
  /** Custom max-width for the subtitle (e.g. 619, 682, "682px") */
  subtitleMaxWidth?: number | string;
  /** Semantic HTML tag for the headline */
  as?: "h1" | "h2";
  /** Optional custom CSS class name for wrapper */
  className?: string;
}

/**
 * @component HeroHeader
 * @description Standardized Hero header component featuring badge wrapper,
 * Bebas Neue display headline with red highlight support, and Outfit subtitle.
 */
export const HeroHeader = memo(function HeroHeader({
  badge,
  headline,
  subtitle,
  headlineMaxWidth,
  subtitleMaxWidth,
  as: Component = "h1",
  className = "",
}: HeroHeaderProps) {
  const customStyle =
    headlineMaxWidth || subtitleMaxWidth
      ? ({
          ...(headlineMaxWidth && {
            "--hero-headline-max-width":
              typeof headlineMaxWidth === "number"
                ? `${headlineMaxWidth}px`
                : headlineMaxWidth,
          }),
          ...(subtitleMaxWidth && {
            "--hero-subtitle-max-width":
              typeof subtitleMaxWidth === "number"
                ? `${subtitleMaxWidth}px`
                : subtitleMaxWidth,
          }),
        } as React.CSSProperties)
      : undefined;

  return (
    <div className={`${styles.contentWrapper} ${className}`.trim()} style={customStyle}>
      {/* Optional Badge Row */}
      {badge && <div className={styles.badgeWrapper}>{badge}</div>}

      {/* Display Headline */}
      <Component className={styles.headline}>
        <span className={styles.headlineLine}>{headline.line1}</span>
        {headline.line2 && <span className={styles.headlineLine}>{headline.line2}</span>}
      </Component>

      {/* Subtitle */}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
});

export default HeroHeader;

