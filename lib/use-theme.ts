"use client";

import { useSyncExternalStore } from "react";
import {
  getResolvedTheme,
  getServerResolvedTheme,
  getServerThemePreference,
  getThemePreference,
  subscribeTheme,
  type ResolvedTheme,
  type ThemePreference,
} from "./theme";

/** The theme in use right now ("dark" or "light"), also when the preference is "system". */
export function useResolvedTheme(): ResolvedTheme {
  return useSyncExternalStore(subscribeTheme, getResolvedTheme, getServerResolvedTheme);
}

/** What the visitor chose: "dark", "light" or "system". */
export function useThemePreference(): ThemePreference {
  return useSyncExternalStore(subscribeTheme, getThemePreference, getServerThemePreference);
}
