/**
 * Fail the build when an internal link points at a URL that does not serve a
 * page directly.
 *
 * Why this exists. The October 2026 Search Console crawl reported 11 URLs under
 * "Page with redirect" and 2 under trailing-slash duplication. Both classes are
 * cheap to re-introduce by hand: writing `/testimonials` instead of `/customers`
 * in a blog body, or `/pricing/` instead of `/pricing`, looks right in review and
 * only shows up a crawl later. The internal link graph was clean when this was
 * written (0 offenders across ~1,100 internal links); this keeps it that way.
 *
 * Two checks:
 *
 *   1. REDIRECT SOURCES. Any internal link whose path matches a 301/302/308/410
 *      rule in public/_redirects. Linking a redirect source spends a crawl hop on
 *      every page carrying the link, and keeps the old URL alive in Google's index
 *      as a redirect candidate. Link the destination instead.
 *
 *   2. TRAILING SLASHES. Any internal link ending in `/` other than the root.
 *      The site serves flat `.html` and canonicalises slashless (see
 *      canonicalUrlForPath in MarketingSEO.tsx), so `/features/campaigns/` is a
 *      duplicate of `/features/campaigns`. Slash-stripping 301s are NOT available
 *      as a remedy — they loop against Netlify Pretty URLs, see the header of
 *      scripts/generate-redirects.mjs — so not emitting the slashed form in the
 *      first place is the whole defence.
 *
 * 200 rewrites (SPA shells, static legal HTML) are intentional and not flagged:
 * `/privacy` serving privacy.html is a rewrite, not a redirect hop. The `/*`
 * soft-404 catch-all is skipped too, since it matches every path by definition.
 *
 * Usage: node scripts/check-internal-links.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const ASSET_EXT = /\.(jpe?g|png|webp|avif|gif|svg|mp4|webm|txt|xml|ico|json|pdf|woff2?|css|js|map|webmanifest)$/i;
const REDIRECTING = /^(301|302|303|307|308|410)$/;

/** Sources in public/_redirects that answer with a redirect or a gone status. */
function loadRedirectSources() {
  const file = path.join(root, 'public', '_redirects');
  const exact = new Map();
  const prefixes = [];
  for (const raw of fs.readFileSync(file, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const [from, to, code] = line.split(/\s+/);
    if (!from || !to) continue;
    if (/^https?:/i.test(from)) continue; // host-level apex rule
    const status = (code || '301').replace('!', '');
    if (!REDIRECTING.test(status)) continue; // 200 rewrites are intentional
    if (from === '/*') continue; // soft-404 catch-all matches everything
    if (from.endsWith('/*')) prefixes.push({ prefix: from.slice(0, -2), to, status });
    else exact.set(from, { to, status });
  }
  return { exact, prefixes };
}

function resolveRedirect({ exact, prefixes }, p) {
  if (exact.has(p)) return exact.get(p);
  for (const r of prefixes) if (p.startsWith(`${r.prefix}/`)) return r;
  return null;
}

function sourceFiles() {
  const out = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!/^(node_modules|dist|\.git)$/.test(entry.name)) walk(full);
      } else if (/\.(tsx?|html)$/.test(entry.name)) out.push(full);
    }
  })(path.join(root, 'src'));
  out.push(path.join(root, 'index.html'));
  return out;
}

