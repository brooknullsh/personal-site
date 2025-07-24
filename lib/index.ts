import fs from "fs"
import { serialize } from "next-mdx-remote/serialize"
import path from "path"

export async function getNotes()
{
  const dirPath = path.join(process.cwd(), "notes")
  const fileNames = fs.readdirSync(dirPath)

  const notes = fileNames.map(async (name) =>
  {
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

  return (await Promise.all(notes)).sort(
    (a, b) =>
      new Date(b.metadata.published).getTime() -
      new Date(a.metadata.published).getTime(),
  )
}
