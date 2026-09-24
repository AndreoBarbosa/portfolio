import { useEffect, useRef, useState } from 'react'

/**
 * Cópia local de `src/hooks/useCountUp.ts`, não uma extensão dele — decisão
 * registrada em docs/BRIEF-CASE-SYSMED.md: o hook compartilhado é usado por
 * outras páginas do portfólio, e mexer nele por uma necessidade só do case
 * UX + AI (casas decimais, para 45,3% e 6,7% na S07) arrisca efeito
 * colateral nelas.
 *
 * `delay` em segundos: a contagem começa junto com a entrada do item na
 * cascata. Trava só depois de terminar (`done`), não ao começar: com
 * StrictMode o efeito roda, limpa e roda de novo, e uma trava no início
 * congelava a contagem em zero no dev.
 */
export default function useCountUp(target: number, active: boolean, duration = 800, decimals: 0 | 1 = 0, delay = 0) {
  const [value, setValue] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    if (!active || done.current) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      done.current = true
      setValue(target)
      return
    }

    const factor = 10 ** decimals
    const start = performance.now() + delay * 1000
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)

    let frame: number
    const tick = (now: number) => {
      const progress = Math.min(Math.max(now - start, 0) / duration, 1)
      setValue(Math.round(ease(progress) * target * factor) / factor)
      if (progress < 1) frame = requestAnimationFrame(tick)
      else done.current = true
    }
    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [active, target, duration, decimals, delay])

  return value
}
