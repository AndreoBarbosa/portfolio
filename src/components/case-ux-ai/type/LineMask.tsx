import { motion } from 'framer-motion'
import { useCaseMotion } from '../../../motion/CaseUxAiMotionProvider'
import { lineMaskContainer, lineMaskLine } from '../../../motion/caseUxAiRecipes'
import { VIEWPORT } from '../../../motion/caseUxAiTokens'

type Props = {
  /**
   * Uma string por linha, na ordem visual. O blueprint desenha quebras de
   * linha intencionais (ex. H1 do hero: "Onde a IA erra" / "ao avaliar
   * sistemas hospitalares") — não é reflow automático de texto corrido.
   */
  lines: string[]
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  id?: string
  /** Dispara no load em vez de esperar a viewport (usado só no H1 do hero). */
  onLoad?: boolean
  staggerChildren?: number
  /** Atraso antes da primeira linha entrar — usado pelo hero para casar com HERO_BEAT.headline. */
  delay?: number
}

/**
 * `enter-line-mask` — blueprint §14.3. Cada linha entra por clip-path,
 * de baixo para cima, em cascata. Usado em todo título de seção e no H1
 * do hero (com blur adicional, aplicado pelo caller em XL/L — M-02).
 */
export default function LineMask({
  lines,
  as: Tag = 'h2',
  className = '',
  id,
  onLoad = false,
  staggerChildren,
  delay = 0,
}: Props) {
  const { reduced } = useCaseMotion()

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    )
  }

  return (
    <Tag id={id} className={className}>
      <motion.span
        className="block"
        variants={lineMaskContainer(staggerChildren, delay)}
        initial="hidden"
        {...(onLoad ? { animate: 'visible' } : { whileInView: 'visible', viewport: VIEWPORT })}
      >
        {lines.map((line, i) => (
          <motion.span key={i} variants={lineMaskLine} className="block">
            {line}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}
