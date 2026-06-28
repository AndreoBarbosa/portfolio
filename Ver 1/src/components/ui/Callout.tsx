import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  label?: string
}

export default function Callout({ children, label = 'Decisão' }: Props) {
  return (
    <div className="my-10 relative pl-6 border-l-2 border-amber/50 bg-slate/60 rounded-r-sm py-5 pr-6">
      <span className="block font-mono text-xs text-amber tracking-widest uppercase mb-3">
        {label}
      </span>
      <div className="text-cream/80 leading-relaxed text-[0.95rem]">
        {children}
      </div>
    </div>
  )
}
