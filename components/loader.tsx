"use client"

import Spinner from "@/components/spinner"
import { useLinkStatus } from "next/link"

export default function Loader({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { pending } = useLinkStatus()
  return pending ? <Spinner /> : children
}
