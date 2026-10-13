import type { NavId } from "@/content";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon } from "@hugeicons/core-free-icons";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/site";
import { HeaderContactButton } from "./HeaderContactButton";
import { LanguageSelect } from "./LanguageSelect";
import { Logo } from "./Logo";
import { SiteNav } from "./SiteNav";

interface SiteHeaderProps {
  locale: Locale;
  /** Page-relative sections to link in the navigation (anchors on this page). */
  sections: readonly NavId[];
  /** Route of this page without the locale ("" for home, "/cv", ...); used by the language switcher. */
  path?: string;
}

export function SiteHeader({ locale, sections, path = "" }: SiteHeaderProps) {
  const t = ui[locale];
  const links = sections.map((id) => ({ id, label: t.nav[id] }));
  const isHome = path === "";

  return (
    <>
      {/* The navigation is fixed and lives OUTSIDE the sticky header: a fixed element nested in a sticky one can
          drift or vanish on mobile browsers when the toolbar collapses or the page rubber-bands. */}
      <header className="sticky top-0 z-40 border-b border-divider print:hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-bg/80 backdrop-blur"
        />
        <div className="container-page flex min-h-[var(--header-height)] items-center justify-between gap-4">
          {/* Logo only (owner request); the link keeps its accessible name through aria-label. */}
          <a
            href={isHome ? "#profile" : localePath(locale)}
            aria-label={t.homeLabel}
            className="flex min-w-11 items-center"
          >
            <Logo priority className="h-12 w-auto shrink-0" />
          </a>
          <HeaderContactButton
            href={isHome ? "#contact" : `${localePath(locale)}#contact`}
            label={t.cta}
            fadeWithHero={isHome}
          />
          <div className="flex items-center gap-3">
            <LanguageSelect
              locale={locale}
              path={path}
              label={t.languageLabel}
              names={{ en: ui.en.languageName, es: ui.es.languageName }}
            />
            <a
              href={isHome ? "#contact" : `${localePath(locale)}#contact`}
              className="btn-primary hidden !min-h-11 !px-5 text-sm sm:inline-flex"
            >
              <HugeiconsIcon icon={Mail01Icon} size={20} strokeWidth={1.75} aria-hidden="true" />
              {t.cta}
            </a>
          </div>
        </div>
      </header>
      {links.length > 0 && <SiteNav links={links} navLabel={t.mainNav} />}
    </>
  );
}
