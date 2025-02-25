import type { LayoutServerLoad } from "./$types";

export const prerender = true;

type BlogMetadata = {
  layout: string;
  title: string;
  description: string;
  tags: string[];
  published: string;
};

export const load: LayoutServerLoad = async () => {
  const blogs = import.meta.glob<{ metadata: BlogMetadata }>("./blog/*/*.svx");

  const parsedMetadata = Object.entries(blogs).map(async ([filePath, component]) => ({
    slug: filePath.split("/").at(2),
    ...(await component()).metadata,
  }));

  return { allMetadata: await Promise.all(parsedMetadata) };
};
