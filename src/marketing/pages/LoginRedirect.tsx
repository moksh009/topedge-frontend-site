import { useEffect } from 'react';
import { DASH_LOGIN } from '../lib/billingCatalog';
import '../styles/auth-redirect.css';

const ALLOWED_PLANS = new Set(['launch', 'growth', 'scale']);
const ALLOWED_CYCLES = new Set(['monthly', 'quarterly', 'yearly', 'annual']);

export default function LoginRedirect() {
  useEffect(() => {
    const incoming = new URLSearchParams(window.location.search);
    const url = new URL(DASH_LOGIN);
    const plan = String(incoming.get('plan') || '').toLowerCase();
    const cycle = String(incoming.get('cycle') || '').toLowerCase();
    if (ALLOWED_PLANS.has(plan)) url.searchParams.set('plan', plan);
    if (ALLOWED_CYCLES.has(cycle)) {
      url.searchParams.set('cycle', cycle === 'annual' ? 'yearly' : cycle);
    }
    url.searchParams.set('from', 'www');
    window.location.replace(url.toString());
  }, []);

  return (
    <main className="mkt-auth-redirect" aria-busy="true" aria-live="polite">
      <img
        src="/topedge-loader.gif"
        alt=""
        width={96}
        height={96}
        className="mkt-auth-redirect__logo"
        decoding="async"
      />
      <p className="mkt-auth-redirect__text">Signing you in…</p>
    </main>
  );
}
