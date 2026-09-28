import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Picture, { srcOtimizado } from '../ui/Picture'

const EASE = [0.16, 1, 0.3, 1] as const

export default function LiquidHero() {
  const shouldReduceMotion = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const canPlayVideo = isDesktop && !shouldReduceMotion

  return (
    <section id="hero" className="relative overflow-hidden" style={{ background: '#FFFFFF' }}>
      {/* Figma 1149:1138 (validado em 28 set): título e botões sempre na
          primeira dobra. .liquid-hero-stage e .liquid-hero-media
          (liquid-glass.css) calculam a altura da mídia pelo espaço que
          sobra na tela; o texto vem logo abaixo, como no hero 133:247. A
          máscara em volta do objeto esconde a caixa do vídeo. */}
      <div className="liquid-hero-stage relative max-w-[1198px] mx-auto px-4 flex flex-col items-center">
        <motion.div
          className="liquid-hero-media"
          initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.02 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          aria-hidden="true"
        >
          {canPlayVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={srcOtimizado('/hero-poster.webp', 1664)}
            >
              {/* J2 (correção 13): type precisa acompanhar o src — apontar
                  pra .webm com type="video/mp4" faz alguns navegadores
                  recusarem antes mesmo de tentar decodificar. WebM em VP9
                  tem histórico irregular no Safari/iOS (não testado neste
                  ambiente, sem acesso a Safari real) — .mp4 fica como
                  segundo <source> de fallback, o arquivo ainda existe em
                  public/. O navegador só baixa a fonte que efetivamente
                  usa, então isso não pesa nada onde webm já funciona. */}
              <source src="/hero-bg.webm" type="video/webm" />
              <source src="/hero-bg.mp4" type="video/mp4" />
            </video>
          ) : (
            <Picture src="/hero-poster.webp" sizes="(min-width: 768px) 832px, 80vw" width={2048} height={1152} decoding="async" />
          )}
        </motion.div>

        {/* Desktop: 40 e 24, do nó 133:248. Celular: 32 e 16, com os
            botões em largura cheia (Figma 1149:1140). */}
        <div className="flex flex-col items-center gap-8 md:gap-10 md:mt-2 w-full">
          <div className="flex flex-col gap-4 md:gap-6 items-center text-center w-full">
            <motion.h1
              className="liquid-type-hero-title text-balance"
              style={{ color: '#0C1A22' }}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            >
              Transformo complexidade em clareza
            </motion.h1>

            <p className="liquid-type-hero-sub">
              Product Designer com base em UX Research. Transformo pesquisa em decisões de produto{' '}
              <br className="hidden md:block" />
              que reduzem esforço e simplificam experiências complexas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full sm:w-auto">
            <a
              href="#projetos"
              className="liquid-hero-btn-primary liquid-type-btn inline-flex items-center justify-center w-full sm:w-[186px] px-8 py-3"
            >
              Ver projetos
            </a>
            <a
              href="#trajetoria"
              className="liquid-hero-btn-secondary liquid-type-btn inline-flex items-center justify-center w-full sm:w-auto whitespace-nowrap px-6 sm:px-8 py-3"
            >
              Conhecer minha trajetória
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
