import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import CompareFaq from '../components/compare/CompareFaq';
import CompareStatus from '../components/compare/CompareStatus';
import {
  getCompareCompetitor,
  TOPEDGE_PLANS_SUMMARY,
  type CompareScoreRow,
} from '../data/compareCompetitors';
import { planDuelFeatures, type MatrixCompetitor } from '../data/compareFeatureMatrix';
import { breadcrumbJsonLd, organizationJsonLd, webPageJsonLd } from '../data/pageSeo';
import { SITE_URL } from '../data/marketingSeo';
import { catalogMonthlyOffersJsonLd } from '../lib/billingCatalog';
import {
  compareTwoWayModifiedIso,
  updatedKicker,
} from '../data/contentDates';
import '../styles/compare.css';

type Props = { competitor?: string };

/** Lean capability-board pages — no paraphrased extras. */
const VERBATIM_ONLY = new Set(['wati', 'aisensy', 'bitespeed', 'interakt']);

function brandLabel(text: string) {
  return text.replace(/\bTopEdge\b(?! AI)/g, 'TopEdge AI');
}

function pickBestPlan<T extends { popular?: boolean; name: string; price: string; note?: string; highlights: readonly string[] }>(
  plans: readonly T[],
): T {
  return plans.find((p) => Boolean(p.popular)) ?? plans[1] ?? plans[0];
}

function ScoreEdge({ edge, competitorName }: { edge: CompareScoreRow['edge']; competitorName: string }) {
  const label = edge === 'TopEdge' ? 'TopEdge AI' : edge === 'Competitor' ? competitorName : edge;
  const mod =
    edge === 'TopEdge' ? 'is-te' : edge === 'Competitor' ? 'is-comp' : edge === 'Even' ? 'is-even' : 'is-trade';
  return <span className={`mkt-cmp__edge ${mod}`}>{label}</span>;
}

function topedgeOfferJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'TopEdge',
    description:
      'Shopify-native WhatsApp growth OS for India D2C, cart recovery, COD workflows, Meta-gated journeys, and order-aware inbox.',
    brand: { '@type': 'Brand', name: 'TopEdge' },
    offers: catalogMonthlyOffersJsonLd(undefined, { url: `${SITE_URL}/pricing` }),
  };
}


