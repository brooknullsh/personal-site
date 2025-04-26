import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blogs = defineCollection({
  loader: glob({ base: "./src/blogs", pattern: "*.md" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    published: z.coerce.date(),
  }),
});

export const collections = { blogs };
