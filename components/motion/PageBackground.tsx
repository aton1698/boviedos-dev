"use client";

import Iridescence from "./Iridescence";

// Iridescence parses colors in JS, so it cannot take CSS variables: keep in sync with the brand tokens
// in globals.css. Monotone mode maps the folds to a gradient from Electric Blue to deep navy, so the
// surface only contains blues and near-black navy (the stock shader would add pinks and cyans).
const FLOW_TINT = "#2563ff";
const FLOW_BASE = "#050a1a";

// Decorative only: aria-hidden, no pointer events, softly blurred so it never competes with text,
// and html keeps the page color if WebGL is unavailable.
export function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed -inset-6 -z-10 blur-[2px] print:hidden"
    >
      <Iridescence
        color={FLOW_TINT}
        monotone
        monotoneBase={FLOW_BASE}
        brightness={1}
        contrast={0.9}
        speed={0.6}
        scale={1.4}
        detail={8}
        warp={1}
        amplitude={0.1}
        stir={0.5}
        sheen={0.08}
        clickSwirl
      />
      {/* Dark veil: keeps the pattern visible but guarantees readable text on every section. */}
      <div className="absolute inset-0 bg-[#050a1a]/45" />
    </div>
  );
}
