'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionTitle from '@/components/ui/SectionTitle'
import GlowCard from '@/components/ui/GlowCard'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { cn } from '@/lib/utils'

interface StatBlock {
  value: number | null
  prefix?: string
  suffix?: string
  symbol?: string
  label: string
  description: string
  accent?: boolean
}

const STATS: StatBlock[] = [
  {
    value: 100,
    suffix: '%',
    label: 'Personalizado',
    description: 'Cada solución es única, diseñada para TU negocio',
    accent: true,
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Disponibilidad',
    description: 'Nuestras soluciones de IA trabajan sin descanso',
  },
  {
    value: null,
    symbol: '∞',
    label: 'Escalabilidad',
    description: 'Tecnología que crece con tu empresa sin límites',
    accent: true,
  },
  {
    value: 50,
    prefix: '+',
    label: 'Tecnologías',
    description: 'Dominamos las herramientas más avanzadas del mercado',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="por-que"
      className="section-padding relative overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, var(--color-primary-500) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(800px,200vw)] h-[min(800px,200vw)] rounded-full bg-primary-500/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary-700/[0.06] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          tag="Ventajas"
          title="¿Por qué Evolution.AI?"
          subtitle="Lo que nos hace diferentes"
        />

        {/* Asymmetric grid */}
        <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className={cn(
                'sm:col-span-1 lg:col-span-6',
                // Asymmetric sizing: first and third cards are larger
                i === 0 && 'lg:col-span-7',
                i === 1 && 'lg:col-span-5',
                i === 2 && 'lg:col-span-5',
                i === 3 && 'lg:col-span-7'
              )}
            >
              <GlowCard
                className={cn(
                  'p-5 sm:p-8 lg:p-10 h-full flex flex-col justify-between min-h-[160px] sm:min-h-[220px]',
                  stat.accent && 'border-primary-500/10'
                )}
              >
                {/* Top: Counter + Label */}
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    {stat.symbol ? (
                      <span className="text-3xl sm:text-5xl lg:text-7xl font-heading font-bold gradient-text leading-none">
                        {stat.symbol}
                      </span>
                    ) : isMobile ? (
                      <span className="text-3xl font-heading font-bold gradient-text leading-none tabular-nums">
                        {stat.prefix}{stat.value}{stat.suffix}
                      </span>
                    ) : (
                      <AnimatedCounter
                        target={stat.value!}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        duration={2200}
                        className="text-3xl sm:text-5xl lg:text-7xl font-heading font-bold gradient-text leading-none"
                      />
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mt-3">
                    {stat.label}
                  </h3>
                </div>

                {/* Bottom: Description */}
                <p className="text-muted-light text-base sm:text-lg mt-4 leading-relaxed max-w-md">
                  {stat.description}
                </p>

                {/* Decorative line */}
                {stat.accent && (
                  <motion.div
                    className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.6 + i * 0.15, duration: 0.8 }}
                  />
                )}
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
