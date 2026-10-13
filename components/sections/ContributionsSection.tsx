import { contributions, experiences } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { ExternalLink } from "../ExternalLink";

export function ContributionsSection({ locale }: { locale: Locale }) {
  const t = ui[locale];

  return (
    <section id="contributions" aria-labelledby="contributions-title" className="border-t border-divider">
      <div className="container-page section-y">
        <h2 id="contributions-title" className="max-w-[16ch]">
          {t.headings.contributions}
        </h2>
        <p className="mt-6 max-w-[48ch] text-text-muted">{t.contributionsIntro}</p>

        <ol className="mt-12">
          {contributions.map((item, index) => {
            const employer =
              experiences.find((job) => job.id === item.relatedExperienceId)?.employer ?? item.employer;
            return (
              <li
                key={item.id}
                className="grid gap-4 border-t border-divider py-8 lg:grid-cols-[200px_minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-8"
              >
                <p className="label">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <h3>{item.title[locale]}</h3>
                  <p className="mt-1 text-text-muted">{employer}</p>
                </div>
                <div>
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
