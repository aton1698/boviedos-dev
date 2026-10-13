import { education, publications } from "@/content";
import { ui } from "@/content/ui";
import { SectionHeading } from "../SectionHeading";
import type { Locale } from "@/lib/i18n";
import { DateRange } from "../DateRange";
import { ExternalLink } from "../ExternalLink";

export function EducationSection({ locale }: { locale: Locale }) {
  const t = ui[locale];

  return (
    <section id="education" aria-labelledby="education-title" className="border-t border-divider">
      <div className="container-page section-y">
        <SectionHeading id="education-title" eyebrow={t.nav.education} className="max-w-[18ch]">
          {t.headings.education}
        </SectionHeading>

        <ul className="mt-12">
          {education.map((item) => (
            <li
              key={item.id}
              className="grid gap-4 border-t border-divider py-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-8"
            >
              <DateRange start={item.startDate} end={item.endDate} locale={locale} />
              <div>
                <h3>{item.institution}</h3>
                <p className="mt-1 text-text-muted">{item.qualification[locale]}</p>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mt-16">{t.headings.research}</h3>
        <ul className="mt-6">
          {publications.map((pub) => (
            <li
              key={pub.id}
              className="grid gap-4 border-t border-divider py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-8"
            >
              <div>
                <p className="font-medium">
                  {pub.event}
                  {pub.eventLocation && (
                    <span className="text-text-muted"> · {pub.eventLocation[locale]}</span>
                  )}
                </p>
                <p className="label mt-1">{pub.role[locale]}</p>
              </div>
              <div>
                <p>{pub.title[locale]}</p>
                {pub.note && (
                  <p className="mt-2 text-text-muted">
                    {pub.url ? (
                      <ExternalLink
                        href={pub.url}
                        newTabLabel={t.opensNewTab}
                        className="underline decoration-accent underline-offset-4 hover:text-[var(--color-hover-text)]"
                      >
                        {pub.note[locale]}
                      </ExternalLink>
                    ) : (
                      pub.note[locale]
                    )}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
