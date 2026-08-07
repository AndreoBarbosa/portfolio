import type { LucideIcon } from 'lucide-react'
import { sonaAccent } from '../../data/sona'

type Props = {
  icon: LucideIcon
  title: string
  body: string
}

// Card centralizado — S16. Confirmado via get_design_context (nó
// 577:2612): bg branco, borda var(--surface-1), radius 16px, sombra
// suave própria (0 6px 20px rgba(13,26,20,0.04)), ícone em caixa escura.
export default function NextStepCard({ icon: Icon, title, body }: Props) {
  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 text-center h-full"
      style={{ border: '1px solid var(--surface-1)', boxShadow: '0 6px 20px rgba(13,26,20,0.04)' }}
    >
      <span
        className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
        style={{ background: sonaAccent.panelBg }}
        aria-hidden="true"
      >
        <Icon size={22} color="#FFFFFF" strokeWidth={1.75} />
      </span>
      <p className="font-outfit font-semibold text-base" style={{ color: 'var(--text-strong)' }}>
        {title}
      </p>
      <p className="font-outfit text-xs leading-[1.5]" style={{ color: sonaAccent.textSecondary }}>
        {body}
      </p>
    </div>
  )
}
