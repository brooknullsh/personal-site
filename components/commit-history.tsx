const URL = "https://api.github.com/repos/brooknullsh/personal-site/commits"

type CommitResponse = { commit: { message: string } }

function targetRegex(target: string) {
  return new RegExp(`(?:feat|refactor|fix|chore|revert)\\(${target}\\): *.`)
}

async function fetchCommits(target: string) {
  const response = await fetch(URL)
  const json: CommitResponse[] = await response.json()

  return json
    .map(({ commit }) => commit.message || "unknown commit")
    .filter(message => targetRegex(target).test(message))
}

export default async function CommitHistory({
  target,
}: Readonly<{ target: string }>) {
  const commits = await fetchCommits(target)

  return (
    <ul className="list-none">
      {commits.length ? (
        commits.map(message => (
          <li key={message} className="relative flex items-center gap-4">
            <span className="absolute size-2 animate-ping rounded-full bg-emerald-400"></span>
            <span className="relative size-2 rounded-full bg-emerald-400"></span>
            {message}
          </li>
        ))
      ) : (
        <li className="relative flex items-center gap-4">
          <span className="absolute size-2 animate-ping rounded-full bg-rose-400"></span>
          <span className="relative size-2 rounded-full bg-rose-400"></span>
          No commits found.
        </li>
      )}
    </ul>
  )
}
