import type { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  className?: string
}

// Wrapper com título — usado pelos dois cards lado a lado de S09
// (Priorização / Decisão). Exclusivo do case Sona.
//
// B3 (Ajustes 02): valores atualizados (border #E4E9EC, padding 28px,
// título 20px) — casca única compartilhada pelos dois cards, garante que
// "Decisão" mantenha exatamente a mesma casca de "Priorização" sem
// duplicar a receita em dois lugares.
export default function BorderedCard({ title, children, className = '' }: Props) {
  return (
    <div className={`rounded-2xl p-7 flex flex-col ${className}`} style={{ border: '1px solid #E4E9EC' }}>
      <p className="font-hanken font-semibold text-xl mb-6" style={{ color: '#0C1A22', letterSpacing: '-0.01em' }}>
        {title}
      </p>
      {children}
    </div>
  )
}
