import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { LazyVideo } from "@/components/ui/LazyVideo";
import styles from "./WorkCard.module.css";

export interface WorkCardProps {
  /** Project title */
  title: string;
  /** Primary image asset path */
  imageSrc: string;
  /** Image alt text */
  alt?: string;
  /** Optional video preview source */
  videoSrc?: string;
  /** Destination link */
  href?: string;
  /** Custom class name */
  className?: string;
  /** Whether this card is rendered in a duplicate/decorative track */
  isDuplicate?: boolean;
}

/**
 * @component WorkCard
 * @description Project card with media preview and floating title badge.
 */
export const WorkCard = memo(function WorkCard({
  title,
  imageSrc,
  alt = title,
  videoSrc,
  href,
  className = "",
  isDuplicate = false,
}: WorkCardProps) {
  const cardContent = (
    <>
      {/* Media Frame */}
      <div className={styles.mediaFrame}>
        {videoSrc ? (
          <LazyVideo
            src={videoSrc}
            priority={false}
            className={styles.mediaVideo}
            aria-label={alt}
          />
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 446px"
            className={styles.mediaImage}
          />
        ) : null}
      </div>

      {/* Floating Title Badge */}
      <div className={styles.badge}>
        <h3 className={styles.title}>
          {title}
        </h3>
      </div>
    </>
  );

  const combinedClasses = `${styles.card} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        aria-label={`View project: ${title}`}
        tabIndex={isDuplicate ? -1 : undefined}
        aria-hidden={isDuplicate ? "true" : undefined}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <article className={combinedClasses} aria-hidden={isDuplicate ? "true" : undefined}>
      {cardContent}
    </article>
  );
});

export default WorkCard;

