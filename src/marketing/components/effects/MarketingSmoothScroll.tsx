import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { isMarketingRoute } from '../../routes';

type SmoothScrollProps = {
  children: ReactNode;
};

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Site-wide Lenis smooth scroll for marketing pages.
 * Desktop: eased inertial wheel/trackpad. Mobile: native touch (syncTouch off).
 * Disabled when prefers-reduced-motion is on.
 */
export default function MarketingSmoothScroll({ children }: SmoothScrollProps) {
  const { pathname } = useLocation();
  const marketing = isMarketingRoute(pathname);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const options = useMemo(
    () => ({
      autoRaf: true,
      // Slightly longer ease = that “premium site” glide
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Keep iOS/Android native rubber-band feel
      syncTouch: false,
      touchMultiplier: 1.4,
      wheelMultiplier: 0.92,
      anchors: true,
      prevent: (node: HTMLElement) =>
        node.hasAttribute('data-lenis-prevent') ||
        node.closest('[data-lenis-prevent]') != null,
    }),
    []
  );

  if (!marketing || reduceMotion || prefersReducedMotion()) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}

/** Scroll to top / hash using Lenis when available, native otherwise */
export function SmoothScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (!el) return;

      requestAnimationFrame(() => {
        if (lenis) {
          lenis.scrollTo(el, { offset: -72, duration: 1.1 });
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      return;
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname, hash, lenis]);

  return null;
}
