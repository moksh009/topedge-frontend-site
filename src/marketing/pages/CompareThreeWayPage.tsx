import { Link } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import CompareStatus from '../components/compare/CompareStatus';
import CompareFaq from '../components/compare/CompareFaq';
import { THREE_WAY_FEATURE_MATRIX } from '../data/compareFeatureMatrix';
import { breadcrumbJsonLd, organizationJsonLd, webPageJsonLd } from '../data/pageSeo';
import {
  compareThreeWayModifiedIso,
  updatedKicker,
} from '../data/contentDates';
import '../styles/compare.css';

const PATH = '/compare/topedge-vs-wati-vs-aisensy';

const TITLE = 'TopEdge vs WATI vs AiSensy (2026) | WhatsApp Comparison';
const DESCRIPTION =
  'TopEdge vs WATI vs AiSensy: template markup, AI cost, COD to prepaid, identity, warranty, and chatflow limits.';

const THREE_WAY_FAQS = [
  {
    question: 'How does TopEdge differ from WATI and AiSensy on Meta markup?',
    answer:
      'TopEdge publishes 0% platform markup on Meta pass-through. WATI and AiSensy are compared on the same board for template markup, AI cost, and plan limits. Open the pairwise pages for the sourced numbers.',
  },
  {
    question: 'Who should pick TopEdge in this three-way shortlist?',
    answer:
      'Shopify India teams that want flat INR plans, native COD to prepaid, unified identity, and unlimited flows without a Meta markup layer.',
  },
  {
    question: 'When do WATI or AiSensy still fit?',
    answer:
      'When you need a broad WhatsApp BSP or campaign suite and can accept usage fees, credits, or flow caps. Use the pairwise boards before you decide.',
  },
];

const LOGO_WATI = '/marketing/compare/compare-logo-wati.png';
const LOGO_AISENSY = '/marketing/compare/compare-logo-aisensy.png';

export default function CompareThreeWayPage() {
  const modifiedIso = compareThreeWayModifiedIso();

  return (
    <>
      <MarketingSEO
        title={TITLE}
        description={DESCRIPTION}
        keywords="TopEdge vs WATI vs AiSensy, WhatsApp automation comparison India, WATI vs AiSensy vs TopEdge, WhatsApp template markup, COD prepaid WhatsApp comparison"
        path={PATH}
        noSuffix
        faqSchema={THREE_WAY_FAQS}
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'TopEdge vs WATI vs AiSensy',
            description: DESCRIPTION,
            path: PATH,
            dateModified: modifiedIso,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Compare', path: '/compare' },
            { name: 'TopEdge vs WATI vs AiSensy', path: PATH },
          ]),
        ]}
      />
      <MarketingPage className="mkt-cmp">
        <header className="mkt-cmp__arena">
          <p className="mkt-cmp__kicker">
            Comparison · 3-way
            <span className="mkt-cmp__asof">
              {' '}
              · <time dateTime={modifiedIso}>{updatedKicker(modifiedIso)}</time>
            </span>
          </p>
          <h1 className="mkt-cmp__h1 mkt-cmp__h1--trio">
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
            <span className="mkt-cmp__h1-vs">vs</span>
            <span className="mkt-cmp__h1-peer">
              <img src={LOGO_WATI} alt="WATI" width={28} height={28} decoding="async" />
              <span className="mkt-cmp__h1-peer-name">WATI</span>
            </span>
            <span className="mkt-cmp__h1-vs">vs</span>
            <span className="mkt-cmp__h1-peer">
              <img src={LOGO_AISENSY} alt="AiSensy" width={28} height={28} decoding="async" />
              <span className="mkt-cmp__h1-peer-name">AiSensy</span>
            </span>
          </h1>
        </header>

        <section className="mkt-cmp__block" aria-labelledby="cmp-3way">
          <div className="mkt-cmp__block-head">
            <h2 id="cmp-3way">
              Capability <span className="mkt-cmp__hl">board</span>
            </h2>
          </div>

          <div className="mkt-cmp__triple-wrap">
            <table className="mkt-cmp__triple" aria-label="TopEdge vs WATI vs AiSensy">
              <thead>
                <tr className="mkt-cmp__triple-head">
                  <th scope="col" className="mkt-cmp__triple-cap">
                    Feature
                  </th>
                  <th scope="col" className="mkt-cmp__triple-col is-te">
                    <img src="/logo.png" alt="" width={18} height={18} aria-hidden />
                    TopEdge AI
                  </th>
                  <th scope="col" className="mkt-cmp__triple-col">
                    <img src={LOGO_WATI} alt="" width={18} height={18} aria-hidden />
                    WATI
                  </th>
                  <th scope="col" className="mkt-cmp__triple-col">
                    <img src={LOGO_AISENSY} alt="" width={18} height={18} aria-hidden />
                    AiSensy
                  </th>
                </tr>
              </thead>
              <tbody>
                {THREE_WAY_FEATURE_MATRIX.map((row) => (
                  <tr key={row.id} className="mkt-cmp__triple-row">
                    <th scope="row" className="mkt-cmp__triple-feat">
                      <span className="mkt-cmp__board-feat">{row.name}</span>
                      {row.description ? (
                        <p className="mkt-cmp__feat-desc">{row.description}</p>
                      ) : null}
                    </th>
                    <td className="mkt-cmp__triple-cell is-te">
                      <span className="mkt-cmp__cell-brand">
                        <img src="/logo.png" alt="" width={16} height={16} aria-hidden />
                        TopEdge AI
                      </span>
                      <CompareStatus value={row.topedge} />
                    </td>
                    <td className="mkt-cmp__triple-cell">
                      <span className="mkt-cmp__cell-brand">
                        <img src={LOGO_WATI} alt="" width={16} height={16} aria-hidden />
                        WATI
                      </span>
                      <CompareStatus value={row.wati} />
                    </td>
                    <td className="mkt-cmp__triple-cell">
                      <span className="mkt-cmp__cell-brand">
                        <img src={LOGO_AISENSY} alt="" width={16} height={16} aria-hidden />
                        AiSensy
                      </span>
                      <CompareStatus value={row.aisensy} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav className="mkt-cmp__more" aria-label="Pairwise comparisons">
            <Link to="/compare/wati">TopEdge AI vs WATI</Link>
            <Link to="/compare/aisensy">TopEdge AI vs AiSensy</Link>
            <Link to="/compare">All comparisons</Link>
            <Link to="/pricing">TopEdge AI pricing</Link>
          </nav>
        </section>

        <section className="mkt-cmp__block mkt-cmp__block--faq" aria-labelledby="cmp-faq">
          <div className="mkt-cmp__block-head">
            <h2 id="cmp-faq">
              Common <span className="mkt-cmp__hl">questions</span>
            </h2>
          </div>
          <CompareFaq items={THREE_WAY_FAQS} />
        </section>

        <MarketingCtaBand
          title="Run WhatsApp growth without the markup tax"
          subtitle="0% template markup, BYOK AI, unified identity, and unlimited chatflows, start free on Shopify."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
