import type { ElementType, ReactNode, HTMLAttributes } from 'react'

type Variant = 'nav' | 'card' | 'chip' | 'modal'

type Props = {
  as?: ElementType
  variant?: Variant
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLElement>

const variantClasses: Record<Variant, string> = {
  nav:   'rounded-glass-lg px-4 py-3',
  card:  'rounded-glass-lg p-6',
  chip:  'rounded-full px-4 py-1.5',
  modal: 'rounded-glass-lg p-8',
}

export default function GlassSurface({
  as: Tag = 'div',
  variant = 'card',
  children,
  className = '',
  ...props
}: Props) {
  return (
    <Tag
      className={`liquid-glass-surface ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
