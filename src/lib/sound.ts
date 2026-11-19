/**
 * Water-droplet sound manager (Web Audio API).
 *
 * A tiny singleton that synthesises a soft water droplet on demand and tracks
 * a global "sound enabled" flag. The navbar SoundToggle flips the flag; every
 * WaterButton calls `playWaterDrop()` on pointer-down (a no-op when muted, so
 * existing behaviour is unchanged by default).
 */

let ctx: AudioContext | null = null
let enabled = false
const listeners = new Set<(v: boolean) => void>()

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  return ctx
}

export function isSoundEnabled(): boolean {
  return enabled
}

export function setSoundEnabled(v: boolean): void {
  if (enabled === v) return
  enabled = v
  if (v) {
    const c = getCtx()
    if (c && c.state === 'suspended') void c.resume()
  }
  listeners.forEach((l) => l(v))
}

export function subscribeSound(cb: (v: boolean) => void): () => void {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

/**
 * Synthesise a very subtle, short water droplet.
 * - A sine "plink" with a fast pitch drop (the classic droplet timbre)
 * - A tiny filtered-noise click for the "bubble" transient
 * Both keep gain very low (~0.1) so it stays unobtrusive.
 */
export function playWaterDrop(): void {
  if (!enabled) return
  const c = getCtx()
  if (!c) return
  if (c.state === 'suspended') void c.resume()

  const now = c.currentTime

  // --- plink ---
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(880, now)
  osc.frequency.exponentialRampToValueAtTime(150, now + 0.13)
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.11, now + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2)
  osc.connect(gain).connect(c.destination)
  osc.start(now)
  osc.stop(now + 0.22)

  // --- bubble transient (short filtered noise) ---
  const bufferSize = Math.floor(c.sampleRate * 0.05)
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
  }
  const noise = c.createBufferSource()
  noise.buffer = buffer
  const bp = c.createBiquadFilter()
  bp.type = 'bandpass'
  bp.frequency.value = 2400
  bp.Q.value = 1.2
  const nGain = c.createGain()
  nGain.gain.setValueAtTime(0.04, now)
  nGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05)
  noise.connect(bp).connect(nGain).connect(c.destination)
  noise.start(now)
  noise.stop(now + 0.06)
}
