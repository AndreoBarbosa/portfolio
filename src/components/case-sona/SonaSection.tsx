import type { ReactNode } from 'react'
import LiquidReveal from '../liquid/LiquidReveal'

type Props = {
  id: string
  eyebrow: string
  children: ReactNode
  className?: string
  /** C2 (correção secundaria-500, commit Sona): default é o token novo
      — confirmado via MCP em 8 das 9 seções que usam este componente.
      "O Desafio" (nó 577:2056) é a única exceção real: o Figma ainda
      mostra #355972 (a cor antiga) nesse eyebrow específico, não foi
      migrado. Só esse call site passa override; os demais usam o
      default. */
  eyebrowColor?: string
  /** Coluna da direita que começa na altura do eyebrow (Figma 577:2146,
      "A principal decisão": texto 672 e imagem 500 de 1200, alinhados pelo
      topo, justify space-between). Abaixo de lg, vai para baixo do texto. */
  aside?: ReactNode
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
export default function SonaSection({ id, eyebrow, children, className = '', eyebrowColor = 'var(--secundaria-500)', aside }: Props) {
  const rotulo = (
    <span
      className="block font-outfit font-semibold text-xs uppercase"
      style={{ color: eyebrowColor, letterSpacing: '0.36px' }}
    >
      {eyebrow}
    </span>
  )

  if (aside) {
    return (
      <section id={id} className={`scroll-mt-24 py-20 md:py-32 ${className}`}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <LiquidReveal>
            <div className="border-t" style={{ borderColor: 'var(--surface-2)' }} />
          </LiquidReveal>
          <div className="pt-6 md:pt-8 lg:flex lg:items-start lg:justify-between lg:gap-8">
            <div className="lg:w-[56%]">
              <LiquidReveal>{rotulo}</LiquidReveal>
              <div className="mt-6 md:mt-8">{children}</div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-[41.67%] lg:shrink-0">{aside}</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id={id} className={`scroll-mt-24 py-20 md:py-32 ${className}`}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <LiquidReveal>
          <div className="border-t pt-6 md:pt-8" style={{ borderColor: 'var(--surface-2)' }}>
            {rotulo}
          </div>
        </LiquidReveal>
        <div className="mt-6 md:mt-8">{children}</div>
      </div>
    </section>
  )
}
