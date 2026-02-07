import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/PPI_Calculator/',  // ← CHANGED THIS LINE
  plugins: [inspectAttr(), react()],
  build: {
    outDir: 'docs',  // ← ADD THIS if you haven't already
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});