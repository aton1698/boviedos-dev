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
        <SectionHeading id="credentials-title" eyebrow={t.nav.credentials} className="max-w-[16ch]">
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
                    className="grid gap-4 border-t border-divider py-8 lg:grid-cols-[200px_minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-8"
                  >
                    <p className="label">{formatMonth(c.issueDate, locale)}</p>
                    <div>
                      <p className="font-medium">{c.title}</p>
                      <p className="mt-1 text-text-muted">{c.issuer}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {c.topics.length > 0 && (
                        <p>
                          <span className="label">{t.credentialLabels.topics}: </span>
                          {c.topics.join(", ")}
                        </p>
                      )}
                      {c.expiryDate && (
                        <p className="text-text-muted">
                          {t.credentialLabels.expires}: {formatMonth(c.expiryDate, locale)}
                        </p>
                      )}
                      {c.credentialId && (
                        <p className="text-text-muted">
                          {t.credentialLabels.id}: {c.credentialId}
                        </p>
                      )}
                      {c.verificationUrl && (
                        <ExternalLink
                          href={c.verificationUrl}
                          newTabLabel={t.opensNewTab}
                          className="link-arrow"
                        >
                          {t.credentialLabels.verify}
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
