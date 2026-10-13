import { contributions, experiences } from "@/content";
import { ui } from "@/content/ui";
import { SectionHeading } from "../SectionHeading";
import type { Locale } from "@/lib/i18n";
import { ExternalLink } from "../ExternalLink";

export function ContributionsSection({ locale }: { locale: Locale }) {
  const t = ui[locale];

  return (
    <section id="contributions" aria-labelledby="contributions-title" className="border-t border-divider">
      <div className="container-page section-y">
        <SectionHeading id="contributions-title" eyebrow={t.nav.contributions} className="max-w-[26ch]">
          {t.headings.contributions}
        </SectionHeading>
        <p className="mt-6 max-w-[48ch] text-text-muted">{t.contributionsIntro}</p>

        <ol className="mt-12">
          {contributions.map((item, index) => {
            const employer =
              experiences.find((job) => job.id === item.relatedExperienceId)?.employer ?? item.employer;
            return (
              <li
                key={item.id}
                className="fade-row grid gap-4 border-t border-divider py-10 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-16 lg:py-12"
              >
                <div>
                  <p className="label !text-accent">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3">{item.title[locale]}</h3>
                  <p className="mt-1 text-base text-text-muted">{employer}</p>
                </div>
                <div className="max-w-[62ch] leading-relaxed lg:pt-8">
                  <p>{item.description[locale]}</p>
                  {item.caseStudyUrl && (
                    <ExternalLink href={item.caseStudyUrl} newTabLabel={t.opensNewTab} className="link-arrow mt-2">
                      {t.caseStudy}
                    </ExternalLink>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
