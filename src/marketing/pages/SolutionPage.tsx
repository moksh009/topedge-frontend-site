import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import DemoProductImageFrame from '../components/home/demo/DemoProductImageFrame';
import { PrimaryButton, GhostButton } from '../components/ui';
import {
  getSolutionVertical,
  type SolutionBento,
  type SolutionShowcase,
} from '../data/solutions';
import { organizationJsonLd, breadcrumbJsonLd, webPageJsonLd } from '../data/pageSeo';
import '../styles/product-feature.css';
import '../styles/solutions.css';

function ShotFrame({
  src,
  label,
  wide,
}: {
  src: string;
  label: string;
  wide?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const empty = failed || !src;

  if (empty) {
    return (
      <div className={`mkt-pf__shot${wide ? ' is-wide' : ''} is-empty`} role="img" aria-label={label}>
        <span className="mkt-pf__shot-label">{label}</span>
        <span className="mkt-pf__shot-hint">Add dashboard screenshot</span>
      </div>
    );
  }

  return (
    <div className={`mkt-pf__shot${wide ? ' is-wide' : ''}`}>
      <img
        className="mkt-pf__shot-img"
        src={src}
        alt={label}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function BentoTile({ tile }: { tile: SolutionBento }) {
  const span = tile.span === 'half' ? 'half' : tile.span === 'full' ? 'full' : 'third';
  const label = `${tile.titleLead} ${tile.titleAccent}`.trim();

  return (
    <article className={`mkt-pf__tile mkt-pf__tile--${span} mkt-sol__tile`}>
      <div className="mkt-pf__tile-visual">
        <ShotFrame src={tile.image} label={label} />
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

function ShowcaseRow({ item, index }: { item: SolutionShowcase; index: number }) {
  const reverse = item.reverse ?? index % 2 === 1;
  const label = item.imageLabel || `${item.title}${item.titleAccent ? ` ${item.titleAccent}` : ''}`;

  return (
    <article className={`mkt-pf__showcase${reverse ? ' is-reverse' : ''}`}>
      <div className="mkt-pf__showcase-media">
        <ShotFrame src={item.image} label={label} wide />
      </div>
      <div className="mkt-pf__showcase-copy">
        <h3 className="mkt-pf__showcase-title">
          {item.title}
          {item.titleAccent ? (
            <>
              {' '}
              <span className="mkt-pf__tile-accent">{item.titleAccent}</span>
            </>
          ) : null}
        </h3>
        <p className="mkt-pf__showcase-body">{item.body}</p>
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
  const hasShowcases = Boolean(solution.showcases?.length);

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

        {hasShowcases ? (
          <section className="mkt-pf__section" aria-labelledby="sol-show">
            <div className="mkt-pf__head">
              <h2 id="sol-show" className="mkt-pf__head-title">
                {solution.showcasesTitle} <span>{solution.showcasesAccent}</span>
              </h2>
              {solution.showcasesSub ? (
                <p className="mkt-pf__head-sub">{solution.showcasesSub}</p>
              ) : null}
            </div>
            <div className="mkt-pf__showcases">
              {solution.showcases!.map((item, i) => (
                <ShowcaseRow key={`${item.title}-${i}`} item={item} index={i} />
              ))}
            </div>
          </section>
        ) : null}

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
