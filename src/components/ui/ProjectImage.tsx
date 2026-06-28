type Props = {
  src: string
  alt: string
  caption?: string
  size?: 'default' | 'wide'
}

export default function ProjectImage({ src, alt, caption, size = 'default' }: Props) {
  return (
    <figure className={`my-12 ${size === 'wide' ? 'max-w-5xl mx-auto' : ''}`}>
      <div className="rounded-card overflow-hidden border border-muted/15 shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full block"
        />
      </div>
      {caption && (
        <figcaption className="font-mono text-xs text-muted/70 mt-3 text-center tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
