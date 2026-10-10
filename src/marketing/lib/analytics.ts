/**
 * Google Analytics 4 + Google Ads tagging for the marketing site.
 *
 * Inert unless an id is set at build time, so nothing loads and nothing is sent
 * until the owner supplies one:
 *   VITE_GA_MEASUREMENT_ID    G-XXXXXXXXXX  (GA4)
 *   VITE_GOOGLE_ADS_ID        AW-XXXXXXXXX  (Google Ads: remarketing + conversions)
 *   VITE_GOOGLE_ADS_SIGNUP_LABEL  the conversion label for "reached signup"
 *
 * - gtag.js loads after the window `load` event (never on the critical path).
 * - Page views are sent manually on every SPA route change.
 * - Clicks on signup links and WhatsApp sales links become events.
 * - Skipped during prerender so crawlers' HTML is unchanged.
 *
 * CONSENT
 * The ad signals used to be denied unconditionally. That silently broke the two
 * things the ad account is bought for: with `ad_storage` denied Google's tag may
 * not store the click id, and with `ad_personalization` denied remarketing lists
 * never populate at all — so no retargeting audience can ever build.
 *
 * Ads here run in India, which is outside the EEA, so the default grants the ad
 * signals and a region-scoped default denies them across the EEA, the UK and
 * Switzerland until a consent tool calls `updateConsent`. Region-scoped defaults
 * take precedence over the global one in the Consent Mode API, and they are
 * declared first so the intent is readable rather than order-dependent.
 *
 * Granting ad storage in India is disclosed in the privacy policy's cookies
 * section alongside the existing gclid/UTM disclosure. If that section is ever
 * narrowed, narrow this with it.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __TOPEDGE_PRERENDER__?: boolean;
  }
}

const env = (k: string): string => String(import.meta.env[k] ?? '').trim();

const RAW_GA = env('VITE_GA_MEASUREMENT_ID');
const RAW_ADS = env('VITE_GOOGLE_ADS_ID');

export const GA_ID = /^G-[A-Z0-9]{4,}$/.test(RAW_GA) ? RAW_GA : '';
/** Google Ads account tag. Drives remarketing audiences and conversion sends. */
export const ADS_ID = /^AW-[0-9]{6,}$/.test(RAW_ADS) ? RAW_ADS : '';
/** Conversion label for the "reached signup" action, from the Google Ads UI. */
export const ADS_SIGNUP_LABEL = env('VITE_GOOGLE_ADS_SIGNUP_LABEL').slice(0, 40);

/** The tag loads if either product is configured. */
const TAG_ID = GA_ID || ADS_ID;

/**
 * EEA + UK + Switzerland. Ad signals stay denied here until a consent tool grants
 * them; everywhere else (the market this account actually targets) they are granted.
 */
const CONSENT_REGION_DENY = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU',
  'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES',
  'SE', 'IS', 'LI', 'NO', 'GB', 'CH',
];

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
  s.src = `https://www.googletagmanager.com/gtag/js?id=${TAG_ID}`;
  document.head.appendChild(s);
}

function live(): boolean {
  return Boolean(TAG_ID) && typeof window !== 'undefined' && !window.__TOPEDGE_PRERENDER__;
}

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (!live()) return;
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

/**
 * Send a Google Ads conversion. No-op unless both the account id and a label are
 * configured, so a missing label can never send an unlabelled conversion.
 *
 * This site can only observe the *start* of signup: the account is created on
 * dash.topedgeai.com. The real `signup_complete` fires there, and the paying
 * events arrive by offline conversion import keyed on the gclid that
 * lib/attribution.ts stores. Do not optimise the campaign on this event.
 */
export function trackAdsConversion(
  label: string,
  params: Record<string, unknown> = {},
): void {
  if (!live() || !ADS_ID || !label) return;
  ensureGtag();
  window.gtag!('event', 'conversion', { send_to: `${ADS_ID}/${label}`, ...params });
}

/**
 * Grant or revoke consent after the page has loaded, for a consent tool to call.
 * Only meaningful in the regions denied by default above.
 */
export function updateConsent(granted: boolean): void {
  if (!live()) return;
  ensureGtag();
  const v = granted ? 'granted' : 'denied';
  window.gtag!('consent', 'update', {
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    analytics_storage: v,
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
    // Secondary conversion: reached signup. The account may not get created.
    trackAdsConversion(ADS_SIGNUP_LABEL, { page_path: page, plan });
  } else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) {
    trackEvent('whatsapp_sales_click', { link_text: label, page_path: page });
  }
}

export function initAnalytics(): void {
  if (!live() || started) return;
  started = true;
  ensureGtag();
  // Region-scoped first: these win over the global default below.
  window.gtag!('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    region: CONSENT_REGION_DENY,
    wait_for_update: 500,
  });
  window.gtag!('consent', 'default', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  });
  window.gtag!('js', new Date());
  if (GA_ID) window.gtag!('config', GA_ID, { send_page_view: false });
  // Builds the remarketing audience. Without this config there is no list to retarget.
  if (ADS_ID) window.gtag!('config', ADS_ID);
  document.addEventListener('click', onClick, { capture: true });
  if (document.readyState === 'complete') loadScript();
  else window.addEventListener('load', loadScript, { once: true });
}
