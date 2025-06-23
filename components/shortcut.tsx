"use client"

import { useEffect } from "react"

export default function Shortcut({
  target,
  id,
}: Readonly<{ target: string; id: string }>) {
  useEffect(() => {
    const handler = (event: globalThis.KeyboardEvent) => {
      if (event.key === target) {
        document.getElementById(id)?.click()
      }
    }

    document.addEventListener("keyup", handler)
    return () => document.removeEventListener("keyup", handler)
  }, [])

  return (
    <span className="text-muted hidden text-xs md:inline">
      &nbsp; &lt;{target}&gt; &nbsp;
    </span>
  )
}
