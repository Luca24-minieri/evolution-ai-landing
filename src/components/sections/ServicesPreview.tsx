'use client'

import { motion } from 'framer-motion'
import {
  Zap,
  MessageSquare,
  Code2,
  Globe,
} from 'lucide-react'
import GlowCard from '@/components/ui/GlowCard'
import Button from '@/components/ui/Button'

const featured = [
  {
    icon: Zap,
    title: 'Automatización con IA',
    description: 'Sistemas que eliminan el trabajo manual de punta a punta.',
  },
  {
    icon: MessageSquare,
    title: 'Agentes & Chatbots',
    description: 'Asistentes 24/7 que atienden, venden y gestionan.',
  },
  {
    icon: Code2,
    title: 'Software a Medida',
    description: 'Plataformas robustas diseñadas para tu operación.',
  },
  {
    icon: Globe,
    title: 'Web & Apps',
    description: 'Sitios rápidos que posicionan y convierten.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export default function ServicesPreview() {
  return (
    <section className="section-padding relative">
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
            Servicios
          </span>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Lo que hacemos
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                <GlowCard className="h-full p-6 sm:p-7">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 transition-all duration-300 group-hover:bg-primary-500/20 group-hover:scale-110">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="mb-1.5 font-heading text-lg font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-muted-light leading-relaxed">
                    {service.description}
                  </p>
                </GlowCard>
              </motion.div>
            )
          })}
        </div>

        {/* Link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <Button variant="secondary" size="md" href="/servicios">
            Ver todos los servicios
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
