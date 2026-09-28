import { Fragment } from 'react'
import { motion, type Variants } from 'framer-motion'
import Container from '../../components/case-ux-ai/layout/Container'
import Section from '../../components/case-ux-ai/layout/Section'
import { experimento } from '../../data/caseUxAi'
import { useCaseMotion } from '../../motion/CaseUxAiMotionProvider'
import { atBeat, enterFade, enterFadeUp, enterRule, reducedFade } from '../../motion/caseUxAiRecipes'
import { DUR, EASE, MOVE, S05_BEAT, STAGGER, VIEWPORT } from '../../motion/caseUxAiTokens'
import QuadroDivergencia from './s05/QuadroDivergencia'
import { ICONES_ETAPA } from './s05/icones'

/** Parte um texto em volta do trecho em destaque. */
function partir(texto: string, destaque: string) {
  const i = texto.indexOf(destaque)
  return i === -1 ? [texto, '', ''] : [texto.slice(0, i), destaque, texto.slice(i + destaque.length)]
}

/**
 * 05 · Desenho do experimento — docs/BRIEF-S05-EXPERIMENTO.md (v2), Figma
 * 1055:1138, "Proposta B" de 25 set 2026.
 *
 * Três faixas, sem cartões:
 *  1. cabeçalho: título à esquerda (594), o método num parágrafo à direita (518);
 *  2. o palco na largura toda: 89 problemas, dois julgamentos (QuadroDivergencia);
 *  3. uma régua e, embaixo, as quatro etapas à esquerda e o total de
 *     comparações à direita.
 * A seção descreve o método: nada aqui antecipa quem acertou mais.
 */
