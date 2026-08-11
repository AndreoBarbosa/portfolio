import { useRef } from 'react'
import { useInView } from 'framer-motion'
import useCountUp from '../../hooks/useCountUp'

type Props = {
  value: number
  suffix: string
  label: string
}

// Número com contagem — S14. Confirmado via get_design_context (nó
// 577:2503): Hanken SemiBold 48px. Contagem crescente, teto de 800ms
// (briefing §5) — useCountUp já respeita prefers-reduced-motion
// (resolve direto pro valor final).
//
// R1 (Ajustes 03): legenda não é mono — revertida pro original.
// C2 (correção secundaria-500): os 4 números (40+/100+/3/1) confirmados
// #3B6EA5 via MCP, sem exceção.
export default function StatItem({ value, suffix, label }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(value, inView, 800)

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <p className="font-hanken font-semibold text-[48px] leading-[1.1]" style={{ color: 'var(--secundaria-500)', letterSpacing: '-0.96px' }}>
        {count}
        {suffix}
      </p>
      <p className="font-outfit font-semibold text-xs" style={{ color: '#6B7280', letterSpacing: '0.24px' }}>
        {label}
      </p>
    </div>
  )
}
