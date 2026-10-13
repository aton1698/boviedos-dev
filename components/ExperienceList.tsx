import { experiences } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { DateRange } from "./DateRange";

export function ExperienceList({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <ol className="mt-12">
      {experiences.map((job) => (
        <li
          key={job.id}
          className="grid gap-4 border-t border-divider py-8 lg:grid-cols-[200px_minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-8"
        >
          <DateRange start={job.startDate} end={job.endDate} locale={locale} />
          <div>
            <h3>{job.employer}</h3>
            <p className="mt-1 text-text-muted">{job.role[locale]}</p>
          </div>
          <ul className="flex flex-col gap-3">
            {job.bullets[locale].map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <div className="lg:col-start-2 lg:col-span-2">
            <p className="label">{t.technologies}</p>
            <p className="mt-2 text-text-muted">{job.technologies.join(" · ")}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
