import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { capabilities } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { CapabilityDeepLink } from "../CapabilityDeepLink";
import { SectionHeading } from "../SectionHeading";

/** Full capabilities page: collapsible rows with what each capability covers and its related technologies. */
export function CapabilitiesSection({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="border-t border-divider">
      <div className="container-page section-y">
        <SectionHeading id="capabilities-title" eyebrow={t.nav.capabilities} className="max-w-[26ch]">
          {t.headings.capabilities}
        </SectionHeading>
        <p className="mt-6 max-w-[48ch] text-text-muted">{t.capabilitiesIntro}</p>
        <CapabilityDeepLink />

        {/* Native <details> elements sharing a `name` form an exclusive group: opening one closes the other, with no
            JavaScript. The first capability starts open. */}
        <div className="mt-12">
          {capabilities.map((item, index) => (
            <details key={item.id} id={`cap-${item.id}`} name="capability" open={index === 0} className="accordion fade-row group border-t border-divider">
              <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 py-8 [&::-webkit-details-marker]:hidden">
                <div className="grid flex-1 gap-2 lg:grid-cols-[19rem_1fr] lg:gap-16">
                  <div>
                    <span className="label !text-accent block">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3">{item.title[locale]}</h3>
                  </div>
                  <p className="max-w-[62ch] text-base leading-relaxed text-text-muted lg:pt-8">{item.summary[locale]}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-2 grid size-9 shrink-0 place-items-center rounded-full border border-[var(--color-control-border)] text-accent transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-open:rotate-180"
                >
                  <HugeiconsIcon icon={ArrowDown01Icon} size={18} strokeWidth={1.75} />
                </span>
              </summary>
              <div className="grid gap-6 pb-10 pt-2 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-16">
                <div className="hidden lg:block" />
                <div className="max-w-[62ch]">
                  <ul className="flex flex-col gap-3 leading-relaxed">
                    {item.points[locale].map((point) => (
                      <li
                        key={point}
                        className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:size-1.5 before:rounded-full before:bg-accent"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                  {item.technologies.length > 0 && (
                    <>
                      <p className="label mt-6">{t.technologies}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {item.technologies.map((name) => (
                          <li key={name} className="skill-chip !min-h-8 !px-3 !py-1 !text-sm">
                            {name}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
