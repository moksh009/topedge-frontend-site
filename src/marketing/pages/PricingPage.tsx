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

            <TrustpilotProof intro="Published reviews from merchants running TopEdge on Shopify." />

            <FeatureMatrix plans={catalog.plans} cycle={cycle} />

            <section className="mkt-pricing__block">
              <PricingSectionHead
                eyebrow="META FEES"
                title="What 0% markup means"
                highlight="in rupees."
                sub="Meta bills your own Business Account at its published India rates. We add nothing to that line."
              />
              <div className="mkt-pricing__plan-text">
                <p className="mkt-pricing__plan-text-head">
                  Meta&rsquo;s India rate card, passed through at cost
                </p>
                <div className="mkt-pricing__text-table-wrap">
                  <table className="mkt-pricing__text-table">
                    <thead>
                      <tr>
                        <th scope="col">Message category</th>
                        <th scope="col">What it covers</th>
                        <th scope="col">Meta India rate</th>
                        <th scope="col">What TopEdge adds</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Marketing</th>
                        <td data-label="Covers">Campaigns, cart recovery, win-backs</td>
                        <td data-label="Meta rate">&#8377;0.8631 per delivered message</td>
                        <td data-label="We add">&#8377;0</td>
                      </tr>
                      <tr>
                        <th scope="row">Utility</th>
                        <td data-label="Covers">Order, shipping and COD confirmations</td>
                        <td data-label="Meta rate">&#8377;0.1150 per delivered message</td>
                        <td data-label="We add">&#8377;0</td>
                      </tr>
                      <tr>
                        <th scope="row">Authentication</th>
                        <td data-label="Covers">OTPs and verification codes</td>
                        <td data-label="Meta rate">&#8377;0.1150 per delivered message</td>
                        <td data-label="We add">&#8377;0</td>
                      </tr>
                      <tr>
                        <th scope="row">Service</th>
                        <td data-label="Covers">Your replies inside the 24-hour window</td>
                        <td data-label="Meta rate">
                          First 1,000 a month free per number, then &#8377;0.1150
                        </td>
                        <td data-label="We add">&#8377;0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mkt-pricing__plan-text-head" style={{ marginTop: '1.75rem' }}>
                  What a markup costs at 10,000 marketing messages a month
                </p>
                <div className="mkt-pricing__text-table-wrap">
                  <table className="mkt-pricing__text-table">
                    <thead>
                      <tr>
                        <th scope="col">Billing approach</th>
                        <th scope="col">Rate applied</th>
                        <th scope="col">Your Meta-side bill</th>
                        <th scope="col">Difference</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Meta&rsquo;s card at 0% markup</th>
                        <td data-label="Rate">&#8377;0.8631 per message</td>
                        <td data-label="Bill">&#8377;8,631</td>
                        <td data-label="Difference">Baseline</td>
                      </tr>
                      <tr>
                        <th scope="row">Dondy&rsquo;s published India rate</th>
                        <td data-label="Rate">$0.01888 per message (about &#8377;1.38)</td>
                        <td data-label="Bill">About &#8377;13,810</td>
                        <td data-label="Difference">+&#8377;5,179 (+60%)</td>
                      </tr>
                      <tr>
                        <th scope="row">AiSensy&rsquo;s published service rate</th>
                        <td data-label="Rate">
                          &#8377;0.145 per service reply after 1,000 free, against Meta&rsquo;s
                          &#8377;0.1150
                        </td>
                        <td data-label="Bill">+&#8377;3,000 on 100,000 replies</td>
                        <td data-label="Difference">+26.1% on that line</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mkt-pricing__plan-text-note">
                  Meta rates read off{' '}
                  <a
                    href="https://developers.facebook.com/docs/whatsapp/pricing/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Meta&rsquo;s WhatsApp pricing documentation
                  </a>{' '}
                  on 21 October 2026, before 18% GST. Competitor figures come from each
                  vendor&rsquo;s own published pricing page on the same date and apply only to the
                  line each one publishes a rate for. Meta can revise rates up to four times a
                  year, and the card inside your own Business Manager is the number that will match
                  your invoice. Separately, every eligible Indian WhatsApp Business Account must be
                  on INR billing by 31 December 2026 or Meta stops delivery on 1 January 2027.{' '}
                  <a href="/blog/whatsapp-business-api-pricing-india">
                    Full India rate breakdown
                  </a>
                  .
                </p>
              </div>
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
