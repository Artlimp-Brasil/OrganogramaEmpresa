import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/organograma/',
  plugins: [react()],
  server: {
    proxy: {
      '/api-n8n': {
        target: 'https://sistemas.artlimpbrasil.com.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-n8n/, '')
      }
    }
  }
})