"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SmoothScroll Component
 * Integrates Lenis smooth scrolling with GSAP ScrollTrigger for a luxury video production agency experience.
 * Features:
 * - Silky momentum scrolling calibrated for cinematic editorial layouts.
 * - Hardware-accelerated frame synchronization between Lenis and GSAP ticker.
 * - Full accessibility compliance: automatically disables smooth scroll if prefers-reduced-motion is enabled.
 * - Automatically destroys instances and disconnects listeners on unmount.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect accessibility: Disable smooth scroll if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis scroll events with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis animations via GSAP's central requestAnimationFrame ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
      lenisRef.current = null;
    };
  }, []);

  return null;
}

export default SmoothScroll;
