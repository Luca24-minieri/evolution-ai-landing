'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * Grid Materialize — /servicios page entrance
 * Particles converge from random positions into a grid formation,
 * then dissolve to reveal the actual content beneath.
 */

interface Particle {
  x: number
  y: number
  targetX: number
  targetY: number
  size: number
  delay: number
}

function ParticleCanvas({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio, 2)
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    // Create grid of target positions
    const cols = Math.floor(w / 60)
    const rows = Math.floor(h / 60)
    const particles: Particle[] = []

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const targetX = (col + 0.5) * (w / cols)
        const targetY = (row + 0.5) * (h / rows)
        // Diagonal stagger: delay based on distance from top-left
        const diagonalDist = (col / cols + row / rows) / 2
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          targetX,
          targetY,
          size: 2 + Math.random() * 2,
          delay: diagonalDist * 0.4,
        })
      }
    }

    const startTime = performance.now()
    const assembleDuration = 800 // ms to reach grid
    const holdDuration = 200 // ms holding grid form
    const totalDuration = assembleDuration + holdDuration

    let raf: number

    function draw() {
      const elapsed = performance.now() - startTime
      ctx!.clearRect(0, 0, w, h)

      if (elapsed > totalDuration) {
        cancelAnimationFrame(raf)
        onComplete()
        return
      }

      for (const p of particles) {
        const particleElapsed = Math.max(0, elapsed - p.delay * 1000)
        const progress = Math.min(1, particleElapsed / assembleDuration)
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)

        const currentX = p.x + (p.targetX - p.x) * eased
        const currentY = p.y + (p.targetY - p.y) * eased

        // Fade in during assembly, fade out after hold
        let alpha: number
        if (elapsed < assembleDuration) {
          alpha = eased * 0.7
        } else {
          const fadeProgress = (elapsed - assembleDuration) / holdDuration
          alpha = 0.7 * (1 - fadeProgress)
        }

        ctx!.beginPath()
        ctx!.arc(currentX, currentY, p.size * (0.5 + eased * 0.5), 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(0, 229, 255, ${alpha})`
        ctx!.fill()

        // Connection lines to nearby assembled particles
        if (progress > 0.6 && alpha > 0.1) {
          for (const other of particles) {
            if (other === p) continue
            const dx = other.targetX - p.targetX
            const dy = other.targetY - p.targetY
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 80 && dist > 0) {
              const otherElapsed = Math.max(0, elapsed - other.delay * 1000)
              const otherProgress = Math.min(1, otherElapsed / assembleDuration)
              if (otherProgress > 0.6) {
                const lineAlpha = alpha * 0.15 * (1 - dist / 80)
                ctx!.beginPath()
                ctx!.moveTo(currentX, currentY)
                const otherX = other.x + (other.targetX - other.x) * (1 - Math.pow(1 - otherProgress, 3))
                const otherY = other.y + (other.targetY - other.y) * (1 - Math.pow(1 - otherProgress, 3))
                ctx!.lineTo(otherX, otherY)
                ctx!.strokeStyle = `rgba(0, 229, 255, ${lineAlpha})`
                ctx!.lineWidth = 0.5
                ctx!.stroke()
              }
            }
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      aria-hidden="true"
    />
  )
}

export default function GridMaterialize({ children }: { children: ReactNode }) {
  const [showCanvas, setShowCanvas] = useState(true)

  return (
    <>
      {showCanvas && <ParticleCanvas onComplete={() => setShowCanvas(false)} />}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  )
}
