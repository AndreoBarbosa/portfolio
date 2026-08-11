import type { LucideIcon } from 'lucide-react'
import { gabrielAccent } from '../../data/gabriel'

type Props = {
  icon: LucideIcon
  title: string
  body: string
}

// Card de ícone plano — 01 Visão Geral (nó 599:1661 e irmãos). Ícone
// solto 32px, sem caixa/borda, gap-4 até o bloco de texto, gap-2 entre
// título e corpo — confirmado via get_design_context.
export default function FeatureCard({ icon: Icon, title, body }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* D5 (correção 02): os 4 ícones desta seção confirmados stroke
          #3B6EA5 via MCP na auditoria anterior (SVGs reais baixados). */}
      <Icon size={32} strokeWidth={1.5} style={{ color: 'var(--secundaria-500)' }} aria-hidden="true" />
      <div className="flex flex-col gap-2">
        <p className="font-outfit font-semibold text-base" style={{ color: 'var(--text-strong)' }}>
          {title}
        </p>
        <p className="font-outfit text-base leading-[1.5]" style={{ color: gabrielAccent.textMuted }}>
          {body}
        </p>
      </div>
    </div>
  )
}
