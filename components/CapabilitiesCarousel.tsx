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
    update();
    scroller.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
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
