import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePluginFonts } from "vite-plugin-fonts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginFonts({
      // Custom fonts.
      custom: {
        families: [
          {
            name: "gems Precise",
            local: "gems Precise",
            src: "./src/assets/1gems_precise.ttf",
          },
          {
            name: "gems Precise Black",
            local: "gems Precise Black",
            src: "./src/assets/2gems_precise_black.ttf",
          },
        ],
        display: "auto",
        preload: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
