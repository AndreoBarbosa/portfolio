import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from 'framer-motion'
import Container from '../../components/case-ux-ai/layout/Container'
import { descoberta } from '../../data/caseUxAi'
import { useCaseMotion } from '../../motion/CaseUxAiMotionProvider'
import { atBeat, enterFade, enterFadeUp, reducedFade } from '../../motion/caseUxAiRecipes'
import { DUR, S06_CLIMAX, SCRUB_SPRING, VIEWPORT } from '../../motion/caseUxAiTokens'
import useMediaQuery from '../../motion/useMediaQuery'
import './secoes-finais.css'

type Faixa = readonly [number, number]
type Linha = (typeof descoberta.linhas)[number]

const easeOut = (v: number) => 1 - Math.pow(1 - v, 3)

/** Parte um texto em volta do trecho em destaque. */
function partir(texto: string, destaque: string) {
  const i = texto.indexOf(destaque)
  return i === -1 ? [texto, '', ''] : [texto.slice(0, i), destaque, texto.slice(i + destaque.length)]
}

/** 0 a 1 dentro da faixa do progresso. */
function useFase(p: MotionValue<number>, faixa: Faixa) {
  return useTransform(p, [faixa[0], faixa[1]], [0, 1], { clamp: true })
}

/**
 * Geometria do Figma, em px do frame de 1440 (nó 1104:1139). A onda é o
 * ASSET 8 SEM FUNDO recortado em 1440×448; as duas cristas são os pontos
 * onde os números pousam. Tudo no palco escala junto por `u` (1 = 1440).
 */
const D = {
  larg: 1440,
  ondaAlt: 448,
  crista1: 423, // x da crista alta; y = topo da onda
  crista2: { x: 1001, y: 193 }, // crista baixa, relativa ao topo da onda
  vaoX: 808, // guia vertical dos 20 pontos
  bloco1: 358,
  bloco2: 936,
  folga: 48, // o bloco termina 48 acima da sua crista
  numeroAlt: 130, // 144 × 0.9
  textoFixo: 82, // rótulo, frase e nota: 16 + 18 + 4 + 20 + 4 + 20, não escalam
  fecho: { x: 120, y: 342, w: 440 },
  respiro: 64, // título até o palco, fixo em px (pedido do Andreo, 28 set): não escala com u
} as const

/** Celular e tablet (nó 1119:1138, 390): a onda em vw, sangrando dos dois lados. */
const M = {
  ondaW: 184.615, // 720 em 390
  ondaX: -38.974, // -152
  ondaH: 57.436, // 224
  crista1: 15.256, // 59.5
  crista2: 89.359, // 348.5
  dif: 24.744, // 96.5: distância vertical entre as cristas
  vao: 64.615, // 252
} as const

const ONDA = '/case-ux-ai/s06-onda'
function Onda({ sizes, className, style }: { sizes: string; className?: string; style?: CSSProperties }) {
  return (
    <picture>
      <source type="image/avif" srcSet={`${ONDA}-1440.avif 1440w, ${ONDA}-2688.avif 2688w`} sizes={sizes} />
      <source type="image/webp" srcSet={`${ONDA}-1440.webp 1440w, ${ONDA}-2688.webp 2688w`} sizes={sizes} />
      <img
        src={`${ONDA}-1440.webp`}
        alt=""
        aria-hidden="true"
        width={1440}
        height={448}
        loading="lazy"
        decoding="async"
        className={className}
        style={style}
      />
    </picture>
  )
}

/** Número monumental que conta junto com a própria fase. */
function Numero({ valor, t, className }: { valor: number; t: MotionValue<number>; className: string }) {
  const numero = useTransform(t, (v) => String(Math.round(easeOut(v) * valor)))
  return (
    <p className={`s06-numero f-display font-semibold tabular-nums text-[var(--texto-principal)] ${className}`}>
      <motion.span>{numero}</motion.span>
      <span className="s06-pct">%</span>
    </p>
  )
}

