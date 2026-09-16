import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import '../styles/pricing.css';
import MarketingSEO from '../components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  softwareApplicationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import CycleToggle from '../components/pricing/CycleToggle';
import PlanGrid from '../components/pricing/PlanGrid';
import FeatureMatrix from '../components/pricing/FeatureMatrix';
import IncludedFeatures from '../components/pricing/IncludedFeatures';
import PricingFaq, { PRICING_FAQS } from '../components/pricing/PricingFaq';
import PricingSectionHead from '../components/pricing/PricingSectionHead';
import PricingRoiStrip from '../components/pricing/PricingRoiStrip';
import PricingSalesCta from '../components/pricing/PricingSalesCta';
import {
  BillingCatalog,
  BillingCycle,
  FALLBACK_CATALOG,
  GST_FOOTNOTE,
  fetchBillingCatalog,
} from '../lib/billingCatalog';

const ease = [0.22, 1, 0.36, 1] as const;

export default function PricingPage() {
  const [catalog, setCatalog] = useState<BillingCatalog>(FALLBACK_CATALOG);
  const [cycle, setCycle] = useState<BillingCycle>('yearly');
  const reduceMotion = useReducedMotion();

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

  const rise = (delay = 0) =>
    reduceMotion
      ? undefined
      : {
          initial: { opacity: 1, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease },
        };

  return (
    <>
      <MarketingSEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        path={seo.path}
        noSuffix
        faqSchema={faqSchema}
        jsonLd={[
          organizationJsonLd(),
          softwareApplicationJsonLd(),
          webPageJsonLd({
            name: 'Pricing',
            description: seo.description,
            path: seo.path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Pricing', path: '/pricing' },
          ]),
        ]}
      />
      <MarketingPage>
        <div className="mkt-pricing">
          <header className="mkt-pricing__hero">
            <motion.div {...rise(0)}>
              <PricingSectionHead
                as="h1"
                title="Priced by orders,"
                highlight="not guesswork."
                sub={
                  <>
                    Three plans built around how many orders you actually process —{' '}
                    <span className="mkt-psec__keep">100 to 1,500 a month.</span>
                  </>
                }
              />
            </motion.div>
          </header>

          <motion.div
            className="mkt-pricing__inner"
            id="plans"
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 1, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.55, delay: 0.2, ease },
                })}
          >
            <CycleToggle value={cycle} onChange={setCycle} />
            <PlanGrid plans={catalog.plans} cycle={cycle} />
            <div className="mkt-pricing__footnote">
              <p className="mkt-gst">{GST_FOOTNOTE} Prices are exclusive of tax.</p>
              {catalog.source === 'fallback' ? (
                <p className="mkt-fallback">Prices as of Aug 2026 · live catalog unavailable</p>
              ) : null}
            </div>

            <IncludedFeatures items={catalog.universalFeatures} />

            <FeatureMatrix plans={catalog.plans} cycle={cycle} />

            <PricingRoiStrip />

            <section className="mkt-pricing__block">
              <PricingSectionHead
                eyebrow="FAQ"
                title="Common"
                highlight="questions"
                sub="Billing, trial, and checkout — answered in one place."
              />
              <PricingFaq />
            </section>

            <PricingSalesCta />
          </motion.div>
        </div>
      </MarketingPage>
    </>
  );
}
