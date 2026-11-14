import React, { memo } from "react";
import styles from "./SectionHeader.module.css";

/**
 * Standard Camera Vector Icon used in section headers
 */
export const CameraIcon = memo(function CameraIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="17.2857"
      viewBox="0 0 22 17.2857"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.cameraIcon} ${className}`.trim()}
      aria-hidden="true"
    >
      <path
        d="M20.8214 3.49397L17.6786 5.30357V1.57143C17.6786 0.704687 16.9739 0 16.1071 0H1.57143C0.704687 0 0 0.704687 0 1.57143V15.7143C0 16.581 0.704687 17.2857 1.57143 17.2857H16.1071C16.9739 17.2857 17.6786 16.581 17.6786 15.7143V11.9821L20.8214 13.7917C21.3444 14.0937 22 13.7156 22 13.1141V4.17411C22 3.57009 21.3444 3.19196 20.8214 3.49397ZM15.9107 15.5179H1.76786V1.76786H15.9107V15.5179ZM20.2321 11.4174L17.6786 9.94911V7.33906L20.2321 5.8683V11.4174ZM3.53571 4.91071H6.28571C6.39375 4.91071 6.48214 4.82232 6.48214 4.71429V3.53571C6.48214 3.42768 6.39375 3.33929 6.28571 3.33929H3.53571C3.42768 3.33929 3.33929 3.42768 3.33929 3.53571V4.71429C3.33929 4.82232 3.42768 4.91071 3.53571 4.91071Z"
        fill="currentColor"
      />
    </svg>
  );
});

export interface SectionHeaderProps {
  /** Optional subtitle badge text (e.g. "Why Choose Us") */
  badgeText?: string;
  /** Custom badge icon (defaults to standard camera SVG) */
  badgeIcon?: React.ReactNode;
  /** Headline text: string, ReactNode, or split lines object { line1, line2 } */
  title: React.ReactNode | { line1: React.ReactNode; line2?: React.ReactNode };
  /** Alignment: center (default) or left */
  align?: "center" | "left";
  /** Theme: 'dark' (default: #2D2D2D) or 'light' (#FFFFFF for red/dark backgrounds) */
  theme?: "dark" | "light";
  /** Semantic HTML tag: 'h1' | 'h2' | 'h3' (default: 'h2') */
  as?: "h1" | "h2" | "h3";
  /** Size variant: 'default' (105.5px) | 'compact' (85.5px) | 'hero' (106.8px) */
  size?: "default" | "compact" | "hero";
  /** HTML id for section anchor/accessibility */
  id?: string;
  /** Wrapper CSS class */
  className?: string;
  /** Headline CSS class override */
  headlineClassName?: string;
}

/**
 * Reusable section header with badge, camera icon, and multi-line headline.
 */
export const SectionHeader = memo(function SectionHeader({
  badgeText,
  badgeIcon = <CameraIcon />,
  title,
  align = "center",
  theme = "dark",
  as: Component = "h2",
  size = "default",
  id,
  className = "",
  headlineClassName = "",
}: SectionHeaderProps) {
  const isLeft = align === "left";
  const isLight = theme === "light";

  const alignClass = isLeft ? styles.alignLeft : styles.alignCenter;
  const themeClass = isLight ? styles.themeLight : styles.themeDark;
  const sizeClass =
    size === "compact"
      ? styles.sizeCompact
      : size === "hero"
      ? styles.sizeHero
      : styles.sizeDefault;

  // Determine lines
  const lines: React.ReactNode[] = [];
  if (typeof title === "string") {
    if (title.includes("\n")) {
      lines.push(...title.split("\n"));
    } else {
      lines.push(title);
    }
  } else if (title && typeof title === "object") {
    if ("line1" in title || "line2" in title) {
      const splitTitle = title as { line1?: React.ReactNode; line2?: React.ReactNode };
      if (splitTitle.line1) lines.push(splitTitle.line1);
      if (splitTitle.line2) lines.push(splitTitle.line2);
    } else {
      lines.push(title as React.ReactNode);
    }
  } else if (title) {
    lines.push(title);
  }

  return (
    <div
      className={`${styles.headerWrapper} ${alignClass} ${themeClass} ${className}`.trim()}
    >
      {/* Subtitle Badge Row */}
      {badgeText && (
        <div className={styles.badgeRow}>
          {badgeIcon}
          <p className={styles.badgeText}>
            {badgeText}
          </p>
        </div>
      )}

      {/* Main Headline */}
      <Component
        id={id}
        className={`${styles.headline} ${sizeClass} ${headlineClassName}`.trim()}
      >
        {lines.length > 1 ? (
          lines.map((line, idx) => (
            <span key={idx} className={styles.headlineLine}>
              {line}
            </span>
          ))
        ) : (
          lines[0] || ""
        )}
      </Component>
    </div>
  );
});
