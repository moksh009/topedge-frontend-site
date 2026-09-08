/**
 * Post-build Playwright prerender for marketing routes.
 * Writes crawlable HTML (with Helmet meta + JSON-LD) into dist/.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { getMarketingPrerenderPaths } from './marketing-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const PORT = Number(process.env.PRERENDER_PORT || 4179);
const BASE = `http://127.0.0.1:${PORT}`;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 200) return;
    } catch {
      /* retry */
    }
    await sleep(250);
  }
  throw new Error(`Preview server did not start at ${url}`);
}

function outPathFor(route) {
  if (route === '/') return path.join(dist, 'index.html');
  const clean = route.replace(/^\//, '').replace(/\/$/, '');
  return path.join(dist, clean, 'index.html');
}

async function main() {
  if (!fs.existsSync(path.join(dist, 'index.html'))) {
    throw new Error('dist/index.html missing — run vite build first');
  }

  const paths = getMarketingPrerenderPaths();
  console.log(`\n🔎 Prerendering ${paths.length} marketing URLs on :${PORT}…`);

  const preview = spawn(
    'npx',
    ['vite', 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
    {
      cwd: root,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, BROWSER: 'none' },
    }
  );

  let previewLog = '';
  preview.stdout.on('data', (d) => {
    previewLog += d.toString();
  });
  preview.stderr.on('data', (d) => {
    previewLog += d.toString();
  });

  try {
    await waitForServer(BASE);
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    let ok = 0;
    let fail = 0;

    for (const route of paths) {
      const url = `${BASE}${route === '/' ? '/' : route}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForSelector('h1', { timeout: 30000 });
        // Let Helmet flush title/meta/JSON-LD
        await sleep(150);
        const html = await page.content();

        const out = outPathFor(route);
        fs.mkdirSync(path.dirname(out), { recursive: true });
        fs.writeFileSync(out, html, 'utf8');

        const hasH1 = /<h1[\s>]/i.test(html);
        const hasLd = /application\/ld\+json/i.test(html);
        console.log(`  ✓ ${route}  (h1=${hasH1 ? 'yes' : 'no'}, ld=${hasLd ? 'yes' : 'no'})`);
        ok += 1;
      } catch (err) {
        fail += 1;
        console.error(`  ✗ ${route}: ${err.message}`);
      }
    }

    await browser.close();
    console.log(`\n✅ Prerender done: ${ok} ok, ${fail} failed`);
    if (fail > 0 && ok === 0) {
      process.exitCode = 1;
    }
  } finally {
    preview.kill('SIGTERM');
    await sleep(300);
    try {
      preview.kill('SIGKILL');
    } catch {
      /* ignore */
    }
    if (previewLog && process.env.PRERENDER_DEBUG) {
      console.log(previewLog.slice(-2000));
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
