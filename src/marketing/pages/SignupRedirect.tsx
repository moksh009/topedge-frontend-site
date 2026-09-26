import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DASH_SIGNUP } from '../lib/billingCatalog';
import '../styles/auth-redirect.css';

const ALLOWED_PLANS = new Set(['launch', 'growth', 'scale']);
const ALLOWED_CYCLES = new Set(['monthly', 'quarterly', 'yearly', 'annual']);

export default function SignupRedirect() {
  const location = useLocation();

  useEffect(() => {
    const incoming = new URLSearchParams(location.search);
    const out = new URLSearchParams();
    const plan = String(incoming.get('plan') || '').toLowerCase();
    const cycle = String(incoming.get('cycle') || '').toLowerCase();
    if (ALLOWED_PLANS.has(plan)) out.set('plan', plan);
    if (ALLOWED_CYCLES.has(cycle)) out.set('cycle', cycle === 'annual' ? 'yearly' : cycle);
    out.set('from', 'www');
    window.location.replace(`${DASH_SIGNUP}?${out.toString()}`);
  }, [location.search]);

  return (
    <main className="mkt-auth-redirect" aria-busy="true" aria-live="polite">
      <Helmet>
        <title>Opening signup | TopEdge</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <img
        src="/topedge-loader.gif"
        alt="Opening TopEdge signup"
        width={96}
        height={96}
        className="mkt-auth-redirect__logo"
        decoding="async"
      />
      <p className="mkt-auth-redirect__text">Opening your account…</p>
    </main>
  );
}
