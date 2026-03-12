'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * Curtain Reveal — /nosotros page entrance
 * Desktop: two panels slide away revealing content.
 * Mobile: simple fade-in (curtain animation is too heavy for mobile GPUs).
 */

export default function CurtainReveal({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(true)
  const [showCurtains, setShowCurtains] = useState(true)

  useEffect(() => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)

    if (!mobile) {
      const timer = setTimeout(() => setShowCurtains(false), 900)
      return () => clearTimeout(timer)
    } else {
      setShowCurtains(false)
    }
  }, [])

  // Mobile: simple fast fade
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    )
  }

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
