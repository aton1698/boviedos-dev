"use client";

import { useRef, type MouseEvent, type PointerEvent, type ReactNode } from "react";

interface DragSelectProps {
  children: ReactNode;
  /** Called while dragging, each time the finger moves over another option. */
  onPreview: (index: number) => void;
  /** Called once when the finger is released after a drag; `item` is the option's `li`. */
  onCommit?: (index: number, item: HTMLElement) => void;
  className?: string;
}

const DRAG_THRESHOLD = 6;

/**
 * Lets a press-and-drag steer the selection of a GooeyNav-style bar: the selected pill follows the
 * finger across the options. Taps and clicks are untouched. Vertical swipes still scroll the page
 * (`touch-action: pan-y`), so only horizontal movement is captured.
 */
export function DragSelect({ children, onPreview, onCommit, className = "" }: DragSelectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startX: number; moved: boolean; index: number } | null>(null);
  const suppressClick = useRef(false);

  function itemAt(clientX: number) {
    const items = ref.current?.querySelectorAll<HTMLElement>("[data-gooey-index]");
    if (!items?.length) return null;
    let best = 0;
    let bestDistance = Infinity;
    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(clientX - (rect.left + rect.width / 2));
      if (distance < bestDistance) {
        best = index;
        bestDistance = distance;
      }
    });
    return { index: best, item: items[best] };
  }

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drag.current = { startX: event.clientX, moved: false, index: -1 };
  }

  function onPointerMove(event: PointerEvent) {
    const state = drag.current;
    if (!state) return;
    if (!state.moved && Math.abs(event.clientX - state.startX) < DRAG_THRESHOLD) return;
    state.moved = true;
    const hit = itemAt(event.clientX);
    if (hit && hit.index !== state.index) {
      state.index = hit.index;
      onPreview(hit.index);
    }
  }

  function onPointerEnd(event: PointerEvent) {
    const state = drag.current;
    drag.current = null;
    if (!state?.moved) return;
    // Commit first: onCommit may dispatch its own click (e.g. to follow a link), which must not be suppressed.
    if (event.type === "pointerup") {
      const hit = itemAt(event.clientX);
      if (hit) onCommit?.(hit.index, hit.item);
    }
    // The native click that ends a drag must not select an option on its own.
    suppressClick.current = true;
    setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  }

  function onClickCapture(event: MouseEvent) {
    if (!suppressClick.current) return;
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onClickCapture={onClickCapture}
      className={`touch-pan-y select-none ${className}`.trim()}
    >
      {children}
    </div>
  );
}
