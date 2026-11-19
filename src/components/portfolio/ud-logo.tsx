import { cn } from '@/lib/utils'

export function UdLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-white/10',
        className,
      )}
      aria-label="Ultra Designer (UD) monogram"
    >
      {/* gradient base */}
      <span className="absolute inset-0 bg-gradient-to-br from-teal-400 via-rose-500 to-amber-400" />
      {/* gloss */}
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_55%)]" />
      {/* letters */}
      <span className="relative font-extrabold tracking-tight text-[#0a0a0f]">
        UD
      </span>
    </span>
  )
}
