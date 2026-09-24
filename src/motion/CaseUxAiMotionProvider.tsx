import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'

type CaseMotionContextValue = {
  /** `prefers-reduced-motion`. Nenhum sticky, scrub, parallax ou contagem quando true. */
  reduced: boolean
  /** ≥1440 com ponteiro fino — só aqui sticky, scrub e parallax rodam (docs/CONTRATO-RESPONSIVO.md §7). */
  isDesktop: boolean
}

const CaseMotionContext = createContext<CaseMotionContextValue>({
  reduced: false,
  isDesktop: false,
})

export function useCaseMotion() {
  return useContext(CaseMotionContext)
}

/**
 * Reduced motion + Lenis (D8: só desktop) para a página do case. docs/
 * CONTRATO-RESPONSIVO.md §7: sticky, scrub e parallax existem só em
 * ≥1440 com ponteiro fino — abaixo disso a rolagem nativa já é a
 * experiência certa, Lenis nesse caso só atrapalharia o touch scroll.
 */
export function CaseUxAiMotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion() ?? false
  const [isDesktop, setIsDesktop] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1440px) and (pointer: fine)')
    setIsDesktop(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduced || !isDesktop) return

    // Mesmo ajuste que Home.tsx precisou: com Lenis dono do scroll, o
    // `scroll-behavior: smooth` nativo (index.css) disputa posição com ele
    // a cada frame. Restaurado no cleanup.
    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, lerp: 0.1 })
    let frameId: number
    function raf(time: number) {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
      root.style.scrollBehavior = previousScrollBehavior
    }
  }, [reduced, isDesktop])

  return (
    <CaseMotionContext.Provider value={{ reduced, isDesktop }}>
      <div ref={rootRef}>{children}</div>
    </CaseMotionContext.Provider>
  )
}
