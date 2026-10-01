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
import { pricingModifiedIso } from '../data/contentDates';
import MarketingPage from '../components/MarketingPage';
import CycleToggle from '../components/pricing/CycleToggle';
import PlanGrid from '../components/pricing/PlanGrid';
import FeatureMatrix from '../components/pricing/FeatureMatrix';
import IncludedFeatures from '../components/pricing/IncludedFeatures';
import PricingFaq, { PRICING_FAQS } from '../components/pricing/PricingFaq';
import PricingSectionHead from '../components/pricing/PricingSectionHead';
import PricingSalesCta from '../components/pricing/PricingSalesCta';
import {
  BillingCatalog,
  BillingCycle,
  FALLBACK_CATALOG,
  GST_FOOTNOTE,
  TRIAL,
  dispatchLabel,
  fetchBillingCatalog,
  planPricing,
} from '../lib/billingCatalog';

const ease = [0.22, 1, 0.36, 1] as const;

export default function PricingPage() {
  const [catalog, setCatalog] = useState<BillingCatalog>(FALLBACK_CATALOG);
  const [cycle, setCycle] = useState<BillingCycle>('yearly');
  // Only ever true after a real client-side fetch came back without live data.
  // Starts false so the note can never reach prerendered / server HTML, where
  // `catalog` is still the un-fetched FALLBACK_CATALOG seed.
  const [catalogFetchFailed, setCatalogFetchFailed] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let alive = true;
    const isPrerender = Boolean(
      (window as Window & { __TOPEDGE_PRERENDER__?: boolean }).__TOPEDGE_PRERENDER__,
    );
    fetchBillingCatalog()
      .then((live) => {
        if (!alive) return;
        setCatalog(live);
        setCycle(live.defaultCycle || 'yearly');
      // fetchBillingCatalog swallows errors and hands back FALLBACK_CATALOG, so a
      // resolved catalog still marked 'fallback' *is* the failure signal. Never
      // surface it during prerender: that HTML is what crawlers read.
        setCatalogFetchFailed(!isPrerender && live.source === 'fallback');
      })
      // fetchBillingCatalog already swallows its own errors, so this only guards
      // against an unexpected throw in the setState path above.
      .catch(() => {
        if (!alive) return;
        setCatalogFetchFailed(!isPrerender);
      });
    return () => {
      alive = false;
    };
  }, []);

  const seo = PAGE_SEO.pricing;
  const faqSchema = PRICING_FAQS.map((f) => ({ question: f.q, answer: f.a }));
  const modifiedIso = pricingModifiedIso();

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
            dateModified: modifiedIso,
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
                    Three plans built around how many orders you actually process , {' '}
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
              {catalogFetchFailed ? (
                <p className="mkt-fallback">
                  Live pricing is unavailable right now · showing our last published prices
                </p>
              ) : null}
            </div>

            <IncludedFeatures items={catalog.universalFeatures} />

            {/*
              Plain-text plan summary. Every value is read from the catalog, so it
              cannot drift from the cards above, and it stays in the DOM at every
              breakpoint for crawlers and LLMs that do not run the cycle toggle.
            */}
            <section className="mkt-pricing__plan-text" aria-labelledby="plan-summary-head">
              <h2 className="mkt-pricing__plan-text-head" id="plan-summary-head">
                Plan summary
              </h2>
              <div className="mkt-pricing__text-table-wrap">
                <table className="mkt-pricing__text-table">
                  <thead>
                    <tr>
                      <th scope="col">Plan</th>
                      <th scope="col">Monthly</th>
                      <th scope="col">Yearly (per month)</th>
                      <th scope="col">Orders / month</th>
                      <th scope="col">Journey Branch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalog.plans.map((p) => (
                      <tr key={p.slug}>
                        <th scope="row">{p.displayName}</th>
                        <td data-label="Monthly">{p.monthlyPriceLabel}/mo</td>
                        <td data-label="Yearly (per month)">
                          {planPricing(p, 'yearly').effectiveMonthlyLabel}/mo ({p.yearlyPriceLabel}
                          /yr)
                        </td>
                        <td data-label="Orders / month">
                          {Number(p.ordersPerCycle).toLocaleString('en-IN')}
                        </td>
                        <td data-label="Journey Branch">
                          {p.features.journeyBranch ? 'Yes' : 'No — Growth and Scale only'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="mkt-pricing__plan-text-list">
                {catalog.plans.map((p) => (
                  <li key={p.slug}>
                    <strong>{p.displayName}:</strong>{' '}
                    {Number(p.campaignEmailSendsPerCycle).toLocaleString('en-IN')} campaign + email
                    sends / month · COD → prepaid:{' '}
                    {p.features.journeyCodPrepaid ? 'Yes' : 'No'} ·{' '}
                    {dispatchLabel(p.features.dispatchPriority)}
                  </li>
                ))}
              </ul>
              <p className="mkt-pricing__plan-text-note">
                Every plan includes a {catalog.trialDays || TRIAL.days}-day free trial. {GST_FOOTNOTE} Meta WhatsApp
                Cloud API messaging is billed separately at Meta&rsquo;s published per-message
                rates, passed through at 0% markup.
              </p>
            </section>

            <FeatureMatrix plans={catalog.plans} cycle={cycle} />

            <section className="mkt-pricing__block">
              <PricingSectionHead
                eyebrow="FAQ"
                title="Common"
                highlight="questions"
                sub="Billing, trial, and checkout, answered in one place."
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
