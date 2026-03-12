import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* ── Site Constants ── */
export const SITE_CONFIG = {
  name: 'Evolution.AI',
  description: 'Transformamos negocios con inteligencia artificial. Automatización, agentes AI y soluciones personalizadas para escalar tu empresa.',
  url: 'https://evolution-ai.com',
  ogImage: '/og-image.jpg',
} as const

export const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
] as const
