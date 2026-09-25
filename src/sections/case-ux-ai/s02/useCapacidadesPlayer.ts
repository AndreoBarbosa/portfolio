import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { animate, useMotionValue, type MotionValue } from 'framer-motion'
import { CAPACIDADES_PLAYER, EASE } from '../../../motion/caseUxAiTokens'

type Options = {
  total: number
  sectionRef: RefObject<HTMLElement>
  /** Reduced motion: sem autoplay, troca instantânea. */
  reduced: boolean
  /** A entrada da seção terminou (etapa 3). O autoplay só começa depois. */
  entradaConcluida: boolean
}

export type CapacidadesPlayer = {
  ativo: number
  /** O que o botão mostra: true = "Pausar". */
  tocando: boolean
  vistos: ReadonlySet<number>
  /** 0 a 1 da cápsula. Escrito por quadro, nunca vira state. */
  progresso: MotionValue<number>
  videoRef: (i: number) => (el: HTMLVideoElement | null) => void
  slideRef: (i: number) => (el: HTMLElement | null) => void
  onEnded: (i: number) => void
  /** Clique ou toque num ponto, deslizar no painel: troca e continua tocando. */
  irParaPonteiro: (k: number) => void
  /** Setas, Home, End: troca e para. */
  irParaTeclado: (k: number) => void
  alternar: () => void
  /** Foco de teclado entrando na paginação desliga `tocando` (APG carrossel). */
  onFocoPaginacao: (el: HTMLElement) => void
}

const T = CAPACIDADES_PLAYER.transicao

function saveData() {
  return Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData)
}

/** Opacidade atual, lida do estilo inline que o animate escreve (ou do CSS inicial). */
function opacidade(el: HTMLElement) {
  return parseFloat(getComputedStyle(el).opacity)
}

/**
 * Player do explorador das capacidades — docs/BRIEF-S02-VISAO-GERAL.md §9 e §19.
 *
 * O tempo de cada capacidade vem do vídeo: a troca começa `antecipa`
 * segundos antes do fim, detectada no mesmo requestVideoFrameCallback que
 * escreve a cápsula; o `ended` é só rede de segurança. Do 04 volta ao 01.
 * `tocando` é o que o botão mostra; `segurado` (fora da tela, aba
 * escondida) pausa o vídeo sem mexer no botão.
 *
 * Troca (§19): vídeos em cross-fade longo com escala, o que sai continua
 * tocando até o fim; texto que sai primeiro, o que entra depois, nunca
 * sobrepostos. Tudo com `animate` do framer-motion direto nos elementos:
 * uma troca durante outra interrompe e segue do valor atual.
 */
