import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '../ui';
import { diyPlans, formatInr } from '../../data/pricing';

export default function HomePricingPreview() {
  return (
    <section className="marketing-section-subtle py-20 md:py-28">
      <div className="marketing-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#7C3AED]/80">Pricing</p>
          <h2 className="mt-4 text-[1.875rem] leading-[1.1] tracking-[-0.035em] text-[#0c1222] md:text-[2.5rem]">
            Start free. Scale when WhatsApp pays for itself.
          </h2>
          <p className="mt-4 text-slate-500">Transparent plans in ₹ — upgrade when flows drive revenue.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {diyPlans.map((plan) => (
            <Link
              key={plan.id}
              to="/pricing"
              className={`home-plan group block ${plan.popular ? 'home-plan--popular' : ''}`}
            >
              {plan.popular && (
                <span className="mb-3 inline-block rounded-full bg-[#7C3AED] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-medium text-[#0c1222]">{plan.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{plan.tagline}</p>
              <p className="mt-4 text-3xl tracking-tight text-[#0c1222]">
                {formatInr(plan.priceMonthly)}
                <span className="text-sm font-normal text-slate-400">/mo</span>
              </p>
              <ul className="mt-6 space-y-2 border-t border-violet-100/80 pt-5">
                {plan.features.slice(0, 3).map((h) => (
                  <li key={h} className="flex items-start gap-2 text-[13px] text-slate-600">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7C3AED]" strokeWidth={2.5} />
                    {h}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-block text-sm font-medium text-[#7C3AED] group-hover:underline">
                View plan →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <PrimaryButton to="/pricing">View full pricing</PrimaryButton>
          <SecondaryButton to="/roi">Run calculator</SecondaryButton>
        </div>
      </div>
    </section>
  );
}
