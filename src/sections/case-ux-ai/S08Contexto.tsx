import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, type Variants } from 'framer-motion'
import Container from '../../components/case-ux-ai/layout/Container'
import LatticeBackground from '../../components/case-ux-ai/media/LatticeBackground'
import { contexto } from '../../data/caseUxAi'
import { useCaseMotion } from '../../motion/CaseUxAiMotionProvider'
import { atBeat, enterFade, enterFadeUp, lineMaskContainer, lineMaskLine, reducedFade } from '../../motion/caseUxAiRecipes'
import { DUR, EASE, MOVE, STAGGER, VIEWPORT } from '../../motion/caseUxAiTokens'
import useMediaQuery from '../../motion/useMediaQuery'
import './secoes-finais.css'

/**
 * Geometria do Figma (nó 1101:1991, 1440×1112), em px da coluna de 1200:
 * x menos 120, y menos 96 (o topo da coluna). O objeto é o ASSET 7 SEM FUNDO
 * a 72%, com as pontas esmaecidas já no arquivo.
 */
const COL = { w: 1200, h: 920 }
const OBJETO = { x: 120, y: 344, w: 1038, h: 523 }
const BRILHO = { x: 293, y: 451, w: 692, h: 288 }
const TRELICA = { x: -120, y: 152, w: 1440, h: 1024 }
const LEGENDA = { x: 900, y: 901, w: 300 }

/** Cada fator: título, pergunta, ponto e traço até a borda do vidro. Na ordem de `contexto.fatores`. */
const FATORES = [
  { x: 0, y: 424, w: 216, ponto: [129, 434], traco: 'M140 437 L351 437' }, // Frequência
  { x: 920, y: 200, w: 280, ponto: [901, 210], traco: 'M896 213 L856 213 L667 402' }, // Impacto clínico
  { x: 0, y: 776, w: 264, ponto: [69, 786], traco: 'M80 789 L290 789 L351 728' }, // Risco
  { x: 520, y: 832, w: 264, ponto: [634, 842], traco: 'M645 845 L677 845 L726 796' }, // Contorno
] as const

const OBJ = '/case-ux-ai/s08-objeto'
function Objeto({ sizes, className, style }: { sizes: string; className?: string; style?: CSSProperties }) {
  return (
    <picture>
      <source type="image/avif" srcSet={`${OBJ}-1038.avif 1038w, ${OBJ}-2076.avif 2076w`} sizes={sizes} />
      <source type="image/webp" srcSet={`${OBJ}-1038.webp 1038w, ${OBJ}-2076.webp 2076w`} sizes={sizes} />
      <img
        src={`${OBJ}-1038.webp`}
        alt=""
        aria-hidden="true"
        width={OBJETO.w}
        height={OBJETO.h}
        loading="lazy"
        decoding="async"
        className={className}
        style={style}
      />
    </picture>
  )
}

/**
 * 08 · A descoberta central. Figma: desktop 1101:1991 (25 set, objeto a 72%),
 * celular 1100:1138.
 *
 * O objeto de vidro é a interface, a única camada que a IA via. Os quatro
 * fatores ficam fora dele, sem cartão, ligados à borda do vidro por traços.
 * Menor que a onda da S06 de propósito: lá o vidro atravessa a tela, aqui é
 * um objeto contido, para a sequência não repetir a mesma imagem.
 *
 * ≥1280 o diagrama é o frame do Figma na coluna de 1200, escalado junto com
 * ela (1066 a 1200). Abaixo disso, objeto, legenda e lista com réguas.
 */
