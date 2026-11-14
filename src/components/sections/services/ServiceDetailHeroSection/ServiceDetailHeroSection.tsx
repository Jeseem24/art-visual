import React, { memo } from "react";
import Image from "next/image";
import styles from "./ServiceDetailHeroSection.module.css";

export interface ServiceDetailHeroSectionProps {
  /** Leading part of the service title (rendered in charcoal #2D2D2D) */
  titlePrefix: string;
  /** Highlighted part of the service title (rendered in brand red #CD3743) */
  titleHighlight: string;
  /** Primary looping hero video source */
  videoSrc?: string;
  /** Video poster image path */
  posterSrc?: string;
  /** Static image fallback if no video source is provided */
  imageSrc?: string;
  /** Accessible media label / alt text */
  alt?: string;
  /** Optional custom CSS class name */
  className?: string;
}

/** 46 perforation holes across the 1762px desktop filmstrip width */
const PERFORATION_HOLES = Array.from({ length: 46 }, (_, i) => i);

/**
 * @component ServiceDetailHeroSection
 * @description Wide filmstrip media hero and centered two-tone service heading.
 */
export const ServiceDetailHeroSection = memo(function ServiceDetailHeroSection({
  titlePrefix,
  titleHighlight,
  videoSrc,
  posterSrc,
  imageSrc,
  alt,
  className = "",
}: ServiceDetailHeroSectionProps) {
  const fullTitle = `${titlePrefix} ${titleHighlight}`.trim();
  const mediaAlt = alt || fullTitle;
  const fallbackImageSrc = imageSrc || posterSrc;

  return (
    <section
      className={`${styles.hero} ${className}`.trim()}
      aria-labelledby="service-detail-hero-title"
    >
      <div className={styles.container}>
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
                src={videoSrc}
                poster={posterSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-label={mediaAlt}
                className={styles.mediaVideo}
              />
            ) : fallbackImageSrc ? (
              <Image
                src={fallbackImageSrc}
                alt={mediaAlt}
                fill
                sizes="(max-width: 1023px) 100vw, 1762px"
                className={styles.mediaImage}
                priority
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

        {/* Centered Service Title */}
        <h1 id="service-detail-hero-title" className={styles.title}>
          {titlePrefix && <span className={styles.titlePrefix}>{titlePrefix}</span>}
          {titlePrefix && titleHighlight ? " " : null}
          {titleHighlight && (
            <span className={styles.titleHighlight}>{titleHighlight}</span>
          )}
        </h1>
      </div>
    </section>
  );
});

export default ServiceDetailHeroSection;
