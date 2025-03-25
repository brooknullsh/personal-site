import { read } from "$app/server";
import type { RequestHandler } from "./$types";
import geistMono from "./geist-mono.ttf";
import Component from "./metadata-component.svelte";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { html as toReactNode } from "satori-html";
import { render } from "svelte/server";

const WIDTH = 1200;
const HEIGHT = 630;
const FONT = read(geistMono).arrayBuffer();

export const GET: RequestHandler = async ({ url }) => {
  const title = url.searchParams.get("title") || undefined;
  const subtitle = url.searchParams.get("subtitle") || undefined;

  const { body } = render(Component, { props: { title, subtitle } });
  const svg = await satori(toReactNode(body), {
    fonts: [{ name: "Geist Mono", data: await FONT, style: "normal" }],
    height: HEIGHT,
    width: WIDTH,
  });

  const png = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } }).render();
  return new Response(png.asPng(), { headers: { "Content-Type": "image/png" } });
};
