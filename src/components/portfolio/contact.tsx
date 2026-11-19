'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Github,
  Linkedin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SectionHeading } from './section-heading'
import { BehanceIcon } from './behance-icon'
import { WaterButton } from './water-button'
import { profile } from '@/data/portfolio'

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'ok'; message: string }
  | { kind: 'error'; message: string }

const links = [
  { icon: MapPin, label: 'Location', value: profile.location, href: undefined },
  { icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref },
  { icon: Mail, label: 'Email', value: profile.email, href: profile.emailHref },
  { icon: Github, label: 'GitHub', value: profile.githubLabel, href: profile.github },
  { icon: Linkedin, label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin },
  { icon: BehanceIcon, label: 'Behance', value: profile.behanceLabel, href: profile.behance },
]

export function Contact() {
  const [status, setStatus] = React.useState<Status>({ kind: 'idle' })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus({ kind: 'loading' })
    const form = e.currentTarget
    const payload = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus({ kind: 'ok', message: data.message })
        form.reset()
      } else {
        setStatus({
          kind: 'error',
          message: data.error ?? 'Something went wrong. Please try again.',
        })
      }
    } catch {
      setStatus({
        kind: 'error',
        message: 'Network error. Please try again or email me directly.',
      })
    }
  }

  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <SectionHeading
        eyebrow="Contact"
        title={
          <>
            Let's build something{' '}
            <span className="text-gradient">remarkable</span>
          </>
        }
        description="Have a project, a freelance brief, or just want to say hello? Drop a message and I'll get back to you."
      />

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Links */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6 lg:col-span-2"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Reach me directly
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {links.map((l) => {
              const Inner = (
                <>
                  <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 text-teal-300 ring-1 ring-white/10">
                    <l.icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-wider text-slate-500">
                      {l.label}
                    </span>
                    <span className="block truncate text-sm text-slate-200">
                      {l.value}
                    </span>
                  </span>
                </>
              )
              return (
                <li key={l.label}>
                  {l.href ? (
                    <a
                      href={l.href}
                      target={l.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-white/5"
                    >
                      {Inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl p-1.5">
                      {Inner}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6 lg:col-span-3"
        >
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-medium text-slate-400">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus-visible:border-teal-400/50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-medium text-slate-400">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus-visible:border-teal-400/50"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-medium text-slate-400">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your project, timeline, and goals..."
                required
                className="resize-none border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus-visible:border-teal-400/50"
              />
            </div>

            <WaterButton
              type="submit"
              variant="primary"
              disabled={status.kind === 'loading'}
              className="w-fit px-6 py-2.5 font-semibold disabled:opacity-60"
            >
              {status.kind === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send className="h-4 w-4" />
                </>
              )}
            </WaterButton>

            {status.kind === 'ok' && (
              <div className="flex items-start gap-2 rounded-lg border border-teal-400/30 bg-teal-400/10 p-3 text-sm text-teal-200">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{status.message}</span>
              </div>
            )}
            {status.kind === 'error' && (
              <div className="flex items-start gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{status.message}</span>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
