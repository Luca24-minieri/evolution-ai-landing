import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Evolution.AI — Inteligencia Artificial para tu Negocio',
    template: '%s | Evolution.AI',
  },
  description:
    'Transformamos negocios con inteligencia artificial. Automatización inteligente, agentes AI y soluciones personalizadas para escalar tu empresa al siguiente nivel.',
  keywords: [
    'inteligencia artificial',
    'automatización',
    'agentes AI',
    'machine learning',
    'transformación digital',
    'consultoría AI',
    'chatbots',
    'Evolution AI',
  ],
  authors: [{ name: 'Evolution.AI' }],
  creator: 'Evolution.AI',
  metadataBase: new URL('https://evolution-ai.com'),
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://evolution-ai.com',
    siteName: 'Evolution.AI',
    title: 'Evolution.AI — Inteligencia Artificial para tu Negocio',
    description:
      'Transformamos negocios con inteligencia artificial. Automatización, agentes AI y soluciones personalizadas.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Evolution.AI — Inteligencia Artificial para tu Negocio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evolution.AI — Inteligencia Artificial para tu Negocio',
    description:
      'Transformamos negocios con inteligencia artificial. Automatización, agentes AI y soluciones personalizadas.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${syne.variable} ${dmSans.variable} antialiased`}
      >
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
