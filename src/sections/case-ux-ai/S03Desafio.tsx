import { Fragment, useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import Container from '../../components/case-ux-ai/layout/Container'
import { desafio } from '../../data/caseUxAi'
import { useCaseMotion } from '../../motion/CaseUxAiMotionProvider'
import {
  atBeat,
  enterFade,
  enterFadeUp,
  enterRule,
  lineMaskContainer,
  lineMaskLine,
  reducedFade,
} from '../../motion/caseUxAiRecipes'
import { DUR, EASE, MOVE, S03_BEAT, S03_DUR, S03_PARALLAX, STAGGER, VIEWPORT } from '../../motion/caseUxAiTokens'
import useMediaQuery from '../../motion/useMediaQuery'

const VIDRO = '/case-ux-ai/s03-vidro'

/** Parte um texto em volta do trecho em destaque. */
function partir(texto: string, destaque: string) {
  const i = texto.indexOf(destaque)
  return i === -1 ? [texto, '', ''] : [texto.slice(0, i), destaque, texto.slice(i + destaque.length)]
}

/**
 * 03–04 · O Desafio e o Briefing — docs/BRIEF-S03-DESAFIO.md (v2), Figma
 * 1052:1139, "Proposta B" de 25 set 2026.
 *
 * Duas metades: o vidro à esquerda, preso à borda da janela, e uma coluna de
 * 720 à direita com o texto e a ficha do briefing. A pergunta é o maior texto
 * da seção (48/52). A ficha não é painel: é uma régua no topo e uma grade 2×2,
 * com PROBLEMA e CONTEXTO em texto e ATUAÇÃO e MÉTODOS em chips.
 *
 * Vidro: 536×976, já com o fundo #050B0E e a base esfumada. `left` põe a
 * borda direita da imagem 64px antes da coluna em qualquer largura até 1440;
 * acima disso fica colado na borda da janela (o corte do vidro nunca aparece
 * no meio da tela). Só ≥1280; abaixo disso, display none e, com
 * loading="lazy", nem é baixado.
 */
export default function S03Desafio() {
  const { eyebrow, intro, pergunta, intencao, briefing } = desafio
  const [antes, destaqueIntencao, depois] = partir(intencao.texto, intencao.destaque)
  const { reduced } = useCaseMotion()
  const linhasFixas = useMediaQuery('(min-width: 1280px)')
  // Parallax só com a imagem visível (≥1280), ponteiro fino e sem reduced motion.
  const parallax = useMediaQuery('(min-width: 1280px) and (pointer: fine)') && !reduced

  // Vidro a 0.9x da rolagem: sobra 0.1 do deslocamento, zero com a seção
  // centrada na tela, com teto de ±40px. Só transform.
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const vidroY = useTransform(scrollYProgress, (p) => {
    const percurso = (sectionRef.current?.offsetHeight ?? 0) + window.innerHeight
    const y = (p - 0.5) * percurso * (1 - S03_PARALLAX.taxa)
    return Math.max(-S03_PARALLAX.teto, Math.min(S03_PARALLAX.teto, y))
  })

  const v = (variants: Variants, beat: number) => (reduced ? reducedFade : atBeat(variants, beat))
  const curto: Variants = {
    hidden: { opacity: 0, y: MOVE.xs },
    visible: { opacity: 1, y: 0, transition: { duration: DUR.enter, ease: EASE.enter } },
  }
  const mascara = !reduced && linhasFixas
  const ultimaLinha = pergunta.linhas.length - 1

  return (
    <motion.section
      ref={sectionRef}
      id="desafio"
      aria-labelledby="desafio-heading"
      className="relative overflow-hidden bg-[var(--fundo-pagina)] py-12 md:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <motion.picture
        className="pointer-events-none absolute top-[96px] hidden h-[976px] w-[536px] xl:block"
        aria-hidden="true"
        style={{
          left: 'min(0px, calc(100% - clamp(24px, 8.33vw, 120px) - 1320px))',
          ...(parallax ? { y: vidroY } : {}),
        }}
        variants={v(enterFade(S03_DUR.vidro), S03_BEAT.vidro)}
      >
        <source type="image/avif" srcSet={`${VIDRO}-536.avif 1x, ${VIDRO}-1072.avif 2x`} />
        <img
          className="block h-full w-full"
          src={`${VIDRO}-536.webp`}
          srcSet={`${VIDRO}-536.webp 1x, ${VIDRO}-1072.webp 2x`}
          width={536}
          height={976}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </motion.picture>

      <Container className="relative z-[1]">
        <div className="xl:ml-auto xl:w-[720px]">
          <motion.p
            className="text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--acao-link)]"
            variants={v(enterFade(S03_DUR.eyebrow), S03_BEAT.eyebrow)}
          >
            {eyebrow}
          </motion.p>

          <motion.p
            className="mt-4 max-w-[520px] text-[16px] leading-[1.5] text-[var(--texto-apoio)]"
            variants={v(enterFadeUp, S03_BEAT.intro)}
          >
            {intro}
          </motion.p>

          <motion.p
            className="mt-12 text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--acao-link)] md:mt-[72px]"
            variants={v(enterFade(), S03_BEAT.eyebrowPergunta)}
          >
            {pergunta.eyebrow}
          </motion.p>

          <motion.h2
            id="desafio-heading"
            className="f-display mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--texto-principal)] md:text-[40px] xl:text-[48px] xl:leading-[52px]"
            variants={
              reduced
                ? reducedFade
                : linhasFixas
                  ? lineMaskContainer(STAGGER.line, S03_BEAT.pergunta)
                  : atBeat(enterFadeUp, S03_BEAT.pergunta)
            }
          >
            {/* Uma linha por <span>. As quebras do Figma valem a partir de 1280
                (xl), e só aí cada linha entra por máscara; abaixo disso os spans
                ficam inline, separados por espaço, e a pergunta entra como bloco. */}
            {pergunta.linhas.map((linha, i) => {
              const [a, d, b] = partir(linha, pergunta.destaque)
              return (
                <Fragment key={i}>
                  {i > 0 && ' '}
                  <motion.span className="xl:block" variants={mascara ? lineMaskLine : undefined}>
                    {a}
                    {d && (
                      // O destaque chega 120ms depois da linha dele, só com opacidade.
                      // Atraso absoluto: o framer dispara os filhos de uma linha
                      // quando o estado muda, sem esperar o stagger da linha.
                      // nowrap: "priorizá-los?" nunca quebra no hífen.
                      <motion.span
                        className="texto-gradiente whitespace-nowrap"
                        variants={
                          mascara
                            ? {
                                hidden: { opacity: 0 },
                                visible: {
                                  opacity: 1,
                                  transition: {
                                    duration: S03_DUR.destaque,
                                    delay: S03_BEAT.pergunta + ultimaLinha * STAGGER.line + S03_BEAT.destaqueAposLinha,
                                    ease: EASE.enter,
                                  },
                                },
                              }
                            : undefined
                        }
                      >
                        {d}
                      </motion.span>
                    )}
                    {b}
                  </motion.span>
                </Fragment>
              )
            })}
          </motion.h2>

          <motion.p
            className="mt-8 max-w-[560px] text-[16px] leading-[1.5] text-[var(--texto-apoio)]"
            variants={v(enterFadeUp, S03_BEAT.intencao)}
          >
            {antes}
            <span className="text-[var(--acao-link)]">{destaqueIntencao}</span>
            {depois}
          </motion.p>

          {/* Ficha do briefing (1054:1138): régua de 1px no topo, sem fundo e sem
              borda em volta. Gatilho próprio. `id="briefing"` e o <h3> focável são
              o destino da pílula (BriefingPill). */}
          <motion.div
            id="briefing"
            className="relative mt-16 pt-6 md:mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left bg-[var(--borda-padrao)]"
              variants={v(enterRule, S03_BEAT.ficha.regua)}
            />
            <motion.h3
              tabIndex={-1}
              className="text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--texto-metadado)]"
              variants={v(enterFade(), S03_BEAT.ficha.titulo)}
            >
              {briefing.titulo}
            </motion.h3>

            <dl className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-2">
              {briefing.textos.map((t, k) => (
                <motion.div
                  key={t.rotulo}
                  className="flex flex-col gap-2"
                  variants={v(curto, S03_BEAT.ficha.celulas + k * STAGGER.item)}
                >
                  <dt className="text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--acao-hover)]">
                    {t.rotulo}
                  </dt>
                  <dd className="text-[16px] leading-[1.5] text-[var(--texto-principal)]">{t.texto}</dd>
                </motion.div>
              ))}
              {briefing.listas.map((l, k) => (
                <motion.div
                  key={l.rotulo}
                  className="flex flex-col gap-2"
                  variants={v(curto, S03_BEAT.ficha.celulas + (k + briefing.textos.length) * STAGGER.item)}
                >
                  <dt className="text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--acao-hover)]">
                    {l.rotulo}
                  </dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {l.itens.map((item) => (
                        <li
                          key={item}
                          className="rounded-full px-3 py-[6px] text-[14px] leading-[20px] text-[var(--texto-apoio)] shadow-[inset_0_0_0_1px_var(--borda-padrao)]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  )
}
