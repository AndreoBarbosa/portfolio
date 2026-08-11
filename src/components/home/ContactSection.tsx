import { Download } from 'lucide-react'
import { LinkedInIcon } from '../icons/LinkedInIcon'
import LiquidReveal from '../liquid/LiquidReveal'
import LiquidSectionHeading from '../liquid/LiquidSectionHeading'
import { contact } from '../../data/home'

export default function ContactSection() {
  return (
    <section id="contato" className="overflow-hidden" style={{ background: '#F7F7F7' }}>
      {/* D9 (correção 02): py-[112px] confirmado via MCP (nó 133:229) —
          era só pt-20/32 (80/128px), sem padding-bottom explícito. */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-20 md:pt-28 pb-20 md:pb-28">
        <LiquidReveal blur>
          <LiquidSectionHeading id="contato-title" number="/04" label="Contato" />
        </LiquidReveal>

        {/* D9: gap-[32px] confirmado via MCP (nó 133:230) — era mt-10 (40px). */}
        <LiquidReveal blur delay={0.1} className="mt-8">
          <h2 className="liquid-type-display-lg text-balance" style={{ color: '#0C1A22' }}>
            Vamos conversar?
          </h2>
          {/* D9: gap-[16px] confirmado via MCP (nó 133:235) — era mt-6 (24px). */}
          <p className="liquid-type-body mt-4 max-w-[42ch]" style={{ color: '#5F5E5A' }}>
            Se você acredita que bons produtos nascem de boas perguntas, temos muito para conversar.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Andreo Barbosa"
              className="liquid-btn-secondary inline-flex items-center justify-center w-11 h-11 rounded-full"
            >
              <LinkedInIcon />
            </a>

            <a
              href={contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Baixar currículo de Andreo Barbosa"
              className="liquid-btn-secondary inline-flex items-center justify-center w-11 h-11 rounded-full"
            >
              <Download size={16} />
            </a>
          </div>
        </LiquidReveal>
      </div>

      <div className="liquid-contact-wave-wrap" aria-hidden="true">
        <img src="/onda-faixa-horizontal.png" alt="" className="liquid-contact-wave" loading="lazy" />
      </div>
    </section>
  )
}
