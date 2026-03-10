import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
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
      port: Number(env.VITE_PORT) || 3069,
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
  }
})

