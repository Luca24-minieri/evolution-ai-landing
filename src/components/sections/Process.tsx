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
      'Analizamos tu negocio, procesos y detectamos oportunidades de mejora con IA',
    icon: Search,
  },
  {
    number: '02',
    title: 'Estrategia',
    description:
      'Diseñamos la solución perfecta: tecnología, alcance, tiempos y presupuesto',
    icon: Map,
  },
  {
    number: '03',
    title: 'Desarrollo',
    description:
      'Construimos con tecnología de vanguardia, con entregas iterativas y feedback constante',
    icon: Rocket,
  },
  {
    number: '04',
    title: 'Evolución',
    description:
      'Optimizamos, escalamos y mantenemos tu solución para que crezca contigo',
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

    // Animate the vertical line drawing on scroll
    const lineTween = gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'bottom 70%',
          scrub: 0.8,
        },
      }
    )
    tweens.push(lineTween)

    // Animate each step sequentially
    const stepEls = section.querySelectorAll<HTMLElement>('.process-step')
    stepEls.forEach((el, i) => {
      const isLeft = i % 2 === 0
      const xFrom = isLeft ? -60 : 60

      const stepTween = gsap.fromTo(
        el,
        { opacity: 0, x: xFrom, y: 30 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )
      tweens.push(stepTween)
    })

    // Animate the dot indicators
    const dots = section.querySelectorAll<HTMLElement>('.process-dot')
    dots.forEach((dot) => {
      const dotTween = gsap.fromTo(
        dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: dot,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
      tweens.push(dotTween)
    })

    // Animate step numbers
    const numbers = section.querySelectorAll<HTMLElement>('.process-number')
    numbers.forEach((num) => {
      const numTween = gsap.fromTo(
        num,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: num,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )
      tweens.push(numTween)
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
          {/* Vertical center line — hidden on mobile */}
          <div className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block">
            <div
              ref={lineRef}
              className="h-full w-[2px] origin-top bg-gradient-to-b from-primary-500/80 via-primary-400/50 to-primary-500/10"
            />
          </div>

          {/* Mobile vertical line */}
          <div className="absolute left-6 top-0 h-full md:hidden">
            <div className="h-full w-[2px] bg-gradient-to-b from-primary-500/80 via-primary-400/50 to-primary-500/10" />
          </div>

          {/* Steps */}
          <div className="relative space-y-12 md:space-y-24">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isLeft = i % 2 === 0

              return (
                <div key={i} className="relative">
                  {/* Dot on timeline — desktop */}
                  <div className="process-dot absolute left-1/2 top-8 z-10 hidden -translate-x-1/2 md:block">
                    <div className="relative flex h-5 w-5 items-center justify-center">
                      <div className="absolute h-5 w-5 rounded-full bg-primary-500/20 animate-ping" />
                      <div className="h-3 w-3 rounded-full bg-primary-500 shadow-[0_0_12px_rgba(0,229,255,0.6)]" />
                    </div>
                  </div>

                  {/* Dot on timeline — mobile */}
                  <div className="process-dot absolute left-6 top-6 z-10 -translate-x-1/2 md:hidden">
                    <div className="relative flex h-4 w-4 items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
                    </div>
                  </div>

                  {/* Content — Desktop: alternating left/right */}
                  <div
                    className={cn(
                      'process-step',
                      // Mobile: always offset from left line
                      'ml-14 md:ml-0',
                      // Desktop: alternating sides
                      'md:grid md:grid-cols-2 md:gap-12'
                    )}
                  >
                    {/* Left side content or spacer */}
                    {isLeft ? (
                      <>
                        <div className="flex justify-end">
                          <StepCard
                            step={step}
                            Icon={Icon}
                            align="right"
                          />
                        </div>
                        <div className="hidden md:block" />
                      </>
                    ) : (
                      <>
                        <div className="hidden md:block" />
                        <div className="flex justify-start">
                          <StepCard
                            step={step}
                            Icon={Icon}
                            align="left"
                          />
                        </div>
                      </>
                    )}
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

function StepCard({
  step,
  Icon,
  align,
}: {
  step: (typeof steps)[number]
  Icon: (typeof steps)[number]['icon']
  align: 'left' | 'right'
}) {
  return (
    <div
      className={cn(
        'group relative max-w-md rounded-2xl border border-white/5 bg-surface p-6 md:p-8',
        'transition-all duration-300 hover:border-primary-500/20 hover:bg-surface-light',
        align === 'right' ? 'md:text-right' : 'md:text-left'
      )}
    >
      {/* Big number */}
      <span className="process-number absolute -top-4 font-heading text-6xl font-extrabold leading-none text-primary-500/10 md:text-7xl select-none">
        {step.number}
      </span>

      <div
        className={cn(
          'relative z-10 flex flex-col gap-3',
          align === 'right' ? 'md:items-end' : 'md:items-start'
        )}
      >
        {/* Icon */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 transition-all duration-300 group-hover:bg-primary-500/20 group-hover:scale-110">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">
          {step.title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-muted leading-relaxed md:text-base">
          {step.description}
        </p>
      </div>

      {/* Subtle glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 via-transparent to-transparent" />
      </div>
    </div>
  )
}
