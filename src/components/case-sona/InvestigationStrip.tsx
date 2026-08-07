import type { LucideIcon } from 'lucide-react'
import { sonaAccent } from '../../data/sona'

type Item = { icon: LucideIcon; title: string; sub: string }

type Props = {
  label: string
  items: Item[]
}

// Faixa escura "Como investigaria" — S16. Confirmado via
// get_design_context (nó 577:2656): bg #162530, radius 16px, padding
// 28px/20px, divisórias verticais entre itens (visíveis só a partir de
// lg, onde a faixa está numa linha só).
export default function InvestigationStrip({ label, items }: Props) {
  return (
    <div
      className="rounded-2xl px-6 md:px-7 py-5 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-0"
      style={{ background: sonaAccent.panelBg }}
    >
      {/* R1 (Ajustes 03): "Como investigaria" não está na allowlist de mono
          — revertido pro original (Outfit SemiBold 15px). */}
      <p className="font-outfit font-semibold text-[15px] shrink-0 lg:pr-8" style={{ color: '#EBEEF1' }}>
        {label}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-1 lg:justify-between gap-6">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`flex items-center gap-3 lg:px-6 ${i > 0 ? 'lg:border-l' : ''}`}
            style={{ borderColor: 'rgba(255,255,255,0.12)' }}
          >
            <item.icon size={22} strokeWidth={1.75} style={{ color: '#EBEEF1' }} className="shrink-0" aria-hidden="true" />
            <div>
              <p className="font-outfit font-semibold text-base" style={{ color: '#EBEEF1' }}>
                {item.title}
              </p>
              <p className="font-outfit text-xs" style={{ color: '#9CA3AF' }}>
                {item.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
