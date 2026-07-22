/**
 * Capture homepage feature scenes (before/after visual evidence).
 * Requires: npm run dev on :3000, playwright + chromium.
 *
 * Usage: node scripts/capture-homepage-scenes.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const stamp = process.env.CAPTURE_LABEL ?? 'after';
const OUT_DIR = join(__dirname, `../docs/product/scene-captures/${stamp}`);
const BASE = process.env.SHOWCASE_BASE_URL ?? 'http://localhost:3000';

async function main() {
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    console.error('Install playwright: npm i -D playwright && npx playwright install chromium');
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 60000 });

  // Hide sticky chrome so stages fill the frame
  await page.addStyleTag({
    content: `
      header, nav, .mkt-nav, [data-nav] { visibility: hidden !important; }
      .fs-stage { scroll-margin-top: 0 !important; }
    `,
  });

  const stages = await page.$$('.fs-stage');
  console.log(`Found ${stages.length} stages`);

  const labels = [
    '01-hero',
    '02-cart-recovery',
    '03-inbox',
    '04-ai-brain',
    '05-journey',
    '06-flow-builder',
  ];

  for (let i = 0; i < stages.length; i++) {
    const label = labels[i] ?? `stage-${String(i + 1).padStart(2, '0')}`;
    await stages[i].scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    const buffer = await stages[i].screenshot({ type: 'png' });
    const file = join(OUT_DIR, `${label}.png`);
    await writeFile(file, buffer);
    console.log(`  → ${file}`);
  }

  // Connect rail cards
  const tools = await page.$('.home-tools__rail');
  if (tools) {
    await tools.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    const buffer = await tools.screenshot({ type: 'png' });
    await writeFile(join(OUT_DIR, '07-connect-rail.png'), buffer);
    console.log('  → connect-rail');
  }

  await browser.close();
  console.log(`Done (${stamp}).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
