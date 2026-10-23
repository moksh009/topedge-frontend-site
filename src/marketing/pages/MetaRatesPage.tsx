import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/pricing.css';
import '../styles/meta-rates.css';
import MarketingSEO from '../components/MarketingSEO';
import {
  PAGE_SEO,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
  articleJsonLd,
} from '../data/pageSeo';
import { pricingModifiedIso } from '../data/contentDates';
import MarketingPage from '../components/MarketingPage';
import PricingSectionHead from '../components/pricing/PricingSectionHead';
import PricingSalesCta from '../components/pricing/PricingSalesCta';
import CostCalculator from '../components/CostCalculator';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Meta's India rate card, in one place.
 *
 * This page exists because /pricing was carrying it. Two four-column rate
 * tables, a competitor markup board, a calculator and a sourcing footnote are
 * the right answer to "prove 0% markup", and they are the wrong thing to put
 * between a plan grid and a buy button: a visitor who came to read three
 * prices met a spreadsheet instead. The detail moves here, /pricing keeps a
 * three-figure summary and a link, and the page that has to convert stays
 * short.
 *
 * Every rate below is Meta's or a competitor's own published figure, read on
 * 21 October 2026 and recorded in src/data/sources.ts. Nothing here is a
 * TopEdge number except the ₹0 column.
 */

type Rate = {
  category: string;
  covers: string;
  rate: string;
  note?: string;
};

const RATE_CARD: Rate[] = [
  {
    category: 'Marketing',
    covers: 'Campaigns, drops, cart recovery, win-backs',
    rate: '₹0.8631',
    note: 'per delivered message',
  },
  {
    category: 'Utility',
    covers: 'Order, shipping and plain COD confirmations',
    rate: '₹0.1150',
    note: 'per delivered message',
  },
  {
    category: 'Authentication',
    covers: 'OTPs and verification codes',
    rate: '₹0.1150',
    note: 'per delivered message',
  },
  {
    category: 'Service',
    covers: 'Your replies inside the 24-hour window',
    rate: '₹0.1150',
    note: 'after 1,000 free a month, per number',
  },
];

type Markup = {
  who: string;
  line: string;
  rate: string;
  delta: string;
  tone: 'good' | 'bad';
};

const MARKUPS: Markup[] = [
  {
    who: 'TopEdge AI',
    line: 'Every line',
    rate: "Meta's published card, unchanged",
    delta: '0%',
    tone: 'good',
  },
  {
    who: 'AiSensy',
    line: 'Service replies past 1,000 a month',
    rate: '₹0.1450 against Meta’s ₹0.1150',
    delta: '+26.1%',
    tone: 'bad',
  },
  {
    who: 'Dondy',
    line: 'India messages',
    rate: '$0.01888 against Meta’s $0.0118',
    delta: '+60%',
    tone: 'bad',
  },
];

