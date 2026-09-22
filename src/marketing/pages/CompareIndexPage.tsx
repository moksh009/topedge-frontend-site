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
    title: 'TopEdge AI vs WATI vs AiSensy',
    body: 'Markup, AI cost, identity, COD → prepaid, and chatflow caps, one board.',
    logos: [
      { src: '/logo.png', alt: 'TopEdge AI' },
      { src: '/marketing/compare/compare-logo-wati.png', alt: 'WATI' },
      { src: '/marketing/compare/compare-logo-aisensy.png', alt: 'AiSensy' },
    ],
    badge: '3-way',
  },
  {
    href: '/compare/alternatives',
    title: 'WhatsApp automation alternatives',
    body: 'Fair one-line index: WATI, AiSensy, Interakt, Bitespeed, Zoko, Getgabs, Kanal, Dondy, Updatrr, Gupshup.',
    logos: [
      { src: '/logo.png', alt: 'TopEdge AI' },
      { src: '/marketing/compare/compare-logo-zoko.svg', alt: 'Zoko' },
      { src: '/marketing/compare/compare-logo-gupshup.svg', alt: 'Gupshup' },
    ],
    badge: 'Index',
  },
];

export default function CompareIndexPage() {
  const order = [
    'wati',
    'aisensy',
    'interakt',
    'bitespeed',
    'zoko',
    'getgabs',
    'kanal',
    'dondy',
    'updatrr',
    'gupshup',
  ];
  const bySlug = Object.fromEntries(allCompareCompetitors().map((c) => [c.slug, c]));
  const competitors = order.map((slug) => bySlug[slug]).filter(Boolean);

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
          <p className="mkt-cmp__kicker">Comparison</p>
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
            <span className="mkt-cmp__h1-rest">WhatsApp tools</span>
          </h1>
        </header>

        <section className="mkt-cmp__block" aria-label="Featured comparison">
          <div className="mkt-cmp-index__featured">
            {FEATURED.map((f) => (
              <Link key={f.href} to={f.href} className="mkt-cmp-index__card mkt-cmp-index__card--wide">
                {f.badge ? <span className="mkt-cmp-index__badge">{f.badge}</span> : null}
                <div className="mkt-cmp-index__card-top">
                  {f.logos.map((logo, i) => (
                    <span key={logo.src} className="mkt-cmp-index__logo-stack">
                      {i > 0 ? <span className="mkt-cmp-index__vs">vs</span> : null}
                      <img src={logo.src} alt={logo.alt} width={32} height={32} />
                    </span>
                  ))}
                </div>
                <h2>{f.title}</h2>
                <p>{f.body}</p>
                <span className="mkt-cmp-index__card-cta">
                  Open board
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mkt-cmp__block" aria-label="Comparisons">
          <div className="mkt-cmp__block-head">
            <h2>
              Pairwise <span className="mkt-cmp__hl">boards</span>
            </h2>
          </div>
          <div className="mkt-cmp-index__grid">
            {competitors.map((c) => (
              <Link key={c.slug} to={`/compare/${c.slug}`} className="mkt-cmp-index__card">
                <div className="mkt-cmp-index__card-top">
                  <img src="/logo.png" alt="TopEdge AI" width={32} height={32} />
                  <span className="mkt-cmp-index__vs">vs</span>
                  <img src={c.logo} alt={c.logoAlt} width={32} height={32} />
                </div>
                <h2>TopEdge AI vs {c.name}</h2>
                <p>{c.brandTag || 'WhatsApp platform'}</p>
                <span className="mkt-cmp-index__card-cta">
                  Compare
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <MarketingCtaBand
          title="Try TopEdge AI on your store"
          subtitle="Start free, connect Shopify and WhatsApp, approve templates, publish recovery."
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
