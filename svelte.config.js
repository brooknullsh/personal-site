import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    mdsvex({ layout: { blog: "./src/lib/components/blog/blog-layout.svelte" } }),
  ],
  kit: { adapter: adapter() },
  extensions: [".svelte", ".svx"],
};

export default config;
