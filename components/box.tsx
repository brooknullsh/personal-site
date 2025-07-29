export default function Box({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="border-muted/25 grid-background relative border border-dashed bg-transparent">
      <svg
        className="absolute -top-1 -left-1 stroke-black dark:stroke-white"
        width="6"
        height="6"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path d="M6 0V12M0 6H12"></path>
      </svg>
      <svg
        className="absolute -top-1 -right-1 stroke-black dark:stroke-white"
        width="6"
        height="6"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path d="M6 0V12M0 6H12"></path>
      </svg>
      {children}
      <svg
        className="absolute -bottom-1 -left-1 stroke-black dark:stroke-white"
        width="6"
        height="6"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path d="M6 0V12M0 6H12"></path>
      </svg>
      <svg
        className="absolute -right-1 -bottom-1 stroke-black dark:stroke-white"
        width="6"
        height="6"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path d="M6 0V12M0 6H12"></path>
      </svg>
    </div>
  )
}
