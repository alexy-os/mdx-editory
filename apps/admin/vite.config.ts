import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  
  define: {
    global: 'globalThis',
    'process.env.NODE_ENV': '"development"'
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/data': path.resolve(__dirname, './src/data'),
      '@ui8kit': path.resolve(__dirname, '../../packages/ui/utility'),
      '@editory/rich': path.resolve(__dirname, '../../packages/rich/src/index.ts')
    }
  },
  
  optimizeDeps: {
    include: [
      'gray-matter',
      '@tiptap/react',
      '@tiptap/starter-kit',
      '@tiptap/extension-typography',
      '@tiptap/extension-placeholder',
      '@tiptap/extension-code-block-lowlight',
      '@tiptap/extension-image',
      '@tiptap/extension-link',
      '@tiptap/extension-table',
      'lowlight',
      'lucide-react'
    ]
  },
  
  build: {
    outDir: 'dist',
    minify: false,
    sourcemap: true,
    target: 'es2020',
    
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  
  server: {
    port: 5173,
    host: true
  },
  
  preview: {
    port: 4173,
    host: true
  }
})