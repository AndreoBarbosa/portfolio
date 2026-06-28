type Props = {
  children: React.ReactNode
  className?: string
}

export default function Tag({ children, className = '' }: Props) {
  return (
    <span
      className={`inline-block font-mono text-xs tracking-wide text-muted border border-muted/20 px-2.5 py-1 rounded-sm transition-colors duration-200 hover:border-amber/40 hover:text-amber/80 ${className}`}
    >
      {children}
    </span>
  )
}
