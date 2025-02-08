import type { PageServerLoad } from "./$types";

type BlogMetadata = {
  slug: string;
  layout: string;
  title: string;
  description: string;
  published: string;
};

export const load: PageServerLoad = async () => {
  const blogFiles = import.meta.glob<{ metadata: Record<string, string> }>("./blog/*/*.svx");

  const parsedObjects = Object.entries(blogFiles).map(async ([fileName, component]) => ({
    slug: fileName.split("/").at(2),
    ...(await component()).metadata,
  }));

  return { allMetadata: (await Promise.all(parsedObjects)) as BlogMetadata[] };
};
