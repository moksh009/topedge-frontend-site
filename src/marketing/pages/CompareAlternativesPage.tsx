import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { COMPARE_ALTERNATIVES } from '../data/compareAlternatives';
import { breadcrumbJsonLd, organizationJsonLd, webPageJsonLd } from '../data/pageSeo';
import { compareTwoWayModifiedIso, updatedKicker } from '../data/contentDates';
import ProofBadges from '../components/ProofBadges';
import ReviewPlatforms from '../components/ReviewPlatforms';
import '../styles/compare.css';
import '../styles/topic-blocks.css';

/*
 * Shared by the head row and every body row so the columns line up. Below
 * 768px topic-blocks.css ignores this and restacks each row into a labelled
 * card, which is why every data cell carries a data-col attribute.
 */
const ALT_TABLE_COLS = 'minmax(0, 0.8fr) minmax(0, 1.6fr) minmax(0, 1.4fr) minmax(0, 0.6fr)';

const PATH = '/compare/alternatives';
const TITLE = 'Top 10 WhatsApp Alternatives for Shopify India (2026)';
const DESCRIPTION =
  'Compare 10 WhatsApp Business API platforms for Shopify India: WATI, AiSensy, Interakt, Bitespeed, Zoko, Gupshup, Getgabs, Kanal, Dondy and Updatrr.';

