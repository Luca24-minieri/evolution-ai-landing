import Link from 'next/link'
import Image from 'next/image'
import { NAV_LINKS } from '@/lib/utils'

const serviceLinks = [
  { label: 'Agentes AI', href: '/servicios' },
  { label: 'Automatización', href: '/servicios' },
  { label: 'Consultoría AI', href: '/servicios' },
  { label: 'Desarrollo a Medida', href: '/servicios' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-80">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                <Image
                  src="/logo.png"
                  alt="Evolution.AI"
                  width={200}
                  height={200}
                  className="h-10 w-auto object-cover object-top"
                />
              </div>
              <span className="font-heading text-lg font-bold text-foreground">
                Evolution<span className="text-primary-400">.AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-muted">
              Transformamos negocios con inteligencia artificial. Tu evolución digital comienza aquí.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold tracking-wider text-foreground uppercase">
              Navegación
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-muted transition-colors duration-300 hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold tracking-wider text-foreground uppercase">
              Servicios
            </h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-muted transition-colors duration-300 hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="font-body text-sm text-muted">
            &copy; 2025 Evolution.AI — Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-xs text-muted transition-colors hover:text-primary-400">
              Política de Privacidad
            </a>
            <a href="#" className="font-body text-xs text-muted transition-colors hover:text-primary-400">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
