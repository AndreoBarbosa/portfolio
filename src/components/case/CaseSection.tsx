import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  id?: string
  className?: string
  'aria-labelledby'?: string
}

export default function CaseSection({ children, id, className = '', ...rest }: Props) {
  return (
    <section
      id={id}
      className={`py-[72px] md:py-24 lg:py-[160px] ${className}`}
      {...rest}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">{children}</div>
    </section>
  )
}
