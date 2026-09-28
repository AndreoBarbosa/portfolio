import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useCaseMotion } from '../../../motion/CaseUxAiMotionProvider'
import {
  EASE,
  HERO_BEAT,
  HERO_DUR,
  HERO_PARALLAX,
  HERO_STATIC,
  HERO_VIDEO,
  REDUCED_FADE,
} from '../../../motion/caseUxAiTokens'

/**
 * A1 — vídeo do hero (docs/BRIEF-S01-HERO.md §2). Em case-xl (≥1440) não é
 * item de layout: é o fundo do frame Hero (802:1032), `scaleMode: FIT` no
 * Figma → `object-fit: contain`, absolute inset-0. Abaixo de 1440 entra no
 * fluxo normal, proporção 4:3, largura total (docs/CONTRATO-RESPONSIVO.md
 * §5 e §8 do brief) — nunca `position: absolute` fora de case-xl (§2 do
 * contrato). De 1024 a 1439 (28 set) faz o mesmo papel dentro do quadro em
 * escala que o S01Hero monta: absolute inset-0, `contain`.
 *
 * Imagem estática (brief §15): um <picture> de alta qualidade fica por cima
 * do <video>, na mesma caixa, e aparece nos dois momentos parados — antes do
 * primeiro quadro (substitui o poster) e depois do `ended`. O quadro 0 do
 * vídeo é o mesmo da imagem, então a saída dela não aparece. No fim, o
 * `playbackRate` desacelera no último trecho e a imagem entra em cross-fade:
 * o objeto assenta e ganha nitidez, em vez de frear num quadro comprimido.
 * Reduced motion, autoplay recusado ou erro de vídeo: a imagem fica e o
 * vídeo não toca.
 *
 * Motion (MOTION-SPEC §6, S01): fade de HERO_DUR.video no beat `video`, no
 * wrapper dos dois. Se sair da viewport antes de terminar, pausa
 * (IntersectionObserver) e retoma ao voltar.
 *
 * Máscara radial na borda: o fundo dissolve no piso mesmo quando o
 * navegador converte a cor do vídeo diferente de #050B0E. O objeto nunca
 * passa de 76% do raio, a máscara só começa em 80%.
 *
 * Parallax só com `isDesktop` (case-xl + ponteiro fino) e sem reduced
 * motion: mouse até HERO_PARALLAX.mouse px na direção oposta ao cursor, com
 * spring forte; scroll a 0.85x do texto, teto HERO_PARALLAX.scrollMax.
 */
const MASK_VALUE = 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 80%, transparent 100%)'
const CAMADA: CSSProperties = { maskImage: MASK_VALUE, WebkitMaskImage: MASK_VALUE }
const CAMADA_CLASSE = 'absolute inset-0 block h-full w-full object-contain'
const SIZES = '(min-width: 1440px) 1440px, 100vw'

/** Atualização do playbackRate na desaceleração: a cada 100ms, não a cada quadro. */
const DESACELERA_PASSO_MS = 100

type Imagem = { visivel: boolean; duracao: number }

