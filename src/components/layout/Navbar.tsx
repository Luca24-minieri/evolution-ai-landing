'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/utils'
import Button from '@/components/ui/Button'

const smoothEase = [0.25, 0.1, 0.25, 1] as const

const sidebarVariants = {
  closed: {
    x: '100%',
    transition: { duration: 0.4, ease: smoothEase },
  },
  open: {
    x: 0,
    transition: { duration: 0.4, ease: smoothEase },
  },
}

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
}

const linkVariants = {
  closed: { opacity: 0, x: 30 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.15 + i * 0.06,
      duration: 0.4,
      ease: smoothEase,
    },
  }),
}

const ctaVariants = {
  closed: { opacity: 0, y: 20 },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + NAV_LINKS.length * 0.06 + 0.1,
      duration: 0.4,
      ease: smoothEase,
    },
  },
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 z-50 w-full transition-all duration-500',
          isScrolled
            ? 'glass border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 transition-opacity duration-300 hover:opacity-80">
            <Image
              src="/logo.png"
              alt="Evolution.AI"
              width={200}
              height={56}
              className="h-12 w-auto sm:h-14"
              priority
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'relative font-body text-sm font-medium transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-primary-400 after:transition-all after:duration-300',
                      isActive
                        ? 'text-foreground after:w-full'
                        : 'text-muted hover:text-foreground after:w-0 hover:after:w-full'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button variant="primary" size="sm" href="/contacto">
              Hablemos
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-white/5 lg:hidden"
            aria-label={isMobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile sidebar overlay + panel */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Dark overlay */}
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Sidebar panel */}
            <motion.aside
              key="sidebar"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 z-[56] flex h-dvh w-[min(80vw,320px)] flex-col border-l border-white/[0.06] bg-surface lg:hidden"
            >
              {/* Sidebar header */}
              <div className="flex h-[72px] items-center justify-between px-6 border-b border-white/[0.06]">
                <span className="font-heading text-sm font-semibold tracking-wider text-muted uppercase">
                  Menú
                </span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                  aria-label="Cerrar menú"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = pathname === link.href
                    return (
                      <motion.li
                        key={link.href}
                        custom={i}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            'flex items-center gap-3 rounded-xl px-4 py-3.5 font-body text-[15px] font-medium transition-all duration-200',
                            isActive
                              ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                              : 'text-muted-light hover:bg-white/[0.04] hover:text-foreground border border-transparent'
                          )}
                        >
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                          )}
                          {link.label}
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              {/* Bottom CTA */}
              <motion.div
                variants={ctaVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="border-t border-white/[0.06] px-4 py-5"
              >
                <Button
                  variant="primary"
                  size="md"
                  href="/contacto"
                  className="w-full"
                >
                  Hablemos
                </Button>
                <p className="mt-3 text-center font-body text-xs text-muted">
                  Respuesta en menos de 24hs
                </p>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
