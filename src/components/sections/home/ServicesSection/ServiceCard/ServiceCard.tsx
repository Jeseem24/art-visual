import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ServiceCard.module.css";

export interface ServiceCardProps {
  /** Service title */
  title: string;
  /** Service description */
  description: string;
  /** Video source path */
  videoSrc?: string;
  /** Poster image path for preview */
  posterSrc?: string;
  /** Image source path fallback */
  imageSrc?: string;
  /** Image alt text */
  imageAlt?: string;
  /** CTA link href */
  href?: string;
  /** CTA label */
  ctaLabel?: string;
  /** Custom class name */
  className?: string;
}

/** 13 perforation holes across width */
const PERFORATION_HOLES = Array.from({ length: 13 }, (_, i) => i);

/**
 * Arrow Vector Icon
 */
const ServiceArrowIcon = () => (
  <svg
    width="17.03"
    height="15.32"
    viewBox="0 0 18.2297 16.5271"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.arrowSvg}
    aria-hidden="true"
  >
    <path
      d="M0 8.26357H17.0258M9.36419 15.9252L17.0258 8.26357L9.36419 0.601953"
      strokeWidth="1.70258"
      stroke="currentColor"
    />
  </svg>
);

/**
 * @component ServiceCard
 * @description Single Service Card with filmstrip frame and action link.
 */
export const ServiceCard = memo(function ServiceCard({
  title,
  description,
  videoSrc,
  posterSrc,
  imageSrc,
  imageAlt = title,
  href = "/services",
  ctaLabel = "View service",
  className = "",
}: ServiceCardProps) {
  return (
    <article className={`${styles.card} ${className}`}>
      {/* Filmstrip Frame */}
      <div className={styles.filmstrip}>
        {/* Top Perforation Track */}
        <div className={styles.filmTrack} aria-hidden="true">
          {PERFORATION_HOLES.map((idx) => (
            <span key={`top-${idx}`} className={styles.filmHole} />
          ))}
        </div>

        {/* Media Frame */}
        <div className={styles.mediaWrapper}>
          {videoSrc ? (
            <video
              src={videoSrc.includes("#t=") ? videoSrc : `${videoSrc}#t=0.001`}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className={styles.mediaVideo}
            />
          ) : imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 504px"
              className={styles.mediaImage}
            />
          ) : null}
        </div>

        {/* Bottom Perforation Track */}
        <div className={styles.filmTrack} aria-hidden="true">
          {PERFORATION_HOLES.map((idx) => (
            <span key={`bottom-${idx}`} className={styles.filmHole} />
          ))}
        </div>
      </div>

      {/* Content Details */}
      <div className={styles.contentArea}>
        <h3 className={styles.title}>
          {title}
        </h3>

        <p className={styles.description}>
          {description}
        </p>

        <Link href={href} className={styles.ctaButton}>
          <span className={styles.ctaText}>{ctaLabel}</span>
          <span className={styles.ctaDivider} aria-hidden="true" />
          <span className={styles.ctaArrow} aria-hidden="true">
            <ServiceArrowIcon />
          </span>
        </Link>
      </div>
    </article>
  );
});

export default ServiceCard;
