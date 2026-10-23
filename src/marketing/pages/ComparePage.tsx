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
import { FALLBACK_CATALOG, GST_FOOTNOTE, TRIAL } from '../lib/billingCatalog';
import { articleJsonLd, breadcrumbJsonLd, organizationJsonLd, webPageJsonLd } from '../data/pageSeo';
import {
  compareTwoWayModifiedIso,
  updatedKicker,
} from '../data/contentDates';
import '../styles/compare.css';

type Props = { competitor?: string };

/** Lean capability-board pages — table only (no scorecard / pricing duel / FAQ copy). */
const VERBATIM_ONLY = new Set([
  'wati',
  'aisensy',
  'bitespeed',
  'interakt',
  'updatrr',
  'zoko',
  'getgabs',
  'kanal',
  'dondy',
  'gupshup',
]);

/**
 * The ten pairwise boards are VERBATIM_ONLY: no verdict, no scorecard, no
 * paraphrased competitor copy. That left them with no FAQ at all, so ten
 * commercial pages shipped without FAQPage markup and had nothing an AI answer
 * could quote.
 *
 * These five questions are about our own product only, and every number is read
 * from the billing catalog that /pricing renders, so nothing here is a claim
 * about a competitor and nothing can drift from the price page. Template
 * portability is a property of the WhatsApp Business Account, documented by
 * Meta, not a claim about any one platform.
 */
function ownProductFaqs() {
  const plan = (slug: string) => FALLBACK_CATALOG.plans.find((p) => p.slug === slug);
  const launch = plan('launch');
  const growth = plan('growth');
  const scale = plan('scale');
  const price = (slug: string) => plan(slug)?.monthlyPriceLabel ?? '';
  const yearly = (slug: string) => plan(slug)?.pricing?.yearly?.effectiveMonthlyLabel ?? '';
  const gated = FALLBACK_CATALOG.plans
    .filter((p) => p.features.journeyCodPrepaid)
    .map((p) => p.displayName)
    .join(' and ');

  return [
    {
      question: 'What does TopEdge AI cost for a Shopify store in India?',
      answer:
        `Flat INR plans: Launch ${price('launch')}/mo, Growth ${price('growth')}/mo and ` +
        `Scale ${price('scale')}/mo, ${GST_FOOTNOTE} Billed yearly it is ` +
        `${yearly('launch')}, ${yearly('growth')} and ${yearly('scale')} a month. ` +
        `The plan is sized by Shopify orders a month: ` +
        `${launch?.ordersPerCycle.toLocaleString('en-IN')}, ` +
        `${growth?.ordersPerCycle.toLocaleString('en-IN')} and ` +
        `${scale?.ordersPerCycle.toLocaleString('en-IN')}.`,
    },
    {
      question: 'Does TopEdge AI add a markup on WhatsApp message rates?',
      answer:
        'No. Meta bills WhatsApp conversations to your own Meta Business Account at its ' +
        'published India rate card, and TopEdge adds 0% on top. The platform plan and the ' +
        'messaging cost are two separate invoices, so you can read Meta\u2019s number yourself ' +
        'in Business Manager rather than taking ours.',
    },
    {
      question: 'Which plans include automated COD to prepaid conversion?',
      answer:
        `COD confirmation before dispatch is on every plan. Automated COD to prepaid ` +
        `conversion and Journey Branch are on ${gated}, not on Launch. If converting COD to ` +
        `prepaid is the reason you are switching, size the plan on that, not on order count ` +
        `alone.`,
    },
    {
      question: 'Do my approved WhatsApp templates move if I switch platform?',
      answer:
        'Your approved templates belong to your WhatsApp Business Account, not to the ' +
        'platform that submitted them. If the new tool connects to the same WABA, the ' +
        'templates come with it. Check which WABA a new tool has bound before assuming ' +
        'anything was lost, and keep the Meta Business Account in your own name.',
    },
    {
      question: 'Can I test it before paying?',
      answer:
        `Yes. The trial is ${TRIAL.days} days with ${TRIAL.orders} orders and ` +
        `${TRIAL.sends} campaign plus email sends, and no card on this site. That is enough ` +
        `to connect Shopify, get one utility template approved and watch a real cart recovery ` +
        `and COD confirmation fire on your own orders.`,
    },
  ];
}

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


