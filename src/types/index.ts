export interface NavLink {
  label: string
  href: string
}

export interface Service {
  icon: string
  title: string
  description: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  avatar?: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}
