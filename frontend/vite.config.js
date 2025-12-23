import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [
    react({
      include: '**/*.{jsx,js}',
    })
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'build'
  },
  test: {
    globals: true,  // This enables test, describe, it, expect globally
    environment: 'happy-dom',
    setupFiles: './src/setupTests.js'
  }
})


