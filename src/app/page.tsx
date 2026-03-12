import Hero from '@/components/sections/Hero'
import SocialProof from '@/components/sections/SocialProof'
import ServicesPreview from '@/components/sections/ServicesPreview'
import ProcessPreview from '@/components/sections/ProcessPreview'
import AboutPreview from '@/components/sections/AboutPreview'
import CtaBanner from '@/components/sections/CtaBanner'
import FaqPreview from '@/components/sections/FaqPreview'
import ContactPreview from '@/components/sections/ContactPreview'

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <ServicesPreview />
      <ProcessPreview />
      <AboutPreview />
      <CtaBanner />
      <FaqPreview />
      <ContactPreview />
    </>
  )
}
