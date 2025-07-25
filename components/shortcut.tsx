"use client"

import { useEffect } from "react"

export default function Shortcut({
    target,
    id,
}: Readonly<{ target: string; id: string }>)
{
    function handler(event: KeyboardEvent)
    {
        if (event.key === target)
        {
            document.getElementById(id)?.click()
        }
    }

    useEffect(() =>
    {
        document.addEventListener("keyup", handler)
        return () => document.removeEventListener("keyup", handler)
    }, [])

    return (
        <span className="text-muted hidden text-xs md:inline">
            &nbsp; &lt;{target}&gt; &nbsp;
        </span>
    )
}
