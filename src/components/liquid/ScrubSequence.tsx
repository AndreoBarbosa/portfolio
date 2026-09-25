import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import { SCRUB_LERP } from '../../motion/tokens'

type Props = {
  /** URLs dos quadros, em ordem. */
  frames: string[]
  /** Mostrado enquanto a sequência carrega, e usado como fallback estático. */
  poster: string
  alt?: string
  className?: string
  /** Altura da trilha de scroll, em viewports. 2.5 = 250vh. */
  viewports?: number
  /** Largura mínima em px para o scrub rodar. Abaixo disso, imagem estática. */
  minWidth?: number
  fit?: 'contain' | 'cover'
  /** Cor de fundo do canvas. Precisa bater com o fundo da seção. */
  background?: string
  /**
   * Conteúdo da cena. Recebe `active`: true quando o scrub está rodando
   * (a cena está presa e o conteúdo deve se posicionar sobre ela), false no
   * fallback de mobile e reduced-motion (fluxo normal, abaixo da imagem).
   */
  children?: (active: boolean) => ReactNode
}

function clamp(v: number, a: number, b: number) {
  return v < a ? a : v > b ? b : v
}

/**
 * Cena presa cujo quadro é função da posição do scroll.
 *
 * Por que sequência de imagens e não o <video> que já existe: o hero-bg.webm
 * tem 302 quadros e apenas 3 keyframes, ou seja um GOP de cerca de 100. Cada
 * seek obriga o decodificador a percorrer até 100 quadros a partir do
 * keyframe anterior, e o scrub engasga. Reencodar o mesmo vídeo em all-intra
 * a 1080p dá 27 MB. A sequência de 48 quadros a 1600px pesa 2 MB, menos que
 * os 3,5 MB do webm atual.
 *
 * O evento de scroll nunca desenha. Ele só escreve um alvo, e o desenho
 * acontece no requestAnimationFrame interpolando em direção a esse alvo. É o
 * atraso dessa interpolação que dá a sensação de material com peso. Sem ele,
 * a imagem cola no dedo e o efeito perde o valor.
 */
export default function ScrubSequence({
  frames,
  poster,
  alt = '',
  className = '',
  viewports = 2.5,
  minWidth = 768,
  fit = 'contain',
  background = '#FFFFFF',
  children,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])

  const shouldReduce = useReducedMotion()
  const [wideEnough, setWideEnough] = useState(false)
  const [ready, setReady] = useState(false)

  const active = wideEnough && !shouldReduce

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`)
    setWideEnough(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setWideEnough(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [minWidth])

  /* Pré-carregamento. Só marca pronto quando todos os quadros existem: um
     scrub que pula quadros ausentes lê como bug, não como carregamento. */
  useEffect(() => {
    if (!active) return
    let cancelled = false
    let remaining = frames.length
    const loaded: HTMLImageElement[] = []

    frames.forEach((src, i) => {
      const img = new Image()
      img.decoding = 'async'
      const done = () => {
        if (cancelled) return
        remaining -= 1
        if (remaining === 0) {
          imagesRef.current = loaded
          setReady(true)
        }
      }
      img.onload = done
      // Um quadro que falha não pode travar a cena inteira: conta como
      // resolvido e o desenho cai no quadro válido mais próximo.
      img.onerror = done
      img.src = src
      loaded[i] = img
    })

    return () => {
      cancelled = true
    }
  }, [active, frames])

  /* Loop de desenho. */
  useEffect(() => {
    if (!active || !ready) return
    const canvas = canvasRef.current
    const track = trackRef.current
    if (!canvas || !track) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frameId = 0
    let current = 0
    let cw = 0
    let ch = 0

    function size() {
      const c = canvasRef.current
      if (!c) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = c.getBoundingClientRect()
      cw = Math.max(1, Math.round(r.width))
      ch = Math.max(1, Math.round(r.height))
      c.width = Math.round(cw * dpr)
      c.height = Math.round(ch * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw(index: number) {
      const img = imagesRef.current[index]
      if (!img || !img.naturalWidth) return
      ctx!.fillStyle = background
      ctx!.fillRect(0, 0, cw, ch)
      const sx = cw / img.naturalWidth
      const sy = ch / img.naturalHeight
      const scale = fit === 'cover' ? Math.max(sx, sy) : Math.min(sx, sy)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      ctx!.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }

    function loop() {
      const t = trackRef.current
      if (t) {
        const r = t.getBoundingClientRect()
        const total = r.height - window.innerHeight
        const target = total > 0 ? clamp(-r.top / total, 0, 1) : 0
        current += (target - current) * SCRUB_LERP
        if (Math.abs(target - current) < 0.0002) current = target
        draw(Math.round(current * (frames.length - 1)))
      }
      frameId = requestAnimationFrame(loop)
    }

    size()
    const ro = new ResizeObserver(() => {
      size()
      draw(Math.round(current * (frames.length - 1)))
    })
    ro.observe(canvas)
    frameId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frameId)
      ro.disconnect()
    }
  }, [active, ready, frames.length, fit, background])

  /* Mobile e reduced-motion: imagem estática no fluxo normal, sem trilha,
     sem canvas, sem rAF. O layout da seção não muda de forma. */
  if (!active) {
    return (
      <div className={className}>
        <img src={poster} alt={alt} className="w-full h-auto object-contain" decoding="async" />
        {children?.(false)}
      </div>
    )
  }

  return (
    <div ref={trackRef} className={className} style={{ height: `${viewports * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background }}>
        <canvas ref={canvasRef} className="block w-full h-full" role="img" aria-label={alt} />
        {!ready && (
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain"
            decoding="async"
          />
        )}
        {children?.(true)}
      </div>
    </div>
  )
}
