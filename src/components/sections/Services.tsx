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
      'Eliminamos el trabajo manual con sistemas que procesan documentos, sincronizan plataformas y ejecutan workflows completos sin intervención humana.',
  },
  {
    icon: MessageSquare,
    title: 'Agentes de IA & Chatbots',
    description:
      'Asistentes 24/7 que atienden clientes, califican leads y gestionan agendas con la personalidad de tu marca.',
  },
  {
    icon: Code2,
    title: 'Desarrollo de Software',
    description:
      'Software a medida: sistemas internos, plataformas de gestión y backends robustos que escalan contigo.',
  },
  {
    icon: Globe,
    title: 'Desarrollo Web & Apps',
    description:
      'Plataformas web y apps que cargan rápido, posicionan en Google y convierten visitantes en clientes.',
  },
  {
    icon: LineChart,
    title: 'Consultoría en IA',
    description:
      'Analizamos tus procesos, identificamos oportunidades de IA y diseñamos un plan con impacto medible.',
  },
  {
    icon: Plug,
    title: 'Integración de IA',
    description:
      'Potenciamos tus sistemas actuales con búsqueda semántica, clasificación automática y predicciones en tiempo real. Sin migraciones, sin fricciones.',
  },
]

/** Grid placement per card index for the 6-col bento layout */
const gridSpans: Record<number, string> = {
  0: 'md:col-span-4 md:row-span-2',
  1: 'md:col-span-2 md:row-span-1',
  2: 'md:col-span-2 md:row-span-1',
  3: 'md:col-span-3 md:row-span-1',
  4: 'md:col-span-3 md:row-span-1',
  5: 'md:col-span-6 md:row-span-1',
}

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

        {/* Bento Grid — 6-col asymmetric */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 md:gap-5 lg:gap-6"
        >
          {services.map((service, i) => {
            const Icon = service.icon
            const isHero = i === 0
            const isBanner = i === 5

            return (
              <div
                key={i}
                className={cn('service-card', gridSpans[i])}
              >
                <GlowCard
                  className={cn(
                    'h-full',
                    isHero
                      ? 'flex flex-col justify-center bg-gradient-to-br from-primary-500/[0.07] via-surface to-surface'
                      : 'flex flex-col justify-start',
                    isBanner
                      ? 'flex flex-row items-center gap-6 md:flex-row'
                      : ''
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      'flex items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 transition-all duration-300 group-hover:bg-primary-500/20 group-hover:scale-110 group-hover:rotate-6',
                      isHero
                        ? 'mb-5 h-14 w-14'
                        : isBanner
                          ? 'mb-0 h-12 w-12 shrink-0'
                          : 'mb-4 h-12 w-12',
                    )}
                  >
                    <Icon
                      className={cn(isHero ? 'h-7 w-7' : 'h-6 w-6')}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Text content */}
                  <div className={cn(isBanner ? 'flex-1' : '')}>
                    {/* Title */}
                    <h3
                      className={cn(
                        'mb-2 font-heading font-bold text-foreground',
                        isHero
                          ? 'text-xl md:text-2xl lg:text-3xl'
                          : 'text-lg md:text-xl'
                      )}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={cn(
                        'font-body text-muted-light leading-relaxed',
                        isHero
                          ? 'text-base md:text-lg'
                          : 'text-sm md:text-base'
                      )}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Decorative corner glow on hero card */}
                  {isHero && (
                    <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary-500/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
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
