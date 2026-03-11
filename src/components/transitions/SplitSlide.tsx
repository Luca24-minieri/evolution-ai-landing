'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * Split Slide — /contacto page entrance
 * Content converges from both sides: left panel slides in from left,
 * right panel from right. A light flash appears where they meet.
 */

export default function SplitSlide({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {/* Left sliding panel hint */}
      <motion.div
        className="fixed inset-y-0 left-0 z-40 w-1/2 pointer-events-none"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(270deg, rgba(0,229,255,0.05) 0%, transparent 100%)',
          }}
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* Right sliding panel hint */}
      <motion.div
        className="fixed inset-y-0 right-0 z-40 w-1/2 pointer-events-none"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, rgba(0,229,255,0.05) 0%, transparent 100%)',
          }}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* Center convergence flash */}
      <motion.div
        className="fixed top-0 bottom-0 left-1/2 z-40 -translate-x-1/2 pointer-events-none"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 200, opacity: [0, 1, 0] }}
        transition={{
          delay: 0.35,
          duration: 0.5,
          ease: 'easeOut',
        }}
      >
        <div className="h-full w-full bg-gradient-to-b from-transparent via-primary-400/30 to-transparent" />
      </motion.div>

      {/* Content: left side slides from left, right from right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
