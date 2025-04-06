export function readBlogSlugFromPath(path: string) {
  return path.split("/").at(2) || "";
}

export function readTheme() {
  const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  return localStorage.getItem("theme") || system;
}

export function writeTheme(theme: string) {
  document.documentElement.setAttribute("class", theme);
  localStorage.setItem("theme", theme);
}
