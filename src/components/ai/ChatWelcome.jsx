import React from 'react'
import { motion } from 'framer-motion'
import ChatSuggestions from './ChatSuggestions'

export default function ChatWelcome({ onSelectSuggestion }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <h1 className="text-3xl font-semibold">
        Welcome to WedaHub
      </h1>

      <p className="mt-2 text-zinc-500">
        Book trusted home service providers in a single conversation.
      </p>

      <div className="mt-10">
        <ChatSuggestions onSelect={onSelectSuggestion} />
      </div>
    </motion.div>
  )
}