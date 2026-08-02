import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
}

export default function LiquidArrowLink({ children, className = '', ...props }: Props) {
  return (
    <a className={`liquid-link inline-flex items-center gap-1.5 text-sm font-medium ${className}`} {...props}>
      <span className="liquid-link-text">{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  )
}
