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
    fonts: ["./src/assets/inter-variable.ttf"],
    logo: { size: [48], path: "./public/favicon.png" },
    font: {
      title: { size: 120, weight: "Bold", color: [0, 0, 0] },
      description: { size: 24, color: [0, 0, 0] },
    },
  }),
});
