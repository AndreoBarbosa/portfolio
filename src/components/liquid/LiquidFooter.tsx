import { Mail } from 'lucide-react'
import { LinkedInIcon } from '../icons/LinkedInIcon'
import { contact } from '../../data/home'

export default function LiquidFooter() {
  const year = new Date().getFullYear()
  const logoSrc = '/logo/svg/AB_Assinatura.svg'

  return (
    <footer className="border-t" style={{ borderColor: 'var(--surface-2)' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logoSrc} alt="Andreo Barbosa" className="h-4 w-auto" />
          <span className="h-3.5 w-px" style={{ background: 'var(--surface-2)' }} aria-hidden="true" />
          <p className="font-outfit text-xs" style={{ color: 'var(--text-faint)' }}>
            © {year} Andreo Barbosa
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="liquid-link inline-flex items-center justify-center w-6 h-6"
          >
            <LinkedInIcon />
          </a>
          <a
            href={`mailto:${contact.email}`}
            aria-label="E-mail"
            className="liquid-link inline-flex items-center justify-center w-6 h-6"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
