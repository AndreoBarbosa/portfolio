import type { ReactNode } from 'react'
import { sonaAccent } from '../../data/sona'

type Props = {
  label: string
  children: ReactNode
  className?: string
}

// Card branco pequeno com label — S13 (4 sub-blocos: tokens de cor,
// tipografia, ícones, componentes). border #EEF0F2, radius 16px, padding
// 24px (get_design_context, nó 577:2422).
//
// R1/R2.5 (Ajustes 03): header não é mono — revertido pro original.
export default function MiniCard({ label, children, className = '' }: Props) {
  return (
    <div className={`bg-white rounded-2xl p-6 flex flex-col gap-6 h-full ${className}`} style={{ border: `1px solid ${sonaAccent.cardBorder}` }}>
      <p className="font-outfit font-semibold text-xs" style={{ color: 'var(--text-strong)', letterSpacing: '0.24px' }}>
        {label}
      </p>
      {children}
    </div>
  )
}
