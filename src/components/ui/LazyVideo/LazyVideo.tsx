"use client";

import React, { useEffect, useRef, useState, memo } from "react";

export interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  /** Video source URL */
  src: string;
  /** Whether this video is above the fold and should load with high priority */
  priority?: boolean;
  /** Custom class name */
  className?: string;
  /** Accessible label describing the video content */
  "aria-label"?: string;
  /** Root margin distance in pixels to begin preloading before entering viewport */
  rootMargin?: string;
}

/**
 * High-performance, mobile-optimized video component.
 * - Prioritized videos (hero section) load immediately.
 * - Offscreen/below-the-fold videos load only when approaching the viewport.
 * - Pauses playback when scrolled out of view to release mobile CPU/battery.
 * - Eliminates multi-megabyte initial network contention on mobile connections.
 */
export const LazyVideo = memo(function LazyVideo({
  src,
  priority = false,
  className = "",
  "aria-label": ariaLabel,
  rootMargin = "350px",
  loop = true,
  muted = true,
  playsInline = true,
  ...restProps
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(priority);

  // Normalize source with #t=0.001 to ensure crisp first frame
  const formattedSrc = src ? (src.includes("#t=") ? src : `${src}#t=0.001`) : "";

  useEffect(() => {
    if (priority) return;

    const video = videoRef.current;
    if (!video) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        rootMargin,
        threshold: 0.05,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [priority, rootMargin]);

  // Keep playback synced if isInView changes
  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView]);

  return (
    <video
      ref={videoRef}
      src={isInView ? formattedSrc : undefined}
      data-src={formattedSrc}
      autoPlay={isInView}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={priority ? "metadata" : isInView ? "metadata" : "none"}
      className={className}
      aria-label={ariaLabel}
      {...restProps}
    />
  );
});

export default LazyVideo;
