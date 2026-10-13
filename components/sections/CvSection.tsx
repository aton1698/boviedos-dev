import Link from "next/link";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/site";
import { experiences } from "@/content";
import { DateRange } from "../DateRange";
import { ExperienceTabs } from "../ExperienceTabs";
import { SectionHeading } from "../SectionHeading";

/** Home-page CV: professional experience only, with a link to the full CV page. */
export function CvSection({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section id="cv" aria-labelledby="cv-title" className="border-t border-divider">
      <div className="container-page section-y">
        <SectionHeading id="cv-title" eyebrow={t.nav.cv} className="max-w-[26ch]">
          {t.headings.experience}
        </SectionHeading>
        <ExperienceTabs
          label={t.headings.experience}
          technologiesLabel={t.technologies}
          tabs={experiences.map((job) => ({
            id: job.id,
            employer: job.employer,
            role: job.role[locale],
            date: <DateRange start={job.startDate} end={job.endDate} locale={locale} />,
            bullets: job.bullets[locale],
            technologies: job.technologies,
          }))}
        />
        <div className="border-t border-divider pt-8">
          <Link className="btn-primary" href={localePath(locale, "/cv")}>
            {t.viewFullCv}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
