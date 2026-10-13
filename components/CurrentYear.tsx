"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const clientYear = () => new Date().getFullYear();
const serverYear = () => Number(process.env.NEXT_PUBLIC_BUILD_YEAR);

/** Real current year in the browser; build year in static HTML and without JavaScript. */
export function CurrentYear() {
  const year = useSyncExternalStore(subscribe, clientYear, serverYear);
  return <>{year}</>;
}
