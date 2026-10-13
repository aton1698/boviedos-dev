import { formatMonth, verifiedCredentials, type Credential } from "@/content";
import { ui } from "@/content/ui";
import { SectionHeading } from "../SectionHeading";
import type { Locale } from "@/lib/i18n";
import { ExternalLink } from "../ExternalLink";

// Renders nothing without verified records (the nav item is hidden by the same registry).
export function CredentialsSection({ locale }: { locale: Locale }) {
  const t = ui[locale];
  if (verifiedCredentials.length === 0) return null;

  const groups: { kind: Credential["kind"]; title: string }[] = [
    { kind: "certification", title: t.credentialGroups.certification },
    { kind: "course", title: t.credentialGroups.course },
  ];

  return (
    <section id="credentials" aria-labelledby="credentials-title" className="border-t border-divider">
      <div className="container-page section-y">
        <SectionHeading id="credentials-title" eyebrow={t.nav.credentials} className="max-w-[26ch]">
          {t.headings.credentials}
        </SectionHeading>
        <p className="mt-6 max-w-[48ch] text-text-muted">{t.credentialsCopy}</p>

        {groups.map(({ kind, title }) => {
          const items = verifiedCredentials.filter((c) => c.kind === kind);
          if (items.length === 0) return null;
          return (
            <div key={kind} className="mt-12">
              <h3>{title}</h3>
              <ul className="mt-6">
                {items.map((c) => (
                  <li
                    key={c.id}
                    className="grid gap-4 border-t border-divider py-10 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-16 lg:py-12"
                  >
                    <div>
                      <p className="label">{formatMonth(c.issueDate, locale)}</p>
                      <p className="mt-3 text-xl font-semibold leading-snug">{c.title}</p>
                      <p className="mt-1 text-base text-text-muted">{c.issuer}</p>
                    </div>
                    <div className="flex flex-col items-start gap-4">
                      {c.topics.length > 0 && (
                        <ul className="flex flex-wrap gap-2" aria-label={t.credentialLabels.topics}>
                          {c.topics.map((topic) => (
                            <li key={topic} className="skill-chip !min-h-8 !px-3 !py-1 !text-sm">
                              {topic}
                            </li>
                          ))}
                        </ul>
                      )}
                      {c.expiryDate && (
                        <p className="text-text-muted">
                          {t.credentialLabels.expires}: {formatMonth(c.expiryDate, locale)}
                        </p>
                      )}
                      {c.credentialId && (
                        <p className="text-base text-text-muted">
                          {t.credentialLabels.id}: <span className="text-text">{c.credentialId}</span>
                        </p>
                      )}
                      {c.verificationUrl && (
                        <ExternalLink
                          href={c.verificationUrl}
                          newTabLabel={t.opensNewTab}
                          className="btn-secondary !min-h-11 !px-5 text-sm"
                        >
                          {t.credentialLabels.verify}
                          <span aria-hidden="true">↗</span>
                        </ExternalLink>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
