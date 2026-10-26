import { Link } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import CompareStatus from '../components/compare/CompareStatus';
import CompareFaq from '../components/compare/CompareFaq';
import { articleJsonLd, breadcrumbJsonLd, organizationJsonLd, webPageJsonLd } from '../data/pageSeo';
import { updatedKicker } from '../data/contentDates';
import ProofBadges from '../components/ProofBadges';
import ReviewPlatforms from '../components/ReviewPlatforms';
import '../styles/compare.css';

/** One rival column: the label a buyer reads and the key the row cell is under. */
export type MultiWayPeer<K extends string> = {
  key: K;
  name: string;
  logo: string;
  /** Pairwise board for the sourced numbers behind this column. */
  href: string;
};

export type MultiWayConfig<K extends string> = {
  path: string;
  title: string;
  description: string;
  keywords: string;
  /** "3-way" / "4-way", shown in the kicker. */
  ways: string;
  /** Short name for breadcrumbs and the WebPage node. */
  shortName: string;
  peers: MultiWayPeer<K>[];
  rows: ({ id: string; name: string; description?: string; topedge: string } & Record<
    K,
    string
  >)[];
  faqs: { question: string; answer: string }[];
  modifiedIso: string;
  /** Rendered under the board: the other multi-way boards and the hub. */
  alsoSee?: { label: string; href: string }[];
};

const TE_LOGO = '/logo.png';

/**
 * Shared renderer for every multi-vendor board.
 *
 * The three-way page used to hold this markup inline, which meant a four-way
 * board would have been a 200-line copy that drifts. The peers are data now, so
 * adding a column is a config change.
 */
export default function CompareMultiWayPage<K extends string>({
  config,
}: {
  config: MultiWayConfig<K>;
}) {
  const { path, title, description, keywords, ways, shortName, peers, rows, faqs, modifiedIso } =
    config;
  const boardLabel = ['TopEdge AI', ...peers.map((p) => p.name)].join(' vs ');

  return (
    <>
      <MarketingSEO
        title={title}
        description={description}
        keywords={keywords}
        path={path}
        noSuffix
        faqSchema={faqs}
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({ name: shortName, description, path, dateModified: modifiedIso }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Compare', path: '/compare' },
            { name: shortName, path },
          ]),
          // Same reason as the two-way boards: dated editorial comparison.
          articleJsonLd({
            headline: shortName,
            description,
            path,
            dateModified: modifiedIso,
            section: 'Comparison',
            keywords,
          }),
        ]}
      />
      <MarketingPage className="mkt-cmp">
        <header className="mkt-cmp__arena">
          <p className="mkt-cmp__kicker">
            Comparison · {ways}
            <span className="mkt-cmp__asof">
              {' '}
              · <time dateTime={modifiedIso}>{updatedKicker(modifiedIso)}</time>
            </span>
          </p>
          <h1 className="mkt-cmp__h1 mkt-cmp__h1--trio">
            <span className="mkt-cmp__h1-brand">
              {/* alt="" on purpose: the wordmark beside it already says the name. */}
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
            {peers.map((peer) => (
              <span className="mkt-cmp__h1-group" key={peer.key}>
                <span className="mkt-cmp__h1-vs">vs</span>
                <span className="mkt-cmp__h1-peer">
                  <img src={peer.logo} alt={peer.name} width={28} height={28} decoding="async" />
                  <span className="mkt-cmp__h1-peer-name">{peer.name}</span>
                </span>
              </span>
            ))}
          </h1>
          <div className="mkt-cmp__proof">
            <ProofBadges compact />
          </div>
        </header>

        <section className="mkt-cmp__block" aria-labelledby="cmp-multi">
          <div className="mkt-cmp__block-head">
            <h2 id="cmp-multi">
              Capability <span className="mkt-cmp__hl">board</span>
            </h2>
          </div>

          <div className="mkt-cmp__triple-wrap">
            <table className="mkt-cmp__triple" aria-label={boardLabel}>
              <thead>
                <tr className="mkt-cmp__triple-head">
                  <th scope="col" className="mkt-cmp__triple-cap">
                    Feature
                  </th>
                  <th scope="col" className="mkt-cmp__triple-col is-te">
                    <img src={TE_LOGO} alt="" width={18} height={18} aria-hidden />
                    TopEdge AI
                  </th>
                  {peers.map((peer) => (
                    <th scope="col" className="mkt-cmp__triple-col" key={peer.key}>
                      <img src={peer.logo} alt="" width={18} height={18} aria-hidden />
                      {peer.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="mkt-cmp__triple-row">
                    <th scope="row" className="mkt-cmp__triple-feat">
                      <span className="mkt-cmp__board-feat">{row.name}</span>
                      {row.description ? (
                        <p className="mkt-cmp__feat-desc">{row.description}</p>
                      ) : null}
                    </th>
                    <td className="mkt-cmp__triple-cell is-te">
                      <span className="mkt-cmp__cell-brand">
                        <img src={TE_LOGO} alt="" width={16} height={16} aria-hidden />
                        TopEdge AI
                      </span>
                      <CompareStatus value={row.topedge} />
                    </td>
                    {peers.map((peer) => (
                      <td className="mkt-cmp__triple-cell" key={peer.key}>
                        <span className="mkt-cmp__cell-brand">
                          <img src={peer.logo} alt="" width={16} height={16} aria-hidden />
                          {peer.name}
                        </span>
                        <CompareStatus value={row[peer.key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav className="mkt-cmp__more" aria-label="Pairwise comparisons">
            {peers.map((peer) => (
              <Link to={peer.href} key={peer.key}>
                TopEdge AI vs {peer.name}
              </Link>
            ))}
            {(config.alsoSee ?? []).map((item) => (
              <Link to={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
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
          <CompareFaq items={faqs} />
        </section>

        <section className="mkt-cmp__block" aria-label="Reviews">
          <ReviewPlatforms />
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
