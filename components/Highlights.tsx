import { experiences, verifiedCredentials } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { CountUp } from "./CountUp";

// Matches the CV summary and the supporting line in content/profile.ts ("5+ years").
const YEARS_OF_EXPERIENCE = 5;

/** Key facts strip under the hero. Every number comes from the CV or from the content files. */
export function Highlights({ locale }: { locale: Locale }) {
  const t = ui[locale].highlights;
  const items = [
    { value: YEARS_OF_EXPERIENCE, suffix: "+", label: t.years },
    { value: experiences.length, suffix: "", label: t.companies },
    ...(verifiedCredentials.length > 0
      ? [{ value: verifiedCredentials.length, suffix: "", label: t.credentials }]
      : []),
  ];

  return (
    <ul className="reveal grid grid-cols-3 gap-4 border-t border-divider pt-8 lg:col-span-2">
      {items.map((item) => (
        <li key={item.label}>
          <p className="text-4xl font-bold leading-none tracking-tight text-text lg:text-6xl">
            <CountUp value={item.value} suffix={item.suffix} />
          </p>
          <p className="label mt-3">{item.label}</p>
        </li>
      ))}
    </ul>
  );
}
