import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "assets/works-studio",
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: path.resolve(__dirname, "src/works-studio/main.jsx"),
      output: {
        entryFileNames: "works-studio.js",
        assetFileNames: "works-studio.[ext]",
        format: "es",
      },
    },
  },
});
