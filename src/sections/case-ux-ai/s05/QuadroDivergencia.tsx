import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from 'react'
import { useInView } from 'framer-motion'
import { useCaseMotion } from '../../../motion/CaseUxAiMotionProvider'
import { S05_QUADRO as T, VIEWPORT } from '../../../motion/caseUxAiTokens'
import './quadro-divergencia.css'

/**
 * Palco "89 problemas, dois julgamentos" da S05 — docs/BRIEF-S05-EXPERIMENTO.md
 * (v2) §5, Figma 1056:1327 (Proposta B, 25 set 2026).
 *
 * Os 89 pontos nascem juntos no eixo, se duplicam e cada cópia viaja para a
 * mesma casa nos dois campos. Os campos são iguais (mesma grade, mesmas casas
 * vazias, mesmo jitter): a única diferença entre os lados é a cor. O problema
 * do centro da grade é a âncora, em destaque dos dois lados, ligado pela
 * curva "mesmo problema".
 *
 * SVG em pixels reais: viewBox = largura medida (ResizeObserver). Texto de
 * 12px é 12px; só as posições acompanham a largura. Composição pela largura
 * do contêiner: lado a lado a partir de 560, empilhado abaixo.
 *
 * Estado de repouso do DOM = estado final. A linha do tempo é CSS
 * (quadro-divergencia.css): cada elemento traz o próprio atraso em variável,
 * as animações ficam pausadas até o quadro entrar na tela (`data-estado`).
 * Só opacity, transform e stroke-dashoffset.
 */

type P = { x: number; y: number }
type Lado = { readonly rotulo: string; readonly modo: string }

type Props = {
  total: number
  unidade: string
  lados: readonly Lado[]
  ligacao: string
  ariaLabel: string
  seed?: number
}

/** Casas ocupadas da grade 11 × 9, linha a linha, como no Figma (1056:1335): 89 de 99. */
const MASCARA = [
  '11111111101',
  '11111110011',
  '11111111111',
  '11111111111',
  '11111111111',
  '11111111111',
  '11111001111',
  '11101110111',
  '11101111001',
]
const COLS = 11
const ROWS = 9
/** Passo da grade no Figma, s = 1. */
const PASSO = { x: 26.4, y: 23 }
const JITTER = 1.8
/** Raio dos pontos (8px no Figma). */
const RAIO = 4
/** Abaixo desta largura de contêiner, os campos empilham. */
const LADO_A_LADO = 560

const clamp = (min: number, v: number, max: number) => Math.min(max, Math.max(min, v))
const px = (n: number) => `${n.toFixed(2)}px`
const seg = (n: number) => `${n.toFixed(3)}s`

function mulberry32(a: number) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Posição de cada índice numa lista ordenada pela chave. */
function ranking(chaves: number[]) {
  const ordem = chaves.map((_, i) => i).sort((a, b) => chaves[a] - chaves[b])
  const rank = new Array<number>(chaves.length)
  ordem.forEach((i, pos) => (rank[i] = pos))
  return rank
}

/** Uma grade para os dois campos: casa e jitter de cada problema, âncora e ordens. */
function construirGrade(seed: number) {
  const rng = mulberry32(seed)
  const casas: { c: number; r: number; jx: number; jy: number }[] = []
  MASCARA.forEach((linha, r) =>
    [...linha].forEach((v, c) => {
      if (v === '1') casas.push({ c: c - (COLS - 1) / 2, r: r - (ROWS - 1) / 2, jx: 0, jy: 0 })
    }),
  )
  const ancora = casas.findIndex((k) => k.c === 0 && k.r === 0)
  casas.forEach((k, i) => {
    if (i === ancora) return
    k.jx = (rng() - 0.5) * 2 * JITTER
    k.jy = (rng() - 0.5) * 2 * JITTER
  })
  // Nascimento em ordem sorteada; divisão do centro da grade para fora.
  const nasce = ranking(casas.map(() => rng()))
  const divide = ranking(casas.map((k) => Math.hypot(k.c * PASSO.x, k.r * PASSO.y)))
  return { casas, ancora, nasce, divide }
}

type Texto = { x: number; y: number; anchor: 'middle' | 'end' }

