import Container from '../ui/Container'
import { FilledLinkedInIcon } from '../ui/SocialIcons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-cream/5 py-8">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo + copyright */}
        <div className="flex items-center gap-3">
          <span
            className="font-satoshi font-semibold text-cream/90 text-sm"
            style={{ letterSpacing: '-0.02em' }}
          >
            AB
          </span>
          <span className="h-3.5 w-px bg-cream/10" aria-hidden="true" />
          <p className="font-mono text-xs text-muted tracking-wide">
            © {year} Andreo Barbosa
          </p>
        </div>

        {/* Links sociais */}
        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/andreo-barbosa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted/60 hover:text-amber transition-colors duration-200"
          >
            <FilledLinkedInIcon size={15} />
          </a>
        </div>
      </Container>
    </footer>
  )
}
