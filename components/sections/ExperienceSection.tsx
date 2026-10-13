import { experiences } from "@/content";
import { ui } from "@/content/ui";
import { SectionHeading } from "../SectionHeading";
import type { Locale } from "@/lib/i18n";
import { DateRange } from "../DateRange";

export function ExperienceSection({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-divider">
      <div className="container-page section-y">
        <SectionHeading id="experience-title" eyebrow={t.nav.experience} className="max-w-[20ch]">
          {t.headings.experience}
        </SectionHeading>
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
