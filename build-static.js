import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

// Client-only redirects to dash.topedgeai.com: crawlable, never indexed.
// `docs` is deliberately absent — documentation is prerendered and indexable, so a
// noindex shell here would overwrite dist/docs.html and deindex the whole set.
// Must run before prerender, while dist/index.html is still the bare SPA shell.
const APP_SHELLS = {
  signup: 'Opening signup | TopEdge',
  login: 'Signing in | TopEdge',
  dev: 'TopEdge',
};
const bareShell = fs.readFileSync(indexPath, 'utf8');
for (const [name, title] of Object.entries(APP_SHELLS)) {
  const shell = bareShell.replace(
    /<title>.*?<\/title>/,
    `<title>${title}</title>\n    <meta name="robots" content="noindex, follow" />`,
  );
  fs.writeFileSync(path.join(distPath, `${name}.html`), shell);
  console.log(`✅ dist/${name}.html created (noindex, follow)`);
}

// Baseline dist/404.html, written here rather than only by the prerender.
//
// _redirects ends in `/*  /404.html  404` and carries no SPA fallback, so 404.html is
// the document every unmatched URL resolves to. The prerender renders the real
// NotFoundPage over this file, but it runs last and needs a Playwright browser it has
// to download at build time. When that step does not run, every marketing URL loses
// its .html AND the catch-all points at a file that is not there, which takes the
// whole marketing site down while static files under public/ keep serving. This shell
// means the catch-all always resolves, so the worst case is a plain 404 instead.
const notFoundShell = bareShell.replace(
  /<title>.*?<\/title>/,
  '<title>Page not found | TopEdge AI</title>\n    <meta name="robots" content="noindex, follow" />',
);
fs.writeFileSync(path.join(distPath, '404.html'), notFoundShell);
console.log('✅ dist/404.html created (noindex baseline; prerender overwrites it)');