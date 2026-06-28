type Props = {
  index: string
  label: string
}

export default function SectionLabel({ index, label }: Props) {
  return (
    <div className="flex items-center gap-3 mb-10 lg:mb-14">
      <span className="font-mono text-xs text-amber tracking-wider">{index}</span>
      <div className="h-px flex-1 max-w-[48px] bg-amber/30" />
      <span className="font-mono text-xs text-muted tracking-widest uppercase">{label}</span>
    </div>
  )
}
