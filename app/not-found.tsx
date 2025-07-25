import Box from "@/components/box"
import Loader from "@/components/loader"
import Shortcut from "@/components/shortcut"
import Link from "next/link"

export default function NotFound()
{
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
                    <p className="text-muted">Brook Nash</p>
                </header>
            </Box>

            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tighter">
                    Nothing here
                </h2>
                <p className="text-muted">
                    The page you are looking for does not exist.
                </p>
            </div>
        </main>
    )
}
