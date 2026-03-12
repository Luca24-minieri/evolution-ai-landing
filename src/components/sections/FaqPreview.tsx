'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const PREVIEW_FAQS = [
  {
    question: '¿Qué tipo de empresas atienden?',
    answer:
      'Trabajamos con empresas de todos los sectores y tamaños — desde startups hasta corporaciones establecidas. Nuestras soluciones se adaptan a las necesidades específicas de cada cliente.',
  },
  {
    question: '¿Cuánto demora un proyecto típico?',
    answer:
      'Depende de la complejidad. Un chatbot puede estar listo en 2-4 semanas. Proyectos más complejos toman entre 6-12 semanas. Siempre definimos un roadmap claro desde el inicio.',
  },
  {
    question: '¿Cómo empezamos?',
    answer:
      'Agenda una llamada gratuita de 30 minutos donde conversaremos sobre tu negocio y objetivos. A partir de ahí, te presentamos una propuesta detallada sin compromiso.',
  },
]

export default function FaqPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-10 sm:mb-14 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary-500/30 bg-primary-500/5 px-4 py-1.5 font-body text-sm font-medium tracking-wide text-primary-400 uppercase">
            FAQ
          </span>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Preguntas Frecuentes
          </h2>
        </motion.div>

        {/* Accordion — 3 items */}
        <div>
          <div className="h-px bg-white/[0.06]" />
          {PREVIEW_FAQS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className={cn(
                'border-b border-white/[0.06] transition-colors duration-300',
                openIndex === i && 'border-primary-500/20'
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
              >
                <span
                  className={cn(
                    'text-lg sm:text-xl font-heading font-medium transition-colors duration-300 pr-8',
                    openIndex === i
                      ? 'text-primary-400'
                      : 'text-foreground group-hover:text-primary-300'
                  )}
                >
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                  className={cn(
                    'flex-shrink-0 w-11 h-11 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center border transition-colors duration-300',
                    openIndex === i
                      ? 'bg-primary-500/15 border-primary-500/30 text-primary-400'
                      : 'bg-white/[0.03] border-white/[0.08] text-muted group-hover:border-primary-500/20 group-hover:text-primary-400'
                  )}
                >
                  <Plus className="w-5 h-5" strokeWidth={2} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
                      opacity: { duration: 0.3, delay: 0.05 },
                    }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-muted-light text-base sm:text-lg leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <Button variant="secondary" size="md" href="/faq">
            Ver todas las preguntas
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
