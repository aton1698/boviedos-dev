"use client";

import { useEffect, useLayoutEffect } from "react";

const PREFIX = "#capability-";
const DURATION_MS = 1300;

// Slow start, slow finish, no overshoot: it can never bounce past the target.
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function targetOf(details: HTMLElement) {
  const rect = details.getBoundingClientRect();
  const wanted = window.scrollY + rect.top - (window.innerHeight - rect.height) / 2;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return Math.min(Math.max(wanted, 0), Math.max(max, 0));
}

/**
 * Handles links like /cv#capability-frontend (the home cards): the page opens at the top, that capability opens and
 * a single slow glide brings it to the middle of the screen. The glide follows the capability while it expands, so it
 * does not need a second correction (which felt like a bounce). Any wheel, touch or key press by the visitor stops it.
 */
export function CapabilityDeepLink() {
  // Before the first paint: start from the top and open the capability, so there is no jump to see.
  useIsomorphicLayoutEffect(() => {
    const { hash } = window.location;
    if (!hash.startsWith(PREFIX)) return;
    const details = document.getElementById(`cap-${hash.slice(PREFIX.length)}`);
    if (!(details instanceof HTMLDetailsElement)) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    details.open = true; // opening one closes the others (they share a name)
  }, []);

  useEffect(() => {
    let frame = 0;
    let stop = () => {};
    const glide = () => {
      const { hash } = window.location;
      if (!hash.startsWith(PREFIX)) return;
      const details = document.getElementById(`cap-${hash.slice(PREFIX.length)}`);
      if (!(details instanceof HTMLDetailsElement)) return;
      details.open = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo({ top: targetOf(details), behavior: "instant" });
        return;
      }
      const start = window.scrollY;
      const startedAt = performance.now();
      const cancel = () => stop();
      const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
      stop = () => {
        cancelAnimationFrame(frame);
        events.forEach(name => window.removeEventListener(name, cancel));
        stop = () => {};
      };
      events.forEach(name => window.addEventListener(name, cancel, { passive: true }));
      const step = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / DURATION_MS);
        // The target is read every frame: the capability is still growing during the first moments.
        const top = start + (targetOf(details) - start) * easeInOutCubic(progress);
        window.scrollTo({ top, behavior: "instant" });
        if (progress < 1) frame = requestAnimationFrame(step);
        else stop();
      };
      frame = requestAnimationFrame(step);
    };
    glide();
    const onHashChange = () => {
      stop();
      glide();
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      stop();
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
