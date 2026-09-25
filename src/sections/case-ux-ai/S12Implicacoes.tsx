import { motion, type Variants } from 'framer-motion'
import Container from '../../components/case-ux-ai/layout/Container'
import { implicacoes, limites } from '../../data/caseUxAi'
import { useCaseMotion } from '../../motion/CaseUxAiMotionProvider'
import { atBeat, enterFade, enterFadeUp, enterRule, reducedFade } from '../../motion/caseUxAiRecipes'
import { STAGGER, VIEWPORT } from '../../motion/caseUxAiTokens'

/**
 * 12 · Implicações para UX, e 13 · O que este estudo não responde.
 * docs/BRIEF-S06-S15.md §S12–13. Figma 800:1062 e 800:1064.
 *
 * No Figma as duas eram a mesma forma: título, e itens em colunas iguais (3 e
 * 4). Aqui elas se separam por função:
 *  - 12 é editorial: três linhas largas, numeral grande, régua entre elas;
 *  - 13 é silenciosa: escala menor, luminância um degrau abaixo, mais ar.
 *    É o respiro antes do fechamento.
 */
export function S12Implicacoes() {
  const { eyebrow, titulo, lead, itens } = implicacoes
  const { reduced } = useCaseMotion()
  const v = (variants: Variants, beat: number) => (reduced ? reducedFade : atBeat(variants, beat))

  return (
    <section id="implicacoes" aria-labelledby="implicacoes-titulo" className="relative bg-[var(--fundo-pagina)] py-16 md:py-24">
      <Container>
        <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <motion.p
            className="text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--acao-link)]"
            variants={v(enterFade(0.4), 0)}
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            id="implicacoes-titulo"
            className="f-display mt-4 max-w-[880px] text-[32px] font-bold leading-[1.1] tracking-[-0.01em] text-[var(--texto-principal)] md:text-[clamp(32px,2.78vw,40px)]"
            variants={v(enterFadeUp, 0.12)}
          >
            {titulo}
          </motion.h2>
          <motion.p className="mt-6 text-[16px] leading-[1.5] text-[var(--texto-apoio)]" variants={v(enterFadeUp, 0.24)}>
            {lead}
          </motion.p>
        </motion.div>

        <ol className="mt-12 md:mt-16">
          {itens.map((item, k) => (
            <motion.li
              key={item.n}
              className="relative grid gap-y-3 py-8 md:grid-cols-[120px_minmax(0,1fr)_minmax(0,1fr)] md:gap-x-12 md:py-10"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left bg-[var(--borda-padrao)]"
                variants={v(enterRule, k * STAGGER.line)}
              />
              <motion.p
                className="f-display text-[40px] font-semibold leading-none tracking-[-0.02em] text-[var(--acao-link)] md:text-[56px]"
                variants={v(enterFade(0.6), 0.1 + k * STAGGER.line)}
              >
                {item.n}
              </motion.p>
              <motion.h3
                className="f-display text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--texto-principal)] md:text-[28px]"
                variants={v(enterFadeUp, 0.16 + k * STAGGER.line)}
              >
                {item.titulo}
              </motion.h3>
              <motion.p
                className="text-[16px] leading-[1.5] text-[var(--texto-apoio)] md:pt-1 md:text-[18px] md:leading-[28px]"
                variants={v(enterFadeUp, 0.24 + k * STAGGER.line)}
              >
                {item.texto}
              </motion.p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

export function S13Limites() {
  const { eyebrow, titulo, itens, fecho } = limites
  const { reduced } = useCaseMotion()
  const v = (variants: Variants, beat: number) => (reduced ? reducedFade : atBeat(variants, beat))

  return (
    <section id="limites" aria-labelledby="limites-titulo" className="relative bg-[var(--fundo-pagina)] py-24 md:py-32">
      <Container>
        <motion.div
          className="grid gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-16"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <div>
            <motion.p
              className="text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--texto-metadado)]"
              variants={v(enterFade(0.4), 0)}
            >
              {eyebrow}
            </motion.p>
            <motion.h2
              id="limites-titulo"
              className="f-display mt-4 text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-[var(--texto-apoio)] md:text-[28px]"
              variants={v(enterFadeUp, 0.12)}
            >
              {titulo}
            </motion.h2>
          </div>

          <div>
            <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {itens.map((l, k) => (
                <motion.div key={l.nome} variants={v(enterFadeUp, 0.2 + k * STAGGER.item)}>
                  <dt className="text-[14px] font-semibold leading-[20px] text-[var(--texto-apoio)]">{l.nome}</dt>
                  <dd className="mt-2 text-[14px] leading-[20px] text-[var(--texto-metadado)]">{l.texto}</dd>
                </motion.div>
              ))}
            </dl>
            <motion.p
              className="mt-10 border-t border-[var(--borda-sutil)] pt-6 text-[16px] leading-[1.5] text-[var(--texto-apoio)]"
              variants={v(enterFade(0.6), 0.2 + itens.length * STAGGER.item + 0.4)}
            >
              {fecho}
            </motion.p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
