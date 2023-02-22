import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "lib",
    lib: {
      entry: resolve(__dirname, "./index.js"),
      fileName: "lib",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
    },
  },
});
