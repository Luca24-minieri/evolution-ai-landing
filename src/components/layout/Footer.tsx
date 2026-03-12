import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { NAV_LINKS } from '@/lib/utils'
import LogoIcon from '@/components/ui/LogoIcon'

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
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-80">
              <LogoIcon className="h-11 w-11" />
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
                    className="inline-block py-1 font-body text-sm text-muted transition-colors duration-300 hover:text-primary-400"
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
                    className="inline-block py-1 font-body text-sm text-muted transition-colors duration-300 hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold tracking-wider text-foreground uppercase">
              Contacto
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:sebastiandiuana@evolutionai.cl"
                  className="flex items-center gap-2 font-body text-sm text-muted transition-colors duration-300 hover:text-primary-400"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                  sebastiandiuana@evolutionai.cl
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/56975231022"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-muted transition-colors duration-300 hover:text-primary-400"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                  +56 9 7523 1022
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="font-body text-sm text-muted">
            &copy; {new Date().getFullYear()} Evolution.AI — Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-muted/60">
            Hecho con IA en Santiago, Chile
          </p>
        </div>
      </div>
    </footer>
  )
}
