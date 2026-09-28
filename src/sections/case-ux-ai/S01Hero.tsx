import { Fragment, useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import EyebrowChip from '../../components/case-ux-ai/ui/EyebrowChip'
import HeroMedia from '../../components/case-ux-ai/media/HeroMedia'
import StatItem from '../../components/case-ux-ai/data/StatItem'
import { hero, heroStats } from '../../data/caseUxAi'
import { useCaseMotion } from '../../motion/CaseUxAiMotionProvider'
import {
  atBeat,
  enterDivergence,
  enterFade,
  enterFadeUp,
  reducedFade,
  lineMaskContainer,
  lineMaskLine,
  staggerContainer,
} from '../../motion/caseUxAiRecipes'
import { DUR, HERO_BEAT, HERO_DUR, STAGGER, VIEWPORT } from '../../motion/caseUxAiTokens'

const GUTTER = { paddingInline: 'clamp(24px, 6.67vw, 96px)' }

/* Hero em ≥1024: margem lateral no bloco de texto, não na seção. A seção
   fica com a largura toda para o quadro do vídeo (e as colunas IA e
   Humanos, que se posicionam nele) usar a mesma escala do frame de 1440. */
const GUTTER_HERO = 'px-[clamp(24px,6.67vw,96px)] lg:px-0'

/**
 * Parte o H1 em unidades de máscara: uma por palavra, exceto os trechos de
 * `hero.headline.highlight`, que entram como unidade só. O gradiente (brief
 * §5) precisa estar no mesmo elemento que se move: `background-clip: text`
 * num pai não pinta filhos com transform. Então "sistemas hospitalares"
 * entra como um bloco, para o gradiente continuar correndo pelo trecho
 * inteiro como na Etapa B.
 */
function headlineUnits(line: string) {
  const terms = hero.headline.highlight
  // Termos são palavras literais do conteúdo, sem metacaractere de regex.
  return line
    .split(new RegExp(`(${terms.join('|')})`))
    .flatMap((part) =>
      terms.includes(part)
        ? [{ text: part, highlight: true }]
        : part.split(' ').filter(Boolean).map((text) => ({ text, highlight: false })),
    )
}

/**
 * 01 · Hero + Stats. docs/BRIEF-S01-HERO.md §2-4 para a geometria de 1440,
 * docs/CONTRATO-RESPONSIVO.md para tudo abaixo disso.
 *
 * `position: absolute` só existe em `case-xl` (≥1440, contrato §2) — abaixo
 * disso os mesmos elementos entram no fluxo normal, na ordem do brief §8:
 * chip, título, subtítulo, vídeo, IA, Humanos. `max-width`, nunca `width`
 * fixa (contrato §1): a seção nunca cria scroll horizontal.
 *
 * Nav NÃO é renderizado aqui — continua em CaseUxAi.tsx como elemento de
 * página (sticky para o resto do case), mas com altura 0: sobrepõe o hero
 * em vez de empurrá-lo. O hero começa em y0 da página; em case-xl o chip
 * em y142 já livra o nav, abaixo disso o `pt-36` (144 = nav ~80 + 64).
 *
 * Só vídeo e texto: a treliça saiu do hero em 24 set 2026 (MOTION-SPEC §6,
 * S01). LatticeHero continua no repositório para a S08.
 *
 * Motion (MOTION-SPEC §6, S01): tabela de beats em HERO_BEAT, contada do
 * mount. A faixa de stats fica abaixo da dobra em 1440, então ela entra ao
 * aparecer na viewport, com o que sobrar do beat `stats` (zero se o
 * usuário demorou a rolar) — senão a contagem terminaria fora da tela.
 *
 * Colunas IA e Humanos são texto comum, sem hover nem foco (pedido do
 * Andreo, 28 set: não são botões).
 *
 * Entre 1024 e 1439 (28 set): a mesma composição do desktop, em escala. O
 * quadro do vídeo tem a proporção do frame de 1440 (1440×1024) e ocupa a
 * largura da seção; IA e Humanos ficam à esquerda e à direita do objeto,
 * na altura dele. Medidas em cqw da seção (1440 = 100cqw). O título fica no
 * fluxo, com o respiro da nav, e o quadro sobe por baixo dele como no
 * desktop, onde o título já fica sobre a parte vazia do vídeo.
 */
export default function S01Hero() {
  const { reduced } = useCaseMotion()
  const mountedAt = useRef(performance.now())

  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, VIEWPORT)
  const statsDelayRef = useRef<number | null>(null)
  if (statsInView && statsDelayRef.current === null) {
    const elapsed = (performance.now() - mountedAt.current) / 1000
    statsDelayRef.current = reduced ? 0 : Math.max(HERO_BEAT.stats - elapsed, 0)
  }
  const statsDelay = statsDelayRef.current ?? 0
  const hookDelay = reduced ? 0 : statsDelay + (HERO_BEAT.hook - HERO_BEAT.stats)

  const v = (variants: Variants, beat: number) => (reduced ? reducedFade : atBeat(variants, beat))

  return (
    <>
      <motion.section
        id="hero"
        aria-labelledby="hero-heading"
        className={`relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 overflow-hidden bg-[var(--fundo-pagina)] pb-16 pt-36 lg:gap-0 lg:pb-0 lg:[container-type:inline-size] case-xl:block case-xl:h-[1024px] case-xl:py-0 ${GUTTER_HERO}`}
        initial="hidden"
        animate="visible"
      >
        <div className="relative z-[1] flex w-full max-w-[692px] flex-col items-center gap-6 text-center case-xl:absolute case-xl:left-[374px] case-xl:top-[142px] case-xl:w-[692px] case-xl:max-w-none">
          <motion.div variants={v(enterFade(DUR.enter), HERO_BEAT.chip)}>
            <EyebrowChip>{hero.chip}</EyebrowChip>
          </motion.div>

          <motion.h1
            id="hero-heading"
            className="f-display text-center font-semibold leading-[1.1] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(40px, 4.44vw, 64px)' }}
            variants={reduced ? reducedFade : lineMaskContainer(STAGGER.item, HERO_BEAT.headline)}
          >
            {hero.headline.lines.map((line, i) => (
              <span key={i} className="block">
                {headlineUnits(line).map((unit, j) => (
                  <Fragment key={j}>
                    {j > 0 && ' '}
                    <motion.span
                      className={`inline-block ${unit.highlight ? 'texto-gradiente' : ''}`}
                      variants={reduced ? undefined : lineMaskLine}
                    >
                      {unit.text}
                    </motion.span>
                  </Fragment>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="w-full max-w-[561px] text-center text-[16px] leading-[1.5] text-[var(--texto-apoio)]"
            variants={v(enterFadeUp, HERO_BEAT.subtitle)}
          >
            {hero.subtitle}
          </motion.p>
        </div>

        {/* Quadro: no fluxo abaixo de 1024; de 1024 a 1439, a caixa em escala do
            frame de 1440; em ≥1440 some (contents) e tudo se posiciona na seção. */}
        <div className="relative flex w-full flex-col items-center gap-8 lg:mt-[calc(-440*100cqw/1440)] lg:block lg:h-[calc(1024*100cqw/1440)] case-xl:contents">
        <HeroMedia />

        <div className="relative z-[1] flex w-full max-w-[692px] flex-col gap-8 lg:contents">
          <motion.div
            className="flex w-full flex-col gap-4 text-left lg:absolute lg:left-[calc(368*100cqw/1440-192px)] lg:top-[calc(616*100cqw/1440)] lg:z-[1] lg:w-[192px] case-xl:left-[176px] case-xl:top-[616px] case-xl:max-w-none"
            variants={v(enterDivergence('left'), HERO_BEAT.columns)}
          >
            <span
              className="f-display block font-semibold leading-[1.1] tracking-[-0.03em] texto-gradiente"
              style={{ fontSize: 'clamp(16px, 1.39vw, 20px)' }}
            >
              {hero.sideIA.label}
            </span>
            <span className="block text-[16px] leading-[1.5] text-[var(--texto-apoio)] case-xl:text-[18px]">
              {hero.sideIA.text}
            </span>
          </motion.div>

          <motion.div
            className="flex w-full flex-col gap-4 text-left lg:absolute lg:left-[calc(1087*100cqw/1440)] lg:top-[calc(627*100cqw/1440)] lg:z-[1] lg:w-[193px] case-xl:left-[1087px] case-xl:top-[627px] case-xl:max-w-none"
            variants={v(enterDivergence('right'), HERO_BEAT.columns)}
          >
            <span
              className="f-display block font-semibold leading-[1.1] tracking-[-0.03em] texto-gradiente"
              style={{ fontSize: 'clamp(16px, 1.39vw, 20px)' }}
            >
              {hero.sideHumanos.label}
            </span>
            <span className="block text-[16px] leading-[1.5] text-[var(--texto-apoio)] case-xl:text-[18px]">
              {hero.sideHumanos.text}
            </span>
          </motion.div>
        </div>
        </div>
      </motion.section>

      <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 pb-[var(--ritmo-secao)]" style={GUTTER}>
        <motion.div
          ref={statsRef}
          className="grid w-full grid-cols-2 gap-8 rounded-[20px] bg-[var(--superficie-dado)] p-6 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:px-2 lg:py-10"
          variants={reduced ? undefined : staggerContainer(STAGGER.stat, statsDelay)}
          initial="hidden"
          animate={statsInView ? 'visible' : 'hidden'}
        >
          {heroStats.map((stat, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="hidden h-16 w-px shrink-0 bg-[var(--superficie-hover)] lg:block"
                />
              )}
              <StatItem
                stat={stat}
                active={statsInView}
                delay={reduced ? 0 : statsDelay + i * STAGGER.stat}
                variants={reduced ? reducedFade : enterFadeUp}
              />
            </Fragment>
          ))}
        </motion.div>

        <motion.p
          className="text-center text-[14px] font-semibold text-[var(--texto-apoio)] case-xl:text-[16px]"
          variants={reduced ? reducedFade : atBeat(enterFade(HERO_DUR.hook), hookDelay)}
          initial="hidden"
          animate={statsInView ? 'visible' : 'hidden'}
        >
          {hero.hookSentence.text}
        </motion.p>
      </section>
    </>
  )
}
