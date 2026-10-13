import { formatMonth } from "@/content";
import type { Locale } from "@/lib/i18n";

interface DateRangeProps {
  start: string;
  end: string | null;
  locale: Locale;
}

export function DateRange({ start, end, locale }: DateRangeProps) {
  return (
    <p className="label">
      <time dateTime={start}>{formatMonth(start, locale)}</time>
      {"–"}
      {end ? (
        <time dateTime={end}>{formatMonth(end, locale)}</time>
      ) : (
        formatMonth(null, locale)
      )}
    </p>
  );
}
