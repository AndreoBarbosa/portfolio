import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

/**
 * Grid do case UX + AI — docs/CONTRATO-RESPONSIVO.md §2. Container de 1248
 * (largura do card de stats, o elemento mais largo do case, múltiplo de 8),
 * gutter fluido `clamp(24px, 6.67vw, 96px)`. Um container só para as 15
 * seções — os três gutters diferentes do Figma (120 na nav, 96 nos stats,
 * 160 nos blocos do hero) são drift de desenho, não intenção; a nav fica de
 * fora por ser componente compartilhado com os outros cases.
 */
export default function Container({ children, className = '' }: Props) {
  return (
    <div
      className={`mx-auto w-full max-w-[1248px] ${className}`}
      style={{ paddingInline: 'clamp(24px, 6.67vw, 96px)' }}
    >
      {children}
    </div>
  )
}
