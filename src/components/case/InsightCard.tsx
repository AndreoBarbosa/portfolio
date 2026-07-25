import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  label?: string
  variant?: 'default' | 'amber' | 'quote'
}

export default function InsightCard({ children, label, variant = 'default' }: Props) {
  if (variant === 'amber') {
    return (
      <div className="my-10 rounded-card border-2 border-amber/50 bg-amber/[0.08] px-6 py-8 md:px-8">
        {label && (
          <span className="block font-mono text-xs text-amber tracking-widest uppercase mb-4">
            {label}
          </span>
        )}
        <div className="text-cream leading-[1.6] text-[1.05rem]">{children}</div>
      </div>
    )
  }

  if (variant === 'quote') {
    return (
      <div className="my-10 rounded-card glass border-l-[3px] border-l-amber py-8 pl-8 pr-10">
        {label && (
          <span className="block font-mono text-xs text-amber tracking-widest uppercase mb-2">
            {label}
          </span>
        )}
        <div className="text-cream/90 leading-[1.6] text-[1.05rem] space-y-4">{children}</div>
      </div>
    )
  }

  return (
    <div className="my-10 rounded-card border-l-2 border-amber/50 bg-slate/60 py-6 px-6 md:px-8">
      {label && (
        <span className="block font-mono text-xs text-amber tracking-widest uppercase mb-2">
          {label}
        </span>
      )}
      <div className="text-cream/80 leading-[1.6] text-[0.98rem]">{children}</div>
    </div>
  )
}
