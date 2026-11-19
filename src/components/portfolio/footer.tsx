'use client'

import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { UdLogo } from './ud-logo'
import { BehanceIcon } from './behance-icon'
import { WaterButton, WaterLink } from './water-button'
import { profile, navLinks } from '@/data/portfolio'

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#070710]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <UdLogo className="h-9 w-9 text-sm" />
              <div className="leading-none">
                <p className="text-sm font-bold text-white">{profile.brand}</p>
                <p className="text-[11px] text-slate-400">{profile.name}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {profile.tagline} Building engaging digital experiences at the
              intersection of design, 3D, and AI.
            </p>
          </div>

          {/* quick links */}
          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-1">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() =>
                  document
                    .getElementById(l.id)
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="w-fit text-sm text-slate-400 transition-colors hover:text-teal-300"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* socials */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Connect
            </p>
            <div className="mt-3 flex gap-2">
              {[
                { icon: Github, href: profile.github, label: 'GitHub' },
                { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
                { icon: BehanceIcon, href: profile.behance, label: 'Behance' },
                { icon: Mail, href: profile.emailHref, label: 'Email' },
              ].map((s) => (
                <WaterLink
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  variant="pill"
                  className="h-10 w-10 !rounded-xl"
                >
                  <s.icon className="h-4 w-4" />
                </WaterLink>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">{profile.location}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.brand}. All
            rights reserved.
          </p>
          <WaterButton
            variant="pill"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="gap-1.5 px-3 py-1.5 text-xs text-slate-300"
          >
            Back to top <ArrowUp className="h-3 w-3" />
          </WaterButton>
        </div>
      </div>
    </footer>
  )
}
