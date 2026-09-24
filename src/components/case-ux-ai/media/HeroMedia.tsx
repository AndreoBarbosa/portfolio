import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useCaseMotion } from '../../../motion/CaseUxAiMotionProvider'
import { EASE, HERO_BEAT, HERO_DUR, HERO_PARALLAX, HERO_VIDEO, REDUCED_FADE } from '../../../motion/caseUxAiTokens'

/**
 * A1 — vídeo do hero (docs/BRIEF-S01-HERO.md §2). Em case-xl (≥1440) não é
 * item de layout: é o fundo do frame Hero (802:1032), `scaleMode: FIT` no
 * Figma → `object-fit: contain`, absolute inset-0. Abaixo de 1440 entra no
 * fluxo normal, proporção 4:3, largura total (docs/CONTRATO-RESPONSIVO.md
 * §5 e §8 do brief) — nunca `position: absolute` fora de case-xl (§2 do
 * contrato).
 *
 * Motion (MOTION-SPEC §6, S01): fade de HERO_DUR.video no beat `video`,
 * toca uma vez (sem `loop`) e congela no último frame — é o comportamento
 * nativo de <video> ao terminar. Só começa a tocar quando está na viewport.
 * Reduced motion: não toca, fica o poster.
 *
 * Parallax só com `isDesktop` (case-xl + ponteiro fino) e sem reduced
 * motion: mouse até HERO_PARALLAX.mouse px na direção oposta ao cursor, com
 * spring forte; scroll a 0.85x do texto, teto HERO_PARALLAX.scrollMax.
 */
export default function HeroMedia() {
  const { reduced, isDesktop } = useCaseMotion()
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { once: true })
  const parallax = isDesktop && !reduced

  useEffect(() => {
    const video = ref.current
    if (!video || reduced || !inView) return
    video.play().catch(() => {
      // Autoplay bloqueado (economia de dados, etc.): o poster fica, nada quebra.
    })
  }, [reduced, inView])

  // Mouse: -1..1 a partir do centro da viewport, invertido e suavizado.
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, HERO_PARALLAX.spring)
  const springY = useSpring(mouseY, HERO_PARALLAX.spring)

  useEffect(() => {
    if (!parallax) {
      mouseX.set(0)
      mouseY.set(0)
      return
    }
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      mouseX.set(-nx * HERO_PARALLAX.mouse)
      mouseY.set(-ny * HERO_PARALLAX.mouse)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [parallax, mouseX, mouseY])

  // Scroll: o texto anda 1x, o objeto 0.85x — sobra (1 - 0.85) do scroll
  // como deslocamento para baixo, até o teto.
  const { scrollY } = useScroll()
  const scrollShift = useTransform(scrollY, (y) =>
    Math.min(y * (1 - HERO_PARALLAX.scrollRate), HERO_PARALLAX.scrollMax),
  )
  const y = useTransform([springY, scrollShift], ([m, s]: number[]) => m + s)

  return (
    <motion.video
      ref={ref}
      className="relative z-0 mx-auto block aspect-[4/3] w-full max-w-[692px] object-contain case-xl:absolute case-xl:inset-0 case-xl:z-0 case-xl:h-full case-xl:w-full case-xl:max-w-none case-xl:aspect-auto"
      muted
      playsInline
      preload="auto"
      poster={HERO_VIDEO.poster}
      aria-hidden="true"
      tabIndex={-1}
      style={parallax ? { x: springX, y } : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={
        reduced
          ? { duration: REDUCED_FADE }
          : { duration: HERO_DUR.video, delay: HERO_BEAT.video, ease: EASE.enter }
      }
    >
      <source src={HERO_VIDEO.webm} type="video/webm" />
      <source src={HERO_VIDEO.mp4} type="video/mp4" />
    </motion.video>
  )
}
