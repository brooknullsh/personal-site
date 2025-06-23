import "./root.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://brooknullsh.com"),
  title: { template: "%s - brooknullsh", default: "Home - brooknullsh" },
  description: "A place on the internet I can use for my own.",
  openGraph: {
    title: "brooknullsh",
    description: "A place on the internet I can use for my own.",
    images: [{ url: "/og" }],
  },
}

function Footer() {
  return (
    <footer className="flex justify-between gap-4 *:flex *:items-center *:gap-2">
      <Link href="https://github.com/brooknullsh">
        <svg
          className="size-4"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2
                6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3
                1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403
                5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22
                1.23-.15 1.85v4"
          ></path>
          <path d="M9 18c-4.51 2-5-2-7-2"></path>
        </svg>
        GitHub
      </Link>

      <div className="relative flex-1">
        <div className="animate-end-to-end bg-secondary absolute size-[5px] rounded-full"></div>
      </div>

      <Link href="https://x.com/brooknullsh">
        <svg
          className="size-4"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
        </svg>
        Twitter
      </Link>
    </footer>
  )
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} container flex min-h-[100svh] flex-col gap-12 py-6 sm:py-12`}
      >
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
