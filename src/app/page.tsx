import { Navbar } from '@/components/portfolio/navbar'
import { Hero } from '@/components/portfolio/hero'
import { About } from '@/components/portfolio/about'
import { Education } from '@/components/portfolio/education'
import { Skills } from '@/components/portfolio/skills'
import { Projects } from '@/components/portfolio/projects'
import { BeforeAfter } from '@/components/portfolio/before-after'
import { Certificates } from '@/components/portfolio/certificates'
import { Services } from '@/components/portfolio/services'
import { Contact } from '@/components/portfolio/contact'
import { Footer } from '@/components/portfolio/footer'
import { AskUdAssistant } from '@/components/portfolio/ask-ud-assistant'
import { WaterRippleCanvas } from '@/components/portfolio/water-ripple-canvas'

export default function Home() {
  return (
    <div className="portfolio-bg relative flex min-h-screen flex-col overflow-x-hidden text-slate-200">
      {/* Water ripple background (fixed, behind content, pointer-events:none) */}
      <WaterRippleCanvas />

      {/* top progress accent line */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent" />

      {/* All interactive content sits above the canvas */}
      <div className="relative z-10 flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <BeforeAfter />
          <Certificates />
          <Services />
          <Contact />
        </main>
        <Footer />

        {/* Floating Ask UD assistant */}
        <AskUdAssistant />
      </div>
    </div>
  )
}
