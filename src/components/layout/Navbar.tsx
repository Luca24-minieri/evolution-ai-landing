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
            width={140}
            height={40}
            className="h-9 w-auto"
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
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-white/5 lg:hidden"
          aria-label={isMobileOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-t border-white/5 glass lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6 sm:px-6">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block rounded-lg px-4 py-3 font-body text-base font-medium transition-colors hover:bg-white/5 hover:text-foreground',
                        isActive ? 'text-primary-400 bg-white/5' : 'text-muted'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
              <div className="mt-4 border-t border-white/5 pt-4">
                <Button
                  variant="primary"
                  size="md"
                  href="/contacto"
                  className="w-full"
                >
                  Hablemos
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
