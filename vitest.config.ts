import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@test": path.resolve(__dirname, "./test")
    }
  },
  test: {
    globals: true,
    setupFiles: [
      path.resolve(__dirname, "./test/vitest.setup.ts"),
      "dotenv/config"
    ],
    environment: "jsdom"
  }
});
