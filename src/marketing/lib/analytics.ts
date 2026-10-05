/**
 * Google Analytics 4 for the marketing site.
 *
 * Inert unless VITE_GA_MEASUREMENT_ID (a `G-XXXXXXXXXX` id) is set at build time,
 * so nothing loads, and nothing is sent, until the owner supplies the id.
 *
 * - gtag.js loads after the window `load` event (never on the critical path).
 * - Page views are sent manually on every SPA route change.
 * - Clicks on signup links and WhatsApp sales links become events.
 * - analytics_storage is granted (disclosed in the privacy policy); the ad
 *   storage / personalisation signals stay denied.
 * - Skipped during prerender so crawlers' HTML is unchanged.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __TOPEDGE_PRERENDER__?: boolean;
  }
}

const RAW_ID = String(import.meta.env.VITE_GA_MEASUREMENT_ID ?? '').trim();
export const GA_ID = /^G-[A-Z0-9]{4,}$/.test(RAW_ID) ? RAW_ID : '';

let started = false;

function ensureGtag(): void {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // gtag.js requires the real `arguments` object, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
}

function loadScript(): void {
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (!GA_ID || typeof window === 'undefined' || window.__TOPEDGE_PRERENDER__) return;
  ensureGtag();
  window.gtag!('event', name, params);
}

export function trackPageView(path: string): void {
  trackEvent('page_view', {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: document.title,
  });
}

function onClick(e: MouseEvent): void {
  const a = (e.target as Element | null)?.closest?.('a');
  if (!a) return;
  const href = a.getAttribute('href') || '';
  const label = (a.textContent || '').trim().slice(0, 60);
  const page = window.location.pathname;
  if (/^(\/signup|https:\/\/dash\.topedgeai\.com\/signup)/.test(href)) {
    const plan = new URLSearchParams(href.split('?')[1] || '').get('plan') || undefined;
    trackEvent('signup_click', { link_text: label, page_path: page, plan });
  } else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) {
    trackEvent('whatsapp_sales_click', { link_text: label, page_path: page });
  }
}

export function initAnalytics(): void {
  if (!GA_ID || started || typeof window === 'undefined' || window.__TOPEDGE_PRERENDER__) return;
  started = true;
  ensureGtag();
  window.gtag!('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag!('js', new Date());
  window.gtag!('config', GA_ID, { send_page_view: false });
  document.addEventListener('click', onClick, { capture: true });
  if (document.readyState === 'complete') loadScript();
  else window.addEventListener('load', loadScript, { once: true });
}
