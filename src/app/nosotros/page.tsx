import type { Metadata } from 'next'
import WhyUs from '@/components/sections/WhyUs'
import About from '@/components/sections/About'
import CtaBanner from '@/components/sections/CtaBanner'
import CurtainReveal from '@/components/transitions/CurtainReveal'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Somos Evolution.AI — una agencia especializada en inteligencia artificial y desarrollo de software. Innovación, compromiso, excelencia y adaptabilidad.',
}

export default function NosotrosPage() {
  return (
    <CurtainReveal>
      <div className="pt-20">
        <WhyUs />
        <About />
        <CtaBanner />
      </div>
    </CurtainReveal>
  )
}
