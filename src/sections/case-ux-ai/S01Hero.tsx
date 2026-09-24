import { Fragment, useRef, useState, type FocusEvent, type MouseEvent } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import EyebrowChip from '../../components/case-ux-ai/ui/EyebrowChip'
import HeroMedia from '../../components/case-ux-ai/media/HeroMedia'
import LatticeHero from '../../components/case-ux-ai/media/LatticeHero'
import StatItem from '../../components/case-ux-ai/data/StatItem'
import { hero, heroStats } from '../../data/caseUxAi'
import { useCaseMotion } from '../../motion/CaseUxAiMotionProvider'
import {
  enterDivergence,
  enterFadeUp,
  lineMaskContainer,
  lineMaskLine,
  staggerContainer,
} from '../../motion/caseUxAiRecipes'
import { DUR, EASE, HERO_BEAT, HERO_DUR, REDUCED_FADE, STAGGER, VIEWPORT } from '../../motion/caseUxAiTokens'

const GUTTER = { paddingInline: 'clamp(24px, 6.67vw, 96px)' }

/** Reduced motion: toda entrada vira fade de REDUCED_FADE, sem atraso nem cascata (contrato §6 e §7). */
const reducedFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: REDUCED_FADE } },
}

const fade = (duration: number): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration, ease: EASE.enter } },
})

/** Acrescenta o beat do hero ao `transition` do estado `visible` de uma receita. */
function atBeat(variants: Variants, delay: number): Variants {
  const visible = variants.visible as { transition?: object }
  return { ...variants, visible: { ...visible, transition: { ...visible.transition, delay } } }
}

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
 * Motion (MOTION-SPEC §6, S01): tabela de beats em HERO_BEAT, contada do
 * mount. A faixa de stats fica abaixo da dobra em 1440, então ela entra ao
 * aparecer na viewport, com o que sobrar do beat `stats` (zero se o
 * usuário demorou a rolar) — senão a contagem terminaria fora da tela.
 *
 * Colunas IA e Humanos são <button> (spec: "Teclado"). Hover (só em
 * `hover: hover`) ou foco visível realçam a coluna e fazem 89 e 11 recuarem
 * para --texto-apoio, deixando 68% e 48% no topo.
 */
export default function S01Hero() {
  const { reduced } = useCaseMotion()
  const mountedAt = useRef(performance.now())
  const [columnActive, setColumnActive] = useState(false)

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

  const columnHandlers = {
    onMouseEnter: () => {
      if (window.matchMedia('(hover: hover)').matches) setColumnActive(true)
    },
    onMouseLeave: (e: MouseEvent<HTMLButtonElement>) => {
      if (!e.currentTarget.matches(':focus-visible')) setColumnActive(false)
    },
    onFocus: (e: FocusEvent<HTMLButtonElement>) => {
      if (e.currentTarget.matches(':focus-visible')) setColumnActive(true)
    },
    onBlur: () => setColumnActive(false),
  }

  return (
    <>
      <motion.section
        id="hero"
        aria-labelledby="hero-heading"
        className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 overflow-hidden bg-[var(--fundo-pagina)] pb-16 pt-36 case-xl:block case-xl:h-[1024px] case-xl:gap-0 case-xl:py-0"
        style={GUTTER}
        initial="hidden"
        animate="visible"
      >
        <LatticeHero />

        <div className="relative z-[1] flex w-full max-w-[692px] flex-col items-center gap-6 text-center case-xl:absolute case-xl:left-[374px] case-xl:top-[142px] case-xl:w-[692px] case-xl:max-w-none">
          <motion.div variants={v(fade(DUR.enter), HERO_BEAT.chip)}>
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

        <HeroMedia />

        <div className="relative z-[1] flex w-full max-w-[692px] flex-col gap-8 lg:flex-row lg:justify-between case-xl:contents">
          <motion.button
            type="button"
            className="coluna-divergencia flex w-full flex-col gap-4 rounded-[var(--r-md)] text-left lg:flex-1 case-xl:absolute case-xl:left-[160px] case-xl:top-[600px] case-xl:w-[224px] case-xl:max-w-none case-xl:p-4"
            variants={v(enterDivergence('left'), HERO_BEAT.columns)}
            {...columnHandlers}
          >
            <span
              className="f-display block font-semibold leading-[1.1] tracking-[-0.03em] texto-gradiente"
              style={{ fontSize: 'clamp(16px, 1.39vw, 20px)' }}
            >
              {hero.sideIA.label}
            </span>
            <span className="coluna-divergencia-texto block text-[16px] leading-[1.5] case-xl:text-[18px]">
              {hero.sideIA.text}
            </span>
          </motion.button>

          <motion.button
            type="button"
            className="coluna-divergencia flex w-full flex-col gap-4 rounded-[var(--r-md)] text-left lg:flex-1 case-xl:absolute case-xl:left-[1087px] case-xl:top-[627px] case-xl:w-[193px] case-xl:max-w-none"
            variants={v(enterDivergence('right'), HERO_BEAT.columns)}
            {...columnHandlers}
          >
            <span
              className="f-display block font-semibold leading-[1.1] tracking-[-0.03em] texto-gradiente"
              style={{ fontSize: 'clamp(16px, 1.39vw, 20px)' }}
            >
              {hero.sideHumanos.label}
            </span>
            <span className="coluna-divergencia-texto block text-[16px] leading-[1.5] case-xl:text-[18px]">
              {hero.sideHumanos.text}
            </span>
          </motion.button>
        </div>
      </motion.section>

      <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 pb-10" style={GUTTER}>
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
                // 68% e 48% (os percentuais) ficam no topo; 89 e 11 recuam.
                emphasis={columnActive && stat.suffix !== '%' ? 'down' : 'up'}
              />
            </Fragment>
          ))}
        </motion.div>

        <motion.p
          className="text-center text-[14px] font-semibold text-[var(--texto-apoio)] case-xl:text-[16px]"
          variants={reduced ? reducedFade : atBeat(fade(HERO_DUR.hook), hookDelay)}
          initial="hidden"
          animate={statsInView ? 'visible' : 'hidden'}
        >
          {hero.hookSentence.text}
        </motion.p>
      </section>
    </>
  )
}
