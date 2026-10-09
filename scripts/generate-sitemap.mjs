import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSitemapPaths } from './marketing-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const out = path.resolve(__dirname, '../public/sitemap.xml');
const SITE = 'https://topedgeai.com';

/** @type {{ compareTwoWay: string, compareThreeWay: string, blogPosts: string, featurePages: string, pricing: string, home?: string, blogBySlug?: Record<string, string> }} */
function loadContentDates() {
  const jsonPath = path.join(root, 'src/marketing/data/generated/contentDates.json');
  if (fs.existsSync(jsonPath)) {
    return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  }
  // Fallback if content-dates has not run yet in this process
  const today = new Date().toISOString().slice(0, 10);
  return {
    compareTwoWay: today,
    compareThreeWay: today,
    blogPosts: today,
    featurePages: today,
    pricing: today,
    blogBySlug: {},
  };
}

const dates = loadContentDates();

const priorityFor = (p) => {
  if (p === '/') return '1.0';
  if (p === '/pricing' || p === '/features' || p.includes('journeys') || p.includes('cart-recovery'))
    return '0.95';
  if (p === '/privacy' || p === '/terms') return '0.3';
  if (p.startsWith('/blog/')) return '0.85';
  if (p.startsWith('/features/') || p.startsWith('/compare/')) return '0.85';
  return '0.8';
};

function lastmodFor(p) {
  if (p === '/') return dates.home || dates.featurePages;
  if (p === '/pricing') return dates.pricing;
  if (p === '/privacy' || p === '/terms') return dates.featurePages;
  if (p === '/compare/topedge-vs-wati-vs-aisensy') return dates.compareThreeWay;
  if (p.startsWith('/compare/')) return dates.compareTwoWay;
  if (p.startsWith('/blog/')) {
    const slug = p.slice('/blog/'.length);
    return dates.blogBySlug?.[slug] || dates.blogPosts;
  }
  if (p.startsWith('/features/') || p === '/features') return dates.featurePages;
  if (p === '/blog') return dates.blogPosts;
  if (p === '/compare') return dates.compareTwoWay;
  return dates.featurePages;
}

/**
 * Canonical locs: no trailing slash (matches React Router + MarketingSEO).
 * Prerender writes `path.html` so Netlify serves these with HTTP 200 (no slash redirect).
 */
const paths = getSitemapPaths();
const urls = paths
  .map((p) => {
    const loc = p === '/' ? `${SITE}/` : `${SITE}${p}`;
    const changefreq = p === '/' || p === '/blog' ? 'weekly' : 'monthly';
    return `  <url><loc>${loc}</loc><lastmod>${lastmodFor(p)}</lastmod><changefreq>${changefreq}</changefreq><priority>${priorityFor(p)}</priority></url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(out, xml, 'utf8');
console.log(`✅ Wrote ${out} (${paths.length} URLs, truthful lastmod)`);
