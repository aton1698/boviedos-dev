import { profile } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

// File lives in public/cv/.
export function CvDownload({ locale }: { locale: Locale }) {
  return (
    <a
      className="btn-outline print:hidden"
      href={profile.cvUrl}
      download="Brandon Oviedo FS.pdf"
    >
      {ui[locale].downloadCv}
      <span className="ml-2 font-mono text-xs text-muted" aria-hidden="true">
        PDF
      </span>
    </a>
  );
}
