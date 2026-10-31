import { useId, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DOC_NAV, docPathFor, getDocGroup, searchDocs } from '../registry';

/**
 * Full docs tree, always in the HTML, so every page links to every other page
 * and the whole set is one crawl hop from any entry point. The search box
 * filters titles and keywords on the client; the mobile sheet reuses this.
 */
export default function DocsSidebar({
  onNavigate,
  autoFocusSearch = false,
}: {
  onNavigate?: () => void;
  autoFocusSearch?: boolean;
}) {
  const { pathname } = useLocation();
  const current = pathname.replace(/\/+$/, '') || '/docs';
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchDocs(query, 10), [query]);
  const inputId = useId();
  const searching = query.trim().length > 0;

  return (
    <div className="docs-nav">
      <div className="docs-search" role="search">
        <label htmlFor={inputId} className="docs-search__label">
          Search docs
        </label>
        <Search size={15} className="docs-search__icon" aria-hidden />
        <input
          id={inputId}
          type="search"
          className="docs-search__input"
          placeholder="Search docs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setQuery('');
          }}
          autoComplete="off"
          spellCheck={false}
          autoFocus={autoFocusSearch}
        />
        {searching ? (
          <button type="button" className="docs-search__clear" onClick={() => setQuery('')} aria-label="Clear search">
            <X size={14} aria-hidden />
          </button>
        ) : null}
      </div>

      {searching ? (
        <div className="docs-search__results" aria-live="polite">
          {results.length ? (
            <ul>
              {results.map((article) => {
                const href = docPathFor(article.slug);
                return (
                  <li key={href}>
                    <Link
                      to={href}
                      className="docs-search__hit"
                      onClick={() => {
                        setQuery('');
                        onNavigate?.();
                      }}
                    >
                      <span className="docs-search__hit-title">{article.navLabel}</span>
                      <span className="docs-search__hit-group">{getDocGroup(article.group)?.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="docs-search__empty">No pages match “{query.trim()}”.</p>
          )}
        </div>
      ) : null}

      <nav className={cn('docs-nav__tree', searching && 'is-hidden')} aria-label="Documentation">
        {DOC_NAV.map((group) => (
          <section key={group.id} className="docs-nav__group">
            <p className="docs-nav__label">{group.label}</p>
            <ul>
              {group.articles.map((article) => {
                const href = docPathFor(article.slug);
                const active = current === href;
                return (
                  <li key={href}>
                    <Link
                      to={href}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={cn('docs-nav__link', active && 'is-active')}
                    >
                      {article.navLabel}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>
    </div>
  );
}
