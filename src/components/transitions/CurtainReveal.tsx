'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * Curtain Reveal — /nosotros page entrance
 * Two panels slide away from center (left goes left, right goes right),
 * revealing the content beneath with a glow flash at the seam.
 */

export default function CurtainReveal({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {/* Left curtain */}
      <motion.div
        className="fixed inset-y-0 left-0 z-50 w-1/2 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #0A0A0F 60%, #0d0d14)' }}
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ delay: 0.1, duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* Right curtain */}
      <motion.div
        className="fixed inset-y-0 right-0 z-50 w-1/2 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, #0A0A0F 60%, #0d0d14)' }}
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ delay: 0.1, duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* Center glow flash at the seam */}
      <motion.div
        className="fixed inset-y-0 left-1/2 z-50 -translate-x-1/2 pointer-events-none"
        initial={{ width: 2, opacity: 0 }}
        animate={{ width: 300, opacity: [0, 1, 0] }}
        transition={{
          duration: 0.6,
          delay: 0.15,
          ease: 'easeOut',
        }}
      >
        <div className="h-full w-full bg-gradient-to-r from-transparent via-primary-400/50 to-transparent" />
      </motion.div>

      {/* Content scales up from slightly small */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
