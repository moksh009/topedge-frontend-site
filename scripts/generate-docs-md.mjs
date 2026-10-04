/**
 * Plaintext Markdown mirrors of every documentation page, written to
 * dist/docs/<slug>.md (and dist/docs.md for the hub).
 *
 * Answer engines and LLM crawlers fetch a `.md` sibling when one exists, and a
 * clean Markdown body costs them none of the token budget that stripping a React
 * page does. The mirrors are generated from the same content modules the site
 * renders, so they cannot drift from the HTML, and each one carries a canonical
 * link back to the HTML page so the Markdown never competes with it in search.
 *
 * Runs after `vite build` so it can write into dist/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadDocsRegistry } from './load-docs-content.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const SITE = 'https://topedgeai.com';

const { DOC_ARTICLES, DOC_NAV, docPathFor } = await loadDocsRegistry();

/** Rewrite site-relative links to absolute, so the Markdown stands alone. */
function absolutise(text) {
  return String(text ?? '').replace(/\]\((\/[^)\s]*)\)/g, (_m, href) => `](${SITE}${href})`);
}

function table(columns, rows) {
  const head = `| ${columns.map(absolutise).join(' | ')} |`;
  const rule = `| ${columns.map(() => '---').join(' | ')} |`;
  const body = rows.map((row) => `| ${row.map(absolutise).join(' | ')} |`).join('\n');
  return `${head}\n${rule}\n${body}`;
}

function renderBlock(block) {
  switch (block.kind) {
    case 'answer':
      // Rendered plain: the text carries its own **bold** spans, and wrapping it
      // in another pair produces nested emphasis that Markdown renders literally.
      return absolutise(block.text);
    case 'h2':
      return `## ${absolutise(block.text)}`;
    case 'h3':
      return `### ${absolutise(block.text)}`;
    case 'p':
      return absolutise(block.text);
    case 'list':
      return block.items
        .map((item, i) => `${block.ordered ? `${i + 1}.` : '-'} ${absolutise(item)}`)
        .join('\n');
    case 'prereqs':
      return `**Before you start**\n\n${block.items.map((i) => `- ${absolutise(i)}`).join('\n')}`;
    case 'steps':
      return block.steps
        .map((step, i) => {
          const note = step.note ? `\n   _${absolutise(step.note)}_` : '';
          return `${i + 1}. **${absolutise(step.title)}** — ${absolutise(step.body)}${note}`;
        })
        .join('\n');
    case 'table':
      return [block.caption ? `_${absolutise(block.caption)}_\n` : '', table(block.columns, block.rows)]
        .filter(Boolean)
        .join('\n');
    case 'definitions':
      return block.items
        .map((i) => `- **${absolutise(i.term)}** — ${absolutise(i.definition)}`)
        .join('\n');
    case 'callout':
      return `> **${block.title || block.tone.toUpperCase()}** — ${absolutise(block.body)}`;
    case 'verify':
      return `**Check it worked**\n\n${block.items.map((i) => `- [ ] ${absolutise(i)}`).join('\n')}`;
    case 'troubleshoot':
      return block.cases
        .map(
          (c) =>
            `**${absolutise(c.symptom)}**\n\n${c.fixes
              .map((f, i) => `${i + 1}. ${absolutise(f)}`)
              .join('\n')}`,
        )
        .join('\n\n');
    case 'code':
      return `\`\`\`${block.language}\n${block.code}\n\`\`\`${
        block.caption ? `\n\n_${absolutise(block.caption)}_` : ''
      }`;
    case 'diagram':
      // Diagrams are inline SVG in the HTML; the title and caption carry the meaning.
      return `_Diagram: ${block.title}${block.caption ? ` — ${absolutise(block.caption)}` : ''}_`;
    case 'related':
      return `**Related**\n\n${block.links
        .map(
          (l) =>
            `- [${l.label}](${/^https?:/i.test(l.href) ? l.href : `${SITE}${l.href}`})${
              l.note ? ` — ${l.note}` : ''
            }`,
        )
        .join('\n')}`;
    case 'planLimits':
      // Rendered from the live billing catalog in the HTML; never duplicated as
      // numbers here, so this file can never carry a stale price.
      return `_Plan limits table — see ${SITE}/docs/platform/limits-and-quotas and ${SITE}/pricing._`;
    default:
      return '';
  }
}

function renderArticle(article) {
  const url = `${SITE}${docPathFor(article.slug)}`;
  const parts = [
    `# ${article.h1}`,
    '',
    `> ${absolutise(article.lead)}`,
    '',
    `Canonical: ${url}`,
    `Last updated: ${article.updated}`,
    '',
    '---',
    '',
  ];

  for (const block of article.blocks) {
    const rendered = renderBlock(block);
    if (rendered) parts.push(rendered, '');
  }

  if (article.faqs?.length) {
    parts.push('## Frequently asked questions', '');
    for (const faq of article.faqs) {
      parts.push(`### ${faq.question}`, '', absolutise(faq.answer), '');
    }
  }

  return `${parts.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
}

/** An index so a crawler that finds one page can discover the rest. */
function renderIndex() {
  const lines = [
    '# TopEdge documentation index',
    '',
    `Every documentation page, in reading order. Each URL also serves a Markdown mirror at \`<url>.md\`.`,
    '',
  ];
  for (const group of DOC_NAV) {
    lines.push(`## ${group.label}`, '', group.blurb, '');
    for (const article of group.articles) {
      lines.push(`- [${article.navLabel}](${SITE}${docPathFor(article.slug)}): ${article.description}`);
    }
    lines.push('');
  }
  return `${lines.join('\n').trim()}\n`;
}

if (!fs.existsSync(dist)) {
  console.error('✖ dist/ missing — run vite build first');
  process.exit(1);
}

let written = 0;
for (const article of DOC_ARTICLES) {
  // `/docs` → dist/docs.md, `/docs/guides/x` → dist/docs/guides/x.md. Mirrors the
  // flat `.html` layout the prerender writes, so both are served from one path.
  const rel = article.slug ? `docs/${article.slug}.md` : 'docs.md';
  const out = path.join(dist, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, renderArticle(article), 'utf8');
  written += 1;
}

fs.writeFileSync(path.join(dist, 'docs', 'index.md'), renderIndex(), 'utf8');

console.log(`✅ Wrote ${written} docs Markdown mirrors + dist/docs/index.md`);
