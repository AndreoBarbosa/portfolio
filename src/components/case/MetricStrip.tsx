import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { metrics, metricsFootnote } from '../../data/sysmed'
import useCountUp from '../../hooks/useCountUp'

function MetricCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(value, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-card px-6 py-8 text-center"
    >
      <p className="font-satoshi font-bold text-amber text-[40px] md:text-[48px] leading-none mb-4">
        {count}
        {suffix}
      </p>
      <p className="font-mono text-[11px] text-muted tracking-wide uppercase leading-[1.5] whitespace-pre-line">
        {label}
      </p>
    </motion.div>
  )
}

export default function MetricStrip({ showFootnote = true }: { showFootnote?: boolean }) {
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {metrics.map((m, i) => (
          <MetricCard key={m.label} value={m.value} suffix={m.suffix} label={m.label} delay={i * 0.08} />
        ))}
      </div>
      {showFootnote && (
        <p className="text-center font-mono text-xs text-muted tracking-wide mt-8">
          {metricsFootnote}
        </p>
      )}
    </div>
  )
}
