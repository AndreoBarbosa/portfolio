import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  restColor?: string
  /** Cor de destino ao entrar. Default var(--accent) segue o tema — só
      precisa de um valor fixo em seções theme-independent (fundo branco
      fixo, como o hero e "Como eu penso"), onde --accent do dark theme
      (creme) ficaria invisível sobre o branco. */
  accentColor?: string
}

/* Acende a cor de destaque ao entrar na viewport, uma vez só. Usado só em
   dois lugares por seção (número + título) — nunca em blocos, conforme a
   regra de "cor no scroll" do brief. */
export default function ScrollAccent({ children, className = '', restColor = 'var(--text-faint)', accentColor = 'var(--accent)' }: Props) {
  return (
    <motion.span
      className={className}
      initial={{ color: restColor }}
      whileInView={{ color: accentColor }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  )
}
