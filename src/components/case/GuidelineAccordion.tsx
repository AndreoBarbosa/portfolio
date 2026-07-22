import { useId, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { guidelines } from '../../data/sysmed'

function Item({ n, title, body, why }: (typeof guidelines)[number]) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div className="rounded-card border border-muted/15 bg-slate/40 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center gap-4 px-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        <span className="font-mono text-amber/60 text-lg font-bold shrink-0" aria-hidden="true">
          {n}
        </span>
        <span className="font-satoshi font-medium text-cream text-base flex-1">{title}</span>
        <ChevronDown
          size={18}
          className={`text-muted shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pl-[52px]">
              <p className="text-cream/70 text-sm leading-relaxed mb-3">{body}</p>
              <p className="font-mono text-xs text-amber/80 leading-relaxed">→ {why}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function GuidelineAccordion() {
  return (
    <div className="space-y-4">
      {guidelines.map((g) => (
        <Item key={g.n} {...g} />
      ))}
    </div>
  )
}
