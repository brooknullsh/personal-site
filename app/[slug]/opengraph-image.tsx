import { getNotes } from "@/lib"
import { notFound } from "next/navigation"
import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

type Props = Readonly<{ params: Promise<{ slug: string }> }>

export default async function Image({ params }: Props) {
  const { slug } = await params
  const notes = await getNotes()

  const noteBySlug = notes.find((note) => note.slug === slug)
  if (!noteBySlug) {
    notFound()
  }

  const { title, subtitle } = noteBySlug.metadata

  return new ImageResponse(
    (
      <div tw="flex flex-col justify-center items-center h-full w-full text-white">
        <p tw="text-4xl font-semibold">{title}</p>
        <p tw="text-xl text-neutral-400">{subtitle}</p>
      </div>
    ),
  )
}
