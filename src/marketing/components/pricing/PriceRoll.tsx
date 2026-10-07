import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type PriceRollProps = {
  value: string;
  suffix?: string;
  size?: 'lg' | 'sm' | 'xs';
  replayKey?: string;
  fastUpdates?: boolean;
};

const rollEase = [0.16, 0.84, 0.22, 1] as const;

function parseDigit(ch: string): number | null {
  if (/[0-9]/.test(ch)) return Number(ch);
  return null;
}

function RollDigit({
  digit,
  fromDigit,
  digitIndex,
  animate,
}: {
  digit: number;
  fromDigit: number;
  digitIndex: number;
  animate: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const spins = 2;
  let steps = digit - fromDigit;
  if (steps <= 0) steps += 10;
  steps += spins * 10;

  const cells: number[] = [];
  for (let i = 0; i <= steps; i += 1) {
    cells.push((fromDigit + i) % 10);
  }

  const duration = 0.62 + digitIndex * 0.075;
  const delay = digitIndex * 0.052;

  if (!animate || reduceMotion) {
    return <span className="mkt-price__ch mkt-price__ch--digit">{digit}</span>;
  }

  return (
    <span className="mkt-price__slot" aria-hidden>
      <motion.span
        className="mkt-price__slot-track"
        initial={{ y: 0 }}
        animate={{ y: `-${steps}em` }}
        transition={{
          duration,
          delay,
          ease: rollEase,
        }}
      >
        {cells.map((d, i) => (
          <span key={i} className="mkt-price__slot-digit">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/**
 * Casino-style odometer roll when billing cycle or value changes.
 */
export default function PriceRoll({
  value,
  suffix = '',
  size = 'lg',
  replayKey,
}: PriceRollProps) {
  const reduceMotion = useReducedMotion();
  const rollKey = replayKey ?? value;
  const prevRef = useRef({ key: rollKey, value });
  const prevValue = prevRef.current.value;
  const shouldAnimate = prevRef.current.key !== rollKey && !reduceMotion;

  useEffect(() => {
    prevRef.current = { key: rollKey, value };
  }, [rollKey, value]);

  // Static render (first paint, which is what the prerenderer and every crawler
  // sees, and anyone with prefers-reduced-motion). Emit the amount as ONE text
  // node instead of one inline-block span per character: `.mkt-price__ch` is
  // display:inline-block, so per-character spans make `innerText` and every
  // HTML-to-text pipeline read "₹ 1 , 5 9 9" instead of "₹1,599". The currency
  // mark keeps its own span because it is styled separately. See seo-audit/ TE-003.
  if (!shouldAnimate) {
    const currency = value.startsWith('₹') ? '₹' : '';
    const amount = currency ? value.slice(1) : value;
    return (
      <span className={`mkt-price mkt-price--${size}`}>
        {currency ? <span className="mkt-price__ch mkt-price__ch--inr">{currency}</span> : null}
        {amount ? <span className="mkt-price__ch">{amount}</span> : null}
        {suffix ? <span className="mkt-price__suffix">{suffix}</span> : null}
      </span>
    );
  }

  let digitIndex = 0;

  return (
    <span className={`mkt-price mkt-price--${size}`} aria-label={`${value}${suffix ? ` ${suffix}` : ''}`}>
      {Array.from(value || '').map((ch, i) => {
        if (ch === '₹') {
          return (
            <span key={`inr-${i}`} className="mkt-price__ch mkt-price__ch--inr">
              {ch}
            </span>
          );
        }

        const digit = parseDigit(ch);
        if (digit !== null) {
          const fromChar = prevValue[i];
          const fromDigit = parseDigit(fromChar ?? '') ?? digit;
          const idx = digitIndex;
          digitIndex += 1;
          return (
            <RollDigit
              key={`d-${replayKey ?? value}-${i}`}
              digit={digit}
              fromDigit={fromDigit}
              digitIndex={idx}
              animate={shouldAnimate}
            />
          );
        }

        return (
          <motion.span
            key={`sep-${replayKey ?? value}-${i}`}
            className="mkt-price__ch mkt-price__ch--sep"
            initial={shouldAnimate ? { opacity: 0.35, y: '0.12em' } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: digitIndex * 0.04,
              ease: rollEase,
            }}
          >
            {ch}
          </motion.span>
        );
      })}
      {suffix ? <span className="mkt-price__suffix">{suffix}</span> : null}
    </span>
  );
}
