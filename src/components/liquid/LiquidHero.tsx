import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

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
      {/* Node 133:247 (Figma): caixa de conteúdo 1198px. O vídeo ocupa a
          largura INTEIRA da caixa (não um círculo de ~720px) — ele
          domina o topo. Texto/botões ficam logados a ele (o vídeo é um
          fundo absoluto no Figma; aqui reproduzimos a proximidade com
          uma margem negativa pequena, já que o asset tem folga própria
          na base). Nada de máscara/parallax — não estão no Figma. */}
      <div className="relative max-w-[1198px] mx-auto px-4 flex flex-col items-center pt-[140px] pb-12 md:pt-[164px] md:pb-16">
        <motion.div
          className="w-full"
          initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.02 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          aria-hidden="true"
        >
          {canPlayVideo ? (
            <video
              className="w-full h-auto object-contain"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/hero-poster.webp"
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
            <img src="/hero-poster.webp" alt="" className="w-full h-auto object-contain" decoding="async" />
          )}
        </motion.div>

        {/* D9 (correção 02): gap-[40px] confirmado via MCP (nó 133:248) —
            era mt-8/mt-12 (32/48px), nenhum dos dois batia. */}
        <div className="flex flex-col items-center gap-10 mt-10">
          <div className="flex flex-col gap-6 items-center text-center w-full">
            <motion.h1
              className="liquid-type-hero-title text-balance"
              style={{ color: '#0C1A22' }}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            >
              Transformo complexidade em clareza
            </motion.h1>

            <p className="liquid-type-hero-sub" style={{ color: '#625F5D' }}>
              Product Designer com base em UX Research. Transformo pesquisa em decisões de produto{' '}
              <br className="hidden md:block" />
              que reduzem esforço e simplificam experiências complexas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
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
