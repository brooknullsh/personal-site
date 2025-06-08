import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

const DEFAULT_TITLE = "A place on the internet I can use for my own."

export async function GET(req: NextRequest) {
  const title = new URL(req.url).searchParams.get("title") || DEFAULT_TITLE

  return new ImageResponse(
    (
      <div tw="h-full p-24 text-white w-full flex flex-grow flex-col bg-black justify-between">
        <header tw="flex items-center justify-between">
          <p>Brook Nash</p>
          <p tw="text-neutral-400">Software Engineer</p>
        </header>

        <div tw="flex w-full justify-center">
          <h2 tw="text-5xl w-1/2 flex justify-center text-center tracking-tighter">
            {title}
          </h2>
        </div>

        <p tw="text-blue-400 flex justify-center">brooknullsh.com</p>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
