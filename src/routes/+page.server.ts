import type { PageServerLoad } from "./$types";

const readBlogFile = async (fileName: string) => ({
  slug: fileName.split("/").at(2),
  // See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
  ...(await import(/* @vite-ignore */ fileName)).metadata,
});

export const load: PageServerLoad = async () => {
  const blogFiles = import.meta.glob("./blog/*/*.svx");
  const allMetadata = await Promise.all(Object.keys(blogFiles).map(readBlogFile));

  return { allMetadata };
};
