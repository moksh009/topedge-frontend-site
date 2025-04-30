// Example Vite config with manualChunks for even smaller initial JS
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('chart.js')) return 'chartjs';
            if (id.includes('framer-motion')) return 'framer';
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('firebase')) return 'firebase';
            if (id.includes('react-router-dom')) return 'router';
            return 'vendor';
          }
        },
      },
    },
  },
});
