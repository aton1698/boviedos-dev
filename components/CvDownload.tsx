import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon } from "@hugeicons/core-free-icons";
import { profile } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

// File lives in public/cv/.
export function CvDownload({ locale }: { locale: Locale }) {
  return (
    <a className="btn-primary print:hidden" href={profile.cvUrl} download="Brandon Oviedo FS.pdf">
      <HugeiconsIcon icon={Download01Icon} size={20} strokeWidth={1.75} aria-hidden="true" />
      {ui[locale].downloadCv}
    </a>
  );
}
