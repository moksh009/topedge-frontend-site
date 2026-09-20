import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSitemapPaths } from './marketing-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(__dirname, '../public/sitemap.xml');
const today = new Date().toISOString().slice(0, 10);
const SITE = 'https://topedgeai.com';

const priorityFor = (p) => {
  if (p === '/') return '1.0';
  if (p === '/pricing' || p === '/features' || p.includes('journeys') || p.includes('cart-recovery'))
    return '0.95';
  if (p === '/privacy' || p === '/terms') return '0.3';
  if (p.startsWith('/blog/')) return '0.85';
  if (p.startsWith('/features/') || p.startsWith('/compare/')) return '0.85';
  return '0.8';
};

/**
 * Canonical locs: no trailing slash (matches React Router + MarketingSEO).
 * Prerender writes `path.html` so Netlify serves these with HTTP 200 (no slash redirect).
 */
const paths = getSitemapPaths();
const urls = paths
  .map((p) => {
    const loc = p === '/' ? `${SITE}/` : `${SITE}${p}`;
    const changefreq = p === '/' || p === '/blog' ? 'weekly' : 'monthly';
    return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>${changefreq}</changefreq><priority>${priorityFor(p)}</priority></url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(out, xml, 'utf8');
console.log(`✅ Wrote ${out} (${paths.length} URLs)`);