export default function S05Experimento() {
  const { eyebrow, titulo, metodo, quadro, etapasRotulo, etapas, comparacao } = experimento
  const [tAntes, tDestaque, tDepois] = partir(titulo.texto, titulo.destaque)
  const { reduced } = useCaseMotion()
  const v = (variants: Variants, beat: number) => (reduced ? reducedFade : atBeat(variants, beat))
  const curto: Variants = {
    hidden: { opacity: 0, y: MOVE.xs },
    visible: { opacity: 1, y: 0, transition: { duration: DUR.enter, ease: EASE.enter } },
  }
  const desenho = (delay: number): Variants =>
    reduced
      ? { hidden: { pathLength: 1, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.2 } } }
      : {
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { duration: S05_BEAT.seta, ease: EASE.state, delay },
              opacity: { duration: 0.01, delay },
            },
          },
        }
  const totalComparacoes = quadro.total * comparacao.dimensoes

  return (
    <Section id="experimento" labelledBy="experimento-titulo" className="bg-[var(--fundo-pagina)]">
      <Container>
        {/* 1 · Cabeçalho */}
        <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <motion.p
            className="text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--acao-link)]"
            variants={v(enterFade(0.4), S05_BEAT.eyebrow)}
          >
            {eyebrow}
          </motion.p>
          <div className="mt-4 grid gap-y-6 lg:grid-cols-[minmax(0,594fr)_minmax(0,518fr)] lg:gap-x-16 xl:gap-x-[88px]">
            <motion.h2
              id="experimento-titulo"
              className="f-display text-[32px] font-bold leading-[1.1] tracking-[-0.01em] text-[var(--texto-principal)] md:text-[clamp(32px,2.78vw,40px)]"
              variants={v(enterFadeUp, S05_BEAT.titulo)}
            >
              {tAntes}
              <span className="texto-gradiente">{tDestaque}</span>
              {tDepois}
            </motion.h2>
            <motion.p
              className="text-[16px] leading-[1.5] text-[var(--texto-apoio)] lg:pt-1"
              variants={v(enterFadeUp, S05_BEAT.metodo)}
            >
              {metodo}
            </motion.p>
          </div>
        </motion.div>

        {/* 2 · Palco, na largura toda. Linha do tempo própria (CSS), gatilho próprio. */}
        <div className="mt-[var(--ritmo-cabeca)]">
          <QuadroDivergencia
            total={quadro.total}
            unidade={quadro.unidade}
            lados={quadro.lados}
            ligacao={quadro.ligacao}
            ariaLabel={quadro.ariaLabel}
          />
        </div>

        {/* 3 · Régua, etapas e comparação */}
        <motion.div className="mt-[var(--ritmo-bloco)]" initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <motion.div
            aria-hidden="true"
            className="h-px origin-left bg-[var(--borda-padrao)]"
            variants={v(enterRule, 0)}
          />

          <div className="mt-8 flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 xl:w-[746px]">
              <motion.h3
                className="text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--texto-metadado)]"
                variants={v(enterFade(0.4), 0)}
              >
                {etapasRotulo}
              </motion.h3>

              {/* Em linha a partir de 768 (cartões flex-1; 152 fixos em ≥1280).
                  Abaixo, lista vertical com as setas apontando para baixo: sequência
                  nunca vira grade 2×2 (contrato §4). Só a 03 tem superfície. */}
              <ol className="mt-6 flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
                {etapas.map((e, k) => {
                  const destaque = 'destaque' in e && e.destaque
                  const Icone = ICONES_ETAPA[e.icone]
                  return (
                    <Fragment key={e.n}>
                      {k > 0 && (
                        <li aria-hidden="true" className="flex shrink-0 pl-[20px] md:pl-0">
                          <svg
                            width="14"
                            height="10"
                            viewBox="0 0 14 10"
                            fill="none"
                            focusable="false"
                            className="rotate-90 text-[var(--texto-metadado)] md:rotate-0"
                          >
                            <motion.path
                              d="M0.75 5H13.25M9 0.75L13.25 5L9 9.25"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              variants={desenho(k * STAGGER.line + S05_BEAT.setaAposEtapa)}
                            />
                          </svg>
                        </li>
                      )}
                      <motion.li
                        className={`flex min-w-0 items-center gap-3 rounded-[var(--r-sm)] px-4 py-3 md:flex-1 md:flex-col md:items-start md:gap-2 md:p-4 xl:w-[152px] xl:flex-none ${
                          destaque
                            ? 'bg-[var(--superficie-card)] shadow-[inset_0_0_0_1px_var(--borda-ativa)]'
                            : ''
                        }`}
                        variants={v(curto, k * STAGGER.line)}
                      >
                        <span className="flex shrink-0 items-center gap-3">
                          <span className="text-[var(--acao-hover)]">
                            <Icone />
                          </span>
                          <span className="f-mono text-[22px] font-medium leading-7 tracking-[0.02em] text-[var(--acao-hover)]">
                            {e.n}
                          </span>
                        </span>
                        <span
                          className={`text-[12px] font-semibold leading-[1.5] tracking-[0.02em] ${
                            destaque ? 'text-[var(--texto-principal)]' : 'text-[var(--texto-apoio)]'
                          }`}
                        >
                          {e.nome}
                        </span>
                      </motion.li>
                    </Fragment>
                  )
                })}
              </ol>
            </div>

            <motion.div className="max-w-[320px] xl:w-[320px]" variants={v(enterFadeUp, S05_BEAT.comparacao)}>
              <h3 className="text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--texto-metadado)]">
                {comparacao.rotulo}
              </h3>
              <p className="mt-5 flex items-baseline gap-3">
                <span className="f-display text-[56px] font-semibold leading-[60px] tracking-[-0.02em] text-[var(--texto-principal)]">
                  {totalComparacoes}
                </span>
                <span className="text-[16px] leading-[24px] text-[var(--texto-apoio)]">{comparacao.unidade}</span>
              </p>
              <p className="mt-1 text-[14px] leading-[20px] text-[var(--texto-metadado)]">{comparacao.texto}</p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
