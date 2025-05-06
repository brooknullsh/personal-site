import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  integrations: [expressiveCode({ themes: ["light-plus", "dark-plus"] })],
});
