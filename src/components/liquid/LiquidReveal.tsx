import { motion, useReducedMotion } from 'framer-motion'
import { Children, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  /** Escalona os filhos diretos (80ms entre eles) em vez de animar o bloco inteiro. */
  stagger?: boolean
  /** Entrada com foco (blur 6px → 0), só para títulos/cards — nunca parágrafos. */
  blur?: boolean
}

const EASE = [0.16, 1, 0.3, 1] as const
const STAGGER_STEP = 0.08
const OFFSET = 28
// Dispara um pouco antes do elemento estar 100% visível, pra dar tempo de
// ver a animação acontecer em vez de já achar o resultado pronto.
const VIEWPORT_MARGIN = '-10% 0px -10% 0px'

function hiddenState(blur: boolean) {
  return blur ? { opacity: 0, y: OFFSET, filter: 'blur(6px)' } : { opacity: 0, y: OFFSET }
}
function showState(blur: boolean) {
  return blur ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 1, y: 0 }
}

export default function LiquidReveal({ children, className = '', delay = 0, stagger = false, blur = false }: Props) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return <div className={className}>{children}</div>
  }

  if (stagger) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: VIEWPORT_MARGIN }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: STAGGER_STEP, delayChildren: delay } },
        }}
      >
        {Children.map(children, (child, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: hiddenState(blur),
              show: { ...showState(blur), transition: { duration: 0.6, ease: EASE } },
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
      initial={hiddenState(blur)}
      whileInView={showState(blur)}
      viewport={{ once: true, margin: VIEWPORT_MARGIN }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
