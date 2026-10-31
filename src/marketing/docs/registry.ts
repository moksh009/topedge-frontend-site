import content from './content/docs.json';
import { plainText } from './inline';
import type { DocArticle, DocGroup, DocsContent } from './types';

/**
 * Lookups over content/docs.json. No content of its own.
 *
 * URL rule (shared with scripts/marketing-urls.mjs): `/docs` for the home
 * article, `/docs/<slug>` otherwise, never a trailing slash. Prerender writes
 * flat `docs/<slug>.html`, so Netlify serves the slashless form with a 200.
 */

const data = content as unknown as DocsContent;

export const DOC_GROUPS: DocGroup[] = data.groups;
export const DOC_ARTICLES: DocArticle[] = data.articles;

export function docPathFor(slug: string): string {
  return slug ? `/docs/${slug}` : '/docs';
}

const BY_SLUG = new Map(DOC_ARTICLES.map((a) => [a.slug, a]));
const BY_PATH = new Map(DOC_ARTICLES.map((a) => [docPathFor(a.slug), a]));

/** Sidebar tree: groups in reading order, each with its articles. */
export const DOC_NAV = DOC_GROUPS.map((group) => ({
  ...group,
  articles: group.slugs.map((slug) => BY_SLUG.get(slug)).filter(Boolean) as DocArticle[],
}));

/** Reading order across the whole set: the sidebar order. */
const READING_ORDER: DocArticle[] = DOC_NAV.flatMap((g) => g.articles);

export function getDocArticleByPath(pathname: string): DocArticle | undefined {
  const clean = pathname.replace(/\/+$/, '') || '/docs';
  return BY_PATH.get(clean);
}

export function getDocGroup(id: string): DocGroup | undefined {
  return DOC_GROUPS.find((g) => g.id === id);
}

export function getDocNeighbours(slug: string): { prev?: DocArticle; next?: DocArticle } {
  const i = READING_ORDER.findIndex((a) => a.slug === slug);
  if (i < 0) return {};
  return { prev: READING_ORDER[i - 1], next: READING_ORDER[i + 1] };
}

/**
 * Meta description inside the site's 110-160 character snippet budget
 * (scripts/seo-contracts.mjs fails the prerender outside it). Content is the
 * source of truth; this only trims an over-long one at a word boundary so a
 * single long description cannot fail the whole build.
 */
export function docMetaDescription(article: DocArticle): string {
  const text = plainText(article.description);
  if ([...text].length <= 160) return text;
  const cut = text.slice(0, 159);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.]+$/, '')}…`;
}

/** `<title>`: "<title> | TopEdge Docs", inside the 65-character budget. */
export function docPageTitle(article: DocArticle): string {
  if (/TopEdge Doc/i.test(article.title)) return article.title;
  const full = `${article.title} | TopEdge Docs`;
  return [...full].length <= 65 ? full : article.title;
}

type SearchHit = { article: DocArticle; score: number };

/** Client-side search over nav labels, titles, keywords and descriptions. */
export function searchDocs(query: string, limit = 8): DocArticle[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const hits: SearchHit[] = [];
  for (const article of DOC_ARTICLES) {
    const label = `${article.navLabel} ${article.title}`.toLowerCase();
    const keys = article.keywords.join(' ').toLowerCase();
    const body = `${article.description} ${article.slug}`.toLowerCase();
    let score = 0;
    let all = true;
    for (const t of terms) {
      // Word-start match, so "cod" finds COD and not "barcode".
      const re = new RegExp(`(^|[^a-z0-9])${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
      const s = re.test(label) ? 3 : re.test(keys) ? 2 : re.test(body) ? 1 : 0;
      if (!s) all = false;
      score += s;
    }
    if (all) hits.push({ article, score });
  }
  return hits
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((h) => h.article);
}
