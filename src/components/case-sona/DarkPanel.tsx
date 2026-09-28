import type { LucideIcon } from 'lucide-react'
import LiquidReveal from '../liquid/LiquidReveal'

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

// Vidro fumê (Figma 382:1141 Briefing e 574:1285 Princípios, gradiente do
// Andreo; Direção A escolhida em 28 set). O nome ficou do painel escuro
// antigo. Texto sempre petróleo sobre o vidro: títulos a 100%, corpo a 90%.
// Princípios: ícone em caixa petróleo e divisória azul a 45% entre colunas.
export default function DarkPanel({ title, items, cols = 5, variant = 'plain' }: Props) {
  const boxed = variant === 'boxed'

  return (
    <div
      className={`vidro-fume rounded-[20px] ${boxed ? 'p-8' : 'px-8 py-10'}`}
      style={{ border: boxed ? '1px solid #EBEEF1' : undefined }}
    >
      {title && boxed && (
        <p className="font-hanken font-semibold text-2xl leading-[1.1] mb-10" style={{ color: '#0C1A22' }}>
          {title}
        </p>
      )}
      {title && !boxed && (
        <p className="font-outfit font-semibold text-sm uppercase mb-6" style={{ color: '#0C1A22', letterSpacing: '0.24px' }}>
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
              style={boxed ? { borderColor: 'rgba(31, 109, 181, 0.45)' } : undefined}
            >
              {boxed ? (
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
                  style={{ background: '#0C1A22' }}
                  aria-hidden="true"
                >
                  <item.icon size={24} strokeWidth={1.75} style={{ color: '#FFFFFF' }} />
                </span>
              ) : (
                <item.icon size={32} strokeWidth={1.5} style={{ color: '#0C1A22' }} aria-hidden="true" />
              )}
              <div className="flex flex-col gap-2">
                <p
                  className={boxed ? 'font-outfit font-semibold text-base' : 'font-hanken font-semibold text-xl leading-[1.1]'}
                  style={{ color: '#0C1A22', letterSpacing: boxed ? undefined : '-0.6px' }}
                >
                  {item.title}
                </p>
                <p className="font-outfit text-base leading-[1.5]" style={{ color: 'rgba(12, 26, 34, 0.9)' }}>
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