function composicao(W: number) {
  if (W >= LADO_A_LADO) {
    // Lado a lado — Figma em 1200: centros em 280 e 920, eixo em 600, campo em y 160.
    const s = clamp(0.6, W / 1100, 1)
    const d = Math.min(320, W / 4)
    const meia = 4 * PASSO.y * s
    const cy = 68 + meia
    const topo = cy - meia - RAIO
    const base = cy + meia + RAIO
    const cE = { x: W / 2 - d, y: cy }
    const cI = { x: W / 2 + d, y: cy }
    const fundo = base + 45
    const k = (fundo - cy) / 0.75
    const larguraTotal = Math.min(288, 2 * d - 48)
    const totaisTopo = fundo - 13
    return {
      s,
      H: totaisTopo + 44 + 4 + (larguraTotal >= 272 ? 18 : 36),
      eixo: { x: W / 2, y: cy },
      centros: [cE, cI] as [P, P],
      rotulos: [
        { x: cE.x, y: 12, anchor: 'middle' },
        { x: cI.x, y: 12, anchor: 'middle' },
      ] as [Texto, Texto],
      divisor: `M ${W / 2} ${topo - 24} V ${base + 24}`,
      halo: { rx: 320 * s, ry: 180 * s },
      ligacao: `M ${cE.x} ${cy} C ${cE.x + 80 * s} ${cy + k} ${cI.x - 80 * s} ${cy + k} ${cI.x} ${cy}`,
      rotuloLigacao: { x: W / 2, y: fundo + 11, anchor: 'middle' } as Texto,
      totais: [
        { x: cE.x, y: totaisTopo },
        { x: cI.x, y: totaisTopo },
      ] as [P, P],
      larguraTotal,
    }
  }

  // Empilhado — especialistas em cima, VS no eixo, IA embaixo. A ligação
  // contorna os campos pela direita e o rótulo fica entre ela e o VS.
  const s = clamp(0.6, (W - 16) / (10 * PASSO.x + 2 * RAIO), 1)
  const meia = 4 * PASSO.y * s
  const cx = W / 2
  const cyE = 52 + RAIO + meia
  const totaisE = cyE + meia + RAIO + 20
  const vs = totaisE + 66 + 56
  const rotuloI = vs + 56
  const cyI = rotuloI + 52 + RAIO + meia
  const totaisI = cyI + meia + RAIO + 20
  // Ápice da curva 16px além da borda direita dos campos.
  const kx = (5 * PASSO.x * s + RAIO + 16) / 0.75
  return {
    s,
    H: totaisI + 66,
    eixo: { x: cx, y: vs },
    centros: [
      { x: cx, y: cyE },
      { x: cx, y: cyI },
    ] as [P, P],
    rotulos: [
      { x: cx, y: 0, anchor: 'middle' },
      { x: cx, y: rotuloI, anchor: 'middle' },
    ] as [Texto, Texto],
    divisor: '',
    halo: { rx: Math.min(W / 2, 200), ry: 160 * s },
    ligacao: `M ${cx} ${cyE} C ${cx + kx} ${cyE + 80} ${cx + kx} ${cyI - 80} ${cx} ${cyI}`,
    rotuloLigacao: { x: cx + 0.75 * kx - 8, y: vs - 9, anchor: 'end' } as Texto,
    totais: [
      { x: cx, y: totaisE },
      { x: cx, y: totaisI },
    ] as [P, P],
    larguraTotal: Math.min(288, W),
  }
}

/** Conjunto de origem: espiral de ângulo áureo, raio 28, no eixo. */
function origemEspiral(n: number, eixo: P, s: number): P[] {
  const GA = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: n }, (_, i) => {
    const rad = 28 * s * Math.sqrt((i + 0.5) / n)
    return { x: eixo.x + rad * Math.cos(i * GA), y: eixo.y + rad * Math.sin(i * GA) }
  })
}

/** Durações da linha do tempo, dos tokens, como variáveis CSS no contêiner. */
const DURACOES = {
  '--qd-nasce': seg(T.entradaPonto.dur),
  '--qd-divide': seg(T.divisao.dur),
  '--qd-halo-dur': seg(T.halo.dur),
  '--qd-halo': seg(T.halo.inicio),
  '--qd-rotulo-e': seg(T.rotuloEspecialistas.inicio),
  '--qd-rotulo-i': seg(T.rotuloIA.inicio),
  '--qd-rotulo-dur': seg(T.rotuloIA.dur),
  '--qd-ancora': seg(T.ancoras.inicio),
  '--qd-ancora-dur': seg(T.ancoras.dur),
  '--qd-vs': seg(T.vs.inicio),
  '--qd-vs-dur': seg(T.vs.dur),
  '--qd-divisor': seg(T.divisor.inicio),
  '--qd-divisor-dur': seg(T.divisor.dur),
  '--qd-azul-dur': seg(T.azul.dur),
  '--qd-total-dur': seg(T.totais.dur),
  '--qd-ligacao': seg(T.ligacao.inicio),
  '--qd-ligacao-dur': seg(T.ligacao.dur),
  '--qd-rotulo-lig': seg(T.rotuloLigacao.inicio),
  '--qd-rotulo-lig-dur': seg(T.rotuloLigacao.dur),
} as CSSProperties

