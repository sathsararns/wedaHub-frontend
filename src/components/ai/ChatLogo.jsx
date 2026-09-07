import React from 'react'

export default function ChatLogo({ showWordmark = true }) {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-zinc-900"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 10.5 12 3.5l8.5 7" />
        <path d="M5.5 12v7.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V12" />
        <path d="M12 11.5v4.5" opacity="0.45" />
        <path d="M9.75 13.75h4.5" opacity="0.45" />
      </svg>
      {showWordmark && (
        <span className="text-[15px] font-semibold tracking-tight text-zinc-900">
          WedaHub AI
        </span>
      )}
    </div>
  )
}
