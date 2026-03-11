'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ═══════════════════════════════════════════════════════
   Placeholder Company Logos (styled text)
   ═══════════════════════════════════════════════════════ */

const companies = [
  { name: 'TechNova', style: 'tracking-[0.2em] uppercase' },
  { name: 'Meridian Corp', style: 'italic' },
  { name: 'Axon Labs', style: 'tracking-widest uppercase' },
  { name: 'Synthetica', style: 'font-light tracking-wider' },
  { name: 'Vertex AI', style: 'tracking-[0.15em] uppercase' },
  { name: 'NebulaSoft', style: 'italic font-light' },
  { name: 'Quantum Edge', style: 'tracking-widest uppercase' },
  { name: 'Cirrus Digital', style: 'font-light tracking-wider' },
  { name: 'Aethon Group', style: 'tracking-[0.2em] uppercase' },
  { name: 'Helix Ventures', style: 'italic' },
]

/* ═══════════════════════════════════════════════════════
   CSS-only Marquee Row
   ═══════════════════════════════════════════════════════ */

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof companies
  reverse?: boolean
}) {
  // Duplicate for seamless CSS loop
  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden">
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent md:w-32" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent md:w-32" />

      <div
        className={cn(
          'flex w-max items-center gap-10 py-4 md:gap-14',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        )}
      >
        {doubled.map((company, i) => (
          <div
            key={`${company.name}-${i}`}
            className="group flex shrink-0 items-center gap-3 select-none"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-primary-500/30 transition-colors duration-500 group-hover:bg-primary-400" />
            <span
              className={cn(
                'whitespace-nowrap font-heading text-lg text-white/20 transition-all duration-500 group-hover:text-white/50 md:text-xl',
                company.style
              )}
            >
              {company.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   SocialProof Section
   ═══════════════════════════════════════════════════════ */

export default function SocialProof() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.03] bg-surface/30 py-12 md:py-16">
      {/* Subtle noise texture */}
      <div className="noise absolute inset-0" aria-hidden="true" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-8 text-center"
      >
        <p className="font-body text-sm font-medium tracking-[0.2em] text-muted uppercase">
          Impulsando la evolución digital
        </p>
      </motion.div>

      {/* Marquee — CSS-only infinite scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 flex flex-col gap-2"
      >
        <MarqueeRow items={companies} />
        <MarqueeRow items={companies} reverse />
      </motion.div>

      {/* Inline keyframes for CSS-only marquee */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 35s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee,
          .animate-marquee-reverse {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
