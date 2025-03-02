import { readable } from "svelte/store";

const createIsMobileReadable = () => {
  if (typeof window === "undefined") return readable(false);

  const userAgent = navigator.userAgent.toLowerCase();
  return readable(/iphone|ipad|ipod|android/i.test(userAgent));
};

export const isMobile = createIsMobileReadable();
