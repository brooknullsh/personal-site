import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import ogs from "open-graph-scraper";

export const GET: RequestHandler = async ({ url }) => {
  const target = url.searchParams.get("target") || undefined;
  const { result } = await ogs({ url: target });

  return json({ imageUrl: result.ogImage![0].url || result.twitterImage![0].url });
};
