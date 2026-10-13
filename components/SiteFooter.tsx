import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon, Download01Icon, LinkSquare01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { blogCategories, profile } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/site";
import { CurrentYear } from "./CurrentYear";
import { ExternalLink } from "./ExternalLink";
import { Logo } from "./Logo";

// One size for every footer link (15px on phones, the page size from md up); only the email shrinks further on
// narrow phones so it stays on one line.
const linkClass =
  "link-arrow w-fit max-w-full text-[15px] [overflow-wrap:anywhere] max-md:justify-center max-md:rounded-full max-md:border max-md:border-[rgb(147_197_253/0.3)] max-md:bg-white/5 max-md:px-4 md:text-[1em]";
const headingClass =
  "!text-sm !font-semibold !leading-normal !tracking-[0.2em] !text-text-muted uppercase";
const iconProps = { size: 18, strokeWidth: 1.75 } as const;

/** Same on every page, so the footer always offers the way to the other parts of the site. */
export function SiteFooter({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const home = localePath(locale);

  return (
    <footer className="border-t border-divider bg-[var(--nav-surface)] backdrop-blur-sm">
      <div className="container-page pt-12 pb-8 md:pt-16 print:pt-4">
        <div className="grid grid-cols-1 gap-y-10 text-center print:hidden md:grid-cols-[1.1fr_1fr_1fr] md:gap-x-12 md:gap-y-12 md:text-left">
          <div className="flex flex-col items-center md:block">
            <Logo priority className="h-14 w-auto md:mx-0" />
            <p className="mt-6 text-lg font-semibold">{profile.fullName}</p>
            <p className="eyebrow mt-3 max-md:flex max-md:flex-col max-md:items-center">{profile.headline[locale]}</p>
          </div>

          <nav aria-label={t.footer.navLabel}>
            <h2 className={headingClass}>{t.footer.navigate}</h2>
            <ul className="mt-4 flex flex-wrap justify-center gap-2 md:flex-col md:items-start md:gap-0">
              <li>
                <Link className={linkClass} href={home}>
                  {t.footer.home}
                </Link>
              </li>
              <li>
                <Link className={linkClass} href={localePath(locale, "/cv")}>
                  {t.nav.cv}
                </Link>
              </li>
              {blogCategories.map((category) => (
                <li key={category.id}>
                  <Link className={linkClass} href={localePath(locale, `/blog/${category.id}`)}>
                    {category.title[locale]}
                  </Link>
                </li>
              ))}
              <li>
                <Link className={linkClass} href={`${home}#contact`}>
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="min-w-0">
            <h2 className={headingClass}>{t.footer.connect}</h2>
            <ul className="mt-4 flex flex-wrap justify-center gap-2 md:flex-col md:items-start md:gap-0">
              <li>
                <a
                  className={`${linkClass} gap-2 md:gap-3`}
                  href={`mailto:${profile.email}`}
                >
                  <HugeiconsIcon icon={Mail01Icon} {...iconProps} aria-hidden="true" className="shrink-0 text-accent" />
                  {profile.email}
                </a>
              </li>
              <li>
                <ExternalLink href={profile.linkedinUrl} newTabLabel={t.opensNewTab} className={`${linkClass} gap-2 md:gap-3`}>
                  <HugeiconsIcon icon={LinkSquare01Icon} {...iconProps} aria-hidden="true" className="shrink-0 text-accent" />
                  {t.linkedin}
                </ExternalLink>
              </li>
              <li>
                <a className={`${linkClass} gap-2 md:gap-3`} href={profile.cvUrl} download="Brandon Oviedo FS.pdf">
                  <HugeiconsIcon icon={Download01Icon} {...iconProps} aria-hidden="true" className="shrink-0 text-accent" />
                  {t.downloadCv}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col flex-wrap items-center justify-between gap-x-8 gap-y-2 border-divider text-center text-sm md:flex-row md:text-left text-text-muted mt-10 border-t pt-8 md:mt-14 md:pt-6 print:mt-0 print:border-0 print:pt-0">
          <div className="flex flex-col items-center gap-x-6 gap-y-1 md:flex-row md:flex-wrap">
            <p>
              © <CurrentYear /> {profile.fullName}
            </p>
            <nav aria-label={t.footer.legalLabel} className="flex gap-5 print:hidden">
              <Link className="inline-flex min-h-11 items-center hover:text-text hover:underline" href={localePath(locale, "/privacy")}>
                {t.footer.privacy}
              </Link>
              <Link className="inline-flex min-h-11 items-center hover:text-text hover:underline" href={localePath(locale, "/terms")}>
                {t.footer.terms}
              </Link>
            </nav>
          </div>
          <a href="#" className="link-arrow gap-3 print:hidden">
            {t.footer.backToTop}
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-full border border-[var(--color-control-border)] text-accent"
            >
              <HugeiconsIcon icon={ArrowUp01Icon} size={18} strokeWidth={1.75} />
            </span>
          </a>
        </div>
      </div>
      {/* Space for the floating mobile navigation bar. */}
      <div aria-hidden="true" className="h-24 min-[1440px]:hidden print:hidden" />
    </footer>
  );
}
