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
//
// Each shell also carries a meta description and one h1. These stay noindex, so
// the tags are not there to rank: Ahrefs reports "H1 missing" and "meta
// description missing" per URL regardless of indexability, and /login and
// /signup are linked from the navbar and footer of all 89 pages, so they were
// two permanent findings for the sake of two tags.
//
// The h1 goes inside #root, which React replaces on mount, so it is crawler and
// screen-reader visible with no visual change and no flash — it is clipped
// rather than display:none, because a display:none h1 is not announced.
// Titles are left exactly as they were; only the missing tags are added.
const SR_ONLY =
  'position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;' +
  'clip:rect(0 0 0 0);white-space:nowrap;border:0';
const APP_SHELLS = {
  signup: {
    title: 'Opening signup | TopEdge',
    h1: 'Create your account',
    description:
      'Create a TopEdge account to connect your Shopify store and start WhatsApp cart recovery and COD confirmation. Opens the dashboard to finish signup.',
  },
  login: {
    title: 'Signing in | TopEdge',
    h1: 'Sign in',
    description:
      'Sign in to your TopEdge dashboard to manage WhatsApp journeys, campaigns, templates and Shopify orders. Opens the dashboard to complete sign-in.',
  },
  dev: { title: 'TopEdge' },
};
const bareShell = fs.readFileSync(indexPath, 'utf8');
for (const [name, cfg] of Object.entries(APP_SHELLS)) {
  const head = [
    `<title>${cfg.title}</title>`,
    '    <meta name="robots" content="noindex, follow" />',
    ...(cfg.description ? [`    <meta name="description" content="${cfg.description}" />`] : []),
  ].join('\n');
  let shell = bareShell.replace(/<title>.*?<\/title>/, head);
  if (cfg.h1) {
    shell = shell.replace(
      '<div id="root"></div>',
      `<div id="root"><h1 style="${SR_ONLY}">${cfg.h1}</h1></div>`,
    );
  }
  fs.writeFileSync(path.join(distPath, `${name}.html`), shell);
  console.log(
    `✅ dist/${name}.html created (noindex, follow${cfg.h1 ? ' · h1 + description' : ''})`,
  );
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