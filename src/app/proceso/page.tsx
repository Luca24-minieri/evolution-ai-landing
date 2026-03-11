import type { Metadata } from 'next'
import Process from '@/components/sections/Process'
import CtaBanner from '@/components/sections/CtaBanner'
import TimelineDraw from '@/components/transitions/TimelineDraw'

export const metadata: Metadata = {
  title: 'Proceso',
  description:
    'Nuestro proceso de trabajo: desde el descubrimiento hasta la optimización continua. Metodología clara, transparente y orientada a resultados.',
}

export default function ProcesoPage() {
  return (
    <TimelineDraw>
      <div className="pt-20">
        <Process />
        <CtaBanner />
      </div>
    </TimelineDraw>
  )
}
