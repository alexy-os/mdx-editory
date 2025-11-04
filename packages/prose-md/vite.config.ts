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
    rollupOptions: {
      external: ['@editory/rich', 'fs', 'path'],
      output: {
        globals: {
          '@editory/rich': 'EditoryRich',
          'fs': 'fs',
          'path': 'path'
        }
      }
    },
    sourcemap: true,
    minify: false
  },
  resolve: {
    alias: {
      '@editory/rich': path.resolve(__dirname, '../rich/src')
    }
  }
});