export default function useCapacidadesPlayer({ total, sectionRef, reduced, entradaConcluida }: Options): CapacidadesPlayer {
  const semAutoplay = reduced || saveData()

  const [ativo, setAtivo] = useState(0)
  const [tocando, setTocando] = useState(!semAutoplay)
  const [vistos, setVistos] = useState<ReadonlySet<number>>(() => new Set([0]))
  const [visivel, setVisivel] = useState(false)
  const progresso = useMotionValue(0)

  const videos = useRef<(HTMLVideoElement | null)[]>([])
  const slides = useRef<(HTMLElement | null)[]>([])
  const ativoRef = useRef(0)
  const tocandoRef = useRef(tocando)
  const segurado = useRef(true) // começa fora da tela até o observer dizer o contrário
  const iniciado = useRef(false)
  const carregado = useRef(false)
  /** Slide que já disparou o avanço antecipado nesta passagem (evita disparar duas vezes). */
  const avancou = useRef<number | null>(null)

  tocandoRef.current = tocando

  const videoRef = useCallback(
    (i: number) => (el: HTMLVideoElement | null) => {
      videos.current[i] = el
    },
    [],
  )
  const slideRef = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      slides.current[i] = el
    },
    [],
  )

  // ── carregar ──────────────────────────────────────────────────────────
  const carregar = useCallback(() => {
    if (carregado.current) return
    carregado.current = true
    for (const v of videos.current) {
      if (!v) continue
      v.preload = 'auto'
      v.load()
    }
  }, [])

  // ── tocar (muted pela ref, catch sempre) ──────────────────────────────
  const tocarVideo = useCallback(
    (i: number) => {
      const v = videos.current[i]
      if (!v) return
      carregar()
      // O React não aplica `muted` de forma confiável; sem ele o iOS recusa o play().
      v.muted = true
      v.play().catch((err: DOMException) => {
        // AbortError = um pause() ou troca interrompeu o play pendente; não é falha.
        if (err?.name === 'NotAllowedError' && i === ativoRef.current) setTocando(false)
      })
    },
    [carregar],
  )

  const pausarVideo = (i: number) => videos.current[i]?.pause()

  // ── coreografia da troca (§19) ────────────────────────────────────────
  const coreografar = useCallback(
    (de: number, para: number) => {
      const vIn = videos.current[para]
      const vOut = videos.current[de]
      const sIn = slides.current[para]
      const sOut = slides.current[de]

      if (reduced) {
        // Troca instantânea, sem escala.
        for (const [el, on] of [
          [vOut, false],
          [sOut, false],
          [vIn, true],
          [sIn, true],
        ] as const) {
          if (!el) continue
          el.style.opacity = on ? '1' : '0'
          el.style.visibility = on ? 'visible' : 'hidden'
        }
        if (vOut && de !== ativoRef.current) {
          vOut.pause()
          vOut.currentTime = 0
        }
        return
      }

      // Vídeo que entra: 0 → 1 e 1.03 → 1. Se estava escondido, parte da
      // escala de entrada; se estava no meio de um fade, segue de onde está.
      if (vIn) {
        vIn.style.visibility = 'visible'
        vIn.style.willChange = 'opacity, transform'
        const doZero = opacidade(vIn) < 0.01
        animate(vIn, { opacity: 1 }, { duration: T.video, ease: EASE.state })
        animate(vIn, { scale: doZero ? [T.escalaEntrada, 1] : 1 }, { duration: T.video, ease: EASE.enter }).then(
          () => {
            if (ativoRef.current === para) vIn.style.willChange = ''
          },
        )
      }

      // Vídeo que sai: continua tocando; 1 → 0 e 1 → 0.98. No fim, pausa,
      // volta ao quadro 0 e some — a menos que tenha voltado a ser o ativo.
      if (vOut) {
        vOut.style.willChange = 'opacity, transform'
        animate(vOut, { scale: T.escalaSaida }, { duration: T.video, ease: EASE.state })
        animate(vOut, { opacity: 0 }, { duration: T.video, ease: EASE.state }).then(() => {
          if (ativoRef.current === de) return
          vOut.pause()
          vOut.currentTime = 0
          vOut.style.visibility = 'hidden'
          vOut.style.willChange = ''
        })
      }

      // Texto que sai: 280ms, sem deslocamento.
      if (sOut) {
        animate(sOut, { opacity: 0 }, { duration: T.textoSai, ease: EASE.exit }).then(() => {
          if (ativoRef.current !== de) sOut.style.visibility = 'hidden'
        })
      }

      // Texto que entra: 240ms depois, 480ms, subindo 8px. Termina de sair
      // (280ms) antes de o novo ganhar opacidade visível.
      if (sIn) {
        sIn.style.visibility = 'visible'
        const doZero = opacidade(sIn) < 0.01
        animate(sIn, { opacity: 1 }, { duration: T.textoEntra, delay: T.textoAtraso, ease: EASE.enter })
        animate(
          sIn,
          { y: doZero ? [T.textoDesloc, 0] : 0 },
          { duration: T.textoEntra, delay: T.textoAtraso, ease: EASE.enter },
        )
      }
    },
    [reduced],
  )

  // ── trocar de slide (regra 4) ─────────────────────────────────────────
  const irPara = useCallback(
    (k: number, tocar: boolean) => {
      const anterior = ativoRef.current
      if (k === anterior) return

      const v = videos.current[k]
      if (v) v.currentTime = 0
      ativoRef.current = k
      avancou.current = null
      setAtivo(k)
      setVistos((prev) => (prev.has(k) ? prev : new Set(prev).add(k)))
      progresso.set(0)
      if (tocar && !segurado.current) tocarVideo(k)
      // Troca que para (teclado): o que sai também para. No avanço e no
      // ponteiro, o que sai continua tocando até o fim durante o fade.
      if (!tocar) pausarVideo(anterior)

      coreografar(anterior, k)
    },
    [coreografar, progresso, tocarVideo],
  )

  // Avanço (regra 3): chamado pelo laço do quadro em duration − antecipa,
  // ou pelo `ended` se aquele quadro for perdido.
  const avancar = useCallback(
    (i: number) => {
      if (i !== ativoRef.current || avancou.current === i || !tocandoRef.current) return
      avancou.current = i
      progresso.set(1) // a cápsula não "volta" antes de encolher
      irPara((i + 1) % total, true)
    },
    [irPara, progresso, total],
  )
  const avancarRef = useRef(avancar)
  avancarRef.current = avancar

  const onEnded = useCallback((i: number) => avancarRef.current(i), [])

  // ── pausar e reproduzir (regra 5) ─────────────────────────────────────
  const alternar = useCallback(() => {
    if (tocandoRef.current) {
      setTocando(false)
      tocandoRef.current = false
      pausarVideo(ativoRef.current)
    } else {
      setTocando(true)
      tocandoRef.current = true
      iniciado.current = true
      if (!segurado.current) tocarVideo(ativoRef.current)
    }
  }, [tocarVideo])

  // ── troca manual (regras 6 e 7) ───────────────────────────────────────
  const irParaPonteiro = useCallback(
    (k: number) => {
      iniciado.current = true
      if (reduced) {
        setTocando(false)
        tocandoRef.current = false
        irPara(k, false)
      } else {
        setTocando(true)
        tocandoRef.current = true
        irPara(k, true)
      }
    },
    [irPara, reduced],
  )

  const irParaTeclado = useCallback(
    (k: number) => {
      iniciado.current = true
      setTocando(false)
      tocandoRef.current = false
      irPara(k, false)
    },
    [irPara],
  )

  const onFocoPaginacao = useCallback((el: HTMLElement) => {
    if (!el.matches(':focus-visible') || !tocandoRef.current) return
    iniciado.current = true
    setTocando(false)
    tocandoRef.current = false
    pausarVideo(ativoRef.current)
  }, [])

  // ── carregar perto da viewport (regra 1) ──────────────────────────────
  useEffect(() => {
    const section = sectionRef.current
    if (!section || saveData()) return // Save-Data: só carrega quando a pessoa aperta Reproduzir
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        carregar()
        io.disconnect()
      },
      { rootMargin: CAPACIDADES_PLAYER.preloadMargin },
    )
    io.observe(section)
    return () => io.disconnect()
  }, [sectionRef, carregar])

  // ── segurar: seção abaixo de visibleRatio ou aba escondida (regra 8) ──
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let naTela = false

    const aplicar = () => {
      const agora = !naTela || document.hidden
      if (agora === segurado.current) return
      segurado.current = agora
      if (agora) pausarVideo(ativoRef.current)
      else if (tocandoRef.current && iniciado.current) tocarVideo(ativoRef.current)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        naTela = entry.intersectionRatio >= CAPACIDADES_PLAYER.visibleRatio
        setVisivel(naTela)
        aplicar()
      },
      { threshold: [0, CAPACIDADES_PLAYER.visibleRatio] },
    )
    io.observe(section)
    document.addEventListener('visibilitychange', aplicar)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', aplicar)
    }
  }, [sectionRef, tocarVideo])

  // ── começar (regra 2) ─────────────────────────────────────────────────
  useEffect(() => {
    if (iniciado.current || !entradaConcluida || !visivel || semAutoplay) return
    const t = window.setTimeout(() => {
      if (iniciado.current || segurado.current) return
      iniciado.current = true
      // Pausado à mão antes do início: respeita, não liga.
      if (tocandoRef.current) tocarVideo(ativoRef.current)
    }, CAPACIDADES_PLAYER.startDelay * 1000)
    return () => window.clearTimeout(t)
  }, [entradaConcluida, visivel, semAutoplay, tocarVideo])

  // ── cápsula e avanço antecipado: um laço por quadro, só enquanto toca ──
  useEffect(() => {
    const v = videos.current[ativo]
    if (!v) return
    const i = ativo
    let rvfc = 0
    let raf = 0
    // progresso = min(1, t / (duration − antecipa)): a cápsula enche até o
    // instante em que a troca começa.
    const escrever = (t: number) => {
      if (!(v.duration > 0)) return
      const corte = v.duration - CAPACIDADES_PLAYER.antecipa
      progresso.set(Math.min(1, t / corte))
      if (t >= corte) avancarRef.current(i)
    }
    const temRvfc = 'requestVideoFrameCallback' in HTMLVideoElement.prototype
    const tickRvfc = (_: number, meta: VideoFrameCallbackMetadata) => {
      escrever(meta.mediaTime)
      rvfc = v.requestVideoFrameCallback(tickRvfc)
    }
    const tickRaf = () => {
      escrever(v.currentTime)
      raf = requestAnimationFrame(tickRaf)
    }
    const parar = () => {
      if (rvfc) v.cancelVideoFrameCallback(rvfc)
      cancelAnimationFrame(raf)
      rvfc = 0
      raf = 0
    }
    const comecar = () => {
      parar()
      if (temRvfc) rvfc = v.requestVideoFrameCallback(tickRvfc)
      else raf = requestAnimationFrame(tickRaf)
    }
    v.addEventListener('playing', comecar)
    v.addEventListener('pause', parar)
    v.addEventListener('ended', parar)
    if (!v.paused) comecar()
    return () => {
      parar()
      v.removeEventListener('playing', comecar)
      v.removeEventListener('pause', parar)
      v.removeEventListener('ended', parar)
    }
  }, [ativo, progresso])

  return {
    ativo,
    tocando,
    vistos,
    progresso,
    videoRef,
    slideRef,
    onEnded,
    irParaPonteiro,
    irParaTeclado,
    alternar,
    onFocoPaginacao,
  }
}
