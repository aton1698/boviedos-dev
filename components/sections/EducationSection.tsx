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
        <SectionHeading id="education-title" eyebrow={t.nav.education} className="max-w-[26ch]">
          {t.headings.education}
        </SectionHeading>

        <ul className="mt-12">
          {education.map((item) => (
            <li
              key={item.id}
              className="fade-row grid gap-4 border-t border-divider py-10 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-16 lg:py-12"
            >
              <DateRange start={item.startDate} end={item.endDate} locale={locale} />
              <div>
                <h3>{item.institution}</h3>
                <p className="mt-1 text-base text-text-muted">{item.qualification[locale]}</p>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mt-16">{t.headings.research}</h3>
        <ul className="mt-6">
          {publications.map((pub) => (
            <li
              key={pub.id}
              className="fade-row grid gap-4 border-t border-divider py-10 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-16 lg:py-12"
            >
              <div>
                <p className="text-lg font-semibold">{pub.event}</p>
                {pub.eventLocation && <p className="mt-1 text-base text-text-muted">{pub.eventLocation[locale]}</p>}
                <p className="label mt-3">{pub.role[locale]}</p>
              </div>
              <div className="max-w-[62ch] leading-relaxed">
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
