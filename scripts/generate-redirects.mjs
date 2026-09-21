/**
 * Keep public/_redirects trailing-slash + SPA/404 footer in sync with marketing-urls.
 *
 * - Slashless canonicals: /path/ to /path with 301 force (never use a catch-all splat slash rule)
 * - Soft-404: unknown URLs must NOT fall through to homepage index.html
 * - SPA client routes (login/signup/docs/admin/dev) still get index.html
 *
 * Markers: BEGIN GENERATED … END GENERATED
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getMarketingPrerenderPaths, getSitemapPaths } from './marketing-urls.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const redirectsPath = path.resolve(__dirname, '../public/_redirects');

const BEGIN = '# BEGIN GENERATED — do not edit (scripts/generate-redirects.mjs)';
const END = '# END GENERATED';

function buildGeneratedBlock() {
  const paths = [...new Set([...getMarketingPrerenderPaths(), ...getSitemapPaths()])].filter(
    (p) => p !== '/',
  );

  const slashLines = paths
    .map((p) => `${p}/  ${p}  301!`)
    .sort((a, b) => a.localeCompare(b));

  return `${BEGIN}
# Trailing slash → slashless (Pretty URLs off / flat .html)
${slashLines.join('\n')}

# Client-only SPA shells (must stay above the 404 catch-all)
/login  /index.html  200
/login/  /login  301!
/signup  /index.html  200
/signup/  /signup  301!
/docs  /index.html  200
/docs/  /docs  301!
/admin/*  /index.html  200
/dev/*  /index.html  200

# Soft-404: unknown paths get noindex 404.html — never homepage SEO
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
    // Strip legacy SPA catch-all if regenerating from scratch
    head = raw
      .replace(/\n# SPA fallback[\s\S]*$/m, '')
      .replace(/\n\/\*  \/index\.html  200\s*$/m, '')
      .replace(/\s+$/, '');
  }

  const next = `${head}\n\n${buildGeneratedBlock()}\n`;
  fs.writeFileSync(redirectsPath, next, 'utf8');
  console.log(`✅ Updated ${redirectsPath} (trailing-slash + soft-404 footer)`);
}

main();
