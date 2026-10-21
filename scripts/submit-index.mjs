#!/usr/bin/env node
/**
 * Push every URL at the search engines, in one command, after a deploy.
 *
 * What is actually possible, as of 21 Oct 2026, so nobody expects more than
 * this delivers:
 *
 *   Bing, Yandex, Seznam, Naver — IndexNow. A real push API, free, no account.
 *     One POST carrying up to 10,000 URLs. This is fully automated here.
 *
 *   Google — there is NO public API that requests indexing for ordinary
 *     pages. The Indexing API covers JobPosting and BroadcastEvent only; the
 *     URL Inspection API is read-only and reports status rather than asking
 *     for a crawl; the old sitemap ping endpoint was retired in 2023. The one
 *     sanctioned bulk signal is the sitemap, and the Search Console API can
 *     resubmit it, which is what this script does. The "Request indexing"
 *     button in the Search Console UI is the only per-URL nudge Google
 *     offers and it has no API and a small daily quota, so it stays manual
 *     and should be saved for pages that matter most.
 *
 * Guard: it compares the live sitemap against the local one and refuses to
 * submit when production has not caught up. Submitting a URL before the new
 * content is live spends the crawl on the old page, which is worse than
 * waiting.
 *
 * Usage:
 *   node scripts/submit-index.mjs              # everything in the sitemap
 *   node scripts/submit-index.mjs --changed    # only URLs whose lastmod is today
 *   node scripts/submit-index.mjs --dry-run    # print, submit nothing
 *   node scripts/submit-index.mjs --wait       # wait for the deploy, then submit
 *   node scripts/submit-index.mjs --force      # skip the freshness guard
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SITE = 'https://topedgeai.com';
const HOST = 'topedgeai.com';
const INDEXNOW_KEY = 'db2d3b12e5f047e48445607a75862b1f';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const SITEMAP_URL = `${SITE}/sitemap.xml`;
const GSC_PROPERTY = `sc-domain:${HOST}`;
const URL_LIST_OUT = path.join(root, 'seo-audit', 'urls-to-index.txt');

const flags = new Set(process.argv.slice(2).filter((a) => a.startsWith('--')).map((a) => a.slice(2)));
const DRY = flags.has('dry-run');

function readEnv() {
  const file = path.join(root, '.env');
  if (!fs.existsSync(file)) return {};
  const out = {};
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (m) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return out;
}
const env = { ...readEnv(), ...process.env };

/** [{ loc, lastmod }] from a sitemap XML string. */
function parseSitemap(xml) {
  return [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g)].map(
    (m) => ({ loc: m[1], lastmod: m[2] || '' }),
  );
}

/**
 * The freshest local sitemap, not simply the first one found.
 *
 * public/sitemap.xml is rewritten by `npm run sitemap`; dist/sitemap.xml is
 * whatever the last full build produced. Reading dist first meant comparing
 * production against a stale copy, so the freshness guard below passed when
 * production was weeks behind, which is the one thing it exists to catch.
 */
function localSitemap() {
  const found = ['public/sitemap.xml', 'dist/sitemap.xml']
    .map((p) => ({ from: p, file: path.join(root, p) }))
    .filter((c) => fs.existsSync(c.file))
    .map((c) => ({ from: c.from, entries: parseSitemap(fs.readFileSync(c.file, 'utf8')) }));

  if (!found.length) {
    throw new Error('no sitemap.xml in public/ or dist/ — run `npm run sitemap` first');
  }
  found.sort((a, b) => newest(b.entries).localeCompare(newest(a.entries)));
  const [best, other] = found;
  if (other && newest(other.entries) < newest(best.entries)) {
    console.log(
      `Note: ${other.from} is older than ${best.from} ` +
        `(${newest(other.entries)} vs ${newest(best.entries)}). Rebuild before deploying.`,
    );
  }
  return best;
}

async function liveSitemap() {
  const res = await fetch(SITEMAP_URL, { redirect: 'follow' });
  if (!res.ok) throw new Error(`live sitemap HTTP ${res.status}`);
  return parseSitemap(await res.text());
}

/** Newest lastmod in a set, as a plain YYYY-MM-DD string. */
const newest = (entries) => entries.map((e) => e.lastmod).filter(Boolean).sort().at(-1) || '';

async function assertKeyLive() {
  const url = `${SITE}/${INDEXNOW_KEY}.txt`;
  const res = await fetch(url, { redirect: 'follow' });
  const body = (await res.text()).trim();
  if (!res.ok) throw new Error(`IndexNow key file HTTP ${res.status} at ${url}`);
  if (body !== INDEXNOW_KEY) throw new Error(`IndexNow key mismatch at ${url}`);
}

async function submitIndexNow(urlList) {
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  });
  return { status: res.status, text: await res.text().catch(() => '') };
}

/** Google only accepts the sitemap. Returns null when not configured. */
async function submitSitemapToGoogle() {
  const { GOOGLE_CLIENT_ID: id, GOOGLE_CLIENT_SECRET: secret, GSC_REFRESH_TOKEN: refresh } = env;
  if (!id || !secret || !refresh) return null;

  const tok = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: id,
      client_secret: secret,
      refresh_token: refresh,
      grant_type: 'refresh_token',
    }),
  });
  const t = await tok.json();
  if (!tok.ok) return { ok: false, detail: t.error_description || JSON.stringify(t) };

  const endpoint =
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_PROPERTY)}` +
    `/sitemaps/${encodeURIComponent(SITEMAP_URL)}`;
  const res = await fetch(endpoint, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${t.access_token}` },
  });
  if (res.ok) return { ok: true };
  return { ok: false, detail: `HTTP ${res.status} ${(await res.text()).slice(0, 300)}` };
}