function main() {
  const rules = loadRedirectSources();
  const redirectHits = [];
  const slashHits = [];
  const docsHits = [];
  let scanned = 0;

  for (const file of sourceFiles()) {
    const src = fs.readFileSync(file, 'utf8');
    const rel = path.relative(root, file);
    // Absolute links to the documentation on the dashboard host. The docs live
    // at topedgeai.com/docs since 31 Oct 2026 and the dashboard copy 301s here,
    // so any such link is a cross-host redirect hop. Link /docs/... instead.
    const docsRe = /https:\/\/dash\.topedgeai\.com\/docs([^"'\s<)]*)/g;
    let dm;
    while ((dm = docsRe.exec(src))) {
      const tail = dm[1] || '';
      if (tail.includes(':splat')) continue; // redirect rule, not a link
      docsHits.push({
        url: `https://dash.topedgeai.com/docs${tail}`,
        where: `${rel}:${src.slice(0, dm.index).split('\n').length}`,
      });
    }

    // href="/x" and to="/x" — internal, root-relative links only.
    const re = /(?:href|to)=["'](\/[^"'#?\s]*)["']/g;
    let m;
    while ((m = re.exec(src))) {
      const url = m[1];
      if (ASSET_EXT.test(url)) continue;
      scanned += 1;
      const where = `${rel}:${src.slice(0, m.index).split('\n').length}`;
      if (url !== '/' && url.endsWith('/')) {
        slashHits.push({ url, where });
        continue;
      }
      const hit = resolveRedirect(rules, url);
      if (hit) redirectHits.push({ url, where, to: hit.to, status: hit.status });
    }
  }

  // --- Links inside the docs content (src/marketing/docs/content/docs.json) ---
  // Inline [label](/path) links and `related` cards. A /docs link must name a
  // real article (and a real heading when it carries #anchor); any other
  // root-relative link gets the same redirect / trailing-slash checks as above.
  const docsFile = path.join(root, 'src/marketing/docs/content/docs.json');
  const docsContentHits = [];
  if (fs.existsSync(docsFile)) {
    const { articles } = JSON.parse(fs.readFileSync(docsFile, 'utf8'));
    const pathOf = (slug) => (slug ? `/docs/${slug}` : '/docs');
    const anchors = new Map(
      articles.map((a) => [
        pathOf(a.slug),
        new Set([
          ...a.blocks.filter((b) => b.kind === 'h2' || b.kind === 'h3').map((b) => b.id),
          ...(a.faqs?.length ? ['faq'] : []),
          ...(a.slug ? [] : ['browse']),
        ]),
      ]),
    );
    const linkRe = /\]\((\/[^)\s]*)\)/g;
    for (const a of articles) {
      const where = `docs.json ${pathOf(a.slug)}`;
      const hrefs = [];
      const text = JSON.stringify({ ...a, dashboard: undefined });
      let lm;
      while ((lm = linkRe.exec(text))) hrefs.push(lm[1]);
      for (const b of a.blocks) {
        if (b.kind === 'related') for (const l of b.links) if (l.href.startsWith('/')) hrefs.push(l.href);
      }
      for (const href of hrefs) {
        scanned += 1;
        const [p, frag] = href.split('#');
        if (ASSET_EXT.test(p)) continue;
        if (p !== '/' && p.endsWith('/')) {
          slashHits.push({ url: href, where });
          continue;
        }
        if (p === '/docs' || p.startsWith('/docs/')) {
          if (!anchors.has(p)) {
            docsContentHits.push({ url: href, where, why: 'no doc article has this path' });
          } else if (frag && !/^step-\d+$/.test(frag) && !anchors.get(p).has(frag)) {
            docsContentHits.push({ url: href, where, why: `no heading with id "${frag}" on that page` });
          }
          continue;
        }
        const hit = resolveRedirect(rules, p);
        if (hit) redirectHits.push({ url: href, where, to: hit.to, status: hit.status });
      }
    }
    // A legacy alias must never shadow a live article.
    for (const docPath of anchors.keys()) {
      const hit = resolveRedirect(rules, docPath);
      if (hit) docsContentHits.push({ url: docPath, where: 'public/_redirects', why: `a live doc page is redirected to ${hit.to}` });
    }
  }

  if (docsContentHits.length) {
    console.error(`\n❌ ${docsContentHits.length} broken docs link(s):\n`);
    for (const h of docsContentHits) {
      console.error(`   ${h.where}`);
      console.error(`      ${h.url}  →  ${h.why}`);
    }
  }

  if (!docsHits.length && !redirectHits.length && !slashHits.length && !docsContentHits.length) {
    console.log(
      `✅ internal links: ${scanned} checked (site source + docs content) — none hit a redirect, ` +
        `a trailing slash, the old dashboard docs host, or a missing doc page/anchor`,
    );
    return;
  }

  if (docsHits.length) {
    console.error(`\n❌ ${docsHits.length} link(s) to the old dashboard docs host:\n`);
    for (const h of docsHits) {
      console.error(`   ${h.where}`);
      console.error(`      ${h.url}  →  link /docs/... on this site; the dashboard copy 301s here`);
    }
  }
  if (redirectHits.length) {
    console.error(`\n❌ ${redirectHits.length} internal link(s) point at a redirect source:\n`);
    for (const h of redirectHits) {
      console.error(`   ${h.where}`);
      console.error(`      ${h.url}  →  ${h.to}  (${h.status})   link the destination instead`);
    }
  }
  if (slashHits.length) {
    console.error(`\n❌ ${slashHits.length} internal link(s) end in a trailing slash:\n`);
    for (const h of slashHits) {
      console.error(`   ${h.where}`);
      console.error(`      ${h.url}  →  drop the slash; the site canonicalises slashless`);
    }
  }
  console.error('');
  process.exit(1);
}

main();
