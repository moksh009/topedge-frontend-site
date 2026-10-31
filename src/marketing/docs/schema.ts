import { SITE_URL } from '../data/marketingSeo';
import { ORG_REF, WEBSITE_ID } from '../data/pageSeo';
import { plainText } from './inline';
import { docMetaDescription, docPathFor } from './registry';
import { shotFor } from './shots';
import type { DocArticle, DocBlock, DocGroup } from './types';

/**
 * JSON-LD for documentation pages.
 *
 * TechArticle + BreadcrumbList on every page (the `docs` contract in
 * scripts/seo-contracts.mjs), HowTo for the first steps block that names one,
 * and FAQPage when the article carries FAQs. Every value comes from content that
 * is rendered visibly on the same page.
 */

export function docAbsoluteUrl(slug: string): string {
  return `${SITE_URL}${docPathFor(slug)}`;
}

/** The steps block that becomes HowTo: the first one with a howToName. */
export function howToBlockIndex(blocks: DocBlock[]): number {
  return blocks.findIndex((b) => b.kind === 'steps' && Boolean(b.howToName));
}

function screenshotUrls(article: DocArticle): string[] {
  const urls: string[] = [];
  for (const b of article.blocks) {
    if (b.kind === 'image' && shotFor(b.shot)) urls.push(`${SITE_URL}/docs/img/${b.shot}.webp`);
  }
  return urls;
}

function techArticle(article: DocArticle): Record<string, unknown> {
  const url = docAbsoluteUrl(article.slug);
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${url}#article`,
    headline: plainText(article.h1),
    name: plainText(article.title),
    description: docMetaDescription(article),
    url,
    mainEntityOfPage: url,
    inLanguage: 'en-IN',
    datePublished: article.updated,
    dateModified: article.updated,
    keywords: article.keywords.join(', '),
    image: [`${SITE_URL}/og-share.jpg`, ...screenshotUrls(article)],
    author: ORG_REF,
    publisher: ORG_REF,
    isPartOf: { '@type': 'WebSite', '@id': WEBSITE_ID, name: 'TopEdge AI', url: `${SITE_URL}/` },
    audience: { '@type': 'Audience', audienceType: 'Shopify merchants using WhatsApp' },
  };
}

function breadcrumbs(article: DocArticle, group: DocGroup | undefined): Record<string, unknown> {
  const items: { name: string; item: string }[] = [
    { name: 'Home', item: `${SITE_URL}/` },
    { name: 'Docs', item: `${SITE_URL}/docs` },
  ];
  // The group is a sidebar grouping, not a URL segment; it points at its section
  // on the docs home, the closest crawlable parent.
  if (article.slug && group) {
    items.push({ name: group.label, item: `${SITE_URL}/docs#${group.id}` });
    items.push({ name: plainText(article.navLabel), item: docAbsoluteUrl(article.slug) });
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

function howTo(article: DocArticle): Record<string, unknown> | null {
  const index = howToBlockIndex(article.blocks);
  if (index < 0) return null;
  const block = article.blocks[index];
  if (block.kind !== 'steps' || !block.howToName) return null;
  const url = docAbsoluteUrl(article.slug);
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: block.howToName,
    description: docMetaDescription(article),
    url,
    inLanguage: 'en-IN',
    ...(block.totalTimeMinutes ? { totalTime: `PT${block.totalTimeMinutes}M` } : {}),
    step: block.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: plainText(step.title),
      text: plainText(step.note ? `${step.body} ${step.note}` : step.body),
      url: `${url}#step-${i + 1}`,
    })),
  };
}

function faqPage(article: DocArticle): Record<string, unknown> | null {
  if (!article.faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name: plainText(faq.question),
      acceptedAnswer: { '@type': 'Answer', text: plainText(faq.answer) },
    })),
  };
}

/** Docs home only: the hub and the pages it collects. */
function collectionPage(article: DocArticle, all: DocArticle[]): Record<string, unknown> {
  const pages = all.filter((a) => a.slug);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: plainText(article.h1),
    description: docMetaDescription(article),
    url: docAbsoluteUrl(article.slug),
    inLanguage: 'en-IN',
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: pages.length,
      itemListElement: pages.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: plainText(a.navLabel),
        url: docAbsoluteUrl(a.slug),
      })),
    },
  };
}

export function buildDocJsonLd(
  article: DocArticle,
  group: DocGroup | undefined,
  all: DocArticle[],
): Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [techArticle(article), breadcrumbs(article, group)];
  if (!article.slug) schemas.push(collectionPage(article, all));
  const recipe = howTo(article);
  if (recipe) schemas.push(recipe);
  const faq = faqPage(article);
  if (faq) schemas.push(faq);
  return schemas;
}
