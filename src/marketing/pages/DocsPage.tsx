import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronRight, ExternalLink, Menu, X } from 'lucide-react';
import MarketingPage from '../components/MarketingPage';
import MarketingSEO from '../components/MarketingSEO';
import MarketingCtaBand from '../components/MarketingCtaBand';
import NotFoundPage from './NotFoundPage';
import DocBlocks from '../docs/components/DocBlocks';
import DocInline from '../docs/components/DocInline';
import DocsSidebar from '../docs/components/DocsSidebar';
import DocsToc, { type TocEntry } from '../docs/components/DocsToc';
import {
  DOC_ARTICLES,
  DOC_NAV,
  docMetaDescription,
  docPageTitle,
  docPathFor,
  getDocArticleByPath,
  getDocGroup,
  getDocNeighbours,
} from '../docs/registry';
import { buildDocJsonLd, howToBlockIndex } from '../docs/schema';
import { DASH_ORIGIN } from '../lib/billingCatalog';
import '../styles/docs.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Formatted from the ISO string's own parts, not through Date: `new Date('2026-10-04')`
 * is UTC midnight, so a locale format can paint a different day than the
 * prerendered HTML and break hydration.
 */
function formatUpdated(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export default function DocsPage() {
  const { pathname, hash } = useLocation();
  const article = getDocArticleByPath(pathname);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  // Deep links (#section) on a client-side navigation: the target only exists
  // after this route renders, so scroll to it once it does.
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: 'start' });
    }, 60);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);

  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSheetOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [sheetOpen]);

  const toc: TocEntry[] = useMemo(() => {
    if (!article) return [];
    const entries = article.blocks.flatMap((b) => (b.kind === 'h2' ? [{ id: b.id, text: b.text }] : []));
    if (!article.slug) entries.unshift({ id: 'browse', text: 'Browse the docs' });
    if (article.faqs?.length) entries.push({ id: 'faq', text: 'Frequently asked questions' });
    return entries;
  }, [article]);

  // Unknown /docs/* path: the shared 404 shell sets noindex.
  if (!article) return <NotFoundPage />;

  const group = getDocGroup(article.group);
  const { prev, next } = getDocNeighbours(article.slug);
  const isHome = article.slug === '';
  const path = docPathFor(article.slug);
  const jsonLd = buildDocJsonLd(article, group, DOC_ARTICLES);
  const dashboardUrl = article.dashboard ? `${DASH_ORIGIN}${article.dashboard.route}` : null;
  const howToIndex = howToBlockIndex(article.blocks);
  // Docs home: the short answer, then the map of every page, then the rest.
  const introCount = isHome ? article.blocks.findIndex((b) => b.kind !== 'answer') : 0;
  const introBlocks = introCount > 0 ? article.blocks.slice(0, introCount) : [];
  const bodyBlocks = introCount > 0 ? article.blocks.slice(introCount) : article.blocks;

  return (
    <MarketingPage className="docs-shell">
      <MarketingSEO
        title={docPageTitle(article)}
        noSuffix
        description={docMetaDescription(article)}
        path={path}
        keywords={article.keywords.join(', ')}
        type="article"
        articlePublished={article.updated}
        articleModified={article.updated}
        articleSection={group?.label}
        jsonLd={jsonLd}
      />

      <div className="docs-layout">
        <aside className="docs-sidebar" aria-label="Documentation navigation">
          <div className="docs-sidebar__inner" data-lenis-prevent>
            <Link to="/docs" className="docs-sidebar__home">
              TopEdge <span>Docs</span>
            </Link>
            <DocsSidebar />
          </div>
        </aside>

        <div className="docs-main">
          <div className="docs-topbar">
            <button
              type="button"
              className="docs-topbar__menu"
              onClick={() => setSheetOpen(true)}
              aria-expanded={sheetOpen}
              aria-controls="docs-sheet"
            >
              <Menu size={16} aria-hidden />
              Menu
            </button>
            <nav className="docs-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={13} aria-hidden />
              {isHome ? (
                <span aria-current="page">Docs</span>
              ) : (
                <>
                  <Link to="/docs">Docs</Link>
                  <ChevronRight size={13} aria-hidden />
                  {group ? (
                    <>
                      <Link to={`/docs#${group.id}`} className="docs-crumbs__group">
                        {group.label}
                      </Link>
                      <ChevronRight size={13} aria-hidden className="docs-crumbs__group" />
                    </>
                  ) : null}
                  <span aria-current="page">{article.navLabel}</span>
                </>
              )}
            </nav>
          </div>

          <article className="docs-article">
            <header className="docs-head">
              {!isHome && group ? <p className="docs-eyebrow">{group.label}</p> : null}
              <h1 className="docs-h1">{article.h1}</h1>
              <p className="docs-lead">
                <DocInline text={article.lead} />
              </p>
              <div className="docs-meta">
                {/* Visible freshness signal, matched by dateModified in the JSON-LD. */}
                <time dateTime={article.updated} className="docs-meta__date">
                  Updated {formatUpdated(article.updated)}
                </time>
                {dashboardUrl && article.dashboard ? (
                  <a className="docs-meta__cta" href={dashboardUrl} target="_blank" rel="noopener noreferrer">
                    {article.dashboard.label}
                    <ExternalLink size={14} aria-hidden />
                  </a>
                ) : null}
              </div>
            </header>

            <div className="docs-body">
              {introBlocks.length ? <DocBlocks blocks={introBlocks} /> : null}

              {isHome ? (
                <section className="docs-index" aria-labelledby="browse">
                  <h2 id="browse" className="docs-h2">
                    Browse the docs
                  </h2>
                  <div className="docs-index__grid">
                    {DOC_NAV.filter((g) => g.articles.some((a) => a.slug)).map((navGroup) => (
                      <section key={navGroup.id} id={navGroup.id} className="docs-index__card">
                        <h3 className="docs-index__title">{navGroup.label}</h3>
                        <p className="docs-index__blurb">{navGroup.blurb}</p>
                        <ul className="docs-index__list">
                          {navGroup.articles
                            .filter((entry) => entry.slug)
                            .map((entry) => (
                              <li key={entry.slug}>
                                <Link to={docPathFor(entry.slug)} className="docs-index__link">
                                  <span>{entry.navLabel}</span>
                                  <ArrowRight size={14} aria-hidden />
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </section>
              ) : null}

              <DocBlocks blocks={bodyBlocks} howToIndex={howToIndex - (article.blocks.length - bodyBlocks.length)} />

              {article.faqs?.length ? (
                <section className="docs-faq" aria-labelledby="faq">
                  {/* Visible because FAQPage markup must match on-page content. */}
                  <h2 id="faq" className="docs-h2">
                    Frequently asked questions
                  </h2>
                  <dl className="docs-faq__list">
                    {article.faqs.map((faq, i) => (
                      <div key={i} className="docs-faq__row">
                        <dt>
                          <DocInline text={faq.question} />
                        </dt>
                        <dd>
                          <DocInline text={faq.answer} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}
            </div>

            <footer className="docs-foot">
              <p className="docs-foot__help">
                Still stuck? <Link to="/contact">Contact support</Link> with your store domain and what you
                expected to happen. New to TopEdge? See <Link to="/features">every feature</Link> or{' '}
                <Link to="/pricing">compare plans</Link>.
              </p>
              <nav className="docs-pager" aria-label="Previous and next page">
                {prev ? (
                  <Link to={docPathFor(prev.slug)} className="docs-pager__link">
                    <span className="docs-pager__dir">
                      <ArrowLeft size={14} aria-hidden />
                      Previous
                    </span>
                    <span className="docs-pager__title">{prev.navLabel}</span>
                  </Link>
                ) : (
                  <span className="docs-pager__spacer" />
                )}
                {next ? (
                  <Link to={docPathFor(next.slug)} className="docs-pager__link is-next">
                    <span className="docs-pager__dir">
                      Next
                      <ArrowRight size={14} aria-hidden />
                    </span>
                    <span className="docs-pager__title">{next.navLabel}</span>
                  </Link>
                ) : null}
              </nav>
            </footer>
          </article>
        </div>

        <aside className="docs-rail" aria-label="On this page">
          <div className="docs-rail__inner" data-lenis-prevent>
            <DocsToc entries={toc} />
            {dashboardUrl && article.dashboard ? (
              <a className="docs-rail__cta" href={dashboardUrl} target="_blank" rel="noopener noreferrer">
                {article.dashboard.label}
                <ExternalLink size={13} aria-hidden />
              </a>
            ) : null}
          </div>
        </aside>
      </div>

      <MarketingCtaBand
        title="Run these automations on your own store"
        subtitle="Connect Shopify and WhatsApp in one sitting. Compare plans on the pricing page, or see every feature first."
        primaryLabel="Start free"
        primaryTo="/signup"
        secondaryLabel="See pricing"
        secondaryTo="/pricing"
      />

      {sheetOpen ? (
        <div className="docs-sheet" id="docs-sheet" role="dialog" aria-modal="true" aria-label="Documentation menu">
          <button
            type="button"
            className="docs-sheet__scrim"
            aria-label="Close menu"
            onClick={() => setSheetOpen(false)}
          />
          <div className="docs-sheet__panel" data-lenis-prevent>
            <div className="docs-sheet__head">
              <Link to="/docs" className="docs-sidebar__home" onClick={() => setSheetOpen(false)}>
                TopEdge <span>Docs</span>
              </Link>
              <button type="button" className="docs-sheet__close" onClick={() => setSheetOpen(false)} aria-label="Close">
                <X size={18} aria-hidden />
              </button>
            </div>
            <DocsSidebar onNavigate={() => setSheetOpen(false)} />
          </div>
        </div>
      ) : null}
    </MarketingPage>
  );
}
