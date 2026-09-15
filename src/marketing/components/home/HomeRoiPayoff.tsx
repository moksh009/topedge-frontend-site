import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2 } from 'lucide-react';
import '../../styles/roi.css';

const BEFORE_BARS = [28, 34, 30, 36, 32, 29];
const AFTER_BARS = [42, 55, 48, 68, 74, 82];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

/** How much of the recovery (right) side is revealed — 0 = all loss, 100 = all recovery */
const AUTO_FROM = 0;
const AUTO_TO = 56;
const AUTO_MS = 3800;
const MIN_REVEAL = 0;
const MAX_REVEAL = 100;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

/**
 * Loss (left) → recovery (right). Recovery pane stays behind the clip until
 * the handle moves / auto-opens slowly when in view.
 */
export default function HomeRoiPayoff() {
  const labelId = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const userTookOver = useRef(false);
  const rafRef = useRef(0);
  const [reveal, setReveal] = useState(AUTO_FROM);

  const clampReveal = (v: number) => Math.min(MAX_REVEAL, Math.max(MIN_REVEAL, v));

  const setFromClientX = useCallback((clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    /* Divider from left → recovery shown on the right */
    const fromLeft = ((clientX - rect.left) / rect.width) * 100;
    setReveal(clampReveal(100 - fromLeft));
  }, []);

  const stopAuto = useCallback(() => {
    userTookOver.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setReveal(AUTO_TO);
      return undefined;
    }

    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started || userTookOver.current) return;
        started = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          if (userTookOver.current) return;
          const t = Math.min(1, (now - t0) / AUTO_MS);
          setReveal(AUTO_FROM + (AUTO_TO - AUTO_FROM) * easeOutCubic(t));
          if (t < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [setFromClientX]);

  const beginDrag = (clientX: number) => {
    stopAuto();
    dragging.current = true;
    setFromClientX(clientX);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    stopAuto();
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setReveal((p) => clampReveal(p + 3));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setReveal((p) => clampReveal(p - 3));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setReveal(MAX_REVEAL);
    } else if (e.key === 'End') {
      e.preventDefault();
      setReveal(MIN_REVEAL);
    }
  };

  const revealPct = Math.round(reveal);
  const dividerLeft = 100 - reveal;
  /* Recovery pane only visible to the right of the divider */
  const afterClip = `inset(0 0 0 ${dividerLeft}%)`;

  return (
    <section className="home-roi" aria-label="Recovery ROI">
      <div className="home-roi__inner home-roi__inner--bento">
        <header className="home-roi__intro">
          <p className="home-roi__eyebrow">Recovery math</p>
          <h2 className="home-roi__title">
            See how much{' '}
            <span className="roi-brand">
              TopEdge <span>AI</span>
            </span>{' '}
            recovers for you
          </h2>
          <p className="home-roi__sub">
            Watch the slide from carts left behind to recovered revenue — then run your own numbers
            in four questions.
          </p>
        </header>

        <div className="home-roi__bento">
          <div
            ref={stageRef}
            className="home-roi__stage"
            onPointerDown={(e) => {
              (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
              beginDrag(e.clientX);
            }}
          >
            {/* Loss — left */}
            <div className="home-roi__pane home-roi__pane--before" aria-hidden={reveal > 96}>
              <span className="home-roi__badge home-roi__badge--before">
                <Code2 className="h-3.5 w-3.5" strokeWidth={2} />
                Without TopEdge
              </span>
              <div className="home-roi__pane-body home-roi__pane-body--before">
                <p className="home-roi__metric-label">Abandoned carts / mo</p>
                <p className="home-roi__metric-value home-roi__metric-value--muted">₹1,20,000</p>
                <p className="home-roi__metric-note">Leaving the table · email-only follow-up</p>
                <div className="home-roi__mini-chart home-roi__mini-chart--wire">
                  <div className="home-roi__mini-head">
                    <span>Recovery chart</span>
                    <span>placeholder</span>
                  </div>
                  <div className="home-roi__mini-bars">
                    {BEFORE_BARS.map((h, i) => (
                      <span key={MONTHS[i]} style={{ height: `${h}%` }} className="is-wire" />
                    ))}
                  </div>
                  <div className="home-roi__mini-axis">
                    {MONTHS.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recovery — behind clip, reveals from the right */}
            <div
              className="home-roi__pane home-roi__pane--after"
              style={{ clipPath: afterClip }}
              aria-hidden={reveal < 4}
            >
              <span className="home-roi__badge home-roi__badge--after">
                <img
                  src="/brand-mark.png"
                  alt=""
                  width={16}
                  height={16}
                  className="home-roi__badge-logo"
                  decoding="async"
                />
                with TopEdge AI
              </span>
              <div className="home-roi__pane-body home-roi__pane-body--after">
                <div className="home-roi__metric-row">
                  <div>
                    <p className="home-roi__metric-label">Recovered / mo</p>
                    <p className="home-roi__metric-value">₹48,000</p>
                  </div>
                  <span className="home-roi__lift">+40%</span>
                </div>
                <p className="home-roi__metric-note">WhatsApp cart recovery · illustrative sample</p>
                <div className="home-roi__mini-chart">
                  <div className="home-roi__mini-head">
                    <span>Recovery growth</span>
                    <span>6 months</span>
                  </div>
                  <div className="home-roi__mini-bars">
                    {AFTER_BARS.map((h, i) => (
                      <span
                        key={MONTHS[i]}
                        style={{ height: `${h}%` }}
                        className={i === AFTER_BARS.length - 1 ? 'is-hot' : undefined}
                      />
                    ))}
                  </div>
                  <div className="home-roi__mini-axis">
                    {MONTHS.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="home-roi__divider" style={{ left: `${dividerLeft}%` }} aria-hidden>
              <button
                type="button"
                className="home-roi__handle"
                aria-labelledby={labelId}
                aria-valuemin={MIN_REVEAL}
                aria-valuemax={MAX_REVEAL}
                aria-valuenow={revealPct}
                aria-valuetext={`${revealPct}% with TopEdge AI revealed`}
                role="slider"
                tabIndex={0}
                onKeyDown={onKeyDown}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  beginDrag(e.clientX);
                }}
              >
                <span className="home-roi__handle-icon" aria-hidden>
                  ‹ ›
                </span>
              </button>
            </div>
          </div>

          <div className="home-roi__foot">
            <div className="home-roi__foot-copy">
              <h3 className="home-roi__foot-title" id={labelId}>
                From abandoned to recovered
              </h3>
              <p className="home-roi__foot-sub">
                Drag or use the arrow keys to compare. Same store math — clearer once WhatsApp
                recovery is on.
              </p>
            </div>
            <div className="home-roi__foot-actions">
              <p className="home-roi__pct" aria-live="polite">
                <strong>{revealPct}%</strong>
                <span>with TopEdge AI</span>
              </p>
              <Link to="/roi" className="home-roi__cta">
                Calculate my ROI
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
