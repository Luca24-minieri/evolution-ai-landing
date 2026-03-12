'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * Curtain Reveal — /nosotros page entrance
 * Two panels slide away from center, revealing content beneath.
 * Panels are removed from DOM after animation completes.
 */

export default function CurtainReveal({ children }: { children: ReactNode }) {
  const [showCurtains, setShowCurtains] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowCurtains(false), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      {showCurtains && (
        <>
          <motion.div
            className="fixed inset-y-0 left-0 z-50 w-1/2 pointer-events-none will-change-transform"
            style={{ background: '#0A0A0F' }}
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-1/2 pointer-events-none will-change-transform"
            style={{ background: '#0A0A0F' }}
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          />
        </>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
