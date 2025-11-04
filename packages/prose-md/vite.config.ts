import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ProseMd',
      fileName: (format) => `prose-md.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs']
    },
    target: 'node18',
    rollupOptions: {
      // Externalize all non-relative, non-absolute imports so Node resolves them at runtime
      external: (id) => !id.startsWith('.') && !path.isAbsolute(id),
      output: { globals: {} }
    },
    sourcemap: true,
    minify: false
  },
  resolve: {
    alias: {}
  }
});
