import type { LucideIcon } from 'lucide-react'
import LiquidReveal from '../liquid/LiquidReveal'
import { sonaAccent } from '../../data/sona'

type Item = {
  icon: LucideIcon
  title: string
  body: string
}

type Props = {
  title?: string
  items: Item[]
  cols?: 3 | 4 | 5
  /** S05 (Briefing): ícone solto, título Hanken 20px, sem borda no
      painel, sem divisória entre colunas.
      S10 (Princípios): ícone em caixa clara, título Outfit 16px, borda
      sutil no painel, divisória vertical entre colunas.
      Confirmado via get_design_context — não são a mesma receita com
      colunas diferentes, os dois sub-blocos têm estilos distintos. */
  variant?: 'plain' | 'boxed'
}

const colsClass: Record<number, string> = {
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
  5: 'md:grid-cols-3 lg:grid-cols-5',
}

export default function DarkPanel({ title, items, cols = 5, variant = 'plain' }: Props) {
  const boxed = variant === 'boxed'

  return (
    <div
      className="rounded-[20px] p-8"
      style={{
        background: sonaAccent.panelBg,
        border: boxed ? `1px solid ${sonaAccent.blueSoft}` : undefined,
      }}
    >
      {title && boxed && (
        <p className="font-hanken font-semibold text-2xl leading-[1.1] mb-10" style={{ color: '#EBEEF1' }}>
          {title}
        </p>
      )}
      {title && !boxed && (
        // R2.2 (Ajustes 03): revertido pro original — Outfit SemiBold
        // 12px, mb-6 (24px, confirmado via get_design_context = gap-[24px]
        // do nó 577:2099, exato). O Ajustes 02 tinha trocado por CaseLabel,
        // cujo margin:0 interno matava o mb-6 (mesma causa do R0) — "BRIEFING"
        // ficava colado no ícone de "Desafio".
        <p className="font-outfit font-semibold text-xs uppercase mb-6" style={{ color: '#EBEEF1', letterSpacing: '0.24px' }}>
          {title}
        </p>
      )}
      <LiquidReveal stagger>
        <div className={`grid grid-cols-1 ${colsClass[cols]} gap-8`}>
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`flex flex-col gap-4 pb-8 md:pb-0 ${
                boxed ? `border-b md:border-b-0 md:border-l ${i === 0 ? 'md:border-l-0' : 'md:pl-8'} last:border-b-0` : ''
              }`}
              style={boxed ? { borderColor: 'rgba(255,255,255,0.12)' } : undefined}
            >
              {boxed ? (
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
                  style={{ background: sonaAccent.hypothesisBg }}
                  aria-hidden="true"
                >
                  <item.icon size={24} strokeWidth={1.75} style={{ color: sonaAccent.panelBg }} />
                </span>
              ) : (
                <item.icon size={28} strokeWidth={1.5} style={{ color: '#E5E7EB' }} aria-hidden="true" />
              )}
              <div className="flex flex-col gap-2">
                <p
                  className={boxed ? 'font-outfit font-semibold text-base' : 'font-hanken font-semibold text-xl leading-[1.1]'}
                  style={{ color: '#EBEEF1', letterSpacing: boxed ? undefined : '-0.6px' }}
                >
                  {item.title}
                </p>
                <p className="font-outfit text-base leading-[1.5]" style={{ color: boxed ? '#9CA3AF' : '#D3D6D9' }}>
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </LiquidReveal>
    </div>
  )
}
