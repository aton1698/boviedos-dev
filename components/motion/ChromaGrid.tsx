'use client';

import { useEffect, useLayoutEffect, useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import './ChromaGrid.css';

export interface ChromaItem {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  tag?: string;
  /** Internal route; the whole card becomes a link. */
  href: string;
  /** Accent color for the glow; JS-side value, keep in sync with the brand tokens in globals.css. */
  accent: string;
}

export interface ChromaGridProps {
  items: ChromaItem[];
  reveal?: 'spotlight' | 'card';
  columns?: number;
  minCardWidth?: number;
  gap?: number;
  radius?: number;
  softness?: number;
  damping?: number;
  fadeOut?: number;
  grayscale?: number;
  dim?: number;
  glow?: number;
  borderGlow?: number;
  aspectRatio?: string;
  cardRadius?: number;
  className?: string;
}

// Pulse Flow navy theme (docs/brand.md); values mirror --color-surface / --color-text / --color-accent.
const THEME: Record<string, string> = {
  '--chroma-tile': 'linear-gradient(180deg, #0d1b45 0%, #0a1535 100%)',
  '--chroma-tile-edge': 'rgba(147, 197, 253, 0.22)',
  '--chroma-tile-highlight': 'rgba(255, 255, 255, 0.1)',
  '--chroma-tile-shadow': '0 4px 14px -4px rgba(0, 0, 0, 0.7)',
  '--chroma-media-edge': 'rgba(147, 197, 253, 0.18)',
  '--chroma-well': 'rgba(255, 255, 255, 0.06)',
  '--chroma-ink': '#f3f6ff',
  '--chroma-muted': '#b4c0dc',
  '--chroma-hover': 'brightness(1.12)',
  '--chroma-press': 'brightness(0.85)'
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const falloffStops = (softness: number) => {
  const core = clamp(1 - softness, 0, 0.95);
  const stops: string[] = [];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    const u = clamp((t - core) / Math.max(0.0001, 1 - core), 0, 1);
    const alpha = 1 - u * u * u * (u * (u * 6 - 15) + 10);
    stops.push(`rgba(0, 0, 0, ${alpha.toFixed(3)}) ${(t * 100).toFixed(1)}%`);
  }
  return stops.join(', ');
};

export function ChromaGrid({
  items,
  columns = 3,
  minCardWidth = 180,
  gap = 12,
  radius = 260,
  softness = 0.6,
  damping = 0.45,
  fadeOut = 0.6,
  grayscale = 1,
  dim = 0.12,
  glow = 0.5,
  borderGlow = 1,
  reveal = 'spotlight',
  aspectRatio = '3 / 2',
  cardRadius = 22,
  className = ''
}: ChromaGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef({ damping, fadeOut, spotlight: reveal !== 'card' });
  const placeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    settingsRef.current = { damping, fadeOut, spotlight: reveal !== 'card' };
  }, [damping, fadeOut, reveal]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const state = { x: 0, y: 0, tx: 0, ty: 0, power: 0, target: 0, primed: false };
    let raf = 0;
    let last = 0;

    const place = () => {
      const box = root.getBoundingClientRect();
      root.querySelectorAll<HTMLElement>('[data-chroma-area]').forEach(node => {
        const rect = node.getBoundingClientRect();
        node.style.setProperty('--chroma-ox', `${rect.left - box.left}px`);
        node.style.setProperty('--chroma-oy', `${rect.top - box.top}px`);
      });
    };
    placeRef.current = place;

    const frame = (now: number) => {
      raf = 0;
      const s = settingsRef.current;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const follow = reduce ? 1 : 1 - Math.exp(-dt / Math.max(0.01, s.damping * 0.32));
      state.x += (state.tx - state.x) * follow;
      state.y += (state.ty - state.y) * follow;
      const span = state.target > state.power ? 0.1 : Math.max(0.02, s.fadeOut * 0.35);
      state.power += (state.target - state.power) * (reduce ? 1 : 1 - Math.exp(-dt / span));
      root.style.setProperty('--chroma-x', `${state.x.toFixed(2)}px`);
      root.style.setProperty('--chroma-y', `${state.y.toFixed(2)}px`);
      root.style.setProperty('--chroma-power', state.power.toFixed(4));
      const settled =
        Math.abs(state.tx - state.x) < 0.1 &&
        Math.abs(state.ty - state.y) < 0.1 &&
        Math.abs(state.target - state.power) < 0.002;
      if (settled) {
        state.power = state.target;
        root.style.setProperty('--chroma-power', state.power.toFixed(4));
        last = 0;
      } else {
        raf = requestAnimationFrame(frame);
      }
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (event: PointerEvent) => {
      if (!settingsRef.current.spotlight) return;
      const box = root.getBoundingClientRect();
      state.tx = event.clientX - box.left;
      state.ty = event.clientY - box.top;
      if (!state.primed || state.power < 0.02) {
        state.x = state.tx;
        state.y = state.ty;
        state.primed = true;
      }
      state.target = 1;
      wake();
    };

    const onLeave = () => {
      state.target = 0;
      wake();
    };

    const resizeObserver = new ResizeObserver(place);
    resizeObserver.observe(root);
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerdown', onMove);
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('pointercancel', onLeave);
    place();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerdown', onMove);
      root.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('pointercancel', onLeave);
      placeRef.current = null;
    };
  }, []);

  // Scroll reveal: cards that start below the fold fade and rise in as they enter the viewport. Content is
  // visible by default; this only runs after hydration and is skipped for reduced motion.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.chroma-card'));
    const hidden = cards.filter(card => card.getBoundingClientRect().top > window.innerHeight * 0.9);
    if (!hidden.length) return undefined;

    const perRow = Math.max(1, Math.round(columns));
    const done = (event: TransitionEvent) => {
      if (event.propertyName !== 'transform') return;
      const card = event.currentTarget as HTMLElement;
      card.classList.remove('chroma-reveal', 'is-revealed');
      card.style.removeProperty('transition-delay');
      card.removeEventListener('transitionend', done);
      placeRef.current?.();
    };
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const card = entry.target as HTMLElement;
          observer.unobserve(card);
          card.classList.add('is-revealed');
        }
      },
      { threshold: 0.2 }
    );
    hidden.forEach(card => {
      card.classList.add('chroma-reveal');
      card.style.transitionDelay = `${(cards.indexOf(card) % perRow) * 120}ms`;
      card.addEventListener('transitionend', done);
      observer.observe(card);
    });
    return () => {
      observer.disconnect();
      hidden.forEach(card => {
        card.classList.remove('chroma-reveal', 'is-revealed');
        card.style.removeProperty('transition-delay');
        card.removeEventListener('transitionend', done);
      });
    };
  }, [columns]);

  // Card offsets feed the spotlight mask: recompute after every render (layout can change with the items).
  useLayoutEffect(() => {
    placeRef.current?.();
  });

  const rootStyle = {
    ...THEME,
    '--chroma-cols': Math.max(1, Math.round(columns)),
    '--chroma-min': `${Math.max(80, minCardWidth)}px`,
    '--chroma-gap': `${Math.max(0, gap)}px`,
    '--chroma-r': `${Math.max(20, radius)}px`,
    '--chroma-stops': falloffStops(clamp(softness, 0, 1)),
    '--chroma-gray': clamp(grayscale, 0, 1),
    '--chroma-dim': clamp(dim, 0, 0.9),
    '--chroma-glow': clamp(glow, 0, 1),
    '--chroma-border': clamp(borderGlow, 0, 1),
    '--chroma-fade': `${Math.max(0, fadeOut)}s`,
    '--chroma-ratio': aspectRatio,
    '--chroma-radius': `${Math.max(0, cardRadius)}px`
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`chroma-grid${className ? ` ${className}` : ''}`}
      data-reveal={reveal === 'card' ? 'card' : 'spotlight'}
      style={rootStyle}
    >
      <div className="chroma-grid-inner">
        {items.map(item => (
          <Link
            key={item.id}
            className="chroma-card"
            data-chroma-area=""
            style={{ '--chroma-accent': item.accent } as CSSProperties}
            href={item.href}
          >
            <span className="chroma-wash" aria-hidden="true" />
            <div className="chroma-media" data-chroma-area="">
              {/* Decorative cover: the title below carries the meaning. */}
              <Image className="chroma-mono" src={item.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" unoptimized />
              <Image className="chroma-color" src={item.image} alt="" aria-hidden="true" fill sizes="(min-width: 768px) 50vw, 100vw" unoptimized />
              <span className="chroma-media-rim" aria-hidden="true" />
            </div>
            <div className="chroma-info">
              {item.tag && <span className="chroma-tag">{item.tag}</span>}
              <span className="chroma-title">{item.title}</span>
              {item.subtitle && <span className="chroma-subtitle">{item.subtitle}</span>}
            </div>
            <span className="chroma-card-rim" aria-hidden="true" />
            <span className="chroma-card-glow" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ChromaGrid;
