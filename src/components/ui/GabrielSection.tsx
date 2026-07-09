import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  tone: 'light' | 'dark'
  className?: string
  id?: string
}

export default function GabrielSection({ children, tone, className = '', id }: Props) {
  const toneClasses =
    tone === 'dark'
      ? 'bg-gabriel-dark text-gabriel-offwhite'
      : 'bg-gabriel-offwhite text-gabriel-mossDark'

  return (
    <section id={id} className={`font-outfit py-16 md:py-24 ${toneClasses} ${className}`}>
      {children}
    </section>
  )
}
