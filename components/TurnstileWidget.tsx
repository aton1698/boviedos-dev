"use client";

import { useEffect, useRef } from "react";

interface TurnstileApi {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      theme: "light" | "dark" | "auto";
      language: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<TurnstileApi> | null = null;

/** Loads Cloudflare's script once for the whole page. */
function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  scriptPromise ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile missing")));
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/** Cloudflare Turnstile challenge. `onToken` gets the response token, or null when it expires or fails. */
export function TurnstileWidget({
  siteKey,
  onToken,
  onReady,
  theme = "auto",
  language,
}: {
  siteKey: string;
  onToken: (token: string | null) => void;
  onReady?: () => void;
  theme?: "light" | "dark" | "auto";
  language: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const callbacks = useRef({ onToken, onReady });
  useEffect(() => {
    callbacks.current = { onToken, onReady };
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    let widgetId: string | null = null;
    let cancelled = false;
    loadTurnstile()
      .then(api => {
        if (cancelled) return;
        widgetId = api.render(container, {
          sitekey: siteKey,
          theme,
          language,
          callback: token => callbacks.current.onToken(token),
          "expired-callback": () => callbacks.current.onToken(null),
          "error-callback": () => callbacks.current.onToken(null),
        });
        callbacks.current.onReady?.();
      })
      .catch(() => callbacks.current.onToken(null));
    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [siteKey, theme, language]);

  return <div ref={containerRef} className="min-h-[65px]" />;
}
