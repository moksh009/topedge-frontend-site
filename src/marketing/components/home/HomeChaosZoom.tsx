import { useEffect, useRef } from 'react';
import HomeRoiPayoff from './HomeRoiPayoff';

/**
 * Chaos words fly past → TopEdge AI rushes toward the camera (big scale)
 * → white wash covers the peak → ROI is already fading in.
 * Mark is hard-hidden under full wash so reverse scroll never shows letter slabs.
 * Every style is derived from absolute scroll progress each frame.
 */
const CHAOS_WORDS = [
  'Lost carts',
  'COD chaos',
  'Missed DMs',
  'Staff thin',
  'Late replies',
  'Split inbox',
  'RTO rising',
  'Manual chase',
  'WhatsApp flood',
  'Cart stress',
  'Agent overload',
  'Stale carts',
  'Silent buyers',
  'Missed sale',
  'Trigger miss',
  'DM backlog',
] as const;

const RANGES: [number, number][] = [
  [0.0, 0.2],
  [0.03, 0.22],
  [0.06, 0.24],
  [0.02, 0.2],
  [0.08, 0.26],
  [0.05, 0.23],
  [0.1, 0.28],
  [0.07, 0.25],
  [0.12, 0.3],
  [0.09, 0.27],
  [0.14, 0.32],
  [0.11, 0.29],
  [0.16, 0.34],
  [0.04, 0.22],
  [0.18, 0.35],
  [0.13, 0.31],
];

/** Words clear before the brand rush. */
const WORDS_END = 0.34;
/** Mark settles, then explodes into the lens. */
const MARK_IN = 0.04;
const MARK_SETTLE = 0.32;
const MARK_HIDE = 0.5;
/** Wash covers the zoom peak — no empty white beat before ROI. */
const WASH_START = 0.36;
const WASH_END = 0.5;
const ROI_START = 0.44;
const ROI_END = 0.56;
/** Peak scale while still under wash (then hard-hidden). */
const ZOOM_MAX = 18;
const WORD_Z_MAX = 560;

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n));
}

function easeInOut(u: number) {
  return u * u * (3 - 2 * u);
}

function easeIn(u: number) {
  return u * u;
}

function sampleWord(progress: number, start: number, end: number) {
  const span = Math.max(0.001, end - start);
  const t = (progress - start) / span;
  if (t <= 0) return { opacity: 0, z: -WORD_Z_MAX };
  if (t >= 1) return { opacity: 0, z: WORD_Z_MAX };
  if (t < 0.45) {
    const u = t / 0.45;
    return { opacity: u, z: -WORD_Z_MAX + u * WORD_Z_MAX };
  }
  const u = (t - 0.45) / 0.55;
  // Rush past camera; die before extreme scale frames stick around
  return { opacity: Math.max(0, 1 - u * 1.25), z: u * WORD_Z_MAX };
}

/**
 * Approach to readable size, then hard zoom into the lens.
 * Returns null once wash owns the frame (safe for reverse scroll).
 */
function sampleCenter(progress: number, washT: number) {
  // Hide before giant glyphs can sit on screen without wash
  if (progress >= MARK_HIDE || washT >= 0.88) {
    return null;
  }

  if (progress <= MARK_IN) {
    return { opacity: 0, scale: 0.35 };
  }

  // Phase A — rise into place
  if (progress < MARK_SETTLE) {
    const u = easeInOut(
      clamp((progress - MARK_IN) / (MARK_SETTLE - MARK_IN)),
    );
    return {
      opacity: Math.min(1, u * 1.15),
      scale: 0.35 + u * 0.65, // → 1.0
    };
  }

  // Phase B — explode toward camera (wash rises over it)
  const u = clamp((progress - MARK_SETTLE) / (MARK_HIDE - MARK_SETTLE));
  const zoom = easeIn(u);
  return {
    // Stay solid; white wash does the cover, not opacity alone
    opacity: 1,
    scale: 1 + zoom * (ZOOM_MAX - 1),
  };
}

