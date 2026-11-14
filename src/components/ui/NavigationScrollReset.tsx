"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Ensures that on any route navigation, the viewport instantly jumps
 * to the exact top (0, 0) without any smooth scroll animation,
 * ensuring the navbar and top content are fully visible.
 */
export function NavigationScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset window scroll position instantly without animation
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}

