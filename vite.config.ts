import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                if (id.includes('@supabase')) return 'supabase';
                if (id.includes('framer-motion')) return 'animations';
                if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/')) {
                  return 'vendor';
                }
              }
            },
          },
        },
        // Minification with esbuild (default, faster and simpler)
        minify: 'esbuild',
        // Target modern browsers for smaller bundle
        target: 'esnext',
        cssCodeSplit: true,
        // Enable source maps for production debugging if needed
        sourcemap: false,
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