export default function HeroMedia() {
  const { reduced, isDesktop } = useCaseMotion()
  const ref = useRef<HTMLVideoElement>(null)
  const parallax = isDesktop && !reduced

  // A imagem começa visível e sem transição. `fading` liga o will-change só
  // durante os dois fades; o transitionend desliga.
  const [imagem, setImagem] = useState<Imagem>({ visivel: true, duracao: 0 })
  const [fading, setFading] = useState(false)

  const mostrarImagem = (duracao: number) => {
    setFading(duracao > 0)
    setImagem({ visivel: true, duracao })
  }
  const esconderImagem = () => {
    setFading(true)
    setImagem({ visivel: false, duracao: HERO_STATIC.fadeOut })
  }

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (reduced) {
      // Mesmo se o autoplay tiver disparado antes do matchMedia resolver.
      video.pause()
      video.currentTime = 0
      return
    }

    let falhou = false
    const falhar = () => {
      falhou = true
      video.pause()
      mostrarImagem(0)
    }

    // Começo: a imagem sai quando o primeiro quadro TOCANDO é apresentado.
    // Registrado no `play`, não antes: com o vídeo parado, o rVFC também
    // dispara quando o quadro 0 carrega, e a imagem sairia sem o vídeo tocar.
    let rvfc = 0
    const primeiroQuadro = () => {
      if (!falhou) esconderImagem()
    }
    const aoPlay = () => {
      if ('requestVideoFrameCallback' in HTMLVideoElement.prototype) {
        rvfc = video.requestVideoFrameCallback(primeiroQuadro)
      } else {
        video.addEventListener('playing', primeiroQuadro, { once: true })
      }
    }
    // O autoplay pode ter começado antes deste efeito montar.
    if (!video.paused) aoPlay()
    else video.addEventListener('play', aoPlay, { once: true })

    // Fim: desacelera no último trecho, curva de saída, a cada 100ms.
    let passo = 0
    const { ultimos, taxaMinima } = HERO_STATIC.desacelera
    const desacelerar = () => {
      const inicio = video.duration - ultimos
      if (!(video.duration > 0) || video.currentTime < inicio) return
      const p = Math.min((video.currentTime - inicio) / ultimos, 1)
      const saida = 1 - Math.pow(1 - p, 3)
      video.playbackRate = 1 + (taxaMinima - 1) * saida
    }
    const comecarPasso = () => {
      window.clearInterval(passo)
      passo = window.setInterval(desacelerar, DESACELERA_PASSO_MS)
    }
    const pararPasso = () => window.clearInterval(passo)
    const terminou = () => {
      pararPasso()
      mostrarImagem(HERO_STATIC.fadeIn)
      video.playbackRate = 1
    }

    video.addEventListener('playing', comecarPasso)
    video.addEventListener('pause', pararPasso)
    video.addEventListener('ended', terminou)
    // Erro de <source> não borbulha: captura no <video>.
    video.addEventListener('error', falhar, true)

    const observer = new IntersectionObserver(([entry]) => {
      if (video.ended || falhou) return
      if (entry.isIntersecting) {
        video.muted = true
        // Autoplay recusado: a imagem fica, o vídeo não toca.
        video.play().catch((err: DOMException) => {
          if (err?.name !== 'AbortError') falhar()
        })
      } else {
        video.pause()
      }
    })
    observer.observe(video)

    return () => {
      observer.disconnect()
      pararPasso()
      if (rvfc) video.cancelVideoFrameCallback(rvfc)
      video.removeEventListener('play', aoPlay)
      video.removeEventListener('playing', primeiroQuadro)
      video.removeEventListener('playing', comecarPasso)
      video.removeEventListener('pause', pararPasso)
      video.removeEventListener('ended', terminou)
      video.removeEventListener('error', falhar, true)
    }
  }, [reduced])

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
    <motion.div
      className="relative z-0 mx-auto block aspect-[4/3] w-full max-w-[692px] lg:absolute lg:inset-0 lg:h-full lg:w-full lg:max-w-none lg:aspect-auto"
      aria-hidden="true"
      style={parallax ? { x: springX, y } : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={
        reduced
          ? { duration: REDUCED_FADE }
          : { duration: HERO_DUR.video, delay: HERO_BEAT.video, ease: EASE.enter }
      }
    >
      <video
        ref={ref}
        className={CAMADA_CLASSE}
        style={CAMADA}
        autoPlay={!reduced}
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
      >
        <source src={HERO_VIDEO.webm} type="video/webm" />
        <source src={HERO_VIDEO.mp4} type="video/mp4" />
      </video>

      <picture>
        <source
          type="image/avif"
          srcSet={`${HERO_STATIC.avif['1x']} 1440w, ${HERO_STATIC.avif['2x']} 2880w`}
          sizes={SIZES}
        />
        <img
          className={CAMADA_CLASSE}
          style={{
            ...CAMADA,
            opacity: imagem.visivel ? 1 : 0,
            transition: imagem.duracao
              ? `opacity ${imagem.duracao}s cubic-bezier(${EASE.state.join(',')})`
              : 'none',
            willChange: fading ? 'opacity' : undefined,
          }}
          onTransitionEnd={() => setFading(false)}
          src={HERO_STATIC.webp['1x']}
          srcSet={`${HERO_STATIC.webp['1x']} 1440w, ${HERO_STATIC.webp['2x']} 2880w`}
          sizes={SIZES}
          width={HERO_STATIC.largura}
          height={HERO_STATIC.altura}
          alt=""
          aria-hidden="true"
          decoding="async"
          // fetchPriority só é reconhecido pelo React 19; no 18 vai como atributo HTML.
          {...({ fetchpriority: 'high' } as object)}
        />
      </picture>
    </motion.div>
  )
}
