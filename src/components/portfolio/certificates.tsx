'use client'

import { motion } from 'framer-motion'
import { Award, BadgeCheck } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { certificates } from '@/data/portfolio'

export function Certificates() {
  return (
    <section
      id="certificates"
      className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <SectionHeading
        eyebrow="Certificates"
        title={
          <>
            Recognized <span className="text-gradient">credentials</span>
          </>
        }
        description="Formal certifications backing my AI and design practice."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {certificates.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass group relative flex items-start gap-4 overflow-hidden rounded-2xl p-6 transition-colors hover:border-amber-500/40"
          >
            <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 text-amber-300 ring-1 ring-white/10">
              <Award className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-white">{c.title}</h3>
                <BadgeCheck className="h-4 w-4 flex-shrink-0 text-teal-400" />
              </div>
              <p className="mt-0.5 text-xs text-slate-500">Issued by {c.issuer}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {c.detail}
              </p>
            </div>
            <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