export default function MetaRatesPage() {
  const reduceMotion = useReducedMotion();
  const seo = PAGE_SEO.metaRates;
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
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'Meta WhatsApp rates for India',
            description: seo.description,
            path: seo.path,
            dateModified: modifiedIso,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Pricing', path: '/pricing' },
            { name: 'Meta rates', path: seo.path },
          ]),
          // A dated explainer of Meta's published India rate card, not a
          // product page: it reads as an article to a crawler, so it says so.
          articleJsonLd({
            headline: 'Meta WhatsApp rates for India',
            description: seo.description,
            path: seo.path,
            dateModified: modifiedIso,
            section: 'Pricing',
            keywords: seo.keywords,
          }),
        ]}
      />
      <MarketingPage>
        <div className="mkt-rates">
          <header className="mkt-rates__hero">
            <motion.div {...rise(0)}>
              <nav className="mkt-rates__crumb" aria-label="Breadcrumb">
                <Link to="/pricing">Pricing</Link>
                <span aria-hidden>/</span>
                <span>Meta rates</span>
              </nav>
              <PricingSectionHead
                as="h1"
                eyebrow="META FEES"
                title="Meta bills you directly."
                highlight="We add ₹0."
                sub="The India rate card you are charged on, what a platform markup costs when one is added to it, and a calculator that runs both on your own volume."
              />
            </motion.div>

            <motion.ul className="mkt-rates__stats" {...rise(0.08)}>
              <li>
                <b>₹0.8631</b>
                <span>Meta’s India marketing rate, per delivered message</span>
              </li>
              <li>
                <b>₹0.1150</b>
                <span>Utility, authentication and billable service replies</span>
              </li>
              <li className="is-accent">
                <b>₹0</b>
                <span>What TopEdge adds on top of either</span>
              </li>
            </motion.ul>
          </header>

          <div className="mkt-rates__inner">
            <section className="mkt-rates__block" aria-labelledby="rate-card">
              <PricingSectionHead
                id="rate-card"
                eyebrow="RATE CARD"
                title="What Meta charges in"
                highlight="India"
                sub="Meta prices the category, not the message. Marketing costs 7.5 times what utility costs, which is the single biggest lever on your bill."
              />
              <ul className="mkt-rates__cards">
                {RATE_CARD.map((r) => (
                  <li className="mkt-rates__card" key={r.category}>
                    <p className="mkt-rates__card-cat">{r.category}</p>
                    <p className="mkt-rates__card-rate">
                      {r.rate}
                      {r.note ? <span>{r.note}</span> : null}
                    </p>
                    <p className="mkt-rates__card-covers">{r.covers}</p>
                    <p className="mkt-rates__card-add">
                      <span className="mkt-rates__tick" aria-hidden>
                        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      TopEdge adds ₹0
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mkt-rates__note">
                Add 18% GST on top. Volume tiers exist but start at 25,000,000 utility messages a
                month, so almost no Indian D2C brand reaches them.
              </p>
            </section>

            <section className="mkt-rates__block" aria-labelledby="markup">
              <PricingSectionHead
                id="markup"
                eyebrow="MARKUPS"
                title="What a markup costs when a platform"
                highlight="adds one"
                sub="Only the Meta line is shown here. Subscription fees are left out on purpose, because a markup can only hide in the per-message line."
              />
              <ul className="mkt-rates__markups">
                {MARKUPS.map((m) => (
                  <li
                    className={`mkt-rates__markup${m.tone === 'good' ? ' is-good' : ''}`}
                    key={m.who}
                  >
                    <div className="mkt-rates__markup-who">
                      <p>{m.who}</p>
                      <span>{m.line}</span>
                    </div>
                    <p className="mkt-rates__markup-rate">{m.rate}</p>
                    <p className="mkt-rates__markup-delta">{m.delta}</p>
                  </li>
                ))}
              </ul>
              <p className="mkt-rates__note">
                Competitor rates are each vendor’s own published figure, applied only to the line
                that vendor publishes a rate for.
              </p>
            </section>

            <section className="mkt-rates__block" aria-labelledby="calc">
              <PricingSectionHead
                id="calc"
                eyebrow="CALCULATOR"
                title="Run it on"
                highlight="your own volume"
                sub="Nothing is gated and nothing is sent anywhere. It is Meta’s rate card doing the multiplication."
              />
              <CostCalculator calc="whatsapp-bill">
                <p>
                  At 10,000 marketing, 10,000 utility and 5,000 service replies a month, Meta’s own
                  bill is ₹10,241 before GST, or about ₹12,084 with 18% GST. We add ₹0 to every line
                  of it.
                </p>
              </CostCalculator>
            </section>

            <section className="mkt-rates__block" aria-labelledby="verify">
              <PricingSectionHead
                id="verify"
                eyebrow="VERIFY IT"
                title="The ten-minute test that settles"
                highlight="any 0% claim"
                sub="Ours included. It is the only check that does not depend on a vendor being honest with you."
              />
              <ol className="mkt-rates__steps">
                <li>
                  <b>Take one month.</b> Open the per-conversation total on your platform invoice.
                </li>
                <li>
                  <b>Open Meta Business Manager.</b> Find the same total for the same date range.
                </li>
                <li>
                  <b>Compare them.</b> They match: your platform passes Meta through at cost. The
                  platform line is higher: the difference is the markup, and now you know its size.
                  You cannot produce the comparison because you buy credits: that is its own answer.
                </li>
              </ol>
            </section>

            <section className="mkt-rates__block mkt-rates__block--links">
              <div className="mkt-rates__links">
                <Link className="mkt-rates__link" to="/pricing">
                  <span className="mkt-rates__link-eyebrow">Plans</span>
                  <span className="mkt-rates__link-title">TopEdge pricing, by order volume</span>
                  <span className="mkt-rates__link-sub">
                    Three plans from ₹1,999 a month, and what each one includes.
                  </span>
                </Link>
                <a className="mkt-rates__link" href="/blog/whatsapp-business-api-pricing-india">
                  <span className="mkt-rates__link-eyebrow">Guide</span>
                  <span className="mkt-rates__link-title">
                    WhatsApp Business API pricing in India
                  </span>
                  <span className="mkt-rates__link-sub">
                    The October 2026 changes, the 7.5x template trap and the INR billing deadline.
                  </span>
                </a>
              </div>
              <p className="mkt-rates__note mkt-rates__note--source">
                Meta rates read off{' '}
                <a
                  href="https://developers.facebook.com/docs/whatsapp/pricing/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Meta’s WhatsApp pricing documentation
                </a>{' '}
                on 21 October 2026, before 18% GST. Competitor figures come from each vendor’s own
                published pricing page on the same date. Meta can revise rates up to four times a
                year, and the card inside your own Business Manager is the number that will match
                your invoice. Separately, every eligible Indian WhatsApp Business Account must be on
                INR billing by 31 December 2026 or Meta stops delivery on 1 January 2027.
              </p>
            </section>

            <PricingSalesCta />
          </div>
        </div>
      </MarketingPage>
    </>
  );
}
