#!/usr/bin/env node
/**
 * IndexNow — notify Bing / Yandex / Seznam / Naver of URL adds/updates.
 * Google does NOT use IndexNow; keep GSC URL Inspection for Google.
 *
 * Docs: https://www.indexnow.org/documentation
 * Get started: https://www.bing.com/indexnow/getstarted
 *
 * Usage:
 *   npm run indexnow -- https://topedgeai.com/compare/dondy
 *   npm run indexnow -- --dondy
 *   npm run indexnow -- --changed
 *   npm run indexnow -- --phase-e
 *   npm run indexnow -- --sitemap   # only when many URLs truly changed
 *
 * Deploy the key file BEFORE the first submit (public/<key>.txt → site root).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSitemapPaths } from './marketing-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const SITE = 'https://topedgeai.com';
const HOST = 'topedgeai.com';
const KEY = 'db2d3b12e5f047e48445607a75862b1f';
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

/**
 * URLs refreshed 26 Sep 2026: homepage FAQ + full prerender, blog index, and
 * every post (em dash sweep, always-open FAQs, topical related links).
 */
const CHANGED_RECENT = [
  '/',
  '/blog',
  ...getSitemapPaths().filter((p) => p.startsWith('/blog/')),
];

/** URLs refreshed in Phase E feature AEO + link hygiene (Sep 2026). */
const CHANGED_PHASE_E = [
  '/features/flow-builder',
  '/features/opt-in-tools',
  '/features/campaigns',
  '/features/audience-crm',
  '/features/analytics',
  '/features/chat-rules',
  '/features/instagram',
  '/features/warranty',
  '/features/profit-loss',
  '/features/intent-detection',
  '/features/journeys',
  '/features/live-chat',
  '/features/ai-brain',
  '/features/meta-manager',
  '/compare/dondy',
  '/compare/updatrr',
  '/blog/dondy-alternative-shopify-india',
  '/blog/best-whatsapp-automation-tools-shopify-india',
  '/blog/how-to-choose-whatsapp-app-shopify-app-store',
  '/blog/whatsapp-business-api-pricing-india',
  '/blog/cod-confirmation-whatsapp-reduce-rto-shopify',
];

const DONDYY = ['/compare/dondy', '/blog/dondy-alternative-shopify-india'];

function toAbs(u) {
  if (u.startsWith('http://') || u.startsWith('https://')) return u;
  const p = u.startsWith('/') ? u : `/${u}`;
  return p === '/' ? `${SITE}/` : `${SITE}${p}`;
}

function unique(list) {
  return [...new Set(list)];
}

function parseArgs(argv) {
  const flags = new Set();
  const urls = [];
  for (const a of argv) {
    if (a.startsWith('--')) flags.add(a.slice(2));
    else urls.push(a);
  }
  return { flags, urls };
}

async function assertKeyLive() {
  const res = await fetch(KEY_LOCATION, { redirect: 'follow' });
  const body = (await res.text()).trim();
  if (!res.ok) {
    throw new Error(`Key file HTTP ${res.status} at ${KEY_LOCATION} — deploy public/${KEY}.txt first`);
  }
  if (body !== KEY) {
    throw new Error(
      `Key file body mismatch at ${KEY_LOCATION}\nexpected: ${KEY}\ngot: ${body.slice(0, 80)}`,
    );
  }
  console.log(`✅ Key live: ${KEY_LOCATION}`);
}

async function submit(urlList) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const text = await res.text().catch(() => '');
  return { status: res.status, text };
}

async function main() {
  const { flags, urls: cliUrls } = parseArgs(process.argv.slice(2));

  let paths = [];
  if (flags.has('dondy')) paths = DONDYY;
  else if (flags.has('changed')) paths = CHANGED_RECENT;
  else if (flags.has('phase-e')) paths = CHANGED_PHASE_E;
  else if (flags.has('sitemap')) paths = getSitemapPaths();
  else if (cliUrls.length) paths = cliUrls;
  else {
    console.error(`Usage:
  npm run indexnow -- <url> [url...]
  npm run indexnow -- --dondy
  npm run indexnow -- --changed
  npm run indexnow -- --phase-e
  npm run indexnow -- --sitemap`);
    process.exit(1);
  }

  const urlList = unique(paths.map(toAbs));
  if (urlList.length > 10000) {
    throw new Error('IndexNow max is 10,000 URLs per POST');
  }

  // Local sanity: key file exists in public/ before we care about prod
  const localKey = path.join(root, 'public', `${KEY}.txt`);
  if (!fs.existsSync(localKey)) {
    throw new Error(`Missing ${localKey}`);
  }

  console.log(`IndexNow → ${ENDPOINT}`);
  console.log(`Host: ${HOST}`);
  console.log(`URLs (${urlList.length}):`);
  for (const u of urlList) console.log(`  ${u}`);

  await assertKeyLive();

  const { status, text } = await submit(urlList);
  console.log(`Response: HTTP ${status}${text ? ` ${text}` : ''}`);

  // 200 = accepted; 202 = accepted, key validation pending
  if (status !== 200 && status !== 202) {
    process.exit(1);
  }
  console.log('✅ Submitted. Verify in Bing Webmaster Tools → URL Submission / IndexNow.');
}

main().catch((err) => {
  console.error('❌', err.message || err);
  process.exit(1);
});
