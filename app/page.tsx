import Box from "@/components/box"
import Loader from "@/components/loader"
import RelativeDate from "@/components/relative-date"
import Shortcut from "@/components/shortcut"
import { getNotes } from "@/lib"
import Link from "next/link"

export default async function Root() {
  const notes = await getNotes()

  return (
    <main className="flex flex-grow flex-col gap-12">
      <Box>
        <header className="flex items-center justify-between p-2">
          <h1>Brook Nash</h1>
          <p className="text-muted">Software Engineer</p>
        </header>
      </Box>

      <p className="text-center">
        I'm a Software Engineer currently working full-time on{" "}
        <strong>very legacy architecture</strong> in Wales, United Kingdom.
      </p>

      <Box>
        <div className="p-2">
          <h2 className="text-4xl font-bold tracking-tighter">Notes</h2>
          <p className="text-muted">Learnings, code snippets and less</p>
        </div>
      </Box>

      <section className="flex flex-col gap-6">
        {notes.map(({ metadata, slug }, index) => {
          const keyIdentifier = (index + 1).toString()

          return (
            <Link
              key={index}
              className="group flex items-center gap-2"
              id={keyIdentifier}
              href={`/${slug}`}
              title={metadata.title}
            >
              <p className="flex-1 truncate">
                {metadata.title}
                <Shortcut target={keyIdentifier} id={keyIdentifier} />
              </p>
              <Loader>
                <RelativeDate date={new Date(metadata.published)} />
              </Loader>
            </Link>
          )
        })}
      </section>
    </main>
  )
}
