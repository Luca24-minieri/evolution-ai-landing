'use client'

import { motion } from 'framer-motion'
import { Search, Map, Rocket, TrendingUp } from 'lucide-react'
import Button from '@/components/ui/Button'

const steps = [
  { icon: Search, title: 'Diagnóstico', description: 'Analizamos tu negocio y detectamos oportunidades' },
  { icon: Map, title: 'Estrategia', description: 'Diseñamos la solución ideal con alcance claro' },
  { icon: Rocket, title: 'Desarrollo', description: 'Construimos con entregas iterativas y feedback' },
  { icon: TrendingUp, title: 'Evolución', description: 'Optimizamos y escalamos junto a tu empresa' },
]

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export default function ProcessPreview() {
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
            Proceso
          </span>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Tu evolución en 4 pasos
          </h2>
        </motion.div>

        {/* Steps — horizontal on desktop, 2x2 on tablet, vertical on mobile */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon
            const isLast = i === steps.length - 1
            return (
              <motion.div
                key={step.title}
                custom={i}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="relative"
              >
                {/* Connector line — desktop only, between cards */}
                {!isLast && (
                  <div className="absolute top-7 left-[calc(50%+28px)] right-0 hidden h-px bg-gradient-to-r from-primary-500/40 to-primary-500/10 lg:block" />
                )}

                <div className="flex flex-col items-center text-center">
                  {/* Step number + icon */}
                  <div className="relative mb-4">
                    <span className="absolute -top-2 -right-2 font-heading text-xs font-bold text-primary-500/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500/10 border border-primary-500/20 text-primary-400 transition-colors duration-300 hover:bg-primary-500/20">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="mb-1 font-heading text-lg font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="max-w-[200px] font-body text-sm text-muted-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
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
          <Button variant="secondary" size="md" href="/proceso">
            Conoce nuestro proceso
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
