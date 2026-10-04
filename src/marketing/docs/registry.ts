import { DOC_GROUPS, DOC_SLUGS, DOC_SLUGS_BY_GROUP, docPathFor } from './manifest.mjs';
import type { DocArticle, DocGroup, DocGroupId } from './types';
import { START_ARTICLES } from './content/start';
import { GUIDE_ARTICLES } from './content/guides';
import { REFERENCE_ARTICLES } from './content/reference';
import { PLATFORM_ARTICLES } from './content/platform';
import { HELP_ARTICLES } from './content/help';

const ALL_ARTICLES: DocArticle[] = [
  ...START_ARTICLES,
  ...GUIDE_ARTICLES,
  ...REFERENCE_ARTICLES,
  ...PLATFORM_ARTICLES,
  ...HELP_ARTICLES,
];

const BY_SLUG = new Map<string, DocArticle>();
for (const article of ALL_ARTICLES) {
  if (BY_SLUG.has(article.slug)) {
    throw new Error(`[docs] duplicate article slug: "${article.slug}"`);
  }
  BY_SLUG.set(article.slug, article);
}

/**
 * The manifest is what prerender and the sitemap iterate, so a slug that exists
 * in only one of the two halves is an unindexed page (or a 404 in the sitemap).
 * Fail at module load instead: the prerender run turns this into a build error.
 */
const missing = DOC_SLUGS.filter((slug) => !BY_SLUG.has(slug));
if (missing.length) {
  throw new Error(
    `[docs] manifest lists ${missing.length} slug(s) with no article: ${missing
      .map((s) => `"${s}"`)
      .join(', ')}`,
  );
}
const unlisted = ALL_ARTICLES.map((a) => a.slug).filter((slug) => !DOC_SLUGS.includes(slug));
if (unlisted.length) {
  throw new Error(
    `[docs] ${unlisted.length} article(s) missing from manifest.mjs (they would never be ` +
      `prerendered or added to the sitemap): ${unlisted.map((s) => `"${s}"`).join(', ')}`,
  );
}

/** Articles in reading order. */
export const DOC_ARTICLES: DocArticle[] = DOC_SLUGS.map((slug) => BY_SLUG.get(slug) as DocArticle);

export const DOC_GROUP_LIST: DocGroup[] = DOC_GROUPS as DocGroup[];

export type DocNavGroup = DocGroup & { articles: DocArticle[] };

/** Sidebar tree — groups in manifest order, each with its articles. */
export const DOC_NAV: DocNavGroup[] = DOC_GROUP_LIST.map((group) => ({
  ...group,
  articles: (DOC_SLUGS_BY_GROUP[group.id] || []).map((slug) => BY_SLUG.get(slug) as DocArticle),
}));

export function getDocArticle(slug: string): DocArticle | undefined {
  return BY_SLUG.get(slug);
}

/** Resolve a full pathname (`/docs/guides/x`) to its article. */
export function getDocArticleByPath(pathname: string): DocArticle | undefined {
  const clean = pathname.replace(/\/+$/, '') || '/docs';
  if (clean === '/docs') return BY_SLUG.get('');
  if (!clean.startsWith('/docs/')) return undefined;
  return BY_SLUG.get(clean.slice('/docs/'.length));
}

export function getDocGroup(id: DocGroupId): DocGroup | undefined {
  return DOC_GROUP_LIST.find((g) => g.id === id);
}

export type DocNeighbours = {
  prev?: { label: string; path: string };
  next?: { label: string; path: string };
};

/** Prev/next in flat reading order, so the footer walks the whole set. */
export function getDocNeighbours(slug: string): DocNeighbours {
  const index = DOC_SLUGS.indexOf(slug);
  if (index < 0) return {};
  const at = (i: number) => {
    const article = DOC_ARTICLES[i];
    return article ? { label: article.navLabel, path: docPathFor(article.slug) } : undefined;
  };
  return { prev: index > 0 ? at(index - 1) : undefined, next: at(index + 1) };
}

/** Most recent `updated` across all articles — the docs hub's own freshness date. */
export function latestDocUpdate(): string {
  return DOC_ARTICLES.reduce((max, a) => (a.updated > max ? a.updated : max), '1970-01-01');
}

/** Simple client-side search over label, title, keywords and slug. */
export function searchDocs(query: string, limit = 8): DocArticle[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored = DOC_ARTICLES.map((article) => {
    const haystack = [
      article.navLabel,
      article.title,
      article.description,
      article.slug,
      ...(article.keywords || []),
    ]
      .join(' ')
      .toLowerCase();
    if (!haystack.includes(q)) return null;
    // Label matches beat a hit buried in the description.
    const score = article.navLabel.toLowerCase().includes(q) ? 0 : 1;
    return { article, score };
  }).filter((x): x is { article: DocArticle; score: number } => x !== null);

  return scored
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((x) => x.article);
}

export { docPathFor };
