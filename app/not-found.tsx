import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex flex-grow flex-col gap-12">
      <header className="flex items-center justify-between">
        <h1>Brook Nash</h1>
        <p className="text-muted">Software Engineer</p>
      </header>

      <div className="flex flex-col">
        <h2 className="text-2xl font-bold tracking-tighter">Nothing here</h2>
        <p className="text-muted">
          The page you are looking for does not exist
        </p>
      </div>

      <Link className="text-secondary" href="/">
        Return home
      </Link>
    </main>
  )
}
