"use client";

import { useEffect } from "react";

const PREFIX = "#capability-";

/**
 * Handles links like /cv#capability-frontend (the home cards): starts from the top of the page, opens that capability
 * and glides to the middle of the screen. It scrolls twice, because the accordion keeps growing for a moment after
 * it opens and the first target is only an estimate.
 */
export function CapabilityDeepLink() {
  useEffect(() => {
    let timer = 0;
    const open = (fromTop: boolean) => {
      window.clearTimeout(timer);
      const { hash } = window.location;
      if (!hash.startsWith(PREFIX)) return;
      const details = document.getElementById(`cap-${hash.slice(PREFIX.length)}`);
      if (!(details instanceof HTMLDetailsElement)) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const behavior = reduced ? "auto" : "smooth";
      if (fromTop) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      details.open = true; // opening one closes the others (they share a name)
      const center = () => details.scrollIntoView({ behavior, block: "center" });
      requestAnimationFrame(center);
      timer = window.setTimeout(center, reduced ? 0 : 800);
    };
    open(true);
    const onHashChange = () => open(false);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
