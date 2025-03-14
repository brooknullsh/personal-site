import { type BlogMetadata, sortBlogs } from "$lib/utils";
import type { LayoutServerLoad } from "./$types";

export const prerender = true;

export const load: LayoutServerLoad = async () => {
  const blogs = import.meta.glob<{ metadata: BlogMetadata }>("./blog/*/*.svx");

  const parsedMetadata = await Promise.all(
    Object.entries(blogs).map(async ([filePath, component]) => ({
      ...(await component()).metadata,
      slug: filePath.split("/").at(2) || "/",
    })),
  );

  return { allMetadata: sortBlogs(parsedMetadata) };
};
