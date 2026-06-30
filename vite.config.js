import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        empresas: resolve(__dirname, 'empresas.html'),
        blog: resolve(__dirname, 'blog.html'),
        cobertura: resolve(__dirname, 'cobertura.html'),
        admin: resolve(__dirname, 'admin.html'),
      }
    }
  }
})