export default function ComparePage({ competitor: competitorProp }: Props) {
  const { competitor: param } = useParams();
  const slug = competitorProp || param || '';
  const data = getCompareCompetitor(slug);

  if (!data) {
    return <Navigate to="/compare" replace />;
  }

  const path = `/compare/${data.slug}`;
  const lean = VERBATIM_ONLY.has(data.slug);
  const faqSchema = lean ? undefined : data.faqs.map((f) => ({ question: f.question, answer: f.answer }));
  const hasScorecard = !lean && Boolean(data.scorecard?.length);
  const hasDeepDives = !lean && Boolean(data.deepDives?.length);
  const boardWide = data.matrix.some(
    (row) =>
      (typeof row.topedge === 'string' && !['yes', 'no', 'partial'].includes(row.topedge)) ||
      (typeof row.competitor === 'string' && !['yes', 'no', 'partial'].includes(row.competitor)),
  );
  const teBest = pickBestPlan(TOPEDGE_PLANS_SUMMARY);
  const compBest = pickBestPlan(data.competitorPlans);
  const duelFeatures = lean ? [] : planDuelFeatures(data.slug as MatrixCompetitor);
  const modifiedIso = compareTwoWayModifiedIso();

  return (
    <>
      <MarketingSEO
        title={data.title}
        description={data.description}
        keywords={data.keywords}
        path={path}
        noSuffix
        faqSchema={faqSchema}
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: data.h1,
            description: data.description,
            path,
            dateModified: modifiedIso,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Compare', path: '/compare' },
            { name: data.name, path },
          ]),
          topedgeOfferJsonLd(),
        ]}
      />
      <MarketingPage className="mkt-cmp">
        <header className="mkt-cmp__arena">
          <p className="mkt-cmp__kicker">
            Comparison
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
            <span className="mkt-cmp__h1-vs">vs</span>
            <span className="mkt-cmp__h1-peer">
              <img src={data.logo} alt={data.logoAlt} width={28} height={28} decoding="async" />
              <span className="mkt-cmp__h1-peer-name">{data.name}</span>
            </span>
          </h1>
        </header>

        {!lean ? (
          <section className="mkt-cmp__block" aria-label="Who it's for">
            <div className="mkt-cmp__pick">
              <article className="mkt-cmp__pick-col is-te">
                <div className="mkt-cmp__pick-top">
                  <img src="/logo.png" alt="TopEdge AI" width={22} height={22} />
                  <p className="mkt-cmp__pick-kicker">
                    Best with <span className="mkt-cmp__hl">TopEdge AI</span>
                  </p>
                </div>
                <p className="mkt-cmp__pick-body">{data.whoForTopEdge}</p>
              </article>
              <article className="mkt-cmp__pick-col">
                <div className="mkt-cmp__pick-top">
                  <img src={data.logo} alt={data.logoAlt} width={22} height={22} />
                  <p className="mkt-cmp__pick-kicker">
                    Best with <span className="mkt-cmp__pick-peer">{data.name}</span>
                  </p>
                </div>
                <p className="mkt-cmp__pick-body">{data.whoForCompetitor}</p>
              </article>
            </div>
            <details className="mkt-cmp__verdict">
              <summary>Quick verdict</summary>
              <p>{data.answerFirst}</p>
            </details>
          </section>
        ) : null}

        <section className="mkt-cmp__block" aria-labelledby="cmp-board">
          <div className="mkt-cmp__block-head">
            <h2 id="cmp-board">
              Capability <span className="mkt-cmp__hl">board</span>
            </h2>
          </div>

          <div className={`mkt-cmp__board${boardWide ? ' is-wide' : ''}`}>
            <div className="mkt-cmp__board-head">
              <span className="mkt-cmp__board-cap">Capability</span>
              <span className="mkt-cmp__board-col is-te">
                <img src="/logo.png" alt="TopEdge AI" width={18} height={18} />
                TopEdge AI
              </span>
              <span className="mkt-cmp__board-col">
                <img src={data.logo} alt={data.logoAlt} width={18} height={18} />
                {data.name}
              </span>
            </div>
            <ul className="mkt-cmp__board-list">
              {data.matrix.map((row) => (
                <li key={row.label} className="mkt-cmp__board-row">
                  <div className="mkt-cmp__board-main">
                    <div className="mkt-cmp__board-label">
                      <span className="mkt-cmp__board-feat">{row.label}</span>
                      {row.description ? (
                        <p className="mkt-cmp__feat-desc">{row.description}</p>
                      ) : null}
                    </div>
                    <span className="mkt-cmp__board-cell is-te">
                      <span className="mkt-cmp__cell-brand">
                        <img src="/logo.png" alt="" width={16} height={16} />
                        TopEdge AI
                      </span>
                      <CompareStatus value={row.topedge} />
                    </span>
                    <span className="mkt-cmp__board-cell">
                      <span className="mkt-cmp__cell-brand">
                        <img src={data.logo} alt="" width={16} height={16} />
                        {data.name}
                      </span>
                      <CompareStatus value={row.competitor} />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {hasScorecard ? (
          <section className="mkt-cmp__block" aria-labelledby="cmp-score">
            <div className="mkt-cmp__block-head">
              <h2 id="cmp-score">
                Honest <span className="mkt-cmp__hl">scorecard</span>
              </h2>
            </div>
            <div className="mkt-cmp__score" data-competitor={data.shortName}>
              <div className="mkt-cmp__score-head" aria-hidden>
                <span>Area</span>
                <span>TopEdge AI</span>
                <span>{data.name}</span>
                <span>Edge</span>
              </div>
              <ul className="mkt-cmp__score-list">
                {data.scorecard!.map((row) => (
                  <li key={row.area} className="mkt-cmp__score-row">
                    <span className="mkt-cmp__score-area">{row.area}</span>
                    <span className="mkt-cmp__score-cell">{row.topedge}</span>
                    <span className="mkt-cmp__score-cell" data-comp-label={data.shortName}>
                      {row.competitor}
                    </span>
                    <span className="mkt-cmp__score-cell is-edge">
                      <ScoreEdge edge={row.edge} competitorName={data.shortName} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {hasDeepDives ? (
          <section className="mkt-cmp__block" aria-labelledby="cmp-deep">
            <div className="mkt-cmp__block-head">
              <h2 id="cmp-deep">
                Where they <span className="mkt-cmp__hl">differ</span>
              </h2>
            </div>
            <div className="mkt-cmp__deep">
              <div className="mkt-cmp__deep-head" aria-hidden>
                <span>Topic</span>
                <span>Detail</span>
              </div>
              {data.deepDives!.map((d) => (
                <div key={d.title} className="mkt-cmp__deep-row">
                  <h3 className="mkt-cmp__deep-topic">{d.title}</h3>
                  <p className="mkt-cmp__deep-body">{d.body}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {!lean ? (
          <section className="mkt-cmp__block" aria-labelledby="cmp-price">
            <div className="mkt-cmp__block-head">
              <h2 id="cmp-price">
                Best plan <span className="mkt-cmp__hl">comparison</span>
              </h2>
            </div>

            <div className="mkt-cmp__duel">
              <div className="mkt-cmp__duel-head">
                <span className="mkt-cmp__duel-cap">Feature</span>
                <div className="mkt-cmp__duel-brand is-te">
                  <span className="mkt-cmp__duel-brand-top">
                    <img src="/logo.png" alt="TopEdge AI" width={20} height={20} />
                    <strong>TopEdge AI</strong>
                  </span>
                  <span className="mkt-cmp__duel-plan">{teBest.name}</span>
                </div>
                <div className="mkt-cmp__duel-brand">
                  <span className="mkt-cmp__duel-brand-top">
                    <img src={data.logo} alt={data.logoAlt} width={20} height={20} />
                    <strong>{data.name}</strong>
                  </span>
                  <span className="mkt-cmp__duel-plan">{compBest.name}</span>
                </div>
              </div>

              <div className="mkt-cmp__duel-row">
                <span className="mkt-cmp__duel-label">Plan fit</span>
                <span className="mkt-cmp__duel-cell is-te">{teBest.note}</span>
                <span className="mkt-cmp__duel-cell">{compBest.note || ', '}</span>
              </div>

              {duelFeatures.map((row) => (
                <div key={row.label} className="mkt-cmp__duel-row">
                  <span className="mkt-cmp__duel-label">{row.label}</span>
                  <span className="mkt-cmp__duel-cell is-te">
                    <CompareStatus value={row.topedge} />
                  </span>
                  <span className="mkt-cmp__duel-cell">
                    <CompareStatus value={row.competitor} />
                  </span>
                </div>
              ))}

              <div className="mkt-cmp__duel-row is-price">
                <span className="mkt-cmp__duel-label">Price</span>
                <span className="mkt-cmp__duel-cell is-te">
                  <span>
                    <span className="mkt-cmp__duel-starts">starts at</span>
                    <span className="mkt-cmp__duel-price">{teBest.price}</span>
                  </span>
                </span>
                <span className="mkt-cmp__duel-cell">
                  <span>
                    <span className="mkt-cmp__duel-starts">starts at</span>
                    <span className="mkt-cmp__duel-price">{compBest.price}</span>
                  </span>
                </span>
              </div>
            </div>

            <div className="mkt-cmp__duel-foot">
              <Link to="/signup" className="mkt-cmp__duel-cta is-solid">
                Start free
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
              <Link to="/pricing" className="mkt-cmp__duel-cta">
                All TopEdge AI plans
              </Link>
              <a
                href={data.website}
                className="mkt-cmp__duel-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.name} pricing
              </a>
            </div>
            <p className="mkt-cmp__fine">{data.pricingCaveat}</p>
          </section>
        ) : null}

        {!lean ? (
          <section className="mkt-cmp__block" aria-labelledby="cmp-why">
            <div className="mkt-cmp__block-head">
              <h2 id="cmp-why">
                Why TopEdge <span className="mkt-cmp__hl">AI</span>
              </h2>
            </div>
            <div className="mkt-cmp__why">
              {data.differentiators.map((d, i) => (
                <article key={d.title} className="mkt-cmp__why-row">
                  <span className="mkt-cmp__why-num" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="mkt-cmp__why-copy">
                    <h3>{brandLabel(d.title)}</h3>
                    <p>{brandLabel(d.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mkt-cmp__block mkt-cmp__block--faq" aria-labelledby="cmp-faq">
          {!lean ? (
            <>
              <div className="mkt-cmp__block-head">
                <h2 id="cmp-faq">
                  Common <span className="mkt-cmp__hl">questions</span>
                </h2>
              </div>
              <CompareFaq
                items={data.faqs.map((f) => ({
                  question: brandLabel(f.question),
                  answer: brandLabel(f.answer),
                }))}
              />
            </>
          ) : (
            <h2 id="cmp-faq" className="sr-only">
              Related
            </h2>
          )}
          <nav className="mkt-cmp__more" aria-label="Related">
            {data.related.map((r) => (
              <Link key={r.href} to={r.href}>
                {brandLabel(r.label)}
              </Link>
            ))}
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
