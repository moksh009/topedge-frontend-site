import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

/** Serve static legal HTML at /privacy and /terms (mirrors Netlify force rewrites). */
function legalStaticHtml(): Plugin {
  const sendLegal = (
    req: { url?: string },
    res: { setHeader: (k: string, v: string) => void; end: (b: string | Buffer) => void },
    next: () => void,
  ) => {
    const url = req.url?.split('?')[0] ?? '';
    const map: Record<string, string> = {
      '/privacy': 'privacy.html',
      '/privacy/': 'privacy.html',
      '/terms': 'terms.html',
      '/terms/': 'terms.html',
    };
    const fileName = map[url];
    if (!fileName) return next();
    const file = path.resolve(__dirname, 'public', fileName);
    if (!fs.existsSync(file)) return next();
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(fs.readFileSync(file));
  };

  return {
    name: 'legal-static-html',
    configureServer(server) {
      server.middlewares.use(sendLegal);
    },
    configurePreviewServer(server) {
      server.middlewares.use(sendLegal);
    },
  };
}

/**
 * `virtual:docs-shots` = public/docs/img/shots.json, or `{}` when it does not
 * exist yet. The docs renderer needs each screenshot's width and height in the
 * prerendered HTML, and Vite will not import a file from public/ directly.
 */
function docsShots(): Plugin {
  const id = 'virtual:docs-shots';
  const resolved = `\0${id}`;
  const file = path.resolve(__dirname, 'public', 'docs', 'img', 'shots.json');
  return {
    name: 'docs-shots',
    resolveId(source) {
      return source === id ? resolved : null;
    },
    load(source) {
      if (source !== resolved) return null;
      this.addWatchFile(file);
      let json = '{}';
      try {
        if (fs.existsSync(file)) json = JSON.stringify(JSON.parse(fs.readFileSync(file, 'utf8')));
      } catch (err) {
        this.warn(`public/docs/img/shots.json is not valid JSON; rendering no screenshots (${err})`);
      }
      return `export default ${json};`;
    },
    configureServer(server) {
      server.watcher.add(file);
      const reload = (changed: string) => {
        if (path.resolve(changed) !== file) return;
        const mod = server.moduleGraph.getModuleById(resolved);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', reload);
      server.watcher.on('change', reload);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react(), legalStaticHtml(), docsShots()];

  // Only add visualizer in development mode
  if (mode === 'development') {
    try {
      const { visualizer } = require('rollup-plugin-visualizer');
      plugins.push(
        visualizer({
          open: true,
          filename: 'bundle-report.html',
          gzipSize: true,
          brotliSize: true,
        }),
      );
    } catch (error) {
      console.warn('rollup-plugin-visualizer not available, skipping...');
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
      build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'terser',
      chunkSizeWarningLimit: 1000,
      // Do not modulepreload charts/heavy on every route — homepage never needs them.
      modulePreload: {
        resolveDependencies(filename, deps) {
          return deps.filter(
            (d) =>
              !d.includes('charts') &&
              !d.includes('heavy'),
          );
        },
      },
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
      rollupOptions: {
        output: {
          // Keep React in a leaf vendor chunk. Do NOT force-split app source
          // (marketing) — that created vendor→community cycles and
          // left React undefined when framer-motion called createContext
          // (blank pages + prerender h1 timeouts on Netlify).
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (
              id.includes('/react-dom/') ||
              id.includes('/react/') ||
              id.includes('/scheduler/') ||
              id.includes('/react-router') ||
              id.includes('/react-helmet-async/') ||
              id.includes('/react-hot-toast/')
            ) {
              return 'vendor';
            }
            if (id.includes('framer-motion') || id.includes('/gsap/') || id.includes('/lenis/')) {
              return 'animations';
            }
            if (id.includes('chart.js') || id.includes('react-chartjs-2')) {
              return 'charts';
            }
            if (id.includes('jspdf') || id.includes('mathjs')) {
              return 'heavy';
            }
          },
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    },
  };
});
