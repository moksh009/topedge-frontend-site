/**
 * Content checks for the documentation set.
 *
 * The prerender audit already enforces snippet budgets and schema contracts, but
 * it only runs after a full Playwright build. These checks read the content
 * modules directly, so a too-long title or a link to a page that does not exist
 * fails in seconds instead of ten minutes into a deploy.
 *
 * Usage: npm run check:docs
 */
import { assertSnippetBudgets } from './seo-contracts.mjs';
import { loadDocsModule, loadDocsRegistry } from './load-docs-content.mjs';
import { getSitemapPaths } from './marketing-urls.mjs';
import { DOC_PATHS } from '../src/marketing/docs/manifest.mjs';

const DIAGRAMS = new Set([
  'platform-map',
  'message-lifecycle',
  'journey-runtime',
  'cart-recovery-ladder',
  'cod-prepaid-switch',
  'order-status-triggers',
  'service-window',
  'flow-vs-journey',
  'opt-in-sources',
  'tracking-layers',
  'inbox-handover',
  'template-approval',
]);

/** Mirrors the suffix rule in MarketingSEO so budgets match what ships. */
function renderedTitle(title) {
  return title.includes('TopEdge') ? title : `${title} | TopEdge`;
}

const LINK_RE = /\[[^\]]+\]\(([^)\s]+)\)/g;
const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;

function collectStrings(article) {
  const out = [];
  const push = (v) => {
    if (typeof v === 'string') out.push(v);
  };
  push(article.lead);
  for (const block of article.blocks) {
    switch (block.kind) {
      case 'answer':
      case 'p':
      case 'h2':
      case 'h3':
        push(block.text);
        break;
      case 'list':
      case 'prereqs':
      case 'verify':
        block.items.forEach(push);
        break;
      case 'steps':
        block.steps.forEach((s) => {
          push(s.title);
          push(s.body);
          push(s.note);
        });
        break;
      case 'table':
        block.columns.forEach(push);
        block.rows.forEach((row) => row.forEach(push));
        break;
      case 'definitions':
        block.items.forEach((i) => {
          push(i.term);
          push(i.definition);
        });
        break;
      case 'callout':
        push(block.title);
        push(block.body);
        break;
      case 'troubleshoot':
        block.cases.forEach((c) => {
          push(c.symptom);
          c.fixes.forEach(push);
        });
        break;
      case 'related':
        block.links.forEach((l) => out.push(`[${l.label}](${l.href})`));
        break;
      default:
        break;
    }
  }
  for (const faq of article.faqs || []) {
    push(faq.question);
    push(faq.answer);
  }
  return out;
}

/**
 * With a module path argument, check just that group — useful while a group is
 * still being written and `registry.ts` would refuse to load. With no argument,
 * check the whole published set, which is what `check:docs` runs.
 */
const onlyModule = process.argv[2];
const docPathFor = (slug) => (slug ? `/docs/${slug}` : '/docs');
const DOC_ARTICLES = onlyModule
  ? Object.values(await loadDocsModule(onlyModule)).flat().filter((a) => a && a.slug !== undefined)
  : (await loadDocsRegistry()).DOC_ARTICLES;

const errors = [];
// Every documentation URL the manifest declares — not just the ones loaded here,
// so a single-module run still resolves links into groups written later.
const docPaths = new Set(DOC_PATHS);
const loadedPaths = new Set(DOC_ARTICLES.map((a) => docPathFor(a.slug)));
// Marketing pages docs are allowed to link to, plus the dashboard-facing paths
// that SignupRedirect / LoginRedirect own.
const knownPaths = new Set([...getSitemapPaths(), ...docPaths, '/signup', '/login', '/404']);

const titles = new Map();
const descriptions = new Map();

