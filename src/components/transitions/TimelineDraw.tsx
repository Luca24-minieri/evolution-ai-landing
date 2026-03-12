'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Timeline Draw — /proceso page entrance
 * A vertical line draws itself from top to bottom,
 * then smoothly fades to a subtle background behind the content.
 */

export default function TimelineDraw({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<'drawing' | 'fading' | 'done'>('drawing')

  useEffect(() => {
    // Line finishes drawing at ~0.8s, start fading
    const fadeTimer = setTimeout(() => setPhase('fading'), 900)
    // Fade complete, send to background
    const doneTimer = setTimeout(() => setPhase('done'), 2200)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  return (
    <div className="relative isolate">
      {/* Animated draw line */}
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
        style={{ zIndex: phase === 'done' ? -1 : 40 }}
        initial={{ height: 0, opacity: 1 }}
        animate={{
          height: '100vh',
          opacity: phase === 'done' ? 0.12 : phase === 'fading' ? 0.3 : 1,
        }}
        transition={{
          height: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 1.2, ease: 'easeInOut' },
        }}
      >
        <div className="w-[2px] h-full bg-gradient-to-b from-primary-500 via-primary-400 to-transparent" />

        {/* Glowing tip */}
        <AnimatePresence>
          {phase === 'drawing' && (
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 3 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="w-3 h-3 rounded-full bg-primary-400 shadow-[0_0_20px_rgba(0,229,255,0.8)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Page content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
