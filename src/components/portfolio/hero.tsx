'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, MapPin, Download } from 'lucide-react'
import { WaterButton, WaterLink } from './water-button'
import { profile, stats } from '@/data/portfolio'

export function Hero() {
  return (
    <section
      id="top"
      className="dot-grid relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* ambient blobs */}
      <div className="blob blob-teal left-[-6%] top-[8%] h-72 w-72" />
      <div className="blob blob-rose right-[-4%] top-[14%] h-80 w-80" />
      <div className="blob blob-amber bottom-[-10%] left-[40%] h-72 w-72" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
          >
            <Sparkles className="h-3.5 w-3.5 text-teal-400" />
            <span>{profile.brand}</span>
            <span className="text-slate-500">·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" /> Chennai, India
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 text-xl font-medium text-gradient sm:text-2xl"
          >
            {profile.headline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <WaterButton
              variant="primary"
              onClick={() =>
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-6 py-2.5 font-semibold"
            >
              View My Work <ArrowRight className="h-4 w-4" />
            </WaterButton>
            <WaterButton
              variant="outline"
              onClick={() =>
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-6 py-2.5 font-semibold text-white"
            >
              Get in Touch
            </WaterButton>
            <WaterLink
              variant="outline"
              href="/resume.pdf"
              download
              className="px-6 py-2.5 font-semibold text-white"
            >
              Download Resume <Download className="h-4 w-4" />
            </WaterLink>
          </motion.div>

          {/* stats */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-xl px-3 py-3 text-center"
              >
                <dt className="text-lg font-bold text-white sm:text-xl">
                  {s.value}
                </dt>
                <dd className="mt-0.5 text-[11px] text-slate-400">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right: 3D flow centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="relative mx-auto flex h-[340px] w-full max-w-md items-center justify-center sm:h-[440px]"
        >
          {/* hero image backdrop */}
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10">
            <img
              src="/portfolio/hero-flow.png"
              alt="Abstract 3D flowing shapes representing the Ultra Designer creative-tech aesthetic"
              className="h-full w-full object-cover opacity-70"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#07070d] via-transparent to-transparent" />
          </div>

          {/* rotating wireframe cube + orbit rings */}
          <div className="scene-3d relative float-slow">
            <div className="orbit-ring" />
            <div className="orbit-ring r2" />
            <div className="cube lg">
              <div className="face f-front" />
              <div className="face f-back" />
              <div className="face f-right" />
              <div className="face f-left" />
              <div className="face f-top" />
              <div className="face f-bottom" />
            </div>
          </div>

          {/* floating mini badges */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass float-med absolute left-2 top-8 rounded-xl px-3 py-2 text-xs text-slate-200 sm:left-0"
          >
            <span className="text-teal-300">●</span> 3D & Animation
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="glass float-slow absolute bottom-10 right-1 rounded-xl px-3 py-2 text-xs text-slate-200 sm:right-0"
          >
            <span className="text-rose-400">●</span> Generative AI
          </motion.div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-slate-500">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-teal-400" />
        </div>
      </div>
    </section>
  )
}
