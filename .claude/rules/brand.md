# Brand rules (always apply)

Before ANY visual or UI change, read `docs/brand.md` and follow it. In short:
- Palette: Electric Blue `#2563FF`, Royal Blue `#1E40AF`, Soft Blue `#93C5FD`, Charcoal `#111827`, plus white/navy.
  Blue only; never reintroduce lime/green/other accents.
- Font: Plus Jakarta Sans only (Bold/Semibold/Medium/Regular/Light). No Space Grotesk, Inter or monospace.
- DARK theme (near-black navy page, white text, blue accents) with the blurred blue/navy Iridescence background; header shows the logo only, no name; the hero has no background of its own; `.surface-dark` navy bands exist for future dark sections; pill buttons, spaced uppercase labels
  with a short blue rule, flowing wave graphic system, logo = `components/Logo.tsx` using the official files in `public/logo/` (never redraw it).
- Use tokens from `app/globals.css`; hex values appear only where a JS library needs them (and must match tokens).
- Accessibility (WCAG 2.2 AA) and EN/ES parity still apply to every change.
