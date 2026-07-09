import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  label?: string
  tone?: 'dark' | 'sona-light' | 'sona-dark' | 'gabriel-light' | 'gabriel-dark'
}

export default function Callout({ children, label = 'Decisão', tone = 'dark' }: Props) {
  if (tone === 'gabriel-light') {
    return (
      <div className="my-10 relative pl-6 border-l-2 border-gabriel-moss/60 bg-gabriel-beige/60 rounded-r-xl py-6 pr-6">
        <span className="block font-mono text-xs font-semibold text-gabriel-mossDark tracking-widest uppercase mb-4">
          {label}
        </span>
        <div className="text-gabriel-mossDark leading-relaxed text-[0.95rem]">
          {children}
        </div>
      </div>
    )
  }

  if (tone === 'gabriel-dark') {
    return (
      <div className="my-10 relative pl-6 border-l-2 border-gabriel-sage/60 bg-gabriel-offwhite/[0.06] rounded-r-xl py-6 pr-6">
        <span className="block font-mono text-xs font-semibold text-gabriel-offwhite tracking-widest uppercase mb-4">
          {label}
        </span>
        <div className="text-gabriel-offwhite/90 leading-relaxed text-[0.95rem]">
          {children}
        </div>
      </div>
    )
  }
  if (tone === 'sona-light') {
    return (
      <div className="my-10 relative pl-6 border-l-2 border-sona-coral/60 bg-sona-sand/60 rounded-r-xl py-6 pr-6">
        <span className="block font-mono text-xs font-semibold text-sona-navy tracking-widest uppercase mb-4">
          {label}
        </span>
        <div className="text-sona-navy leading-relaxed text-[0.95rem]">
          {children}
        </div>
      </div>
    )
  }

  if (tone === 'sona-dark') {
    return (
      <div className="my-10 relative pl-6 border-l-2 border-sona-coral/60 bg-sona-off/[0.06] rounded-r-xl py-6 pr-6">
        <span className="block font-mono text-xs font-semibold text-sona-off tracking-widest uppercase mb-4">
          {label}
        </span>
        <div className="text-sona-off/90 leading-relaxed text-[0.95rem]">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="my-10 relative pl-6 border-l-2 border-amber/50 bg-slate/60 rounded-r-xl py-5 pr-6">
      <span className="block font-mono text-xs text-amber tracking-widest uppercase mb-3">
        {label}
      </span>
      <div className="text-cream/80 leading-relaxed text-[0.95rem]">
        {children}
      </div>
    </div>
  )
}
