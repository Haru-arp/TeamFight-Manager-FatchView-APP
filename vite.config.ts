import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { patchesScanner } from "./vite-plugins/patches-scanner";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    patchesScanner(),
    tanstackRouter({ target: "react" }),
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
