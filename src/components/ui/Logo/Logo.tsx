import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { LOGO_DEFAULTS } from "./constants";
import styles from "./Logo.module.css";

export interface LogoProps {
  /** Source URL of the logo image asset */
  src?: string;
  /** Accessible alternative text */
  alt?: string;
  /** Width in pixels */
  width?: number;
  /** Height in pixels */
  height?: number;
  /** Destination link (defaults to home page) */
  href?: string;
  /** Optional custom CSS class name */
  className?: string;
  /** Priority image preloading */
  priority?: boolean;
}

/**
 * @component Logo
 * @description Accessible brand logo component supporting Next.js Image optimization
 */
export const Logo = memo(function Logo({
  src = LOGO_DEFAULTS.src,
  alt = LOGO_DEFAULTS.alt,
  width = LOGO_DEFAULTS.width,
  height = LOGO_DEFAULTS.height,
  href = LOGO_DEFAULTS.href,
  className = "",
  priority = true,
}: LogoProps) {
  const content = (
    <div className={`${styles.logoWrapper} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={styles.logoImage}
        priority={priority}
      />
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className={styles.logoLink} aria-label={alt}>
      {content}
    </Link>
  );
});

export default Logo;

