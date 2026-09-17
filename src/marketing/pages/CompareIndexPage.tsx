import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MarketingSEO from '../components/MarketingSEO';
import { PAGE_SEO, organizationJsonLd, breadcrumbJsonLd, webPageJsonLd } from '../data/pageSeo';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import { allCompareCompetitors } from '../data/compareCompetitors';
import '../styles/compare.css';

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
            Side-by-side product pages for Shopify WhatsApp automation in India — plans, capabilities,
            and who each tool fits.
          </p>
        </header>

        <section className="mkt-cmp__block" aria-label="Comparisons">
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
