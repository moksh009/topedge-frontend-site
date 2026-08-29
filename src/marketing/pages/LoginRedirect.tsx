import { useEffect } from 'react';
import { DASH_LOGIN } from '../lib/billingCatalog';

const ALLOWED_PLANS = new Set(['launch', 'growth', 'scale']);
const ALLOWED_CYCLES = new Set(['monthly', 'quarterly', 'yearly', 'annual']);

export default function LoginRedirect() {
  useEffect(() => {
    const incoming = new URLSearchParams(window.location.search);
    const url = new URL(DASH_LOGIN);
    const plan = String(incoming.get('plan') || '').toLowerCase();
    const cycle = String(incoming.get('cycle') || '').toLowerCase();
    if (ALLOWED_PLANS.has(plan)) url.searchParams.set('plan', plan);
    if (ALLOWED_CYCLES.has(cycle)) url.searchParams.set('cycle', cycle === 'annual' ? 'yearly' : cycle);
    url.searchParams.set('from', 'www');
    window.location.replace(url.toString());
  }, []);

  return (
    <main className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div>
        <p className="text-sm font-medium text-[#7C3AED]">TopEdge</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#0c1222]">
          Taking you to sign in
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          After you sign in, we open the plan you picked so you can confirm checkout in the dashboard.
        </p>
      </div>
    </main>
  );
}
