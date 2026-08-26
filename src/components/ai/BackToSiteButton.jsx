import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpLeftIcon } from 'lucide-react'

export default function BackToSiteButton() {
  return (
    <Link
      to="/"
      className="flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-[13px] font-medium text-zinc-900 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
    >
      <ArrowUpLeftIcon className="h-4 w-4 text-zinc-500" />
      Back to website
    </Link>
  )
}
