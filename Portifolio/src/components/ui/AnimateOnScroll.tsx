import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'fade'
}

export default function AnimateOnScroll({ children, className = '', delay = 0, direction = 'up' }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: direction === 'up' ? 24 : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
