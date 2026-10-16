import { motion } from 'framer-motion'

export default function ChatWelcome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <h1 className="text-2xl font-semibold sm:text-3xl">
        Welcome to WedaHub
      </h1>

      <p className="mt-2 text-zinc-500">
        Book trusted home service providers in a single conversation.
      </p>
    </motion.div>
  )
}
