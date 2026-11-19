'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '@/components/code-block'
import { categories, type Effect } from '@/data/effects'

export function EffectCard({ effect }: { effect: Effect }) {
  const [lang, setLang] = React.useState<'css' | 'html'>('css')
  const categoryLabel =
    categories.find((c) => c.id === effect.category)?.label ?? effect.category

  return (
    <Card className="overflow-hidden p-0 py-0 transition-shadow hover:shadow-md">
      {/* Demo stage */}
      <div className="relative flex min-h-[210px] items-center justify-center overflow-hidden border-b bg-[#0b1120]">
        <div
          className="flex w-full items-center justify-center p-6"
          dangerouslySetInnerHTML={{ __html: effect.html }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-white/70 backdrop-blur">
          {categoryLabel}
        </span>
      </div>

      {/* Meta + code */}
      <div className="flex flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-semibold leading-tight">{effect.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{effect.description}</p>
        </div>

        <Tabs value={lang} onValueChange={(v) => setLang(v as 'css' | 'html')}>
          <TabsList className="bg-muted">
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
          </TabsList>
        </Tabs>

        <CodeBlock code={lang === 'css' ? effect.css : effect.html} lang={lang} />
      </div>
    </Card>
  )
}
