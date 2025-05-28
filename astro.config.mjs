import svelte from "@astrojs/svelte";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

export default defineConfig({
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    svelte(),
    expressiveCode({
      plugins: [pluginLineNumbers()],
      themes: ["github-light", "github-dark"],
      frames: { showCopyToClipboardButton: false },
    }),
  ],
});
