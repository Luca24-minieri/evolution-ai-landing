'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * Typewriter Stack — /faq page entrance
 * Horizontal lines "type" across the screen in a staggered cascade,
 * then dissolve to reveal the content.
 */

const LINE_COUNT = 8

function TypewriterLine({ index }: { index: number }) {
  const yOffset = 12 + (index * 76) / LINE_COUNT
  const delayBase = index * 0.06
  const lineWidth = 60 + (index * 7) % 35

  return (
    <motion.div
      className="absolute left-0 h-[2px]"
      style={{ top: `${yOffset}%` }}
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: `${lineWidth}%`, opacity: [0, 0.6, 0.6, 0] }}
      transition={{
        duration: 0.8,
        delay: delayBase,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.2) 20%, rgba(0,229,255,0.3) 80%, rgba(0,229,255,0.6))',
        }}
      />
      {/* Cursor dot at the end */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-3.5 rounded-sm bg-primary-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 1, 0] }}
        transition={{
          duration: 0.6,
          delay: delayBase,
          ease: 'linear',
        }}
      />
    </motion.div>
  )
}

export default function TypewriterStack({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {/* Typing lines overlay */}
      <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
        {Array.from({ length: LINE_COUNT }).map((_, i) => (
          <TypewriterLine key={i} index={i} />
        ))}
      </div>

      {/* Content with slide-up reveal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
