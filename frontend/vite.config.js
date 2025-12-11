import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: mode === 'development' ? {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true
        }
      } : {}
    },
    define: {
      'process.env.VITE_API_URL': JSON.stringify(
        env.VITE_API_URL || (mode === 'production' ? '' : 'http://localhost:3001')
      )
    }
  }
})