export default function ComparePage({ competitor: competitorProp }: Props) {
  const { competitor: param } = useParams();
  const slug = competitorProp || param || '';
  const data = getCompareCompetitor(slug);

  if (!data) {
    return <Navigate to="/compare" replace />;
  }

  const path = `/compare/${data.slug}`;
  const lean = VERBATIM_ONLY.has(data.slug);
  const leanFaqs = lean ? ownProductFaqs() : [];
  const faqSchema =
    lean
      ? leanFaqs
      : !data.faqs?.length
      ? undefined
      : data.faqs.map((f) => ({ question: f.question, answer: f.answer }));
  const hasScorecard = !lean && Boolean(data.scorecard?.length);
  const hasDeepDives = !lean && Boolean(data.deepDives?.length);
  const boardWide = data.matrix.some(
    (row) =>
      (typeof row.topedge === 'string' && !['yes', 'no', 'partial'].includes(row.topedge)) ||
      (typeof row.competitor === 'string' && !['yes', 'no', 'partial'].includes(row.competitor)),
  );
  const teBest = !lean && data.competitorPlans?.length ? pickBestPlan(TOPEDGE_PLANS_SUMMARY) : null;
  const compBest = !lean && data.competitorPlans?.length ? pickBestPlan(data.competitorPlans) : null;
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
          // The board is a dated, bylined editorial comparison, so it carries
          // Article alongside WebPage. Without it every AI-discoverability
          // pass reads these as article pages with no Article schema.
          articleJsonLd({
            headline: data.h1,
            description: data.description,
            path,
            dateModified: modifiedIso,
            section: 'Comparison',
            keywords: data.keywords,
          }),
          // No Product / SoftwareApplication+offers here — compare URLs are not
          // purchase pages; priced Offers trigger Google Merchant listings and
          // previously failed URL Inspection with Missing field "image".
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
            <span className="mkt-cmp__h1-vs">vs</span>
            <span className="mkt-cmp__h1-peer">
              <img src={data.logo} alt={data.logoAlt} width={28} height={28} decoding="async" />
              <span className="mkt-cmp__h1-peer-name">{data.name}</span>
            </span>
          </h1>
        </header>

        {!lean && data.whoForTopEdge && data.whoForCompetitor ? (
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
            {data.answerFirst ? (
              <details className="mkt-cmp__verdict">
                <summary>Quick verdict</summary>
                <p>{data.answerFirst}</p>
              </details>
            ) : null}
          </section>
        ) : null}

        <section className="mkt-cmp__block" aria-labelledby="cmp-board">
          <div className="mkt-cmp__block-head">
            <h2 id="cmp-board">
              Capability <span className="mkt-cmp__hl">board</span>
            </h2>
          </div>

          <div className={`mkt-cmp__board-wrap${boardWide ? ' is-wide' : ''}`}>
            <table className={`mkt-cmp__board${boardWide ? ' is-wide' : ''}`}>
              <thead>
                <tr className="mkt-cmp__board-head">
                  <th scope="col" className="mkt-cmp__board-cap">
                    Capability
                  </th>
                  <th scope="col" className="mkt-cmp__board-col is-te">
                    <img src="/logo.png" alt="" width={18} height={18} aria-hidden />
                    TopEdge AI
                  </th>
                  <th scope="col" className="mkt-cmp__board-col">
                    <img src={data.logo} alt="" width={18} height={18} aria-hidden />
                    {data.name}
                  </th>
                </tr>
              </thead>
              <tbody className="mkt-cmp__board-list">
                {data.matrix.map((row) => (
                  <tr key={row.label} className="mkt-cmp__board-row">
                    <th scope="row" className="mkt-cmp__board-label">
                      <span className="mkt-cmp__board-feat">{row.label}</span>
                      {row.description ? (
                        <p className="mkt-cmp__feat-desc">{row.description}</p>
                      ) : null}
                    </th>
                    <td className="mkt-cmp__board-cell is-te">
                      <span className="mkt-cmp__cell-brand">
                        <img src="/logo.png" alt="" width={16} height={16} aria-hidden />
                        TopEdge AI
                      </span>
                      <CompareStatus value={row.topedge} />
                    </td>
                    <td className="mkt-cmp__board-cell">
                      <span className="mkt-cmp__cell-brand">
                        <img src={data.logo} alt="" width={16} height={16} aria-hidden />
                        {data.name}
                      </span>
                      <CompareStatus value={row.competitor} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.matrixNote ? <p className="mkt-cmp__fine">{data.matrixNote}</p> : null}
        </section>

        {hasScorecard ? (
          <section className="mkt-cmp__block" aria-labelledby="cmp-score">
            <div className="mkt-cmp__block-head">
              <h2 id="cmp-score">
                Honest <span className="mkt-cmp__hl">scorecard</span>
              </h2>
            </div>
            <div className="mkt-cmp__score-wrap" data-competitor={data.shortName}>
              <table className="mkt-cmp__score">
                <thead>
                  <tr className="mkt-cmp__score-head">
                    <th scope="col">Area</th>
                    <th scope="col">TopEdge AI</th>
                    <th scope="col">{data.name}</th>
                    <th scope="col">Edge</th>
                  </tr>
                </thead>
                <tbody className="mkt-cmp__score-list">
                  {data.scorecard!.map((row) => (
                    <tr key={row.area} className="mkt-cmp__score-row">
                      <th scope="row" className="mkt-cmp__score-area">
                        {row.area}
                      </th>
                      <td className="mkt-cmp__score-cell">{row.topedge}</td>
                      <td className="mkt-cmp__score-cell" data-comp-label={data.shortName}>
                        {row.competitor}
                      </td>
                      <td className="mkt-cmp__score-cell is-edge">
                        <ScoreEdge edge={row.edge} competitorName={data.shortName} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

        {!lean && teBest && compBest ? (
          <section className="mkt-cmp__block" aria-labelledby="cmp-price">
            <div className="mkt-cmp__block-head">
              <h2 id="cmp-price">
                Best plan <span className="mkt-cmp__hl">comparison</span>
              </h2>
            </div>

            <table className="mkt-cmp__duel">
              <thead>
                <tr className="mkt-cmp__duel-head">
                  <th scope="col" className="mkt-cmp__duel-cap">
                    Feature
                  </th>
                  <th scope="col" className="mkt-cmp__duel-brand is-te">
                    <span className="mkt-cmp__duel-brand-top">
                      <img src="/logo.png" alt="" width={20} height={20} aria-hidden />
                      <strong>TopEdge AI</strong>
                    </span>
                    <span className="mkt-cmp__duel-plan">{teBest.name}</span>
                  </th>
                  <th scope="col" className="mkt-cmp__duel-brand">
                    <span className="mkt-cmp__duel-brand-top">
                      <img src={data.logo} alt="" width={20} height={20} aria-hidden />
                      <strong>{data.name}</strong>
                    </span>
                    <span className="mkt-cmp__duel-plan">{compBest.name}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="mkt-cmp__duel-row">
                  <th scope="row" className="mkt-cmp__duel-label">
                    Plan fit
                  </th>
                  <td className="mkt-cmp__duel-cell is-te">{teBest.note}</td>
                  <td className="mkt-cmp__duel-cell">{compBest.note || 'n/a'}</td>
                </tr>

                {duelFeatures.map((row) => (
                  <tr key={row.label} className="mkt-cmp__duel-row">
                    <th scope="row" className="mkt-cmp__duel-label">
                      {row.label}
                    </th>
                    <td className="mkt-cmp__duel-cell is-te">
                      <CompareStatus value={row.topedge} />
                    </td>
                    <td className="mkt-cmp__duel-cell">
                      <CompareStatus value={row.competitor} />
                    </td>
                  </tr>
                ))}

                <tr className="mkt-cmp__duel-row is-price">
                  <th scope="row" className="mkt-cmp__duel-label">
                    Price
                  </th>
                  <td className="mkt-cmp__duel-cell is-te">
                    <span>
                      <span className="mkt-cmp__duel-starts">starts at</span>
                      <span className="mkt-cmp__duel-price">{teBest.price}</span>
                    </span>
                  </td>
                  <td className="mkt-cmp__duel-cell">
                    <span>
                      <span className="mkt-cmp__duel-starts">starts at</span>
                      <span className="mkt-cmp__duel-price">{compBest.price}</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

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
            {data.pricingCaveat ? <p className="mkt-cmp__fine">{data.pricingCaveat}</p> : null}
          </section>
        ) : null}

        {!lean && data.differentiators?.length ? (
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
          {(lean ? leanFaqs.length : data.faqs?.length) ? (
            <>
              <div className="mkt-cmp__block-head">
                <h2 id="cmp-faq">
                  Common <span className="mkt-cmp__hl">questions</span>
                </h2>
              </div>
              <CompareFaq
                items={(lean ? leanFaqs : data.faqs!).map((f) => ({
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
