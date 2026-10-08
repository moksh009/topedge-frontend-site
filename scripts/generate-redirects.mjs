/**
 * Keep public/_redirects SPA/404 footer in sync with marketing-urls.
 *
 * Soft-404: unknown URLs must NOT fall through to homepage index.html.
 * SPA client routes (login/signup/admin/dev) get their own noindex shells
 * written by build-static.js, never the homepage prerender.
 *
 * NEVER emit trailing-slash force redirects (Netlify Pretty URLs + flat .html).
 * Patterns like "star-slash → :splat 301!" match slashless paths too and
 * 301-loop every marketing URL onto itself (ERR_TOO_MANY_REDIRECTS).
 * Slashless canonicals + sitemap locs are the SEO signal.
 *
 * After deploy smoke (see docs/seo/measurement.md § redirect/soft-404):
 *   curl -sI https://topedgeai.com/this-is-not-a-real-page-xyz → HTTP 404
 *   curl -sI https://topedgeai.com/pricing → HTTP 200 (not a 301 loop)
 *
 * Markers: BEGIN GENERATED … END GENERATED
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const redirectsPath = path.resolve(__dirname, '../public/_redirects');

const BEGIN = '# BEGIN GENERATED — do not edit (scripts/generate-redirects.mjs)';
const END = '# END GENERATED';

/**
 * Trailing-slash duplicates are NOT solved here. Reverted 2026-10-08.
 *
 * The previous version emitted one explicit `/<path>/  /<path>  301!` per sitemap
 * URL to collapse the GSC "Duplicate without user-selected canonical" pair, on the
 * reasoning that an explicit rule cannot loop because its source always has the
 * slash and its target never does, and no other generated rule matches the target.
 *
 * That holds inside this file, which is why it passed review. The loop partner is
 * not in this file: it is Netlify's Pretty URLs, which 301s a path to its
 * trailing-slash form. So `/compare` → `/compare/` → (our rule) → `/compare` →
 * forever, and the browser gives up with ERR_TOO_MANY_REDIRECTS. That is what the
 * header above has always meant by "they self-loop with Pretty URLs"; the hazard is
 * the slash-stripping 301 itself, not the wildcard spelling of it.
 *
 * Observed: /compare, /blog/*, /pricing and /docs/* all broke, while
 * /lp/cod-confirmation kept serving — it is noindex, so it is not in
 * getSitemapPaths() and never got a rule. /privacy and /terms were skipped and
 * also stayed up. The Oct 7 crawl in seo-audit/evidence has all 101 URLs at 200,
 * before these rules existed.
 *
 * The duplicate is real and still worth fixing. It needs Pretty URLs off on the
 * Netlify site first; verify with `curl -sI https://topedgeai.com/compare` showing
 * 200 and not a 301 to /compare/, then these rules can come back. Until then the
 * canonical tag is the signal.
 */

function buildGeneratedBlock() {
  return `${BEGIN}
# Client-only SPA shells (must stay above the 404 catch-all)
# login/signup: noindex shells from build-static.js (never the homepage prerender)
# /docs is NOT here — it is prerendered, indexable HTML (see marketing-urls.mjs).
/login  /login.html  200
/login/  /login.html  200
/signup  /signup.html  200
/signup/  /signup.html  200
/dev/*  /dev.html  200

# Retired builder-community and admin areas: tell crawlers they are gone for good.
/community  /404.html  410!
/community/*  /404.html  410!
/admin  /404.html  410!
/admin/*  /404.html  410!

# Soft-404: unknown paths get noindex 404.html — never homepage SEO
# (Do not add trailing-slash force 301s — they self-loop with Pretty URLs.)
/*  /404.html  404
${END}
`;
}

function main() {
  if (!fs.existsSync(redirectsPath)) {
    throw new Error(`Missing ${redirectsPath}`);
  }
  const raw = fs.readFileSync(redirectsPath, 'utf8');
  const beginIdx = raw.indexOf(BEGIN);
  const endIdx = raw.indexOf(END);

  let head;
  if (beginIdx !== -1 && endIdx !== -1 && endIdx > beginIdx) {
    head = raw.slice(0, beginIdx).replace(/\s+$/, '');
  } else {
    head = raw
      .replace(/\n# SPA fallback[\s\S]*$/m, '')
      .replace(/\n\/\*  \/index\.html  200\s*$/m, '')
      .replace(/\s+$/, '');
  }

  const next = `${head}\n\n${buildGeneratedBlock()}\n`;
  // Fail closed: never write path catch-all slash-strip force 301s (line-anchored;
  // ignore comments that document the ban).
  if (/^\/\*\/\s+\/:splat\s+301!/m.test(next) || /^\/\*\s+\/:splat\s+301!/m.test(next)) {
    throw new Error(
      'Refusing to write a wildcard trailing-slash force 301 into _redirects (Netlify self-loop risk).',
    );
  }
  // Any forced 301 from a path to that same path without its trailing slash loops
  // against Netlify's Pretty URLs, however it is spelled. The wildcard check above
  // did not catch the explicit per-URL form, which is how the 2026-10-08 outage
  // shipped, so the shape is banned rather than one way of writing it.
  const selfSlashStrip = next
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .filter((l) => {
      const m = l.match(/^(\/\S*?)\/\s+(\/\S*)\s+30[18]!/);
      return m && m[1] === m[2];
    });
  if (selfSlashStrip.length) {
    throw new Error(
      `Refusing to write ${selfSlashStrip.length} slash-stripping force 301s into _redirects ` +
        `(Netlify Pretty URLs 301s the slashless form back, so each one is a loop). ` +
        `First: ${selfSlashStrip[0]}`,
    );
  }
  fs.writeFileSync(redirectsPath, next, 'utf8');
  console.log(`✅ Updated ${redirectsPath} (SPA shells + soft-404; no slash 301s)`);
}

main();
