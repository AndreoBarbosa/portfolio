import { Sparkles, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { sonaAccent } from '../../data/sona'

type Props = {
  icon?: LucideIcon
  children: ReactNode
  className?: string
}

// Callout com ícone quadrado — padrão repetido em S04, S12, S13, S15, S17.
// Confirmado via get_design_context (nó 577:2087): bg #EBEEF1, borda
// #EDEAE3, radius 16px, ícone em caixa 32px secundaria-500, texto Outfit
// SemiBold 16px secundaria-500 — mesma cor nas 5 instâncias, sem exceção
// (D1, correção 02).
//
// Largura: cada instância tem uma largura real diferente no Figma
// (568/632/1200/395/1247px — D2, correção 02). Este componente não
// define largura própria (fica em display:flex, block-level, herda do
// pai) — width/max-width é responsabilidade de quem chama, via
// className. min-w-0 no parágrafo garante que ele efetivamente quebre
// dentro da largura dada em vez de manter a linha única e estourar.
export default function IconCallout({ icon: Icon = Sparkles, children, className = '' }: Props) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl px-6 py-3 ${className}`}
      style={{ background: sonaAccent.blueSoft, border: `1px solid ${sonaAccent.cardBorder}` }}
    >
      <span
        className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
        style={{ background: 'var(--secundaria-500)' }}
        aria-hidden="true"
      >
        <Icon size={19} color="#FFFFFF" strokeWidth={2} />
      </span>
      <p className="flex-1 min-w-0 font-outfit font-semibold text-base leading-[1.5]" style={{ color: 'var(--secundaria-500)' }}>
        {children}
      </p>
    </div>
  )
}
