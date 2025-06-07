import { ImageResponse } from "next/og"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const title = url.searchParams.get("title")
  const subtitle = url.searchParams.get("subtitle")

  if (!title || !subtitle) {
    return new NextResponse(undefined, { status: 400 })
  }

  return new ImageResponse(
    (
      <div tw="flex flex-col justify-center items-center h-full w-full">
        <p tw="text-6xl text-black">{title}</p>
        <p tw="text-xl text-neutral-400">{subtitle}</p>
        <p tw="text-blue-400">[ brooknullsh.com ]</p>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
