import { motion, useReducedMotion } from 'framer-motion'
import { Children, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'fade'
  /** Escalona os filhos diretos (60ms entre eles) em vez de animar o bloco inteiro. */
  stagger?: boolean
}

const EASE = [0.22, 1, 0.36, 1] as const
const STAGGER_STEP = 0.06

export default function AnimateOnScroll({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  stagger = false,
}: Props) {
  const shouldReduce = useReducedMotion()
  const yOffset = direction === 'up' ? 24 : 0

  if (shouldReduce) {
    return <div className={className}>{children}</div>
  }

  if (stagger) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: STAGGER_STEP, delayChildren: delay } },
        }}
      >
        {Children.map(children, (child, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: yOffset },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
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
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
