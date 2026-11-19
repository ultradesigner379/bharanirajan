'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { MoveHorizontal, PencilRuler, Sparkles } from 'lucide-react'
import { SectionHeading } from './section-heading'

/**
 * Draggable Before & After comparison slider.
 * Left = raw pencil sketch / wireframe, Right = final 3D render.
 * Works with mouse drag, touch drag, and click-to-position.
 */
export function BeforeAfter() {
  const [pos, setPos] = React.useState(50) // percent of the divider from left
  const [width, setWidth] = React.useState(0)
  const dragging = React.useRef(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Track container pixel width so the "before" image stays full-size
  // while being clipped by its parent (prevents image squish on resize).
  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setWidth(el.clientWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const p = ((clientX - r.left) / r.width) * 100
    setPos(Math.max(0, Math.min(100, p)))
  }

  // Pointer (mouse + pen + touch via pointer events)
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    updateFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    updateFromClientX(e.clientX)
  }
  const onPointerUp = () => {
    dragging.current = false
  }

  return (
    <section
      id="before-after"
      className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
    >
      <SectionHeading
        eyebrow="Process · Before & After"
        title={
          <>
            From <span className="text-gradient">pencil sketch</span> to
            polished 3D render
          </>
        }
        description="Drag the slider to compare the raw wireframe concept with the final digital design. Swap these placeholder images for your own anytime."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55 }}
        className="glass mt-8 overflow-hidden rounded-3xl p-2"
      >
        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="relative aspect-[16/9] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl"
          style={{ touchAction: 'none' }}
        >
          {/* AFTER (base layer, full width) */}
          <img
            src="/portfolio/after-render.png"
            alt="Final polished 3D render"
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          <span className="pointer-events-none absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[11px] font-medium text-teal-200 backdrop-blur">
            <Sparkles className="h-3 w-3" /> After · 3D Render
          </span>

          {/* BEFORE (clipped to the left of the divider) */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ width: `${pos}%` }}
          >
            <img
              src="/portfolio/before-sketch.png"
              alt="Raw pencil sketch wireframe"
              draggable={false}
              className="absolute inset-0 h-full max-w-none object-cover"
              style={{ width: width ? `${width}px` : '100%' }}
            />
            <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[11px] font-medium text-slate-200 backdrop-blur">
              <PencilRuler className="h-3 w-3" /> Before · Sketch
            </span>
          </div>

          {/* Divider + handle */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 z-20"
            style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-teal-300/80 via-white/60 to-rose-400/70 shadow-[0_0_12px_rgba(94,234,212,0.6)]" />
            <div className="water-cube absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-teal-200">
              <MoveHorizontal className="h-4 w-4" />
            </div>
          </div>
        </div>
      </motion.div>

      <p className="mt-3 text-center text-xs text-slate-500">
        Drag the handle, or tap anywhere on the image to move the divider.
      </p>
    </section>
  )
}