export default function S08Contexto() {
  const { eyebrow, titulo, texto, quadro, fatores } = contexto
  const { reduced } = useCaseMotion()
  const v = (variants: Variants, beat: number) => (reduced ? reducedFade : atBeat(variants, beat))

  const ref = useRef<HTMLDivElement>(null)
  const [W, setW] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const u = W / COL.w
  const diagrama = useMediaQuery('(min-width: 1280px)') && W > 0

  const T = { objeto: 0.1, tracos: 0.7, fatores: 0.9 }
  const traco = (k: number): Variants =>
    reduced
      ? reducedFade
      : {
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { duration: 0.6, ease: 'linear', delay: T.tracos + k * STAGGER.line },
              opacity: { duration: 0.01, delay: T.tracos + k * STAGGER.line },
            },
          },
        }
  // Fatores saem de perto do objeto para fora: 16px na direção da própria posição.
  const fator = (k: number): Variants => {
    if (reduced) return reducedFade
    const dx = k % 2 === 0 ? MOVE.sm : -MOVE.sm
    const dy = k < 2 ? MOVE.sm : -MOVE.sm
    return {
      hidden: { opacity: 0, x: dx, y: dy },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: DUR.enter, ease: EASE.enter, delay: T.fatores + k * STAGGER.line },
      },
    }
  }
  const objeto: Variants = reduced
    ? reducedFade
    : {
        hidden: { opacity: 0, scale: 0.97 },
        visible: { opacity: 1, scale: 1, transition: { duration: DUR.hero, ease: EASE.enter, delay: T.objeto } },
      }
  const ariaFigura = `${quadro}: ${fatores.map((f) => f.nome).join(', ')} ficam fora dela.`
  const legenda = 'Interface ilustrativa. Não é o sistema avaliado no estudo.'

  return (
    <section id="contexto" aria-labelledby="contexto-titulo" className="relative overflow-hidden bg-[var(--fundo-pagina)] py-[var(--ritmo-secao)]">
      <Container>
        <div ref={ref} className="relative" style={diagrama ? { height: COL.h * u } : undefined}>
          <motion.div className="relative z-[1]" initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <motion.p
              className="text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--acao-link)]"
              variants={v(enterFade(0.4), 0)}
            >
              {eyebrow}
            </motion.p>
            <motion.h2
              id="contexto-titulo"
              className="f-display mt-[14px] text-[32px] font-semibold leading-[40px] tracking-[-0.02em] md:mt-4 md:text-[44px] md:leading-[48px] xl:text-[56px] xl:leading-[60px]"
              variants={reduced ? reducedFade : lineMaskContainer(STAGGER.line * 2, 0.12)}
            >
              <motion.span className="texto-gradiente block max-w-[900px]" variants={reduced ? undefined : lineMaskLine}>
                {titulo.ia}
              </motion.span>
              <motion.span className="block text-[var(--texto-principal)]" variants={reduced ? undefined : lineMaskLine}>
                {titulo.humano}
              </motion.span>
            </motion.h2>
            <motion.p
              className="mt-6 max-w-[560px] text-[16px] leading-[1.5] text-[var(--texto-apoio)] md:mt-8 md:text-[18px] md:leading-[28px]"
              variants={v(enterFadeUp, 0.4)}
            >
              {texto}
            </motion.p>
          </motion.div>

          {/* ≥1280: o frame do Figma, na coluna, escalado junto com ela. */}
          {diagrama && (
            <motion.figure
              className="pointer-events-none absolute left-0 top-0 z-0 m-0"
              style={{ width: COL.w, height: COL.h, transform: `scale(${u})`, transformOrigin: '0 0' }}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              aria-label={ariaFigura}
            >
              {/* Treliça: a rede de contexto, a 6%, atrás de tudo. */}
              <motion.div
                className="absolute"
                style={{ left: TRELICA.x, top: TRELICA.y, width: TRELICA.w, height: TRELICA.h }}
                variants={v(enterFade(1.2), 0)}
              >
                <LatticeBackground animate={false} />
              </motion.div>
              <motion.div
                aria-hidden="true"
                className="s08-brilho absolute rounded-[50%]"
                style={{ left: BRILHO.x, top: BRILHO.y, width: BRILHO.w, height: BRILHO.h }}
                variants={v(enterFade(1.2), 0)}
              />
              <motion.div className="absolute" style={{ left: OBJETO.x, top: OBJETO.y, width: OBJETO.w, height: OBJETO.h }} variants={objeto}>
                <Objeto sizes={`${Math.round(OBJETO.w * u)}px`} className="block h-full w-full" />
              </motion.div>

              <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${COL.w} ${COL.h}`} aria-hidden="true" focusable="false">
                {FATORES.map((f, k) => (
                  <g key={k}>
                    <motion.path d={f.traco} className="s08-traco" variants={traco(k)} />
                    <motion.circle
                      cx={f.ponto[0] + 3}
                      cy={f.ponto[1] + 3}
                      r={3}
                      className="s08-ponta"
                      variants={v(enterFade(0.3), T.tracos + 0.5 + k * STAGGER.line)}
                    />
                  </g>
                ))}
              </svg>

              <ul>
                {fatores.map((f, k) => (
                  <motion.li
                    key={f.nome}
                    className="absolute"
                    style={{ left: FATORES[k].x, top: FATORES[k].y, width: FATORES[k].w }}
                    variants={fator(k)}
                  >
                    <p className="s08-fator-nome f-display">{f.nome}</p>
                    <p className="mt-3 text-[16px] leading-[24px] text-[var(--texto-apoio)]">{f.pergunta}</p>
                  </motion.li>
                ))}
              </ul>

              <motion.p
                className="absolute text-[12px] leading-[18px] text-[var(--controle-inativo)]"
                style={{ left: LEGENDA.x, top: LEGENDA.y, width: LEGENDA.w }}
                variants={v(enterFade(0.4), T.fatores + 0.4)}
              >
                {legenda}
              </motion.p>
            </motion.figure>
          )}
        </div>

        {/* Abaixo de 1280: objeto (a interface inteira à vista), legenda e lista. */}
        {!diagrama && (
        <motion.figure className="m-0" initial="hidden" whileInView="visible" viewport={VIEWPORT} aria-label={ariaFigura}>
          <div className="s08-objeto-compacto relative mt-8">
            <motion.div className="absolute left-1/2 top-0" style={{ width: 'var(--s08-obj)', translateX: '-50.97%' }} variants={objeto}>
              <Objeto sizes="min(160.5vw, 1038px)" className="block h-auto w-full" />
            </motion.div>
          </div>
          <motion.p className="mt-6 text-[12px] leading-[18px] text-[var(--controle-inativo)]" variants={v(enterFade(0.4), 0.3)}>
            {legenda}
          </motion.p>
          <ul className="-mb-6 mt-10 grid sm:grid-cols-2 sm:gap-x-8">
            {fatores.map((f, k) => (
              <motion.li key={f.nome} className="relative border-t border-white/[0.08] py-6 pl-4" variants={v(enterFadeUp, 0.4 + k * STAGGER.item)}>
                <span aria-hidden="true" className="absolute left-0 top-[33px] h-[6px] w-[6px] rounded-full bg-[var(--texto-apoio)]" />
                <p className="f-display text-[20px] font-semibold leading-[24px] tracking-[-0.02em] text-[var(--texto-principal)]">{f.nome}</p>
                <p className="mt-2 text-[14px] leading-[20px] text-[var(--texto-apoio)]">{f.pergunta}</p>
              </motion.li>
            ))}
          </ul>
        </motion.figure>
        )}
      </Container>
    </section>
  )
}
