import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { testimonials } from '../../data/home';

const CYCLE_MS = 5000;
const SIDE_MS = 520;
const SWAP_MS = 580;

/**
 * Back cards share the same spot — tilt only, no offset “depth” stack.
 */
const POSES = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: 0, y: 0, rotate: 5.5, scale: 1, opacity: 1 },
  { x: 0, y: 0, rotate: -6, scale: 1, opacity: 1 },
] as const;

const SIDE_POSE = {
  x: 132,
  y: 4,
  rotate: 8,
  scale: 0.98,
  opacity: 1,
};

type Phase = 'idle' | 'side' | 'swap';
type Testimonial = (typeof testimonials)[number];
type Pose = { x: number; y: number; rotate: number; scale: number; opacity: number };

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_INOUT = [0.4, 0, 0.2, 1] as const;

function BrandMark({ item }: { item: Testimonial }) {
  return (
    <img
      className={`home-voices__brand-logo home-voices__brand-logo--${item.tone}`}
      src={item.brandLogo}
      alt={item.brandLogoAlt}
      width={120}
      height={32}
      loading="lazy"
      decoding="async"
    />
  );
}

function cardTransition(
  role: 'exiting-side' | 'exiting-swap' | 'rising' | 'rest',
  reduceMotion: boolean,
) {
  if (reduceMotion) return { duration: 0 };

  if (role === 'exiting-side') {
    return { duration: 0.5, ease: EASE_OUT };
  }
  if (role === 'exiting-swap') {
    return { duration: 0.52, ease: EASE_INOUT };
  }
  if (role === 'rising') {
    return {
      x: { type: 'spring' as const, stiffness: 300, damping: 32, mass: 0.8 },
      y: { type: 'spring' as const, stiffness: 300, damping: 32, mass: 0.8 },
      scale: { type: 'spring' as const, stiffness: 320, damping: 30, mass: 0.75 },
      rotate: { duration: 0.5, ease: EASE_OUT },
      opacity: { duration: 0.35 },
    };
  }
  return {
    x: { type: 'spring' as const, stiffness: 260, damping: 34, mass: 0.9 },
    y: { type: 'spring' as const, stiffness: 260, damping: 34, mass: 0.9 },
    scale: { type: 'spring' as const, stiffness: 260, damping: 34, mass: 0.9 },
    rotate: { duration: 0.45, ease: EASE_OUT },
    opacity: { duration: 0.3 },
  };
}

function LanyardThread({ animateIn, reduceMotion }: { animateIn: boolean; reduceMotion: boolean }) {
  return (
    <motion.span
      className="home-voices__thread"
      aria-hidden
      initial={
        animateIn && !reduceMotion
          ? { y: -32, opacity: 0 }
          : { y: 0, opacity: 1 }
      }
      animate={{ y: 0, opacity: 1 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 0.58,
              ease: EASE_OUT,
              delay: animateIn ? 0.05 : 0,
            }
      }
    >
      <span className="home-voices__thread-strap" />
      <span className="home-voices__thread-shine" />
    </motion.span>
  );
}

function TestimonialCard({
  item,
  pose,
  isFront,
  showThread,
  threadEnter,
  threadKey,
  role,
  reduceMotion,
  zIndex,
}: {
  item: Testimonial;
  pose: Pose;
  isFront: boolean;
  showThread: boolean;
  threadEnter: boolean;
  threadKey: number;
  role: 'exiting-side' | 'exiting-swap' | 'rising' | 'rest';
  reduceMotion: boolean;
  zIndex: number;
}) {
  return (
    <motion.article
      className={`home-voices__card home-voices__card--${item.tone}${isFront ? ' is-front' : ''}`}
      style={{ zIndex }}
      initial={false}
      animate={{
        x: pose.x,
        y: pose.y,
        rotate: pose.rotate,
        scale: pose.scale,
        opacity: pose.opacity,
      }}
      transition={cardTransition(role, reduceMotion)}
    >
      <div className="home-voices__slot" aria-hidden>
        {showThread ? (
          <LanyardThread
            key={threadEnter ? `in-${threadKey}` : 'rest'}
            animateIn={threadEnter}
            reduceMotion={reduceMotion}
          />
        ) : null}
        <span className="home-voices__slot-rim" />
      </div>

      <header className="home-voices__card-top">
        <BrandMark item={item} />
        <span className="home-voices__more" aria-hidden>
          <i />
          <i />
          <i />
        </span>
      </header>

      <blockquote className="home-voices__quote">
        <span className="home-voices__qmark" aria-hidden>
          “
        </span>
        <p>{item.quote}</p>
      </blockquote>

      <footer className="home-voices__person">
        <div className="home-voices__who">
          <img
            className="home-voices__avatar"
            src={item.avatar}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
          />
          <span>
            <strong>{item.name}</strong>
            <em>{item.role}</em>
          </span>
        </div>
        <div className="home-voices__biz" aria-label="TopEdge AI">
          <img
            src="/brand-mark.png"
            alt=""
            width={22}
            height={22}
            loading="lazy"
            decoding="async"
          />
          <span className="home-voices__biz-name">
            TopEdge <span>AI</span>
          </span>
        </div>
      </footer>
    </motion.article>
  );
}

