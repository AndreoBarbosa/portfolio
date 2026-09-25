import { motion, useReducedMotion } from 'framer-motion'
import { Children, type ReactNode } from 'react'
import { EASE, DUR, STAGGER, OFFSET, VIEWPORT } from '../../motion/tokens'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  /** Escalona os filhos diretos em cascata em vez de animar o bloco inteiro. */
  stagger?: boolean
  /** Entrada com foco (blur 6px → 0), só para títulos e cards, nunca parágrafos. */
  blur?: boolean
  /** Só opacidade, sem deslocamento. Para quando o bloco já está no lugar certo. */
  fadeOnly?: boolean
}

function hidden(blur: boolean, y: number) {
  return blur ? { opacity: 0, y, filter: 'blur(6px)' } : { opacity: 0, y }
}
function shown(blur: boolean) {
  return blur ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 1, y: 0 }
}

/**
 * Reveal padrão de entrada na viewport. Uma vez só, nunca repete ao voltar
 * o scroll. Todas as durações e curvas vêm de motion/tokens.
 */
export default function LiquidReveal({
  children,
  className = '',
  delay = 0,
  stagger = false,
  blur = false,
  fadeOnly = false,
}: Props) {
  const shouldReduce = useReducedMotion()
  const y = fadeOnly ? 0 : OFFSET

  if (shouldReduce) {
    return <div className={className}>{children}</div>
  }

  if (stagger) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: STAGGER, delayChildren: delay } },
        }}
      >
        {Children.map(children, (child, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: hidden(blur, y),
              show: { ...shown(blur), transition: { duration: DUR.reveal, ease: EASE } },
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={hidden(blur, y)}
      whileInView={shown(blur)}
      viewport={VIEWPORT}
      transition={{ duration: DUR.reveal, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
