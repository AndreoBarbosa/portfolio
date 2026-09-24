import type { ReactNode } from 'react'

type Props = {
  id: string
  /** id do heading que rotula a seção — liga a `aria-labelledby` (blueprint §19). */
  labelledBy: string
  children: ReactNode
  className?: string
}

/**
 * Padding vertical de seção — blueprint §7: 120 no XL, 96 no L, 80 no M,
 * 64 no S. O Figma usa 64 quase toda a página, o que aperta demais as
 * transições assim que a página ganha motion — corrigido aqui, não é
 * fidelidade ao frame.
 */
export default function Section({ id, labelledBy, children, className = '' }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-16 md:py-20 lg:py-24 case-xl:py-[120px] ${className}`}
    >
      {children}
    </section>
  )
}
