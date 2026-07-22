import { motion } from 'framer-motion'
import { heuristicData } from '../../data/sysmed'

const maxCount = Math.max(...heuristicData.map((h) => h.count))
const maxSeverity = 4

export default function HeuristicChart() {
  return (
    <div>
      <div
        className="grid gap-x-4 gap-y-6 items-center"
        style={{ gridTemplateColumns: 'minmax(160px, 220px) 1fr auto' }}
      >
        {/* Header row */}
        <span className="font-mono text-[10px] text-muted tracking-widest uppercase" />
        <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
          Atribuições (de 124)
        </span>
        <span className="font-mono text-[10px] text-muted tracking-widest uppercase text-right">
          Severidade média
        </span>

        {heuristicData.map((h, i) => (
          <RowFragment key={h.name} name={h.name} count={h.count} severity={h.avgSeverity} delay={i * 0.05} />
        ))}
      </div>

      <table className="sr-only">
        <caption>Distribuição de violações por heurística, com severidade média</caption>
        <thead>
          <tr>
            <th>Heurística</th>
            <th>Atribuições</th>
            <th>Severidade média</th>
          </tr>
        </thead>
        <tbody>
          {heuristicData.map((h) => (
            <tr key={h.name}>
              <td>{h.name}</td>
              <td>{h.count}</td>
              <td>{h.avgSeverity.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RowFragment({
  name,
  count,
  severity,
  delay,
}: {
  name: string
  count: number
  severity: number
  delay: number
}) {
  const barPct = (count / maxCount) * 100
  const severityPct = (severity / maxSeverity) * 100

  return (
    <>
      <span className="text-cream/80 text-sm leading-snug">{name}</span>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-3 rounded-chip bg-muted/15 overflow-hidden">
          <motion.div
            className="h-full rounded-chip bg-muted/70"
            initial={{ width: 0 }}
            whileInView={{ width: `${barPct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <span className="font-mono text-xs text-cream/70 w-6 text-right shrink-0">{count}</span>
      </div>

      <div className="flex items-center gap-2 justify-end w-[110px]">
        <div className="w-16 h-1.5 rounded-chip bg-muted/15 overflow-hidden">
          <motion.div
            className="h-full rounded-chip bg-amber"
            initial={{ width: 0 }}
            whileInView={{ width: `${severityPct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <span className="font-mono text-xs text-amber w-8 text-right shrink-0">
          {severity.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      </div>
    </>
  )
}
