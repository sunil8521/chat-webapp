import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
  server:{
    host:"0.0.0.0",
    proxy:{
      '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
    }
  }
})