/**
 * Badge-stack — every 5s:
 * 1) front slides aside (other cards stay put, same position / tilt only)
 * 2) front tucks behind; next card rises; lanyard threads the hole
 */
export default function HomeTestimonials({ hideHeader = false }: { hideHeader?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [order, setOrder] = useState(() => testimonials.map((_, i) => i));
  const [phase, setPhase] = useState<Phase>('idle');
  const [exitingId, setExitingId] = useState<number | null>(null);
  const [threadKey, setThreadKey] = useState(0);
  const orderRef = useRef(order);
  orderRef.current = order;
  const busyRef = useRef(false);

  useEffect(() => {
    if (reduceMotion || testimonials.length < 2) return undefined;

    let sideTimer: number | undefined;
    let swapTimer: number | undefined;

    const tick = window.setInterval(() => {
      if (busyRef.current) return;
      busyRef.current = true;

      const front = orderRef.current[0];
      setExitingId(front);
      setPhase('side');

      sideTimer = window.setTimeout(() => {
        setPhase('swap');
        setThreadKey((k) => k + 1);

        swapTimer = window.setTimeout(() => {
          setOrder((prev) => [...prev.slice(1), prev[0]]);
          setExitingId(null);
          setPhase('idle');
          busyRef.current = false;
        }, SWAP_MS);
      }, SIDE_MS);
    }, CYCLE_MS);

    return () => {
      window.clearInterval(tick);
      if (sideTimer !== undefined) window.clearTimeout(sideTimer);
      if (swapTimer !== undefined) window.clearTimeout(swapTimer);
      busyRef.current = false;
    };
  }, [reduceMotion]);

  const visible = order.slice(0, 3);

  return (
    <section
      className={`home-voices${hideHeader ? ' home-voices--bare' : ''}`}
      aria-label="Customer testimonials"
      aria-live="polite"
    >
      <div className="home-voices__grid-bg" aria-hidden />
      <div className="home-voices__inner">
        {!hideHeader && (
          <header className="home-voices__head">
            <h2 className="home-voices__title">
              Trusted by founders{' '}
              <span className="home-voices__hl">backed by results</span>
            </h2>
            <p className="home-voices__sub">
              Cart recovery, COD confirms, and inbox wins — in their words.
            </p>
          </header>
        )}

        <div className="home-voices__stage">
          {visible.map((itemIndex, stackPos) => {
            const item = testimonials[itemIndex];
            const isExiting = exitingId === itemIndex;

            let pose: Pose = POSES[stackPos];
            let zIndex = 30 - stackPos * 10;
            let role: 'exiting-side' | 'exiting-swap' | 'rising' | 'rest' = 'rest';
            let isFront = stackPos === 0 && phase === 'idle';
            let showThread = isFront;
            let threadEnter = false;

            if (phase === 'side') {
              if (isExiting) {
                pose = SIDE_POSE;
                zIndex = 50;
                role = 'exiting-side';
                showThread = true;
              } else {
                pose = POSES[stackPos];
                zIndex = 30 - stackPos * 10;
                role = 'rest';
              }
            } else if (phase === 'swap') {
              if (isExiting) {
                pose = POSES[2];
                zIndex = 5;
                role = 'exiting-swap';
                showThread = false;
              } else if (stackPos === 1) {
                pose = POSES[0];
                zIndex = 40;
                role = 'rising';
                isFront = true;
                showThread = true;
                threadEnter = true;
              } else if (stackPos === 2) {
                pose = POSES[1];
                zIndex = 20;
                role = 'rest';
              }
            }

            return (
              <TestimonialCard
                key={item.name}
                item={item}
                pose={pose}
                zIndex={zIndex}
                isFront={isFront}
                showThread={showThread}
                threadEnter={threadEnter}
                threadKey={threadEnter ? threadKey : 0}
                role={role}
                reduceMotion={!!reduceMotion}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
