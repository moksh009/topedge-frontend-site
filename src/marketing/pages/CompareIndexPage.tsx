import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MarketingSEO from '../components/MarketingSEO';
import { PAGE_SEO, organizationJsonLd, breadcrumbJsonLd, webPageJsonLd } from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { allCompareCompetitors } from '../data/compareCompetitors';
import '../styles/compare.css';

const FEATURED = [
  {
    href: '/compare/topedge-vs-wati-vs-aisensy',
    title: 'TopEdge vs WATI vs AiSensy',
    body: 'Full 3-way board — Meta markup, AI cost, intent routing, identity, COD → prepaid, warranty, and chatflow caps.',
    logos: [
      '/logo.png',
      '/marketing/compare/compare-logo-wati.png',
      '/marketing/compare/compare-logo-aisensy.svg',
    ],
    badge: '3-way',
  },
];

export default function CompareIndexPage() {
  const competitors = allCompareCompetitors();

  return (
    <>
      <MarketingSEO
        title={PAGE_SEO.compare.title}
        description={PAGE_SEO.compare.description}
        keywords={PAGE_SEO.compare.keywords}
        path={PAGE_SEO.compare.path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'Compare TopEdge',
            description: PAGE_SEO.compare.description,
            path: PAGE_SEO.compare.path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Compare', path: '/compare' },
          ]),
        ]}
      />
      <MarketingPage className="mkt-cmp">
        <header className="mkt-cmp__arena">
          <p className="mkt-cmp__kicker">Product comparison</p>
          <h1 className="mkt-cmp__h1">
            TopEdge <span>vs</span> WhatsApp tools
          </h1>
          <p className="mkt-cmp__lede">
            Side-by-side boards for Shopify WhatsApp automation in India — Meta markup, AI, identity,
            COD → prepaid, and who each tool fits.
          </p>
        </header>

        <section className="mkt-cmp__block" aria-label="Featured comparison">
          <div className="mkt-cmp-index__featured">
            {FEATURED.map((f) => (
              <Link key={f.href} to={f.href} className="mkt-cmp-index__card mkt-cmp-index__card--wide">
                {f.badge ? <span className="mkt-cmp-index__badge">{f.badge}</span> : null}
                <div className="mkt-cmp-index__card-top">
                  {f.logos.map((src, i) => (
                    <span key={src} className="mkt-cmp-index__logo-stack">
                      {i > 0 ? <span className="mkt-cmp-index__vs">vs</span> : null}
                      <img src={src} alt="" width={32} height={32} />
                    </span>
                  ))}
                </div>
                <h2>{f.title}</h2>
                <p>{f.body}</p>
                <span className="mkt-cmp-index__card-cta">
                  Open 3-way board
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mkt-cmp__block" aria-label="Comparisons">
          <div className="mkt-cmp__block-head">
            <h2>Pairwise comparisons</h2>
            <p>Pick a competitor for a deeper TopEdge face-off.</p>
          </div>
          <div className="mkt-cmp-index__grid">
            {competitors.map((c) => (
              <Link key={c.slug} to={`/compare/${c.slug}`} className="mkt-cmp-index__card">
                <div className="mkt-cmp-index__card-top">
                  <img src="/logo.png" alt="" width={32} height={32} />
                  <span className="mkt-cmp__split-vs" style={{ display: 'inline' }}>
                    vs
                  </span>
                  <img src={c.logo} alt="" width={32} height={32} />
                </div>
                <h2>TopEdge vs {c.name}</h2>
                <p>{c.whoForTopEdge}</p>
                <span className="mkt-cmp-index__card-cta">
                  Open comparison
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <MarketingCtaBand
          title="Try TopEdge on your store"
          subtitle="Start free — connect Shopify and WhatsApp, approve templates, publish recovery."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
