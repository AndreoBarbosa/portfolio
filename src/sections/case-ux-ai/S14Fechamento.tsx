import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Container from '../../components/case-ux-ai/layout/Container'
import LineMask from '../../components/case-ux-ai/type/LineMask'
import { aprendizado, contatoFinal } from '../../data/caseUxAi'
import { useCaseMotion } from '../../motion/CaseUxAiMotionProvider'
import { atBeat, enterFade, enterFadeUp, reducedFade } from '../../motion/caseUxAiRecipes'
import { DUR, STAGGER, VIEWPORT } from '../../motion/caseUxAiTokens'
import './secoes-finais.css'

const FIOS = '/case-ux-ai/s14-fios'

/**
 * 14 · Aprendizado e 15 · Vamos conversar — docs/BRIEF-S06-S15.md §S14–15.
 * Figma 800:1066 e 800:1068, que já dividiam um fundo só (os fios de vidro).
 *
 * O Figma centralizava tudo em 640px, com a frase em 32. A frase é a rima da
 * pergunta da S03 e o último momento forte do case: aqui ela sobe para a
 * escala narrativa (56), alinhada à esquerda, com a máscara por linha (só a
 * pergunta da S03 e esta frase usam máscara). Os fios ficam à direita e se
 * apagam em direção ao texto.
 *
 * Fios: magnific_…hEmRApUvqL (fundo branco), invertido para o piso #050B0E e
 * esfriado. Não reprocessar: s14-fios-1088 e s14-fios-1536.
 */
export default function S14Fechamento() {
  const { reduced } = useCaseMotion()
  const v = (variants: Variants, beat: number) => (reduced ? reducedFade : atBeat(variants, beat))

  return (
    <div className="relative overflow-hidden bg-[var(--fundo-pagina)]">
      <motion.picture
        className="s14-fios pointer-events-none absolute right-[-360px] top-0 hidden h-[1088px] w-[1088px] xl:block min-[1600px]:right-[-200px]"
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={v(enterFade(DUR.hero), 0)}
      >
        <source type="image/avif" srcSet={`${FIOS}-1088.avif 1x, ${FIOS}-1536.avif 1.41x`} />
        <img
          className="block h-full w-full"
          src={`${FIOS}-1088.webp`}
          srcSet={`${FIOS}-1088.webp 1x, ${FIOS}-1536.webp 1.41x`}
          width={1088}
          height={1088}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </motion.picture>

      <section id="aprendizado" aria-labelledby="aprendizado-titulo" className="relative z-[1] pb-16 pt-24 md:pb-24 md:pt-32">
        <Container>
          <motion.p
            className="text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--acao-link)]"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={v(enterFade(0.4), 0)}
          >
            {aprendizado.eyebrow}
          </motion.p>
          <LineMask
            id="aprendizado-titulo"
            lines={[...aprendizado.linhas]}
            as="h2"
            staggerChildren={STAGGER.line * 2}
            delay={0.12}
            className="f-display mt-6 max-w-[800px] text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--texto-principal)] md:text-[44px] xl:text-[56px] xl:leading-[60px]"
          />
          <motion.div className="mt-10 max-w-[560px] md:mt-12" initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <motion.p
              className="text-[16px] leading-[1.5] text-[var(--texto-apoio)] md:text-[18px] md:leading-[28px]"
              variants={v(enterFadeUp, 0.5)}
            >
              {aprendizado.texto}
            </motion.p>
            <motion.p
              className="mt-6 text-[16px] font-semibold leading-[1.5] text-[var(--texto-principal)] md:text-[18px] md:leading-[28px]"
              variants={v(enterFadeUp, 0.62)}
            >
              {aprendizado.fecho}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <section id="contato-case" aria-labelledby="contato-case-titulo" className="relative z-[1] pb-24 pt-16 md:pb-40 md:pt-24">
        <Container>
          <motion.div className="max-w-[640px]" initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <motion.h2
              id="contato-case-titulo"
              className="f-display text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--texto-principal)] md:text-[64px]"
              variants={v(enterFadeUp, 0)}
            >
              {contatoFinal.titulo}
            </motion.h2>
            <motion.p
              className="mt-6 text-[16px] leading-[1.5] text-[var(--texto-apoio)] md:text-[18px] md:leading-[28px]"
              variants={v(enterFadeUp, 0.1)}
            >
              {contatoFinal.texto}
            </motion.p>
            <motion.div className="mt-10" variants={v(enterFadeUp, 0.2)}>
              <a
                href={contatoFinal.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="s15-botao group inline-flex h-12 items-center gap-2 rounded-[var(--r-pill)] bg-[var(--acao-botao-fundo)] px-6 text-[16px] font-semibold text-[var(--acao-botao-texto)]"
              >
                {contatoFinal.cta.rotulo}
                <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
