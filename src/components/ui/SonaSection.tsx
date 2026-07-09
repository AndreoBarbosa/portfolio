import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  tone: 'light' | 'dark'
  className?: string
  id?: string
}

export default function SonaSection({ children, tone, className = '', id }: Props) {
  const toneClasses =
    tone === 'dark'
      ? 'bg-sona-navy text-sona-off'
      : 'bg-sona-off text-sona-navy'

  return (
    <section id={id} className={`font-outfit py-16 md:py-24 ${toneClasses} ${className}`}>
      {children}
    </section>
  )
}
