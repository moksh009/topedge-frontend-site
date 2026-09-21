/**
 * Parse prerendered HTML for SEO head + schema contract checks.
 * Used by prerender-marketing.mjs and npm run seo:audit.
 */
import {
  assertSnippetBudgets,
  pageTypeForPath,
  PAGE_TYPE_SCHEMA,
} from './seo-contracts.mjs';

function metaContent(html, name) {
  const re = new RegExp(
    `<meta\\b[^>]*\\bname=["']${name}["'][^>]*\\bcontent=["']([^"']*)["']`,
    'i',
  );
  const m = html.match(re);
  if (m) return m[1];
  const re2 = new RegExp(
    `<meta\\b[^>]*\\bcontent=["']([^"']*)["'][^>]*\\bname=["']${name}["']`,
    'i',
  );
  return html.match(re2)?.[1] || '';
}

function propContent(html, prop) {
  const re = new RegExp(
    `<meta\\b[^>]*\\bproperty=["']${prop}["'][^>]*\\bcontent=["']([^"']*)["']`,
    'i',
  );
  const m = html.match(re);
  if (m) return m[1];
  const re2 = new RegExp(
    `<meta\\b[^>]*\\bcontent=["']([^"']*)["'][^>]*\\bproperty=["']${prop}["']`,
    'i',
  );
  return html.match(re2)?.[1] || '';
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!m) return '';
  return m[1]
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeEntities(s) {
  return String(s || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractCanonical(html) {
  const m = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i);
  if (!m) return '';
  return m[0].match(/href=["']([^"']+)["']/i)?.[1] || '';
}

function extractSchemaTypes(html) {
  const types = new Set();
  const scripts = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  for (const s of scripts) {
    try {
      const data = JSON.parse(s[1]);
      const walk = (node) => {
        if (!node || typeof node !== 'object') return;
        if (Array.isArray(node)) {
          node.forEach(walk);
          return;
        }
        if (node['@type']) {
          const t = node['@type'];
          if (Array.isArray(t)) t.forEach((x) => types.add(String(x)));
          else types.add(String(t));
        }
        for (const v of Object.values(node)) walk(v);
      };
      walk(data);
    } catch {
      /* ignore invalid JSON-LD in audit */
    }
  }
  return types;
}

/**
 * @param {string} html
 * @param {string} route prerender path e.g. /pricing
 * @returns {{ ok: boolean, problems: string[] }}
 */
export function auditPrerenderHead(html, route) {
  const problems = [];
  const isNotFound = route === '/404';

  const canons = [...html.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)];
  const descs = [...html.matchAll(/<meta\b[^>]*\bname=["']description["'][^>]*>/gi)];
  const titles = [...html.matchAll(/<title\b[^>]*>/gi)];
  const h1s = [...html.matchAll(/<h1\b/gi)];

  if (canons.length !== 1) problems.push(`canonical×${canons.length}`);
  if (descs.length !== 1) problems.push(`description×${descs.length}`);
  if (titles.length !== 1) problems.push(`title×${titles.length}`);
  if (h1s.length !== 1) problems.push(`h1×${h1s.length}`);

  const title = extractTitle(html);
  const description = decodeEntities(metaContent(html, 'description'));
  const canonical = extractCanonical(html);
  const robots = metaContent(html, 'robots');

  const expected =
    route === '/' ? 'https://topedgeai.com/' : `https://topedgeai.com${route}`;
  if (canons.length === 1) {
    const homeOk =
      route === '/' &&
      (canonical === 'https://topedgeai.com/' || canonical === 'https://topedgeai.com');
    if (route === '/') {
      if (!homeOk) problems.push(`canonical-href=${canonical}`);
    } else if (canonical !== expected) {
      problems.push(`canonical-href=${canonical} (want ${expected})`);
    }
  }

  if (isNotFound) {
    if (!/noindex/i.test(robots)) problems.push('missing-noindex');
  } else {
    const budgets = assertSnippetBudgets(title, description);
    if (!budgets.ok) problems.push(...budgets.errors);

    const pageType = pageTypeForPath(route);
    const required = PAGE_TYPE_SCHEMA[pageType] || [];
    if (required.length) {
      const types = extractSchemaTypes(html);
      for (const need of required) {
        if (![...types].some((t) => t === need || t.endsWith(`/${need}`))) {
          problems.push(`missing-schema:${need}`);
        }
      }
    }

    // GEO/AEO: OG image should be PNG/JPEG absolute
    const ogImage = propContent(html, 'og:image');
    if (ogImage && !/^https:\/\//i.test(ogImage)) {
      problems.push('og:image-not-absolute');
    }
    if (ogImage && /\.svg(\?|$)/i.test(ogImage)) {
      problems.push('og:image-svg');
    }
  }

  return { ok: problems.length === 0, problems, title, description, canonical };
}

export { extractTitle, metaContent, extractCanonical, extractSchemaTypes };
