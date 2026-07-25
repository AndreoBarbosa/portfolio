import { motion } from 'framer-motion'
import { modelSteps } from '../../data/sysmed'

export default function ModelSteps() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {modelSteps.map((step, i) => {
        const isAuto = step.highlight === 'auto'
        const isHuman = step.highlight === 'human'
        return (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className={`rounded-card border p-6 flex flex-col ${
              isHuman
                ? 'border-amber/60 bg-amber/[0.08]'
                : isAuto
                ? 'border-muted/40 bg-slate/70'
                : 'border-muted/15 bg-slate/40'
            }`}
          >
            <span className="font-mono text-muted/50 text-2xl font-bold mb-3" aria-hidden="true">
              {step.n}
            </span>
            <h3 className="font-satoshi font-medium text-cream text-lg mb-2">{step.title}</h3>
            <p className="text-cream/70 text-sm leading-[1.5] mb-4 flex-1">{step.body}</p>
            <span
              className={`self-start font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-chip ${
                isHuman
                  ? 'bg-amber text-ink'
                  : isAuto
                  ? 'border border-cream/30 text-cream'
                  : 'border border-muted/30 text-muted'
              }`}
            >
              {step.mode} {isHuman ? '★' : isAuto ? '✓' : ''}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}
