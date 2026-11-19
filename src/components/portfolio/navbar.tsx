'use client'

import * as React from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { UdLogo } from './ud-logo'
import { WaterButton } from './water-button'
import { SoundToggle } from './sound-toggle'
import { navLinks } from '@/data/portfolio'

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [active, setActive] = React.useState<string>('about')

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrollspy
  React.useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[]
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ' +
        (scrolled
          ? 'border-b border-white/10 bg-[#07070d]/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent')
      }
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5"
          aria-label="Ultra Designer — back to top"
        >
          <UdLogo className="h-9 w-9 text-sm" />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-sm font-bold text-white">Ultra Designer</span>
            <span className="text-[11px] text-slate-400">S. Bharani Rajan</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="ml-auto hidden items-center gap-1.5 md:flex">
          {navLinks.map((l) => (
            <WaterButton
              key={l.id}
              variant="pill"
              active={active === l.id}
              onClick={() => go(l.id)}
              className="px-3.5 py-1.5 text-sm font-medium"
            >
              {l.label}
            </WaterButton>
          ))}
        </div>

        <WaterButton
          variant="primary"
          onClick={() => go('contact')}
          className="ml-auto hidden px-5 py-2 text-sm font-semibold md:ml-2 md:inline-flex"
        >
          Hire Me
          <ArrowUpRight className="h-3.5 w-3.5" />
        </WaterButton>

        {/* Water sound mute/unmute */}
        <div className="ml-auto md:ml-2">
          <SoundToggle />
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={
          'overflow-hidden border-t border-white/10 bg-[#07070d]/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ' +
          (open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0')
        }
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1.5 px-4 py-3 sm:px-6">
          {navLinks.map((l) => (
            <WaterButton
              key={l.id}
              variant="pill"
              active={active === l.id}
              onClick={() => go(l.id)}
              className="justify-start px-4 py-2.5 text-left text-sm font-medium"
            >
              {l.label}
            </WaterButton>
          ))}
          <WaterButton
            variant="primary"
            onClick={() => go('contact')}
            className="mt-1.5 self-start px-5 py-2 text-sm font-semibold"
          >
            Hire Me <ArrowUpRight className="h-3.5 w-3.5" />
          </WaterButton>
        </div>
      </div>
    </header>
  )
}
