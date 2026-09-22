import { useEffect, useState } from 'react';

type BrandMarkProps = {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
  /** Display size ≤28px → 56 anim; otherwise 80 (navbar 40px). */
  size?: 'sm' | 'md';
};

const STATIC_WEBP = '/brand-mark-56.webp';
const STATIC_PNG = '/brand-mark-56.png';
const ANIM = {
  sm: '/brand-mark-anim-56.webp',
  md: '/brand-mark-anim-80.webp',
} as const;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Static mark on first paint (LCP-safe ~3.6KB).
 * After load + idle, upgrades to a tiny animated WebP (~11–16KB) unless
 * the user prefers reduced motion. Never loads the 146KB GIF on the critical path.
 */
export default function BrandMark({
  className,
  width = 40,
  height = 40,
  alt = 'TopEdge AI',
  size = 'md',
}: BrandMarkProps) {
  const [src, setSrc] = useState(STATIC_WEBP);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const upgrade = () => {
      if (cancelled) return;
      const anim = ANIM[size];
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (!cancelled) setSrc(anim);
      };
      img.src = anim;
    };

    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(upgrade, { timeout: 2500 });
      } else {
        timeoutId = setTimeout(upgrade, 400);
      }
    };

    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', schedule);
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [size]);

  const useAnim = src !== STATIC_WEBP;

  return (
    <picture>
      {!useAnim ? <source type="image/webp" srcSet={STATIC_WEBP} /> : null}
      <img
        src={useAnim ? src : STATIC_PNG}
        alt={alt}
        width={width}
        height={height}
        className={className}
        decoding="async"
        fetchPriority="low"
      />
    </picture>
  );
}
