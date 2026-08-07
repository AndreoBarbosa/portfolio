import type { LucideIcon } from 'lucide-react'
import { sonaAccent } from '../../data/sona'

type Props = {
  icon: LucideIcon
  title: string
  body: string
  className?: string
}

// Card de ícone plano — S03 (Visão Geral). Confirmado via get_design_context
// (nó 577:2047): bg branco, SEM borda/sombra, ícone solto (sem caixa
// colorida). Reaparece com pequenas variações em S15/S16/S17 (B4/B5).
export default function IconCard({ icon: Icon, title, body, className = '' }: Props) {
  return (
    <div className={`bg-white flex flex-col gap-4 p-6 ${className}`}>
      <Icon size={24} strokeWidth={1.75} style={{ color: 'var(--text-strong)' }} aria-hidden="true" />
      <div className="flex flex-col gap-2">
        <p className="font-outfit font-semibold text-base" style={{ color: 'var(--text-strong)' }}>
          {title}
        </p>
        <p className="font-outfit text-sm leading-[1.5]" style={{ color: sonaAccent.textSecondary }}>
          {body}
        </p>
      </div>
    </div>
  )
}
