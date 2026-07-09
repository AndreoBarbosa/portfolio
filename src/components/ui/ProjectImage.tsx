type Props = {
  src: string
  alt: string
  caption?: string
  size?: 'default' | 'wide' | 'narrow'
  tone?: 'dark' | 'sona-light' | 'sona-dark' | 'gabriel-light' | 'gabriel-dark'
}

const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  default: '',
  wide: 'w-full',
  narrow: 'max-w-xs mx-auto',
}

const toneClasses: Record<NonNullable<Props['tone']>, { border: string; caption: string }> = {
  dark: { border: 'border-muted/15 shadow-[0_24px_64px_rgba(0,0,0,0.5)]', caption: 'text-muted/70' },
  'sona-light': { border: 'border-sona-navy/15 shadow-[0_16px_40px_rgba(12,26,34,0.12)]', caption: 'text-sona-navy' },
  'sona-dark': { border: 'border-sona-off/15 shadow-[0_24px_64px_rgba(0,0,0,0.35)]', caption: 'text-sona-off/80' },
  'gabriel-light': { border: 'border-gabriel-mossDark/15 shadow-[0_16px_40px_rgba(46,46,46,0.12)]', caption: 'text-gabriel-mossDark' },
  'gabriel-dark': { border: 'border-gabriel-offwhite/15 shadow-[0_24px_64px_rgba(0,0,0,0.35)]', caption: 'text-gabriel-offwhite/80' },
}

export default function ProjectImage({ src, alt, caption, size = 'default', tone = 'dark' }: Props) {
  const { border: borderClass, caption: captionClass } = toneClasses[tone]

  return (
    <figure className={`my-12 ${sizeClasses[size]}`}>
      <div className={`rounded-card overflow-hidden border ${borderClass}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full block"
        />
      </div>
      {caption && (
        <figcaption className={`font-mono text-xs mt-4 text-center tracking-wide ${captionClass}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
