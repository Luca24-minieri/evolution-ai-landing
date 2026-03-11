import type { Metadata } from 'next'
import Faq from '@/components/sections/Faq'
import CtaBanner from '@/components/sections/CtaBanner'
import TypewriterStack from '@/components/transitions/TypewriterStack'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Preguntas frecuentes sobre nuestros servicios de inteligencia artificial, plazos, tecnologías y proceso de trabajo.',
}

export default function FaqPage() {
  return (
    <TypewriterStack>
      <div className="pt-20">
        <Faq />
        <CtaBanner />
      </div>
    </TypewriterStack>
  )
}
