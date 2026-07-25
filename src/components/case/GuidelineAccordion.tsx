import { useId, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export type AccordionItem = {
  n: string
  title: string
  body: string
  why: string
}

function Item({ n, title, body, why }: AccordionItem) {
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
              <p className="text-cream/70 text-sm leading-[1.5] mb-3">{body}</p>
              <p className="font-mono text-xs text-amber/80 leading-[1.5]">→ {why}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function GuidelineAccordion({ items }: { items: AccordionItem[] }) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return (
      <div className="space-y-4">
        {items.map((item) => (
          <Item key={item.n} {...item} />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {items.map((item) => (
        <motion.div
          key={item.n}
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <Item {...item} />
        </motion.div>
      ))}
    </motion.div>
  )
}
