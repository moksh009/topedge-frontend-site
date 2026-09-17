import { Link, Navigate, useParams } from 'react-router-dom';
import { Check, Minus, ArrowRight } from 'lucide-react';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import {
  getCompareCompetitor,
  TOPEDGE_PLANS_SUMMARY,
  type CompareCell,
} from '../data/compareCompetitors';
import { breadcrumbJsonLd, organizationJsonLd, webPageJsonLd } from '../data/pageSeo';
import '../styles/compare.css';

type Props = { competitor?: string };

function Status({ value }: { value: CompareCell }) {
  if (value === 'yes') {
    return (
      <span className="mkt-cmp__status is-yes" title="Yes">
        <Check strokeWidth={2.5} aria-hidden />
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (value === 'no') {
    return (
      <span className="mkt-cmp__status is-no" title="No">
        <Minus strokeWidth={2.5} aria-hidden />
        <span className="sr-only">No</span>
      </span>
    );
  }
  if (value === 'partial') {
    return <span className="mkt-cmp__status is-partial">Partial</span>;
  }
  return <span className="mkt-cmp__status is-text">{value}</span>;
}

export default function ComparePage({ competitor: competitorProp }: Props) {
  const { competitor: param } = useParams();
  const slug = competitorProp || param || '';
  const data = getCompareCompetitor(slug);

  if (!data) {
    return <Navigate to="/compare" replace />;
  }

  const path = `/compare/${data.slug}`;
  const faqSchema = data.faqs.map((f) => ({ question: f.question, answer: f.answer }));

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
          webPageJsonLd({ name: data.h1, description: data.description, path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Compare', path: '/compare' },
            { name: data.name, path },
          ]),
        ]}
      />
      <MarketingPage className="mkt-cmp">
        {/* Product face-off hero */}
        <header className="mkt-cmp__arena">
          <p className="mkt-cmp__kicker">Product comparison</p>
          <h1 className="mkt-cmp__h1">
            TopEdge <span>vs</span> {data.name}
          </h1>
          <p className="mkt-cmp__lede">{data.subtitle}</p>

          <div className="mkt-cmp__split">
            <div className="mkt-cmp__brand is-te">
              <img src="/logo.png" alt="" width={44} height={44} className="mkt-cmp__brand-mark" />
              <div>
                <p className="mkt-cmp__brand-name">TopEdge</p>
                <p className="mkt-cmp__brand-tag">Shopify WhatsApp growth OS</p>
              </div>
              <Link to="/signup" className="mkt-cmp__brand-cta is-solid">
                Start free
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
            <div className="mkt-cmp__split-vs" aria-hidden>
              vs
            </div>
            <div className="mkt-cmp__brand">
              <img src={data.logo} alt="" width={44} height={44} className="mkt-cmp__brand-mark" />
              <div>
                <p className="mkt-cmp__brand-name">{data.name}</p>
                <p className="mkt-cmp__brand-tag">WhatsApp platform</p>
              </div>
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mkt-cmp__brand-cta"
              >
                Their site
              </a>
            </div>
          </div>
        </header>

        {/* Snapshot — not a blog paragraph */}
        <section className="mkt-cmp__block" aria-label="Snapshot">
          <div className="mkt-cmp__snap">
            <div className="mkt-cmp__snap-col is-te">
              <p className="mkt-cmp__snap-label">Choose TopEdge when</p>
              <p className="mkt-cmp__snap-body">{data.whoForTopEdge}</p>
            </div>
            <div className="mkt-cmp__snap-col">
              <p className="mkt-cmp__snap-label">Choose {data.name} when</p>
              <p className="mkt-cmp__snap-body">{data.whoForCompetitor}</p>
            </div>
          </div>
          <p className="mkt-cmp__snap-note">{data.answerFirst}</p>
        </section>

        {/* Capability board */}
        <section className="mkt-cmp__block" aria-labelledby="cmp-board">
          <div className="mkt-cmp__block-head">
            <h2 id="cmp-board">Capability board</h2>
            <p>Shopify WhatsApp ops that matter for Indian D2C.</p>
          </div>

          <div className="mkt-cmp__board">
            <div className="mkt-cmp__board-head">
              <span className="mkt-cmp__board-cap">Capability</span>
              <span className="mkt-cmp__board-col is-te">
                <img src="/logo.png" alt="" width={18} height={18} />
                TopEdge
              </span>
              <span className="mkt-cmp__board-col">
                <img src={data.logo} alt="" width={18} height={18} />
                {data.name}
              </span>
            </div>
            <ul className="mkt-cmp__board-list">
              {data.matrix.map((row) => (
                <li key={row.label} className="mkt-cmp__board-row">
                  <span className="mkt-cmp__board-label">{row.label}</span>
                  <span className="mkt-cmp__board-cell">
                    <Status value={row.topedge} />
                  </span>
                  <span className="mkt-cmp__board-cell">
                    <Status value={row.competitor} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pricing like a product page */}
        <section className="mkt-cmp__block" aria-labelledby="cmp-price">
          <div className="mkt-cmp__block-head">
            <h2 id="cmp-price">Plans at a glance</h2>
            <p>{data.topedgePlansNote}</p>
          </div>

          <div className="mkt-cmp__price-grid">
            <div className="mkt-cmp__price-panel is-te">
              <div className="mkt-cmp__price-panel-top">
                <img src="/logo.png" alt="" width={28} height={28} />
                <div>
                  <strong>TopEdge</strong>
                  <span>INR · order volume</span>
                </div>
              </div>
              <div className="mkt-cmp__price-tiers">
                {TOPEDGE_PLANS_SUMMARY.map((p) => (
                  <div key={p.name} className={`mkt-cmp__tier${p.popular ? ' is-hot' : ''}`}>
                    <div className="mkt-cmp__tier-top">
                      <span className="mkt-cmp__tier-name">{p.name}</span>
                      {p.popular ? <span className="mkt-cmp__tier-hot">Popular</span> : null}
                    </div>
                    <p className="mkt-cmp__tier-price">{p.price}</p>
                    <p className="mkt-cmp__tier-note">{p.note}</p>
                    <ul>
                      {p.highlights.slice(0, 3).map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link to="/pricing" className="mkt-cmp__price-link">
                Full TopEdge pricing
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>

            <div className="mkt-cmp__price-panel">
              <div className="mkt-cmp__price-panel-top">
                <img src={data.logo} alt="" width={28} height={28} />
                <div>
                  <strong>{data.name}</strong>
                  <span>Listed · verify live</span>
                </div>
              </div>
              <div className="mkt-cmp__price-tiers">
                {data.competitorPlans.map((p) => (
                  <div key={p.name} className={`mkt-cmp__tier${p.popular ? ' is-hot' : ''}`}>
                    <div className="mkt-cmp__tier-top">
                      <span className="mkt-cmp__tier-name">{p.name}</span>
                      {p.popular ? <span className="mkt-cmp__tier-hot">Popular</span> : null}
                    </div>
                    <p className="mkt-cmp__tier-price">{p.price}</p>
                    {p.note ? <p className="mkt-cmp__tier-note">{p.note}</p> : null}
                    <ul>
                      {p.highlights.slice(0, 3).map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mkt-cmp__fine">{data.pricingCaveat}</p>
        </section>

        {/* Why TopEdge — product benefits */}
        <section className="mkt-cmp__block" aria-labelledby="cmp-why">
          <div className="mkt-cmp__block-head">
            <h2 id="cmp-why">Why teams pick TopEdge</h2>
            <p>Differences you feel in daily Shopify WhatsApp work.</p>
          </div>
          <div className="mkt-cmp__why">
            {data.differentiators.map((d, i) => (
              <article key={d.title} className="mkt-cmp__why-card">
                <span className="mkt-cmp__why-num" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Compact FAQ */}
        <section className="mkt-cmp__block mkt-cmp__block--faq" aria-labelledby="cmp-faq">
          <div className="mkt-cmp__block-head">
            <h2 id="cmp-faq">Questions</h2>
          </div>
          <div className="mkt-cmp__qna">
            {data.faqs.map((f) => (
              <details key={f.question} className="mkt-cmp__q">
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
          <nav className="mkt-cmp__more" aria-label="Related">
            {data.related.map((r) => (
              <Link key={r.href} to={r.href}>
                {r.label}
              </Link>
            ))}
          </nav>
        </section>

        <MarketingCtaBand
          title="Try TopEdge on your store"
          subtitle="14-day free trial. Connect Shopify, approve templates, publish recovery."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
