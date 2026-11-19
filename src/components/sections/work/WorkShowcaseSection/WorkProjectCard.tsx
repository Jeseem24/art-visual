import React, { memo } from "react";
import Image from "next/image";
import styles from "./WorkProjectCard.module.css";

export interface WorkProjectCardProps {
  /** Project title displayed in the first metadata row */
  projectName: string;
  /** Category label displayed in the second metadata row */
  category: string;
  /** Brand name displayed in the third metadata row */
  brandName: string;
  /** Path to the project thumbnail/poster image */
  imageSrc: string;
  /** Optional path to the project preview video */
  videoSrc?: string;
  /** Accessible alt text for the project media */
  imageAlt: string;
  /** Optional custom class name */
  className?: string;
}

/**
 * @component WorkProjectCard
 * @description Portfolio project card displaying a 470:414 video/image frame and
 * three aligned uppercase metadata rows (Project Name, Category, Brand Name).
 */
export const WorkProjectCard = memo(function WorkProjectCard({
  projectName,
  category,
  brandName,
  imageSrc,
  videoSrc,
  imageAlt,
  className = "",
}: WorkProjectCardProps) {
  return (
    <article className={`${styles.card} ${className}`.trim()}>
      <div className={styles.imageFrame}>
        {videoSrc ? (
          <video
            src={videoSrc.includes("#t=") ? videoSrc : `${videoSrc}#t=0.001`}
            poster={imageSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={styles.video}
            aria-label={imageAlt}
          />
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 470px, (min-width: 640px) 45vw, 90vw"
            className={styles.image}
          />
        ) : null}
      </div>

      <div className={styles.metaContainer}>
        <div className={styles.alignedMetaGrid}>
          <strong className={styles.label}>PROJECT NAME</strong>
          <span className={styles.value}>: {projectName}</span>

          <strong className={styles.label}>CATEGORY</strong>
          <span className={styles.value}>: {category}</span>

          <strong className={styles.label}>BRAND NAME</strong>
          <span className={styles.value}>: {brandName}</span>
        </div>
      </div>
    </article>
  );
});

export default WorkProjectCard;
