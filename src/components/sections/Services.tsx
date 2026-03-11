'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Zap,
  MessageSquare,
  Code2,
  Globe,
  LineChart,
  Plug,
} from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import GlowCard from '@/components/ui/GlowCard'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    icon: Zap,
    title: 'Automatización con IA',
    description:
      'Tu equipo pierde horas en tareas que una máquina hace en segundos. Desarrollamos sistemas propios que eliminan el trabajo manual de punta a punta: procesamiento de documentos, sincronización entre plataformas, reportes automáticos y workflows completos que corren solos. El resultado: operaciones más rápidas, menos errores y un equipo libre para enfocarse en lo estratégico.',
  },
  {
    icon: MessageSquare,
    title: 'Agentes de IA & Chatbots',
    description:
      'Un asistente que conoce tu negocio como el mejor vendedor de tu equipo, pero disponible 24/7. Nuestros agentes atienden clientes, califican leads, gestionan agendas, procesan pedidos y escalan situaciones complejas a personas reales cuando es necesario. Respuestas precisas basadas en tu información real, con personalidad alineada a tu marca y memoria de cada conversación.',
  },
  {
    icon: Code2,
    title: 'Desarrollo de Software',
    description:
      'Cuando las soluciones genéricas no alcanzan, construimos la tuya. Software a medida diseñado desde cero para resolver los problemas específicos de tu operación: sistemas internos, plataformas de gestión, backends robustos y arquitecturas que escalan sin romperse. Código limpio, documentado y preparado para crecer contigo.',
  },
  {
    icon: Globe,
    title: 'Desarrollo Web & Apps',
    description:
      'Tu presencia digital es tu mejor vendedor. Creamos plataformas web y aplicaciones que no solo se ven impecables — cargan rápido, posicionan en Google y convierten visitantes en clientes. Dashboards, e-commerce, portales SaaS o landing pages de alto impacto, todo optimizado para que cada visita cuente.',
  },
  {
    icon: LineChart,
    title: 'Consultoría en IA',
    description:
      'Antes de escribir una línea de código, entendemos tu negocio. Analizamos tus procesos, identificamos dónde la inteligencia artificial genera mayor retorno y diseñamos un plan de implementación claro con prioridades, tiempos y resultados esperados. Cada decisión tecnológica está respaldada por una estrategia con impacto medible.',
  },
  {
    icon: Plug,
    title: 'Integración de IA',
    description:
      'No necesitas reemplazar lo que ya funciona. Potenciamos tus sistemas actuales inyectando inteligencia artificial donde más impacta: búsqueda semántica sobre tus datos, clasificación automática, predicciones y análisis en tiempo real. Todo conectado a tu infraestructura existente, sin fricciones ni migraciones disruptivas.',
  },
]

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return

    const cards = el.querySelectorAll<HTMLElement>('.service-card')

    gsap.set(cards, { opacity: 0, y: 60 })

    const tween = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    return () => {
      tween.kill()
      tween.scrollTrigger?.kill()
    }
  }, [])

  return (
    <section id="servicios" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Servicios"
          title="Soluciones que transforman"
          subtitle="Tecnología a medida para cada desafío de tu negocio"
        />

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-3 md:gap-5 lg:gap-6"
        >
          {services.map((service, i) => {
            const Icon = service.icon

            // Bento layout: first 2 cards span 2 cols, rest are 1 col each
            const isLarge = i < 2
            const gridClass = isLarge
              ? 'md:col-span-2 md:row-span-1'
              : 'md:col-span-2 lg:col-span-1'

            // Rearrange on lg: first 2 take full width row, 4 below in 2x2
            const lgClass = isLarge
              ? 'lg:col-span-2 lg:row-span-2'
              : ''

            return (
              <div key={i} className={cn('service-card', gridClass, lgClass)}>
                <GlowCard className="h-full flex flex-col justify-start">
                  {/* Icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 transition-all duration-300 group-hover:bg-primary-500/20 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3
                    className={cn(
                      'mb-2 font-heading font-bold text-foreground',
                      isLarge ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
                    )}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={cn(
                      'font-body text-muted-light leading-relaxed',
                      isLarge ? 'text-base md:text-lg' : 'text-sm md:text-base'
                    )}
                  >
                    {service.description}
                  </p>

                  {/* Decorative corner glow on large cards */}
                  {isLarge && (
                    <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-primary-500/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
                  )}
                </GlowCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
