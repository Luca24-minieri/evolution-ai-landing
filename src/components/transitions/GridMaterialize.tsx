'use client'

import { useEffect, useRef, useState, useCallback, type ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * Grid Materialize — /servicios page entrance
 * Particles converge from random positions into a grid formation,
 * then fade to a subtle background that persists behind the content.
 */

interface Particle {
  x: number
  y: number
  targetX: number
  targetY: number
  size: number
  delay: number
}

function ParticleCanvas({ onAssembled }: { onAssembled: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const calledRef = useRef(false)

  const handleAssembled = useCallback(() => {
    if (!calledRef.current) {
      calledRef.current = true
      onAssembled()
    }
  }, [onAssembled])

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
    const assembleDuration = 800
    const holdDuration = 400
    const fadeToBgDuration = 600
    const totalAnimDuration = assembleDuration + holdDuration + fadeToBgDuration

    // Background settled opacity
    const bgAlpha = 0.12

    let raf: number
    let notified = false

    function draw() {
      const elapsed = performance.now() - startTime
      ctx!.clearRect(0, 0, w, h)

      // Notify content can appear once grid is assembled
      if (!notified && elapsed >= assembleDuration) {
        notified = true
        handleAssembled()
      }

      for (const p of particles) {
        const particleElapsed = Math.max(0, elapsed - p.delay * 1000)
        const progress = Math.min(1, particleElapsed / assembleDuration)
        const eased = 1 - Math.pow(1 - progress, 3)

        const currentX = p.x + (p.targetX - p.x) * eased
        const currentY = p.y + (p.targetY - p.y) * eased

        let alpha: number
        if (elapsed < assembleDuration) {
          // Phase 1: assembling — fade in
          alpha = eased * 0.7
        } else if (elapsed < assembleDuration + holdDuration) {
          // Phase 2: hold at full
          alpha = 0.7
        } else if (elapsed < totalAnimDuration) {
          // Phase 3: fade down to background level
          const fadeProgress = (elapsed - assembleDuration - holdDuration) / fadeToBgDuration
          const easedFade = fadeProgress * fadeProgress // ease-in for smooth settle
          alpha = 0.7 - (0.7 - bgAlpha) * easedFade
        } else {
          // Phase 4: settled as background
          alpha = bgAlpha
        }

        const dotSize = p.size * (0.5 + eased * 0.5)

        ctx!.beginPath()
        ctx!.arc(currentX, currentY, dotSize, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(0, 229, 255, ${alpha})`
        ctx!.fill()

        // Connection lines during assembly
        if (progress > 0.6 && elapsed < assembleDuration + holdDuration && alpha > 0.1) {
          for (const other of particles) {
            if (other === p) continue
            const dx = other.targetX - p.targetX
            const dy = other.targetY - p.targetY
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 80 && dist > 0) {
              const otherElapsed = Math.max(0, elapsed - other.delay * 1000)
              const otherProgress = Math.min(1, otherElapsed / assembleDuration)
              if (otherProgress > 0.6) {
                // Fade lines out during hold and beyond
                let lineFade = 1
                if (elapsed > assembleDuration) {
                  lineFade = Math.max(0, 1 - (elapsed - assembleDuration) / holdDuration)
                }
                const lineAlpha = alpha * 0.15 * (1 - dist / 80) * lineFade
                if (lineAlpha > 0.005) {
                  const otherEased = 1 - Math.pow(1 - otherProgress, 3)
                  const otherX = other.x + (other.targetX - other.x) * otherEased
                  const otherY = other.y + (other.targetY - other.y) * otherEased
                  ctx!.beginPath()
                  ctx!.moveTo(currentX, currentY)
                  ctx!.lineTo(otherX, otherY)
                  ctx!.strokeStyle = `rgba(0, 229, 255, ${lineAlpha})`
                  ctx!.lineWidth = 0.5
                  ctx!.stroke()
                }
              }
            }
          }
        }
      }

      // After settling, draw static frame less frequently
      if (elapsed < totalAnimDuration) {
        raf = requestAnimationFrame(draw)
      } else {
        // Draw one last static frame (already drawn above), then stop animation loop
        // The canvas stays in the DOM with the last painted frame
      }
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [handleAssembled])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}

export default function GridMaterialize({ children }: { children: ReactNode }) {
  const [assembled, setAssembled] = useState(false)

  return (
    <>
      <ParticleCanvas onAssembled={() => setAssembled(true)} />
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={assembled ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  )
}
