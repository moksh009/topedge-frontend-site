import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2 } from 'lucide-react';

/**
 * Illustrative Shopify D2C sample (coherent math):
 * Abandoned cart value / mo …… ₹1,20,000
 * Email-only recovery ……… ~₹9,600 (8%)
 * WhatsApp recovery ………… ₹48,000 (40%)
 * WhatsApp vs email ……… 5×
 */
const ABANDONED_MO = 120_000;
const EMAIL_RATE = 0.08;
const WA_RATE = 0.4;
const EMAIL_MO = Math.round(ABANDONED_MO * EMAIL_RATE); // 9,600
const RECOVERED_MO = Math.round(ABANDONED_MO * WA_RATE); // 48,000
const VS_EMAIL = Math.round(RECOVERED_MO / EMAIL_MO); // 5

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] as const;

/** Without TopEdge, email-only recovery stays flat & weak */
const BEFORE_SERIES = [
  { month: 'Jan', value: 8_400 },
  { month: 'Feb', value: 9_200 },
  { month: 'Mar', value: 7_800 },
  { month: 'Apr', value: 9_600 },
  { month: 'May', value: 8_800 },
  { month: 'Jun', value: 9_000 },
] as const;

/** With TopEdge, WhatsApp recovery ramps to ~₹48k / mo */
const AFTER_SERIES = [
  { month: 'Jan', value: 18_000 },
  { month: 'Feb', value: 26_400 },
  { month: 'Mar', value: 33_600 },
  { month: 'Apr', value: 41_000 },
  { month: 'May', value: 46_800 },
  { month: 'Jun', value: 48_000 },
] as const;

const CHART_MAX = Math.max(
  ...BEFORE_SERIES.map((d) => d.value),
  ...AFTER_SERIES.map((d) => d.value),
);

