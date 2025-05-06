import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  integrations: [
    expressiveCode({
      plugins: [pluginLineNumbers()],
      themes: ["light-plus", "dark-plus"],
      frames: { showCopyToClipboardButton: false },
    }),
  ],
});
