import type { ReactNode } from 'react'
import LiquidReveal from '../liquid/LiquidReveal'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'fade'
  /** Escalona os filhos diretos em cascata em vez de animar o bloco inteiro. */
  stagger?: boolean
}

/**
 * Compatibilidade. Este componente tinha a própria curva e o próprio
 * stagger, diferentes dos do LiquidReveal, o que colocava duas cadências
 * de motion na mesma página. Agora ele apenas delega, para que as chamadas
 * existentes continuem funcionando sem precisar ser reescritas uma a uma.
 *
 * Em código novo, use LiquidReveal direto.
 */
export default function AnimateOnScroll({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  stagger = false,
}: Props) {
  return (
    <LiquidReveal className={className} delay={delay} stagger={stagger} fadeOnly={direction === 'fade'}>
      {children}
    </LiquidReveal>
  )
}
