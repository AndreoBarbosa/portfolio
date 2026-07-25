import { type ReactNode } from 'react'

export type InsightGridItem = {
  title: ReactNode
  body?: ReactNode
}

// Grade de cards com índice numérico discreto — usado onde uma lista de 3+ insights
// quebraria em bloco de texto corrido monótono demais.
export default function InsightGrid({ items }: { items: InsightGridItem[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <div key={i} className="rounded-card border border-muted/15 bg-slate/40 p-6">
          <span className="font-mono text-amber/50 text-sm font-bold" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <p className="text-cream/85 text-base leading-[1.6] mt-3">{item.title}</p>
          {item.body && <p className="text-cream/70 text-sm leading-[1.5] mt-3">{item.body}</p>}
        </div>
      ))}
    </div>
  )
}
