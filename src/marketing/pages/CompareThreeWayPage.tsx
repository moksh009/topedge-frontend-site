import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import CompareStatus from '../components/compare/CompareStatus';
import { COMPARE_FEATURE_MATRIX } from '../data/compareFeatureMatrix';
import { breadcrumbJsonLd, organizationJsonLd, webPageJsonLd } from '../data/pageSeo';
import '../styles/compare.css';

const PATH = '/compare/topedge-vs-wati-vs-aisensy';

const TITLE = 'TopEdge vs WATI vs AiSensy (2026) | WhatsApp Ecommerce Comparison';
const DESCRIPTION =
  'Three-way comparison: TopEdge vs WATI vs AiSensy on WhatsApp template markup, AI costs, intent routing, unified identity, COD → prepaid, analytics, warranty, journeys, and chatflow limits.';

const LOGO_WATI = '/marketing/compare/compare-logo-wati.png';
const LOGO_AISENSY = '/marketing/compare/compare-logo-aisensy.png';

export default function CompareThreeWayPage() {
  const [openRow, setOpenRow] = useState<string | null>(null);

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
          <p className="mkt-cmp__kicker">Comparison · 3-way</p>
          <h1 className="mkt-cmp__h1 mkt-cmp__h1--trio">
            <span className="mkt-cmp__h1-brand">
              <img
                src="/brand-mark.png"
                alt=""
                width={28}
                height={28}
                className="mkt-cmp__h1-mark"
                decoding="async"
              />
              <span className="mkt-cmp__h1-name">
                TopEdge <span>AI</span>
              </span>
            </span>
            <span className="mkt-cmp__h1-vs">vs</span>
            <span className="mkt-cmp__h1-peer">
              <img src={LOGO_WATI} alt="" width={28} height={28} decoding="async" />
              <span className="mkt-cmp__h1-peer-name">WATI</span>
            </span>
            <span className="mkt-cmp__h1-vs">vs</span>
            <span className="mkt-cmp__h1-peer">
              <img src={LOGO_AISENSY} alt="" width={28} height={28} decoding="async" />
              <span className="mkt-cmp__h1-peer-name">AiSensy</span>
            </span>
          </h1>
        </header>

        <section className="mkt-cmp__block" aria-label="Who it's for">
          <div className="mkt-cmp__pick mkt-cmp__pick--trio">
            <article className="mkt-cmp__pick-col is-te">
              <div className="mkt-cmp__pick-top">
                <img src="/logo.png" alt="" width={22} height={22} />
                <p className="mkt-cmp__pick-kicker">
                  Best with <span className="mkt-cmp__hl">TopEdge AI</span>
                </p>
              </div>
              <p className="mkt-cmp__pick-body">
                You want 0% Meta markup, BYOK AI, unified identity, COD → prepaid, warranty, and
                unlimited flows — native for Shopify India.
              </p>
            </article>
            <article className="mkt-cmp__pick-col">
              <div className="mkt-cmp__pick-top">
                <img src={LOGO_WATI} alt="" width={22} height={22} />
                <p className="mkt-cmp__pick-kicker">
                  Best with <span className="mkt-cmp__pick-peer">WATI</span>
                </p>
              </div>
              <p className="mkt-cmp__pick-body">
                You need a broad WhatsApp BSP with keyword automations and can live with usage charges
                plus monthly trigger caps.
              </p>
            </article>
            <article className="mkt-cmp__pick-col">
              <div className="mkt-cmp__pick-top">
                <img src={LOGO_AISENSY} alt="" width={22} height={22} />
                <p className="mkt-cmp__pick-kicker">
                  Best with <span className="mkt-cmp__pick-peer">AiSensy</span>
                </p>
              </div>
              <p className="mkt-cmp__pick-body">
                You want WhatsApp marketing with credit packaging and are fine gating AI / flows behind
                higher tiers.
              </p>
            </article>
          </div>
        </section>

        <section className="mkt-cmp__block" aria-labelledby="cmp-3way">
          <div className="mkt-cmp__block-head">
            <h2 id="cmp-3way">
              Capability <span className="mkt-cmp__hl">board</span>
            </h2>
          </div>

          <div className="mkt-cmp__triple-wrap">
            <div className="mkt-cmp__triple" role="table" aria-label="TopEdge vs WATI vs AiSensy">
              <div className="mkt-cmp__triple-head" role="row">
                <span className="mkt-cmp__triple-cap" role="columnheader">
                  Feature
                </span>
                <span className="mkt-cmp__triple-col is-te" role="columnheader">
                  <img src="/logo.png" alt="" width={18} height={18} />
                  TopEdge AI
                </span>
                <span className="mkt-cmp__triple-col" role="columnheader">
                  <img src={LOGO_WATI} alt="" width={18} height={18} />
                  WATI
                </span>
                <span className="mkt-cmp__triple-col" role="columnheader">
                  <img src={LOGO_AISENSY} alt="" width={18} height={18} />
                  AiSensy
                </span>
              </div>

              {COMPARE_FEATURE_MATRIX.map((row) => {
                const isOpen = openRow === row.id;
                return (
                  <div
                    key={row.id}
                    className={`mkt-cmp__triple-row${isOpen ? ' is-open' : ''}`}
                    role="row"
                  >
                    <div className="mkt-cmp__triple-main">
                      <div className="mkt-cmp__triple-feat" role="rowheader">
                        {row.description ? (
                          <button
                            type="button"
                            className="mkt-cmp__board-toggle"
                            aria-expanded={isOpen}
                            onClick={() => setOpenRow(isOpen ? null : row.id)}
                          >
                            <ChevronRight className="mkt-cmp__board-chevron" aria-hidden />
                            <span className="mkt-cmp__board-feat">{row.name}</span>
                          </button>
                        ) : (
                          <span className="mkt-cmp__board-feat">{row.name}</span>
                        )}
                      </div>
                      <div className="mkt-cmp__triple-cell is-te" role="cell" data-label="TopEdge AI">
                        <CompareStatus value={row.topedge} />
                      </div>
                      <div className="mkt-cmp__triple-cell" role="cell" data-label="WATI">
                        <CompareStatus value={row.wati} />
                      </div>
                      <div className="mkt-cmp__triple-cell" role="cell" data-label="AiSensy">
                        <CompareStatus value={row.aisensy} />
                      </div>
                    </div>
                    {row.description && isOpen ? (
                      <p className="mkt-cmp__triple-desc">{row.description}</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <nav className="mkt-cmp__more" aria-label="Pairwise comparisons">
            <Link to="/compare/wati">TopEdge AI vs WATI</Link>
            <Link to="/compare/aisensy">TopEdge AI vs AiSensy</Link>
            <Link to="/compare">All comparisons</Link>
            <Link to="/pricing">TopEdge AI pricing</Link>
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
