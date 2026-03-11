import type { Metadata } from 'next'
import Services from '@/components/sections/Services'
import CtaBanner from '@/components/sections/CtaBanner'
import GridMaterialize from '@/components/transitions/GridMaterialize'

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Agentes AI, automatización inteligente, desarrollo web, chatbots y consultoría en inteligencia artificial. Soluciones a medida para escalar tu negocio.',
}

export default function ServiciosPage() {
  return (
    <GridMaterialize>
      <div className="pt-20">
        <Services />
        <CtaBanner />
      </div>
    </GridMaterialize>
  )
}
