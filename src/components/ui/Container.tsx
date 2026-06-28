import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export default function Container({ children, className = '' }: Props) {
  return (
    <div className={`max-w-6xl mx-auto px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
