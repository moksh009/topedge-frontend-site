/**
 * Capture hero-duo debug beats for visual QA.
 * Requires: npm run dev on :3000, playwright + chromium.
 *
 * Usage: node scripts/capture-hero-duo-beats.mjs
 */
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../docs/product/hero-duo-debug-shots/scale-pass');
const BEATS = [0, 4, 7, 10, 11, 15, 16, 17, 18, 23, 25, 26, 28, 29];
const BASE = process.env.HERO_URL || 'http://localhost:3000/?heroDebug=1';

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Install playwright: npm i -D playwright && npx playwright install chromium');
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForSelector('.hero-duo__stage', { timeout: 20000 });
await page.waitForTimeout(600);

const stage = page.locator('.hero-duo__stage');

async function goToBeat(target) {
  // Prefer clicking Prev/Next from known state — jump via keyboard Home then Next
  await page.keyboard.press('Home');
  await page.waitForTimeout(120);
  for (let i = 0; i < target; i += 1) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(40);
  }
  // Let camera / layout settle
  await page.waitForTimeout(900);
  const label = await page.locator('.hero-duo__debug strong').first().textContent();
  if (!label?.includes(`Beat ${target}/`)) {
    // Fallback: click Next until match
    for (let guard = 0; guard < 40; guard += 1) {
      const t = await page.locator('.hero-duo__debug strong').first().textContent();
      if (t?.includes(`Beat ${target}/`)) break;
      await page.getByRole('button', { name: 'Next →' }).click();
      await page.waitForTimeout(80);
    }
    await page.waitForTimeout(700);
  }
}

for (const beat of BEATS) {
  await goToBeat(beat);
  const file = join(OUT_DIR, `beat-${String(beat).padStart(2, '0')}.png`);
  await stage.screenshot({ path: file, type: 'png' });
  console.log('wrote', file);
}

await browser.close();
console.log('done →', OUT_DIR);
