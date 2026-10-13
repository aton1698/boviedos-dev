"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Opens every page at the top. Next.js only scrolls a new page into view when its first element is off
 * screen, and the sticky header is always on screen, so the previous scroll position would otherwise carry over.
 * Skips the first load (browser scroll restoration), back/forward navigation and URLs with a #hash.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const fromHistory = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      fromHistory.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (fromHistory.current) {
      fromHistory.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
