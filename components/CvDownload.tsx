import { profile } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

// File lives in public/cv/.
export function CvDownload({ locale }: { locale: Locale }) {
  return (
    <a className="btn-primary print:hidden" href={profile.cvUrl} download="Brandon Oviedo FS.pdf">
      {ui[locale].downloadCv}
      <span aria-hidden="true">→</span>
    </a>
  );
}
