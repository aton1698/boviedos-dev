"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Briefcase01Icon,
  Certificate01Icon,
  CodeIcon,
  GraduationScrollIcon,
  Layers01Icon,
  Mail01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
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
};

/**
 * One GooeyNav for every viewport: a floating icon bar at the bottom below 1440px
 * (labels stay in the DOM for assistive tech) and a labelled bar centered in the
 * header from 1440px up. Anchors work without JavaScript; JS adds the active pill.
 */
export function SiteNav({ links, navLabel }: SiteNavProps) {
  const [active, setActive] = useState<string | null>(null);
  const lockUntil = useRef(0); // ignore the scroll observer while an anchor click scrolls
  const idsKey = links.map((l) => l.id).join(",");

  // Track the section in view without touching browser history.
  useEffect(() => {
    const ids = idsKey.split(",");
    const inView = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target.id);
          else inView.delete(entry.target.id);
        }
        const first = ids.find((id) => inView.has(id));
        if (first && Date.now() > lockUntil.current) setActive(first);
      },
      { rootMargin: "-96px 0px -55% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
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
  // 6 icons at 48px fit a 320px screen; a 7th (credentials) needs tighter padding.
  const mobileX = links.length > 6 ? "8px" : "12px";

  return (
    <div
      style={{ "--site-gn-x-mobile": mobileX } as CSSProperties}
      className="print:hidden pointer-events-none fixed inset-x-0 bottom-[max(16px,env(safe-area-inset-bottom))] z-50 flex justify-center px-2 [--site-gn-font:21px] [--site-gn-gap:0px] [--site-gn-pad:6px] [--site-gn-x:var(--site-gn-x-mobile)] [--site-gn-y:14px] min-[1440px]:bottom-auto min-[1440px]:top-0 min-[1440px]:h-[var(--header-height)] min-[1440px]:items-center min-[1440px]:[--site-gn-font:14px] min-[1440px]:[--site-gn-gap:4px] min-[1440px]:[--site-gn-pad:6px] min-[1440px]:[--site-gn-x:12px] min-[1536px]:[--site-gn-x:16px] min-[1440px]:[--site-gn-y:14px]"
    >
      <div className="pointer-events-auto">
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
      </div>
    </div>
  );
}
