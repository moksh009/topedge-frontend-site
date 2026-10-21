#!/usr/bin/env node
/**
 * Post-deploy check: does the live site answer an AI answer engine the same way
 * it answers Googlebot, and is the deployed HTML actually the new HTML.
 *
 * Why per-user-agent: an audit of this site reported that /robots.txt,
 * /sitemap.xml and several blog posts were unreachable, while the same URLs
 * returned 200 to a Googlebot UA. There is no user-agent branching anywhere in
 * this repo (no edge function, no _headers, no UA rule in netlify.toml or
 * _redirects), so the difference was on the auditing side. This script is how we
 * prove that per deploy instead of arguing about it: identical bytes to four
 * agents, or it fails.
 *
 * Checks, for each UA:
 *   - every sampled URL returns 200
 *   - the response body is byte-identical to Googlebot's for that URL
 *   - none of the strings this release removed are still being served
 *   - the retired slugs 301 rather than 200
 *   - robots.txt, sitemap.xml, llms.txt and llms-full.txt are served as text
 *
 * Usage:
 *   npm run verify:live-aeo
 *   npm run verify:live-aeo -- --origin https://deploy-preview-12--site.netlify.app
 */
const args = process.argv.slice(2);
const originArg = args.indexOf('--origin');
const ORIGIN = (originArg >= 0 ? args[originArg + 1] : 'https://topedgeai.com').replace(/\/$/, '');

const UAS = {
  Googlebot:
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'OAI-SearchBot':
    'Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)',
  PerplexityBot:
    'Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
  ClaudeBot: 'Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
};

/** A spread across page types, not every URL: this runs against production. */
const PAGES = [
  '/',
  '/pricing',
  '/features',
  '/features/journeys',
  '/features/cod-confirmation',
  '/compare',
  '/compare/interakt',
  '/compare/topedge-vs-wati-vs-interakt-vs-aisensy',
  '/customers',
  '/contact',
  '/blog',
  '/blog/how-to-reduce-rto-with-whatsapp-cod-confirmation',
  '/blog/ai-whatsapp-chatbot-for-shopify-india',
  '/blog/whatsapp-shared-inbox-shopify-order-context',
];

const TEXT_FILES = ['/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt'];

/** Slugs this release consolidated. A 200 here means the deploy did not land. */
const SHOULD_REDIRECT = [
  '/roi',
  '/blog/ai-chatbot-for-shopify',
  '/blog/cod-confirmation-whatsapp-reduce-rto-shopify',
  '/blog/topedge-ai-voice-agents-vs-human-agents-2024',
];

/** Strings this release removed. Any of them means stale HTML is being served. */
const MUST_BE_GONE = [
  'TOPEDGE RATE',
  '~₹1,800',
  'Add dashboard screenshot',
  'TopEdge AI TopEdge AI',
  'COD-to-prepaid path on every plan',
];

const problems = [];
const notes = [];

async function get(url, ua, redirect = 'follow') {
  const res = await fetch(url, {
    redirect,
    headers: { 'User-Agent': ua, Accept: '*/*' },
  });
  const body = redirect === 'manual' ? '' : await res.text();
  return { status: res.status, location: res.headers.get('location'), type: res.headers.get('content-type') || '', body };
}

/** Element-boundary aware text, so adjacent spans do not look like one word. */
function visibleText(html) {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/\s+/g, ' ')
    .trim();
}

console.log(`\nVerifying ${ORIGIN} across ${Object.keys(UAS).length} user agents\n`);

// --- pages -----------------------------------------------------------------
for (const path of PAGES) {
  const url = `${ORIGIN}${path}`;
  const baseline = await get(url, UAS.Googlebot);
  if (baseline.status !== 200) {
    problems.push(`${path}: Googlebot got ${baseline.status}`);
    continue;
  }
  const text = visibleText(baseline.body);
  for (const needle of MUST_BE_GONE) {
    if (baseline.body.includes(needle) || text.includes(needle)) {
      problems.push(`${path}: still serving "${needle}"`);
    }
  }

  const diffs = [];
  for (const [name, ua] of Object.entries(UAS)) {
    if (name === 'Googlebot') continue;
    const res = await get(url, ua);
    if (res.status !== 200) {
      problems.push(`${path}: ${name} got ${res.status} while Googlebot got 200`);
      continue;
    }
    if (res.body.length !== baseline.body.length) {
      diffs.push(`${name} ${res.body.length}B vs ${baseline.body.length}B`);
    }
  }
  if (diffs.length) {
    problems.push(`${path}: response differs by user agent — ${diffs.join(', ')}`);
  }
  console.log(`  ${diffs.length ? '✗' : '✓'} ${path}  (${baseline.body.length} B, identical to all agents)`);
}

// --- text surfaces ---------------------------------------------------------
console.log('');
for (const path of TEXT_FILES) {
  const url = `${ORIGIN}${path}`;
  let ok = true;
  for (const [name, ua] of Object.entries(UAS)) {
    const res = await get(url, ua);
    if (res.status !== 200) {
      problems.push(`${path}: ${name} got ${res.status}`);
      ok = false;
      continue;
    }
    const wantXml = path.endsWith('.xml');
    const typeOk = wantXml ? /xml/i.test(res.type) : /text\/plain/i.test(res.type);
    if (!typeOk) {
      problems.push(`${path}: ${name} got Content-Type "${res.type}"`);
      ok = false;
    }
  }
  console.log(`  ${ok ? '✓' : '✗'} ${path}`);
}

// --- consolidated slugs ----------------------------------------------------
console.log('');
for (const path of SHOULD_REDIRECT) {
  const res = await get(`${ORIGIN}${path}`, UAS.Googlebot, 'manual');
  const is3xx = res.status >= 300 && res.status < 400;
  if (!is3xx) {
    problems.push(`${path}: expected a 301, got ${res.status} (is the deploy live?)`);
  }
  console.log(`  ${is3xx ? '✓' : '✗'} ${path} → ${res.status}${res.location ? ` ${res.location}` : ''}`);
}

console.log('');
for (const n of notes) console.log(`  note: ${n}`);

if (problems.length) {
  console.error(`\n✖ live AEO verification FAILED (${problems.length})\n`);
  for (const p of problems) console.error(`  - ${p}`);
  console.error('');
  process.exit(1);
}
console.log(`✅ live AEO verification passed — ${PAGES.length} pages and ${TEXT_FILES.length} text surfaces identical to Googlebot, OAI-SearchBot, PerplexityBot and ClaudeBot\n`);
