import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { COMPARE_FEATURE_MATRIX } from '../data/compareFeatureMatrix';
import { breadcrumbJsonLd, organizationJsonLd, webPageJsonLd } from '../data/pageSeo';
import '../styles/compare.css';

const PATH = '/compare/topedge-vs-wati-vs-aisensy';

const TITLE = 'TopEdge vs WATI vs AiSensy (2026) | WhatsApp Ecommerce Comparison';
const DESCRIPTION =
  'Three-way comparison: TopEdge vs WATI vs AiSensy on WhatsApp template markup, AI costs, intent routing, unified identity, COD → prepaid, analytics, warranty, journeys, and chatflow limits.';

const VENDORS = [
  {
    key: 'topedge' as const,
    name: 'TopEdge',
    tag: 'Shopify WhatsApp growth OS',
    logo: '/logo.png',
    href: '/signup',
    cta: 'Start free',
    external: false,
    highlight: true,
  },
  {
    key: 'wati' as const,
    name: 'WATI',
    tag: 'WhatsApp BSP',
    logo: '/marketing/compare/compare-logo-wati.png',
    href: 'https://www.wati.io',
    cta: 'Their site',
    external: true,
    highlight: false,
  },
  {
    key: 'aisensy' as const,
    name: 'AiSensy',
    tag: 'WhatsApp marketing platform',
    logo: '/marketing/compare/compare-logo-aisensy.svg',
    href: 'https://aisensy.com',
    cta: 'Their site',
    external: true,
    highlight: false,
  },
];

export default function CompareThreeWayPage() {
  return (
    <>
      <MarketingSEO
        title={TITLE}
        description={DESCRIPTION}
        keywords="TopEdge vs WATI vs AiSensy, WhatsApp automation comparison India, WATI vs AiSensy vs TopEdge, WhatsApp template markup, COD prepaid WhatsApp comparison"
        path={PATH}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({ name: 'TopEdge vs WATI vs AiSensy', description: DESCRIPTION, path: PATH }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Compare', path: '/compare' },
            { name: 'TopEdge vs WATI vs AiSensy', path: PATH },
          ]),
        ]}
      />
      <MarketingPage className="mkt-cmp">
        <header className="mkt-cmp__arena">
          <p className="mkt-cmp__kicker">Product comparison · 3-way</p>
          <h1 className="mkt-cmp__h1">
            TopEdge <span>vs</span> WATI <span>vs</span> AiSensy
          </h1>
          <p className="mkt-cmp__lede">
            One board for Meta markup, AI economics, intent routing, unified identity, COD → prepaid,
            analytics, warranty, journeys, and chatflow caps.
          </p>

          <div className="mkt-cmp__trio">
            {VENDORS.map((v) => (
              <div key={v.key} className={`mkt-cmp__brand${v.highlight ? ' is-te' : ''}`}>
                <img src={v.logo} alt="" width={44} height={44} className="mkt-cmp__brand-mark" />
                <div>
                  <p className="mkt-cmp__brand-name">{v.name}</p>
                  <p className="mkt-cmp__brand-tag">{v.tag}</p>
                </div>
                {v.external ? (
                  <a href={v.href} target="_blank" rel="noopener noreferrer" className="mkt-cmp__brand-cta">
                    {v.cta}
                  </a>
                ) : (
                  <Link to={v.href} className="mkt-cmp__brand-cta is-solid">
                    {v.cta}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </header>

        <section className="mkt-cmp__block" aria-label="Quick verdict">
          <div className="mkt-cmp__snap mkt-cmp__snap--trio">
            <div className="mkt-cmp__snap-col is-te">
              <p className="mkt-cmp__snap-label">Choose TopEdge when</p>
              <p className="mkt-cmp__snap-body">
                You want 0% Meta markup, BYOK AI, algorithmic intent routing, unified customer identity,
                COD → prepaid, warranty, and unlimited chatflows — native for Shopify India.
              </p>
            </div>
            <div className="mkt-cmp__snap-col">
              <p className="mkt-cmp__snap-label">Choose WATI when</p>
              <p className="mkt-cmp__snap-body">
                You need a broad WhatsApp BSP with keyword / rule triggers and accept platform usage
                charges plus monthly trigger caps.
              </p>
            </div>
            <div className="mkt-cmp__snap-col">
              <p className="mkt-cmp__snap-label">Choose AiSensy when</p>
              <p className="mkt-cmp__snap-body">
                You want WhatsApp marketing with credit / tier packaging and are fine with AI add-on fees
                and a flow builder that unlocks on higher plans.
              </p>
            </div>
          </div>
        </section>

        <section className="mkt-cmp__block" aria-labelledby="cmp-3way">
          <div className="mkt-cmp__block-head">
            <h2 id="cmp-3way">Full capability board</h2>
            <p>Thirteen features that decide total WhatsApp + ecommerce cost and ops depth.</p>
          </div>

          <div className="mkt-cmp__triple-wrap">
            <div className="mkt-cmp__triple" role="table" aria-label="TopEdge vs WATI vs AiSensy">
              <div className="mkt-cmp__triple-head" role="row">
                <span className="mkt-cmp__triple-cap" role="columnheader">
                  Feature
                </span>
                <span className="mkt-cmp__triple-col is-te" role="columnheader">
                  <img src="/logo.png" alt="" width={18} height={18} />
                  TopEdge
                </span>
                <span className="mkt-cmp__triple-col" role="columnheader">
                  <img src="/marketing/compare/compare-logo-wati.png" alt="" width={18} height={18} />
                  WATI
                </span>
                <span className="mkt-cmp__triple-col" role="columnheader">
                  <img src="/marketing/compare/compare-logo-aisensy.svg" alt="" width={18} height={18} />
                  AiSensy
                </span>
              </div>

              {COMPARE_FEATURE_MATRIX.map((row) => (
                <div key={row.id} className="mkt-cmp__triple-row" role="row">
                  <div className="mkt-cmp__triple-feat" role="rowheader">
                    <span className="mkt-cmp__board-feat">{row.name}</span>
                    {row.description ? <p className="mkt-cmp__board-desc">{row.description}</p> : null}
                  </div>
                  <div className="mkt-cmp__triple-cell is-te" role="cell" data-label="TopEdge">
                    {row.topedge}
                  </div>
                  <div className="mkt-cmp__triple-cell" role="cell" data-label="WATI">
                    {row.wati}
                  </div>
                  <div className="mkt-cmp__triple-cell" role="cell" data-label="AiSensy">
                    {row.aisensy}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mkt-cmp__fine mkt-cmp__fine--board">
            Claims reflect TopEdge product positioning vs publicly described WATI and AiSensy patterns.
            Confirm live fees, credits, and plan limits on each vendor’s site before purchase.
          </p>

          <nav className="mkt-cmp__more" aria-label="Pairwise comparisons">
            <Link to="/compare/wati">TopEdge vs WATI</Link>
            <Link to="/compare/aisensy">TopEdge vs AiSensy</Link>
            <Link to="/compare">All comparisons</Link>
            <Link to="/pricing">TopEdge pricing</Link>
          </nav>
        </section>

        <MarketingCtaBand
          title="Run WhatsApp growth without the markup tax"
          subtitle="0% template markup, BYOK AI, unified identity, and unlimited chatflows — start free on Shopify."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
