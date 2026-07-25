import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Maximize2, X } from 'lucide-react'

export type LightboxImage = {
  src: string
  alt: string
  caption?: string
}

// Grade de thumbnails reduzidos para artefatos densos (matrizes, boards,
// personas) que ficam ilegíveis em tamanho pequeno mas quebram o layout em
// tamanho grande. Clique expande em overlay — reutilizável em outros cases.
export default function ImageLightbox({ images }: { images: LightboxImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (openIndex === null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openIndex])

  const active = openIndex !== null ? images[openIndex] : null

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative rounded-card overflow-hidden border border-muted/15 text-left cursor-zoom-in"
          >
            {/* Altura livre, guiada pela proporção real da imagem — uma
                moldura de altura fixa espremia imagens largas/baixas
                (HMW, personas, arquitetura) num vão minúsculo e deixava
                vazio morto até a legenda. Largura permanece uniforme via
                grid; só a altura varia de card para card, e está certo. */}
            <div className="bg-ink/40 overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-auto block"
              />
            </div>
            <span
              className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-ink/70 text-amber backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-hidden="true"
            >
              <Maximize2 size={14} />
            </span>
            {img.caption && (
              <span className="block font-mono text-xs text-muted px-3 py-3 text-center tracking-wide leading-[1.4]">
                {img.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpenIndex(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0 bg-ink/90 backdrop-blur-md" aria-hidden="true" />
            <motion.div
              className="relative max-w-5xl w-full max-h-[85vh] overflow-auto rounded-card border border-cream/10 bg-slate"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Fechar"
                className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-ink/70 text-cream hover:text-amber backdrop-blur-sm transition-colors duration-200"
              >
                <X size={18} />
              </button>
              <img src={active.src} alt={active.alt} className="w-full block" />
              {active.caption && (
                <p className="font-mono text-xs text-muted text-center tracking-wide py-4">
                  {active.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
