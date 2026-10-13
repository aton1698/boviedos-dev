"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { ExperienceEntry } from "./ExperienceEntry";
import GooeyNav from "./motion/GooeyNav";

export interface ExperienceTab {
  id: string;
  employer: string;
  role: string;
  date: ReactNode;
  bullets: string[];
  technologies: string[];
}

// GooeyNav parses colors in JS, so it cannot take CSS variables: keep in sync with
// --brand-electric in globals.css (same values as SiteNav).
const TAB_PILL = "#2563ff";
const TAB_PILL_INK = "#ffffff";

const MOBILE_BULLETS = 2;

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
export function ExperienceTabs({
  tabs,
  label,
  technologiesLabel,
}: {
  tabs: ExperienceTab[];
  label: string;
  technologiesLabel: string;
}) {
  const [selected, setSelected] = useState(0);
  const baseId = useId();
  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = (i: number) => `${baseId}-panel-${i}`;

  return (
    <div className="fade-row mt-12">
      <div className="flex justify-center">
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
      </div>

      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={panelId(i)}
          aria-labelledby={tabId(i)}
          hidden={selected !== i}
          tabIndex={0}
          className="mt-6 border-t border-divider"
        >
          <ExperienceEntry
            employer={tab.employer}
            role={tab.role}
            date={tab.date}
            bullets={tab.bullets}
            technologies={tab.technologies}
            technologiesLabel={technologiesLabel}
            mobileBullets={MOBILE_BULLETS}
          />
        </div>
      ))}
    </div>
  );
}
