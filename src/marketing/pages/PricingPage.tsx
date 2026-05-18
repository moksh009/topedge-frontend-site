import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import SEO from '../../components/SEO';
import RoiCalculator from '../components/RoiCalculator';
import MarketingCtaBand from '../components/MarketingCtaBand';
import {
  Section,
  SectionHeading,
  PrimaryButton,
  MarketingCard,
  FaqAccordion,
  PageHero,
  StatusBadge,
} from '../components/ui';
import {
  diyPlans,
  dfyPlans,
  diyComparisonRows,
  pricingFaqs,
  formatInr,
} from '../data/pricing';
import { Reveal } from '../components/motion';
import MarketingPage from '../components/MarketingPage';

export default function PricingPage() {
  const [tab, setTab] = useState<'diy' | 'dfy'>('diy');
  const [yearly, setYearly] = useState(false);
  const plans = tab === 'diy' ? diyPlans : dfyPlans;

  const price = (monthly: number) => {
    if (monthly === 0) return 0;
    return yearly ? Math.round(monthly * 0.8) : monthly;
  };

  return (
    <>
      <SEO
        title="Pricing | TopEdge — WhatsApp automation for Shopify India"
        description="Transparent ₹ pricing. Start free, scale with cart recovery and campaigns. DIY or fully managed."
      />
      <MarketingPage>
        <PageHero
          eyebrow="Pricing"
          title="Plans that pay for themselves from recovered carts"
          subtitle="Start on Freemium. Move to Growth when WhatsApp drives revenue. DFY if you want us to run Meta and flows for you."
        >
          <div className="inline-flex rounded-full border border-violet-200/80 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setTab('diy')}
              className={`marketing-pricing-tab ${tab === 'diy' ? 'marketing-pricing-tab--active' : 'marketing-pricing-tab--inactive'}`}
            >
              DIY — self serve
            </button>
            <button
              type="button"
              onClick={() => setTab('dfy')}
              className={`marketing-pricing-tab ${tab === 'dfy' ? 'marketing-pricing-tab--active' : 'marketing-pricing-tab--inactive'}`}
            >
              DFY — we run it
            </button>
          </div>

          {tab === 'diy' && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className={`text-sm ${!yearly ? 'font-medium text-[#0c1222]' : 'text-slate-400'}`}>Monthly</span>
              <button
                type="button"
                onClick={() => setYearly((v) => !v)}
                className={`relative h-7 w-12 rounded-full transition ${yearly ? 'bg-[#7C3AED]' : 'bg-violet-200'}`}
                aria-label="Toggle yearly billing"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${yearly ? 'left-6' : 'left-1'}`}
                />
              </button>
              <span className={`text-sm ${yearly ? 'font-medium text-[#0c1222]' : 'text-slate-400'}`}>
                Yearly <StatusBadge tone="emerald">−20%</StatusBadge>
              </span>
            </div>
          )}
        </PageHero>

        <section className="pb-16 md:pb-20">
          <div className="marketing-container grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <MarketingCard
                key={plan.id}
                className={`marketing-premium-card relative flex flex-col ${
                  plan.popular ? 'marketing-plan-popular' : ''
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6d28d9] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white shadow-md">
                    {tab === 'diy' ? 'Most chosen' : 'Recommended'}
                  </span>
                )}
                <h3 className="text-lg font-medium text-[#0c1222]">{plan.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{plan.tagline}</p>
                <p className="mt-6 text-4xl tracking-tight text-[#0c1222]">
                  {formatInr(price(plan.priceMonthly))}
                  <span className="text-sm font-normal text-slate-400">/mo</span>
                </p>
                {'priceWas' in plan && typeof plan.priceWas === 'number' && (
                  <p className="text-xs text-slate-400 line-through">was {formatInr(plan.priceWas)}/mo</p>
                )}
                {'contacts' in plan && typeof plan.contacts === 'string' && (
                  <p className="mt-1 text-xs text-slate-500">{plan.contacts} contacts</p>
                )}
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-violet-100/80 pt-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7C3AED]" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <PrimaryButton to={tab === 'dfy' ? '/contact' : '/signup'} className="w-full justify-center">
                    {plan.cta}
                  </PrimaryButton>
                </div>
              </MarketingCard>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-xl px-4 text-center text-xs text-slate-400">
            All plans include native WhatsApp Meta API · Early Bird on Growth & Scale ·{' '}
            <Link to="/roi" className="font-medium text-[#7C3AED] hover:underline">
              Estimate your ROI
            </Link>
          </p>
        </section>

        {tab === 'diy' && (
          <Section subtle className="!py-16">
            <SectionHeading
              eyebrow="Compare"
              title="What unlocks at each tier"
              subtitle="Freemium proves the channel. Growth runs recovery and campaigns. Scale adds API and dedicated support."
              center
            />
            <Reveal>
              <div className="marketing-table-scroll overflow-hidden rounded-2xl border border-violet-200/60 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-violet-100 bg-violet-50/50">
                      <th className="px-5 py-4 font-medium text-slate-500">Feature</th>
                      <th className="px-5 py-4 font-medium text-slate-600">Freemium</th>
                      <th className="px-5 py-4 font-medium text-[#7C3AED]">Growth</th>
                      <th className="px-5 py-4 font-medium text-slate-600">Scale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-violet-50">
                    {diyComparisonRows.map((row) => (
                      <tr key={row.feature} className="transition-colors hover:bg-violet-50/30">
                        <td className="px-5 py-3.5 font-medium text-[#0c1222]">{row.feature}</td>
                        <td className="px-5 py-3.5 text-slate-500">{row.freemium}</td>
                        <td className="px-5 py-3.5 font-medium text-slate-700">{row.growth}</td>
                        <td className="px-5 py-3.5 text-slate-500">{row.scale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </Section>
        )}

        <Section>
          <SectionHeading
            eyebrow="ROI"
            title="See if Growth pays for itself"
            subtitle="Most brands on 400+ monthly orders recover the subscription from one cart flow."
            center
          />
          <RoiCalculator compact />
        </Section>

        <Section subtle>
          <SectionHeading title="Pricing questions" center />
          <FaqAccordion items={pricingFaqs} />
        </Section>

        <MarketingCtaBand
          variant="light"
          title={tab === 'dfy' ? 'Elite brands get a dedicated growth pod' : 'Not sure which plan fits?'}
          subtitle={
            tab === 'dfy'
              ? 'Bespoke flows, Meta ads coordination, and private AI training for high-volume Shopify Plus stores.'
              : 'Book fifteen minutes — we will map your abandonment rate and recommend DIY vs DFY.'
          }
          primaryLabel="Talk to sales"
          primaryTo="/contact"
          secondaryLabel="Run ROI calculator"
          secondaryTo="/roi"
        />
      </MarketingPage>
    </>
  );
}
