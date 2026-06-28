import { Mail, Linkedin } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-cream/5 py-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted tracking-wide">
          © {year} Andreo Barbosa
        </p>

        <div className="flex items-center gap-4">
          <a
            href="mailto:andreosnsd@gmail.com"
            aria-label="E-mail"
            className="text-muted hover:text-amber transition-colors duration-200"
          >
            <Mail size={16} />
          </a>
          <a
            href="https://linkedin.com/in/andreo-barbosa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-amber transition-colors duration-200"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
