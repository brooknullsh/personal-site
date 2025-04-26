import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";

const entries = await getCollection("blogs");
const blogs = Object.fromEntries(entries.map(({ id, data }) => [id, data]));

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",
  pages: blogs,
  getImageOptions: (_, page) => ({
    title: page.title,
    description: page.subtitle,
    bgGradient: [[255, 255, 255]],
    font: {
      title: { size: 128, weight: "Bold", color: [0, 0, 0] },
      description: { size: 16, color: [0, 0, 0] },
    },
  }),
});
