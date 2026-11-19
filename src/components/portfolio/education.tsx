'use client'

import { motion } from 'framer-motion'
import { GraduationCap, CalendarDays, MapPin } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { education } from '@/data/portfolio'

export function Education() {
  return (
    <section
      id="education"
      className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <SectionHeading
        eyebrow="Education"
        title={
          <>
            Academic <span className="text-gradient">foundation</span>
          </>
        }
        description="A blend of creative animation studies and an analytical Bio-Maths background."
      />

      <div className="relative mt-10 pl-6 sm:pl-8">
        {/* vertical line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-teal-400/60 via-rose-500/40 to-transparent" />

        <div className="flex flex-col gap-6">
          {education.map((e, i) => (
            <motion.div
              key={e.degree}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* node */}
              <span className="absolute -left-[26px] top-6 h-3 w-3 rounded-full bg-teal-400 ring-4 ring-teal-400/15 sm:-left-[34px]" />

              <div className="glass rounded-2xl p-6 transition-colors hover:border-teal-400/40">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-teal-300 ring-1 ring-white/10 sm:flex">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {e.degree}
                      </h3>
                      <p className="mt-0.5 text-sm text-slate-400">
                        {e.institution}
                      </p>
                    </div>
                  </div>
                  {e.status && (
                    <span className="inline-flex w-fit items-center rounded-full border border-teal-400/30 bg-teal-400/10 px-2.5 py-0.5 text-xs font-medium text-teal-300">
                      {e.status}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-teal-400" />
                    {e.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-rose-400" />
                    India
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {e.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
