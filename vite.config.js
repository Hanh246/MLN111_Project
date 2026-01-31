import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'lunar': ['lunar-javascript'],
          'react-vendor': ['react', 'react-dom']
        }
      }
    },
    cssCodeSplit: true,
    minify: 'esbuild' // Use esbuild instead of terser (already bundled with Vite)
  }
})
