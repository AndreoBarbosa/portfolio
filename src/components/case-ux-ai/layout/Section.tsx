import type { ReactNode } from 'react'

type Props = {
  id: string
  /** id do heading que rotula a seção — liga a `aria-labelledby` (blueprint §19). */
  labelledBy: string
  children: ReactNode
  className?: string
}

/**
 * Padding vertical de seção — docs/CONTRATO-RESPONSIVO.md §2: 64 a partir
 * de 768, 48 abaixo. (A versão do blueprint, 120/96/80/64, foi substituída
 * pelo contrato em 24 set 2026.)
 */
export default function Section({ id, labelledBy, children, className = '' }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-12 md:py-16 ${className}`}
    >
      {children}
    </section>
  )
}
