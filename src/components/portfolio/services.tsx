'use client'

import { motion } from 'framer-motion'
import { PenTool, Megaphone, Gem, MonitorSmartphone, MessageCircle } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { WaterLink } from './water-button'

const WHATSAPP_URL =
  'https://wa.me/916369010630?text=Hi%20Bharani,%20I%20am%20interested%20in%20your%20design%20services'

type Service = {
  icon: React.ElementType
  title: string
  text: string
  accent: string
}

const services: Service[] = [
  {
    icon: PenTool,
    title: 'Logo & Brand Identity',
    text: 'Custom UD-style monograms, brand guidelines, and complete identity systems that make businesses memorable.',
    accent: 'text-teal-300',
  },
  {
    icon: Megaphone,
    title: 'Posters & Promotional Design',
    text: 'Fest posters, corporate campaigns, and event collateral engineered to convert — like the AEROdrone & ROBO Tech Fest 2026 series.',
    accent: 'text-rose-300',
  },
  {
    icon: Gem,
    title: '3D Modeling & Jewelry Concepts',
    text: 'High-detail jewelry concepts, interlocking pendant mechanisms, and manufacturing-ready technical sheets.',
    accent: 'text-amber-300',
  },
  {
    icon: MonitorSmartphone,
    title: 'UI/UX & Web Design',
    text: 'Interactive Figma prototypes, AI-powered web apps, and clean responsive interfaces built to ship.',
    accent: 'text-emerald-300',
  },
]

export function Services() {
  return (
    <section
      id="services"
      className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <SectionHeading
        eyebrow="Ultra Designer (UD) · Services"
        title={
          <>
            Design services that <span className="text-gradient">ship</span>
          </>
        }
        description="Pick a service and get an instant quote on WhatsApp — I usually reply within a few hours."
      />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass group relative flex flex-col overflow-hidden rounded-2xl p-6"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <s.icon className={'h-5 w-5 ' + s.accent} />
              </div>
              <h3 className="text-base font-semibold text-white sm:text-lg">
                {s.title}
              </h3>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
              {s.text}
            </p>
            <WaterLink
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              variant="primary"
              className="mt-5 self-start px-5 py-2 text-sm font-semibold"
            >
              <MessageCircle className="h-4 w-4" />
              Get Quote on WhatsApp
            </WaterLink>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
