type Props = {
  title: string
  description: string
}

export default function LiquidCard({ title, description }: Props) {
  return (
    <a href="#" className="liquid-card block">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-hanken font-semibold text-lg" style={{ color: 'var(--text-strong)' }}>
            {title}
          </h3>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            {description}
          </p>
        </div>
        <span className="liquid-card-arrow text-xl shrink-0" aria-hidden="true">↗</span>
      </div>
    </a>
  )
}
