import type { PageServerLoad } from "./$types";

type BlogMetadata = {
  slug: string;
  layout: string;
  title: string;
  description: string;
  published: string;
};

export const load: PageServerLoad = async () => {
  const blogs = import.meta.glob<{ metadata: Omit<BlogMetadata, "slug"> }>("./blog/*/*.svx");

  const parsedMetadata = Object.entries(blogs).map(async ([fileName, component]) => ({
    slug: fileName.split("/").at(2),
    ...(await component()).metadata,
  }));

  return { allMetadata: await Promise.all(parsedMetadata) };
};
