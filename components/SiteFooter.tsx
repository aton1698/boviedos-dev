import { profile, visibleSections } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { CurrentYear } from "./CurrentYear";
import { ExternalLink } from "./ExternalLink";
import { Logo } from "./Logo";

const linkClass = "link-arrow w-fit";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = ui[locale];

  return (
    <footer className="border-t border-divider bg-[var(--nav-surface)] backdrop-blur-sm">
      <div className="container-page pt-16 pb-8 print:pt-4">
        <div className="grid gap-12 print:hidden md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="h-12 w-auto" />
            <p className="mt-6 text-lg font-semibold">{profile.fullName}</p>
            <p className="eyebrow mt-3">{profile.headline[locale]}</p>
            <p className="mt-6 max-w-[34ch] text-text-muted">{t.footer.tagline}</p>
            <p className="mt-2 text-text-muted">{profile.location[locale]}</p>
          </div>

          <nav aria-label={t.footer.navLabel}>
            <h2 className="!text-sm !font-semibold !leading-normal !tracking-[0.2em] !text-text-muted uppercase">{t.footer.navigate}</h2>
            <ul className="mt-4 flex flex-col">
              {visibleSections.map((id) => (
                <li key={id}>
                  <a className={linkClass} href={`#${id}`}>
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="!text-sm !font-semibold !leading-normal !tracking-[0.2em] !text-text-muted uppercase">{t.footer.connect}</h2>
            <ul className="mt-4 flex flex-col">
              <li>
                <a className={linkClass} href={`mailto:${profile.email}`}>
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
          <a href="#profile" className="link-arrow print:hidden">
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
