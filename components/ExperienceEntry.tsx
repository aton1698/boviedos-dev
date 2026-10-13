import type { ReactNode } from "react";

export interface ExperienceEntryProps {
  employer: string;
  role: string;
  date: ReactNode;
  bullets: string[];
  technologies: string[];
  technologiesLabel: string;
  /** Bullets beyond this index are hidden below the md breakpoint (the full CV page shows all). */
  mobileBullets?: number;
  /** Hide date, employer and role (the accordion shows them in its header). */
  hideIdentity?: boolean;
}

/**
 * One job: identity on the left (date, employer, role, technologies), achievements on the right in a
 * comfortable line length. Shared by the full CV list and the home tabs so both read the same.
 */
export function ExperienceEntry({
  employer,
  role,
  date,
  bullets,
  technologies,
  technologiesLabel,
  mobileBullets,
  hideIdentity = false,
}: ExperienceEntryProps) {
  return (
    <div className={`grid gap-6 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-16 ${hideIdentity ? "pb-10 pt-2" : "py-10 lg:py-12"}`}>
      <div>
        {!hideIdentity && (
          <>
            {date}
            <h3 className="mt-3">{employer}</h3>
            <p className="mt-1 text-base text-text-muted">{role}</p>
          </>
        )}
        <div className={hideIdentity ? undefined : "mt-6"}>
          <p className="label">{technologiesLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {technologies.map((name) => (
              <li key={name} className="skill-chip !min-h-8 !px-3 !py-1 !text-sm">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ul className="flex max-w-[66ch] flex-col gap-3 leading-relaxed">
        {bullets.map((bullet, i) => (
          <li
            key={bullet}
            className={`relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:size-1.5 before:rounded-full before:bg-accent ${
              mobileBullets !== undefined && i >= mobileBullets ? "max-md:hidden" : ""
            }`.trim()}
          >
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}
