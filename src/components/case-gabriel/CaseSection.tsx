import type { ReactNode } from 'react'
import LiquidReveal from '../liquid/LiquidReveal'
import { gabrielAccent } from '../../data/gabriel'

type Props = {
  id?: string
  eyebrow: string
  children: ReactNode
  className?: string
  /** Espaço entre o eyebrow e o conteúdo. Default 32px (padrão do
      Figma); seções com gap diferente passam a própria classe. */
  contentClassName?: string
}

// Container 1200px + padding 64/120 — mesmo padrão do Sona (SonaSection),
// reproduzido aqui em vez de importado porque SonaSection importa
// sonaAccent de data/sona (acoplado ao Sona — ver B0 §1, "componentes
// compartilhados: alterá-los quebra o outro case").
//
// Eyebrow SEM numeração "NN · " — o briefing assumia esse formato, mas o
// Figma real do Gabriel não tem número nem separador "·" em nenhuma das
// 12 seções (confirmado via MCP). Visual do Figma vence. Tamanho
// padronizado em 12px em toda seção (decisão do Andreo — o Figma tinha
// 13px solto, sem token, em 3 das 12 seções; tratado como acidente).
export default function CaseSection({ id, eyebrow, children, className = '', contentClassName = 'mt-8' }: Props) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 ${className}`}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <LiquidReveal>
          <div className="border-t pt-6 md:pt-8" style={{ borderColor: gabrielAccent.divider }}>
            <span
              className="block font-outfit font-semibold text-xs uppercase"
              style={{ color: 'var(--secundaria-500)', letterSpacing: '0.24px' }}
            >
              {eyebrow}
            </span>
          </div>
        </LiquidReveal>
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  )
}
