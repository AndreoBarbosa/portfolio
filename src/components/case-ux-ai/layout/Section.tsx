import type { ReactNode } from 'react'

type Props = {
  id: string
  /** id do heading que rotula a seção — liga a `aria-labelledby` (blueprint §19). */
  labelledBy: string
  children: ReactNode
  className?: string
}

/**
 * Padding vertical de seção: token --ritmo-secao (case-ux-ai-tokens.css),
 * 72 / 96 / 128 (base, ≥768, ≥1280). Revisão de ritmo de 28 set 2026, que
 * substituiu o 48/64 do CONTRATO-RESPONSIVO §2.
 */
export default function Section({ id, labelledBy, children, className = '' }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-[var(--ritmo-secao)] ${className}`}
    >
      {children}
    </section>
  )
}
