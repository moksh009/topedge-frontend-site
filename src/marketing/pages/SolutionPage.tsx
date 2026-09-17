import { Link, Navigate, useParams } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import DemoProductImageFrame from '../components/home/demo/DemoProductImageFrame';
import { PrimaryButton, GhostButton } from '../components/ui';
import { getSolutionVertical, type SolutionBento } from '../data/solutions';
import { organizationJsonLd, breadcrumbJsonLd, webPageJsonLd } from '../data/pageSeo';
import '../styles/product-feature.css';
import '../styles/solutions.css';

function BentoTile({ tile }: { tile: SolutionBento }) {
  const span = tile.span === 'half' ? 'half' : 'full';

  return (
    <article className={`mkt-pf__tile mkt-pf__tile--${span} mkt-sol__tile`}>
      <div className="mkt-pf__tile-visual">
        <img
          className="mkt-pf__tile-img"
          src={tile.image}
          alt=""
          width={span === 'full' ? 1280 : 1152}
          height={span === 'full' ? 720 : 864}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="mkt-pf__tile-body">
        <h3 className="mkt-pf__tile-title">
          {tile.titleLead} <span className="mkt-pf__tile-accent">{tile.titleAccent}</span>
        </h3>
        <p className="mkt-pf__tile-copy">{tile.body}</p>
      </div>
    </article>
  );
}

export default function SolutionPage() {
  const { vertical: slug = '' } = useParams();
  const solution = getSolutionVertical(slug);

  if (!solution) {
    return <Navigate to="/" replace />;
  }

  const path = `/solutions/${solution.slug}`;
  const fullTitle = `${solution.title} ${solution.titleAccent}`.replace(/\s+/g, ' ').trim();

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
            name: fullTitle,
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
      <MarketingPage className="mkt-pf mkt-sol">
        <header className="mkt-pf__hero mkt-sol__hero">
          <p className="mkt-pf__eyebrow">{solution.eyebrow}</p>
          <h1 className="mkt-pf__title">
            {solution.title} <span className="mkt-pf__title-accent">{solution.titleAccent}</span>
          </h1>
          <p className="mkt-pf__sub">{solution.subtitle}</p>
          <div className="mkt-sol__actions">
            <PrimaryButton to="/signup">Start free</PrimaryButton>
            <GhostButton to="/pricing">See pricing</GhostButton>
          </div>
        </header>

        <section className="mkt-pf__media mkt-sol__media" aria-label={`${solution.name} preview`}>
          <DemoProductImageFrame
            src={solution.heroImage}
            alt={solution.heroAlt}
            glow="violet"
          />
        </section>

        <section className="mkt-pf__section" aria-labelledby="sol-how">
          <div className="mkt-pf__head">
            <h2 id="sol-how" className="mkt-pf__head-title">
              {solution.bentoTitle} <span>{solution.bentoAccent}</span>
            </h2>
            <p className="mkt-pf__head-sub">{solution.bentoSub}</p>
          </div>
          <div className="mkt-pf__bento">
            {solution.bentos.map((tile) => (
              <BentoTile key={`${tile.titleLead}-${tile.titleAccent}`} tile={tile} />
            ))}
          </div>
        </section>

        <section className="mkt-pf__section" aria-labelledby="sol-features">
          <div className="mkt-pf__head">
            <h2 id="sol-features" className="mkt-pf__head-title">
              {solution.helpsTitle} <span>{solution.helpsAccent}</span>
            </h2>
            <p className="mkt-pf__head-sub">{solution.helpsSub}</p>
          </div>
          <div className="mkt-sol__helps">
            {solution.helps.map((h, i) => (
              <Link key={h.title} to={h.href} className="mkt-sol__help">
                <span className="mkt-sol__help-num" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="mkt-sol__help-body">
                  <p className="mkt-sol__help-feature">{h.feature}</p>
                  <h3 className="mkt-sol__help-title">{h.title}</h3>
                  <p className="mkt-sol__help-copy">{h.body}</p>
                </div>
                <span className="mkt-sol__help-arrow" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mkt-pf__section mkt-pf__section--last" aria-labelledby="sol-related">
          <div className="mkt-pf__head">
            <h2 id="sol-related" className="mkt-pf__head-title">
              {solution.relatedTitle} <span>{solution.relatedAccent}</span>
            </h2>
          </div>
          <div className="mkt-pf__related">
            {solution.related.map((r) => (
              <Link key={r.href} to={r.href} className="mkt-pf__related-link">
                {r.label}
              </Link>
            ))}
          </div>
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
