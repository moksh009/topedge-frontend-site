import { useState } from 'react';
import { Link } from 'react-router-dom';
import MarketingSEO from '../components/MarketingSEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import DemoProductVideoFrame from '../components/home/demo/DemoProductVideoFrame';
import DemoProductImageFrame from '../components/home/demo/DemoProductImageFrame';
import {
  getProductPage,
  type ProductPage,
  type ProductPageId,
  type ProductBento,
  type ProductShowcase,
} from '../data/productPages';
import { organizationJsonLd, breadcrumbJsonLd, webPageJsonLd } from '../data/pageSeo';
import '../styles/product-feature.css';

type Props = {
  pageId: ProductPageId;
};

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

function BentoTile({ tile }: { tile: ProductBento }) {
  const span = tile.span === 'half' ? 'half' : tile.span === 'full' ? 'full' : 'third';
  const label = `${tile.titleLead} ${tile.titleAccent}`.trim();

  return (
    <article className={`mkt-pf__tile mkt-pf__tile--${span}`}>
      <div className="mkt-pf__tile-visual">
        <ShotFrame src={tile.image} label={label} />
      </div>
      <div className="mkt-pf__tile-body">
        <h3 className="mkt-pf__tile-title">
          {tile.titleLead}{' '}
          <span className="mkt-pf__tile-accent">{tile.titleAccent}</span>
        </h3>
        <p className="mkt-pf__tile-copy">{tile.body}</p>
      </div>
    </article>
  );
}

function ShowcaseRow({ item, index }: { item: ProductShowcase; index: number }) {
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

function ProductFeatureView({ page }: { page: ProductPage }) {
  const fullTitle = `${page.title} ${page.titleAccent}`.replace(/\s+/g, ' ').trim();
  const hasShowcases = Boolean(page.showcases?.length);

  return (
    <>
      <MarketingSEO
        title={page.seoTitle}
        description={page.seoDescription}
        keywords={page.keywords}
        path={page.path}
        noSuffix
        jsonLd={[
          organizationJsonLd(),
          webPageJsonLd({
            name: fullTitle,
            description: page.seoDescription,
            path: page.path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Product', path: '/features' },
            { name: page.eyebrow, path: page.path },
          ]),
        ]}
      />
      <MarketingPage className="mkt-pf">
        <header className="mkt-pf__hero">
          <p className="mkt-pf__eyebrow">{page.eyebrow}</p>
          <h1 className="mkt-pf__title">
            {page.title}{' '}
            <span className="mkt-pf__title-accent">{page.titleAccent}</span>
          </h1>
          <p className="mkt-pf__sub">{page.subtitle}</p>
        </header>

        <section className="mkt-pf__media" aria-label="Product preview">
          {page.hero.kind === 'video' ? (
            <DemoProductVideoFrame
              src={page.hero.src}
              poster={page.hero.poster}
              glow={page.hero.glow ?? 'violet'}
              title={page.hero.label}
            />
          ) : (
            <DemoProductImageFrame
              src={page.hero.src}
              alt={page.hero.alt}
              glow={page.hero.glow ?? 'violet'}
            />
          )}
        </section>

        <section className="mkt-pf__section" aria-labelledby="mkt-pf-bento">
          <div className="mkt-pf__head">
            <h2 id="mkt-pf-bento" className="mkt-pf__head-title">
              {page.bentoTitle} <span>{page.bentoAccent}</span>
            </h2>
            {page.bentoSub ? <p className="mkt-pf__head-sub">{page.bentoSub}</p> : null}
          </div>
          <div className="mkt-pf__bento">
            {page.bentos.map((tile) => (
              <BentoTile key={`${tile.titleLead}-${tile.titleAccent}`} tile={tile} />
            ))}
          </div>
        </section>

        {hasShowcases ? (
          <section className="mkt-pf__section" aria-labelledby="mkt-pf-show">
            <div className="mkt-pf__head">
              <h2 id="mkt-pf-show" className="mkt-pf__head-title">
                {page.showcasesTitle} <span>{page.showcasesAccent}</span>
              </h2>
              {page.showcasesSub ? <p className="mkt-pf__head-sub">{page.showcasesSub}</p> : null}
            </div>
            <div className="mkt-pf__showcases">
              {page.showcases!.map((item, i) => (
                <ShowcaseRow key={`${item.title}-${i}`} item={item} index={i} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mkt-pf__section" aria-labelledby="mkt-pf-steps">
          <div className="mkt-pf__head">
            <h2 id="mkt-pf-steps" className="mkt-pf__head-title">
              {page.stepsTitle} <span>{page.stepsAccent}</span>
            </h2>
          </div>
          <ol className="mkt-pf__steps">
            {page.steps.map((step, i) => (
              <li key={step.title} className="mkt-pf__step">
                <span className="mkt-pf__step-num" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="mkt-pf__step-body">
                  <h3 className="mkt-pf__step-title">{step.title}</h3>
                  <p className="mkt-pf__step-copy">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mkt-pf__section mkt-pf__section--last" aria-labelledby="mkt-pf-related">
          <div className="mkt-pf__head">
            <h2 id="mkt-pf-related" className="mkt-pf__head-title">
              {page.relatedTitle} <span>{page.relatedAccent}</span>
            </h2>
          </div>
          <div className="mkt-pf__related">
            {page.related.map((r) => (
              <Link key={r.href} to={r.href} className="mkt-pf__related-link">
                {r.label}
              </Link>
            ))}
          </div>
        </section>

        <MarketingCtaBand
          title={page.ctaTitle}
          subtitle={page.ctaSub}
          primaryLabel="Start free"
          secondaryLabel="See pricing"
          secondaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}

/** Shared enterprise product page — cart, COD, flow, campaigns, CRM, and more. */
export default function ProductFeaturePage({ pageId }: Props) {
  const page = getProductPage(pageId);
  return <ProductFeatureView page={page} />;
}
