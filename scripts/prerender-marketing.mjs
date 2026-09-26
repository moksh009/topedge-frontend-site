/**
 * Post-build Playwright prerender for marketing routes.
 * Writes crawlable HTML (with Helmet meta + JSON-LD) into dist/.
 *
 * Important: must fully tear down the preview server + browser and exit,
 * otherwise Netlify waits until the build time limit (hang after "Prerender done").
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { auditPrerenderHead } from './seo-head-audit.mjs';
import { getMarketingPrerenderPaths, NOT_FOUND_PRERENDER_PATH } from './marketing-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const PORT = Number(process.env.PRERENDER_PORT || 4179);
const BASE = `http://127.0.0.1:${PORT}`;
const viteBin = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');

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

/**
 * Write `pricing.html` (not `pricing/index.html`).
 * Directory indexes make Netlify 301 `/pricing` → `/pricing/`, which fights
 * slashless canonicals in MarketingSEO and floods GSC with "Page with redirect".
 * Flat `.html` + Pretty URLs → `/pricing` returns 200 directly.
 */
function outPathFor(route) {
  if (route === '/') return path.join(dist, 'index.html');
  const clean = route.replace(/^\//, '').replace(/\/$/, '');
  return path.join(dist, `${clean}.html`);
}

function installChromium() {
  return new Promise((resolve, reject) => {
    console.log('📥 Playwright Chromium missing — installing…');
    const child = spawn('npx', ['playwright', 'install', 'chromium'], {
      cwd: root,
      stdio: 'inherit',
      env: process.env,
      shell: process.platform === 'win32',
    });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`playwright install chromium failed (exit ${code})`));
    });
  });
}

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch (err) {
    const msg = String(err?.message || err);
    if (!/Executable doesn't exist|browserType\.launch|Failed to launch/i.test(msg)) {
      throw err;
    }
    await installChromium();
    return chromium.launch({ headless: true });
  }
}

function killProcessTree(child) {
  if (!child?.pid) return;
  try {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    } else {
      // Kill the whole process group (spawned with detached: true + unref-safe group).
      try {
        process.kill(-child.pid, 'SIGTERM');
      } catch {
        /* group may already be gone */
      }
      try {
        process.kill(-child.pid, 'SIGKILL');
      } catch {
        /* ignore */
      }
      try {
        child.kill('SIGKILL');
      } catch {
        /* ignore */
      }
    }
  } catch {
    /* ignore */
  }
}

/**
 * Drop shell SEO that is not owned by react-helmet-async (no data-rh).
 * Prevents Bing/GSC seeing homepage canonical + page canonical on the same URL.
 */
