import RelativeDate from "@/components/relative-date"
import Shortcut from "@/components/shortcut"
import { getNotes } from "@/lib"
import Link from "next/link"

export default async function Root() {
  const notes = await getNotes()

  return (
    <main className="flex flex-grow flex-col gap-12">
      <header className="flex items-center justify-between">
        <h1>Brook Nash</h1>
        <p className="text-muted">Software Engineer</p>
      </header>

      <div className="flex flex-col">
        <h2 className="text-2xl font-bold tracking-tighter">Notes</h2>
        <p className="text-muted">Learnings, code snippets and less</p>
      </div>

      <section className="flex flex-col gap-6">
        {notes.map(({ metadata, slug }, index) => {
          const keyIdentifier = (index + 1).toString()

          return (
            <Link
              key={index}
              className="group flex"
              id={keyIdentifier}
              href={`/${slug}`}
              title={metadata.title}
            >
              <p className="flex-1 truncate">
                {metadata.title}
                <Shortcut target={keyIdentifier} id={keyIdentifier} />
              </p>
              <RelativeDate date={new Date(metadata.published)} />
            </Link>
          )
        })}
      </section>
    </main>
  )
}
