import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { DOC_NAV, docPathFor } from '../registry';

/**
 * Full docs tree, always rendered in the HTML.
 *
 * Every page therefore links to every other page, so the whole set is reachable
 * in one crawl hop from any entry point and link equity spreads instead of
 * pooling on the hub. The mobile drawer reuses the same markup.
 */
export default function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const current = pathname.replace(/\/+$/, '') || '/docs';

  return (
    <nav className="docs-sidebar__nav" aria-label="Documentation">
      {DOC_NAV.map((group) => (
        <section key={group.id} className="docs-sidebar__group">
          <p className="docs-sidebar__label" id={`sidebar-${group.id}`}>
            {group.label}
          </p>
          <ul aria-labelledby={`sidebar-${group.id}`}>
            {group.articles.map((article) => {
              const href = docPathFor(article.slug);
              const active = current === href;
              return (
                <li key={href}>
                  <Link
                    to={href}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={cn('docs-sidebar__link', active && 'is-active')}
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
  );
}
