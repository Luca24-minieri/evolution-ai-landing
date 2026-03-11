import type { Metadata } from 'next'
import Contact from '@/components/sections/Contact'
import SplitSlide from '@/components/transitions/SplitSlide'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contáctanos para conversar sobre cómo la inteligencia artificial puede transformar tu empresa. Respuesta en menos de 24 horas.',
}

export default function ContactoPage() {
  return (
    <SplitSlide>
      <div className="pt-20">
        <Contact />
      </div>
    </SplitSlide>
  )
}
