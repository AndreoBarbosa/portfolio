import { motion, useReducedMotion } from 'framer-motion'
import { Fontes, srcOtimizado } from '../ui/Picture'

type Props = {
  src: string
  alt: string
  width: number
  height: number
  /** Hero (S02) é LCP — sem lazy, com fetchpriority alta. Todo o resto
      dessa página é lazy, ao contrário do ProjectImage legado que nunca
      variava (ver B0 §2 — CLS garantido nos outros cases). Imagens com
      priority não recebem reveal por scroll aqui (o hero anima no load,
      controlado direto na página — ver CaseSona.tsx). */
  priority?: boolean
  /** true = raio + sombra em CSS (card do sistema). false (default,
      rodada A5) = sem card, sem raio, sem sombra — os exports do Figma já
      trazem a composição final (e às vezes sombra própria embutida no
      asset); duplicar em CSS por cima criava um "card" visual indesejado.
      Todo uso atual da página passa false explicitamente; a opção fica
      disponível só para uma necessidade futura genuína de card. */
  frame?: boolean
  className?: string
}

const EASE = [0.16, 1, 0.3, 1] as const

// Substitui ProjectImage (legado, sem width/height/priority — CLS
// garantido) só dentro deste case. Reveal embutido — mesma receita do
// LiquidReveal (opacity+y, 600ms, once), pra toda imagem de conteúdo
// herdar o motion padrão sem precisar embrulhar cada uso manualmente.
export default function CaseImage({ src, alt, width, height, priority = false, frame = false, className = '' }: Props) {
  const shouldReduceMotion = useReducedMotion()
  const classes = `w-full h-auto ${frame ? 'rounded-[24px]' : ''} ${className}`
  const style = frame ? { boxShadow: '0 10px 28px rgba(12,26,34,0.14)' } : undefined

  const imgProps = {
    src: srcOtimizado(src),
    alt,
    width,
    height,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    // Minúsculo: React 18 não reconhece a prop camelCase e a repassa
    // como atributo custom em vez de fetchpriority real (warning no console).
    fetchpriority: priority ? ('high' as const) : undefined,
    decoding: priority ? ('sync' as const) : ('async' as const),
    className: classes,
    style,
  }

  // AVIF/WebP responsivos (scripts/otimizar-imagens.py). display:
  // contents deixa o layout igual ao de um <img> solto.
  const sizes = '(min-width: 1024px) 600px, 92vw'

  if (priority || shouldReduceMotion) {
    return (
      <picture style={{ display: 'contents' }}>
        <Fontes src={src} sizes={sizes} />
        <img {...imgProps} sizes={sizes} />
      </picture>
    )
  }

  return (
    <picture style={{ display: 'contents' }}>
      <Fontes src={src} sizes={sizes} />
      <motion.img
        {...imgProps}
        sizes={sizes}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 0.6, ease: EASE }}
      />
    </picture>
  )
}
