'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { WaterButton } from './water-button'

type Msg = { from: 'ud' | 'user'; text: string }

const QUICK_REPLIES = [
  'What tools do you use?',
  'Tell me about your projects',
  'How can I hire you?',
  'What is your education?',
]

/** Local, keyword-based answer engine (no external API). */
function answer(qRaw: string): string {
  const q = qRaw.toLowerCase()
  const has = (...k: string[]) => k.some((w) => q.includes(w))

  if (has('tool', 'software', 'tech stack', 'use'))
    return "I work across 3D (Autodesk Maya, Blender), design & UI/UX (Photoshop, Illustrator, CorelDRAW, Figma, Canva), and tech & AI (Generative AI, Prompt Engineering, Python, SQL, HTML, CSS, JavaScript, Flask)."

  if (has('project', 'work', 'portfolio'))
    return "My key projects are: the Ultra Designer (UD) brand & freelance portfolio, an AI Resume Builder web app, bespoke jewelry concepts & technical sheets, and UI/UX prototyping with pencil-to-digital illustrations. Scroll to the Projects section for details!"

  if (has('hire', 'work with', 'commission', 'quote', 'price', 'whatsapp', 'service'))
    return "Easy! Head to the Services section and tap 'Get Quote on WhatsApp', or use the Contact form. You can also WhatsApp me directly at +91 6369010630. I usually reply within a few hours."

  if (has('education', 'study', 'university', 'degree', 'student'))
    return "I'm a final-year B.Sc. Animation student at Alagappa University (expected graduation 2027), with a Higher Secondary Certificate (Bio Maths) from Pullur Higher Secondary School (2024)."

  if (has('certificate', 'certification', 'ai course'))
    return "I'm certified by Magic Bus in Generative AI and foundational AI workflows."

  if (has('contact', 'email', 'phone', 'reach', 'location'))
    return "I'm based in Chennai, Tamil Nadu, India. Email: bharanirajan360@gmail.com · Phone: +91 6369010630. The Contact section has a form and all my links."

  if (has('who', 'about', 'yourself', 'you are', 'bharani', 'ultra designer', 'ud'))
    return "I'm S. Bharani Rajan — the designer behind Ultra Designer (UD). I'm a 3D Animator, Graphic Designer & AI Enthusiast bridging visual storytelling and modern technology."

  if (has('resume', 'cv', 'download'))
    return "You can download my resume using the 'Download Resume' button in the hero section at the top of the page."

  if (has('hello', 'hi', 'hey', 'namaste'))
    return "Hey there! I'm UD, Bharani's mini assistant. Ask me about my tools, projects, services, or how to hire me."

  return "Good question! I'm a mini assistant with info on Bharani's tools, projects, services, education and contact. Try one of the quick replies below, or ask about any of those topics."
}

export function AskUdAssistant() {
  const [open, setOpen] = React.useState(false)
  const [msgs, setMsgs] = React.useState<Msg[]>([
    {
      from: 'ud',
      text: "Hi! I'm UD, Bharani's mini assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = React.useState('')
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [msgs, open])

  const ask = (q: string) => {
    const question = q.trim()
    if (!question) return
    setMsgs((m) => [...m, { from: 'user', text: question }])
    setInput('')
    // small natural delay
    window.setTimeout(() => {
      setMsgs((m) => [...m, { from: 'ud', text: answer(question) }])
    }, 350)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="glass flex w-[min(90vw,22rem)] flex-col overflow-hidden rounded-2xl"
            role="dialog"
            aria-label="Ask UD assistant"
          >
            {/* header */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 via-rose-500 to-amber-400 text-xs font-extrabold text-[#0a0a0f]">
                UD
              </span>
              <div className="leading-none">
                <p className="text-sm font-semibold text-white">Ask UD</p>
                <p className="mt-0.5 text-[11px] text-teal-300">
                  Ultra Designer assistant
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="ml-auto rounded-md p-1 text-slate-400 transition-colors hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* messages */}
            <div
              ref={scrollRef}
              className="max-h-72 min-h-44 space-y-2.5 overflow-y-auto p-3"
            >
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={
                    'flex ' +
                    (m.from === 'user' ? 'justify-end' : 'justify-start')
                  }
                >
                  <div
                    className={
                      'max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ' +
                      (m.from === 'user'
                        ? 'bg-teal-400/20 text-teal-50 ring-1 ring-teal-400/30'
                        : 'bg-white/5 text-slate-200 ring-1 ring-white/10')
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* quick replies */}
            <div className="flex flex-wrap gap-1.5 border-t border-white/10 px-3 pt-2.5">
              {QUICK_REPLIES.map((qr) => (
                <button
                  key={qr}
                  onClick={() => ask(qr)}
                  className="rounded-full border border-teal-400/25 bg-teal-400/5 px-2.5 py-1 text-[11px] text-teal-200 transition-colors hover:bg-teal-400/15"
                >
                  {qr}
                </button>
              ))}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                ask(input)
              }}
              className="flex items-center gap-2 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-teal-400/50"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-[#04140f] transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* floating launcher — glowing water cube */}
      <WaterButton
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close assistant' : 'Open Ask UD assistant'}
        className="relative h-14 w-14 !rounded-full !px-0"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-teal-400/30" />
        {open ? (
          <X className="h-6 w-6 text-teal-200" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 text-teal-200" />
            <Sparkles className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 text-amber-300" />
          </>
        )}
      </WaterButton>
    </div>
  )
}