const AUTO_FROM = 8;
const AUTO_TO = 58;
const AUTO_MS = 3800;
const MIN_REVEAL = 0;
const MAX_REVEAL = 100;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function formatInr(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

function MiniChart({
  series,
  variant,
  activeIndex,
  onActiveChange,
  interactive = true,
}: {
  series: readonly { month: string; value: number }[];
  variant: 'before' | 'after';
  activeIndex: number;
  onActiveChange: (index: number) => void;
  interactive?: boolean;
}) {
  const active = series[activeIndex] ?? series[series.length - 1];

  return (
    <div className={`home-roi__mini-chart${variant === 'before' ? ' home-roi__mini-chart--wire' : ''}`}>
      <div className="home-roi__mini-head">
        <span>{variant === 'before' ? 'Email recovery' : 'WhatsApp recovery'}</span>
        <span className="home-roi__mini-head-value">{formatInr(active.value)}</span>
      </div>
      <div
        className="home-roi__mini-bars"
        role="img"
        aria-label={`${variant === 'before' ? 'Email' : 'WhatsApp'} recovery by month`}
      >
        {series.map((point, i) => {
          const height = Math.max(10, Math.round((point.value / CHART_MAX) * 100));
          const isActive = i === activeIndex;
          const className = [
            'home-roi__bar',
            variant === 'before' ? 'is-wire' : '',
            isActive ? 'is-hot' : '',
          ]
            .filter(Boolean)
            .join(' ');
          const style = { height: `${height}%` };

          if (!interactive) {
            return <span key={point.month} className={className} style={style} />;
          }

          return (
            <button
              key={point.month}
              type="button"
              className={className}
              style={style}
              aria-label={`${point.month}: ${formatInr(point.value)}`}
              aria-pressed={isActive}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onActiveChange(i);
              }}
              onMouseEnter={() => onActiveChange(i)}
              onFocus={() => onActiveChange(i)}
            />
          );
        })}
      </div>
      <div className="home-roi__mini-axis">
        {MONTHS.map((m, i) => (
          <span key={m} className={i === activeIndex ? 'is-active' : undefined}>
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

function PaneBody({
  variant,
  activeIndex,
  onActiveChange,
  interactive = true,
}: {
  variant: 'before' | 'after';
  activeIndex: number;
  onActiveChange: (index: number) => void;
  interactive?: boolean;
}) {
  if (variant === 'before') {
    return (
      <div className="home-roi__pane-body home-roi__pane-body--before">
        <p className="home-roi__metric-label">Abandoned carts / mo</p>
        <p className="home-roi__metric-value home-roi__metric-value--muted">{formatInr(ABANDONED_MO)}</p>
        <p className="home-roi__metric-note">
          Only ~{Math.round(EMAIL_RATE * 100)}% comes back on email · {formatInr(EMAIL_MO)} recovered
        </p>
        <MiniChart
          series={BEFORE_SERIES}
          variant="before"
          activeIndex={activeIndex}
          onActiveChange={onActiveChange}
          interactive={interactive}
        />
      </div>
    );
  }

  return (
    <div className="home-roi__pane-body home-roi__pane-body--after">
      <div className="home-roi__metric-row">
        <div>
          <p className="home-roi__metric-label">Recovered / mo</p>
          <p className="home-roi__metric-value">{formatInr(RECOVERED_MO)}</p>
        </div>
        <span className="home-roi__lift">{VS_EMAIL}× email</span>
      </div>
      <p className="home-roi__metric-note">
        {Math.round(WA_RATE * 100)}% WhatsApp recovery on {formatInr(ABANDONED_MO)} abandoned
      </p>
      <MiniChart
        series={AFTER_SERIES}
        variant="after"
        activeIndex={activeIndex}
        onActiveChange={onActiveChange}
        interactive={interactive}
      />
    </div>
  );
}

/**
 * Loss (left) → recovery (right). Opposite side stays as a blurred peek
 * so the empty half never looks blank.
 */
export default function HomeRoiPayoff() {
  const labelId = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const userTookOver = useRef(false);
  const rafRef = useRef(0);
  const [reveal, setReveal] = useState(AUTO_FROM);
  const [beforeBar, setBeforeBar] = useState(3);
  const [afterBar, setAfterBar] = useState(AFTER_SERIES.length - 1);

  const clampReveal = (v: number) => Math.min(MAX_REVEAL, Math.max(MIN_REVEAL, v));

  const setFromClientX = useCallback((clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
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
  const beforeClip = `inset(0 ${reveal}% 0 0)`;
  const afterClip = `inset(0 0 0 ${dividerLeft}%)`;

  return (
    <section className="home-roi" aria-label="Recovery compare">
      <div className="home-roi__inner home-roi__inner--bento">
        <header className="home-roi__intro">
          <h2 className="home-roi__title">
            Abandoned carts become{' '}
            <span className="roi-brand">
              WhatsApp <span>revenue</span>
            </span>
          </h2>
          <p className="home-roi__sub">
            Drag to compare email-only follow-up vs WhatsApp recovery on the same abandoned value.
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
            {/* Decorative peeks only — no focusable controls inside aria-hidden */}
            <div className="home-roi__ghost home-roi__ghost--before" aria-hidden="true">
              <span className="home-roi__badge home-roi__badge--before">
                <Code2 className="h-3.5 w-3.5" strokeWidth={2} />
                Without TopEdge
              </span>
              <PaneBody
                variant="before"
                activeIndex={beforeBar}
                onActiveChange={setBeforeBar}
                interactive={false}
              />
            </div>
            <div className="home-roi__ghost home-roi__ghost--after" aria-hidden="true">
              <span className="home-roi__badge home-roi__badge--after">
                <img
                  src="/brand-mark-56.png"
                  alt=""
                  width={16}
                  height={16}
                  className="home-roi__badge-logo"
                  decoding="async"
                  loading="lazy"
                  aria-hidden
                />
                with TopEdge AI
              </span>
              <PaneBody
                variant="after"
                activeIndex={afterBar}
                onActiveChange={setAfterBar}
                interactive={false}
              />
            </div>

            {/* Sharp clipped panes */}
            <div
              className="home-roi__pane home-roi__pane--before"
              style={{ clipPath: beforeClip }}
              aria-hidden={reveal > 96}
            >
              <span className="home-roi__badge home-roi__badge--before">
                <Code2 className="h-3.5 w-3.5" strokeWidth={2} />
                Without TopEdge
              </span>
              <PaneBody
                variant="before"
                activeIndex={beforeBar}
                onActiveChange={setBeforeBar}
                interactive={reveal <= 96}
              />
            </div>

            <div
              className="home-roi__pane home-roi__pane--after"
              style={{ clipPath: afterClip }}
              aria-hidden={reveal < 4}
            >
              <span className="home-roi__badge home-roi__badge--after">
                <img
                  src="/brand-mark-56.png"
                  alt="TopEdge AI"
                  width={16}
                  height={16}
                  className="home-roi__badge-logo"
                  decoding="async"
                  loading="lazy"
                />
                with TopEdge AI
              </span>
              <PaneBody
                variant="after"
                activeIndex={afterBar}
                onActiveChange={setAfterBar}
                interactive={reveal >= 4}
              />
            </div>

            <div className="home-roi__divider" style={{ left: `${dividerLeft}%` }}>
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
                <span className="home-roi__handle-icon" aria-hidden="true">
                  ‹ ›
                </span>
              </button>
            </div>
          </div>

          <div className="home-roi__foot">
            <div className="home-roi__foot-copy">
              <h3 className="home-roi__foot-title" id={labelId}>
                Same carts. Clearer recovery.
              </h3>
              <p className="home-roi__foot-sub">
                Drag or use arrow keys. Email leaves most of {formatInr(ABANDONED_MO)} on the table , 
                WhatsApp brings {formatInr(RECOVERED_MO)} back each month.
              </p>
            </div>
            <div className="home-roi__foot-actions">
              <p className="home-roi__pct">
                <strong>{VS_EMAIL}×</strong>
                <span>vs email-only</span>
              </p>
              <Link to="/signup" className="home-roi__cta">
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
