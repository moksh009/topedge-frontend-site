/**
 * PostHog for the marketing site: per-person journeys and automatic click capture.
 *
 * GA4 answers "how many people clicked Start free trial last week". It is poor at
 * "what did *this* merchant do before they signed up". PostHog answers the second,
 * which is the question worth asking when a month's ad budget buys ~200 clicks and
 * every one of them is worth looking at individually.
 *
 * Inert unless VITE_POSTHOG_KEY is set at build time, so nothing loads and nothing is
 * sent until the owner supplies one. Loaded after the window `load` event, never on
 * the critical path, and skipped during prerender.
 *
 * THE CROSS-SUBDOMAIN BIT IS THE POINT
 * `cross_subdomain_cookie: true` writes PostHog's id cookie on `.topedgeai.com`
 * rather than on `topedgeai.com` alone. That is what lets the same visitor keep one
 * identity from the ad landing page through to `dash.topedgeai.com` — so the journey
 * reads as one story (saw the ad page → read pricing → signed up → connected Shopify)
 * instead of two unrelated strangers. Without it the funnel breaks exactly where it
 * gets interesting. Set the same flag when PostHog is added to the dashboard.
 *
 * `autocapture` is what records button and link clicks without naming each one, which
 * is the "track every button" ask. Named events are still worth adding for the few
 * things that matter commercially — see trackEvent in ./analytics.
 */

declare global {
  interface Window {
    posthog?: {
      init: (key: string, config: Record<string, unknown>) => void;
      capture: (event: string, props?: Record<string, unknown>) => void;
      identify: (id: string, props?: Record<string, unknown>) => void;
      __loaded?: boolean;
    };
  }
}

const env = (k: string): string => String(import.meta.env[k] ?? '').trim();

export const POSTHOG_KEY = env('VITE_POSTHOG_KEY');
/** Regional ingest host. US is the default; EU projects must set this explicitly. */
export const POSTHOG_HOST = env('VITE_POSTHOG_HOST') || 'https://us.i.posthog.com';

let started = false;

function live(): boolean {
  return Boolean(POSTHOG_KEY) && typeof window !== 'undefined' && !window.__TOPEDGE_PRERENDER__;
}

/** Load the library, then initialise. Called once, after `load`. */
function load(): void {
  const s = document.createElement('script');
  s.async = true;
  s.src = `${POSTHOG_HOST}/static/array.js`;
  s.onload = () => {
    try {
      window.posthog?.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        // One identity across topedgeai.com and dash.topedgeai.com.
        cross_subdomain_cookie: true,
        // Every button and link click, without naming them one by one.
        autocapture: true,
        // Page views are sent by hand on SPA route change; the automatic one only
        // fires on a hard load and would under-count every route after the first.
        capture_pageview: false,
        capture_pageleave: true,
        // Only build a person profile once someone is identified, so anonymous
        // traffic does not burn the free tier's person allowance.
        person_profiles: 'identified_only',
      });
    } catch {
      /* analytics must never break the page */
    }
  };
  document.head.appendChild(s);
}

export function initPostHog(): void {
  if (!live() || started) return;
  started = true;
  if (document.readyState === 'complete') load();
  else window.addEventListener('load', load, { once: true });
}

/** A named event, for the handful of moments worth more than an autocaptured click. */
export function phCapture(event: string, props: Record<string, unknown> = {}): void {
  if (!live()) return;
  try {
    window.posthog?.capture(event, props);
  } catch {
    /* ignore */
  }
}

/** Report an SPA route change. */
export function phPageView(path: string): void {
  phCapture('$pageview', { $current_url: window.location.origin + path });
}
