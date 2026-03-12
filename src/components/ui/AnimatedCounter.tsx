'use client'

import { useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export default function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  const animateCount = useCallback(() => {
    const el = ref.current
    if (!el) return

    const startTime = performance.now()

    function step(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const value = Math.round(eased * target)

      // Direct DOM update — no React re-renders
      el!.textContent = `${prefix}${value}${suffix}`

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [target, suffix, prefix, duration])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Set initial value
    el.textContent = `${prefix}0${suffix}`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          animateCount()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animateCount, prefix, suffix])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}0{suffix}
    </span>
  )
}
