import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import TrustpilotProof, { TrustpilotScore } from '../components/TrustpilotProof';
import HomeTrust from '../components/home/HomeTrust';
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
                title="Shopify WhatsApp pricing, priced by orders,"
                highlight="with 0% Meta markup."
                sub={
                  <>
                    Three plans built around how many orders you actually process:{' '}
                    <span className="mkt-psec__keep">100 to 1,500 a month.</span>
                  </>
                }
              />
            </motion.div>

            {/* The rating and the customer marks sit with the headline rather
                than at the bottom of the page. Someone who lands on /pricing
                from an ad has already decided to judge the number; who else is
                paying it is the question they ask in the same breath. */}
            <motion.div className="mkt-pricing__proof" {...rise(0.1)}>
              <TrustpilotScore compact />
              <div className="mkt-pricing__proof-logos">
                <HomeTrust onStage />
              </div>
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

            <TrustpilotProof intro="Published reviews from Shopify brands running TopEdge, quoted as written." />

            <FeatureMatrix plans={catalog.plans} cycle={cycle} />

            {/* The Meta rate card used to live here in full: two four-column
                tables, a markup board, a calculator and a sourcing footnote.
                It is the right proof and it was in the wrong place, between a
                plan grid and a buy button. Three figures and a link now, the
                detail on /pricing/meta-rates. */}
            <section className="mkt-pricing__block" aria-labelledby="meta-fees">
              <PricingSectionHead
                id="meta-fees"
                eyebrow="META FEES"
                title="Meta bills you directly."
                highlight="We add ₹0."
                sub="Your WhatsApp messages are charged by Meta to your own Business Account at its published India rates. We never sit in the middle of that line."
              />
              <ul className="mkt-pricing__meta-figures">
                <li>
                  <b>₹0.8631</b>
                  <span>Marketing, per delivered message</span>
                </li>
                <li>
                  <b>₹0.1150</b>
                  <span>Utility, authentication and service</span>
                </li>
                <li className="is-accent">
                  <b>₹0</b>
                  <span>Our markup on either</span>
                </li>
              </ul>
              <p className="mkt-pricing__meta-link">
                <Link to="/pricing/meta-rates">
                  See the full rate card, markup comparison and cost calculator
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </p>
            </section>

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
