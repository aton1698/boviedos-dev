"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Loaded only after the first paint (see below): the shader compile and first frame are a long task.
const Iridescence = dynamic(() => import("./Iridescence"), { ssr: false });

// Iridescence parses colors in JS, so it cannot take CSS variables: keep in sync with the brand tokens
// in globals.css. Monotone mode maps the folds to a gradient from Electric Blue to deep navy, so the
// surface only contains blues and near-black navy (the stock shader would add pinks and cyans).
const FLOW_TINT = "#2563ff";
const FLOW_BASE = "#050a1a";

// Decorative only: aria-hidden, no pointer events. Half resolution already gives it a soft look (no CSS blur: it forced a
// re-composite of the animating canvas on every frame).
// html already paints the page color, so nothing is missing before the effect mounts or if WebGL fails.
export function PageBackground() {
  const [ready, setReady] = useState(false);

  // Defer the heavy WebGL work until the browser is idle so it never blocks LCP or input.
  useEffect(() => {
    const start = () => setReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(start, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 transition-opacity duration-1000 print:hidden ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      {ready && (
        <>
          <Iridescence
            color={FLOW_TINT}
            monotone
            monotoneBase={FLOW_BASE}
            brightness={1}
            contrast={0.9}
            speed={0.6}
            scale={1.4}
            detail={6}
            warp={1}
            amplitude={0.1}
            stir={0.5}
            sheen={0.08}
            clickSwirl
            // Half resolution: the layer is blurred anyway, and it is 4x fewer pixels to shade.
            resolution={0.5}
            // 30 fps: the pattern drifts slowly, so it looks the same with half the GPU work.
            maxFps={30}
          />
          {/* Dark veil: keeps the pattern visible but guarantees readable text on every section. */}
          <div className="absolute inset-0 bg-[#050a1a]/60" />
        </>
      )}
    </div>
  );
}
