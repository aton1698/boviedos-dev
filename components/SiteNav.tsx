"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BookOpen01Icon,
  Briefcase01Icon,
  Certificate01Icon,
  CodeIcon,
  File01Icon,
  GraduationScrollIcon,
  Layers01Icon,
  Mail01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { DragSelect } from "./DragSelect";
import GooeyNav from "./motion/GooeyNav";

interface NavLink {
  id: string;
  label: string;
}

interface SiteNavProps {
  links: NavLink[];
  navLabel: string;
}

// GooeyNav parses colors in JS, so it cannot take CSS variables: keep in sync with
// --brand-electric in globals.css.
const NAV_PILL = "#2563ff";
const NAV_PILL_INK = "#ffffff";

const ICONS: Record<string, ReactNode> = {
  profile: <HugeiconsIcon icon={UserIcon} size={24} strokeWidth={1.75} />,
  skills: <HugeiconsIcon icon={CodeIcon} size={24} strokeWidth={1.75} />,
  experience: <HugeiconsIcon icon={Briefcase01Icon} size={24} strokeWidth={1.75} />,
  contributions: <HugeiconsIcon icon={Layers01Icon} size={24} strokeWidth={1.75} />,
  education: <HugeiconsIcon icon={GraduationScrollIcon} size={24} strokeWidth={1.75} />,
  credentials: <HugeiconsIcon icon={Certificate01Icon} size={24} strokeWidth={1.75} />,
  contact: <HugeiconsIcon icon={Mail01Icon} size={24} strokeWidth={1.75} />,
  cv: <HugeiconsIcon icon={File01Icon} size={24} strokeWidth={1.75} />,
  blog: <HugeiconsIcon icon={BookOpen01Icon} size={24} strokeWidth={1.75} />,
};

/**
 * One GooeyNav for every viewport: a fixed floating icon bar at the bottom below 1440px
 * (labels stay in the DOM for assistive tech) and, from 1440px up, a labelled bar fixed over the
 * header row. It is rendered outside the sticky header (see SiteHeader). Anchors work without
 * JavaScript; JS adds the active pill.
 */
export function SiteNav({ links, navLabel }: SiteNavProps) {
  const [active, setActive] = useState<string | null>(null);
  const lockUntil = useRef(0); // ignore the scroll observer while an anchor click scrolls
  const idsKey = links.map((l) => l.id).join(",");

  // Track the section in view without touching browser history. A section is current once its top
  // passes a line at 35% of the viewport; at the very bottom of the page the last section wins, because
  // the final section may be too short to ever reach that line.
  useEffect(() => {
    const ids = idsKey.split(",");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (Date.now() < lockUntil.current) return;
      const line = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? ids[ids.length - 1] : current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [idsKey]);

  // GooeyNav reads these vars from inline style (they beat its own stylesheet); the
  // --site-* values switch by breakpoint through Tailwind classes on the wrapper.
  const sizing = {
    "--gn-pad": "var(--site-gn-pad)",
    "--gn-gap": "var(--site-gn-gap)",
    "--gn-x": "var(--site-gn-x)",
    "--gn-y": "var(--site-gn-y)",
    "--gn-font": "var(--site-gn-font)",
    // Brighter inactive labels and a navy frame: the stock dark theme is too faint on the animated background.
    "--gn-muted": "rgb(243 246 255 / 0.82)",
    "--gn-frame": "var(--nav-surface)",
  } as CSSProperties;
  // 6 icons at 48px fit a 320px screen; a 7th (credentials on /cv) needs tighter padding.
  const mobileX = links.length > 6 ? "8px" : "12px";

  return (
    <div
      style={{ "--site-gn-x-mobile": mobileX } as CSSProperties}
      className="print:hidden pointer-events-none fixed inset-x-0 bottom-[max(16px,env(safe-area-inset-bottom))] z-50 flex justify-center px-2 [--site-gn-font:21px] [--site-gn-gap:0px] [--site-gn-pad:6px] [--site-gn-x:var(--site-gn-x-mobile)] [--site-gn-y:14px] min-[1440px]:bottom-auto min-[1440px]:top-0 min-[1440px]:h-[var(--header-height)] min-[1440px]:items-center min-[1440px]:[--site-gn-font:14px] min-[1440px]:[--site-gn-gap:4px] min-[1440px]:[--site-gn-pad:6px] min-[1440px]:[--site-gn-x:12px] min-[1536px]:[--site-gn-x:16px] min-[1440px]:[--site-gn-y:14px]"
    >
      <DragSelect
        className="pointer-events-auto"
        onPreview={(index) => {
          lockUntil.current = Date.now() + 900;
          setActive(links[index].id);
        }}
        onCommit={(_, item) => {
          lockUntil.current = Date.now() + 900;
          item.querySelector("a")?.click();
        }}
      >
        <GooeyNav
          aria-label={navLabel}
          style={sizing}
          items={links.map(({ id, label }) => ({
            href: `#${id}`,
            // Icon below 1440px, text from 1440px up. The text always stays in the DOM
            // (visually hidden on small screens) so every link keeps its accessible name.
            icon: (
              <span className="flex items-center">
                <span className="min-[1440px]:hidden">{ICONS[id]}</span>
                <span className="sr-only min-[1440px]:not-sr-only">{label}</span>
              </span>
            ),
          }))}
          activeIndex={Math.max(0, links.findIndex((l) => l.id === active))}
          onChange={(index) => {
            lockUntil.current = Date.now() + 900;
            setActive(links[index].id);
          }}
          theme="dark"
          color={NAV_PILL}
          activeTextColor={NAV_PILL_INK}
        />
      </DragSelect>
    </div>
  );
}
