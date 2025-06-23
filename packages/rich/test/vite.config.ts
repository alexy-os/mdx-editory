import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react() as any],
  root: resolve(__dirname),
  define: {
    global: 'globalThis',
  },
  build: {
    outDir: 'dist-test',
    rollupOptions: {
      input: {
        test: resolve(__dirname, 'index.html')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src')
    }
  },
  server: {
    port: 5174, // A different port to avoid conflicts with the main dev server
    open: true
  }
}); 