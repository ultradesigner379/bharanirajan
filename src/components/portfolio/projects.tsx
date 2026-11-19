'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, Check } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { SectionHeading } from './section-heading'
import { WaterButton } from './water-button'
import { projects, type Project } from '@/data/portfolio'

/** Filter tab categories requested for the project grid. */
type FilterTag = '3d-animation' | 'graphic-design' | 'ai-web'

const filters: { id: FilterTag | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: '3d-animation', label: '3D & Animation' },
  { id: 'graphic-design', label: 'Graphic Design' },
  { id: 'ai-web', label: 'AI & Web' },
]

/** Map each project to a filter category (leaves project data untouched). */
const projectFilter: Record<string, FilterTag> = {
  'ud-brand': 'graphic-design',
  'resume-ai': 'ai-web',
  jewelry: '3d-animation',
  uiux: 'graphic-design',
}

export function Projects() {
  const [selected, setSelected] = React.useState<Project | null>(null)
  const [filter, setFilter] = React.useState<FilterTag | 'all'>('all')

  const visible = React.useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((p) => projectFilter[p.id] === filter),
    [filter],
  )

  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <SectionHeading
        eyebrow="Projects"
        title={
          <>
            Selected <span className="text-gradient">work</span>
          </>
        }
        description="A snapshot of brand systems, AI apps, 3D design and UI/UX work. Tap any card to dive into the details."
      />

      {/* Filter tabs (water-cube pills) */}
      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <WaterButton
            key={f.id}
            variant="pill"
            active={filter === f.id}
            onClick={() => setFilter(f.id)}
            className="px-4 py-1.5 text-sm font-medium"
          >
            {f.label}
          </WaterButton>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.button
              key={p.id}
              layout
              onClick={() => setSelected(p)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group glass relative overflow-hidden rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/40 hover:shadow-[0_20px_60px_-20px_rgba(45,212,191,0.35)]"
            >
            {/* image */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/30 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/40 px-2.5 py-0.5 text-[11px] font-medium text-teal-200 backdrop-blur">
                {p.category}
              </span>
              <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>

            {/* body */}
            <div className="p-5">
              <h3 className="text-base font-semibold text-white sm:text-lg">
                {p.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
                {p.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tools.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.button>
        ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl overflow-hidden border-white/10 bg-[#0c0c16] p-0 text-slate-200 sm:rounded-2xl">
          {selected && (
            <>
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c16] via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-2.5 py-0.5 text-[11px] font-medium text-teal-200 backdrop-blur">
                  {selected.category}
                </span>
              </div>
              <div className="max-h-[50vh] overflow-y-auto p-6">
                <DialogHeader className="p-0">
                  <DialogTitle className="text-xl font-bold text-white">
                    {selected.title}
                  </DialogTitle>
                  <DialogDescription className="mt-2 text-sm leading-relaxed text-slate-400">
                    {selected.description}
                  </DialogDescription>
                </DialogHeader>

                {/* highlights */}
                <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Highlights
                </h4>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {selected.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-400" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* tools */}
                <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Tools & Tech
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selected.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-teal-400/20 bg-teal-400/5 px-3 py-1 text-xs font-medium text-teal-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
