'use client'

import * as React from 'react'
import { Check, Copy } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

/* -------------------------------------------------------------------------- */
/*  Lightweight syntax highlighter (no external deps)                          */
/* -------------------------------------------------------------------------- */

type Lang = 'css' | 'html'

const CSS_RE =
  /(\/\*[\s\S]*?\*\/)|(@[\w-]+)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(#[0-9a-fA-F]{3,8}\b)|(-?\d*\.?\d+(?:px|rem|em|ex|ch|vw|vh|vmin|vmax|%|deg|rad|turn|s|ms|fr|dpi|dppx)?\b)|([a-zA-Z-]+)(?=\s*:)|([{};:,()>])/g

const HTML_RE =
  /(<!--[\s\S]*?-->)|(<\/?[\w-]+)|([\w-]+)(?=\s*=)|("[^"]*"|'[^']*')|([<>/=])/g

function highlightCss(code: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  let key = 0
  CSS_RE.lastIndex = 0
  while ((m = CSS_RE.exec(code)) !== null) {
    if (m.index > last) {
      nodes.push(<span key={key++}>{code.slice(last, m.index)}</span>)
    }
    const [full, comment, atrule, str, hex, num, prop, punct] = m
    let cls = 'text-zinc-300'
    if (comment) cls = 'text-zinc-500 italic'
    else if (atrule) cls = 'text-fuchsia-400'
    else if (str) cls = 'text-amber-300'
    else if (hex) cls = 'text-rose-300'
    else if (num) cls = 'text-orange-300'
    else if (prop) cls = 'text-cyan-300'
    else if (punct) cls = 'text-zinc-500'
    nodes.push(
      <span key={key++} className={cls}>
        {full}
      </span>,
    )
    last = m.index + full.length
  }
  if (last < code.length) {
    nodes.push(<span key={key++}>{code.slice(last)}</span>)
  }
  return nodes
}

function highlightHtml(code: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  let key = 0
  HTML_RE.lastIndex = 0
  while ((m = HTML_RE.exec(code)) !== null) {
    if (m.index > last) {
      nodes.push(<span key={key++}>{code.slice(last, m.index)}</span>)
    }
    const [full, comment, tag, attr, str, punct] = m
    let cls = 'text-zinc-300'
    if (comment) cls = 'text-zinc-500 italic'
    else if (tag) cls = 'text-rose-400'
    else if (attr) cls = 'text-amber-300'
    else if (str) cls = 'text-emerald-300'
    else if (punct) cls = 'text-zinc-500'
    nodes.push(
      <span key={key++} className={cls}>
        {full}
      </span>,
    )
    last = m.index + full.length
  }
  if (last < code.length) {
    nodes.push(<span key={key++}>{code.slice(last)}</span>)
  }
  return nodes
}

/* -------------------------------------------------------------------------- */

export function CodeBlock({
  code,
  lang,
}: {
  code: string
  lang: Lang
}) {
  const [copied, setCopied] = React.useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast({ title: 'Code copied to clipboard' })
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast({ title: 'Copy failed', description: 'Please copy manually.' })
    }
  }

  const highlighted =
    lang === 'css' ? highlightCss(code) : highlightHtml(code)

  return (
    <div className="group/code relative">
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copy code"
        className="absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700/70 bg-zinc-800/80 text-zinc-300 opacity-0 backdrop-blur transition hover:bg-zinc-700 hover:text-white focus-visible:opacity-100 group-hover/code:opacity-100"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-400" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
      <pre className="m-0 max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-[#0d1117] p-4 text-[12px] leading-relaxed">
        <code className="font-mono">{highlighted}</code>
      </pre>
    </div>
  )
}
