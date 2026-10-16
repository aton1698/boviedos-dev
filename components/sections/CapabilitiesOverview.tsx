import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { File01Icon } from "@hugeicons/core-free-icons";
import { capabilities } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/site";
import { CapabilitiesCarousel } from "../CapabilitiesCarousel";
import { SectionHeading } from "../SectionHeading";

// ChromaGrid takes colors in JS: keep in sync with --brand-electric / --brand-soft in globals.css.
const ACCENT_PRIMARY = "#2563ff";
const ACCENT_SOFT = "#93c5fd";

/** Home page: what I do, one card per capability, with a link to the full page. */
export function CapabilitiesOverview({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="border-t border-divider">
      <div className="container-page section-y">
        <SectionHeading id="capabilities-title" eyebrow={t.nav.capabilities} className="max-w-[26ch]">
          {t.headings.capabilities}
        </SectionHeading>
        <p className="mt-6 max-w-[48ch] text-text-muted">{t.capabilitiesIntro}</p>

        <div className="fade-row mt-12">
          <CapabilitiesCarousel
            labels={t.capabilitiesNav}
            items={capabilities.map((item, index) => ({
              id: item.id,
              image: `/capabilities/${item.id}.svg`,
              title: item.title[locale],
              subtitle: item.summary[locale],
              tag: String(index + 1).padStart(2, "0"),
              // Opens the capabilities page with this capability expanded (see CapabilityDeepLink).
              href: `${localePath(locale, "/cv")}#capability-${item.id}`,
              accent: index % 2 === 0 ? ACCENT_PRIMARY : ACCENT_SOFT,
            }))}
          />
        </div>

        <div className="fade-row mt-10 flex justify-center">
          <Link className="btn-primary" href={localePath(locale, "/cv")}>
            <HugeiconsIcon icon={File01Icon} size={20} strokeWidth={1.75} aria-hidden="true" />
            {t.viewFullCv}
          </Link>
        </div>
      </div>
    </section>
  );
}
