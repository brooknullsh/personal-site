import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type BlogMetadata = {
  layout: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  published: string;
  lastEdited: string;
};

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export function formatDate(date: string, dateStyle: Intl.DateTimeFormatOptions["dateStyle"]) {
  return new Date(date).toLocaleDateString(undefined, { dateStyle });
}

export function sortBlogs(metadata: BlogMetadata[]) {
  return metadata.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
}
