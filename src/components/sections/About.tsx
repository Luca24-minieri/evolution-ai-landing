'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lightbulb, Handshake, Trophy, RefreshCcw } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import GlowCard from '@/components/ui/GlowCard'
import { cn } from '@/lib/utils'

const VALUES = [
  {
    icon: Lightbulb,
    name: 'Innovación',
    description: 'Siempre un paso adelante',
  },
  {
    icon: Handshake,
    name: 'Compromiso',
    description: 'Tu éxito es nuestro éxito',
  },
  {
    icon: Trophy,
    name: 'Excelencia',
    description: 'Nada menos que lo mejor',
  },
  {
    icon: RefreshCcw,
    name: 'Adaptabilidad',
    description: 'Evolución constante',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="section-padding relative overflow-hidden"
    >
      {/* Decorative geometric elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 border border-primary-500/[0.06] rounded-full" />
        <div className="absolute top-32 right-22 w-40 h-40 border border-primary-500/[0.04] rounded-full" />
        <div className="absolute bottom-20 left-10 w-32 h-32 border border-primary-500/[0.05] rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          tag="Nosotros"
          title="Somos Evolution.AI"
        />

        {/* Mission text */}
        <motion.div
          className="max-w-3xl mx-auto mt-12 space-y-5"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <p className="text-lg sm:text-xl text-muted-light leading-relaxed text-center">
            Somos una agencia especializada en inteligencia artificial y desarrollo de software
            que nació con una misión clara:{' '}
            <span className="text-foreground font-medium">
              transformar la manera en que las empresas operan, crecen y compiten.
            </span>{' '}
            Creemos que la IA no es el futuro — es el presente, y cada empresa merece
            aprovechar su potencial al máximo.
          </p>
          <p className="text-lg sm:text-xl text-muted-light leading-relaxed text-center">
            Combinamos tecnología de vanguardia con un enfoque profundamente humano.
            No entregamos soluciones genéricas: escuchamos, entendemos tu negocio y
            construimos herramientas que realmente{' '}
            <span className="text-primary-400 font-medium">generan impacto.</span>{' '}
            Desde automatización inteligente hasta plataformas completas, cada proyecto
            es una oportunidad para redefinir lo posible.
          </p>
          <p className="text-lg sm:text-xl text-muted-light leading-relaxed text-center">
            Nuestro compromiso es simple: no paramos hasta que tu empresa evolucione.
            Innovación continua, excelencia en cada línea de código y la convicción de que{' '}
            <span className="text-foreground font-medium">
              la tecnología bien aplicada cambia negocios — y vidas.
            </span>
          </p>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center justify-center gap-3 my-16"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary-500/40" />
          <div className="w-2 h-2 rounded-full bg-primary-500/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary-500/40" />
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <GlowCard className="p-7 sm:p-8 text-center h-full group">
                <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary-500/20">
                  <value.icon className="w-7 h-7 text-primary-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  {value.name}
                </h3>
                <p className="text-muted-light text-base leading-relaxed">
                  {value.description}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
