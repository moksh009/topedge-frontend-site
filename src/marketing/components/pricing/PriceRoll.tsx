import { useMemo } from 'react';

type PriceRollProps = {
  value: string;
  suffix?: string;
  size?: 'lg' | 'sm' | 'xs';
  replayKey?: string;
  fastUpdates?: boolean;
};

/**
 * Odometer-style digit roll when the billing cycle changes.
 */
export default function PriceRoll({ value, suffix = '', size = 'lg', replayKey, fastUpdates }: PriceRollProps) {
  const chars = useMemo(() => Array.from(value || ''), [value]);

  return (
    <span className={`mkt-price mkt-price--${size}`} aria-label={`${value}${suffix ? ` ${suffix}` : ''}`}>
      {chars.map((ch, i) => (
        <span
          key={fastUpdates ? i : `${replayKey || value}-${i}-${ch}`}
          className={
            ch === '₹'
              ? 'mkt-price__ch mkt-price__ch--inr'
              : /[0-9]/.test(ch)
                ? 'mkt-price__ch mkt-price__ch--digit'
                : 'mkt-price__ch mkt-price__ch--sep'
          }
          style={{ animationDelay: `${i * 28}ms` }}
        >
          {ch}
        </span>
      ))}
      {suffix ? <span className="mkt-price__suffix">{suffix}</span> : null}
    </span>
  );
}
