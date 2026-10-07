// Live crawler for topedgeai.com — raw HTML only (no JS execution), i.e. what AI crawlers see.
import { writeFileSync, mkdirSync } from 'node:fs';

const ORIGIN = 'https://topedgeai.com';
const UA = process.env.CRAWL_UA || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36';
const OUT = process.env.OUT || 'crawl';
mkdirSync(OUT, { recursive: true });

const sitemapXml = await (await fetch(`${ORIGIN}/sitemap.xml`, { headers: { 'user-agent': UA } })).text();
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const sitemapLastmod = Object.fromEntries(
  [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map(m => [m[1], m[2]])
);

const attr = (tag, name) => {
  const re = new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i');
  const m = tag.match(re);
  return m ? (m[2] ?? m[3]) : null;
};
const metaByName = (html, kind, value) => {
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = m[0];
    if ((attr(tag, kind) || '').toLowerCase() === value.toLowerCase()) return attr(tag, 'content');
  }
  return null;
};
const decode = s => (s || '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
  .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&rsquo;/g, '’');

function parse(url, html, res, chain) {
  const titleRaw = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const title = decode(titleRaw).trim();
  const desc = decode(metaByName(html, 'name', 'description') || '').trim();
  const canonicalTag = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => m[0])
    .find(t => (attr(t, 'rel') || '').toLowerCase() === 'canonical');
  const canonical = canonicalTag ? attr(canonicalTag, 'href') : null;
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => decode(m[1].replace(/<[^>]+>/g, '')).trim());
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map(m => ({ level: +m[1], text: decode(m[2].replace(/<[^>]+>/g, '')).trim().slice(0, 110) }));
  const ld = [];
  const ldErrors = [];
  for (const m of html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { ld.push(JSON.parse(m[1])); } catch (e) { ldErrors.push(e.message); }
  }
  const ldTypes = [];
  const walk = n => {
    if (Array.isArray(n)) return n.forEach(walk);
    if (n && typeof n === 'object') {
      if (n['@type']) [].concat(n['@type']).forEach(t => ldTypes.push(t));
      if (n['@graph']) walk(n['@graph']);
    }
  };
  ld.forEach(walk);

  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map(m => m[0]);
  const imgsNoAlt = imgs.filter(t => attr(t, 'alt') === null);
  const imgsEmptyAlt = imgs.filter(t => attr(t, 'alt') === '');

  const anchors = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(m => ({
    href: attr('<a ' + m[1] + '>', 'href'),
    rel: attr('<a ' + m[1] + '>', 'rel'),
    text: decode(m[2].replace(/<[^>]+>/g, '')).trim().slice(0, 80),
  })).filter(a => a.href);

  const body = (html.match(/<body[^>]*>([\s\S]*)<\/body>/i) || [, html])[1];
  const text = body
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  const words = decode(text).split(/\s+/).filter(w => /[a-zA-Z0-9₹]/.test(w));

  const htmlTag = (html.match(/<html\b[^>]*>/i) || [''])[0];

  return {
    url,
    path: new URL(url).pathname,
    status: res.status,
    redirectChain: chain,
    contentType: res.headers.get('content-type'),
    xRobotsTag: res.headers.get('x-robots-tag'),
    hsts: res.headers.get('strict-transport-security'),
    cacheControl: res.headers.get('cache-control'),
    bytes: html.length,
    lang: attr(htmlTag, 'lang'),
    title, titleLen: [...title].length,
    desc, descLen: [...desc].length,
    metaRobots: metaByName(html, 'name', 'robots'),
    canonical,
    canonicalSelf: canonical === url || canonical === url.replace(/\/$/, '') || (url === ORIGIN + '/' && canonical === ORIGIN + '/'),
    h1Count: h1s.length, h1: h1s[0] || null, h1All: h1s,
    headings,
    ogTitle: metaByName(html, 'property', 'og:title'),
    ogDesc: metaByName(html, 'property', 'og:description'),
    ogImage: metaByName(html, 'property', 'og:image'),
    ogType: metaByName(html, 'property', 'og:type'),
    ogUrl: metaByName(html, 'property', 'og:url'),
    twCard: metaByName(html, 'name', 'twitter:card'),
    twImage: metaByName(html, 'name', 'twitter:image'),
    ldTypes: [...new Set(ldTypes)],
    ldCount: ld.length,
    ldErrors,
    ld,
    imgCount: imgs.length, imgsNoAlt: imgsNoAlt.length, imgsEmptyAlt: imgsEmptyAlt.length,
    words: words.length,
    sitemapLastmod: sitemapLastmod[url] || null,
    anchors,
  };
}

async function fetchChain(url) {
  const chain = [];
  let cur = url;
  for (let i = 0; i < 6; i++) {
    const res = await fetch(cur, { headers: { 'user-agent': UA }, redirect: 'manual' });
    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      const next = new URL(res.headers.get('location'), cur).toString();
      chain.push({ from: cur, status: res.status, to: next });
      cur = next;
      continue;
    }
    const html = await res.text();
    return { res, html, chain, finalUrl: cur };
  }
  throw new Error('too many redirects: ' + url);
}

const results = [];
const CONC = 6;
let idx = 0;
async function worker() {
  while (idx < sitemapUrls.length) {
    const i = idx++;
    const u = sitemapUrls[i];
    try {
      const { res, html, chain, finalUrl } = await fetchChain(u);
      const r = parse(u, html, res, chain);
      r.finalUrl = finalUrl;
      results.push(r);
      process.stderr.write(`${res.status} ${u}\n`);
    } catch (e) {
      results.push({ url: u, path: new URL(u).pathname, error: String(e) });
      process.stderr.write(`ERR ${u} ${e}\n`);
    }
  }
}
await Promise.all(Array.from({ length: CONC }, worker));
results.sort((a, b) => a.path.localeCompare(b.path));
writeFileSync(`${OUT}/pages.json`, JSON.stringify(results, null, 1));
console.log(`crawled ${results.length} urls -> ${OUT}/pages.json`);
