import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { File01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { profile } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/site";
import { CvDownload } from "../CvDownload";
import { Highlights } from "../Highlights";
import { Logo } from "../Logo";

export function ProfileSection({ locale }: { locale: Locale }) {
  const t = ui[locale];

  return (
    <section
      id="profile"
      aria-labelledby="profile-title"
      className="relative isolate overflow-x-clip"
    >
      <div className="container-page section-y relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <div className="hero-exit">
          <p className="eyebrow">{profile.headline[locale]}</p>
          <h1 id="profile-title" className="mt-6 max-w-[14ch]">
            {profile.fullName}
          </h1>
          <p className="mt-8 max-w-[34ch] text-xl text-text lg:text-2xl">{profile.summary[locale]}</p>
          <p className="mt-4 max-w-[48ch] text-text-muted">{profile.supportingLine[locale]}</p>
          <p className="mt-6 text-text-muted">
            {[profile.location[locale], ...profile.languages[locale]].join(" · ")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <CvDownload locale={locale} />
            <Link className="btn-secondary print:hidden" href={localePath(locale, "/cv")}>
              <HugeiconsIcon icon={File01Icon} size={20} strokeWidth={1.75} aria-hidden="true" />
              {t.viewFullCv}
            </Link>
            <a className="btn-secondary print:hidden" href="#contact">
              <HugeiconsIcon icon={Mail01Icon} size={20} strokeWidth={1.75} aria-hidden="true" />
              {t.getInTouch}
            </a>
          </div>

        </div>

        <div className="hero-drift relative hidden lg:block print:hidden" aria-hidden="true">
          <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(37_99_255/0.35),transparent)] blur-2xl" />
          <Logo priority className="mx-auto h-auto w-full max-w-xs drop-shadow-[0_0_40px_rgb(37_99_255/0.5)]" />
        </div>

        <dl className="grid gap-6 border-t border-divider pt-8 sm:grid-cols-2 lg:col-span-2">
          <div>
            <dt className="label">{t.currentlyAt}</dt>
            <dd className="mt-2">{profile.currentEmployer}</dd>
          </div>
          <div>
            <dt className="label">{t.focus}</dt>
            <dd className="mt-2">{profile.focusAreas[locale].join(" / ")}</dd>
          </div>
        </dl>

        <Highlights locale={locale} />
      </div>
    </section>
  );
}
