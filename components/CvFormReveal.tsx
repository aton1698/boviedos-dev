"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, Download01Icon } from "@hugeicons/core-free-icons";

const CLOSE_MS = 700; // keep in sync with .reveal-panel in globals.css

/**
 * Keeps the CV form out of the way until the visitor asks for it. Closed, the form is not even in the page: it is
 * mounted on the first open and then only hidden, so what was typed survives closing and opening again. The button
 * opens it with a smooth expand and fade, glides to it and focuses the first field; pressing it again closes it.
 */
export function CvFormReveal({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  // `shown` means "takes space in the page", `open` drives the animation. Closing keeps `shown` until it finishes.
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(window.clearTimeout);
  }, []);

  const later = (callback: () => void, ms: number) => {
    timers.current.push(window.setTimeout(callback, ms));
  };

  const toggle = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    if (open) {
      setOpen(false);
      later(() => setShown(false), CLOSE_MS);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEverOpened(true);
    setShown(true);
    // Let the closed state paint first, so the panel animates from zero height instead of appearing open.
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
    // Then bring it to the middle of the screen and focus the first field.
    later(() => {
      panelRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      panelRef.current?.querySelector<HTMLElement>("input")?.focus({ preventScroll: true });
    }, 300);
  };

  return (
    <div className="fade-row mt-16 flex flex-col items-center border-t border-divider pt-12">
      <button
        type="button"
        className="btn-secondary"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        <HugeiconsIcon icon={Download01Icon} size={20} strokeWidth={1.75} aria-hidden="true" />
        {label}
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={18}
          strokeWidth={1.75}
          aria-hidden="true"
          className={`transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={panelId}
        ref={panelRef}
        className="reveal-panel w-full"
        data-open={open ? "" : undefined}
        hidden={!shown}
        inert={!open}
      >
        <div>
          {everOpened && (
            <>
              <h3 className="pt-8 text-center">{title}</h3>
              <p className="mx-auto mt-3 mb-6 max-w-[56ch] text-center text-text-muted">{intro}</p>
              <div className="mx-auto w-full max-w-[640px] pb-2">{children}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
