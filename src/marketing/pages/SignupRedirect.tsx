import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DASH_SIGNUP } from '../lib/billingCatalog';

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
    <main className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div>
        <p className="text-sm font-medium text-[#7C3AED]">TopEdge</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#0c1222]">
          Taking you to create your account
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign up on the dashboard. We’ll open the plan you picked so you can confirm it after you’re in.
        </p>
      </div>
    </main>
  );
}
