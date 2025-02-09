import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
    host: "localhost",
    port: 3000,
    proxy: {
      '/api':"http://localhost:8080"
    }
  },
  plugins: [
    tailwindcss(),
    react()],
  
})
