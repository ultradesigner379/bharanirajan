'use client'

import * as React from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { WaterButton } from './water-button'
import {
  isSoundEnabled,
  setSoundEnabled,
  subscribeSound,
  playWaterDrop,
} from '@/lib/sound'

/**
 * Navbar mute/unmute toggle. Muted by default. When enabling, plays a single
 * droplet as confirmation; WaterButton handles subsequent drops automatically.
 */
export function SoundToggle() {
  const [on, setOn] = React.useState(false)

  React.useEffect(() => {
    setOn(isSoundEnabled())
    return subscribeSound(setOn)
  }, [])

  const toggle = () => {
    const next = !on
    setSoundEnabled(next)
    if (next) playWaterDrop()
  }

  return (
    <WaterButton
      variant="pill"
      onClick={toggle}
      aria-label={on ? 'Mute water sounds' : 'Unmute water sounds'}
      aria-pressed={on}
      title={on ? 'Water sounds on' : 'Water sounds off'}
      className="h-9 w-9 !px-0"
    >
      {on ? (
        <Volume2 className="h-4 w-4 text-teal-300" />
      ) : (
        <VolumeX className="h-4 w-4 text-slate-400" />
      )}
    </WaterButton>
  )
}
