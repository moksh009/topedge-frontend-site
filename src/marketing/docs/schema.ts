import { SITE_URL } from '../data/marketingSeo';
import { plainText } from './inline';
import { docPathFor } from './manifest.mjs';
import type { DocArticle, DocBlock, DocGroup } from './types';

/**
 * JSON-LD for documentation pages.
 *
 * `TechArticle` + `BreadcrumbList` on every page (the contract enforced by
 * scripts/seo-contracts.mjs), plus `HowTo` whenever a steps block opts in and
 * `FAQPage` whenever the article carries FAQs. Google only reads markup it can
 * tie to visible content, so every value here comes from a rendered block.
 */

const PUBLISHER = {
  '@type': 'Organization',
  name: 'TopEdge',
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/og-share.jpg`,
  },
};

export function docAbsoluteUrl(slug: string): string {
  return `${SITE_URL}${docPathFor(slug)}`;
}

function techArticle(article: DocArticle): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${docAbsoluteUrl(article.slug)}#article`,
    headline: article.h1,
    name: article.h1,
    description: article.description,
    url: docAbsoluteUrl(article.slug),
    inLanguage: 'en-IN',
    dateModified: article.updated,
    datePublished: article.updated,
    keywords: article.keywords.join(', '),
    image: `${SITE_URL}/og-share.jpg`,
    author: PUBLISHER,
    publisher: PUBLISHER,
    isPartOf: {
      '@type': 'WebSite',
      name: 'TopEdge',
      url: `${SITE_URL}/`,
    },
    // Documentation audience — reinforces the entity for answer engines.
    audience: {
      '@type': 'Audience',
      audienceType: 'Shopify merchants using WhatsApp',
    },
  };
}

function breadcrumbs(article: DocArticle, group: DocGroup | undefined): Record<string, unknown> {
  const items: { name: string; item: string }[] = [
    { name: 'Home', item: `${SITE_URL}/` },
    { name: 'Docs', item: `${SITE_URL}/docs` },
  ];
  // The group is a real sidebar grouping, not a URL segment, so it is listed
  // without an item of its own — the docs home is the closest crawlable parent.
  if (article.slug && group) {
    items.push({ name: group.label, item: `${SITE_URL}/docs#${group.id}` });
    items.push({ name: article.navLabel, item: docAbsoluteUrl(article.slug) });
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

function howTo(article: DocArticle, block: DocBlock): Record<string, unknown> | null {
  if (block.kind !== 'steps' || !block.howToName) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: block.howToName,
    description: article.description,
    url: docAbsoluteUrl(article.slug),
    inLanguage: 'en-IN',
    ...(block.totalTimeMinutes ? { totalTime: `PT${block.totalTimeMinutes}M` } : {}),
    step: block.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: plainText(step.title),
      text: plainText(step.body),
      url: `${docAbsoluteUrl(article.slug)}#${slugifyStepAnchor(block, i)}`,
    })),
  };
}

/**
 * HowToStep URLs have to resolve to something on the page. Steps render inside
 * the section they belong to, so each step points at its nearest heading anchor.
 */
function slugifyStepAnchor(block: Extract<DocBlock, { kind: 'steps' }>, index: number): string {
  void block;
  return `step-${index + 1}`;
}

function faqPage(article: DocArticle): Record<string, unknown> | null {
  if (!article.faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name: plainText(faq.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: plainText(faq.answer),
      },
    })),
  };
}

/** Docs home only — declares the hub and what it collects. */
function collectionPage(article: DocArticle, total: number): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: article.h1,
    description: article.description,
    url: docAbsoluteUrl(article.slug),
    inLanguage: 'en-IN',
    isPartOf: { '@type': 'WebSite', name: 'TopEdge', url: `${SITE_URL}/` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: total,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
    },
  };
}

export function buildDocJsonLd(
  article: DocArticle,
  group: DocGroup | undefined,
  options: { totalArticles: number },
): Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [techArticle(article), breadcrumbs(article, group)];

  if (!article.slug) {
    schemas.push(collectionPage(article, options.totalArticles));
  }

  for (const block of article.blocks) {
    const recipe = howTo(article, block);
    // One HowTo per page: multiple on a single URL compete and Google picks one.
    if (recipe) {
      schemas.push(recipe);
      break;
    }
  }

  const faq = faqPage(article);
  if (faq) schemas.push(faq);

  return schemas;
}
