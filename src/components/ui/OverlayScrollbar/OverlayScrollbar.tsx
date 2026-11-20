"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./OverlayScrollbar.module.css";

/**
 * @component OverlayScrollbar
 * @description Floating overlay scrollbar that sits above page content without taking layout space.
 */
export function OverlayScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const [isScrollable, setIsScrollable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStateRef = useRef<{
    active: boolean;
    startY: number;
    startScrollTop: number;
    thumbHeightRendered: number;
    trackHeightRendered: number;
    maxScroll: number;
  }>({
    active: false,
    startY: 0,
    startScrollTop: 0,
    thumbHeightRendered: 40,
    trackHeightRendered: 0,
    maxScroll: 0,
  });

  const showTemporarily = useCallback(() => {
    setIsVisible(true);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = setTimeout(() => {
      if (!dragStateRef.current.active) {
        setIsVisible(false);
      }
    }, 1500);
  }, []);

  const updateThumb = useCallback(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    const scrollingEl = document.scrollingElement || document.documentElement;
    if (!scrollingEl) return;

    const scrollHeight = scrollingEl.scrollHeight;
    const clientHeight = scrollingEl.clientHeight;
    const maxScroll = Math.max(0, scrollHeight - clientHeight);

    if (maxScroll <= 2) {
      setIsScrollable(false);
      return;
    }

    setIsScrollable(true);

    if (!track || !thumb) return;

    const trackHeight = track.clientHeight;
    if (trackHeight <= 0) return;

    const visibleRatio = clientHeight / scrollHeight;
    const thumbHeight = Math.max(40, Math.min(trackHeight, visibleRatio * trackHeight));
    const scrollProgress = Math.min(1, Math.max(0, scrollingEl.scrollTop / maxScroll));
    const thumbTop = scrollProgress * (trackHeight - thumbHeight);

    thumb.style.height = `${thumbHeight}px`;
    thumb.style.transform = `translate3d(0, ${thumbTop}px, 0)`;
  }, []);

  useEffect(() => {
    // Coarse pointer / mobile devices have native touch scrollbars and CSS hides the track.
    // Skip attaching scroll listeners to eliminate forced reflows and background computations on mobile.
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
      return;
    }

    let rafId: number | null = null;

    const handleScroll = () => {
      showTemporarily();
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateThumb);
    };

    const handleResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateThumb);
    };

    // Initial calculation asynchronously to avoid synchronous effect setState warning
    rafId = requestAnimationFrame(updateThumb);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Observe document height changes (route navigation, FAQ expansion, dynamic content)
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [showTemporarily, updateThumb]);

  // Drag-to-scroll handling
  const handleThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const track = trackRef.current;
    const thumb = thumbRef.current;
    const scrollingEl = document.scrollingElement || document.documentElement;
    if (!track || !thumb || !scrollingEl) return;

    const trackRect = track.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const maxScroll = Math.max(0, scrollingEl.scrollHeight - scrollingEl.clientHeight);

    dragStateRef.current = {
      active: true,
      startY: e.clientY,
      startScrollTop: scrollingEl.scrollTop,
      thumbHeightRendered: thumbRect.height,
      trackHeightRendered: trackRect.height,
      maxScroll,
    };

    setIsDragging(true);
    setIsVisible(true);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const state = dragStateRef.current;
      if (!state.active) return;

      const scrollableTrackSpace = state.trackHeightRendered - state.thumbHeightRendered;
      if (scrollableTrackSpace <= 0) return;

      const deltaY = moveEvent.clientY - state.startY;
      const scrollDelta = (deltaY / scrollableTrackSpace) * state.maxScroll;

      window.scrollTo({
        top: state.startScrollTop + scrollDelta,
        behavior: "instant",
      });
    };

    const handlePointerUp = () => {
      dragStateRef.current.active = false;
      setIsDragging(false);
      showTemporarily();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  // Click on track to jump directly
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === thumbRef.current) return;

    const track = trackRef.current;
    const thumb = thumbRef.current;
    const scrollingEl = document.scrollingElement || document.documentElement;
    if (!track || !thumb || !scrollingEl) return;

    const trackRect = track.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const targetThumbTop = clickY - thumbRect.height / 2;
    const scrollableTrackSpace = trackRect.height - thumbRect.height;

    if (scrollableTrackSpace <= 0) return;

    const progress = Math.min(1, Math.max(0, targetThumbTop / scrollableTrackSpace));
    const maxScroll = Math.max(0, scrollingEl.scrollHeight - scrollingEl.clientHeight);

    window.scrollTo({
      top: progress * maxScroll,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={trackRef}
      onClick={handleTrackClick}
      aria-hidden="true"
      className={`${styles.track} ${isVisible && isScrollable ? styles.trackVisible : ""} ${
        isDragging ? styles.trackDragging : ""
      }`.trim()}
      style={{ visibility: isScrollable ? "visible" : "hidden" }}
    >
      <div
        ref={thumbRef}
        onPointerDown={handleThumbPointerDown}
        className={styles.thumb}
      />
    </div>
  );
}

export default OverlayScrollbar;

