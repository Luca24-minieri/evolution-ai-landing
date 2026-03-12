'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowDown } from 'lucide-react'
import Button from '@/components/ui/Button'

/* ═══════════════════════════════════════════════════════
   Aurora Borealis Canvas Background
   ═══════════════════════════════════════════════════════ */

function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0

    function resize() {
      w = canvas!.clientWidth
      h = canvas!.clientHeight
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    // Aurora bands configuration (reduced opacity ~25% for full-bleed)
    const bands = [
      { yOffset: 0.2, amplitude: 0.12, frequency: 0.8, speed: 0.3, color: [0, 229, 255], opacity: 0.05 },
      { yOffset: 0.35, amplitude: 0.15, frequency: 1.2, speed: 0.4, color: [0, 184, 204], opacity: 0.035 },
      { yOffset: 0.5, amplitude: 0.1, frequency: 0.6, speed: 0.25, color: [77, 231, 255], opacity: 0.045 },
      { yOffset: 0.65, amplitude: 0.18, frequency: 1.0, speed: 0.35, color: [0, 229, 255], opacity: 0.03 },
    ]

    function draw() {
      ctx!.clearRect(0, 0, w, h)
      const t = performance.now() * 0.001

      for (const band of bands) {
        const bandY = h * band.yOffset
        const grad = ctx!.createLinearGradient(0, bandY - h * 0.2, 0, bandY + h * 0.3)
        const [r, g, b] = band.color
        const pulse = (Math.sin(t * band.speed * 0.5) * 0.5 + 0.5) * 0.4 + 0.6

        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
        grad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${band.opacity * pulse})`)
        grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${band.opacity * pulse * 1.5})`)
        grad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${band.opacity * pulse * 0.8})`)
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

        ctx!.beginPath()
        ctx!.moveTo(-10, h)

        // Draw wavy aurora shape
        for (let x = -10; x <= w + 10; x += 4) {
          const wave1 = Math.sin(x * 0.003 * band.frequency + t * band.speed) * h * band.amplitude
          const wave2 = Math.sin(x * 0.005 * band.frequency + t * band.speed * 1.3) * h * band.amplitude * 0.5
          const wave3 = Math.sin(x * 0.001 + t * 0.2) * h * 0.05
          const y = bandY + wave1 + wave2 + wave3
          ctx!.lineTo(x, y)
        }

        ctx!.lineTo(w + 10, h)
        ctx!.closePath()
        ctx!.fillStyle = grad
        ctx!.fill()
      }

      // Central glow orb (reduced intensity)
      const orbPulse = Math.sin(t * 0.4) * 0.015 + 0.045
      const orbGrad = ctx!.createRadialGradient(
        w * 0.5, h * 0.4, 0,
        w * 0.5, h * 0.4, w * 0.45
      )
      orbGrad.addColorStop(0, `rgba(0, 229, 255, ${orbPulse})`)
      orbGrad.addColorStop(0.5, `rgba(0, 229, 255, ${orbPulse * 0.4})`)
      orbGrad.addColorStop(1, 'rgba(0, 229, 255, 0)')
      ctx!.fillStyle = orbGrad
      ctx!.fillRect(0, 0, w, h)

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}

/* ═══════════════════════════════════════════════════════
   CTA Banner Section
   ═══════════════════════════════════════════════════════ */

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-16 md:py-28">
      {/* Aurora Borealis background */}
      <AuroraCanvas />

      {/* Semi-transparent overlay for text readability */}
      <div className="absolute inset-0 bg-[#0a0a0f]/30" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="shimmer-text font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            ¿Listo para{' '}
            <span className="gradient-text">evolucionar</span>
            {' '}tu negocio?
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="mx-auto mt-5 max-w-xl font-body text-lg text-muted-light md:text-xl"
        >
          Conversemos sobre cómo la IA puede transformar tu empresa
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            href="/contacto"
          >
            <ArrowDown size={18} />
            Agenda una reunión
          </Button>
          <Button
            variant="whatsapp"
            size="lg"
            href="https://wa.me/56975231022"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} />
            Escríbenos por WhatsApp
          </Button>
        </motion.div>

        {/* Trust micro-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 font-body text-xs text-muted"
        >
          Sin compromiso · Respuesta en menos de 24hs
        </motion.p>
      </div>

      {/* Shimmer effect on title */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,1) 0%,
            rgba(255,255,255,1) 40%,
            rgba(0,229,255,0.8) 50%,
            rgba(255,255,255,1) 60%,
            rgba(255,255,255,1) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .shimmer-text {
            animation: none;
            background: none;
            -webkit-text-fill-color: unset;
            color: white;
          }
        }
      `}</style>
    </section>
  )
}
