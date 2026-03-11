import Link from 'next/link'
import Image from 'next/image'
import { NAV_LINKS } from '@/lib/utils'

const socialLinks = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Twitter', href: '#' },
]

const serviceLinks = [
  { label: 'Agentes AI', href: '/servicios' },
  { label: 'Automatización', href: '/servicios' },
  { label: 'Consultoría AI', href: '/servicios' },
  { label: 'Desarrollo a Medida', href: '/servicios' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block transition-opacity duration-300 hover:opacity-80">
              <Image
                src="/logo.png"
                alt="Evolution.AI"
                width={160}
                height={46}
                className="h-11 w-auto"
              />
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

          {/* Social */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold tracking-wider text-foreground uppercase">
              Síguenos
            </h4>
            <ul className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-muted transition-colors duration-300 hover:text-primary-400"
                  >
                    {link.label}
                  </a>
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
