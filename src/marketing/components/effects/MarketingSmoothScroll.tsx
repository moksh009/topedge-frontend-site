import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';
import { isMarketingRoute } from '../../routes';

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProps = {
  children: ReactNode;
};

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function shouldUseNativeScroll() {
  if (typeof window === 'undefined') return true;
  if (prefersReducedMotion()) return true;
  // Native scroll is smoother + cheaper on phones / low-end / save-data
  if (window.matchMedia('(max-width: 900px)').matches) return true;
  const cores = navigator.hardwareConcurrency || 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (cores <= 4 || (typeof mem === 'number' && mem <= 4)) return true;
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  if (connection?.saveData) return true;
  if (connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') return true;
  return false;
}

/**
 * Keep GSAP ScrollTrigger in sync with Lenis (required for pin + scrub).
 * Drives Lenis from the GSAP ticker so both share one RAF loop.
 */
function LenisGsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', onScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(tick);
    };
  }, [lenis]);

  return null;
}

/**
 * Marketing Lenis smooth scroll, desktop capable devices only.
 * Mobile / low-end / reduced-motion → native scroll (faster, less jank).
 */
export default function MarketingSmoothScroll({ children }: SmoothScrollProps) {
  const { pathname } = useLocation();
  const marketing = isMarketingRoute(pathname);
  const [native, setNative] = useState(true);

  useEffect(() => {
    const sync = () => setNative(shouldUseNativeScroll());
    sync();
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqMobile = window.matchMedia('(max-width: 900px)');
    mqReduce.addEventListener('change', sync);
    mqMobile.addEventListener('change', sync);
    return () => {
      mqReduce.removeEventListener('change', sync);
      mqMobile.removeEventListener('change', sync);
    };
  }, []);

  const options = useMemo(
    () => ({
      autoRaf: false,
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.2,
      wheelMultiplier: 0.9,
      anchors: true,
      prevent: (node: HTMLElement) =>
        node.hasAttribute('data-lenis-prevent') ||
        node.hasAttribute('data-lenis-prevent-touch') ||
        node.hasAttribute('data-lenis-prevent-wheel') ||
        node.closest('[data-lenis-prevent]') != null ||
        node.closest('[data-lenis-prevent-touch]') != null ||
        node.closest('[data-lenis-prevent-wheel]') != null,
    }),
    []
  );

  if (!marketing || native) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={options}>
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}

/** Scroll to top / hash using Lenis when available, native otherwise */
export function SmoothScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const forceTop = () => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

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

    // Immediate + after paint (mobile footer nav often lands mid-page otherwise)
    forceTop();
    requestAnimationFrame(forceTop);
    const t1 = window.setTimeout(forceTop, 50);
    const t2 = window.setTimeout(forceTop, 200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname, hash, lenis]);

  return null;
}
