import { useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import '../../../styles/demo-product-stage.css';

/** Desktop canvas — scaled into the marketing device frame. */
const DEMO_VIEWPORT_W = 1280;
const DEMO_VIEWPORT_H = 800;

const DEMO_ORIGIN = (
  (import.meta.env.VITE_DASHBOARD_DEMO_URL as string | undefined)?.trim() ||
    'http://localhost:5173/?embed=1'
)
  .replace(/\?.*$/, '')
  .replace(/\/$/, '');

export function buildDemoDashboardUrl(path = '/', { lockPath = false } = {}) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const [pathname, search = ''] = clean.split('?');
  const params = new URLSearchParams(search);
  params.set('embed', '1');
  if (lockPath) {
    params.set('lock', pathname);
  }
  const qs = params.toString();
  return `${DEMO_ORIGIN}${pathname}?${qs}`;
}

type DemoDashboardFrameProps = {
  /** Dashboard path, e.g. `/store-growth-hub/abandoned-carts` */
  path?: string;
  title?: string;
  caption?: string | null;
  /** Defer iframe load until near viewport (feature sections). */
  lazy?: boolean;
  /** Pin iframe to `path` — sidebar/back cannot leave this feature preview. */
  lockPath?: boolean;
  /**
   * Hero: briefly hold page scroll at the current Y when interacting with the iframe.
   * Stops focus/route changes inside the demo from yanking the marketing page
   * (without permanently locking scroll or forcing Y=0).
   */
  pinScroll?: boolean;
  className?: string;
};

/**
 * Real dashboard UI (VITE_DEMO) inside the black device frame.
 */
export default function DemoDashboardFrame({
  path = '/',
  title = 'TopEdge dashboard preview',
  caption = 'Interactive preview — sample data',
  lazy = false,
  lockPath = false,
  pinScroll = false,
  className,
}: DemoDashboardFrameProps) {
  const slotRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const holdYRef = useRef<number | null>(null);
  const holdTimerRef = useRef(0);
  const [scale, setScale] = useState(0.62);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const src = buildDemoDashboardUrl(path, { lockPath });
  const lenis = useLenis();

  useEffect(() => {
    const el = slotRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / DEMO_VIEWPORT_W);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!lazy || shouldLoad) return;
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [lazy, shouldLoad]);

  // Hero: iframe focus / Live Chat can scrollIntoView ancestors and yank the homepage.
  // Cross-origin clicks don't bubble — while the pointer is over the demo, reject
  // programmatic scroll jumps (no recent wheel/touch), but allow intentional scrolling.
  useEffect(() => {
    if (!pinScroll) return undefined;
    const host = hostRef.current;
    const iframe = iframeRef.current;
    if (!host) return undefined;

    const readY = () => {
      if (lenis && typeof lenis.scroll === 'number') return lenis.scroll;
      return window.scrollY || document.documentElement.scrollTop || 0;
    };

    const writeY = (y: number) => {
      if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
      window.scrollTo(0, y);
      document.documentElement.scrollTop = y;
      document.body.scrollTop = y;
    };

    let pointerInside = false;
    let gestureUntil = 0;
    let stableY = readY();
    let armedUntil = 0;

    const markGesture = () => {
      gestureUntil = performance.now() + 160;
    };

    const arm = (ms = 1000) => {
      armedUntil = performance.now() + ms;
      holdYRef.current = stableY;
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = window.setTimeout(() => {
        holdYRef.current = null;
        armedUntil = 0;
        stableY = readY();
      }, ms);
    };

    let raf = 0;
    const tick = () => {
      const board = document.querySelector('.home-hero__board') as HTMLElement | null;
      if (board && board.scrollTop !== 0) board.scrollTop = 0;

      const y = readY();
      const now = performance.now();
      const gesturing = now < gestureUntil;
      const armed = now < armedUntil || holdYRef.current != null;

      if (armed && holdYRef.current != null && Math.abs(y - holdYRef.current) > 1) {
        writeY(holdYRef.current);
      } else if (pointerInside && !gesturing && Math.abs(y - stableY) > 48) {
        // Programmatic jump while hovering the demo (focus / scrollIntoView).
        writeY(stableY);
        arm(900);
      } else if (!armed || gesturing) {
        stableY = y;
        if (gesturing) holdYRef.current = null;
      }

      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    const onEnter = () => {
      pointerInside = true;
      stableY = readY();
    };
    const onLeave = () => {
      pointerInside = false;
    };
    const onWindowBlur = () => arm(1000);
    const onIframeFocus = () => arm(1000);
    const onIframeLoad = () => {
      const board = document.querySelector('.home-hero__board') as HTMLElement | null;
      if (board) board.scrollTop = 0;
    };

    host.addEventListener('pointerenter', onEnter);
    host.addEventListener('pointerleave', onLeave);
    window.addEventListener('wheel', markGesture, { passive: true, capture: true });
    window.addEventListener('touchmove', markGesture, { passive: true, capture: true });
    window.addEventListener('keydown', markGesture, { passive: true, capture: true });
    window.addEventListener('blur', onWindowBlur);
    iframe?.addEventListener('focus', onIframeFocus);
    iframe?.addEventListener('load', onIframeLoad);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(holdTimerRef.current);
      holdYRef.current = null;
      host.removeEventListener('pointerenter', onEnter);
      host.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('wheel', markGesture, true);
      window.removeEventListener('touchmove', markGesture, true);
      window.removeEventListener('keydown', markGesture, true);
      window.removeEventListener('blur', onWindowBlur);
      iframe?.removeEventListener('focus', onIframeFocus);
      iframe?.removeEventListener('load', onIframeLoad);
    };
  }, [lenis, pinScroll, shouldLoad]);

  return (
    <div
      ref={hostRef}
      className={['demo-product-wrap', 'demo-product-wrap--feature', className]
        .filter(Boolean)
        .join(' ')}
      data-lenis-prevent
    >
      <div className="demo-product-stage demo-product-stage--iframe">
        <div className="demo-product-stage__chrome" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div
          ref={slotRef}
          className="demo-product-stage__iframe-slot"
          style={{ height: DEMO_VIEWPORT_H * scale }}
        >
          <div
            className="demo-product-stage__iframe-scale"
            style={{
              width: DEMO_VIEWPORT_W,
              height: DEMO_VIEWPORT_H,
              transform: `scale(${scale})`,
            }}
          >
            {shouldLoad ? (
              <iframe
                ref={iframeRef}
                className="demo-product-stage__iframe"
                title={title}
                src={src}
                width={DEMO_VIEWPORT_W}
                height={DEMO_VIEWPORT_H}
                tabIndex={-1}
                loading={lazy ? 'lazy' : 'eager'}
                referrerPolicy="no-referrer"
                allow="clipboard-read; clipboard-write"
              />
            ) : (
              <div className="demo-product-stage__iframe-placeholder" aria-hidden />
            )}
          </div>
        </div>
      </div>
      {caption ? <p className="demo-product-stage__caption">{caption}</p> : null}
    </div>
  );
}
