import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const META = {
  title: "Community | TopEdge AI",
  description: "Join the TopEdge AI Community! Connect with builders, share automation workflows, access exclusive resources, and collaborate on the future of AI agents.",
  image: "https://topedgeai.com/community-og-image.jpg"
};

const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');
const communityPath = path.join(distPath, 'community.html');

console.log("🏗️ Generating community.html...");

let html = fs.readFileSync(indexPath, 'utf8');

html = html.replace(/<title>.*?<\/title>/, `<title>${META.title}</title>`);
html = html.replace(/name="description" content=".*?"/g, `name="description" content="${META.description}"`);
html = html.replace(/property="og:title" content=".*?"/g, `property="og:title" content="${META.title}"`);
html = html.replace(/property="og:description" content=".*?"/g, `property="og:description" content="${META.description}"`);
html = html.replace(/property="og:image" content=".*?"/g, `property="og:image" content="${META.image}"`);
html = html.replace(/name="twitter:title" content=".*?"/g, `name="twitter:title" content="${META.title}"`);
html = html.replace(/name="twitter:description" content=".*?"/g, `name="twitter:description" content="${META.description}"`);
html = html.replace(/name="twitter:image" content=".*?"/g, `name="twitter:image" content="${META.image}"`);

html = html.replace(/<title>.*?<\/title>/, (m) => `${m}\n    <meta name="robots" content="noindex, follow" />`);

fs.writeFileSync(communityPath, html);

console.log("✅ dist/community.html created");

// Client-only redirects to dash.topedgeai.com: crawlable, never indexed.
// Must run before prerender, while dist/index.html is still the bare SPA shell.
const APP_SHELLS = {
  signup: 'Opening signup | TopEdge',
  login: 'Signing in | TopEdge',
  docs: 'Docs | TopEdge',
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