import { readBlogSlugFromPath } from "$lib";
import type { LayoutServerLoad } from "./$types";

export const prerender = true;

type Metadata = {
  title: string;
  published: string;
};

async function readBlogs([path, content]: [string, () => Promise<unknown>]) {
  const slug = readBlogSlugFromPath(path);

  // Import all blog's Svelte objects to access the metadata (frontmatter)
  const blogs = import.meta.glob("./blog/*/*.svx");
  // @ts-expect-error: Unknown type, only run at compile-time anyway
  const { metadata }: { metadata: Metadata } = await blogs[path]();

  return { slug, metadata, content: (await content()) as string };
}

export const load: LayoutServerLoad = async () => {
  // Import all blog's string contents
  const blogs = import.meta.glob("./blog/*/*.svx", { query: "?raw", import: "default" });
  const blogData = Object.entries(blogs).map(readBlogs);

  return { blogs: await Promise.all(blogData) };
};
