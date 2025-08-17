import fs from "fs"
import { serialize } from "next-mdx-remote/serialize"
import path from "path"

/**
 * @description Reads the Markdown notes from the FS and returns the
 * serialised content & some metadata.
 * @returns An array of (desc. by publish date) note objects.
 */
export async function getNotes() {
  const dirPath = path.join(process.cwd(), "notes")
  const fileNames = fs.readdirSync(dirPath)

  const notes = fileNames.map(async name => {
    const content = fs.readFileSync(path.join(dirPath, name), "utf-8")
    const source = await serialize(content, { parseFrontmatter: true })

    return {
      markdown: content.replace(/---\s*([\s\S]*?)\s*---/, "").trim(),
      slug: name.slice(0, name.length - 3),
      metadata: source.frontmatter as {
        title: string
        subtitle: string
        published: string
      },
    }
  })

  return (await Promise.all(notes)).sort(
    (a, b) =>
      new Date(b.metadata.published).getTime() -
      new Date(a.metadata.published).getTime(),
  )
}
