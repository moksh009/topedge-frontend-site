/**
 * Load the TypeScript billing catalog from plain Node.
 *
 * billingCatalog.ts reads `import.meta.env`, which only exists under Vite, so the
 * module is bundled with esbuild and that expression is replaced with an empty
 * object. Used by the pricing drift checks in this directory.
 */
import { build } from 'esbuild';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

export async function loadBillingCatalog() {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'topedge-catalog-'));
  const outfile = path.join(outDir, 'billingCatalog.mjs');
  try {
    await build({
      entryPoints: [path.join(root, 'src/marketing/lib/billingCatalog.ts')],
      bundle: true,
      format: 'esm',
      platform: 'node',
      outfile,
      logLevel: 'error',
      define: { 'import.meta.env': '__VITE_ENV__' },
      banner: { js: 'const __VITE_ENV__ = {};' },
    });
    return await import(pathToFileURL(outfile).href);
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
}
