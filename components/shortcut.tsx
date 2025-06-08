"use client"

import { useEffect } from "react"

export default function Shortcut({
  target,
  id,
}: Readonly<{ target: string; id: string }>) {
  function handler(event: globalThis.KeyboardEvent) {
    if (event.key === target) {
      document.getElementById(id)?.click()
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", handler)
    return () => document.removeEventListener("keyup", handler)
  }, [])

  return <span className="text-muted hidden md:inline"> &lt;{target}&gt; </span>
}
