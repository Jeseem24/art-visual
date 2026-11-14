import React, { memo } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button label text */
  children: React.ReactNode;
  /** Link destination (renders as Next.js Link or anchor) */
  href?: string;
  /** External target */
  isExternal?: boolean;
  /** Whether to render the play badge icon */
  withPlayIcon?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * Play badge icon with rounded background
 */
export const ButtonPlayIcon = () => (
  <svg
    width="37"
    height="33"
    viewBox="0 0 37 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.playSvg}
    aria-hidden="true"
  >
    <rect width="37" height="33" rx="7" fill="white" />
    <path
      d="M13 26.5V6.5L28 16.5L13 26.5Z"
      fill="black"
      fillOpacity="0.99"
    />
  </svg>
);

/**
 * @component Button
 * @description Primary brand CTA button with optional play badge
 */
export const Button = memo(function Button({
  children,
  href,
  isExternal = false,
  withPlayIcon = true,
  className = "",
  disabled = false,
  ...rest
}: ButtonProps) {
  const combinedClasses = `${styles.button} ${className}`;
  const iconElement = withPlayIcon ? <ButtonPlayIcon /> : null;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          <span className={styles.label}>{children}</span>
          {iconElement}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses}>
        <span className={styles.label}>{children}</span>
        {iconElement}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={combinedClasses}
      disabled={disabled}
      {...rest}
    >
      <span className={styles.label}>{children}</span>
      {iconElement}
    </button>
  );
});

export default Button;
