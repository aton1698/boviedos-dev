import { experiences, formatMonth } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { ExperienceEntry } from "./ExperienceEntry";

/**
 * Collapsible experiences. Native <details> elements that share a `name` form an exclusive group: opening one
 * closes the other, with no JavaScript. The most recent job starts open.
 */
export function ExperienceList({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <div className="mt-12">
      {experiences.map((job, index) => (
        <details key={job.id} name="experience" open={index === 0} className="group border-t border-divider">
          <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 py-8 [&::-webkit-details-marker]:hidden">
            <div className="grid gap-1 lg:grid-cols-[19rem_1fr] lg:gap-16">
              <div>
                <span className="label block">
                  <time dateTime={job.startDate}>{formatMonth(job.startDate, locale)}</time>
                  {"–"}
                  {job.endDate ? (
                    <time dateTime={job.endDate}>{formatMonth(job.endDate, locale)}</time>
                  ) : (
                    formatMonth(null, locale)
                  )}
                </span>
                <h3 className="mt-3">{job.employer}</h3>
              </div>
              <p className="text-base text-text-muted lg:pt-8">{job.role[locale]}</p>
            </div>
            <span
              aria-hidden="true"
              className="mt-2 grid size-9 shrink-0 place-items-center rounded-full border border-[var(--color-control-border)] text-accent transition-transform group-open:rotate-180"
            >
              ↓
            </span>
          </summary>
          <ExperienceEntry
            hideIdentity
            employer={job.employer}
            role={job.role[locale]}
            date={null}
            bullets={job.bullets[locale]}
            technologies={job.technologies}
            technologiesLabel={t.technologies}
          />
        </details>
      ))}
    </div>
  );
}
