import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { desafio } from '../../../data/caseUxAi'
import { useCaseMotion } from '../../../motion/CaseUxAiMotionProvider'
import { BRIEFING_PILULA, EASE } from '../../../motion/caseUxAiTokens'
import useMediaQuery from '../../../motion/useMediaQuery'

const PAINEL_ID = 'briefing'

/**
 * Pílula de briefing — docs/BRIEF-S03-DESAFIO.md §10, MOTION-SPEC §5.
 * Colapso do painel BRIEFING da S03–04: fica fixa no rodapé enquanto o
 * leitor atravessa as seções 05 a 08, e leva de volta ao painel.
 *
 * Aparece quando o painel sai inteiro por cima da tela. Some quando o
 * painel volta ou quando o fim do trecho chega a 60% da tela: o elemento
 * com `data-briefing-fim` (a S09, pelo topo) ou, enquanto ele não existir,
 * o fim do <main>. Não existe abaixo de 768. Escondida, não está no DOM nem
 * no Tab (AnimatePresence).
 */
export default function BriefingPill() {
  const { reduced, getLenis } = useCaseMotion()
  const permitida = useMediaQuery('(min-width: 768px)')
  const [visivel, setVisivel] = useState(false)
  const { pilula } = desafio

  useEffect(() => {
    if (!permitida) {
      setVisivel(false)
      return
    }
    let frame = 0
    const medir = () => {
      frame = 0
      const painel = document.getElementById(PAINEL_ID)
      if (!painel) return setVisivel(false)
      const saiuPorCima = painel.getBoundingClientRect().bottom < 0
      // Fim do trecho: topo da S09 quando ela existir; por ora, o fim do <main>.
      const marco = document.querySelector('[data-briefing-fim]')
      const fim = marco
        ? marco.getBoundingClientRect().top
        : (painel.closest('main')?.getBoundingClientRect().bottom ?? Infinity)
      const passouDoFim = fim <= window.innerHeight * BRIEFING_PILULA.fimEm
      // Some enquanto um trecho marcado `data-sem-pilula` ocupa o rodapé da
      // tela (o clímax da S06: um foco por tela).
      const linha = window.innerHeight - 40
      const cobre = Array.from(document.querySelectorAll('[data-sem-pilula]')).some((el) => {
        const r = el.getBoundingClientRect()
        return r.top < linha && r.bottom > linha
      })
      setVisivel(saiuPorCima && !passouDoFim && !cobre)
    }
    const agendar = () => {
      if (!frame) frame = requestAnimationFrame(medir)
    }
    medir()
    window.addEventListener('scroll', agendar, { passive: true })
    window.addEventListener('resize', agendar)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', agendar)
      window.removeEventListener('resize', agendar)
    }
  }, [permitida])

  const voltar = () => {
    const painel = document.getElementById(PAINEL_ID)
    if (!painel) return
    const titulo = painel.querySelector<HTMLElement>('h3')
    // Foco no título ao chegar: leitor de tela cai no lugar certo.
    const focar = () => titulo?.focus({ preventScroll: true })
    const offset = -BRIEFING_PILULA.topoAoVoltar
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(painel, { offset, onComplete: focar })
      return
    }
    const top = painel.getBoundingClientRect().top + window.scrollY + offset
    if (reduced) {
      window.scrollTo({ top, behavior: 'auto' })
      focar()
      return
    }
    if ('onscrollend' in window) window.addEventListener('scrollend', focar, { once: true })
    else setTimeout(focar, 600)
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-30 flex justify-center px-6"
      style={{ bottom: 'calc(24px + env(safe-area-inset-bottom))' }}
    >
      <AnimatePresence>
        {visivel && (
          <motion.button
            key="pilula"
            type="button"
            aria-label={pilula.ariaLabel}
            onClick={voltar}
            className="briefing-pill pointer-events-auto flex h-14 max-w-[480px] items-center gap-4 rounded-[28px] px-5 py-2 text-left"
            initial={{ opacity: 0, y: reduced ? 0 : BRIEFING_PILULA.desloc }}
            animate={{ opacity: 1, y: 0, transition: { duration: BRIEFING_PILULA.entra, ease: EASE.state } }}
            exit={{
              opacity: 0,
              y: reduced ? 0 : BRIEFING_PILULA.desloc,
              transition: { duration: BRIEFING_PILULA.sai, ease: EASE.exit },
            }}
          >
            <span className="shrink-0 text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--acao-link)]">
              {pilula.rotulo}
            </span>
            <span className="line-clamp-2 text-[14px] leading-[20px] text-[var(--texto-apoio)]">{pilula.texto}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
