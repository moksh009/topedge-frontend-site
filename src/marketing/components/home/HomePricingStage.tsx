import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { plansForLine } from '../../data/planCatalog';
import { PrimaryButton } from '../ui';

const DIY = plansForLine('diy');

function priceToNumber(label: string) {
  return Number(label.replace(/[^\d]/g, '')) || 0;
}

/**
 * Odometer roll-up on plan change. Digit columns are keyed from the right
 * so they stay mounted and CSS-transition into the new value.
 */
function RollingPrice({ label }: { label: string }) {
  const target = useMemo(() => priceToNumber(label), [label]);
  const digits = String(target).split('');

  return (
    <strong className="home-price__amount-value" aria-label={label}>
      <span className="home-price__currency" aria-hidden>
        ₹
      </span>
      <span className="home-price__roll" aria-hidden>
        {digits.map((d, i) => {
          const fromRight = digits.length - 1 - i;
          const digit = Number(d);
          const showComma = digits.length > 3 && i === digits.length - 3;
          return (
            <span key={`wrap-${fromRight}`} className="home-price__roll-unit">
              {showComma ? (
                <span className="home-price__roll-sep">,</span>
              ) : null}
              <span className="home-price__roll-slot">
                <span
                  className="home-price__roll-strip"
                  style={{ transform: `translate3d(0, ${-digit * 10}%, 0)` }}
                >
                  {Array.from({ length: 10 }, (_, n) => (
                    <span key={n}>{n}</span>
                  ))}
                </span>
              </span>
            </span>
          );
        })}
      </span>
    </strong>
  );
}

/**
 * Sticky scroll pricing: one plan fills the stage at a time.
 * Scroll scrub Lite → Pro → Scale. Not a three-card grid.
 */
export default function HomePricingStage() {
  const trackRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(p);

      if (reduced) {
        setActive(1);
        return;
      }

      const idx = Math.min(DIY.length - 1, Math.floor(p * DIY.length * 0.999));
      setActive(idx);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const plan = DIY[active] ?? DIY[1];
  const slot = progress * DIY.length;
  const fade = 1 - Math.abs(slot - active - 0.5) * 0.35;

  return (
    <section
      ref={trackRef}
      id="home-pricing"
      className="home-price"
      aria-label="DIY pricing"
    >
      <div className="home-price__pin">
        <header className="home-price__head">
          <p className="home-price__eyebrow">DIY plans</p>
          <h2 className="home-price__title">
            Pick the plan that matches your volume
          </h2>
        </header>

        <div className="home-price__rail" role="tablist" aria-label="Plans">
          {DIY.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`home-price__dot${i === active ? ' is-on' : ''}`}
              onClick={() => {
                const track = trackRef.current;
                if (!track) return;
                const scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
                const top =
                  window.scrollY +
                  track.getBoundingClientRect().top +
                  (scrollable * (i + 0.35)) / DIY.length;
                window.scrollTo({ top, behavior: 'smooth' });
              }}
            >
              <span>{p.name}</span>
              <em>{p.priceLabel}</em>
            </button>
          ))}
        </div>

        <div
          className={`home-price__stage home-price__stage--${plan.name.toLowerCase()}`}
          style={{ opacity: Math.max(0.72, Math.min(1, fade)) }}
        >
          <div className="home-price__bloom" aria-hidden />

          <div className="home-price__panel">
            <div className="home-price__lead">
              <div key={plan.id} className="home-price__lead-copy">
                {plan.popular ? (
                  <span className="home-price__badge">Most chosen</span>
                ) : (
                  <span className="home-price__badge is-quiet">DIY</span>
                )}
                <h3 className="home-price__name">{plan.name}</h3>
                <p className="home-price__desc">{plan.description}</p>
              </div>

              <div className="home-price__amount">
                <RollingPrice label={plan.priceLabel} />
                <span>{plan.period}</span>
              </div>

              <div className="home-price__cta-row" key={`cta-${plan.id}`}>
                <PrimaryButton to="/signup" className="home-price__cta">
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </div>
            </div>

            <ul className="home-price__features" key={`feat-${plan.id}`}>
              {plan.features.map((f, i) => (
                <li
                  key={f}
                  style={{ animationDelay: `${0.06 + i * 0.05}s` }}
                >
                  <span className="home-price__check" aria-hidden>
                    <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="home-price__progress" aria-hidden>
            <span style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="home-price__fallback">
        {DIY.map((p) => (
          <article key={p.id} className="home-price__fallback-card">
            <h3>{p.name}</h3>
            <p>
              {p.priceLabel}
              <span>{p.period}</span>
            </p>
            <p>{p.description}</p>
            <PrimaryButton to="/signup">{p.cta}</PrimaryButton>
          </article>
        ))}
      </div>
    </section>
  );
}
