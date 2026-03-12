'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ═══════════════════════════════════════════════════════
   Real Technology Stack — verified, public logos
   ═══════════════════════════════════════════════════════ */

const technologies = [
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', invert: true },
  { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Supabase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  { name: 'OpenAI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg', invert: true },
]

/* ═══════════════════════════════════════════════════════
   CSS-only Marquee Row
   ═══════════════════════════════════════════════════════ */

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof technologies
  reverse?: boolean
}) {
  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden">
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent md:w-32" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent md:w-32" />

      <div
        className={cn(
          'flex w-max items-center gap-8 py-4 sm:gap-12 md:gap-16',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        )}
      >
        {doubled.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="group flex shrink-0 items-center gap-3 select-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tech.logo}
              alt={tech.name}
              width={28}
              height={28}
              loading="lazy"
              className={cn(
                'h-7 w-7 object-contain opacity-40 transition-opacity duration-500 group-hover:opacity-80',
                tech.invert && 'invert'
              )}
            />
            <span className="whitespace-nowrap font-body text-sm text-white/30 transition-all duration-500 group-hover:text-white/60 sm:text-base">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   Tech Stack Section (replaces fake SocialProof)
   ═══════════════════════════════════════════════════════ */

export default function SocialProof() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.03] bg-surface/30 py-10 md:py-14">
      {/* Subtle noise texture */}
      <div className="noise absolute inset-0" aria-hidden="true" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-6 text-center"
      >
        <p className="font-body text-sm font-medium tracking-[0.2em] text-muted uppercase">
          Nuestro stack tecnológico
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
        <MarqueeRow items={technologies} />
        <MarqueeRow items={technologies} reverse />
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
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
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
