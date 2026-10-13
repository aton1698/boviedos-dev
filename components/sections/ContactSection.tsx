import { HugeiconsIcon } from "@hugeicons/react";
import {
  LinkSquare01Icon,
  Location01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { profile } from "@/content";
import { ui } from "@/content/ui";
import { SectionHeading } from "../SectionHeading";
import type { Locale } from "@/lib/i18n";
import { CvDownload } from "../CvDownload";
import { ExternalLink } from "../ExternalLink";

const iconProps = { size: 20, strokeWidth: 1.75 } as const;
const rowClass = "flex min-h-11 items-center gap-3 py-2";

export function ContactSection({ locale }: { locale: Locale }) {
  const t = ui[locale];

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-divider">
      <div className="container-page section-y">
        <SectionHeading id="contact-title" eyebrow={t.nav.contact} className="max-w-[22ch]">
          {t.headings.contact}
        </SectionHeading>
        <p className="mt-6 max-w-[48ch] text-text-muted">{t.contactCopy}</p>

        <ul className="mt-12 grid gap-x-8 sm:grid-cols-2 lg:max-w-3xl">
          <li>
            <a href={`mailto:${profile.email}`} className={`${rowClass} link-arrow`}>
              <HugeiconsIcon icon={Mail01Icon} {...iconProps} aria-hidden="true" />
              <span>
                <span className="sr-only">{t.contactLabels.email}: </span>
                {profile.email}
              </span>
            </a>
          </li>
          <li className={rowClass}>
            <HugeiconsIcon icon={Location01Icon} {...iconProps} aria-hidden="true" />
            <span>
              <span className="sr-only">{t.contactLabels.location}: </span>
              {profile.location[locale]}
            </span>
          </li>
          <li>
            <ExternalLink
              href={profile.linkedinUrl}
              newTabLabel={t.opensNewTab}
              className={`${rowClass} link-arrow`}
            >
              <HugeiconsIcon icon={LinkSquare01Icon} {...iconProps} aria-hidden="true" />
              <span>
                {t.linkedin}
                <span className="hidden print:inline"> — {profile.linkedinUrl}</span>
              </span>
            </ExternalLink>
          </li>
        </ul>

        <div className="mt-10">
          <CvDownload locale={locale} />
        </div>
      </div>
    </section>
  );
}
