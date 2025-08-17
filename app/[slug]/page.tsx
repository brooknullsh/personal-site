import Box from "@/components/box"
import Loader from "@/components/loader"
import Shortcut from "@/components/shortcut"
import { getNotes } from "@/lib"
import type { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { notFound } from "next/navigation"
import { highlight } from "sugar-high"

export async function generateStaticParams() {
  const notes = await getNotes()
  return notes.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>): Promise<Metadata> {
  const { slug } = await params
  const notes = await getNotes()

  const noteBySlug = notes.find(note => note.slug === slug)
  if (!noteBySlug) notFound()

  const { title, subtitle } = noteBySlug.metadata
  return {
    title,
    description: subtitle,
    openGraph: {
      title,
      description: subtitle,
      images: [{ url: `/og?title=${encodeURIComponent(title)}` }],
    },
  }
}

function CodeBlock({
  children,
  ...props
}: Readonly<{ children: string; className: string }>) {
  if (props.className?.endsWith("txt")) {
    return <code dangerouslySetInnerHTML={{ __html: children }} {...props} />
  }

  const codeMarkup = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeMarkup }} {...props} />
}

export default async function Note({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params
  const notes = await getNotes()

  const noteBySlug = notes.find(note => note.slug === slug)
  if (!noteBySlug) notFound()

  const { title, subtitle, published } = noteBySlug.metadata
  const publishedDate = new Date(published).toLocaleDateString("en-gb", {
    dateStyle: "full",
  })

  return (
    <main className="flex flex-grow flex-col gap-12">
      <Box>
        <header className="flex items-center justify-between p-2">
          <Link className="text-secondary" id="home-btn" href="/">
            &lsaquo; Home
            <Loader>
              <Shortcut target="q" id="home-btn" />
            </Loader>
          </Link>
          <p className="text-muted">{publishedDate}</p>
        </header>
      </Box>

      <section className="flex flex-col">
        <h1 className="text-4xl font-bold tracking-tighter">{title}</h1>
        <p className="text-muted">{subtitle}</p>
      </section>

      <article className="flex flex-col gap-6">
        <MDXRemote
          source={noteBySlug.markdown}
          components={{ code: CodeBlock }}
        />
      </article>
    </main>
  )
}
