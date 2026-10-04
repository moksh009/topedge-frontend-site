import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight, ExternalLink, X } from 'lucide-react';
import MarketingPage from '../components/MarketingPage';
import MarketingSEO from '../components/MarketingSEO';
import NotFoundPage from './NotFoundPage';
import DocBlocks from '../docs/components/DocBlocks';
import DocInline from '../docs/components/DocInline';
import DocsSidebar from '../docs/components/DocsSidebar';
import DocsToc from '../docs/components/DocsToc';
import { tocFromBlocks } from '../docs/toc';
import {
  DOC_ARTICLES,
  DOC_NAV,
  docPathFor,
  getDocArticleByPath,
  getDocGroup,
  getDocNeighbours,
} from '../docs/registry';
import { buildDocJsonLd } from '../docs/schema';
import { DASH_ORIGIN } from '../lib/billingCatalog';
import '../styles/docs.css';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Formatted from the ISO string's own parts rather than through `Date`.
 * `new Date('2026-10-04')` is UTC midnight, so `toLocaleDateString` renders a
 * different day either side of UTC — and the prerendered HTML would then not
 * match what the client paints.
 */
function formatUpdated(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export default function DocsPage() {
  const { pathname } = useLocation();
  const article = getDocArticleByPath(pathname);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  // Unknown /docs/* path: the shared 404 shell already sets noindex, so this
  // never becomes a thin indexable page.
  if (!article) return <NotFoundPage />;

  const group = getDocGroup(article.group);
  const neighbours = getDocNeighbours(article.slug);
  const toc = tocFromBlocks(article.blocks);
  const isHome = article.slug === '';
  const jsonLd = buildDocJsonLd(article, group, { totalArticles: DOC_ARTICLES.length });

  return (
    <MarketingPage className="docs-shell">
      <MarketingSEO
        title={article.title}
        description={article.description}
        path={docPathFor(article.slug)}
        keywords={article.keywords.join(', ')}
        type="article"
        articlePublished={article.updated}
        articleModified={article.updated}
        jsonLd={jsonLd}
      />

      <div className="docs-layout">
        <aside className="docs-sidebar" aria-label="Documentation sidebar">
          <div className="docs-sidebar__inner">
            <Link to="/docs" className="docs-sidebar__home">
              <BookOpen size={14} aria-hidden />
              Documentation
            </Link>
            <DocsSidebar />
          </div>
        </aside>

        <main className="docs-main">
          <div className="docs-main__bar">
            <button
              type="button"
              className="docs-main__menu"
              onClick={() => setDrawerOpen(true)}
              aria-expanded={drawerOpen}
            >
              <BookOpen size={14} aria-hidden />
              All docs
            </button>
            <nav className="docs-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={12} aria-hidden />
              {isHome ? (
                <span aria-current="page">Docs</span>
              ) : (
                <>
                  <Link to="/docs">Docs</Link>
                  <ChevronRight size={12} aria-hidden />
                  <span aria-current="page">{article.navLabel}</span>
                </>
              )}
            </nav>
          </div>

          <article className="docs-article">
            <header className="docs-article__head">
              {group ? <p className="docs-eyebrow">{group.label}</p> : null}
              <h1 className="docs-h1">{article.h1}</h1>
              <p className="docs-lead">
                <DocInline text={article.lead} />
              </p>
              <div className="docs-article__meta">
                {/* Visible freshness signal, matched by dateModified in JSON-LD. */}
                <time dateTime={article.updated}>Updated {formatUpdated(article.updated)}</time>
                {article.dashboard ? (
                  <a
                    className="docs-article__cta"
                    href={`${DASH_ORIGIN}${article.dashboard.route}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.dashboard.label}
                    <ExternalLink size={12} aria-hidden />
                  </a>
                ) : null}
              </div>
            </header>

            <div className="docs-body">
              <DocBlocks blocks={article.blocks} />
            </div>

            {isHome ? (
              <section className="docs-index" aria-label="All documentation">
                {DOC_NAV.map((navGroup) => (
                  <section key={navGroup.id} id={navGroup.id} className="docs-index__group">
                    <h2 className="docs-h2">{navGroup.label}</h2>
                    <p className="docs-index__blurb">{navGroup.blurb}</p>
                    <ul className="docs-index__list">
                      {navGroup.articles.map((entry) => (
                        <li key={entry.slug}>
                          <Link to={docPathFor(entry.slug)} className="docs-index__card">
                            <span className="docs-index__card-title">{entry.navLabel}</span>
                            <span className="docs-index__card-desc">{entry.description}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </section>
            ) : null}

            {article.faqs?.length ? (
              <section className="docs-faq" aria-labelledby="faq">
                {/* Rendered visibly because FAQPage markup must match on-page content. */}
                <h2 id="faq" className="docs-h2">
                  Frequently asked questions
                </h2>
                <dl>
                  {article.faqs.map((faq, i) => (
                    <div key={i} className="docs-faq__row">
                      <dt>{faq.question}</dt>
                      <dd>
                        <DocInline text={faq.answer} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            <nav className="docs-pager" aria-label="More documentation">
              {neighbours.prev ? (
                <Link to={neighbours.prev.path} className="docs-pager__link">
                  <ArrowLeft size={13} aria-hidden />
                  <span>
                    <span className="docs-pager__dir">Previous</span>
                    {neighbours.prev.label}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {neighbours.next ? (
                <Link to={neighbours.next.path} className="docs-pager__link is-next">
                  <span>
                    <span className="docs-pager__dir">Next</span>
                    {neighbours.next.label}
                  </span>
                  <ArrowRight size={13} aria-hidden />
                </Link>
              ) : null}
            </nav>
          </article>
        </main>

        <aside className="docs-rail" aria-label="On this page">
          <div className="docs-rail__inner">
            <DocsToc entries={toc} />
            <div className="docs-rail__help">
              <p className="docs-rail__help-title">Need a hand?</p>
              <p className="docs-rail__help-body">
                Tell us your store domain and what you expected to happen.
              </p>
              <Link to="/contact" className="docs-rail__help-link">
                Contact support
                <ArrowRight size={12} aria-hidden />
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {drawerOpen ? (
        <div className="docs-drawer" role="dialog" aria-modal="true" aria-label="Documentation">
          <button
            type="button"
            className="docs-drawer__scrim"
            aria-label="Close documentation menu"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="docs-drawer__panel">
            <div className="docs-drawer__head">
              <span>Documentation</span>
              <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close">
                <X size={16} aria-hidden />
              </button>
            </div>
            <DocsSidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      ) : null}
    </MarketingPage>
  );
}
