import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  markdown: {
    shikiConfig: { themes: { light: "one-light", dark: "vitesse-dark" } },
  },
});
