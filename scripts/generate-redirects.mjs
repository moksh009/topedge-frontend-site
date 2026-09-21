/**
 * Keep public/_redirects SPA/404 footer in sync with marketing-urls.
 *
 * Soft-404: unknown URLs must NOT fall through to homepage index.html.
 * SPA client routes (login/signup/docs/admin/dev) still get index.html.
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

function buildGeneratedBlock() {
  return `${BEGIN}
# Client-only SPA shells (must stay above the 404 catch-all)
/login  /index.html  200
/login/  /index.html  200
/signup  /index.html  200
/signup/  /index.html  200
/docs  /index.html  200
/docs/  /index.html  200
/admin/*  /index.html  200
/dev/*  /index.html  200

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
