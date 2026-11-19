'use client'

import * as React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { playWaterDrop } from '@/lib/sound'

type Variant = 'primary' | 'outline' | 'pill'

type Ripple = { id: number; x: number; y: number; size: number }

/* Jelly wobble (buoyancy) on hover */
const WOBBLE = {
  scale: [1, 1.05, 0.97, 1.02, 1],
  transition: { duration: 0.45, ease: 'easeOut', times: [0, 0.4, 0.6, 0.8, 1] },
}

/* Squishy elastic bounce on tap */
const TAP = {
  scale: 0.92,
  transition: { type: 'spring', stiffness: 500, damping: 11 },
}

/** Tracks click/touch ripples + cursor-follow glow variables for a target. */
function useWaterFx() {
  const [ripples, setRipples] = React.useState<Ripple[]>([])
  const idRef = React.useRef(0)

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const size = Math.hypot(r.width, r.height) * 1.6
    const id = idRef.current++
    setRipples((s) => [...s, { id, x, y, size }])
    window.setTimeout(
      () => setRipples((s) => s.filter((rp) => rp.id !== id)),
      640,
    )
  }

  return { ripples, onPointerMove, onPointerDown }
}

function RippleLayer({ ripples }: { ripples: Ripple[] }) {
  return (
    <>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="water-ripple"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}
    </>
  )
}

type WaterButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  variant?: Variant
  active?: boolean
  children: React.ReactNode
}

export const WaterButton = React.forwardRef<HTMLButtonElement, WaterButtonProps>(
  function WaterButton(
    {
      variant = 'primary',
      active,
      className,
      onPointerMove,
      onPointerDown,
      children,
      ...props
    },
    ref,
  ) {
    const fx = useWaterFx()
    return (
      <motion.button
        ref={ref}
        whileHover={WOBBLE}
        whileTap={TAP}
        onPointerMove={(e) => {
          fx.onPointerMove(e)
          onPointerMove?.(e)
        }}
        onPointerDown={(e) => {
          fx.onPointerDown(e)
          playWaterDrop()
          onPointerDown?.(e)
        }}
        className={cn('water-cube', variant, className)}
        data-active={active ? 'true' : undefined}
        {...props}
      >
        <RippleLayer ripples={fx.ripples} />
        <span className="relative z-[3] inline-flex items-center justify-center gap-1.5">
          {children}
        </span>
      </motion.button>
    )
  },
)

type WaterLinkProps = Omit<HTMLMotionProps<'a'>, 'children'> & {
  variant?: Variant
  children: React.ReactNode
}

export const WaterLink = React.forwardRef<HTMLAnchorElement, WaterLinkProps>(
  function WaterLink(
    {
      variant = 'pill',
      className,
      onPointerMove,
      onPointerDown,
      children,
      ...props
    },
    ref,
  ) {
    const fx = useWaterFx()
    return (
      <motion.a
        ref={ref}
        whileHover={WOBBLE}
        whileTap={TAP}
        onPointerMove={(e) => {
          fx.onPointerMove(e)
          onPointerMove?.(e)
        }}
        onPointerDown={(e) => {
          fx.onPointerDown(e)
          playWaterDrop()
          onPointerDown?.(e)
        }}
        className={cn('water-cube', variant, className)}
        {...props}
      >
        <RippleLayer ripples={fx.ripples} />
        <span className="relative z-[3] inline-flex items-center justify-center">
          {children}
        </span>
      </motion.a>
    )
  },
)
