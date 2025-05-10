import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const notes = defineCollection({
  loader: glob({ base: "./src/notes", pattern: "*.md" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    published: z.coerce.date(),
  }),
});

export const collections = { notes };
