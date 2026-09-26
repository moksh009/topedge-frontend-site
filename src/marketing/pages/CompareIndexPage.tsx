import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CalendarCheck, FileSearch, Receipt } from 'lucide-react';
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
    badge: '3-way board',
    tone: 'violet',
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
    tone: 'sky',
  },
] as const;

const ORDER = [
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

function latestResearchStamp(stamps: (string | undefined)[]): string | null {
  const counts = new Map<string, number>();
  for (const s of stamps) if (s) counts.set(s, (counts.get(s) ?? 0) + 1);
  let best: string | null = null;
  for (const [s, n] of counts) if (!best || n > (counts.get(best) ?? 0)) best = s;
  return best;
}

export default function CompareIndexPage() {
  const bySlug = Object.fromEntries(allCompareCompetitors().map((c) => [c.slug, c]));
  const competitors = ORDER.map((slug) => bySlug[slug]).filter(Boolean);
  const researchAsOf = latestResearchStamp(competitors.map((c) => c.researchAsOf));

  const method = [
    {
      icon: CalendarCheck,
      title: 'Dated research',
      body: researchAsOf
        ? `Every board shows when it was checked. Current boards: ${researchAsOf}.`
        : 'Every board shows when it was checked.',
    },
    {
      icon: FileSearch,
      title: 'Sources noted',
      body: "Pricing comes from each vendor's public pages and Shopify App Store listings. Confirm live before you buy.",
    },
    {
      icon: Receipt,
      title: 'Meta markup called out',
      body: "Each board shows how a tool prices Meta's WhatsApp template rate, separately from its plan.",
    },
  ];

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
      <MarketingPage className="mkt-cmp mkt-cmpx">
        <header className="mkt-cmp__arena mkt-cmpx__hero">
          <p className="mkt-cmpx__eyebrow">Comparison</p>
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
          <p className="mkt-cmpx__sub">
            Side-by-side boards on Meta markup, AI cost, COD → prepaid, and Shopify depth, built
            for Indian D2C brands choosing a WhatsApp platform.
          </p>
          <ul className="mkt-cmpx__chips" aria-label="How these boards are built">
            {researchAsOf ? <li>Checked {researchAsOf}</li> : null}
            <li>Public sources</li>
            <li>Meta markup per tool</li>
          </ul>
        </header>

        <section className="mkt-cmp__block mkt-cmpx__block" aria-labelledby="mkt-cmpx-featured">
          <h2 id="mkt-cmpx-featured" className="sr-only">
            Featured comparisons
          </h2>
          <div className="mkt-cmpx__featured">
            {FEATURED.map((f) => (
              <Link key={f.href} to={f.href} className={`mkt-cmpx-feat mkt-cmpx-feat--${f.tone}`}>
                <div className="mkt-cmpx-feat__top">
                  <span className="mkt-cmpx-feat__logos">
                    {f.logos.map((logo) => (
                      <img key={logo.src} src={logo.src} alt={logo.alt} width={48} height={48} />
                    ))}
                  </span>
                  <span className="mkt-cmpx-feat__badge">{f.badge}</span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
                <span className="mkt-cmpx-feat__cta">
                  Open board
                  <ArrowRight size={15} aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mkt-cmp__block mkt-cmpx__block" aria-labelledby="mkt-cmpx-pairs">
          <div className="mkt-cmpx__head">
            <h2 id="mkt-cmpx-pairs">
              Head-to-head <span className="mkt-cmp__hl">boards</span>
            </h2>
            <p>Pick the tool you are evaluating. Each board compares it with TopEdge AI row by row.</p>
          </div>
          <div className="mkt-cmpx__grid">
            {competitors.map((c) => (
              <Link
                key={c.slug}
                to={`/compare/${c.slug}`}
                className="mkt-cmpx-card"
                style={{ '--accent': c.accent } as CSSProperties}
              >
                <span className="mkt-cmpx-card__logo">
                  <img src={c.logo} alt={c.logoAlt} width={40} height={40} />
                </span>
                <ArrowUpRight className="mkt-cmpx-card__arrow" size={18} aria-hidden />
                <h3>
                  <span className="mkt-cmpx-card__pre">TopEdge AI vs</span> {c.name}
                </h3>
                <p>{c.brandTag || 'WhatsApp platform'}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mkt-cmp__block mkt-cmpx__block" aria-labelledby="mkt-cmpx-method">
          <div className="mkt-cmpx__head">
            <h2 id="mkt-cmpx-method">
              How we <span className="mkt-cmp__hl">compare</span>
            </h2>
          </div>
          <div className="mkt-cmpx__method">
            {method.map((m) => (
              <div key={m.title} className="mkt-cmpx-method">
                <span className="mkt-cmpx-method__icon">
                  <m.icon size={18} strokeWidth={2} aria-hidden />
                </span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </div>
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
