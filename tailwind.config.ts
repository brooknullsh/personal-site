import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: { container: { center: true, padding: "2rem", screens: { "2xl": "800px" } } },
};

export default config;
