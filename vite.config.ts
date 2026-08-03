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

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react(), legalStaticHtml()];

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
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            animations: ['framer-motion'],
            charts: ['chart.js', 'react-chartjs-2'],
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
      exclude: ['firebase'],
    },
  };
});
