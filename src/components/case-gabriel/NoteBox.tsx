import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** 'destaque' (padrão): pergunta de design, síntese, frase de decisão.
      'nota': aviso ou ressalva, um nível abaixo do destaque. */
  variant?: 'destaque' | 'nota'
  className?: string
}

/**
 * Destaque secundário do case Gabriel, Direção A "Régua" (Figma 1166:1268,
 * escolhida em 28 set). Sem caixa: régua de 2px na cor do rótulo da seção
 * e a frase em Hanken Grotesk 20. A nota é texto pequeno com uma linha
 * fina em cima. Estilos em liquid-glass.css (.destaque-regua e .nota-linha).
 */
export default function NoteBox({ children, variant = 'destaque', className = '' }: Props) {
  if (variant === 'nota') {
    return <p className={`nota-linha ${className}`}>{children}</p>
  }
  return (
    <div className={`destaque-regua ${className}`}>
      <p>{children}</p>
    </div>
  )
}
