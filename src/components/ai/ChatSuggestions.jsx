import React from 'react'
import { motion } from 'framer-motion'
import { SparklesIcon } from 'lucide-react'
import { CHAT_SUGGESTIONS } from '../../constants/chatSuggestions'

export default function ChatSuggestions({ onSelect }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {CHAT_SUGGESTIONS.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: 0.1 + i * 0.07,
            ease: 'easeOut',
          }}
        >
          <button
            type="button"
            onClick={() => onSelect(s.prompt)}
            className="h-full w-full rounded-xl border border-zinc-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900">
              <SparklesIcon className="h-3.5 w-3.5 text-white" />
            </span>

            <span className="mt-4 block text-[13px] font-semibold text-zinc-900">
              {s.title}
            </span>

            <span className="mt-1.5 block text-[11.5px] leading-relaxed text-zinc-500">
              {s.prompt}
            </span>
          </button>
        </motion.li>
      ))}
    </ul>
  )
}