/** Rótulo, frase e nota do bloco de um número. */
function Legenda({ dado, t, compacto }: { dado: Linha; t: MotionValue<number>; compacto?: boolean }) {
  const nota = useTransform(t, [0.7, 1], [0, 1])
  const txt = compacto ? 'text-[12px] leading-[16px] md:text-[14px] md:leading-[20px]' : 'text-[14px] leading-[20px]'
  return (
    <>
      <p className={`${compacto ? 'mt-2' : 'mt-4'} s06-rotulo`}>{dado.verbo}</p>
      <p className={`mt-1 ${txt} text-[var(--texto-apoio)]`}>{dado.rotulo}</p>
      <motion.p className={`${compacto ? 'mt-0.5' : 'mt-1'} ${txt} text-[var(--texto-metadado)]`} style={{ opacity: nota }}>
        <span className="font-semibold text-[var(--texto-apoio)]">{dado.nota.valor}</span> {dado.nota.texto}
      </motion.p>
    </>
  )
}

/** Haste do bloco até a crista e o ponto aceso sobre ela. */
function Haste({ t, x, topo, altura, crista }: { t: MotionValue<number>; x: string; topo: string; altura: string; crista: string }) {
  const desce = useTransform(t, [0.55, 0.85], [0, 1], { clamp: true })
  const acende = useTransform(t, [0.8, 1], [0, 1], { clamp: true })
  return (
    <>
      <motion.span
        aria-hidden="true"
        className="s06-haste pointer-events-none absolute w-px origin-top"
        style={{ left: x, top: topo, height: altura, scaleY: desce }}
      />
      <motion.span
        aria-hidden="true"
        className="s06-ponto pointer-events-none absolute h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ left: x, top: crista, opacity: acende, scale: acende }}
      />
    </>
  )
}

/** As guias tracejadas do vão de 20 pontos. `y1` é a crista alta, `y2` a baixa. */
function Vao({
  t,
  x1,
  xv,
  x2,
  y1,
  y2,
  ponta,
}: {
  t: MotionValue<number>
  x1: string
  xv: string
  x2: string
  y1: string
  y2: string
  ponta: number
}) {
  const g1 = useTransform(t, [0, 0.4], [0, 1], { clamp: true })
  const gv = useTransform(t, [0.3, 0.7], [0, 1], { clamp: true })
  const g2 = useTransform(t, [0.6, 1], [0, 1], { clamp: true })
  const pontas = useTransform(t, [0.2, 0.5], [0, 1], { clamp: true })
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <motion.span className="s06-guia-h absolute h-px origin-left" style={{ left: x1, width: `calc(${xv} - ${x1})`, top: y1, scaleX: g1 }} />
      <motion.span className="s06-guia absolute w-px origin-top" style={{ left: xv, top: y1, height: `calc(${y2} - ${y1})`, scaleY: gv }} />
      <motion.span className="s06-guia-h absolute h-px origin-left" style={{ left: xv, width: `calc(${x2} - ${xv})`, top: y2, scaleX: g2 }} />
      {[y1, y2].map((y) => (
        <motion.span
          key={y}
          className="s06-ponta-vao absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ left: xv, top: y, opacity: pontas, width: ponta, height: ponta }}
        />
      ))}
    </div>
  )
}

/** "20 / PONTOS DE DISTÂNCIA". */
function Distancia({ t, grande, style }: { t: MotionValue<number>; grande?: boolean; style: MotionStyle }) {
  const { linhas, distancia } = descoberta
  const aparece = useTransform(t, [0.5, 1], [0, 1], { clamp: true })
  return (
    <motion.div aria-hidden="true" className="pointer-events-none absolute" style={{ ...style, opacity: aparece }}>
      <p
        className="f-display font-semibold leading-none tracking-[-0.02em] text-[var(--acao-hover)]"
        style={{ fontSize: grande ? 'calc(56 * var(--u))' : 32 }}
      >
        {linhas[0].valor - linhas[1].valor}
      </p>
      <p className={`${grande ? 'mt-2' : 'mt-1'} s06-rotulo max-w-[80px]`}>{distancia.rotulo.toUpperCase()}</p>
    </motion.div>
  )
}

