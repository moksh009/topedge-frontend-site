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
      // GSAP ticker drives RAF via LenisGsapBridge
      autoRaf: false,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.4,
      wheelMultiplier: 0.92,
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

  if (!marketing || reduceMotion || prefersReducedMotion()) {
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
