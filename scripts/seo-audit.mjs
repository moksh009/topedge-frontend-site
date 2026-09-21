/**
 * Full SEO head audit: prerendered dist HTML (if present) + static legal.
 * Usage: npm run seo:audit
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { getMarketingPrerenderPaths, NOT_FOUND_PRERENDER_PATH } from './marketing-urls.mjs';
import { auditPrerenderHead } from './seo-head-audit.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const staticResult = spawnSync(process.execPath, [path.join(__dirname, 'seo-static-head-audit.mjs')], {
  cwd: root,
  encoding: 'utf8',
  stdio: 'inherit',
});
if (staticResult.status !== 0) process.exit(staticResult.status || 1);

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.log('ℹ️  dist/ missing — skip prerender audit (run after build:netlify)');
  process.exit(0);
}

function outPathFor(route) {
  if (route === '/') return path.join(dist, 'index.html');
  const clean = route.replace(/^\//, '').replace(/\/$/, '');
  return path.join(dist, `${clean}.html`);
}

let fail = 0;
const paths = getMarketingPrerenderPaths();
for (const route of paths) {
  const file = outPathFor(route);
  if (!fs.existsSync(file)) {
    console.error(`✗ ${route}: missing ${path.relative(root, file)}`);
    fail += 1;
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const { ok, problems } = auditPrerenderHead(html, route);
  if (!ok) {
    fail += 1;
    console.error(`✗ ${route}: ${problems.join(', ')}`);
  }
}

if (fail) {
  console.error(`\nseo:audit failed (${fail} routes)`);
  process.exit(1);
}
console.log(`✅ seo:audit passed (${paths.length} prerendered + legal)`);
