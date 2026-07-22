import { motion } from 'framer-motion'
import { processSteps } from '../../data/sysmed'

export default function ProcessTimeline() {
  return (
    <div className="relative">
      <div
        className="absolute left-[15px] top-2 bottom-2 w-px bg-muted/20"
        aria-hidden="true"
      />
      <ol className="space-y-10">
        {processSteps.map((step, i) => (
          <motion.li
            key={step.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-12"
          >
            <span
              className="absolute left-0 top-0 w-8 h-8 rounded-full bg-amber flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="w-2 h-2 rounded-full bg-ink" />
            </span>
            <p className="font-mono text-xs text-amber tracking-widest uppercase mb-1">{step.n}</p>
            <h3 className="font-satoshi font-medium text-cream text-xl mb-2">{step.title}</h3>
            <p className="text-muted text-sm mb-2">{step.subtitle}</p>
            <p className="text-cream/70 text-base leading-relaxed max-w-[60ch]">{step.body}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
