'use client'

import * as React from 'react'

/**
 * Full-viewport water ripple background.
 *
 * Uses a lightweight 2-buffer heightmap water simulation running on a
 * low-resolution grid (auto-scaled to keep cell count bounded for 60fps).
 * Pointer/touch movement perturbs the surface; the resulting height field is
 * rendered as a subtle, translucent cyan glow so the dark theme and text
 * readability are preserved.
 *
 * The canvas is `pointer-events:none` and sits behind all content; pointer
 * events are captured on `window` so the whole page drives the ripples.
 */
export function WaterRippleCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduceMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Offscreen low-res buffer for the simulation render (scaled up with smoothing).
    const off = document.createElement('canvas')
    const offCtx = off.getContext('2d', { alpha: true })
    if (!offCtx) return

    let w = 0
    let h = 0
    let dpr = 1
    let simW = 0
    let simH = 0
    let scale = 4
    let bufA: Float32Array
    let bufB: Float32Array
    let prev: Float32Array // latest computed frame
    let curr: Float32Array // older frame, overwritten next
    let img: ImageData

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Keep the shorter simulation side ~220–260 cells → bounded work per frame.
      scale = Math.max(3, Math.round(Math.min(w, h) / 240))
      simW = Math.max(2, Math.ceil(w / scale))
      simH = Math.max(2, Math.ceil(h / scale))
      bufA = new Float32Array(simW * simH)
      bufB = new Float32Array(simW * simH)
      prev = bufA
      curr = bufB
      off.width = simW
      off.height = simH
      img = offCtx.createImageData(simW, simH)
      // init transparent
      for (let i = 3; i < img.data.length; i += 4) img.data[i] = 0
    }

    setup()

    // ---- surface disturbance -------------------------------------------------
    const disturb = (x: number, y: number, radius: number, strength: number) => {
      const cx = (x / scale) | 0
      const cy = (y / scale) | 0
      const r = Math.max(1, (radius / scale) | 0)
      for (let dy = -r; dy <= r; dy++) {
        const py = cy + dy
        if (py < 1 || py >= simH - 1) continue
        for (let dx = -r; dx <= r; dx++) {
          const px = cx + dx
          if (px < 1 || px >= simW - 1) continue
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > r) continue
          // cosine falloff → soft, round dip
          const fall = Math.cos((dist / r) * Math.PI * 0.5)
          prev[py * simW + px] += fall * strength
        }
      }
    }

    // ---- pointer / touch input ----------------------------------------------
    let lastX = 0
    let lastY = 0
    let hasLast = false
    let lastT = 0

    const onPointer = (e: PointerEvent) => {
      const now = performance.now()
      const x = e.clientX
      const y = e.clientY
      if (now - lastT < 14) return // ~60fps cap on disturbance rate
      lastT = now
      if (hasLast) {
        // interpolate between samples for a continuous trail
        const dist = Math.hypot(x - lastX, y - lastY)
        const steps = Math.min(6, Math.ceil(dist / 14))
        for (let i = 1; i <= steps; i++) {
          const t = i / steps
          disturb(lastX + (x - lastX) * t, lastY + (y - lastY) * t, 9, 0.5)
        }
      } else {
        disturb(x, y, 9, 0.5)
      }
      lastX = x
      lastY = y
      hasLast = true
      cursorX = x
      cursorY = y
    }

    // Touch fallback (older browsers without pointer events)
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      const now = performance.now()
      if (now - lastT < 14) return
      lastT = now
      const x = t.clientX
      const y = t.clientY
      if (hasLast) {
        const dist = Math.hypot(x - lastX, y - lastY)
        const steps = Math.min(6, Math.ceil(dist / 14))
        for (let i = 1; i <= steps; i++) {
          const tt = i / steps
          disturb(lastX + (x - lastX) * tt, lastY + (y - lastY) * tt, 11, 0.7)
        }
      } else {
        disturb(x, y, 11, 0.7)
      }
      lastX = x
      lastY = y
      hasLast = true
      cursorX = x
      cursorY = y
    }

    // cursor glow position (light-refraction trail)
    let cursorX = -9999
    let cursorY = -9999

    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('resize', setup)

    // ---- render loop ---------------------------------------------------------
    let raf = 0
    const data = img.data
    const DAMPING = 0.986

    const render = () => {
      // 1) advance the wave equation one step into `curr`
      for (let y = 1; y < simH - 1; y++) {
        let i = y * simW + 1
        for (let x = 1; x < simW - 1; x++, i++) {
          const v =
            (prev[i - 1] + prev[i + 1] + prev[i - simW] + prev[i + simW]) *
              0.5 -
            curr[i]
          curr[i] = v * DAMPING
        }
      }
      // rotate buffers: latest frame becomes prev for next step
      const tmp = prev
      prev = curr
      curr = tmp

      // 2) render latest frame (now in `prev`) into the offscreen image
      let p = 0
      for (let y = 0; y < simH; y++) {
        for (let x = 0; x < simW; x++, p++) {
          const v = prev[p]
          const a = v < 0 ? -v : v
          const idx = p << 2
          if (a < 0.002) {
            data[idx] = 0
            data[idx + 1] = 0
            data[idx + 2] = 0
            data[idx + 3] = 0
          } else {
            const t = v < 0 ? 0 : v
            // cyan-ish glow; brighter on crests (highlights), subtle on troughs
            data[idx] = 45 + Math.min(120, t * 120) // R
            data[idx + 1] = 212 // G
            data[idx + 2] = 191 + Math.min(50, t * 60) // B
            data[idx + 3] = Math.min(120, a * 180) // A (kept low → subtle)
          }
        }
      }
      offCtx.putImageData(img, 0, 0)

      // 3) composite to the visible canvas, scaled up + smoothed
      ctx.clearRect(0, 0, w, h)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(off, 0, 0, w, h)

      // 4) soft cursor "light-refraction" trail glow
      if (cursorX > -9000) {
        const grad = ctx.createRadialGradient(
          cursorX,
          cursorY,
          0,
          cursorX,
          cursorY,
          90,
        )
        grad.addColorStop(0, 'rgba(94, 234, 212, 0.18)')
        grad.addColorStop(0.5, 'rgba(45, 212, 191, 0.06)')
        grad.addColorStop(1, 'rgba(45, 212, 191, 0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cursorX, cursorY, 90, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('resize', setup)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ opacity: 0.92 }}
    />
  )
}
