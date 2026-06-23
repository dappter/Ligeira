import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        empresas: resolve(__dirname, 'empresas.html'),
        blog: resolve(__dirname, 'blog.html'),
        cobertura: resolve(__dirname, 'cobertura.html'),
      }
    }
  }
})
