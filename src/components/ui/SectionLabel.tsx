type Props = {
  index: string
  label: string
  tone?: 'dark' | 'sona-light' | 'sona-dark' | 'gabriel-light' | 'gabriel-dark'
}

export default function SectionLabel({ index, label, tone = 'dark' }: Props) {
  if (tone === 'sona-light') {
    return (
      <div className="flex items-center gap-4 mb-10 lg:mb-14">
        <span className="font-mono text-xs text-sona-navy tracking-wider">{index}</span>
        <div className="h-px flex-1 max-w-[48px] bg-sona-coral/40" />
        <span className="font-mono text-xs text-sona-navy tracking-widest uppercase">{label}</span>
      </div>
    )
  }

  if (tone === 'sona-dark') {
    return (
      <div className="flex items-center gap-4 mb-10 lg:mb-14">
        <span className="font-mono text-xs text-sona-off tracking-wider">{index}</span>
        <div className="h-px flex-1 max-w-[48px] bg-sona-coral/40" />
        <span className="font-mono text-xs text-sona-off/70 tracking-widest uppercase">{label}</span>
      </div>
    )
  }

  if (tone === 'gabriel-light') {
    return (
      <div className="flex items-center gap-4 mb-10 lg:mb-14">
        <span className="font-mono text-xs text-gabriel-mossDark tracking-wider">{index}</span>
        <div className="h-px flex-1 max-w-[48px] bg-gabriel-moss/40" />
        <span className="font-mono text-xs text-gabriel-mossDark tracking-widest uppercase">{label}</span>
      </div>
    )
  }

  if (tone === 'gabriel-dark') {
    return (
      <div className="flex items-center gap-4 mb-10 lg:mb-14">
        <span className="font-mono text-xs text-gabriel-offwhite tracking-wider">{index}</span>
        <div className="h-px flex-1 max-w-[48px] bg-gabriel-sage/40" />
        <span className="font-mono text-xs text-gabriel-offwhite/70 tracking-widest uppercase">{label}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 mb-10 lg:mb-14">
      <span className="font-mono text-xs text-amber tracking-wider">{index}</span>
      <div className="h-px flex-1 max-w-[48px] bg-amber/30" />
      <span className="font-mono text-xs text-muted tracking-widest uppercase">{label}</span>
    </div>
  )
}
