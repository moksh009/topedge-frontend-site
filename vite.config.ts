import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()];
  
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
        })
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
    // define: {
    //   global: 'globalThis',
    // },
  };
});
