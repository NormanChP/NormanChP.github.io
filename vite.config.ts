import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  // ⚠️ Al ser tu repositorio principal de usuario, va directo a la raíz:
  base: '/', 
  
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(new URL('.', import.meta.url).pathname, "./src"),
    },
  },
})