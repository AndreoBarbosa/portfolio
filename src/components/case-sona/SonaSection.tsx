import type { ReactNode } from 'react'
import LiquidReveal from '../liquid/LiquidReveal'
import { sonaAccent } from '../../data/sona'

type Props = {
  id: string
  eyebrow: string
  children: ReactNode
  className?: string
}

// Container 1200px — exceção explícita ao max-w-6xl (1152px) da Home,
// decidida com o autor do briefing para bater com o Figma (nó 577:2013,
// margem de 120px em 1440). Ver B1 §6. Ritmo vertical (py-20/32) segue o
// padrão de seção da Home; a régua horizontal reproduz o separador do
// Figma entre seções.
//
// R1/R2.1 (Ajustes 03): eyebrow de seção NUNCA é JetBrains Mono — revertido
// pra tipografia original do Figma (nó 577:2039, "VISÃO GERAL"): Outfit
// SemiBold 12px, #355972, tracking 0.36px. O Ajustes 02 tinha convertido
// isso pra CaseLabel por engano; mono é só rótulo de dado dentro de card.
//
// R5 (Ajustes 03): gap eyebrow→conteúdo recalculado a partir do dump de
// metadata do Figma (comparado em 9 das 10 seções que usam este
// componente — visão geral, desafio, pesquisa, decisão principal,
// prototipação, design system, resultado, do conceito à realidade,
// próximos passos, aprendizado): todas convergem pro mesmo valor, 32px
// no desktop. md:mt-10 (40px) estava 8px acima disso — não é um desvio
// isolado por seção, era um valor uniformemente errado no componente
// compartilhado.
export default function SonaSection({ id, eyebrow, children, className = '' }: Props) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 md:py-32 ${className}`}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <LiquidReveal>
          <div className="border-t pt-6 md:pt-8" style={{ borderColor: 'var(--surface-2)' }}>
            <span
              className="block font-outfit font-semibold text-xs uppercase"
              style={{ color: sonaAccent.blue, letterSpacing: '0.36px' }}
            >
              {eyebrow}
            </span>
          </div>
        </LiquidReveal>
        <div className="mt-6 md:mt-8">{children}</div>
      </div>
    </section>
  )
}
