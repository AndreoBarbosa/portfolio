import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

type BaseProps = {
  variant?: 'primary' | 'secondary'
  children: ReactNode
  className?: string
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type Props = ButtonProps | AnchorProps

export default function LiquidButton({ variant = 'primary', children, className = '', ...props }: Props) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 text-sm'
  const variantClass = variant === 'primary' ? 'liquid-btn-primary' : 'liquid-btn-secondary'
  const classes = `${base} ${variantClass} ${className}`

  if ('href' in props && props.href) {
    const { href, ...anchorRest } = props as AnchorProps
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    )
  }

  const { ...buttonRest } = props as ButtonProps
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  )
}
