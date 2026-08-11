import type { LucideIcon } from 'lucide-react'
import { sonaAccent } from '../../data/sona'

type Props = {
  icon: LucideIcon
  title?: string
  body: string
  /** C2 (correção secundaria-500, commit Sona): default preserva o
      comportamento atual (sonaAccent.blue) — a instância do Aprendizado
      (S17) NÃO usa #3B6EA5 no Figma (conferido nó a nó, os 3 ícones não
      têm essa cor). Só a instância "Do Conceito à Realidade" (S15) passa
      override pra var(--secundaria-500): os 4 ícones ali foram baixados
      e confirmados stroke #3B6EA5 um a um. */
  iconColor?: string
}

// Linha ícone + texto — S15 (com título) e S17 (só corpo). Confirmado via
// get_design_context (nó 577:2524): ícone em caixa clara #DFEBF3 44px,
// título Outfit SemiBold 16px, corpo Outfit Regular 14px #6B7280.
export default function IconRow({ icon: Icon, title, body, iconColor = sonaAccent.blue }: Props) {
  return (
    <div className="flex items-start gap-4 py-4">
      <span
        className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
        style={{ background: sonaAccent.hypothesisBg }}
        aria-hidden="true"
      >
        <Icon size={22} strokeWidth={1.75} style={{ color: iconColor }} />
      </span>
      <div className="flex flex-col gap-1 flex-1 pt-1">
        {title && (
          <p className="font-outfit font-semibold text-base" style={{ color: 'var(--text-strong)' }}>
            {title}
          </p>
        )}
        <p className="font-outfit text-sm leading-[1.5]" style={{ color: sonaAccent.textSecondary }}>
          {body}
        </p>
      </div>
    </div>
  )
}