function sanitizePrerenderHtml(html) {
  let out = html;

  const dropUnlessRh = (tag) => (/data-rh=/i.test(tag) ? tag : '');

  out = out.replace(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi, dropUnlessRh);
  out = out.replace(/<meta\b[^>]*\bname=["']description["'][^>]*>/gi, dropUnlessRh);
  out = out.replace(/<meta\b[^>]*\bname=["']keywords["'][^>]*>/gi, dropUnlessRh);
  out = out.replace(/<meta\b[^>]*\bname=["']robots["'][^>]*>/gi, dropUnlessRh);
  out = out.replace(/<meta\b[^>]*\bproperty=["']og:[^"']+["'][^>]*>/gi, dropUnlessRh);
  out = out.replace(/<meta\b[^>]*\bname=["']twitter:[^"']+["'][^>]*>/gi, dropUnlessRh);

  // Static title from index.html shell (no data-rh) when Helmet already wrote one
  const hasRhTitle = /<title[^>]*data-rh=/i.test(out);
  if (hasRhTitle) {
    out = out.replace(/<title\b(?![^>]*data-rh=)[^>]*>[\s\S]*?<\/title>/gi, '');
  }

  // Static JSON-LD in the Vite shell (no data-rh) — Helmet owns schema
  out = out.replace(
    /<script\b([^>]*)\btype=["']application\/ld\+json["']([^>]*)>[\s\S]*?<\/script>/gi,
    (full, a = '', b = '') => (/data-rh=/i.test(`${a}${b}`) ? full : ''),
  );

  // Google Fonts: Playwright often fires onload during prerender, leaving a
  // render-blocking stylesheet in the saved HTML. Force the print→all pattern
  // and keep a single copy.
  let fontHref = '';
  out = out.replace(/<link\b[^>]*>/gi, (tag) => {
    if (!/fonts\.googleapis\.com\/css2/i.test(tag)) return tag;
    if (/rel=["']preload["']/i.test(tag)) return '';
    const m = tag.match(/href=["']([^"']+)["']/i);
    if (m) fontHref = m[1].replace(/&amp;/g, '&');
    return '';
  });
  if (fontHref) {
    const nonBlocking = `<link rel="stylesheet" href="${fontHref.replace(/&/g, '&amp;')}" media="print" onload="this.media='all'">`;
    out = out.replace(/<\/head>/i, `${nonBlocking}\n</head>`);
  }

  // Hoist LCP image preload to the top of <head> so it is not stuck behind
  // CSS/modulepreload discovered during the SPA render.
  let lcpPreload = '';
  out = out.replace(/<link\b[^>]*>/gi, (tag) => {
    if (!/rel=["']preload["']/i.test(tag)) return tag;
    if (!/as=["']image["']/i.test(tag)) return tag;
    if (!/herooo-immage/i.test(tag)) return tag;
    lcpPreload = tag;
    return '';
  });
  if (lcpPreload) {
    out = out.replace(/<head([^>]*)>/i, `<head$1>\n    ${lcpPreload}`);
  }

  return out;
}

/**
 * Homepage below-fold sections are lazy chunks. Their CSS/modulepreload links
 * must not become render-blocking in the saved HTML (LCP), so anything added to
 * <head> after the hero-only snapshot is made non-blocking or dropped. The
 * client re-imports those chunks itself when the sections mount.
 */
function deferLinksAddedAfter(html, baselineHrefs) {
  const baseline = new Set(baselineHrefs);
  const seen = new Set();
  return html.replace(/<link\b[^>]*>/gi, (tag) => {
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (!href) return tag;
    // Vite's preload helper re-adds shared chunks already linked in <head>.
    if (/\brel=["'](?:modulepreload|stylesheet)["']/i.test(tag)) {
      if (seen.has(href)) return '';
      seen.add(href);
    }
    if (baseline.has(href)) return tag;
    if (/\brel=["']modulepreload["']/i.test(tag)) return '';
    if (/\brel=["']stylesheet["']/i.test(tag) && !/\bmedia=/i.test(tag)) {
      return tag.replace(/<link\b/i, `<link media="print" onload="this.media='all'"`);
    }
    return tag;
  });
}

const HOME_BELOW_FOLD_EVENT = 'topedge:prerender-below-fold';

async function renderHomeBelowFold(page) {
  const baselineHrefs = await page.evaluate(() =>
    [...document.head.querySelectorAll('link[href]')].map((l) => l.getAttribute('href')),
  );
  await page.evaluate((evt) => window.dispatchEvent(new Event(evt)), HOME_BELOW_FOLD_EVENT);
  await page.waitForSelector('.home-qa', { timeout: 20000 });
  await page.waitForSelector('.mkt-cta', { timeout: 20000 });
  await sleep(150);
  return baselineHrefs;
}

function assertSingleSeoHead(html, route) {
  return auditPrerenderHead(html, route).problems;
}

async function main() {
  if (!fs.existsSync(path.join(dist, 'index.html'))) {
    throw new Error('dist/index.html missing — run vite build first');
  }
  if (!fs.existsSync(viteBin)) {
    throw new Error(`vite binary missing at ${viteBin}`);
  }

  const paths = getMarketingPrerenderPaths();
  console.log(`\n🔎 Prerendering ${paths.length} marketing URLs on :${PORT}…`);

  // Spawn vite directly (not via npx) in its own process group so we can kill it cleanly.
  const preview = spawn(
    process.execPath,
    [viteBin, 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
    {
      cwd: root,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, BROWSER: 'none' },
      detached: process.platform !== 'win32',
    }
  );

  let previewLog = '';
  preview.stdout.on('data', (d) => {
    previewLog += d.toString();
  });
  preview.stderr.on('data', (d) => {
    previewLog += d.toString();
  });

  let exitCode = 0;

  try {
    await waitForServer(BASE);
    const browser = await launchBrowser();
    const page = await browser.newPage();
    // Must run before any document script: Home keeps below-fold unmounted while
    // this flag is set, so saved HTML matches first client paint (no hydration
    // mismatch) and does not pull StickyStories CSS/modulepreloads into <head>.
    await page.addInitScript(() => {
      window.__TOPEDGE_PRERENDER__ = true;
    });

    let ok = 0;
    let fail = 0;
    let homeHtml = null;

    for (const route of paths) {
      const url = `${BASE}${route === '/' ? '/' : route}`;
      try {
        // `load` is enough for Helmet/meta; `networkidle` can hang on analytics/websockets.
        await page.goto(url, { waitUntil: 'load', timeout: 45000 });
        await page.waitForSelector('h1', { timeout: 20000 });
        // Wait until this route's self-canonical is in the DOM (Helmet can lag past first paint).
        const expectCanon =
          route === '/' ? 'https://topedgeai.com/' : `https://topedgeai.com${route}`;
        await page.waitForFunction(
          (href) => {
            const links = [...document.querySelectorAll('link[rel="canonical"]')];
            return links.some((l) => l.getAttribute('href') === href);
          },
          expectCanon,
          { timeout: 15000 },
        );
        await page.waitForFunction(
          () => document.querySelectorAll('meta[name="description"]').length >= 1,
          { timeout: 10000 },
        );
        const homeBaseline = route === '/' ? await renderHomeBelowFold(page) : null;
        await sleep(50);
        const raw = await page.content();
        let html = sanitizePrerenderHtml(raw);
        if (homeBaseline) html = deferLinksAddedAfter(html, homeBaseline);

        const out = outPathFor(route);
        if (route === '/') {
          // dist/index.html is also the SPA shell the preview server falls back
          // to for every later route; writing it now would leak the homepage's
          // below-fold <head> links into all other pages.
          homeHtml = html;
        } else {
          fs.mkdirSync(path.dirname(out), { recursive: true });
          fs.writeFileSync(out, html, 'utf8');
        }

        const hasH1 = /<h1[\s>]/i.test(html);
        const hasLd = /application\/ld\+json/i.test(html);
        const headProblems = assertSingleSeoHead(html, route);
        if (headProblems.length) {
          fail += 1;
          console.error(`  ✗ ${route}: SEO head ${headProblems.join(', ')}`);
        } else {
          console.log(`  ✓ ${route}  (h1=${hasH1 ? 'yes' : 'no'}, ld=${hasLd ? 'yes' : 'no'}, head=clean)`);
          ok += 1;
        }
      } catch (err) {
        fail += 1;
        console.error(`  ✗ ${route}: ${err.message}`);
      }
    }

    await browser.close();
    if (homeHtml) fs.writeFileSync(outPathFor('/'), homeHtml, 'utf8');
    console.log(`\n✅ Prerender done: ${ok} ok, ${fail} failed`);
    if (fail > 0) {
      exitCode = 1;
    }
  } catch (err) {
    exitCode = 1;
    throw err;
  } finally {
    killProcessTree(preview);
    await sleep(200);
    if (previewLog && process.env.PRERENDER_DEBUG) {
      console.log(previewLog.slice(-2000));
    }
  }

  // Force exit — open handles from preview/playwright must not stall Netlify builds.
  process.exit(exitCode);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
