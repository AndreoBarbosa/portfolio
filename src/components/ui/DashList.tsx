import { type ReactNode } from 'react'

type ListProps = {
  children: ReactNode
  className?: string
}

export function DashList({ children, className = '' }: ListProps) {
  const hasGapOverride = /(^|\s)space-y-/.test(className)
  return <ul className={`${hasGapOverride ? '' : 'space-y-4'} ${className}`}>{children}</ul>
}

type ItemProps = {
  children: ReactNode
  className?: string
  markerClassName?: string
}

export function DashItem({ children, className = '', markerClassName = 'text-amber/60' }: ItemProps) {
  return (
    <li className={`flex items-start gap-3 ${className}`}>
      <span className={`shrink-0 mt-[2px] font-mono ${markerClassName}`} aria-hidden="true">—</span>
      <span>{children}</span>
    </li>
  )
}
