/**
 * First-party ad attribution (Google Ads click id + UTMs) for the marketing site.
 *
 * Same storage shape as the static landing pages (scripts/lp/attribution.js):
 * localStorage + cookie `te_attr` (domain .topedgeai.com, 90 days, SameSite=Lax),
 * value = JSON of the keys below plus `lp` (landing page) and `ts` (ISO time).
 * No personal data is stored. The dashboard signup reads the same cookie / the
 * query parameters forwarded by SignupRedirect.
 */

export const ATTRIBUTION_KEYS = [
  'gclid',
  'gbraid',
  'wbraid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number] | 'lp' | 'ts', string>>;

const STORAGE_KEY = 'te_attr';
const MAX_LEN = 200;
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90;

/** Short plain strings only: no markup characters, max 200 chars. */
function clean(value: string | null | undefined): string {
  return String(value ?? '')
    .replace(/[<>"'`]/g, '')
    .trim()
    .slice(0, MAX_LEN);
}

function parse(raw: string | null | undefined): Attribution {
  if (!raw) return {};
  try {
    const obj = JSON.parse(raw) as Record<string, unknown>;
    const out: Attribution = {};
    for (const k of [...ATTRIBUTION_KEYS, 'lp', 'ts'] as const) {
      const v = clean(typeof obj[k] === 'string' ? (obj[k] as string) : '');
      if (v) out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

function readCookie(): string | null {
  try {
    const m = document.cookie.match(/(?:^|;\s*)te_attr=([^;]*)/);
    return m ? decodeURIComponent(m[1]) : null;
  } catch {
    return null;
  }
}

/** Stored attribution (localStorage first, then the shared cookie). */
export function readAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    /* storage blocked */
  }
  return parse(raw ?? readCookie());
}

/**
 * Call once at startup. If the URL carries a click id or UTMs, store them
 * (last click wins). Does nothing, and writes nothing, otherwise.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const k of ATTRIBUTION_KEYS) {
      const v = clean(params.get(k));
      if (v) found[k] = v;
    }
    if (!Object.keys(found).length) return;
    found.lp = clean(params.get('lp')) || window.location.pathname;
    found.ts = new Date().toISOString();
    const json = JSON.stringify(found);
    try {
      window.localStorage.setItem(STORAGE_KEY, json);
    } catch {
      /* storage blocked */
    }
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(json)}; max-age=${COOKIE_MAX_AGE}; path=/; domain=.topedgeai.com; SameSite=Lax`;
  } catch {
    /* attribution must never break the page */
  }
}

/** Query parameters to forward to the dashboard signup (no timestamp). */
export function attributionQuery(): Record<string, string> {
  const a = readAttribution();
  const out: Record<string, string> = {};
  for (const k of ATTRIBUTION_KEYS) {
    if (a[k]) out[k] = a[k]!;
  }
  if (a.lp) out.lp = a.lp;
  return out;
}
