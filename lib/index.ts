import fs from "fs"
import { serialize } from "next-mdx-remote/serialize"
import path from "path"

export async function getNotes() {
  const dirPath = path.join(process.cwd(), "notes")
  const fileNames = fs.readdirSync(dirPath)

  const notes = fileNames.map(async (name) => {
    const content = fs.readFileSync(path.join(dirPath, name), "utf-8")
    const regex = /---\s*([\s\S]*?)\s*---/

    const source = await serialize(content, { parseFrontmatter: true })
    const metadata = source.frontmatter as {
      title: string
      subtitle: string
      published: string
    }

    return {
      content,
      markdown: content.replace(regex, "").trim(),
      metadata,
      slug: name.slice(0, name.length - 3),
    }
  })

  return await Promise.all(notes)
}

export function relativeDate(date: Date) {
  const diffInSeconds = Math.round((date.getTime() - Date.now()) / 1000)

  const levels = [
    60, // 1 minute
    3600, // 1 hour
    86400, // 1 day
    86400 * 7, // 1 week
    86400 * 30, // 1 month
    86400 * 365, // 1 year
    Infinity,
  ]

  const keys: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ]

  const closest = levels.findIndex((level) => level > Math.abs(diffInSeconds))
  const level = closest ? levels[closest - 1] : 1

  const rtf = new Intl.RelativeTimeFormat("en")
  return rtf.format(Math.ceil(diffInSeconds / level), keys[closest])
}
