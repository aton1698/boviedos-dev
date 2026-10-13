"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import GooeyNav from "./motion/GooeyNav";

export interface ExperienceTab {
  id: string;
  employer: string;
  role: string;
  date: ReactNode;
  bullets: string[];
}

// GooeyNav parses colors in JS, so it cannot take CSS variables: keep in sync with
// --brand-electric in globals.css (same values as SiteNav).
const TAB_PILL = "#2563ff";
const TAB_PILL_INK = "#ffffff";

const sizing = {
  "--gn-font": "15px",
  "--gn-pad": "6px",
  "--gn-gap": "4px",
  "--gn-x": "18px",
  "--gn-y": "12px",
  "--gn-muted": "rgb(243 246 255 / 0.82)",
  "--gn-frame": "var(--nav-surface)",
} as CSSProperties;

/** Experience tabs: the site's GooeyNav in tabs mode (tablist, arrow keys) plus one panel per entry. */
export function ExperienceTabs({ tabs, label }: { tabs: ExperienceTab[]; label: string }) {
  const [selected, setSelected] = useState(0);
  const baseId = useId();
  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = (i: number) => `${baseId}-panel-${i}`;

  return (
    <div className="mt-12">
      <GooeyNav
        tabs
        aria-label={label}
        style={sizing}
        items={tabs.map((tab, i) => ({ label: tab.employer, id: tabId(i), controls: panelId(i) }))}
        activeIndex={selected}
        onChange={setSelected}
        theme="dark"
        color={TAB_PILL}
        activeTextColor={TAB_PILL_INK}
      />

      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={panelId(i)}
          aria-labelledby={tabId(i)}
          hidden={selected !== i}
          tabIndex={0}
          className="mt-6 grid gap-4 border-t border-divider py-8 lg:grid-cols-[200px_minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-8"
        >
          {tab.date}
          <div>
            <h3>{tab.employer}</h3>
            <p className="mt-1 text-text-muted">{tab.role}</p>
          </div>
          <ul className="flex flex-col gap-3">
            {tab.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
