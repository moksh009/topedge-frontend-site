/**
 * Capture showcase scenes as WebP for OG/social sharing.
 * Requires: npm run dev running on port 3000, and playwright installed.
 *
 * Usage: node scripts/capture-showcases.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../public/marketing/showcase');
const BASE = process.env.SHOWCASE_BASE_URL ?? 'http://localhost:3000';

const SLUGS = [
  'flow-builder',
  'live-chat',
  'abandoned-cart',
  'order-automations',
  'campaigns',
  'meta-manager',
  'ai-brain',
  'shopify',
  'analytics',
  'audience-crm',
  'instagram',
  'sequences',
];

async function main() {
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    console.error('Install playwright: npm install -D playwright && npx playwright install chromium');
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 750 } });

  for (const slug of SLUGS) {
    const url = `${BASE}/dev/showcase?slug=${slug}`;
    console.log(`Capturing ${slug}…`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector(`[data-showcase-slug="${slug}"]`, { timeout: 15000 });
    const el = await page.$(`[data-showcase-slug="${slug}"] .premium-mesh-stage`);
    if (!el) {
      console.warn(`  Skip ${slug}: mesh stage not found`);
      continue;
    }
    const buffer = await el.screenshot({ type: 'webp', quality: 90 });
    await writeFile(join(OUT_DIR, `${slug}.webp`), buffer);
    console.log(`  → public/marketing/showcase/${slug}.webp`);
  }

  await browser.close();
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
