'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * Curtain Reveal — /nosotros page entrance
 * Two panels slide away from center, revealing content beneath.
 * Panels are removed from DOM after animation to free resources.
 */

export default function CurtainReveal({ children }: { children: ReactNode }) {
  const [showCurtains, setShowCurtains] = useState(true)

  useEffect(() => {
    // Remove curtains from DOM after animation completes
    const timer = setTimeout(() => setShowCurtains(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      {showCurtains && (
        <>
          {/* Left curtain */}
          <motion.div
            className="fixed inset-y-0 left-0 z-50 w-1/2 pointer-events-none will-change-transform"
            style={{ background: 'linear-gradient(90deg, #0A0A0F 60%, #0d0d14)' }}
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          />

          {/* Right curtain */}
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-1/2 pointer-events-none will-change-transform"
            style={{ background: 'linear-gradient(270deg, #0A0A0F 60%, #0d0d14)' }}
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          />

          {/* Center glow flash */}
          <motion.div
            className="fixed inset-y-0 left-1/2 z-50 -translate-x-1/2 pointer-events-none will-change-[opacity]"
            style={{ width: 120 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-primary-400/40 to-transparent" />
          </motion.div>
        </>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