export default function QuadroDivergencia({ total, unidade, lados, ligacao, ariaLabel, seed = 89 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [W, setW] = useState(0)
  const id = useId().replace(/:/g, '')
  const { reduced } = useCaseMotion()
  const emVista = useInView(ref, VIEWPORT)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setW(Math.round(entry.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const grade = useMemo(() => construirGrade(seed), [seed])
  if (import.meta.env.DEV && grade.casas.length !== total) {
    console.warn(`QuadroDivergencia: a máscara tem ${grade.casas.length} casas, o total é ${total}.`)
  }
  const L = useMemo(() => (W > 0 ? composicao(W) : null), [W])

  const pontos = useMemo(() => {
    if (!L) return null
    const passo = { x: PASSO.x * L.s, y: PASSO.y * L.s }
    const origem = origemEspiral(grade.casas.length, L.eixo, L.s)
    const lugar = (c: P, i: number): P => {
      const k = grade.casas[i]
      return { x: c.x + k.c * passo.x + k.jx, y: c.y + k.r * passo.y + k.jy }
    }
    const e = grade.casas.map((_, i) => lugar(L.centros[0], i))
    const ia = grade.casas.map((_, i) => lugar(L.centros[1], i))
    // Azul do eixo para a borda do campo da IA.
    const azul = ranking(ia.map((p) => Math.hypot(p.x - L.eixo.x, p.y - L.eixo.y)))
    return { origem, e, ia, azul, raio: Math.max(3, RAIO * L.s) }
  }, [L, grade])

  const estado = reduced ? 'fixo' : emVista ? 'toca' : 'espera'

  const ponto = (lado: 'e' | 'i', i: number) => {
    const p = lado === 'e' ? pontos!.e[i] : pontos!.ia[i]
    const o = pontos!.origem[i]
    const estilo = {
      '--dx': px(o.x - p.x),
      '--dy': px(o.y - p.y),
      '--d1': seg(grade.nasce[i] * T.entradaPonto.passo),
      '--d2': seg(T.divisao.inicio + grade.divide[i] * T.divisao.passo),
    } as CSSProperties
    return (
      <g key={`${lado}${i}`} className="qd-a qd-ponto" style={estilo}>
        <circle cx={p.x} cy={p.y} r={pontos!.raio} fill={`url(#${id}-neutro)`} />
        {lado === 'i' && (
          // A conta azul fica por cima da neutra: a troca é um cross-fade de
          // opacidade, nunca uma transição de fill.
          <circle
            className="qd-a qd-azul"
            cx={p.x}
            cy={p.y}
            r={pontos!.raio}
            fill={`url(#${id}-ia)`}
            style={{ '--d3': seg(T.azul.inicio + pontos!.azul[i] * T.azul.passo) } as CSSProperties}
          />
        )}
      </g>
    )
  }

  const ancoraE = pontos?.e[grade.ancora]
  const ancoraI = pontos?.ia[grade.ancora]

  return (
    <figure className="quadro-divergencia m-0" data-estado={estado} style={DURACOES}>
      <div ref={ref} className="relative w-full" style={{ height: L ? L.H : 440 }}>
        {L && pontos && ancoraE && ancoraI && (
          <>
            <svg
              className="absolute inset-0 block overflow-visible"
              width={W}
              height={L.H}
              viewBox={`0 0 ${W} ${L.H}`}
              role="img"
              aria-label={ariaLabel}
            >
              <defs>
                <radialGradient id={`${id}-halo-e`}>
                  <stop offset="0%" style={{ stopColor: 'var(--dado-neutro)', stopOpacity: 0.08 }} />
                  <stop offset="100%" style={{ stopColor: 'var(--dado-neutro)', stopOpacity: 0 }} />
                </radialGradient>
                <radialGradient id={`${id}-halo-i`}>
                  <stop offset="0%" style={{ stopColor: 'var(--acao-link)', stopOpacity: 0.1 }} />
                  <stop offset="100%" style={{ stopColor: 'var(--acao-link)', stopOpacity: 0 }} />
                </radialGradient>
                {/* Contas de vidro: foco de luz em (36%, 30%), raio 76%. Definidas uma vez. */}
                <radialGradient id={`${id}-neutro`} cx="36%" cy="30%" r="76%">
                  <stop offset="0%" style={{ stopColor: 'var(--texto-principal)' }} />
                  <stop offset="40%" style={{ stopColor: 'var(--dado-neutro)' }} />
                  <stop offset="80%" style={{ stopColor: 'var(--controle-inativo)' }} />
                  <stop offset="100%" style={{ stopColor: 'var(--superficie-elevada)' }} />
                </radialGradient>
                <radialGradient id={`${id}-ia`} cx="36%" cy="30%" r="76%">
                  <stop offset="0%" style={{ stopColor: 'var(--texto-principal)' }} />
                  <stop offset="35%" style={{ stopColor: 'var(--dado-nivel-4)' }} />
                  <stop offset="75%" style={{ stopColor: 'var(--dado-nivel-3)' }} />
                  <stop offset="100%" style={{ stopColor: 'var(--dado-nivel-1)' }} />
                </radialGradient>
                {/* A ligação é tracejada: quem desenha é esta máscara, um traço
                    contínuo com pathLength 1 revelando o tracejado. */}
                <mask id={`${id}-lig`} maskUnits="userSpaceOnUse" x={0} y={0} width={W} height={L.H}>
                  <path className="qd-a qd-desenho qd-desenho--lig" d={L.ligacao} pathLength={1} />
                </mask>
              </defs>

              <ellipse
                className="qd-a qd-halo"
                cx={L.centros[0].x}
                cy={L.centros[0].y}
                rx={L.halo.rx}
                ry={L.halo.ry}
                fill={`url(#${id}-halo-e)`}
              />
              <ellipse
                className="qd-a qd-halo"
                cx={L.centros[1].x}
                cy={L.centros[1].y}
                rx={L.halo.rx}
                ry={L.halo.ry}
                fill={`url(#${id}-halo-i)`}
              />

              {L.divisor && (
                <path className="qd-a qd-desenho qd-divisor" d={L.divisor} pathLength={1} />
              )}

              <path className="qd-ligacao" d={L.ligacao} mask={`url(#${id}-lig)`} />

              {/* Âncora: disco atrás do ponto, dos dois lados. */}
              <circle className="qd-a qd-ancora" cx={ancoraE.x} cy={ancoraE.y} r={12} style={{ fill: 'var(--superficie-elevada)' }} />
              <circle className="qd-a qd-ancora" cx={ancoraI.x} cy={ancoraI.y} r={12} style={{ fill: 'var(--acao-fundo-selecionado)' }} />

              <g>
                {grade.casas.map((_, i) => ponto('e', i))}
                {grade.casas.map((_, i) => ponto('i', i))}
              </g>

              {/* Núcleo da âncora, por cima do ponto. */}
              <circle className="qd-a qd-nucleo" cx={ancoraE.x} cy={ancoraE.y} r={RAIO} style={{ fill: 'var(--texto-principal)' }} />
              <circle className="qd-a qd-nucleo" cx={ancoraI.x} cy={ancoraI.y} r={RAIO} style={{ fill: 'var(--dado-nivel-4)' }} />

              {/* Disco VS no lugar que o conjunto desocupou. */}
              <g className="qd-a qd-vs">
                <circle cx={L.eixo.x} cy={L.eixo.y} r={24} className="qd-vs-disco" />
                <text x={L.eixo.x} y={L.eixo.y} textAnchor="middle" dominantBaseline="central" className="qd-vs-texto">
                  VS
                </text>
              </g>

              <text
                x={L.rotulos[0].x}
                y={L.rotulos[0].y + 13}
                textAnchor="middle"
                className="qd-a qd-rotulo qd-rotulo--e"
              >
                {lados[0].rotulo}
              </text>
              <text
                x={L.rotulos[1].x}
                y={L.rotulos[1].y + 13}
                textAnchor="middle"
                className="qd-a qd-rotulo qd-rotulo--i"
              >
                {lados[1].rotulo}
              </text>
              <text
                x={L.rotuloLigacao.x}
                y={L.rotuloLigacao.y + 13}
                textAnchor={L.rotuloLigacao.anchor}
                className="qd-a qd-rotulo-lig"
              >
                {ligacao}
              </text>
            </svg>

            {/* Totais em HTML, fora do SVG: tipografia real. O SVG já descreve o
                quadro inteiro (aria-label), então aqui é aria-hidden. */}
            {L.totais.map((t, k) => (
              <div
                key={lados[k].rotulo}
                aria-hidden="true"
                className="qd-a qd-total absolute flex flex-col items-center gap-1 text-center"
                style={
                  {
                    left: t.x - L.larguraTotal / 2,
                    top: t.y,
                    width: L.larguraTotal,
                    '--d': seg(T.totais.inicio + k * T.totais.passo),
                  } as CSSProperties
                }
              >
                <p className="flex items-baseline gap-2">
                  <span className="f-display text-[40px] font-semibold leading-[44px] tracking-[-0.02em] text-[var(--texto-principal)]">
                    {total}
                  </span>
                  <span className="text-[16px] leading-[24px] text-[var(--texto-apoio)]">{unidade}</span>
                </p>
                <p className="text-[12px] leading-[1.5] text-[var(--texto-metadado)]">{lados[k].modo}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </figure>
  )
}
