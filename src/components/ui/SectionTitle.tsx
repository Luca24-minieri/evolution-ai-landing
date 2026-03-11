'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  tag?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionTitle({
  tag,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionTitleProps) {
  const ref = useScrollAnimation<HTMLDivElement>({
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
  })

  return (
    <div
      ref={ref}
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      {tag && (
        <span className="mb-4 inline-block rounded-full border border-primary-500/30 bg-primary-500/5 px-4 py-1.5 font-body text-sm font-medium tracking-wide text-primary-400 uppercase">
          {tag}
        </span>
      )}
      <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-muted md:text-xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
