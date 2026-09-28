import { Fragment, useEffect, useRef, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import Container from '../../components/case-ux-ai/layout/Container'
import { divisao } from '../../data/caseUxAi'
import { useCaseMotion } from '../../motion/CaseUxAiMotionProvider'
import { atBeat, enterFade, enterFadeUp, reducedFade } from '../../motion/caseUxAiRecipes'
import { DUR, EASE, STAGGER, VIEWPORT } from '../../motion/caseUxAiTokens'
import './secoes-finais.css'

/** Parte um texto em volta do trecho em destaque. */
function partir(texto: string, destaque: string) {
  const i = texto.indexOf(destaque)
  return i === -1 ? [texto, '', ''] : [texto.slice(0, i), destaque, texto.slice(i + destaque.length)]
}

/** Geometria das raias (≥1280). */
const G = { calha: 200, origemX: 168, yMaquina: 136, yHumano: 304, altura: 480 }

type Etapa = (typeof divisao.etapas)[number]

/** Texto de uma etapa: número, nome, descrição; o chip só na obrigatória. */
function TextoEtapa({ e }: { e: Etapa }) {
  const maquina = e.raia === 'maquina'
  const obrigatorio = 'obrigatorio' in e && e.obrigatorio
  return (
    <>
      <p className={`f-mono text-[12px] leading-[1.5] tracking-[0.02em] ${maquina ? 'text-[var(--acao-link)]' : 'text-[var(--texto-metadado)]'}`}>
        {e.n}
        {!obrigatorio && <span className="xl:hidden"> · {e.dono}</span>}
      </p>
      <p className="mt-1 text-[16px] font-semibold leading-[24px] text-[var(--texto-principal)]">{e.nome}</p>
      <p className="mt-1 text-[14px] leading-[20px] text-[var(--texto-apoio)]">{e.texto}</p>
      {obrigatorio && (
        <p className="mt-3 inline-flex whitespace-nowrap rounded-[var(--r-pill)] px-2 py-1 text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--texto-principal)] shadow-[inset_0_0_0_1px_var(--texto-apoio)]">
          {e.dono}
        </p>
      )}
    </>
  )
}

/**
 * 09–10 · Da descoberta para uma decisão, e a proposta de fluxo.
 * docs/BRIEF-S06-S15.md §S09–10. Figma 800:1055 e 800:1057.
 *
 * No Figma eram duas seções: a pergunta com duas linhas soltas ("IA →
 * velocidade e escala", "Humano → contexto e julgamento") e seis cartões
 * iguais com chips de dono. Aqui viram uma seção: a pergunta abre, e a
 * resposta é o próprio desenho da divisão de trabalho. As duas linhas soltas
 * viram as raias; o dono de cada etapa é a raia em que ela está, então os
 * chips somem (fica só HUMANO OBRIGATÓRIO, que é a exceção que importa).
 *
 * As raias nascem num ponto só e se separam: terceira e última aparição do
 * motivo A (MOTION-SPEC §1). Depois o fluxo percorre as etapas, trocando de
 * raia onde o trabalho troca de dono.
 */
export default function S09Divisao() {
  const { eyebrow, pergunta, resposta, fluxo, raias, etapas, fecho } = divisao
  const [tA, tD, tB] = partir(fluxo.titulo.texto, fluxo.titulo.destaque)
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

  const col = (W - G.calha) / etapas.length
  const cx = (i: number) => G.calha + col * (i + 0.5)
  const y = (e: Etapa) => (e.raia === 'maquina' ? G.yMaquina : G.yHumano)
  const meio = (G.yMaquina + G.yHumano) / 2

  const raia = (yRaia: number) =>
    `M ${G.origemX} ${meio} C ${G.origemX + 32} ${meio} ${G.calha - 24} ${yRaia} ${G.calha + 8} ${yRaia} H ${W}`
  const caminho = etapas
    .map((e, i) => {
      if (i === 0) return `M ${cx(0)} ${y(e)}`
      const a = etapas[i - 1]
      const x0 = cx(i - 1)
      const x1 = cx(i)
      if (a.raia === e.raia) return `L ${x1} ${y(e)}`
      const m = (x0 + x1) / 2
      return `C ${m} ${y(a)} ${m} ${y(e)} ${x1} ${y(e)}`
    })
    .join(' ')

  // Linha do tempo do desenho.
  const T = { raias: 0.1, fluxo: 0.9, durFluxo: 1.4 }
  const noNo = (i: number) => T.fluxo + (T.durFluxo * (i + 0.5)) / etapas.length
  const desenho = (delay: number, dur: number, ease: 'linear' | typeof EASE.state = EASE.state): Variants =>
    reduced
      ? reducedFade
      : {
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { pathLength: { duration: dur, ease, delay }, opacity: { duration: 0.01, delay } },
          },
        }
  const no = (i: number): Variants =>
    reduced
      ? reducedFade
      : {
          hidden: { opacity: 0, scale: 0.4 },
          visible: { opacity: 1, scale: 1, transition: { duration: DUR.state, ease: EASE.enter, delay: noNo(i) } },
        }

  return (
    <section
      id="divisao"
      aria-labelledby="divisao-titulo"
      data-briefing-fim
      className="relative bg-[var(--fundo-pagina)] py-[var(--ritmo-secao)]"
    >
      <Container>
        {/* A pergunta de virada */}
        <motion.div
          className="grid gap-y-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-x-16"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <div>
            <motion.p
              className="text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--acao-link)]"
              variants={v(enterFade(0.4), 0)}
            >
              {eyebrow}
            </motion.p>
            <motion.h2
              id="divisao-titulo"
              className="f-display mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--texto-principal)] md:text-[40px]"
              variants={v(enterFadeUp, 0.12)}
            >
              {pergunta}
            </motion.h2>
          </div>
          <motion.p
            className="text-[16px] leading-[1.5] text-[var(--texto-apoio)] md:text-[18px] md:leading-[28px]"
            variants={v(enterFadeUp, 0.24)}
          >
            {resposta}
          </motion.p>
        </motion.div>

        {/* A resposta desenhada */}
        <motion.figure className="m-0 mt-[var(--ritmo-bloco)]" initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <figcaption>
            <motion.p
              className="text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--texto-metadado)]"
              variants={v(enterFade(0.4), 0)}
            >
              {fluxo.eyebrow}
            </motion.p>
            <motion.p
              className="f-display mt-3 max-w-[720px] text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--texto-principal)] md:text-[32px]"
              variants={v(enterFadeUp, 0.08)}
            >
              {tA}
              <span className="texto-gradiente">{tD}</span>
              {tB}
            </motion.p>
          </figcaption>

          {/* ≥1280: raias. Gatilho próprio (como a figura da S08): o desenho só
              monta quando a caixa tem largura, e isso pode acontecer depois da
              figura revelada (ao redimensionar de <1280 para ≥1280). Herdando da
              figura, as raias e os textos das etapas ficavam invisíveis (28 set). */}
          <div ref={ref} className="relative mt-[var(--ritmo-cabeca)] hidden xl:block" style={{ height: G.altura }}>
            {W > 0 && (
              <motion.div className="absolute inset-0" initial="hidden" whileInView="visible" viewport={VIEWPORT}>
                <svg
                  className="absolute inset-0 h-full w-full overflow-visible"
                  viewBox={`0 0 ${W} ${G.altura}`}
                  aria-hidden="true"
                  focusable="false"
                >
                  <motion.path d={raia(G.yMaquina)} className="s09-raia" variants={desenho(T.raias, 0.8)} />
                  <motion.path d={raia(G.yHumano)} className="s09-raia" variants={desenho(T.raias, 0.8)} />
                  <motion.circle cx={G.origemX} cy={meio} r={3} className="s09-origem" variants={v(enterFade(0.3), T.raias)} />
                  <motion.path d={caminho} className="s09-fluxo" variants={desenho(T.fluxo, T.durFluxo, 'linear')} />
                  {etapas.map((e, i) => {
                    const obrigatorio = 'obrigatorio' in e && e.obrigatorio
                    return (
                      <motion.g key={e.n} variants={no(i)}>
                        {obrigatorio && <circle cx={cx(i)} cy={y(e)} r={13} className="s09-anel" />}
                        <circle cx={cx(i)} cy={y(e)} r={6} className={e.raia === 'maquina' ? 's09-no-maquina' : 's09-no-humano'} />
                      </motion.g>
                    )
                  })}
                </svg>

                {/* Rótulos das raias, na calha */}
                {(['maquina', 'humano'] as const).map((k) => (
                  <motion.div
                    key={k}
                    className="absolute left-0 w-[152px] -translate-y-1/2"
                    style={{ top: k === 'maquina' ? G.yMaquina : G.yHumano }}
                    variants={v(enterFade(0.4), T.raias + 0.4)}
                  >
                    <p
                      className={`text-[12px] font-semibold leading-[1.5] tracking-[0.02em] ${
                        k === 'maquina' ? 'text-[var(--acao-link)]' : 'text-[var(--texto-principal)]'
                      }`}
                    >
                      {raias[k].rotulo.toUpperCase()}
                    </p>
                    <p className="text-[14px] leading-[20px] text-[var(--texto-apoio)]">{raias[k].papel}</p>
                  </motion.div>
                ))}

                {/* Texto das etapas: acima da raia da IA, abaixo da raia humana */}
                <ol>
                  {etapas.map((e, i) => (
                    <motion.li
                      key={e.n}
                      className="absolute"
                      style={{
                        left: cx(i) - col / 2 + 8,
                        width: col - 16,
                        ...(e.raia === 'maquina' ? { bottom: G.altura - G.yMaquina + 24 } : { top: G.yHumano + 24 }),
                      }}
                      variants={v(enterFadeUp, noNo(i))}
                    >
                      <TextoEtapa e={e} />
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            )}
          </div>

          {/* <1280: uma coluna, o dono em cada etapa */}
          <ol className="mt-[var(--ritmo-cabeca)] xl:hidden">
            {etapas.map((e, i) => (
              <Fragment key={e.n}>
                <motion.li className="relative flex gap-4 pb-8 last:pb-0" variants={v(enterFadeUp, i * STAGGER.item)}>
                  <span className="relative flex w-4 shrink-0 justify-center pt-1">
                    <span
                      className={`relative z-[1] block h-3 w-3 rounded-full ${
                        e.raia === 'maquina'
                          ? 'bg-[var(--acao-link)]'
                          : 'bg-[var(--fundo-pagina)] shadow-[inset_0_0_0_1.5px_var(--texto-principal)]'
                      }`}
                    />
                    {i < etapas.length - 1 && (
                      <span aria-hidden="true" className="absolute bottom-[-4px] top-5 w-px bg-[var(--borda-padrao)]" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <TextoEtapa e={e} />
                  </div>
                </motion.li>
              </Fragment>
            ))}
          </ol>
        </motion.figure>

        {/* Fecho */}
        <motion.p
          className="mt-[var(--ritmo-bloco)] max-w-[880px] text-[20px] leading-[1.4] md:text-[24px]"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={v(enterFadeUp, 0)}
        >
          <span className="text-[var(--texto-apoio)]">{fecho.ia}</span>{' '}
          <span className="text-[var(--texto-principal)]">{fecho.humano}</span>
        </motion.p>
      </Container>
    </section>
  )
}
