import React from 'react'
import { SendHorizonalIcon } from 'lucide-react'

export default function ChatComposer({
  value,
  onChange,
  onSubmit,
  disabled = false,
  compact = false,
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  const canSend = Boolean(value.trim()) && !disabled

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm focus-within:border-zinc-300"
    >
      <label htmlFor="ai-composer" className="sr-only">
        Describe what you need at home
      </label>
      <textarea
        id="ai-composer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={compact ? 1 : 2}
        placeholder="Describe what you need — e.g. “my kitchen tap is leaking”"
        className="min-h-[24px] w-full resize-none bg-transparent px-1 pt-1 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
      />

      <div
        className={`flex items-center justify-end ${compact ? 'mt-2' : 'mt-6'}`}
      >
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send message"
          className={`flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 ${
            canSend
              ? 'bg-zinc-900 hover:bg-zinc-800'
              : 'cursor-not-allowed bg-zinc-300'
          }`}
        >
          <SendHorizonalIcon className="h-4 w-4" />
        </button>
      </div>
    </form>
  )
}
