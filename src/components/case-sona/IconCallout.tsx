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
// #EDEAE3, radius 16px, ícone em caixa #355972 32px, texto Outfit
// SemiBold 16px #355972. Uma variante de largura só (herda do pai).
export default function IconCallout({ icon: Icon = Sparkles, children, className = '' }: Props) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl px-6 py-3 ${className}`}
      style={{ background: sonaAccent.blueSoft, border: `1px solid ${sonaAccent.cardBorder}` }}
    >
      <span
        className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
        style={{ background: sonaAccent.blue }}
        aria-hidden="true"
      >
        <Icon size={19} color="#FFFFFF" strokeWidth={2} />
      </span>
      <p className="font-outfit font-semibold text-base leading-[1.5]" style={{ color: sonaAccent.blue }}>
        {children}
      </p>
    </div>
  )
}
