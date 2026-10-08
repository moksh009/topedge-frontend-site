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