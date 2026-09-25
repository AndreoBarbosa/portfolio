import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'

type BaseProps = {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  className?: string
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type Props = ButtonProps | AnchorProps

export default function Button({ variant = 'primary', children, className = '', ...props }: Props) {
  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-ink'

  const variants = {
    primary:
      'bg-amber/10 text-amber border border-amber/30 hover:bg-amber/20 hover:border-amber/60',
    secondary:
      'bg-transparent text-cream border border-cream/20 hover:border-cream/50 hover:bg-cream/5',
  }

  const classes = `${base} ${variants[variant]} ${className}`

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
