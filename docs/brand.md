# Brand: "Pulse Flow" — Brandon Oviedo Sánchez, Full Stack Developer

Source of truth for every visual decision. The owner's brand board ("Proposal 02, Pulse Flow") overrides the
earlier dark-only visual direction (DD-01, DD-02, DD-04, DD-05 in the specification). If a rule here conflicts
with `docs/spec.md`, this file wins; update the DD entries when convenient (DD-12).
Save the original board at `docs/design/brand/pulse-flow-board.png` (not in the repo yet; owner to add).
Values marked *derived* were estimated by eye from the board, not given on it.

## Essence
Continuous flow of code, ideas and people. Tone: precise, calm, technical but human.
Keywords (each with a thin line icon on the board): **Innovative** (always learning, always building),
**Connected** (bridging ideas, people and tech), **Fluid** (continuous growth and motion),
**Creative** (engineering with imagination), **Purposeful** (turning ideas into real impact).
Taglines on the board (CODE FLOWS · IDEAS CONNECT · POSSIBILITIES GROW) are intentionally NOT shown on the site (owner request).
Verbs on the board (BUILD · CONNECT · CREATE · FLOW) are intentionally NOT shown on the site (owner request).
Hero headline pattern: short phrase with ONE word highlighted in blue ("Ideas that **Flow** into Reality").

## Color
| Token | Hex | Meaning / use |
| --- | --- | --- |
| Electric Blue | `#2563FF` | Innovation, energy. Primary actions, active states, links, key highlights, focus. |
| Royal Blue | `#1E40AF` | Trust, focus. Hover/pressed of Electric, deep gradient stops, large dark accents. |
| Soft Blue | `#93C5FD` | Creativity, balance. Tints, highlights, accent text ON DARK, light gradient stops. |
| Charcoal | `#111827` | Stability, clarity. Text on light, dark UI surfaces, monochrome logo. |
| Navy (derived) | `#07112E` → `#030816` | Dark hero/hero-like bands: deep navy gradient with blue glow. |
| Page (derived) | `#050A1A` | Dark theme page background: near-black navy. Surfaces `#0D1A3D`, highlights `#1B2F6B`. |

Rules
- Blue only: no green, lime, purple or orange. Gradients go Royal → Electric → Soft Blue (a cyan-leaning highlight
  like `#4CC9FF` is allowed ONLY inside the logo/glow).
- Default theme is DARK (owner request, reverting the brief light theme): near-black navy page `#050A1A`, text `#F3F6FF`,
  accent text Soft Blue `#93C5FD`, Electric Blue `#2563FF` for fills (buttons, active nav pill). The hero has NO background of its own:
  the page-wide animated background shows through. `.surface-dark` is now equivalent to the page and kept for compatibility.
- Electric Blue text on navy is below 4.5:1 for small text: use Soft Blue there; Electric is for fills and large type.
- Muted text: `#B4C0DC`. Dividers and rules: Electric Blue at ~55% opacity (always blue, never gray or white).
- The page background must contain only blues and near-black navy: no pinks, cyans, grays or white blobs.
- Never put the tagline text in low contrast just for effect; WCAG 2.2 AA still applies.

## Typography
**Plus Jakarta Sans** only (Google Fonts, self-hosted via next/font). Weights: Bold 700, **Semibold 600 (primary)**,
Medium 500, Regular 400, Light 300.
- Headlines: Bold/Semibold, tight tracking (-0.03em), large. Name and H1: Bold.
- Body: Regular 400 (Medium 500 for emphasis). Navigation/actions: Medium/Semibold.
- Labels/eyebrows: Semibold or Medium, UPPERCASE, very wide tracking (0.2–0.3em), small (11–13px), often Electric Blue
  (Soft Blue on dark), with a short Electric underline bar (≈24–32px × 2px) beneath. Light weight for subtitles
  like "Full Stack Developer" (spaced uppercase).
- No monospace anywhere.

## Logo
Official vector files (provided by the owner) live in `public/logo/`:
- `logo-bos-pulse-flow.svg`: full color (blue gradient `#1648EE` → `#286DFF` → `#36C4F9` with cyan glow). Default for
  light and soft-blue backgrounds, header, hero, favicon (on a Charcoal rounded square) and the social image.
- `logo-bos-pulse-flow-blanco.svg`: white, for dark/navy or photographic backgrounds.
- `logo-bos-pulse-flow-monocromatico.svg`: Charcoal `#111827`, for single-color or print uses.
Always use these files (via `components/Logo.tsx`); do not redraw or recolor the mark. Keep clear space of at least
one stroke width. The mark itself is decorative (`alt=""`); the accessible name comes from the surrounding link.
The header shows the mark ONLY (no name or subtitle; owner request). The link keeps its accessible name via aria-label.

## Graphic system
- Flowing wave lines: smooth, crossing sine-like curves in Royal/Electric Blue, thin (1–2px), with small round node dots
  at intersections; faint `</>` glyphs. Implemented as page background (Iridescence shader in local "monotone" mode: Electric Blue to near-black navy `#050A1A`,
  softly blurred, with a ~45% dark veil) (the hero has no extra wave graphic: removed on owner request).
- Dark glow: deep navy with soft blue light streaks sweeping diagonally (now the whole page).
- Readability first: the animated background carries a dark veil (~45%), the navigation frame is near-opaque navy,
  and nav labels use near-white ink (>= 4.5:1). Never place small text directly on saturated parts of the pattern.
- Header CTA is professional and short: "Get in touch" / "Contáctame" (goes to Contact). The text navigation only
  appears from 1440px (Spanish labels are wider); below that the floating icon bar is used.
- Decoration is always `aria-hidden`, never overlaps text in a way that hurts contrast, and respects reduced motion.

## UI patterns (from the board's applications)
- Header: logo mark only (no name) left, navigation center, **filled Electric pill CTA with arrow** right
  ("Let's Build →" / "Construyamos →") that goes to Contact.
- Buttons: fully rounded (pill). Primary = Electric fill, white text, arrow. Secondary = outlined pill (Soft Blue/Charcoal
  border). Minimum 44px height. Hover: Royal Blue fill / light tint fill.
- Hero: transparent over the blue flow background, eyebrow label, huge Charcoal headline, short paragraph, two pill buttons,
  logo mark glowing large on the right (no tagline, no stacked verbs).
- Sections: eyebrow label + short blue rule, then H2, thin dividers, generous whitespace, borderless
  rows. Cards are not required.
- Icons: thin-stroke line icons (Hugeicons), Electric Blue or Charcoal.
- Social card (OG): dark navy, mark, name, subtitle, blue gradient rule.

## Implementation map
- Tokens: `app/globals.css` (`--brand-*`, semantic `--color-*`; `.surface-dark` swaps tokens for dark bands).
- Font: `app/[locale]/layout.tsx` (Plus Jakarta Sans, `--font-heading` and `--font-body` both point to it).
- Components: `Logo`, `SectionHeading`, `SiteHeader`, `ProfileSection`, `CvDownload`, vendored motion components
  configured with the palette above (JS color props: keep hex in sync with tokens).
- Any new UI must be checked against this file before it is merged.
