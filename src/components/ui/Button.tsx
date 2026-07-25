import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'

type BaseProps = {
  variant?: 'primary' | 'secondary' | 'solid'
  children: React.ReactNode
  className?: string
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type Props = ButtonProps | AnchorProps

export default function Button({ variant = 'primary', children, className = '', ...props }: Props) {
  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-ink'

  // Vidro contido: fundo de baixa opacidade + borda 1px. Hover clareia fundo e
  // borda suavemente (150ms) — nunca glow. Contraste checado: amber e cream
  // sobre o ink de fundo do site passam AA com folga (~7.6:1 e ~15:1).
  //
  // "solid" é a segunda exceção deliberada à regra de vidro contido (a
  // primeira é `.social-link--cta`): reservada para o único CTA mais forte
  // de uma tela (hoje, "Ver projetos" no hero). Ink sobre amber passa AA com
  // folga; não usar em mais de um botão por tela ou a hierarquia se perde.
  const variants = {
    primary:
      'bg-amber/10 text-amber border border-amber/30 hover:bg-amber/[0.16] hover:border-amber/45',
    secondary:
      'bg-cream/[0.03] text-cream border border-cream/20 hover:bg-cream/[0.07] hover:border-cream/40',
    solid:
      'bg-amber text-ink border border-amber hover:bg-amber/90',
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