function applyHidden(el: HTMLElement) {
  el.style.opacity = '0';
  el.style.visibility = 'hidden';
  el.style.transform = 'none';
  el.style.pointerEvents = 'none';
}

export default function HomeChaosZoom() {
  const trackRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const centerRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const payoffRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const lastLiveRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const update = () => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / scrollable);

      const washT = easeInOut(
        clamp((progress - WASH_START) / Math.max(0.001, WASH_END - WASH_START)),
      );

      // —— Chaos words ——
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        if (progress >= WORDS_END) {
          applyHidden(el);
          return;
        }
        const [start, end] = RANGES[i] ?? [0.05, 0.25];
        const s = sampleWord(progress, start, Math.min(end, WORDS_END));
        if (s.opacity < 0.02) {
          applyHidden(el);
          return;
        }
        el.style.visibility = 'visible';
        el.style.opacity = String(s.opacity);
        el.style.transform = `translateZ(${s.z.toFixed(0)}px)`;
        el.style.pointerEvents = 'none';
      });

      // —— Center mark (big scale zoom; hard-hidden under wash) ——
      const center = centerRef.current;
      if (center) {
        const s = sampleCenter(progress, washT);
        if (!s || s.opacity < 0.02) {
          applyHidden(center);
        } else {
          center.style.visibility = 'visible';
          center.style.opacity = String(s.opacity);
          center.style.transform = `scale(${s.scale.toFixed(3)})`;
          center.style.pointerEvents = 'none';
        }
      }

      // —— White wash ——
      const wash = washRef.current;
      if (wash) {
        wash.style.opacity = String(washT);
        wash.style.visibility = washT > 0.01 ? 'visible' : 'hidden';
      }

      // —— Field stays fully opaque while mark is alive (wash covers it) ——
      const field = fieldRef.current;
      if (field) {
        const showField = progress < MARK_HIDE && washT < 0.98;
        if (!showField) {
          applyHidden(field);
        } else {
          field.style.visibility = 'visible';
          field.style.opacity = '1';
          field.style.transform = 'none';
          field.style.pointerEvents = 'none';
        }
      }

      // —— ROI (starts as wash completes — no blank white hold) ——
      const roiT = easeInOut(
        clamp((progress - ROI_START) / Math.max(0.001, ROI_END - ROI_START)),
      );
      const payoff = payoffRef.current;
      if (payoff) {
        payoff.style.opacity = String(roiT);
        payoff.style.visibility = roiT > 0.02 ? 'visible' : 'hidden';
        payoff.style.transform = `translate3d(0, ${((1 - roiT) * 12).toFixed(1)}px, 0)`;
        payoff.style.pointerEvents = 'none';
        const live = roiT > 0.35;
        if (live !== lastLiveRef.current) {
          lastLiveRef.current = live;
          payoff.classList.toggle('is-live', live);
        }
      }
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

  return (
    <section
      ref={trackRef}
      className="home-bridge"
      aria-label="From store chaos to recovery math"
    >
      <div className="home-bridge__pin">
        <div ref={fieldRef} className="home-bridge__field" aria-hidden>
          <div className="home-chaos__grid">
            {CHAOS_WORDS.map((word, i) => (
              <span
                key={`${word}-${i}`}
                ref={(node) => {
                  itemsRef.current[i] = node;
                }}
                className={`home-chaos__item is-tone-${(i % 3) + 1}`}
              >
                {word}
              </span>
            ))}

            <div ref={centerRef} className="home-chaos__item is-special">
              <b>
                TopEdge <em>AI</em>
              </b>
            </div>
          </div>
        </div>

        <div ref={washRef} className="home-bridge__wash" aria-hidden />

        <div ref={payoffRef} className="home-bridge__payoff">
          <HomeRoiPayoff embedded />
        </div>
      </div>
    </section>
  );
}
