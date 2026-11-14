import React, { memo } from "react";
import Image from "next/image";
import styles from "./ShowcaseCard.module.css";

export interface ShowcaseCardProps {
  /** Unique card identifier */
  id: string;
  /** Primary card title (e.g. "Product Videography") */
  title: string;
  /** Card description text */
  description: string;
  /** Optional video source URL */
  videoSrc?: string;
  /** Poster image URL or local fallback asset path */
  image: string;
  /** Accessible image alternative text */
  imageAlt?: string;
  /** Next.js Image priority loading */
  priority?: boolean;
  /** Optional custom class name */
  className?: string;
}

/**
 * @component ShowcaseCard
 * @description Hanging polaroid showcase card component supporting video preview and poster fallback.
 */
export const ShowcaseCard = memo(function ShowcaseCard({
  id,
  title,
  description,
  videoSrc,
  image,
  imageAlt,
  priority = false,
  className = "",
}: ShowcaseCardProps) {
  return (
    <article
      id={id}
      className={`${styles.cardContainer} ${className}`}
    >
      {/* Red Eyelet Tab */}
      <div className={styles.redTab} aria-hidden="true">
        <span className={styles.eyeletHole} />
      </div>

      {/* Main Card Body */}
      <div className={styles.cardBody}>
        {/* Media Frame */}
        <div className={styles.imageFrame}>
          {videoSrc ? (
            <video
              src={videoSrc}
              poster={image}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className={styles.video}
              aria-label={title}
            />
          ) : (
            <Image
              src={image}
              alt={imageAlt || title}
              width={274}
              height={229}
              priority={priority}
              className={styles.image}
            />
          )}
        </div>

        {/* Text Content */}
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </article>
  );
});

export default ShowcaseCard;
