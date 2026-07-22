import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { PageHero, Section, MarketingCard, PrimaryButton } from '../components/ui';
import {
  BILLING_PLANS,
  META_MESSAGE_RATES,
  PLAN_LINE_META,
  plansForLine,
  TRIAL_PLAN,
} from '../data/planCatalog';

function PlanSection({ line }: { line: 'diy' | 'dfy' }) {
  const meta = PLAN_LINE_META[line];
  const plans = plansForLine(line);

  return (
    <Section className="!py-10" id={line === 'diy' ? 'diy' : 'dfy'}>
      <div className="mb-8 max-w-2xl">
        <p className="mkt-eyebrow">{line === 'diy' ? 'Do it yourself' : 'Done for you'}</p>
        <h2 className="mkt-display mt-3 text-3xl font-medium text-[#0c1222]">{meta.label}</h2>
        <p className="mt-3 text-slate-500">{meta.subtitle}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <MarketingCard
            key={plan.id}
            className={`flex h-full flex-col !p-6 ${plan.popular ? 'border-[#c4b5fd] shadow-[0_20px_50px_-20px_rgba(124,58,237,0.25)]' : ''}`}
          >
            {plan.popular && (
              <span className="mb-4 inline-flex w-fit rounded-full bg-[#f5f3ff] px-3 py-1 text-xs font-medium text-[#7C3AED]">
                Most popular
              </span>
            )}
            <p className="text-lg font-medium text-[#0c1222]">{plan.name}</p>
            <p className="mt-3">
              <span className="mkt-kpi text-3xl font-medium text-[#0c1222]">{plan.priceLabel}</span>
              <span className="ml-1 text-sm text-slate-400">{plan.period}</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">{plan.description}</p>
            <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-600">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C3AED]" />
                  {feature}
                </li>
              ))}
            </ul>
            <PrimaryButton
              to={line === 'dfy' ? '/contact' : '/signup'}
              className="mt-8 w-full justify-center"
            >
              {plan.cta}
            </PrimaryButton>
          </MarketingCard>
        ))}
      </div>
    </Section>
  );
}

export default function PricingPage() {
  return (
    <>
      <MarketingSEO
        title="Pricing | TopEdge ,  WhatsApp growth OS for Shopify India"
        description="DIY and DFY pricing for Indian Shopify brands using WhatsApp for recovery, campaigns, inbox, and automation. Transparent Meta message rates."
        path="/pricing"
      />
      <MarketingPage>
        <PageHero
          eyebrow="Pricing"
          title="Start free. Scale when WhatsApp pays for itself."
          subtitle="Clear DIY and DFY plans, transparent Meta message rates, and a trial generous enough to validate real merchant workflows."
        />

        <Section className="!pt-0" wash="soft">
          <MarketingCard className="mx-auto max-w-3xl !p-6 text-center !bg-white/90">
            <p className="text-sm text-slate-500">
              Free trial includes{' '}
              <span className="font-medium text-[#0c1222]">{TRIAL_PLAN.days} days</span>,{' '}
              <span className="font-medium text-[#0c1222]">{TRIAL_PLAN.contacts} contacts</span>, and{' '}
              <span className="font-medium text-[#0c1222]">
                {TRIAL_PLAN.messages.toLocaleString('en-IN')} messages
              </span>
              . No credit card required.
            </p>
          </MarketingCard>
        </Section>

        <PlanSection line="diy" />
        <PlanSection line="dfy" />

        <Section id="roi-calculator" wash="soft" className="!py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mkt-eyebrow">Quick ROI check</p>
            <h2 className="mkt-display mt-3 text-3xl font-medium text-[#0c1222]">
              If you recover just a few carts a week, WhatsApp pays for itself
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Example: 40 abandoned carts/week · 10% recovery · ₹2,500 AOV → roughly{' '}
              <span className="mkt-kpi font-medium text-[#7C3AED]">₹40,000/week</span> recovered
              revenue ,  before counting campaigns and inbox efficiency. Meta utility messages stay
              near ₹0.13; marketing near ₹0.88. Your plan fee is the software layer on top.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3 text-left">
              {[
                { l: 'Trial', v: `${TRIAL_PLAN.days} days free` },
                { l: 'DIY from', v: BILLING_PLANS.find((p) => p.line === 'diy')?.priceLabel ?? '₹799' },
                { l: 'DFY', v: 'Talk to sales' },
              ].map((x) => (
                <MarketingCard key={x.l} className="!p-5">
                  <p className="text-xs uppercase tracking-wide text-slate-400">{x.l}</p>
                  <p className="mkt-kpi mt-1 text-lg font-medium text-[#0c1222]">{x.v}</p>
                </MarketingCard>
              ))}
            </div>
          </div>
        </Section>

        <Section subtle>
          <p className="mb-6 text-center mkt-eyebrow">Meta message rates (pass-through)</p>
          <div className="grid gap-6 lg:grid-cols-3">
            {META_MESSAGE_RATES.map((rate) => (
              <MarketingCard key={rate.category} className="!p-6">
                <p className="text-sm font-medium text-slate-500">{rate.category}</p>
                <p className="mkt-kpi mt-2 text-2xl font-medium text-[#0c1222]">{rate.rate}</p>
                <p className="mt-2 text-sm text-slate-500">{rate.note}</p>
              </MarketingCard>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-slate-400">
            Rates are indicative Meta India categories ,  TopEdge does not mark up Meta fees.
          </p>
        </Section>

        <MarketingCtaBand
          title="Need help choosing the right plan?"
          subtitle="Start on DIY if you want control. Choose DFY if you want templates, flows, and campaigns shipped for you."
          primaryLabel="Start free"
          primaryTo="/signup"
          secondaryLabel="Contact sales"
          secondaryTo="/contact"
        />
      </MarketingPage>
    </>
  );
}
