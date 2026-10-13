import { legalDocuments, legalUpdated, type LegalPageId } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { BackButton } from "./BackButton";
import { SectionHeading } from "./SectionHeading";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function LegalPage({ id, locale }: { id: LegalPageId; locale: Locale }) {
  const t = ui[locale];
  const doc = legalDocuments[id][locale];
  const updated = new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(`${legalUpdated}T00:00:00Z`),
  );

  return (
    <>
      <SiteHeader locale={locale} sections={[]} path={`/${id}`} />
      <main id="main" className="min-h-[60vh] pb-24 min-[1440px]:pb-0">
        <article aria-labelledby="legal-title">
          <div className="container-page section-y">
            <BackButton locale={locale} />
            <div className="mt-8">
              <SectionHeading id="legal-title" eyebrow={t.footer.legalLabel}>
                {doc.title}
              </SectionHeading>
            </div>
            <p className="label mt-6">
              {t.lastUpdated}: <time dateTime={legalUpdated}>{updated}</time>
            </p>
            <p className="reveal mt-6 max-w-[64ch] text-lg text-text-muted">{doc.intro}</p>
            <div className="mt-12 max-w-[64ch]">
              {doc.sections.map((section) => (
                <section key={section.heading} className="reveal border-t border-divider py-8">
                  <h2 className="text-xl">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-4 leading-7 text-text-muted lg:leading-8">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
