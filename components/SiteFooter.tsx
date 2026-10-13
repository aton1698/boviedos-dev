import Link from "next/link";
import { profile, type NavId } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/site";
import { CurrentYear } from "./CurrentYear";
import { ExternalLink } from "./ExternalLink";
import { Logo } from "./Logo";

const linkClass = "link-arrow w-fit max-w-full [overflow-wrap:anywhere]";

interface SiteFooterProps {
  locale: Locale;
  sections: readonly NavId[];
  /** Prefix for section anchors when they live on another page (e.g. the home route). */
  anchorBase?: string;
}

export function SiteFooter({ locale, sections, anchorBase = "" }: SiteFooterProps) {
  const t = ui[locale];

  return (
    <footer className="border-t border-divider bg-[var(--nav-surface)] backdrop-blur-sm">
      <div className="container-page pt-16 pb-8 print:pt-4">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-x-6 gap-y-12 print:hidden md:grid-cols-[1.4fr_1fr_1fr] md:gap-x-12">
          <div className="col-span-2 md:col-span-1">
            <Logo className="h-12 w-auto" />
            <p className="mt-6 text-lg font-semibold">{profile.fullName}</p>
            <p className="eyebrow mt-3">{profile.headline[locale]}</p>
            <p className="mt-6 max-w-[34ch] text-text-muted">{t.footer.tagline}</p>
            <p className="mt-2 text-text-muted">{profile.location[locale]}</p>
          </div>

          <nav aria-label={t.footer.navLabel}>
            <h2 className="!text-sm !font-semibold !leading-normal !tracking-[0.2em] !text-text-muted uppercase">{t.footer.navigate}</h2>
            <ul className="mt-4 flex flex-col">
              {sections.map((id) => (
                <li key={id}>
                  <a className={linkClass} href={`${anchorBase}#${id}`}>
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <h2 className="!text-sm !font-semibold !leading-normal !tracking-[0.2em] !text-text-muted uppercase">{t.footer.connect}</h2>
            <ul className="mt-4 flex flex-col">
              <li>
                <a
                  className="link-arrow w-fit whitespace-nowrap text-[clamp(11px,3.6vw,16px)] md:text-base"
                  href={`mailto:${profile.email}`}
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <ExternalLink href={profile.linkedinUrl} newTabLabel={t.opensNewTab} className={linkClass}>
                  {t.linkedin}
                </ExternalLink>
              </li>
              <li>
                <a className={linkClass} href={profile.cvUrl} download="Brandon Oviedo FS.pdf">
                  {t.downloadCv}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-divider text-sm text-text-muted md:mt-14 md:border-t md:pt-6 print:mt-0 print:border-0 print:pt-0 [&:not(:first-child)]:mt-12">
          <p>
            © <CurrentYear /> {profile.fullName}
          </p>
          <nav aria-label={t.footer.legalLabel} className="flex gap-6 print:hidden">
            <Link className="link-arrow" href={localePath(locale, "/privacy")}>
              {t.footer.privacy}
            </Link>
            <Link className="link-arrow" href={localePath(locale, "/terms")}>
              {t.footer.terms}
            </Link>
          </nav>
          <a href="#" className="link-arrow print:hidden">
            {t.footer.backToTop}
            <span className="ml-2 text-accent" aria-hidden="true">
              ↑
            </span>
          </a>
        </div>
      </div>
      {/* Space for the floating mobile navigation bar. */}
      <div aria-hidden="true" className="h-24 min-[1440px]:hidden print:hidden" />
    </footer>
  );
}
