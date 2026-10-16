// Theme preference: "dark", "light" or "system" (follow the operating system). The choice is saved in localStorage and
// applied as data-theme (the resolved theme) and data-theme-preference on <html>; globals.css reads data-theme.

export const THEME_KEY = "theme";
export type ThemePreference = "dark" | "light" | "system";
export type ResolvedTheme = "dark" | "light";

/** Runs before the first paint (see the root layout) so the page never flashes the wrong theme. Keep it tiny. */
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem("${THEME_KEY}");var p=s==="light"||s==="dark"?s:"system";var l=window.matchMedia("(prefers-color-scheme: light)").matches;var t=p==="system"?(l?"light":"dark"):p;var d=document.documentElement;d.dataset.theme=t;d.dataset.themePreference=p;}catch(e){}})();`;

const listeners = new Set<() => void>();

function readPreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "light" || saved === "dark" ? saved : "system";
  } catch {
    return "system";
  }
}

function resolve(preference: ThemePreference): ResolvedTheme {
  if (preference !== "system") return preference;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function apply(preference: ThemePreference) {
  const root = document.documentElement;
  root.dataset.theme = resolve(preference);
  root.dataset.themePreference = preference;
  listeners.forEach(listener => listener());
}

const FADE_MS = 700;

/**
 * Saves and applies a preference with a soft cross-fade of the whole page, like a light dimming up or down. It uses
 * the View Transitions API; browsers without it get colors that transition (see .theme-fade in globals.css), and
 * under reduced motion the change is instant.
 */
export function setThemePreference(preference: ThemePreference) {
  try {
    if (preference === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, preference);
  } catch {
    // Storage can be blocked (private mode): the choice still applies until the page is closed.
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || resolve(preference) === getResolvedTheme()) {
    apply(preference);
    return;
  }
  if (typeof document.startViewTransition === "function" && document.visibilityState === "visible") {
    const transition = document.startViewTransition(() => apply(preference));
    // A transition can be skipped (tab hidden, another one started): the theme still applies, so ignore the rejections.
    transition.ready.catch(() => {});
    transition.updateCallbackDone.catch(() => {});
    transition.finished.catch(() => {});
    return;
  }
  const root = document.documentElement;
  root.classList.add("theme-fade");
  apply(preference);
  window.setTimeout(() => root.classList.remove("theme-fade"), FADE_MS);
}

/** For useSyncExternalStore: re-applies the preference when the system theme or another tab changes it. */
export function subscribeTheme(onChange: () => void) {
  listeners.add(onChange);
  const query = window.matchMedia("(prefers-color-scheme: light)");
  const onSystem = () => {
    if (readPreference() === "system") apply("system");
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_KEY) apply(readPreference());
  };
  query.addEventListener("change", onSystem);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    query.removeEventListener("change", onSystem);
    window.removeEventListener("storage", onStorage);
  };
}

export const getResolvedTheme = (): ResolvedTheme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";
export const getThemePreference = (): ThemePreference => {
  const value = document.documentElement.dataset.themePreference;
  return value === "light" || value === "dark" ? value : "system";
};
export const getServerResolvedTheme = (): ResolvedTheme => "dark";
export const getServerThemePreference = (): ThemePreference => "system";
