'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ContactPreview() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[min(600px,150vw)] h-[min(600px,150vw)] rounded-full bg-primary-500/[0.03] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary-500/30 bg-primary-500/5 px-4 py-1.5 font-body text-sm font-medium tracking-wide text-primary-400 uppercase">
            Contacto
          </span>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Comienza tu evolución hoy
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-muted-light leading-relaxed">
            Cuéntanos sobre tu proyecto. Responderemos en menos de 24 horas.
          </p>
        </motion.div>

        {/* Quick contact options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <a
            href="mailto:sebastiandiuana@evolutionai.cl"
            className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-surface p-5 transition-all duration-300 hover:border-primary-500/20 hover:bg-surface-light"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 transition-colors duration-300 group-hover:bg-primary-500/20">
              <Mail className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs text-muted font-medium uppercase tracking-wider mb-0.5">Email</p>
              <p className="text-sm sm:text-base text-foreground break-all group-hover:text-primary-400 transition-colors duration-300">
                sebastiandiuana@evolutionai.cl
              </p>
            </div>
          </a>

          <a
            href="https://wa.me/56975231022"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-surface p-5 transition-all duration-300 hover:border-primary-500/20 hover:bg-surface-light"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 transition-colors duration-300 group-hover:bg-primary-500/20">
              <Phone className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs text-muted font-medium uppercase tracking-wider mb-0.5">WhatsApp</p>
              <p className="text-sm sm:text-base text-foreground group-hover:text-primary-400 transition-colors duration-300">
                +56 9 7523 1022
              </p>
            </div>
          </a>
        </motion.div>

        {/* CTA to full contact page */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <Button variant="primary" size="lg" href="/contacto">
            <span className="flex items-center gap-2">
              Enviar mensaje
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
