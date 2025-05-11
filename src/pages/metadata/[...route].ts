import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";

const entries = await getCollection("notes");
const notes = Object.fromEntries(entries.map(({ id, data }) => [id, data]));

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",
  pages: notes,
  getImageOptions: (_, page) => ({
    title: page.title,
    description: page.subtitle,
    bgGradient: [[255, 255, 255]],
    fonts: ["./src/assets/geist-mono.ttf"],
    logo: { size: [36], path: "./public/favicon.png" },
    font: {
      title: { size: 120, weight: "Bold", color: [0, 0, 0] },
      description: { color: [0, 0, 0] },
    },
  }),
});
