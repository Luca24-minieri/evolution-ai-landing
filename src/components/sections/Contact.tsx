'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sebastiandiuana@evolutionai.cl',
    href: 'mailto:sebastiandiuana@evolutionai.cl',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+56 9 7523 1022',
    href: 'https://wa.me/56975231022',
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Santiago, Chile',
    href: undefined,
  },
]

const slideFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const slideFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
  }

  const inputClasses = cn(
    'w-full bg-transparent border border-white/[0.08] rounded-xl px-5 py-3.5',
    'text-foreground placeholder:text-muted text-base',
    'transition-all duration-300',
    'focus:outline-none focus:border-primary-500/50 focus:shadow-[0_0_20px_rgba(0,229,255,0.1)]',
    'hover:border-white/[0.15]'
  )

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-primary-500/[0.03] blur-[120px]" />
        <div className="absolute top-20 left-0 w-[300px] h-[300px] rounded-full bg-primary-700/[0.05] blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          tag="Contacto"
          title="Comienza tu evolución hoy"
          subtitle="Cuéntanos sobre tu proyecto"
        />

        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Form */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Nombre
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-company" className="sr-only">
                  Empresa
                </label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  placeholder="Empresa"
                  value={formData.company}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={cn(inputClasses, 'resize-none')}
                  required
                />
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                <span className="flex items-center gap-2">
                  Enviar mensaje
                  <Send className="w-4 h-4" />
                </span>
              </Button>
            </form>
          </motion.div>

          {/* Right: Contact info */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              {CONTACT_INFO.map((info) => {
                const content = (
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-primary-500/20">
                      <info.icon
                        className="w-5 h-5 text-primary-400"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted font-medium uppercase tracking-wider mb-1">
                        {info.label}
                      </p>
                      <p
                        className={cn(
                          'text-base sm:text-lg text-foreground transition-colors duration-300 break-all sm:break-normal',
                          info.href && 'group-hover:text-primary-400'
                        )}
                      >
                        {info.value}
                      </p>
                    </div>
                  </div>
                )

                return info.href ? (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      info.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    {content}
                  </a>
                ) : (
                  <div key={info.label}>{content}</div>
                )
              })}
            </div>

            {/* Response time note */}
            <div className="mt-10 p-5 rounded-xl bg-primary-500/[0.05] border border-primary-500/10">
              <p className="text-muted-light text-base leading-relaxed">
                <span className="text-primary-400 font-medium">⚡</span>{' '}
                Responderemos en menos de 24 horas. Agenda una llamada
                gratuita y sin compromiso para conversar sobre tu proyecto.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
