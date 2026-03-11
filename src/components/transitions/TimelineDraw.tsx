'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * Timeline Draw — /proceso page entrance
 * A vertical line draws itself from top to bottom,
 * then content fades in sequentially from behind the line.
 */

export default function TimelineDraw({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {/* Animated draw line overlay */}
      <motion.div
        className="fixed left-1/2 top-0 z-40 -translate-x-1/2 pointer-events-none"
        initial={{ height: 0 }}
        animate={{ height: '100vh' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-[2px] h-full bg-gradient-to-b from-primary-500 via-primary-400 to-transparent" />

        {/* Glowing tip */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 3 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="w-3 h-3 rounded-full bg-primary-400 shadow-[0_0_20px_rgba(0,229,255,0.8)]" />
        </motion.div>
      </motion.div>

      {/* Fade out the draw line */}
      <motion.div
        className="fixed left-1/2 top-0 z-40 -translate-x-1/2 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <div className="w-[2px] h-screen bg-gradient-to-b from-primary-500 via-primary-400 to-transparent" />
      </motion.div>

      {/* Page content with staggered reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