/**
 * 06 · O primeiro sinal: o clímax do case. Figma 1104:1138 (v4, 25 set):
 * desktop 1104:1139, celular 1119:1138.
 *
 * A onda de vidro (ASSET 8) é o gráfico: 68% pousa na crista alta, 48% na
 * crista baixa, e as guias tracejadas marcam o vão de 20 pontos entre elas.
 * A altura entre as cristas é ilustrativa, não está em escala; os números
 * são o dado.
 *
 * Desktop (≥1024, ponteiro fino, altura ≥760): a seção fica presa por 260vh
 * e a rolagem conduz o progresso (68%, 48%, o vão, o fecho). O palco escala
 * por `u` para caber na altura da tela. Fora disso o mesmo progresso roda no
 * tempo quando o palco entra. Reduced motion: estado final direto.
 */
export default function S06Descoberta() {
  const { eyebrow, titulo, linhas, distancia, fecho } = descoberta
  const [fA, fD, fB] = partir(fecho.texto, fecho.destaque)
  const { reduced } = useCaseMotion()
  const largo = useMediaQuery('(min-width: 1024px)')
  const podePrender = useMediaQuery('(min-width: 1024px) and (min-height: 760px) and (pointer: fine)')
  const preso = podePrender && !reduced

  const trechoRef = useRef<HTMLDivElement>(null)
  const cabRef = useRef<HTMLDivElement>(null)
  const palcoRef = useRef<HTMLDivElement>(null)
  const fechoRef = useRef<HTMLParagraphElement>(null)
  const emVista = useInView(palcoRef, VIEWPORT)

  // Um progresso só, alimentado pela rolagem (preso) ou pelo tempo.
  const p = useMotionValue(reduced ? 1 : 0)
  const { scrollYProgress } = useScroll({ target: trechoRef, offset: ['start start', 'end end'] })
  const suave = useSpring(scrollYProgress, SCRUB_SPRING)

  useEffect(() => {
    if (reduced) {
      p.set(1)
      return
    }
    if (preso) {
      p.set(suave.get())
      return suave.on('change', (v) => {
        // Chegou ao fim, fica: o vão não some ao voltar a rolagem.
        p.set(Math.max(p.get() >= 1 ? 1 : 0, v))
      })
    }
    if (emVista) {
      const c = animate(p, 1, { duration: S06_CLIMAX.tempo, ease: 'linear' })
      return () => c.stop()
    }
  }, [reduced, preso, emVista, p, suave])

  const t1 = useFase(p, S06_CLIMAX.linha1)
  const t2 = useFase(p, S06_CLIMAX.linha2)
  const tD = useFase(p, S06_CLIMAX.distancia)
  const tF = useFase(p, S06_CLIMAX.fecho)
  const fechoY = useTransform(tF, [0, 1], [16, 0])
  const presenca1 = useTransform(t1, [0, 0.12], [0, 1])
  const presenca2 = useTransform(t2, [0, 0.12], [0, 1])

  // Escala do palco no desktop: 1 = frame de 1440. Presa, também cabe na altura.
  const [esc, setEsc] = useState({ u: 1, cheio: true })
  useLayoutEffect(() => {
    if (!largo) return
    const medir = () => {
      const vw = document.documentElement.clientWidth
      let u = Math.min(vw / D.larg, 1.25)
      if (preso) {
        const cab = cabRef.current?.offsetHeight ?? 78
        // 120 da nav (lâmina até 104 + 16 de respiro), 24 embaixo, 16 de respiro para o fecho,
        // e os 64 fixos entre o título e o palco.
        const livre = window.innerHeight - 120 - 24 - 16 - cab - D.textoFixo - D.respiro
        const altura = D.numeroAlt + D.folga + D.ondaAlt
        u = Math.min(u, livre / altura)
        // Em tela baixa a fonte do fecho para no mínimo de 20px e ele passa da
        // base do palco (a onda termina 106u abaixo do topo dele). O que passar
        // dos 16 de respiro sai da escala, para a última linha não cortar.
        const fechoH = fechoRef.current?.offsetHeight ?? 0
        const sobra = fechoH - (D.ondaAlt - D.fecho.y) * u - 16
        if (sobra > 0) u = Math.min(u, (livre - sobra) / altura)
      }
      setEsc({ u, cheio: D.larg * u >= vw - 1 })
    }
    medir()
    // Segunda medida com o fecho já na escala nova (a altura dele muda com u).
    const raf = requestAnimationFrame(medir)
    // A altura do título muda quando a fonte carrega.
    document.fonts?.ready.then(medir)
    window.addEventListener('resize', medir)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', medir)
    }
  }, [largo, preso])

  const v = (variants: Parameters<typeof atBeat>[0], beat: number) => (reduced ? reducedFade : atBeat(variants, beat))
  const lerOnda = reduced ? reducedFade : enterFade(DUR.hero)
  const sr = (
    <div className="sr-only">
      {linhas.map((l) => (
        <p key={l.verbo}>
          {l.verbo}: {l.valor}% de {l.rotulo}. {l.nota.valor} {l.nota.texto}.
        </p>
      ))}
      <p>
        {linhas[0].valor - linhas[1].valor} {distancia.rotulo}.
      </p>
    </div>
  )

  // ── Desktop: palco em unidades de u ───────────────────────────────────
  const { u } = esc
  const px = (n: number) => `calc(${n} * var(--u))`
  const ondaTopo = `calc(${D.numeroAlt + D.folga} * var(--u) + ${D.textoFixo}px)`
  const crista2Y = `calc(${D.numeroAlt + D.folga + D.crista2.y} * var(--u) + ${D.textoFixo}px)`
  const palcoDesktop = (
    <div
      ref={palcoRef}
      className="relative mx-auto"
      style={{ '--u': `${u}px`, marginTop: D.respiro, width: D.larg * u, height: (D.numeroAlt + D.folga + D.ondaAlt) * u + D.textoFixo } as CSSProperties}
    >
      {sr}
      <motion.div className="absolute left-0 w-full" style={{ top: ondaTopo }} initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={lerOnda}>
        <Onda sizes={`${Math.round(D.larg * u)}px`} className={`block h-auto w-full ${esc.cheio ? '' : 's06-onda-borda'}`} />
      </motion.div>

      <div aria-hidden="true">
        <motion.div className="absolute top-0" style={{ left: px(D.bloco1), opacity: presenca1 }}>
          <Numero valor={linhas[0].valor} t={t1} className="s06-numero--palco" />
          <Legenda dado={linhas[0]} t={t1} />
        </motion.div>
        <motion.div className="absolute" style={{ left: px(D.bloco2), top: px(D.crista2.y), opacity: presenca2 }}>
          <Numero valor={linhas[1].valor} t={t2} className="s06-numero--palco" />
          <Legenda dado={linhas[1]} t={t2} />
        </motion.div>
      </div>

      <Haste t={t1} x={px(D.crista1)} topo={`calc(${ondaTopo} - ${px(D.folga)} + 12px)`} altura={`calc(${px(D.folga)} - 18px)`} crista={ondaTopo} />
      <Haste
        t={t2}
        x={px(D.crista2.x)}
        topo={`calc(${crista2Y} - ${px(D.folga)} + 12px)`}
        altura={`calc(${px(D.folga)} - 18px)`}
        crista={crista2Y}
      />
      <Vao
        t={tD}
        x1={`calc(${px(D.crista1)} + 13px)`}
        xv={px(D.vaoX)}
        x2={`calc(${px(D.crista2.x)} - 13px)`}
        y1={ondaTopo}
        y2={crista2Y}
        ponta={6}
      />
      <Distancia
        t={tD}
        grande
        style={{ left: `calc(${px(D.vaoX)} + 16px)`, top: `calc(${ondaTopo} + ${px(D.crista2.y / 2)})`, translateY: '-50%' }}
      />

      <motion.p
        ref={fechoRef}
        className="s06-fecho f-display absolute font-medium tracking-[-0.01em] text-[var(--texto-principal)]"
        style={{
          // No bolsão sob a onda, na posição do Figma dentro do palco (em
          // 1440 coincide com a coluna do título).
          left: px(D.fecho.x),
          top: `calc(${ondaTopo} + ${px(D.fecho.y)})`,
          width: px(D.fecho.w),
          fontSize: `max(20px, ${px(28)})`,
          opacity: tF,
          y: fechoY,
        }}
      >
        {fA}
        <span className="texto-gradiente">{fD}</span>
        {fB}
      </motion.p>
    </div>
  )

  // ── Celular e tablet: números em duas colunas, onda embaixo ───────────
  const vw = (n: number) => `${n}vw`
  const palcoCompacto = (
    <div ref={palcoRef} className="relative mt-[var(--ritmo-cabeca)]">
      {sr}
      <Container>
        <div aria-hidden="true" className="grid grid-cols-2 gap-4">
          {[t1, t2].map((t, k) => (
            <motion.div key={k} style={{ opacity: k === 0 ? presenca1 : presenca2 }}>
              <Numero valor={linhas[k].valor} t={t} className="s06-numero--compacto" />
              <Legenda dado={linhas[k]} t={t} compacto />
            </motion.div>
          ))}
        </div>
      </Container>

      {/* A onda sangra dos dois lados; o recorte fica neste bloco, não na seção. */}
      <div className="relative mt-12 overflow-x-clip" style={{ height: vw(M.ondaH) }}>
        <motion.div className="absolute top-0" style={{ left: vw(M.ondaX), width: vw(M.ondaW) }} initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={lerOnda}>
          <Onda sizes={vw(M.ondaW)} className="block h-auto w-full" />
        </motion.div>
        <Haste t={t1} x={vw(M.crista1)} topo="-36px" altura="30px" crista="0px" />
        <Haste t={t2} x={vw(M.crista2)} topo="-36px" altura={`calc(${vw(M.dif)} + 30px)`} crista={vw(M.dif)} />
        <Vao t={tD} x1={`calc(${vw(M.crista1)} + 8px)`} xv={vw(M.vao)} x2={`calc(${vw(M.crista2)} - 8px)`} y1="0px" y2={vw(M.dif)} ponta={4} />
        <Distancia t={tD} style={{ left: `calc(${vw(M.vao)} + 8px)`, top: 16 }} />
      </div>

      <Container>
        <motion.p
          className="f-display mt-8 text-[20px] font-medium leading-[28px] tracking-[-0.01em] text-[var(--texto-principal)] md:text-[24px] md:leading-[32px]"
          style={{ opacity: tF, y: fechoY }}
        >
          {fA}
          <span className="texto-gradiente">{fD}</span>
          {fB}
        </motion.p>
      </Container>
    </div>
  )

  return (
    <section
      id="descoberta"
      aria-labelledby="descoberta-titulo"
      data-sem-pilula
      className="relative bg-[var(--fundo-pagina)]"
    >
      <div ref={trechoRef} style={preso ? { height: `${S06_CLIMAX.alturaScroll}vh` } : undefined}>
        <div className={preso ? 'sticky top-0 flex h-screen flex-col justify-center pb-6 pt-[120px]' : 'py-[var(--ritmo-secao)]'}>
          <Container>
            <motion.div ref={cabRef} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
              <motion.p
                className="text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--acao-link)]"
                variants={v(enterFade(0.4), 0)}
              >
                {eyebrow}
              </motion.p>
              <motion.h2
                id="descoberta-titulo"
                className="f-display mt-[14px] max-w-[1040px] text-[28px] font-bold leading-[36px] tracking-[-0.01em] text-[var(--texto-principal)] md:mt-4 md:text-[clamp(32px,2.78vw,40px)] md:leading-[1.1]"
                variants={v(enterFadeUp, 0.12)}
              >
                {titulo}
              </motion.h2>
            </motion.div>
          </Container>

          {largo ? palcoDesktop : palcoCompacto}
        </div>
      </div>
    </section>
  )
}
