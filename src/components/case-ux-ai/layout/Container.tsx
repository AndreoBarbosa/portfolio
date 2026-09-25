import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

/**
 * Grid do case UX + AI — docs/CONTRATO-RESPONSIVO.md §2: coluna de 1200 com
 * margem `clamp(24px, 8.33vw, 120px)`, medida em 12 das 15 seções. Única
 * exceção é o card de stats do hero (1248), que não usa este componente.
 *
 * Dois elementos de propósito: com `box-sizing: border-box`, max-width e
 * padding no mesmo elemento tiram a margem de dentro da coluna (1200 viraria
 * 960 em 1440). A margem fica no de fora, a coluna de 1200 no de dentro, e
 * `className` vai para a coluna.
 */
export default function Container({ children, className = '' }: Props) {
  return (
    <div className="w-full" style={{ paddingInline: 'clamp(24px, 8.33vw, 120px)' }}>
      <div className={`mx-auto w-full max-w-[1200px] ${className}`}>{children}</div>
    </div>
  )
}