// ---------------------------------------------------------------- main

const { from, entries } = localSitemap();
const today = new Date().toISOString().slice(0, 10);
const selected = flags.has('changed') ? entries.filter((e) => e.lastmod === today) : entries;
const urlList = [...new Set(selected.map((e) => e.loc))];

console.log(`Sitemap: ${from} (${entries.length} URLs)`);
console.log(`Selected: ${urlList.length}${flags.has('changed') ? ` with lastmod ${today}` : ''}\n`);

if (!urlList.length) {
  console.log('Nothing to submit.');
  process.exit(0);
}

fs.mkdirSync(path.dirname(URL_LIST_OUT), { recursive: true });
fs.writeFileSync(URL_LIST_OUT, urlList.join('\n') + '\n', 'utf8');
console.log(`Wrote ${path.relative(root, URL_LIST_OUT)} (paste-ready list)\n`);

// --- freshness guard -------------------------------------------------
/**
 * Poll the live sitemap until production catches up, so one command can be run
 * right after `git push` and left alone while Netlify builds.
 */
async function waitForDeploy(wanted, { tries = 40, everyMs = 30_000 } = {}) {
  for (let i = 1; i <= tries; i += 1) {
    let behindCount = wanted.length;
    try {
      const live = await liveSitemap();
      const byLoc = new Map(live.map((e) => [e.loc, e.lastmod]));
      behindCount = wanted.filter((e) => {
        const m = byLoc.get(e.loc);
        return m !== undefined && e.lastmod && m < e.lastmod;
      }).length;
      if (behindCount === 0) {
        console.log(`✅ Production caught up after ${i} check${i > 1 ? 's' : ''}.\n`);
        return true;
      }
    } catch {
      /* transient: a deploy swap can blip the sitemap. Keep waiting. */
    }
    const mins = Math.round((i * everyMs) / 60_000);
    console.log(`   ${behindCount} URLs still behind … (${mins} min elapsed)`);
    await new Promise((r) => setTimeout(r, everyMs));
  }
  return false;
}

if (flags.has('wait') && !flags.has('force')) {
  console.log('Waiting for the deploy to go live (checking every 30s, up to 20 min)…\n');
  const ok = await waitForDeploy(selected);
  if (!ok) {
    console.error('✖ Production never caught up. Check the Netlify deploy, then re-run.\n');
    process.exit(2);
  }
}

if (!flags.has('force')) {
  try {
    const live = await liveSitemap();
    const liveByLoc = new Map(live.map((e) => [e.loc, e.lastmod]));

    // Per URL, not just the newest date in the file. One freshly deployed page
    // drags the file's newest lastmod to today while sixty others are still
    // weeks old, so comparing maxima calls production current when almost none
    // of what we are about to submit has actually shipped.
    const behind = selected.filter((e) => {
      const liveMod = liveByLoc.get(e.loc);
      if (liveMod === undefined) return false; // new URL, nothing to be behind
      return e.lastmod && liveMod < e.lastmod;
    });
    const missing = selected.filter((e) => !liveByLoc.has(e.loc));

    if (behind.length) {
      console.error(`✖ ${behind.length} of ${selected.length} URLs are not live yet.`);
      for (const e of behind.slice(0, 5)) {
        console.error(`    ${e.loc}  live ${liveByLoc.get(e.loc) || '(none)'} < local ${e.lastmod}`);
      }
      if (behind.length > 5) console.error(`    … and ${behind.length - 5} more`);
      console.error('\n  Deploy first, then run this again. Submitting now points the crawlers');
      console.error('  at the old content and spends the fetch for nothing.');
      console.error('  Override with --force if you know better.\n');
      process.exit(2);
    }
    console.log(
      `✅ Production is current for all ${selected.length} URLs` +
        (missing.length ? ` (${missing.length} not yet in the live sitemap)` : '') +
        '\n',
    );
  } catch (err) {
    console.error(`⚠️  Could not read the live sitemap (${err.message}). Continuing.\n`);
  }
}

if (DRY) {
  for (const u of urlList) console.log(`  ${u}`);
  console.log('\n--dry-run: nothing submitted.');
  process.exit(0);
}

// --- Bing / Yandex / Seznam / Naver ----------------------------------
await assertKeyLive();
const { status, text } = await submitIndexNow(urlList);
if (status === 200 || status === 202) {
  console.log(`✅ IndexNow accepted ${urlList.length} URLs (HTTP ${status})`);
  console.log('   → Bing, Yandex, Seznam, Naver. Check Bing Webmaster Tools → IndexNow.');
} else {
  console.error(`✖ IndexNow HTTP ${status} ${text}`);
  process.exitCode = 1;
}

// --- Google ----------------------------------------------------------
const google = await submitSitemapToGoogle();
if (google === null) {
  console.log('\n○ Google: skipped, no GSC_REFRESH_TOKEN in .env.');
  console.log('   Run `node scripts/gsc-auth.mjs` once to set it up.');
} else if (google.ok) {
  console.log(`\n✅ Google: sitemap resubmitted to Search Console (${GSC_PROPERTY}).`);
} else {
  console.error(`\n✖ Google: ${google.detail}`);
  process.exitCode = 1;
}

console.log(
  '\nNote: Google has no API that forces a crawl of an ordinary page. The sitemap' +
    '\nis the bulk signal; "Request indexing" in the Search Console UI is manual by' +
    '\ndesign and quota-limited, so spend it on the pages that matter most.',
);
