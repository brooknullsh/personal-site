const storedTheme = localStorage.getItem("theme");

if (storedTheme) {
  document.documentElement.setAttribute("class", storedTheme);
} else setTheme();

function setTheme() {
  const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  document.documentElement.setAttribute("class", system);
  localStorage.setItem("theme", system);
}
