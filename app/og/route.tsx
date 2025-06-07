import { ImageResponse } from "next/og"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const title = new URL(req.url).searchParams.get("title")

  if (!title) {
    return new NextResponse(undefined, { status: 400 })
  }

  return new ImageResponse(
    (
      <div tw="flex flex-col justify-center items-center h-full w-full">
        <p tw="text-6xl text-black">{title}</p>
        <p tw="text-blue-400">[ brooknullsh.com ]</p>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
