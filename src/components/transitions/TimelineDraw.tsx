'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * Timeline Draw — /proceso page entrance
 * A vertical line draws itself from top to bottom,
 * then fades to a subtle background behind the content.
 */

export default function TimelineDraw({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<'drawing' | 'done'>('drawing')

  useEffect(() => {
    // After the draw + fade animation finishes, mark as done
    const timer = setTimeout(() => setPhase('done'), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative isolate">
      {/* Animated draw line */}
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none h-screen"
        style={{ zIndex: phase === 'drawing' ? 40 : -1 }}
        initial={{ height: 0, opacity: 1 }}
        animate={{ height: '100vh', opacity: phase === 'done' ? 0.12 : 1 }}
        transition={{
          height: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.5 },
        }}
      >
        <div className="w-[2px] h-full bg-gradient-to-b from-primary-500 via-primary-400 to-transparent" />

        {/* Glowing tip — only during draw phase */}
        {phase === 'drawing' && (
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 3 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="w-3 h-3 rounded-full bg-primary-400 shadow-[0_0_20px_rgba(0,229,255,0.8)]" />
          </motion.div>
        )}
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
