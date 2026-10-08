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
import { getSitemapPaths } from './marketing-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const redirectsPath = path.resolve(__dirname, '../public/_redirects');

const BEGIN = '# BEGIN GENERATED — do not edit (scripts/generate-redirects.mjs)';
const END = '# END GENERATED';

/**
 * Trailing-slash duplicates, one explicit rule per known URL.
 *
 * Netlify serves `/compare/wati/` and `/compare/wati` as separate 200s. The
 * canonical tag points at the slashless form, but GSC indexed BOTH and split
 * their positions across the pair (e.g. /compare/aisensy at 3.8 and
 * /compare/aisensy/ at 1.9), which is the "Duplicate without user-selected
 * canonical" finding.
 *
 * A wildcard `/*\/ → /:splat 301!` is what the header above bans: it matches
 * slashless paths too and 301-loops every URL onto itself. Explicit per-path
 * rules cannot loop, because the source always has a trailing slash and the
 * target never does, and no generated rule matches the target.
 *
 * /privacy and /terms are skipped — public/_redirects already force-rewrites
 * both slash forms to static HTML higher up the file, and first match wins.
 */
const SLASH_REDIRECT_SKIP = new Set(['/', '/privacy', '/terms']);

function buildTrailingSlashRules() {
  const paths = getSitemapPaths()
    .filter((p) => p.startsWith('/') && !SLASH_REDIRECT_SKIP.has(p))
    .filter((p) => !p.endsWith('/'));
  const unique = [...new Set(paths)].sort();
  const lines = unique.map((p) => `${p}/  ${p}  301!`);
  return `# Trailing-slash duplicates → canonical slashless URL (explicit, never wildcard)
${lines.join('\n')}`;
}

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

${buildTrailingSlashRules()}

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
      'Refusing to write trailing-slash force 301s into _redirects (Netlify self-loop risk).',
    );
  }
  fs.writeFileSync(redirectsPath, next, 'utf8');
  console.log(`✅ Updated ${redirectsPath} (SPA shells + soft-404; no slash 301s)`);
}

main();
