import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { comparisonCards } from '../../data/sysmed'
import useCountUp from '../../hooks/useCountUp'

function Card({
  label,
  value,
  sublabel,
  note,
  tone,
  delay,
}: {
  label: string
  value: number
  sublabel: string
  note: string
  tone: 'stone' | 'amber'
  delay: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(value, inView)

  const border = tone === 'amber' ? 'border-amber/60' : 'border-muted/25'
  const bg = tone === 'amber' ? 'bg-amber/[0.06]' : 'bg-slate/50'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-card border-2 ${border} ${bg} px-6 py-8 md:px-10 md:py-10 flex-1`}
    >
      <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">{label}</p>
      <p className="font-satoshi font-bold text-cream text-[56px] leading-none mb-4">{count}%</p>
      <p className="text-cream/80 text-base mb-5">{sublabel}</p>
      <p className="font-mono text-xs text-muted leading-relaxed">{note}</p>
    </motion.div>
  )
}

export default function ComparisonCards() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card
        label={comparisonCards.classify.label}
        value={comparisonCards.classify.value}
        sublabel={comparisonCards.classify.sublabel}
        note={comparisonCards.classify.note}
        tone="stone"
        delay={0}
      />
      <Card
        label={comparisonCards.prioritize.label}
        value={comparisonCards.prioritize.value}
        sublabel={comparisonCards.prioritize.sublabel}
        note={comparisonCards.prioritize.note}
        tone="amber"
        delay={0.1}
      />
    </div>
  )
}
