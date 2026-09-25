import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE, DUR, STAGGER, VIEWPORT } from '../../motion/tokens'

type Props = {
  /** O texto a revelar. Só string: a máscara precisa medir palavra por palavra. */
  text: string
  className?: string
  delay?: number
  /** Dispara no load em vez de esperar a viewport. Para o hero. */
  onLoad?: boolean
}

/**
 * Revelação por máscara: cada palavra sobe por trás de um recorte, em
 * cascata. Diferente do LiquidReveal, que move o bloco inteiro de uma vez.
 *
 * Três detalhes que separam a execução limpa da quase certa:
 *
 * 1. O deslocamento é 110%, não 100%. Fontes têm descendentes, e em 100% a
 *    perna do "g" e do "p" aparece na borda do recorte por um quadro.
 * 2. O recorte ganha padding-bottom com margin-bottom negativa do mesmo
 *    valor. Sem isso o overflow hidden corta os descendentes no estado
 *    final, que é o bug clássico deste padrão.
 * 3. O espaço entre palavras fica FORA do recorte. Dentro dele o espaço não
 *    conta para a quebra de linha e o título deixa de refluir no mobile.
 *
 * A quebra é por palavra, não por linha, justamente para a cascata continuar
 * correta em qualquer largura.
 */
export default function MaskReveal({ text, className = '', delay = 0, onLoad = false }: Props) {
  const shouldReduce = useReducedMotion()
  const words = text.split(' ')

  if (shouldReduce) {
    return <span className={className}>{text}</span>
  }

  const trigger = onLoad
    ? { initial: 'hidden' as const, animate: 'show' as const }
    : { initial: 'hidden' as const, whileInView: 'show' as const, viewport: VIEWPORT }

  return (
    <span className={className}>
      {/* O texto real para leitor de tela e para busca. As palavras animadas
          abaixo são decorativas: se anunciadas uma a uma, a frase quebra. */}
      <span className="sr-only">{text}</span>

      <motion.span
        aria-hidden="true"
        {...trigger}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: STAGGER, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'bottom',
                paddingBottom: '0.14em',
                marginBottom: '-0.14em',
              }}
            >
              <motion.span
                style={{ display: 'inline-block', willChange: 'transform' }}
                variants={{
                  hidden: { y: '110%' },
                  show: { y: '0%', transition: { duration: DUR.reveal, ease: EASE } },
                }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </motion.span>
    </span>
  )
}
