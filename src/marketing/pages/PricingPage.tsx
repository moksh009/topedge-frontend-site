import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pricing.css';
import MarketingSEO from '../components/MarketingSEO';
import { PAGE_SEO } from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import CycleToggle from '../components/pricing/CycleToggle';
import PlanGrid from '../components/pricing/PlanGrid';
import FeatureMatrix from '../components/pricing/FeatureMatrix';
import IncludedFeatures from '../components/pricing/IncludedFeatures';
import RoiCalculator from '../components/pricing/RoiCalculator';
import PricingFaq, { PRICING_FAQS } from '../components/pricing/PricingFaq';
import {
  BillingCatalog,
  BillingCycle,
  FALLBACK_CATALOG,
  GST_FOOTNOTE,
  META_MESSAGE_RATES,
  SALES_MAILTO,
  TRIAL,
  fetchBillingCatalog,
} from '../lib/billingCatalog';

export default function PricingPage() {
  const [catalog, setCatalog] = useState<BillingCatalog>(FALLBACK_CATALOG);
  const [cycle, setCycle] = useState<BillingCycle>('yearly');

  useEffect(() => {
    let alive = true;
    fetchBillingCatalog().then((live) => {
      if (!alive) return;
      setCatalog(live);
      setCycle(live.defaultCycle || 'yearly');
    });
    return () => {
      alive = false;
    };
  }, []);

  const seo = PAGE_SEO.pricing;
  const faqSchema = PRICING_FAQS.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <>
      <MarketingSEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        path={seo.path}
        faqSchema={faqSchema}
      />
      <MarketingPage>
        <div className="mkt-pricing">
          <header className="mkt-pricing__hero">
            <p className="mkt-pricing__eyebrow">Pricing</p>
            <h1 className="mkt-pricing__title">
              Start free for 14 days. Pay when WhatsApp is making money.
            </h1>
            <p className="mkt-pricing__sub">
              You’ll pick Launch, Growth, or Scale after signup. Checkout stays in the dashboard.
              This page never opens Razorpay.
            </p>
            <div className="mkt-pricing__actions">
              <Link className="mkt-pricing__cta mkt-pricing__cta--solid" to="/signup">
                Start free
              </Link>
              <a className="mkt-pricing__cta mkt-pricing__cta--ghost" href="#plans">
                See plans
              </a>
            </div>
            <p className="mkt-pricing__note">
              Trial: {TRIAL.days} days · {TRIAL.orders} orders · {TRIAL.sends} campaign + email
              sends.
            </p>
          </header>

          <div className="mkt-pricing__inner" id="plans">
            <CycleToggle value={cycle} onChange={setCycle} />
            <PlanGrid plans={catalog.plans} cycle={cycle} />
            <p className="mkt-gst">{GST_FOOTNOTE} Prices are taxable / exclusive.</p>
            {catalog.source === 'fallback' ? (
              <p className="mkt-fallback">Prices as of Aug 2026. Live catalog unavailable.</p>
            ) : null}

            <IncludedFeatures items={catalog.universalFeatures} />

            <section className="mkt-pricing__block">
              <h2 className="mkt-pricing__h2">Compare what changes</h2>
              <p className="mkt-pricing__lead">
                Shared hubs — Live Chat, CRM, Flow Builder, campaigns, pixel — sit on every plan.
              </p>
              <FeatureMatrix plans={catalog.plans} />
            </section>

            <section className="mkt-pricing__block">
              <h2 className="mkt-pricing__h2">Meta rates</h2>
              <p className="mkt-pricing__lead">
                Pass-through India rates (Jul 2025). Never billed per conversation.
              </p>
              <div className="mkt-rates">
                {META_MESSAGE_RATES.map((rate) => (
                  <article key={rate.category} className="mkt-rate">
                    <p className="mkt-rate__cat">{rate.category}</p>
                    <p className="mkt-rate__val">{rate.rate}</p>
                    <p className="mkt-rate__note">{rate.note}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mkt-pricing__block" id="roi-calculator">
              <h2 className="mkt-pricing__h2">Recovery math</h2>
              <p className="mkt-pricing__lead">
                Orders × AOV × abandon % × recovery lift. Dashboard shows zeros until you connect.
              </p>
              <RoiCalculator />
            </section>

            <section className="mkt-pricing__block">
              <h2 className="mkt-pricing__h2">Questions founders ask</h2>
              <PricingFaq />
            </section>

            <section className="mkt-pricing__block">
              <div className="mkt-dfy">
                <div>
                  <h3>Need a named Growth Manager?</h3>
                  <p>
                    Done-for-you is optional. Templates, flows, and campaigns shipped with you. It
                    is not a fourth DIY tier.
                  </p>
                </div>
                <a className="mkt-pricing__cta mkt-pricing__cta--solid" href={SALES_MAILTO}>
                  Talk to sales
                </a>
              </div>
            </section>
          </div>

          <div className="mkt-pricing__dock">
            <Link
              className="mkt-pricing__cta mkt-pricing__cta--solid"
              to="/signup"
            >
              Start free
            </Link>
            <a className="mkt-pricing__cta mkt-pricing__cta--ghost" href="#plans">
              See plans
            </a>
          </div>
        </div>
      </MarketingPage>
    </>
  );
}
