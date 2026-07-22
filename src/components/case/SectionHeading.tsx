import { type ReactNode } from 'react'

type Props = {
  index: string
  label: string
  heading: ReactNode
  id?: string
}

export default function SectionHeading({ index, label, heading, id }: Props) {
  return (
    <div className="max-w-[68ch] mb-10 lg:mb-14">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-amber tracking-wider">{index}</span>
        <div className="h-px flex-1 max-w-[48px] bg-amber/30" aria-hidden="true" />
        <span className="font-mono text-xs text-muted tracking-widest uppercase">{label}</span>
      </div>
      <h2
        id={id}
        className="font-satoshi font-bold text-cream text-[34px] md:text-[40px] leading-[1.15] text-balance"
        style={{ letterSpacing: '-0.01em' }}
      >
        {heading}
      </h2>
    </div>
  )
}