export default function CompareAlternativesPage() {
  const modifiedIso = compareTwoWayModifiedIso();

  return (
    <>
      <MarketingSEO
        title={TITLE}
        description={DESCRIPTION}
        keywords="WhatsApp automation alternatives, Bitespeed alternatives, WATI alternatives Shopify, Zoko alternative, Getgabs alternative, Kanal alternative, TopEdge compare"
        path={PATH}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'WhatsApp automation alternatives',
            description: DESCRIPTION,
            path: PATH,
            dateModified: modifiedIso,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Compare', path: '/compare' },
            { name: 'Alternatives', path: PATH },
          ]),
        ]}
      />
      <MarketingPage className="mkt-cmp">
        <header className="mkt-cmp__arena">
          <p className="mkt-cmp__kicker">
            Alternatives index
            <span className="mkt-cmp__asof">
              {' '}
              · <time dateTime={modifiedIso}>{updatedKicker(modifiedIso)}</time>
            </span>
          </p>
          <h1 className="mkt-cmp__h1">
            <span className="mkt-cmp__h1-brand">
              <img
                src="/brand-mark.png"
                alt=""
                aria-hidden
                width={28}
                height={28}
                className="mkt-cmp__h1-mark"
                decoding="async"
              />
              <span className="mkt-cmp__h1-name">
                TopEdge <span>AI</span>
              </span>
            </span>
            <span className="mkt-cmp__h1-vs">·</span>
            <span className="mkt-cmp__h1-rest">All 10 Shopify India alternatives</span>
          </h1>
          <div className="mkt-cmp__proof">
            <ProofBadges compact />
          </div>
        </header>

        {/*
          The decision table. This page was a logo directory with one line each
          at 446 words, so a buyer comparing platforms had to open ten child
          pages before learning anything. Every cell here is condensed from the
          per-competitor research already in compareFeatureMatrix.ts, so the
          table adds no claim the child page does not already carry and date.

          The currency column earns its place: four of these ten bill an Indian
          merchant in USD or EUR, so the real monthly cost moves with the
          exchange rate. That is a cost nobody puts in a pricing table.
        */}
        <section className="mkt-cmp__block" aria-labelledby="alt-table">
          <div className="mkt-cmp__block-head">
            <h2 id="alt-table">
              Entry price and <span className="mkt-cmp__hl">Meta markup</span>, side by side
            </h2>
          </div>
          <p className="mkt-cmp__fine" style={{ maxWidth: '44rem', marginBottom: '1.25rem' }}>
            What each platform charges to start, what it adds on top of Meta&rsquo;s own
            per-message fees, and what it bills you in. Published figures as researched, not
            quotes we were given. Check any number against the vendor&rsquo;s live pricing page
            before you buy, because these move.
          </p>

          <div className="mkt-spec" role="table" aria-label="WhatsApp platform entry price and markup">
            <div
              className="mkt-spec__row mkt-spec__row--head"
              role="row"
              style={{ gridTemplateColumns: ALT_TABLE_COLS }}
            >
              <div role="columnheader" className="mkt-spec__cell mkt-spec__cell--label">
                Platform
              </div>
              <div role="columnheader" className="mkt-spec__cell">
                Entry price, as published
              </div>
              <div role="columnheader" className="mkt-spec__cell">
                On top of Meta fees
              </div>
              <div role="columnheader" className="mkt-spec__cell">
                Billed in
              </div>
            </div>

            <div
              className="mkt-spec__row"
              role="row"
              style={{ gridTemplateColumns: ALT_TABLE_COLS }}
            >
              <div role="rowheader" className="mkt-spec__cell mkt-spec__cell--label mkt-spec__cell--mine">
                TopEdge AI
              </div>
              <div role="cell" data-col="Entry price, as published" className="mkt-spec__cell mkt-spec__cell--mine">
                ₹1,999/mo, or ₹1,599/mo billed yearly, plus 18% GST. 14-day trial, no card.
              </div>
              <div role="cell" data-col="On top of Meta fees" className="mkt-spec__cell mkt-spec__cell--mine">
                Nothing. Meta bills your own account direct at 0% markup.
              </div>
              <div role="cell" data-col="Billed in" className="mkt-spec__cell mkt-spec__cell--mine">
                INR
              </div>
            </div>

            {COMPARE_ALTERNATIVES.map((a) => (
              <div
                key={a.slug}
                className="mkt-spec__row"
                role="row"
                style={{ gridTemplateColumns: ALT_TABLE_COLS }}
              >
                <div role="rowheader" className="mkt-spec__cell mkt-spec__cell--label">
                  <Link to={a.href} className="mkt-cmp-alt__tablelink">
                    {a.name}
                  </Link>
                </div>
                <div role="cell" data-col="Entry price, as published" className="mkt-spec__cell">
                  {a.entryPrice}
                </div>
                <div role="cell" data-col="On top of Meta fees" className="mkt-spec__cell">
                  {a.markup}
                </div>
                <div role="cell" data-col="Billed in" className="mkt-spec__cell">
                  {a.currency}
                </div>
              </div>
            ))}
          </div>

          <p className="mkt-spec__footnote">
            Researched between September and October 2026; each platform&rsquo;s own board carries
            the exact date and the footnotes. &ldquo;Not published&rdquo; means the vendor does not
            state a figure publicly, not that it is free. Meta&rsquo;s own India rates are ₹0.8631
            per marketing message and ₹0.1150 per utility or authentication message, billed by Meta
            on delivery, and every platform above pays the same ones.
          </p>
        </section>

        <section className="mkt-cmp__block" aria-labelledby="alt-intro">
          <div className="mkt-cmp__block-head">
            <h2 id="alt-intro">
              WhatsApp tools people <span className="mkt-cmp__hl">compare</span>
            </h2>
          </div>
          <p className="mkt-cmp__fine" style={{ maxWidth: '42rem', marginBottom: '1.25rem' }}>
            One honest line per competitor. Open the full board for pricing footnotes, scorecards,
            and plan tables. Figures are verified against each vendor’s live pricing or Shopify
            listing when we publish, and still need a live check before you buy.
          </p>

          <ul className="mkt-cmp-alt__list">
            {COMPARE_ALTERNATIVES.map((a) => (
              <li key={a.slug}>
                <Link to={a.href} className="mkt-cmp-alt__row">
                  <span className="mkt-cmp-alt__brand">
                    <img src={a.logo} alt={`${a.name} logo`} width={28} height={28} decoding="async" />
                    <strong>{a.name}</strong>
                  </span>
                  <span className="mkt-cmp-alt__line">{a.oneLiner}</span>
                  <span className="mkt-cmp-alt__cta">
                    vs TopEdge AI
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/*
          Four questions, not a feature list. A buyer comparing WhatsApp
          platforms gets caught by the same things every time, and none of them
          are on a pricing page: the markup, the currency, the minimum, and
          whether the tool can read a Shopify order at all.
        */}
        <section className="mkt-cmp__block" aria-labelledby="alt-how">
          <div className="mkt-cmp__block-head">
            <h2 id="alt-how">
              How to compare these <span className="mkt-cmp__hl">without getting caught</span>
            </h2>
          </div>
          <p className="mkt-cmp__fine" style={{ maxWidth: '44rem', marginBottom: '1.25rem' }}>
            The monthly plan price is rarely what decides the bill. Four questions catch most of
            the difference, and you can answer all four from a vendor&rsquo;s own pricing page in
            about ten minutes.
          </p>

          <ol className="mkt-steps">
            <li className="mkt-steps__item">
              <span className="mkt-steps__n" aria-hidden>
                1
              </span>
              <div>
                <h3 className="mkt-steps__title">Does it add anything on top of Meta&rsquo;s fees?</h3>
                <p className="mkt-steps__body">
                  Meta charges every platform the same India rates: ₹0.8631 per delivered
                  marketing message, ₹0.1150 per utility or authentication message. Some platforms
                  pass those straight through, some add a per-conversation or per-template fee on
                  top. At 20,000 utility messages a month, a markup of ₹0.05 a message is ₹1,000,
                  which can exceed the difference between two plan tiers. Ask for the all-in cost
                  at your real volume, not the plan price.
                </p>
              </div>
            </li>
            <li className="mkt-steps__item">
              <span className="mkt-steps__n" aria-hidden>
                2
              </span>
              <div>
                <h3 className="mkt-steps__title">What currency are you actually billed in?</h3>
                <p className="mkt-steps__body">
                  Four of the ten platforms above bill in USD or EUR. A $49.99 plan is not a fixed
                  Indian cost: it moves with the exchange rate, your card may add a foreign
                  transaction fee, and you cannot claim input credit the way you can on a rupee
                  invoice with GST on it. If you budget in rupees, price the plan in rupees.
                </p>
              </div>
            </li>
            <li className="mkt-steps__item">
              <span className="mkt-steps__n" aria-hidden>
                3
              </span>
              <div>
                <h3 className="mkt-steps__title">Is there a minimum you have to clear?</h3>
                <p className="mkt-steps__body">
                  Not every platform will take your store. At least one in this list asks for a
                  minimum monthly revenue before it will onboard you, and enterprise CPaaS vendors
                  often publish no tiers at all and route you to a sales quote. If you are doing
                  your first few hundred orders a month, check you are in the market before you
                  spend a week evaluating.
                </p>
              </div>
            </li>
            <li className="mkt-steps__item">
              <span className="mkt-steps__n" aria-hidden>
                4
              </span>
              <div>
                <h3 className="mkt-steps__title">Can it read a Shopify order, or only send messages?</h3>
                <p className="mkt-steps__body">
                  This is the line between a WhatsApp sender and a Shopify WhatsApp integration. If
                  the COD flag, the order number and the cart lines do not reach the tool, it
                  cannot confirm a COD order before dispatch, branch a journey on payment method,
                  or answer &ldquo;where is my order&rdquo; with the actual order. Test it with one
                  real order during the trial rather than taking the feature list on trust.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="mkt-cmp__block" aria-label="Related">
          <nav className="mkt-cmp__more" aria-label="Related">
            <Link to="/compare">All comparisons</Link>
            <Link to="/compare/topedge-vs-wati-vs-aisensy">3-way board</Link>
            <Link to="/blog/best-whatsapp-automation-tools-shopify-india">
              Best tools pillar
            </Link>
            <Link to="/pricing">TopEdge pricing</Link>
          </nav>
        </section>

        <section className="mkt-cmp__block" aria-label="Reviews">
          <ReviewPlatforms />
        </section>

        <MarketingCtaBand
          title="Try TopEdge AI on your store"
          subtitle="14-day free trial. Connect Shopify, approve templates, publish recovery."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
