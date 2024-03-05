import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePlugin from 'vite-plugin-react-js-support';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),vitePlugin([], { jsxInject: true })],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  },
    
})

