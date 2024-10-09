import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {marked} from 'marked';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'unsafe-none',
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    {
      name: 'vite-plugin-markdown',
      transform(src, id) {
        if (id.endsWith('.md')) {
          // Xử lý Markdown với Markdown-it
          const html = marked.parse(src);

          return `export default ${JSON.stringify(html)}`
        }
      },
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
