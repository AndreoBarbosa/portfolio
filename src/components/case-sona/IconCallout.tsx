import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** 'destaque' (padrão): pergunta de design, síntese, fecho de seção.
      'nota': regra, aviso ou referência, um nível abaixo do destaque. */
  variant?: 'destaque' | 'nota'
  className?: string
}

/**
 * Destaque secundário do case Sona, Direção A "Régua" (Figma 1166:1268,
 * escolhida em 28 set). Sem caixa e sem ícone: régua de 2px na cor do
 * rótulo da seção e a frase em Hanken Grotesk 20. A nota é texto pequeno
 * com uma linha fina em cima. Estilos em liquid-glass.css
 * (.destaque-regua e .nota-linha). O nome ficou do componente antigo, que
 * tinha ícone; manter evita mexer nas importações.
 */
export default function IconCallout({ children, variant = 'destaque', className = '' }: Props) {
  if (variant === 'nota') {
    return <p className={`nota-linha ${className}`}>{children}</p>
  }
  return (
    <div className={`destaque-regua ${className}`}>
      <p>{children}</p>
    </div>
  )
}
