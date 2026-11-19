'use client'

import { motion } from 'framer-motion'
import { Box, Palette, Cpu } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { skillGroups, type SkillGroup } from '@/data/portfolio'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  cube: Box,
  palette: Palette,
  cpu: Cpu,
}

const accentMap: Record<
  SkillGroup['accent'],
  { ring: string; text: string; chip: string; dot: string }
> = {
  teal: {
    ring: 'ring-teal-400/30',
    text: 'text-teal-300',
    chip: 'border-teal-400/30 bg-teal-400/10 text-teal-200',
    dot: 'bg-teal-400',
  },
  rose: {
    ring: 'ring-rose-500/30',
    text: 'text-rose-300',
    chip: 'border-rose-500/30 bg-rose-500/10 text-rose-200',
    dot: 'bg-rose-400',
  },
  amber: {
    ring: 'ring-amber-500/30',
    text: 'text-amber-300',
    chip: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
    dot: 'bg-amber-400',
  },
}

// Duplicated list for the seamless marquee
const tickerSkills = skillGroups.flatMap((g) => g.skills)

export function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <SectionHeading
        eyebrow="Skills & Tools"
        title={
          <>
            A versatile, <span className="text-gradient">cross-disciplinary</span>{' '}
            toolkit
          </>
        }
        description="Grouped across 3D, design, and tech — the stack I use to take ideas from sketch to ship."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {skillGroups.map((g, i) => {
          const a = accentMap[g.accent]
          const Icon = iconMap[g.icon] ?? Box
          return (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass relative overflow-hidden rounded-2xl p-6"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ring-1',
                    a.ring,
                    a.text,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">{g.title}</h3>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
                      a.chip,
                    )}
                  >
                    <span className={cn('h-1.5 w-1.5 rounded-full', a.dot)} />
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Marquee ticker */}
      <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] py-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#07070d] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#07070d] to-transparent" />
        <div className="marquee gap-8 px-4">
          {[...tickerSkills, ...tickerSkills].map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-slate-400"
            >
              <span className="h-1 w-1 rounded-full bg-teal-400/70" />
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
