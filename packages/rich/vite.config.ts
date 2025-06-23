import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react() as any],
  define: {
    global: 'globalThis',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'RichEditor',
      formats: ['es', 'umd'],
      fileName: (format) => `rich-editor.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    include: ['gray-matter']
  }
}); 