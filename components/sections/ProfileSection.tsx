import { profile } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { CvDownload } from "../CvDownload";

export function ProfileSection({ locale }: { locale: Locale }) {
  const t = ui[locale];

  return (
    <section id="profile" aria-labelledby="profile-title" className="relative isolate overflow-x-clip">
      <div className="container-page section-y">
        <p className="label">{profile.headline[locale]}</p>
        <h1 id="profile-title" className="mt-6 max-w-[14ch]">
          {profile.fullName}
        </h1>
        <p className="mt-8 max-w-[34ch] text-xl text-text lg:text-2xl">
          {profile.summary[locale]}
        </p>
        <p className="mt-4 max-w-[48ch] text-text-muted">
          {profile.supportingLine[locale]}
        </p>
        <p className="mt-6 text-text-muted">
          {[profile.location[locale], ...profile.languages[locale]].join(" · ")}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <CvDownload locale={locale} />
          <a className="link-arrow print:hidden" href="#contact">
            {t.getInTouch}
            <span className="ml-2 text-accent" aria-hidden="true">
              →
            </span>
          </a>
        </div>

        <dl className="mt-16 grid gap-6 border-t border-divider pt-8 sm:grid-cols-2">
          <div>
            <dt className="label">{t.currentlyAt}</dt>
            <dd className="mt-2">{profile.currentEmployer}</dd>
          </div>
          <div>
            <dt className="label">{t.focus}</dt>
            <dd className="mt-2">{profile.focusAreas.join(" / ")}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
