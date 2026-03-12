'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, Map, Rocket, TrendingUp } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description:
      'Analizamos tu negocio, procesos y detectamos oportunidades de mejora con IA. Entendemos tus desafíos antes de proponer soluciones.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Estrategia',
    description:
      'Diseñamos la solución perfecta: tecnología, alcance, tiempos y presupuesto. Un roadmap claro con hitos definidos.',
    icon: Map,
  },
  {
    number: '03',
    title: 'Desarrollo',
    description:
      'Construimos con tecnología de vanguardia, con entregas iterativas y feedback constante. Ves el progreso en cada sprint.',
    icon: Rocket,
  },
  {
    number: '04',
    title: 'Evolución',
    description:
      'Optimizamos, escalamos y mantenemos tu solución para que crezca contigo. Mejora continua basada en datos reales.',
    icon: TrendingUp,
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const line = lineRef.current
    if (!section || !line) return

    const tweens: gsap.core.Tween[] = []

    // Animate the horizontal line drawing on scroll
    const lineTween = gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          end: 'bottom 80%',
          scrub: 0.8,
        },
      }
    )
    tweens.push(lineTween)

    // Animate each card
    const cards = section.querySelectorAll<HTMLElement>('.process-card')
    cards.forEach((card, i) => {
      const cardTween = gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
      tweens.push(cardTween)
    })

    return () => {
      tweens.forEach((t) => {
        t.kill()
        t.scrollTrigger?.kill()
      })
    }
  }, [])

  return (
    <section id="proceso" className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Proceso"
          title="Tu evolución en 4 pasos"
          subtitle="Un proceso claro, transparente y orientado a resultados"
        />

        <div ref={sectionRef} className="relative mt-8 md:mt-16">
          {/* Horizontal connector line — desktop only */}
          <div className="absolute top-[3.5rem] left-[12.5%] right-[12.5%] hidden lg:block">
            <div
              ref={lineRef}
              className="h-[2px] w-full origin-left bg-gradient-to-r from-primary-500/60 via-primary-400/40 to-primary-500/20"
            />
          </div>

          {/* Steps grid — 4 columns on desktop */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="process-card relative">
                  {/* Step card */}
                  <div className="group relative rounded-2xl border border-white/5 bg-surface p-6 transition-all duration-300 hover:border-primary-500/20 hover:bg-surface-light">
                    {/* Number badge */}
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400 transition-all duration-300 group-hover:bg-primary-500/20 group-hover:scale-110">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                      <span className="font-heading text-sm font-bold text-primary-500/40 tracking-wider">
                        {step.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 font-heading text-xl font-bold text-foreground">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-sm text-muted-light leading-relaxed">
                      {step.description}
                    </p>

                    {/* Subtle glow on hover */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
