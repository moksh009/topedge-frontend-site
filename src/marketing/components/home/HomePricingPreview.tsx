import { Link } from 'react-router-dom';
import { plansForLine } from '../../data/planCatalog';
import { SectionHeading, MarketingCard, PrimaryButton } from '../ui';

export default function HomePricingPreview() {
  const plans = plansForLine('diy');

  return (
    <section className="home-story mkt-wash-soft">
      <div className="mx-auto max-w-[var(--mkt-max-wide)]">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Pricing"
            title="Start free. Scale when WhatsApp pays for itself."
            subtitle="Clear DIY plans on the homepage. Full DFY and Meta rates live on the pricing page."
            className="mb-0"
          />
          <PrimaryButton to="/pricing" className="shrink-0">
            Full pricing →
          </PrimaryButton>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <MarketingCard
              key={plan.id}
              className={`!p-8 ${plan.popular ? '!border-[#c4b5fd] !bg-white shadow-[0_24px_48px_-24px_rgba(124,58,237,0.25)]' : '!bg-white/90'}`}
            >
              {plan.popular && (
                <span className="mb-4 inline-flex rounded-full bg-[#f5f3ff] px-3 py-1 text-xs font-medium text-[#7C3AED]">
                  Most popular
                </span>
              )}
              <p className="text-lg font-medium text-[#0c1222]">{plan.name}</p>
              <p className="mt-4">
                <span className="mkt-kpi text-4xl text-[#0c1222]">{plan.priceLabel}</span>
                <span className="ml-1 text-sm text-slate-400">{plan.period}</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">{plan.description}</p>
              <Link
                to="/signup"
                className="mt-8 inline-flex text-sm font-medium text-[#7C3AED] hover:underline"
              >
                {plan.cta} →
              </Link>
            </MarketingCard>
          ))}
        </div>
      </div>
    </section>
  );
}
