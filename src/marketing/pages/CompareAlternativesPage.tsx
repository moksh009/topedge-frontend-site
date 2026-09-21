import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { COMPARE_ALTERNATIVES } from '../data/compareAlternatives';
import { breadcrumbJsonLd, organizationJsonLd, webPageJsonLd } from '../data/pageSeo';
import { compareTwoWayModifiedIso, updatedKicker } from '../data/contentDates';
import '../styles/compare.css';

const PATH = '/compare/alternatives';
const TITLE = 'WhatsApp Alternatives for Shopify | TopEdge Compare';
const DESCRIPTION =
  'Fair index of Shopify WhatsApp alternatives: WATI, AiSensy, Interakt, Bitespeed, Zoko, Getgabs, Kanal, and Dondy, with full TopEdge comparisons.';

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
                alt="TopEdge AI"
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
            <span className="mkt-cmp__h1-rest">Alternatives</span>
          </h1>
        </header>

        <section className="mkt-cmp__block" aria-labelledby="alt-intro">
          <div className="mkt-cmp__block-head">
            <h2 id="alt-intro">
              WhatsApp tools people <span className="mkt-cmp__hl">compare</span>
            </h2>
          </div>
          <p className="mkt-cmp__fine" style={{ maxWidth: '42rem', marginBottom: '1.25rem' }}>
            One honest line per competitor. Open the full board for pricing footnotes, scorecards,
            and plan tables — figures are verified against each vendor’s live pricing or Shopify
            listing when we publish, and still need a live check before you buy.
          </p>

          <ul className="mkt-cmp-alt__list">
            {COMPARE_ALTERNATIVES.map((a) => (
              <li key={a.slug}>
                <Link to={a.href} className="mkt-cmp-alt__row">
                  <span className="mkt-cmp-alt__brand">
                    <img src={a.logo} alt="" width={28} height={28} decoding="async" />
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
