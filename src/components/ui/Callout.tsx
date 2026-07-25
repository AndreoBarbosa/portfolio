import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  label?: string
  /** Frase-chave em destaque editorial — tipo grande e leve, acima do detalhamento. */
  headline?: ReactNode
  tone?: 'dark' | 'gabriel-light' | 'gabriel-dark'
  /** Sobrescreve a margem vertical padrão (my-10) quando o espaçamento já é controlado por fora. */
  className?: string
}

export default function Callout({ children, label = 'Decisão', headline, tone = 'dark', className = 'my-10' }: Props) {
  if (tone === 'gabriel-light') {
    return (
      <div className={`${className} relative pl-6 border-l-2 border-gabriel-moss/60 bg-gabriel-beige/60 rounded-r-xl py-6 pr-6`}>
        <span className="block font-mono text-xs font-semibold text-gabriel-mossDark tracking-widest uppercase mb-4">
          {label}
        </span>
        <div className="text-gabriel-mossDark leading-[1.6] text-[0.95rem]">
          {children}
        </div>
      </div>
    )
  }

  if (tone === 'gabriel-dark') {
    return (
      <div className={`${className} relative pl-6 border-l-2 border-gabriel-sage/60 bg-gabriel-offwhite/[0.06] rounded-r-xl py-6 pr-6`}>
        <span className="block font-mono text-xs font-semibold text-gabriel-offwhite tracking-widest uppercase mb-4">
          {label}
        </span>
        <div className="text-gabriel-offwhite/90 leading-[1.6] text-[0.95rem]">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={`${className} relative pl-6 border-l-2 border-amber/50 bg-cream/[0.03] rounded-r-card py-8 pr-8`}>
      <span className="block font-mono text-xs text-amber tracking-widest uppercase mb-4">
        {label}
      </span>
      {headline && (
        <p
          className="font-satoshi font-light text-cream text-2xl md:text-[28px] leading-[1.2] mb-8 text-balance"
          style={{ letterSpacing: '-0.01em' }}
        >
          {headline}
        </p>
      )}
      <div className="text-cream/80 leading-[1.6] text-[0.95rem]">
        {children}
      </div>
    </div>
  )
}
