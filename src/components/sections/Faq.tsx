'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { cn } from '@/lib/utils'

interface FaqItem {
  question: string
  answer: string
}

const FAQS: FaqItem[] = [
  {
    question: '¿Qué tipo de empresas atienden?',
    answer:
      'Trabajamos con empresas de todos los sectores y tamaños — desde startups en etapa temprana hasta corporaciones establecidas. Nuestras soluciones se adaptan a las necesidades específicas de cada cliente, ya sea en retail, salud, finanzas, educación, logística o cualquier industria que busque aprovechar el poder de la inteligencia artificial para optimizar sus operaciones y escalar su crecimiento.',
  },
  {
    question: '¿Cuánto demora un proyecto típico?',
    answer:
      'Depende de la complejidad y alcance del proyecto. Un chatbot o automatización simple puede estar listo en 2 a 4 semanas. Proyectos más complejos como plataformas web con integraciones de IA o sistemas de automatización avanzados pueden tomar entre 6 y 12 semanas. Siempre definimos un roadmap claro desde el inicio con hitos y entregables para que tengas visibilidad total del progreso.',
  },
  {
    question: '¿Cómo funciona la mantención mensual?',
    answer:
      'Nuestros planes de mantención incluyen monitoreo continuo del rendimiento, actualizaciones de seguridad y tecnología, soporte técnico prioritario, y mejoras iterativas basadas en datos de uso real. Recibirás reportes mensuales con métricas clave y recomendaciones de optimización. Es como tener un equipo técnico dedicado sin los costos de contratación interna.',
  },
  {
    question: '¿Trabajan con empresas fuera de Chile?',
    answer:
      'Sí, trabajamos de forma 100% remota y atendemos clientes en toda Latinoamérica y España. Nuestro flujo de trabajo está diseñado para la colaboración a distancia con herramientas de comunicación en tiempo real, gestión de proyectos transparente y reuniones de seguimiento regulares adaptadas a tu zona horaria.',
  },
  {
    question: '¿Qué tecnologías utilizan?',
    answer:
      'Dominamos un stack moderno y en constante evolución: Next.js, React y TypeScript para frontend; Python y Node.js para backend; OpenAI, Anthropic y LangChain para soluciones de IA; bases de datos como PostgreSQL y MongoDB; servicios cloud en AWS y Vercel; y herramientas de automatización como n8n y Make. Elegimos la tecnología que mejor se adapte a cada proyecto, no al revés.',
  },
  {
    question: '¿Cómo empezamos?',
    answer:
      'Simple: agenda una llamada gratuita de 30 minutos donde conversaremos sobre tu negocio, tus desafíos y tus objetivos. A partir de ahí, te presentamos una propuesta detallada con alcance, timeline y presupuesto. Sin compromiso, sin letra chica — solo una conversación honesta sobre cómo la tecnología puede impulsar tu empresa al siguiente nivel.',
  },
]

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className={cn(
        'border-b border-white/[0.06] transition-colors duration-300',
        isOpen && 'border-primary-500/20'
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            'text-lg sm:text-xl font-heading font-medium transition-colors duration-300 pr-8',
            isOpen ? 'text-primary-400' : 'text-foreground group-hover:text-primary-300'
          )}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          className={cn(
            'flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border transition-colors duration-300',
            isOpen
              ? 'bg-primary-500/15 border-primary-500/30 text-primary-400'
              : 'bg-white/[0.03] border-white/[0.08] text-muted group-hover:border-primary-500/20 group-hover:text-primary-400'
          )}
        >
          <Plus className="w-5 h-5" strokeWidth={2} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
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
            <p className="pb-6 text-muted-light text-base sm:text-lg leading-relaxed max-w-3xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary-500/[0.03] blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          tag="FAQ"
          title="Preguntas Frecuentes"
          subtitle="Todo lo que necesitas saber antes de dar el siguiente paso"
        />

        <div className="mt-14">
          {/* Top border */}
          <div className="h-px bg-white/[0.06]" />

          {FAQS.map((item, i) => (
            <FaqAccordionItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
