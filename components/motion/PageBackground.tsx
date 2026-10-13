"use client";

import FluxLines from "./FluxLines";

// FluxLines parses colors in JS, so it cannot take CSS variables: keep in sync with --color-bg.
const PAGE_BG = "#090c10";

// Values from the React Bits "Calm" preset customization. Decorative only:
// the canvas paints its own opaque background, and html keeps the same color if WebGL fails.
export function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 print:hidden"
    >
      <FluxLines
        colors={["#041b4d", "#0a3a9e", "#8ec5ff"]}
        glow={1.6}
        rimWidth={0.14}
        sharpness={2.5}
        lineWidth={1}
        shimmer={1}
        scale={1.6}
        speed={0.1}
        turbulence={0.6}
        fluidity={0.1}
        flowDirection="down"
        mouseInteraction
        mouseStrength={1}
        mouseRadius={0.35}
        clickSwirl
        intro
        lightMode={false}
        transparent={false}
        backgroundColor={PAGE_BG}
      />
    </div>
  );
}
