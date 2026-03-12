'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Handshake, Trophy, RefreshCcw } from 'lucide-react'
import Button from '@/components/ui/Button'

const VALUES = [
  { icon: Lightbulb, name: 'Innovación' },
  { icon: Handshake, name: 'Compromiso' },
  { icon: Trophy, name: 'Excelencia' },
  { icon: RefreshCcw, name: 'Adaptabilidad' },
]

export default function AboutPreview() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-10 sm:mb-14 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary-500/30 bg-primary-500/5 px-4 py-1.5 font-body text-sm font-medium tracking-wide text-primary-400 uppercase">
            Nosotros
          </span>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Somos Evolution.AI
          </h2>
        </motion.div>

        {/* Brief mission */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto max-w-2xl text-center text-base sm:text-lg text-muted-light leading-relaxed"
        >
          Una agencia especializada en inteligencia artificial y desarrollo de software
          que transforma la manera en que las empresas operan, crecen y compiten.
        </motion.p>

        {/* Values row */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {VALUES.map((value, i) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  delay: 0.2 + i * 0.1,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-white/5 bg-surface p-5 sm:p-6 text-center"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <span className="font-heading text-sm sm:text-base font-semibold text-foreground">
                  {value.name}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <Button variant="secondary" size="md" href="/nosotros">
            Conoce más sobre nosotros
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
