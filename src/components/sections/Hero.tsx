'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

/* ═══════════════════════════════════════════════════════
   Neural Network Canvas Background
   ═══════════════════════════════════════════════════════ */

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulsePhase: number
  pulseSpeed: number
}

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef<number>(0)
  const isMobileRef = useRef(false)

  const initNodes = useCallback((width: number, height: number) => {
    isMobileRef.current = width < 768
    const count = isMobileRef.current ? 40 : 80
    const nodes: Node[] = []

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      })
    }
    nodesRef.current = nodes
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2)
      w = canvas!.clientWidth
      h = canvas!.clientHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.scale(dpr, dpr)
      if (nodesRef.current.length === 0) initNodes(w, h)
    }

    resize()
    window.addEventListener('resize', resize)

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    function onMouseLeave() {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    const connectionDist = isMobileRef.current ? 120 : 160
    const mouseDist = 200

    function draw() {
      ctx!.clearRect(0, 0, w, h)
      const nodes = nodesRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const time = performance.now() * 0.001

      // Update positions
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        node.pulsePhase += node.pulseSpeed

        if (node.x < 0 || node.x > w) node.vx *= -1
        if (node.y < 0 || node.y > h) node.vy *= -1

        node.x = Math.max(0, Math.min(w, node.x))
        node.y = Math.max(0, Math.min(h, node.y))
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.15

            // Brighten lines near mouse
            const midX = (nodes[i].x + nodes[j].x) / 2
            const midY = (nodes[i].y + nodes[j].y) / 2
            const mouseMidDist = Math.sqrt(
              (midX - mx) ** 2 + (midY - my) ** 2
            )
            const mouseBoost =
              mouseMidDist < mouseDist
                ? (1 - mouseMidDist / mouseDist) * 0.4
                : 0

            ctx!.beginPath()
            ctx!.moveTo(nodes[i].x, nodes[i].y)
            ctx!.lineTo(nodes[j].x, nodes[j].y)
            ctx!.strokeStyle = `rgba(0, 229, 255, ${alpha + mouseBoost})`
            ctx!.lineWidth = 0.6
            ctx!.stroke()
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7
        const mouseD = Math.sqrt(
          (node.x - mx) ** 2 + (node.y - my) ** 2
        )
        const mouseInfluence =
          mouseD < mouseDist ? (1 - mouseD / mouseDist) : 0

        const r = node.radius * (1 + mouseInfluence * 1.5)
        const baseAlpha = 0.4 + pulse * 0.4 + mouseInfluence * 0.5

        // Glow
        if (mouseInfluence > 0.1) {
          const grad = ctx!.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, r * 8
          )
          grad.addColorStop(0, `rgba(0, 229, 255, ${mouseInfluence * 0.15})`)
          grad.addColorStop(1, 'rgba(0, 229, 255, 0)')
          ctx!.beginPath()
          ctx!.arc(node.x, node.y, r * 8, 0, Math.PI * 2)
          ctx!.fillStyle = grad
          ctx!.fill()
        }

        // Core dot
        ctx!.beginPath()
        ctx!.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(0, 229, 255, ${baseAlpha})`
        ctx!.fill()
      }

      // Subtle pulsing gradient orb (atmosphere)
      const orbPulse = Math.sin(time * 0.5) * 0.03 + 0.07
      const grad = ctx!.createRadialGradient(
        w * 0.3, h * 0.4, 0,
        w * 0.3, h * 0.4, w * 0.5
      )
      grad.addColorStop(0, `rgba(0, 229, 255, ${orbPulse})`)
      grad.addColorStop(1, 'rgba(0, 229, 255, 0)')
      ctx!.fillStyle = grad
      ctx!.fillRect(0, 0, w, h)

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [initNodes])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}

/* ═══════════════════════════════════════════════════════
   Headline with staggered word reveal
   ═══════════════════════════════════════════════════════ */

const headlineWords = ['No', 'solo', 'digitalizamos.']
const accentWords = ['Evolucionamos.']

const smoothEase = [0.25, 0.1, 0.25, 1] as const

const wordVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 1.0 + i * 0.12,
      duration: 0.6,
      ease: smoothEase,
    },
  }),
}

const accentWordVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)', scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      delay: 1.0 + (headlineWords.length + i) * 0.12 + 0.15,
      duration: 0.8,
      ease: smoothEase,
    },
  }),
}

/* ═══════════════════════════════════════════════════════
   Hero Section
   ═══════════════════════════════════════════════════════ */

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden"
    >
      {/* Neural network background */}
      <NeuralCanvas />

      {/* Radial gradient overlay for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, transparent 0%, rgba(10,10,15,0.4) 60%, rgba(10,10,15,0.95) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Bottom fade to background */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-40 w-full"
        style={{
          background:
            'linear-gradient(to top, var(--color-background) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-24 pb-16 text-center sm:px-6 sm:pb-20 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: smoothEase }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-500/25 bg-primary-500/5 px-5 py-2 glow-primary-sm"
        >
          <span aria-hidden="true">🚀</span>
          <span className="font-body text-sm font-medium tracking-wide text-primary-300">
            Agencia de IA &amp; Desarrollo
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-heading text-[2rem] font-extrabold leading-[1.1] tracking-tight xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="mr-[0.25em] inline-block text-foreground"
            >
              {word}
            </motion.span>
          ))}
          <br className="hidden sm:block" />
          {accentWords.map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={accentWordVariants}
              initial="hidden"
              animate="visible"
              className="inline-block gradient-text text-glow"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.8,
            duration: 0.7,
            ease: smoothEase,
          }}
          className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-muted-light sm:mt-8 sm:text-lg md:text-xl"
        >
          Automatización, desarrollo de software e inteligencia artificial
          para empresas que quieren liderar el futuro.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 2.2,
            duration: 0.6,
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
        >
          <Button variant="primary" size="lg" href="/contacto" className="w-full sm:w-auto">
            Comienza tu evolución
          </Button>
          <Button variant="secondary" size="lg" href="/servicios" className="w-full sm:w-auto">
            Ver servicios
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="mt-10 flex flex-col items-center gap-2 sm:mt-16"
        >
          <span className="font-body text-xs tracking-widest text-muted uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="h-8 w-5 rounded-full border border-white/15 p-1"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-primary-400 mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
