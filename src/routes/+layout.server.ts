import { readBlogSlugFromPath } from "$lib";
import type { LayoutServerLoad } from "./$types";

export const prerender = true;

type Metadata = {
  title: string;
  subtitle: string;
  published: string;
};

type GlobImportPair = [string, () => Promise<unknown>];
type GlobImportResult = Record<string, () => Promise<unknown>>;

async function readBlogs(objects: GlobImportResult, [path, content]: GlobImportPair) {
  const slug = readBlogSlugFromPath(path);
  // @ts-expect-error: Unknown type, only run at build-time anyway
  const { metadata }: { metadata: Metadata } = await objects[path]();

  return { slug, metadata, content: (await content()) as string };
}

function sortByDate(objA: Metadata, objB: Metadata) {
  return new Date(objB.published).getTime() - new Date(objA.published).getTime();
}

export const load: LayoutServerLoad = async () => {
  // Import all blog's raw string contents
  const blogRaw = import.meta.glob("./blog/*/*.svx", { query: "?raw", import: "default" });
  // Import all blog's Svelte objects to access the metadata (frontmatter)
  const svelteObjects = import.meta.glob("./blog/*/*.svx");

  const blogData = await Promise.all(
    Object.entries(blogRaw).map((glob) => readBlogs(svelteObjects, glob)),
  );
  return { blogs: blogData.sort((a, b) => sortByDate(a.metadata, b.metadata)) };
};
