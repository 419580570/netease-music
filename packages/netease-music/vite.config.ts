import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import electron from "vite-plugin-electron";
const AutoImport = require("unplugin-auto-import/vite");
import vueJsx from '@vitejs/plugin-vue-jsx'
import electronRenderer from "vite-plugin-electron-renderer";
// import polyfillExports from "vite-plugin-electron/polyfill-exports";

export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    vueJsx(),
    electron({
      entry: "electron-main/index.ts",
    }),
    electronRenderer(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 定义全局变量
        additionalData: `@use "./src/assets/css/_variable.scss" as *;`,
      },
    },
  },
  resolve:{
	  alias:{
		  '@':path.resolve(__dirname,'./src')
	  }
  }
});
