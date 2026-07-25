import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  src: string
  alt: string
  caption?: string
  size?: 'default' | 'wide' | 'narrow'
  tone?: 'dark' | 'gabriel-light' | 'gabriel-dark'
}

const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  default: '',
  wide: 'w-full',
  narrow: 'max-w-xs mx-auto',
}

const toneClasses: Record<NonNullable<Props['tone']>, { border: string; caption: string }> = {
  dark: { border: 'border-muted/15 shadow-[0_24px_64px_rgba(0,0,0,0.5)]', caption: 'text-muted' },
  'gabriel-light': { border: 'border-gabriel-mossDark/15 shadow-[0_16px_40px_rgba(46,46,46,0.12)]', caption: 'text-gabriel-mossDark' },
  'gabriel-dark': { border: 'border-gabriel-offwhite/15 shadow-[0_24px_64px_rgba(0,0,0,0.35)]', caption: 'text-gabriel-offwhite/80' },
}

export default function ProjectImage({ src, alt, caption, size = 'default', tone = 'dark' }: Props) {
  const { border: borderClass, caption: captionClass } = toneClasses[tone]
  const shouldReduce = useReducedMotion()

  return (
    <figure className={`my-12 ${sizeClasses[size]}`}>
      <div className={`rounded-card overflow-hidden border ${borderClass}`}>
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full block"
          initial={shouldReduce ? undefined : { opacity: 0, scale: 1.02 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      {caption && (
        <figcaption className={`font-mono text-sm mt-4 text-center tracking-wide ${captionClass}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
