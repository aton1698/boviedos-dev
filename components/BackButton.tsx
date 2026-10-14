import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/site";

/** Icon-only round button back to the home page. The tooltip is visual; the accessible name is the aria-label. */
export function BackButton({
  locale,
  href,
  label = ui[locale].backHome,
}: {
  locale: Locale;
  /** Defaults to the home page. */
  href?: string;
  label?: string;
}) {

  return (
    <Link href={href ?? localePath(locale)} aria-label={label} className="group relative flex w-fit print:hidden">
      <span className="grid size-11 place-items-center rounded-full border border-[var(--color-control-border)] text-accent transition-colors group-hover:border-accent group-hover:bg-surface group-hover:text-[var(--color-hover-text)]">
        <HugeiconsIcon icon={ArrowLeft01Icon} size={22} strokeWidth={2} aria-hidden="true" />
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 translate-x-[-4px] whitespace-nowrap rounded-full border border-divider bg-[var(--nav-surface)] px-3 py-1.5 text-sm text-text opacity-0 backdrop-blur transition duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
      >
        {label}
      </span>
    </Link>
  );
}
