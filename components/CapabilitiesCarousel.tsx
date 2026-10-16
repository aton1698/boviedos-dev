"use client";

import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import ChromaGrid, { type ChromaItem } from "./motion/ChromaGrid";

interface CapabilitiesCarouselProps {
  items: ChromaItem[];
  labels: { label: string; previous: string; next: string; position: string };
}

const buttonClass =
  "grid size-11 place-items-center rounded-full border border-[var(--color-control-border)] text-accent transition-opacity enabled:hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40";

/**
 * The capability cards: a grid from md up and, on phones, a horizontal row that snaps card by card. It can be swiped
 * with a finger or moved with the previous/next buttons (the first one is off while the first card is showing).
 */
export function CapabilitiesCarousel({ items, labels }: CapabilitiesCarouselProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const scroller = hostRef.current?.querySelector<HTMLElement>(".chroma-grid-inner");
    if (!scroller) return undefined;
    const cards = Array.from(scroller.children) as HTMLElement[];
    let frame = 0;
    // The card nearest to the middle is the one in focus; flipping data-focus replays the CSS transition (sharp and full
    // size for the focused card, soft and blurred for the others).
    const update = () => {
      frame = 0;
      const box = scroller.getBoundingClientRect();
      const middle = box.left + box.width / 2;
      let nearest = 0;
      let nearestDistance = Infinity;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - middle);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = i;
        }
      });
      cards.forEach((card, i) => {
        const value = i === nearest ? "true" : "false";
        if (card.dataset.focus !== value) card.dataset.focus = value;
      });
      setIndex(nearest);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Safety net: snapping already centers the focused card, but if a scroll ever ends a little off (a resize, a
    // focused link, a browser that skips the snap) the nearest card is moved to the exact middle.
    let settleTimer = 0;
    let touching = false;
    const centerNearest = (behavior: ScrollBehavior) => {
      const box = scroller.getBoundingClientRect();
      let delta = 0;
      let best = Infinity;
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const offset = rect.left + rect.width / 2 - (box.left + box.width / 2);
        if (Math.abs(offset) < Math.abs(best)) {
          best = offset;
          delta = offset;
        }
      });
      if (Math.abs(delta) > 1) scroller.scrollBy({ left: delta, behavior });
    };
    const onScroll = () => {
      schedule();
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        if (!touching) centerNearest("smooth");
      }, 160);
    };
    const onResize = () => {
      schedule();
      centerNearest("auto");
    };
    const onFocusIn = (event: FocusEvent) => {
      const card = (event.target as HTMLElement).closest<HTMLElement>(".chroma-card");
      if (!card) return;
      const box = scroller.getBoundingClientRect();
      const rect = card.getBoundingClientRect();
      scroller.scrollBy({ left: rect.left + rect.width / 2 - (box.left + box.width / 2), behavior: "smooth" });
    };
    const onTouchStart = () => {
      touching = true;
    };
    const onTouchEnd = () => {
      touching = false;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => centerNearest("smooth"), 400);
    };
    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("focusin", onFocusIn);
    scroller.addEventListener("touchstart", onTouchStart, { passive: true });
    scroller.addEventListener("touchend", onTouchEnd, { passive: true });
    scroller.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("focusin", onFocusIn);
      scroller.removeEventListener("touchstart", onTouchStart);
      scroller.removeEventListener("touchend", onTouchEnd);
      scroller.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, [items.length]);

  const move = (direction: 1 | -1) => {
    const scroller = hostRef.current?.querySelector<HTMLElement>(".chroma-grid-inner");
    const card = scroller?.firstElementChild as HTMLElement | null;
    if (!scroller || !card) return;
    const gap = parseFloat(getComputedStyle(scroller).columnGap) || 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div ref={hostRef} role="group" aria-roledescription="carousel" aria-label={labels.label}>
      <ChromaGrid
        className="chroma-grid--wrap chroma-grid--carousel"
        columns={4}
        minCardWidth={240}
        gap={16}
        aspectRatio="3 / 2"
        items={items}
      />
      <div className="mt-4 flex items-center justify-between md:hidden">
        <button type="button" className={buttonClass} aria-label={labels.previous} disabled={index <= 0} onClick={() => move(-1)}>
          <HugeiconsIcon icon={ArrowLeft01Icon} size={22} strokeWidth={2} aria-hidden="true" />
        </button>
        <p className="label" aria-live="polite">
          {Math.min(index + 1, items.length)} {labels.position} {items.length}
        </p>
        <button type="button" className={buttonClass} aria-label={labels.next} disabled={index >= items.length - 1} onClick={() => move(1)}>
          <HugeiconsIcon icon={ArrowRight01Icon} size={22} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
