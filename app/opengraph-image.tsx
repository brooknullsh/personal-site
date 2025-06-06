import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div tw="flex flex-col justify-center items-center h-full w-full text-white">
        <p tw="text-4xl font-semibold">brooknullsh</p>
        <p tw="text-xl text-neutral-400">
          A place on the internet I can use for my own.
        </p>
      </div>
    ),
  )
}
