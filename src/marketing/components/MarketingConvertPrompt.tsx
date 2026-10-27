import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { marketingSignupPath, SALES_WHATSAPP_URL } from '../lib/billingCatalog';
import ProofBadges from './ProofBadges';
import '../styles/convert-prompt.css';

const STORAGE_KEY = 'te_mkt_convert_prompt_v4';
/** Page progress required (document scroll). */
const SCROLL_RATIO = 0.58;
/** Absolute scroll floor so short pages do not fire early. */
const MIN_SCROLL_PX = 1400;
/** Dwell time before the prompt can arm (ms). */
const MIN_DWELL_MS = 18_000;
/** Extra delay after thresholds so it does not pop mid-flick. */
const SETTLE_MS = 900;

const SKIP_PREFIXES = [
  '/signup',
  '/login',
  '/privacy',
  '/terms',
  '/pricing',
  '/contact',
  '/community',
  '/admin',
];

/** Same merchants as hero trust strip */
const BRANDS = [
  { name: 'Delitech Smart Home', src: '/trust/delitech-white.png' },
  { name: 'Apex Light', src: '/trust/apex-white.png' },
  { name: 'ajeeb', src: '/trust/ajeeb-black.png' },
  { name: 'Ecom', src: '/trust/ecom-black.png' },
  { name: 'Oleez Online', src: '/trust/oleez-black.png' },
];

function shouldSkipPath(pathname: string) {
  const path = pathname.replace(/\/$/, '') || '/';
  return SKIP_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}

function alreadySeen() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return true;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* ignore */
  }
}

/**
 * One soft convert prompt per browser session after real engagement:
 * ~58% page depth AND 1400px scrolled, plus ~18s dwell, then a short settle.
 * Skips signup/login/legal/pricing/contact (those pages already convert).
 */
export default function MarketingConvertPrompt() {
  const location = useLocation();
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (shouldSkipPath(location.pathname) || alreadySeen()) return undefined;

    // Dev/preview: /features/foo?convert_preview=1
    if (new URLSearchParams(location.search).get('convert_preview') === '1') {
      setOpen(true);
      return undefined;
    }

    let armed = true;
    let settleTimer: ReturnType<typeof setTimeout> | null = null;
    let dwellTimer: ReturnType<typeof setTimeout> | null = null;
    const pageEnteredAt = Date.now();

    const clearTimers = () => {
      if (settleTimer) {
        clearTimeout(settleTimer);
        settleTimer = null;
      }
      if (dwellTimer) {
        clearTimeout(dwellTimer);
        dwellTimer = null;
      }
    };

    const show = () => {
      if (!armed) return;
      armed = false;
      clearTimers();
      markSeen();
      setOpen(true);
      window.removeEventListener('scroll', onScroll, { capture: true } as AddEventListenerOptions);
    };

    const isDeepEnough = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const progress = window.scrollY / maxScroll;
      return progress >= SCROLL_RATIO && window.scrollY >= MIN_SCROLL_PX;
    };

    const scheduleShow = () => {
      if (!armed || settleTimer) return;
      settleTimer = setTimeout(show, SETTLE_MS);
    };

    const onScroll = () => {
      if (!armed) return;
      if (!isDeepEnough()) {
        clearTimers();
        return;
      }

      const remainingDwell = MIN_DWELL_MS - (Date.now() - pageEnteredAt);
      if (remainingDwell > 0) {
        if (dwellTimer) return;
        dwellTimer = setTimeout(() => {
          dwellTimer = null;
          if (armed && isDeepEnough()) scheduleShow();
        }, remainingDwell);
        return;
      }

      scheduleShow();
    };

    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    // Do not evaluate on mount — wait for real scroll + dwell.
    return () => {
      clearTimers();
      window.removeEventListener('scroll', onScroll, { capture: true } as EventListenerOptions);
    };
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !open) return null;

  const dismiss = () => setOpen(false);
  const brandTrack = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return createPortal(
    <div className="mkt-convert" role="presentation">
      <button type="button" className="mkt-convert__backdrop" aria-label="Dismiss" onClick={dismiss} />
      <div
        className="mkt-convert__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button type="button" className="mkt-convert__close" onClick={dismiss} aria-label="Close">
          <X size={15} strokeWidth={2} />
        </button>

        <div className="mkt-convert__col">
          <div className="mkt-convert__brand">
            <img
              src="/logo.png"
              alt="TopEdge AI"
              width={22}
              height={22}
              className="mkt-convert__brand-mark"
              decoding="async"
            />
            <span className="mkt-convert__brand-name">
              TopEdge <span>AI</span>
            </span>
          </div>

          <h2 id={titleId} className="mkt-convert__title">
            Recover <span className="mkt-convert__title-accent">abandoned carts</span> before they go
            cold
          </h2>
          <p className="mkt-convert__sub">
            Live in about 15 minutes. 14-day trial, no card on this site.
          </p>

          <ul className="mkt-convert__points">
            <li>Cart reminders that stop when they buy</li>
            <li>COD confirmation before you ship</li>
            <li>Order and delivery updates on WhatsApp</li>
            <li>One inbox, with the Shopify order beside it</li>
          </ul>

          <ProofBadges brief className="mkt-convert__proof" />

          <div className="mkt-convert__actions">
            <Link className="mkt-convert__primary" to={marketingSignupPath()} onClick={dismiss}>
              Start free
            </Link>
            <a
              className="mkt-convert__secondary"
              href={SALES_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
            >
              <img
                src="/platforms/whatsapp.svg"
                alt=""
                width={16}
                height={16}
                className="mkt-convert__wa-icon"
                decoding="async"
                aria-hidden
              />
              WhatsApp us
            </a>
          </div>

          <button type="button" className="mkt-convert__dismiss" onClick={dismiss}>
            Keep browsing
          </button>
        </div>

        <div className="mkt-convert__aside" aria-hidden>
          <img
            className="mkt-convert__art"
            src="/marketing/convert-stage.webp"
            alt=""
            width={1100}
            height={821}
            decoding="async"
            loading="lazy"
          />


          <div className="mkt-convert__brands">
            <p className="mkt-convert__brands-label">Running on TopEdge</p>
            <div className="mkt-convert__brands-viewport">
              <div className="mkt-convert__brands-track">
                {brandTrack.map((b, i) => (
                  <span key={`${b.name}-${i}`} className="mkt-convert__brands-item" title={b.name}>
                    <img src={b.src} alt={b.name} width={88} height={28} decoding="async" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
