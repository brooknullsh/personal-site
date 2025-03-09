import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(undefined, { dateStyle: "full" });
};
