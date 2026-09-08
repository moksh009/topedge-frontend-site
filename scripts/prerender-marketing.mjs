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
import { getMarketingPrerenderPaths } from './marketing-urls.mjs';

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

function outPathFor(route) {
  if (route === '/') return path.join(dist, 'index.html');
  const clean = route.replace(/^\//, '').replace(/\/$/, '');
  return path.join(dist, clean, 'index.html');
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

    let ok = 0;
    let fail = 0;

    for (const route of paths) {
      const url = `${BASE}${route === '/' ? '/' : route}`;
      try {
        // `load` is enough for Helmet/meta; `networkidle` can hang on analytics/websockets.
        await page.goto(url, { waitUntil: 'load', timeout: 45000 });
        await page.waitForSelector('h1', { timeout: 20000 });
        // Let Helmet flush title/meta/JSON-LD
        await sleep(100);
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
