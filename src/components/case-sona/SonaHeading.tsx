import type { ElementType, ReactNode } from 'react'

type Props = {
  as?: ElementType
  size?: 'hero' | 'section'
  children: ReactNode
  className?: string
}

// Dois papéis tipográficos confirmados no Figma via get_design_context
// (não estimados por bounding box):
//   hero    → 56px / Hanken SemiBold / lh 1.1 / ls -1.68px (nó 577:2021)
//             — bate exatamente com o limite superior de
//             .liquid-type-section-title da Home, mas o Figma trava esse
//             valor fixo (não fluido) mesmo no hero do case.
//   section → 32px / Hanken SemiBold / lh 1.1 / ls -0.64px (nó 577:2059)
//             — menor que qualquer papel de heading da Home; não existe
//             na escala fluida existente (o mínimo de
//             .liquid-type-section-title já usa ls -1.68px, incompatível).
//             Reportado no B1: uso os mesmos ingredientes da Home
//             (família/peso/line-height), com o tamanho e tracking
//             exatos do nó, num clamp que nunca ultrapassa 32px desktop.
export default function SonaHeading({ as: Tag = 'h2', size = 'section', children, className = '' }: Props) {
  const style =
    size === 'hero'
      ? { fontSize: '56px', letterSpacing: '-1.68px' }
      : { fontSize: 'clamp(26px, 5vw, 32px)', letterSpacing: '-0.64px' }

  // A7 (rodada de ajustes): text-wrap:balance estava aplicado por padrão
  // em todo título — redistribui quebras pra "equilibrar" linhas, mas
  // isso ignorava onde o Figma quebra de verdade (wrap guloso/padrão do
  // navegador). Removido daqui; só entra caso a caso, depois de
  // descartar largura de container/tipografia/fonte/padding (ordem do
  // briefing), e reportado onde for aplicado.
  return (
    <Tag
      className={`font-hanken font-semibold leading-[1.1] ${className}`}
      style={{ color: 'var(--text-strong)', ...style }}
    >
      {children}
    </Tag>
  )
}
