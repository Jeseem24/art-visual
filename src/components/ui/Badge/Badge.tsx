import React, { memo } from "react";
import styles from "./Badge.module.css";

export interface BadgeProps {
  /** Text content displayed in the badge */
  children: React.ReactNode;
  /** Optional icon displayed before the text */
  icon?: React.ReactNode;
  /** Style variant */
  variant?: "locationPill" | "default";
  /** Optional custom CSS class name */
  className?: string;
}

/**
 * @component Badge
 * @description Pill badge component for tags and metadata labels.
 */
export const Badge = memo(function Badge({
  children,
  icon,
  variant = "locationPill",
  className = "",
}: BadgeProps) {
  return (
    <div className={`${styles.badge} ${styles[variant]} ${className}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{children}</span>
    </div>
  );
});

export default Badge;

