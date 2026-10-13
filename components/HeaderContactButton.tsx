"use client";

import { useEffect, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon } from "@hugeicons/core-free-icons";

interface HeaderContactButtonProps {
  href: string;
  label: string;
  /** Only the home page fades the button with the hero; every other page shows it all the time. */
  fadeWithHero?: boolean;
}

/**
 * Mobile-only contact button in the header, between the logo and the language selector (from 640px the regular
 * header button takes over). On the home page it fades in while the hero scrolls away (fully visible once the
 * hero is gone) and fades out as the hero comes back; its space stays reserved so the header never shifts.
 * Under reduced motion it switches on and off instead of fading.
 */
export function HeaderContactButton({ href, label, fadeWithHero = false }: HeaderContactButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    const hero = document.getElementById("profile");
    if (!el || !fadeWithHero || !hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      // 0 while the hero fills the screen, 1 once its bottom edge has passed the header.
      const bottom = hero.getBoundingClientRect().bottom;
      const start = window.innerHeight * 0.7;
      const end = 72;
      const raw = Math.min(1, Math.max(0, (start - bottom) / (start - end)));
      const progress = reduced ? Math.round(raw) : raw;
      el.style.opacity = String(progress);
      el.style.translate = `0 ${(1 - progress) * 16}px`;
      el.style.visibility = progress > 0.02 ? "visible" : "hidden";
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [fadeWithHero]);

  return (
    <a
      ref={ref}
      href={href}
      style={fadeWithHero ? { visibility: "hidden", opacity: 0 } : undefined}
      className="btn-primary !min-h-11 !px-4 text-sm sm:hidden"
    >
      <HugeiconsIcon icon={Mail01Icon} size={20} strokeWidth={1.75} aria-hidden="true" />
      {label}
    </a>
  );
}
