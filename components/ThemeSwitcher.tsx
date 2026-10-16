"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ComputerIcon, Moon02Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { setThemePreference, type ThemePreference } from "@/lib/theme";
import { useThemePreference } from "@/lib/use-theme";

interface ThemeSwitcherProps {
  labels: { label: string; dark: string; light: string; system: string };
}

const OPTIONS = [
  { value: "dark", icon: Moon02Icon },
  { value: "light", icon: Sun01Icon },
  { value: "system", icon: ComputerIcon },
] as const satisfies readonly { value: ThemePreference; icon: unknown }[];

/** Dark / light / follow the system. A radio group, so the arrow keys move between the options. */
export function ThemeSwitcher({ labels }: ThemeSwitcherProps) {
  const preference = useThemePreference();

  return (
    <div role="radiogroup" aria-label={labels.label} className="inline-flex rounded-full border border-divider bg-[var(--well)] p-1 print:hidden">
      {OPTIONS.map(({ value, icon }) => {
        const selected = preference === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => setThemePreference(value)}
            onKeyDown={event => {
              if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
              event.preventDefault();
              const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
              const next = OPTIONS[(OPTIONS.findIndex(option => option.value === value) + step + OPTIONS.length) % OPTIONS.length];
              setThemePreference(next.value);
              (event.currentTarget.parentElement?.querySelector(`[data-value="${next.value}"]`) as HTMLElement | null)?.focus();
            }}
            data-value={value}
            className={`inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors ${
              selected ? "bg-[var(--btn-primary)] text-white" : "text-text-muted hover:text-text"
            }`}
          >
            <HugeiconsIcon icon={icon} size={18} strokeWidth={1.75} aria-hidden="true" />
            <span className="max-sm:sr-only">{labels[value]}</span>
          </button>
        );
      })}
    </div>
  );
}
