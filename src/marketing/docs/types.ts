/**
 * Documentation content schema — plain data, no JSX.
 *
 * One source of truth feeds four consumers, so nothing here may import React:
 *   1. the public site renderer (prerendered HTML + JSON-LD)
 *   2. scripts/generate-docs-md.mjs  (plaintext mirrors for AI crawlers)
 *   3. scripts/generate-sitemap.mjs  (URLs + lastmod)
 *   4. scripts/sync-docs.mjs         (vendored copy for the dashboard app)
 *
 * Inline markup inside every `string` field is the restricted subset parsed by
 * `inline.ts`: **bold**, `code`, [label](/path). Keep it to that subset — the
 * Markdown mirror writes these strings through almost verbatim.
 */

export type DocGroupId = 'start' | 'guides' | 'reference' | 'platform' | 'help';

export type DocCalloutTone = 'info' | 'tip' | 'warning' | 'success';

/** Diagram keys resolved by `components/DocDiagram.tsx`. */
export type DocDiagramName =
  | 'platform-map'
  | 'message-lifecycle'
  | 'journey-runtime'
  | 'cart-recovery-ladder'
  | 'cod-prepaid-switch'
  | 'order-status-triggers'
  | 'service-window'
  | 'flow-vs-journey'
  | 'opt-in-sources'
  | 'tracking-layers'
  | 'inbox-handover'
  | 'template-approval';

export type DocStep = {
  title: string;
  body: string;
  /** Secondary line — a caveat or "what you should see" note. */
  note?: string;
};

export type DocTroubleshootCase = {
  /** What the merchant literally sees — a banner, a status, an empty table. */
  symptom: string;
  fixes: string[];
};

export type DocFaq = {
  question: string;
  answer: string;
};

export type DocRelatedLink = {
  label: string;
  href: string;
  note?: string;
};

export type DocBlock =
  /** Answer-first summary, 40–60 words. Rendered first, cited by answer engines. */
  | { kind: 'answer'; text: string }
  | { kind: 'h2'; id: string; text: string }
  | { kind: 'h3'; id: string; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'list'; ordered?: boolean; items: string[] }
  | { kind: 'prereqs'; items: string[] }
  | {
      kind: 'steps';
      /** Set to emit HowTo JSON-LD for this block. */
      howToName?: string;
      totalTimeMinutes?: number;
      steps: DocStep[];
    }
  | { kind: 'table'; caption?: string; columns: string[]; rows: string[][] }
  | { kind: 'definitions'; items: { term: string; definition: string }[] }
  | { kind: 'callout'; tone: DocCalloutTone; title?: string; body: string }
  | { kind: 'verify'; items: string[] }
  | { kind: 'troubleshoot'; cases: DocTroubleshootCase[] }
  | { kind: 'code'; language: string; code: string; caption?: string }
  | { kind: 'diagram'; name: DocDiagramName; title: string; caption?: string }
  | { kind: 'related'; links: DocRelatedLink[] }
  /**
   * Plan limits rendered from `lib/billingCatalog.ts` at render time.
   * Prices are never written into content — `check:pricing` guards the catalog,
   * and a hardcoded number here would silently go stale behind it.
   */
  | { kind: 'planLimits' };

export type DocArticle = {
  /** Path after `/docs`. Empty string is the docs home. No leading slash. */
  slug: string;
  group: DocGroupId;
  /** Sidebar label — short. */
  navLabel: string;
  /**
   * SEO title. `MarketingSEO` appends ` | TopEdge AI` when it fits, and the
   * prerender audit caps the rendered title at 65 characters, so keep this at
   * 52 or fewer to keep the brand; longer titles keep their keywords instead.
   */
  title: string;
  /** Meta description — the audit requires 70–165 characters. */
  description: string;
  h1: string;
  /** Deck paragraph under the H1. */
  lead: string;
  keywords: string[];
  /** ISO date. Drives `dateModified`, the visible freshness line, and sitemap lastmod. */
  updated: string;
  /** Deep link into the dashboard for the "do it now" button. */
  dashboard?: { route: string; label: string };
  faqs?: DocFaq[];
  blocks: DocBlock[];
};

export type DocGroup = {
  id: DocGroupId;
  label: string;
  /** One line explaining what lives in this group — used on the docs home. */
  blurb: string;
};

/** `/docs` for the home article, `/docs/<slug>` otherwise. */
export function docPath(slug: string): string {
  return slug ? `/docs/${slug}` : '/docs';
}