for (const article of DOC_ARTICLES) {
  const where = docPathFor(article.slug);

  const budgets = assertSnippetBudgets(renderedTitle(article.title), article.description);
  if (!budgets.ok) {
    for (const e of budgets.errors) errors.push(`${where}: ${e}`);
  }

  const titleKey = renderedTitle(article.title).toLowerCase();
  if (titles.has(titleKey)) {
    errors.push(`${where}: duplicate title, also used by ${titles.get(titleKey)}`);
  } else {
    titles.set(titleKey, where);
  }

  const descKey = article.description.trim().toLowerCase();
  if (descriptions.has(descKey)) {
    errors.push(`${where}: duplicate description, also used by ${descriptions.get(descKey)}`);
  } else {
    descriptions.set(descKey, where);
  }

  if (!ISO_RE.test(article.updated)) {
    errors.push(`${where}: updated "${article.updated}" is not YYYY-MM-DD`);
  }
  if (!article.keywords?.length) {
    errors.push(`${where}: no keywords`);
  }
  if (!article.h1?.trim()) {
    errors.push(`${where}: missing h1`);
  }

  // Answer-first: the block that answer engines quote has to be there, and first.
  const firstContent = article.blocks.find((b) => b.kind !== 'h2' && b.kind !== 'h3');
  if (firstContent?.kind !== 'answer') {
    errors.push(`${where}: first block must be an 'answer' block (found "${firstContent?.kind}")`);
  }

  const ids = new Set();
  for (const block of article.blocks) {
    if (block.kind === 'h2' || block.kind === 'h3') {
      if (!ID_RE.test(block.id)) {
        errors.push(`${where}: heading id "${block.id}" is not kebab-case`);
      }
      if (ids.has(block.id)) {
        errors.push(`${where}: duplicate heading id "${block.id}"`);
      }
      ids.add(block.id);
    }
    if (block.kind === 'diagram' && !DIAGRAMS.has(block.name)) {
      errors.push(`${where}: unknown diagram "${block.name}"`);
    }
    if (block.kind === 'table') {
      for (const [i, row] of block.rows.entries()) {
        if (row.length !== block.columns.length) {
          errors.push(
            `${where}: table row ${i + 1} has ${row.length} cell(s), header has ${block.columns.length}`,
          );
        }
      }
    }
  }

  // `#faq` is rendered by DocsPage, not by a content block.
  const renderedIds = new Set([...ids, 'faq', ...DOC_ARTICLES.map((a) => a.group)]);

  for (const text of collectStrings(article)) {
    LINK_RE.lastIndex = 0;
    for (let m = LINK_RE.exec(text); m; m = LINK_RE.exec(text)) {
      const href = m[1];
      if (/^(?:https?:|mailto:|tel:)/i.test(href)) continue;
      if (href.startsWith('#')) {
        if (!renderedIds.has(href.slice(1))) {
          errors.push(`${where}: link to "${href}" has no matching heading on this page`);
        }
        continue;
      }
      const [pathPart, hash] = href.split('#');
      if (!knownPaths.has(pathPart)) {
        errors.push(`${where}: link to "${pathPart}" is not a known site URL`);
      }
      // Anchor targets can only be verified for pages loaded in this run.
      if (hash && pathPart !== where && loadedPaths.has(pathPart)) {
        const target = DOC_ARTICLES.find((a) => docPathFor(a.slug) === pathPart);
        const targetIds = new Set([
          ...target.blocks.filter((b) => b.kind === 'h2' || b.kind === 'h3').map((b) => b.id),
          'faq',
        ]);
        if (!targetIds.has(hash)) {
          errors.push(`${where}: link to "${href}" — "${pathPart}" has no #${hash} heading`);
        }
      }
    }
  }

  for (const faq of article.faqs || []) {
    if (!faq.question.trim().endsWith('?')) {
      errors.push(`${where}: FAQ "${faq.question}" should be phrased as a question`);
    }
    if (faq.answer.trim().length < 80) {
      errors.push(`${where}: FAQ answer for "${faq.question}" is too short to be useful`);
    }
  }
}

// Meta's per-message rates move, and quoting one dates the page the moment it
// changes. Same rule the llms.txt guard enforces.
const MONEY_WITH_PAISE = /(?:₹|Rs\.?|INR)\s*\d+\.\d+|\b\d+\.\d+\s*(?:₹|Rs\.?|INR)\b/i;
for (const article of DOC_ARTICLES) {
  for (const text of collectStrings(article)) {
    const hit = text.match(MONEY_WITH_PAISE);
    if (hit) {
      errors.push(
        `${docPathFor(article.slug)}: per-message rate "${hit[0].trim()}" is quoted — ` +
          `say "Meta's published per-message rates, passed through at 0% markup" instead`,
      );
    }
  }
}

if (errors.length) {
  console.error(`\n✖ docs content check FAILED — ${errors.length} problem(s):`);
  for (const e of errors) console.error(`   · ${e}`);
  console.error('');
  process.exit(1);
}

console.log(
  `✓ docs content check passed — ${DOC_ARTICLES.length} pages, budgets, anchors and links clean`,
);
