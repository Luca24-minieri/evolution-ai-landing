'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollAnimationOptions {
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  trigger?: ScrollTrigger.Vars
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      from = { opacity: 0, y: 60 },
      to = { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      trigger = {},
    } = options

    const tween = gsap.fromTo(el, from, {
      ...to,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...trigger,
      },
    })

    return () => {
      tween.kill()
      tween.scrollTrigger?.kill()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}
