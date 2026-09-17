import { Link, Navigate, useParams } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import ProductDemoVideo from '../components/home/ProductDemoVideo';
import { getSolutionVertical } from '../data/solutions';
import { demoAssetFor } from '../data/productDemoVideos';
import { organizationJsonLd, breadcrumbJsonLd, webPageJsonLd } from '../data/pageSeo';
import '../styles/solutions.css';

export default function SolutionPage() {
  const { vertical: slug = '' } = useParams();
  const solution = getSolutionVertical(slug);

  if (!solution) {
    return <Navigate to="/" replace />;
  }

  const path = `/solutions/${solution.slug}`;
  const demo = demoAssetFor(solution.demoId);
  const [wide, ...rest] = solution.bentos;
  const side = rest[0];
  const bottom = rest.slice(1);

  return (
    <>
      <MarketingSEO
        title={solution.seoTitle}
        description={solution.seoDescription}
        keywords={solution.keywords}
        path={path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: `${solution.title} ${solution.titleAccent}`.trim(),
            description: solution.seoDescription,
            path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/solutions/fashion' },
            { name: solution.name, path },
          ]),
        ]}
      />
      <MarketingPage className="mkt-sol">
        <header className="mkt-sol__hero">
          <p className="mkt-sol__eyebrow">{solution.eyebrow}</p>
          <h1 className="mkt-sol__title">
            {solution.title}{' '}
            <span className="mkt-sol__title-accent">{solution.titleAccent}</span>
          </h1>
          <p className="mkt-sol__sub">{solution.subtitle}</p>
        </header>

        {solution.showVideoFirst ? (
          <section className="mkt-sol__section mkt-sol__section--tight" aria-label="Product demo">
            <div className="mkt-sol__head">
              <h2 className="mkt-sol__head-title">
                See <span>COD → prepaid</span>
              </h2>
              <p className="mkt-sol__head-sub">
                Confirm COD, nudge prepaid, and keep RTO risk out of the courier bag.
              </p>
            </div>
            <div className="mkt-sol__video">
              <ProductDemoVideo src={demo.src} poster={demo.poster} label={solution.demoLabel} />
            </div>
          </section>
        ) : null}

        <section className="mkt-sol__section" aria-labelledby="sol-outcomes">
          <div className="mkt-sol__head">
            <h2 id="sol-outcomes" className="mkt-sol__head-title">
              What operators <span>care about</span>
            </h2>
          </div>
          <div className="mkt-sol__outcomes">
            {solution.outcomes.map((o) => (
              <article key={o.label} className="mkt-sol__outcome">
                <p className="mkt-sol__outcome-metric">{o.metric}</p>
                <p className="mkt-sol__outcome-label">{o.label}</p>
                <p className="mkt-sol__outcome-detail">{o.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mkt-sol__section" aria-labelledby="sol-how">
          <div className="mkt-sol__head">
            <h2 id="sol-how" className="mkt-sol__head-title">
              How TopEdge <span>helps</span>
            </h2>
            <p className="mkt-sol__head-sub">
              Feature-shaped workflows for {solution.name.toLowerCase()} on Shopify WhatsApp.
            </p>
          </div>

          <div className="mkt-sol__bento">
            {wide ? (
              <article className="mkt-sol__tile mkt-sol__tile--wide">
                <div className="mkt-sol__tile-art" aria-hidden>
                  <img src={wide.image} alt="" width={200} height={200} loading="lazy" decoding="async" />
                </div>
                <div className="mkt-sol__tile-body">
                  {wide.accent ? <span className="mkt-sol__tile-accent">{wide.accent}</span> : null}
                  <h3 className="mkt-sol__tile-title">{wide.title}</h3>
                  <p className="mkt-sol__tile-text">{wide.body}</p>
                </div>
              </article>
            ) : null}
            {side ? (
              <article className="mkt-sol__tile">
                <div className="mkt-sol__tile-art" aria-hidden>
                  <img src={side.image} alt="" width={200} height={200} loading="lazy" decoding="async" />
                </div>
                <div className="mkt-sol__tile-body">
                  {side.accent ? <span className="mkt-sol__tile-accent">{side.accent}</span> : null}
                  <h3 className="mkt-sol__tile-title">{side.title}</h3>
                  <p className="mkt-sol__tile-text">{side.body}</p>
                </div>
              </article>
            ) : null}
            {bottom.map((b) => (
              <article
                key={b.title}
                className={`mkt-sol__tile${bottom.length === 1 ? ' mkt-sol__tile--full' : ' mkt-sol__tile--row'}`}
              >                <div className="mkt-sol__tile-art" aria-hidden>
                  <img src={b.image} alt="" width={200} height={200} loading="lazy" decoding="async" />
                </div>
                <div className="mkt-sol__tile-body">
                  {b.accent ? <span className="mkt-sol__tile-accent">{b.accent}</span> : null}
                  <h3 className="mkt-sol__tile-title">{b.title}</h3>
                  <p className="mkt-sol__tile-text">{b.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {!solution.showVideoFirst ? (
          <section className="mkt-sol__section" aria-label="Product demo">
            <div className="mkt-sol__head">
              <h2 className="mkt-sol__head-title">
                See it <span>in motion</span>
              </h2>
            </div>
            <div className="mkt-sol__video">
              <ProductDemoVideo src={demo.src} poster={demo.poster} label={solution.demoLabel} />
            </div>
          </section>
        ) : null}

        <section className="mkt-sol__section" aria-labelledby="sol-features">
          <div className="mkt-sol__head">
            <h2 id="sol-features" className="mkt-sol__head-title">
              Features that <span>fit this vertical</span>
            </h2>
            <p className="mkt-sol__head-sub">Specific TopEdge capabilities — not generic WhatsApp tips.</p>
          </div>
          <div className="mkt-sol__helps">
            {solution.helps.map((h) => (
              <Link key={h.title} to={h.href} className="mkt-sol__help">
                <p className="mkt-sol__help-feature">{h.feature}</p>
                <h3 className="mkt-sol__help-title">{h.title}</h3>
                <p className="mkt-sol__help-body">{h.body}</p>
              </Link>
            ))}
          </div>
          <p className="mkt-sol__related">
            Also see{' '}
            {solution.related.map((r, i) => (
              <span key={r.href}>
                {i > 0 ? ' · ' : null}
                <Link to={r.href}>{r.label}</Link>
              </span>
            ))}
          </p>
        </section>

        <MarketingCtaBand
          title={solution.ctaTitle}
          subtitle={solution.ctaSub}
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
