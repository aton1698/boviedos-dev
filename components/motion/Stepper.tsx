'use client';

import {
  Children,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode
} from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, ArrowRight01Icon, Tick02Icon } from '@hugeicons/core-free-icons';

import './Stepper.css';

// Adapted from React Bits "Stepper": TypeScript, one Pulse Flow theme (the colors live in Stepper.css) and only the
// numbered horizontal layout with slide/fade/none transitions.

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const SPRING =
  'linear(0, 0.0603, 0.2033, 0.3821, 0.5633, 0.7258, 0.8584, 0.9574, 1.0242, 1.0634, 1.0809, 1.0828, 1.0747, 1.0613, 1.046, 1.0313, 1.0186, 1.0085, 1.0012, 0.9965, 0.994, 0.9931, 0.9933, 0.9941, 0.9953, 0.9966, 0.9978, 0.9988, 1)';
const SETTLE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const ease = () =>
  typeof CSS !== 'undefined' && CSS.supports?.('transition-timing-function', 'linear(0, 1)')
    ? SPRING
    : 'cubic-bezier(0.34, 1.4, 0.64, 1)';

export function Step({ children }: { title?: ReactNode; children: ReactNode }) {
  return <div className="stepper__step">{children}</div>;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export interface StepperProps {
  children: ReactNode;
  /** Controls the current step; use it with onStepChange. */
  step?: number;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  transition?: 'slide' | 'fade' | 'none';
  /** Indicators can only jump back to steps that were reached. */
  linear?: boolean;
  backButtonText?: string;
  nextButtonText?: string;
  completeButtonText?: string;
  /** Prefix of the accessible name of each indicator ("Step" -> "Step 2: Company"). */
  stepLabel?: string;
  backButtonProps?: ButtonProps;
  nextButtonProps?: ButtonProps;
  /** Shown in place of the steps once the last one is completed. */
  completedContent?: ReactNode;
  width?: number | string;
  className?: string;
}

interface View {
  step: number;
  previous: number | null;
  direction: 1 | -1;
  id: number;
}

export default function Stepper({
  children,
  step,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  transition = 'slide',
  linear = true,
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  completeButtonText = 'Complete',
  stepLabel = 'Step',
  backButtonProps = {},
  nextButtonProps = {},
  completedContent,
  width = 560,
  className = ''
}: StepperProps) {
  const steps = Children.toArray(children).filter(isValidElement<{ title?: ReactNode }>);
  const total = steps.length;
  const controlled = typeof step === 'number';
  const [internal, setInternal] = useState(initialStep);
  const current = clamp(Math.round(controlled ? step : internal), 1, total + 1);
  const completed = current > total;
  const [reached, setReached] = useState(current);
  if (current > reached) setReached(current);

  const [view, setView] = useState<View>({ step: current, previous: null, direction: 1, id: 0 });
  if (view.step !== current) {
    setView({ step: current, previous: view.step, direction: current > view.step ? 1 : -1, id: view.id + 1 });
  }

  const trackRef = useRef<HTMLDivElement>(null);
  const gliderRef = useRef<HTMLSpanElement>(null);
  const markerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const viewportRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const leavingRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef(0);
  const placedRef = useRef(false);

  const go = (target: number) => {
    const next = clamp(target, 1, total + 1);
    if (next === current) return;
    if (!controlled) setInternal(next);
    if (next > total) onFinalStepCompleted();
    else onStepChange(next);
  };

  const reachable = (number: number) => number !== current && (!linear || number <= Math.min(reached, total));

  // Keep the viewport height so a change of step can animate it.
  useIsomorphicLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    heightRef.current = viewport.offsetHeight;
    const observer = new ResizeObserver(() => {
      heightRef.current = viewport.offsetHeight;
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  // Animate the height and the content when the step changes.
  useIsomorphicLayoutEffect(() => {
    if (view.id === 0) return;
    const viewport = viewportRef.current;
    const pane = paneRef.current;
    const leaving = leavingRef.current;
    const id = view.id;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mode = transition === 'none' ? 'none' : reduced ? 'fade' : transition;
    const finish = () => setView(state => (state.id === id ? { ...state, previous: null } : state));
    if (leaving && pane && leaving.contains(document.activeElement)) pane.focus({ preventScroll: true });
    if (!viewport || typeof viewport.animate !== 'function' || mode === 'none') {
      finish();
      return;
    }
    for (const element of [viewport, pane, leaving]) element?.getAnimations().forEach(animation => animation.cancel());
    const from = heightRef.current;
    const to = viewport.offsetHeight;
    const spring = ease();
    if (Math.abs(from - to) > 0.5) {
      viewport.animate([{ height: `${from}px` }, { height: `${to}px` }], {
        duration: reduced ? 200 : 560,
        easing: reduced ? SETTLE : spring
      });
    }
    const shift = mode === 'slide' ? 36 : 0;
    if (pane) {
      if (shift) {
        pane.animate([{ transform: `translateX(${view.direction * shift}px)` }, { transform: 'none' }], {
          duration: 560,
          easing: spring
        });
      }
      pane.animate([{ opacity: 0 }, { opacity: 0, offset: 0.25 }, { opacity: 1 }], {
        duration: 420,
        easing: 'ease-out'
      });
    }
    if (leaving) {
      leaving.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 140,
        easing: 'cubic-bezier(0.2, 0, 0.4, 1)',
        fill: 'forwards'
      });
      const exit = leaving.animate(
        [{ transform: 'none' }, { transform: `translateX(${-view.direction * shift}px)` }],
        { duration: 200, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'forwards' }
      );
      exit.onfinish = finish;
    } else finish();
  }, [view.id]);

  // The glider sits under the current indicator and glides to the next one.
  useIsomorphicLayoutEffect(() => {
    const track = trackRef.current;
    const glider = gliderRef.current;
    if (!track || !glider) return undefined;
    const place = (animate: boolean) => {
      const segment = markerRefs.current[Math.min(current, total) - 1];
      if (!segment) return;
      const spring = ease();
      glider.style.transition = animate
        ? `transform 560ms ${spring}, width 560ms ${spring}, height 560ms ${spring}, opacity 200ms ease`
        : 'opacity 200ms ease';
      glider.style.transform = `translate3d(${segment.offsetLeft}px, ${segment.offsetTop}px, 0)`;
      glider.style.width = `${segment.offsetWidth}px`;
      glider.style.height = `${segment.offsetHeight}px`;
      glider.style.opacity = completed ? '0' : '1';
    };
    place(placedRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    placedRef.current = true;
    const observer = new ResizeObserver(() => place(false));
    observer.observe(track);
    return () => observer.disconnect();
  }, [current, total, completed]);

  const paneContent = (number: number) => (number > total ? (completedContent ?? null) : steps[number - 1]);

  const isLast = current === total;
  const { className: backClass = '', onClick: onBackClick, ...backRest } = backButtonProps;
  const { className: nextClass = '', onClick: onNextClick, ...nextRest } = nextButtonProps;

  return (
    <div className={`stepper ${className}`.trim()} style={{ ['--stepper-width' as string]: typeof width === 'number' ? `${width}px` : width }}>
      <div ref={trackRef} className="stepper__track">
        <span ref={gliderRef} className="stepper__glider" aria-hidden="true" />
        {steps.map((entry, index) => {
          const number = index + 1;
          const status = completed || number < current ? 'complete' : number === current ? 'active' : 'upcoming';
          const title = entry.props.title;
          return (
            <button
              key={number}
              ref={element => {
                markerRefs.current[index] = element;
              }}
              type="button"
              className="stepper__segment"
              data-status={status}
              aria-label={typeof title === 'string' ? `${stepLabel} ${number}: ${title}` : `${stepLabel} ${number}`}
              aria-current={number === current ? 'step' : undefined}
              disabled={!reachable(number)}
              onClick={() => go(number)}
            >
              <span className="stepper__badge" data-status={status}>
                {status === 'complete' ? <HugeiconsIcon icon={Tick02Icon} size={16} strokeWidth={2.4} /> : number}
              </span>
              {title && <span className="stepper__title">{title}</span>}
            </button>
          );
        })}
      </div>
      <div className="stepper__body">
        <div ref={viewportRef} className="stepper__viewport" aria-live="polite">
          {view.previous !== null && (
            <div key={view.id - 1} ref={leavingRef} className="stepper__pane stepper__pane--leaving" aria-hidden="true">
              {paneContent(view.previous)}
            </div>
          )}
          <div key={view.id} ref={paneRef} className="stepper__pane" tabIndex={-1}>
            {paneContent(view.step)}
          </div>
        </div>
        <div
          className="stepper__footer-wrap"
          data-hidden={completed ? '' : undefined}
          aria-hidden={completed ? true : undefined}
        >
          <div className="stepper__footer-clip">
            <div className="stepper__footer">
              <button
                type="button"
                {...backRest}
                className={`stepper__button stepper__button--back ${backClass}`.trim()}
                data-hidden={current <= 1 ? '' : undefined}
                tabIndex={completed || current <= 1 ? -1 : backRest.tabIndex}
                onClick={event => {
                  onBackClick?.(event);
                  if (!event.defaultPrevented) go(current - 1);
                }}
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={2} />
                <span>{backButtonText}</span>
              </button>
              <button
                type="button"
                {...nextRest}
                className={`stepper__button stepper__button--next ${nextClass}`.trim()}
                tabIndex={completed ? -1 : nextRest.tabIndex}
                onClick={event => {
                  onNextClick?.(event);
                  if (!event.defaultPrevented) go(current + 1);
                }}
              >
                <span>{isLast ? completeButtonText : nextButtonText}</span>
                <HugeiconsIcon icon={isLast ? Tick02Icon : ArrowRight01Icon} size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
