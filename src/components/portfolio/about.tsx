'use client'

import { motion } from 'framer-motion'
import { User, Zap, Layers, Cpu } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { profile } from '@/data/portfolio'

const pillars = [
  {
    icon: Layers,
    title: '3D & Motion',
    text: 'Modeling, animation, and visual storytelling with Maya & Blender.',
  },
  {
    icon: Zap,
    title: 'Brand & UI/UX',
    text: 'Identity systems, posters, and interactive prototypes that convert.',
  },
  {
    icon: Cpu,
    title: 'AI & Web',
    text: 'Prompt engineering, Python, and Flask-powered AI web apps.',
  },
]

export function About() {
  return (
    <section id="about" className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow="About Me"
        title={
          <>
            Where <span className="text-gradient">visual craft</span> meets
            modern technology
          </>
        }
        description={profile.summary}
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass group relative overflow-hidden rounded-2xl p-5 transition-colors hover:border-teal-400/40"
          >
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400/20 to-rose-500/20 text-teal-300 ring-1 ring-white/10">
              <p.icon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white">{p.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
              {p.text}
            </p>
            <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-teal-400/10 blur-2xl transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>

      {/* identity strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="glass mt-4 flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-teal-300 ring-1 ring-white/10">
          <User className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-300">
            I'm <span className="font-semibold text-white">{profile.name}</span>,
            the designer behind{' '}
            <span className="font-semibold text-teal-300">
              {profile.brand} ({profile.brandShort})
            </span>
            . I bridge visual storytelling and modern technology — combining 3D,
            UI/UX and brand identity with Generative AI and web development.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
