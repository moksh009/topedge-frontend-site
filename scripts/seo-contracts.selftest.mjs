/**
 * Self-test for seo-contracts.mjs
 * Run: node scripts/seo-contracts.selftest.mjs
 */
import assert from 'node:assert/strict';
import {
  assertSnippetBudgets,
  pageTypeForPath,
  PAGE_TYPE_SCHEMA,
  TITLE_MAX,
  DESC_MAX,
} from './seo-contracts.mjs';

const good = assertSnippetBudgets(
  'WhatsApp Automation for Shopify India | TopEdge',
  'WhatsApp automation for Shopify: abandoned cart recovery, COD confirmations, Live Chat with order context, and ecommerce journeys.',
);
assert.equal(good.ok, true, good.errors.join('; '));

const badTitle = assertSnippetBudgets('A'.repeat(TITLE_MAX + 1), 'x'.repeat(120));
assert.equal(badTitle.ok, false);
assert.ok(badTitle.errors.some((e) => e.includes('title too long')));

const shortDesc = assertSnippetBudgets('Valid Title Here For SEO', 'too short');
assert.equal(shortDesc.ok, false);

const longDesc = assertSnippetBudgets('Valid Title Here For SEO', 'y'.repeat(DESC_MAX + 1));
assert.equal(longDesc.ok, false);

assert.equal(pageTypeForPath('/'), 'home');
assert.equal(pageTypeForPath('/compare/dondy'), 'compare');
assert.equal(pageTypeForPath('/404'), 'notFound');
assert.ok(PAGE_TYPE_SCHEMA.home.includes('Organization'));

console.log('✅ seo-contracts.selftest passed');
