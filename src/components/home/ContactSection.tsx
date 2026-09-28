import { Download } from 'lucide-react'
import { LinkedInIcon } from '../icons/LinkedInIcon'
import LiquidReveal from '../liquid/LiquidReveal'
import LiquidSectionHeading from '../liquid/LiquidSectionHeading'
import { contact } from '../../data/home'
import Picture from '../ui/Picture'

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
          <p className="liquid-type-body mt-4 max-w-[42ch]" style={{ color: 'var(--text-muted)' }}>
            Se você acredita que bons produtos nascem de boas perguntas, temos muito para conversar.
          </p>

          {/* I2 (correção 12): círculos só com ícone trocados por botões
              com rótulo — mais destaque e clareza no fecho da página,
              divergência do Figma (40×40 só ícone) por decisão do
              Andreo. Empilhados em largura total no mobile, lado a lado
              a partir do sm, mesmo padrão responsivo dos botões do
              hero (LiquidHero.tsx). */}
          <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-hero-btn-primary liquid-contact-btn inline-flex items-center justify-center w-full sm:w-auto"
            >
              <LinkedInIcon />
              LinkedIn
            </a>

            <a
              href={contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-btn-secondary liquid-contact-btn inline-flex items-center justify-center w-full sm:w-auto"
            >
              <Download size={20} />
              Baixar currículo
            </a>
          </div>
        </LiquidReveal>
      </div>

      <div className="liquid-contact-wave-wrap" aria-hidden="true">
        <Picture src="/onda-faixa-horizontal.webp" sizes="(min-width: 768px) 145vw, 185vw" alt="" className="liquid-contact-wave" loading="lazy" decoding="async" />
      </div>
    </section>
  )
}
