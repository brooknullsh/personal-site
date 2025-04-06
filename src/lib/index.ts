export function readBlogSlugFromPath(path: string) {
  return path.split("/").at(2) || "";
}
