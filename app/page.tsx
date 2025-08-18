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
        Currently working on <strong>very legacy architecture</strong> in Wales,
        United Kingdom.
      </p>

      <div className="flex justify-center">
        <svg
          width="400"
          height="200"
          viewBox="190 0 400 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="stroke-foreground"
            d="M 343 160 L 238 40 L 538 40 L 538 40 L 493 100"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="text-muted text-center text-sm">
        Signature trace from{" "}
        <a className="text-secondary" href="https://signature.cnrad.dev">
          cnrad.dev
        </a>
        .
      </p>

      <Box>
        <div className="p-2">
          <h2 className="text-4xl font-bold tracking-tighter">Notes</h2>
          <p className="text-muted">Learnings, code snippets and less</p>
        </div>
      </Box>

      <section className="flex flex-col gap-2">
        {notes.map(({ metadata, slug }, index) => {
          const keyIdentifier = (index + 1).toString()

          return (
            <Link
              key={index}
              className="hover:border-corners flex items-center gap-2 p-2"
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
