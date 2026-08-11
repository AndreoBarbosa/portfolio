import type { LucideIcon } from 'lucide-react'
import LiquidReveal from '../liquid/LiquidReveal'
import { gabrielAccent } from '../../data/gabriel'

type Item = {
  n: string
  icon: LucideIcon
  title: string
  body: string
}

type Props = {
  items: Item[]
}

// Card de princípios numerados — A Descoberta (nó 595:1199). Card
// branco, borda #EAEEF2, rounded-16, linhas divididas por 1px #E3E8ED,
// cada linha: número 18px + ícone 28px + título/corpo.
export default function PrincipleList({ items }: Props) {
  return (
    <LiquidReveal stagger className="w-full rounded-2xl border overflow-hidden block border-[#EAEEF2]">
      {items.map((item, i) => (
        <div
          key={item.n}
          className={`flex gap-5 items-start px-6 py-5 ${i > 0 ? 'border-t' : ''}`}
          style={{ borderColor: gabrielAccent.divider }}
        >
          <span className="font-outfit font-semibold text-lg shrink-0" style={{ color: 'var(--secundaria-500)' }}>
            {item.n}
          </span>
          <item.icon size={28} strokeWidth={1.5} style={{ color: 'var(--text-strong)' }} className="shrink-0" aria-hidden="true" />
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <p className="font-outfit font-semibold text-base" style={{ color: 'var(--text-strong)' }}>
              {item.title}
            </p>
            <p className="font-outfit text-sm leading-[1.4]" style={{ color: gabrielAccent.textMuted }}>
              {item.body}
            </p>
          </div>
        </div>
      ))}
    </LiquidReveal>
  )
}
