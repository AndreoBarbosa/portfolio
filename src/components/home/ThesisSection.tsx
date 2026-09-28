import ScrollAccent from '../liquid/ScrollAccent'
import LiquidReveal from '../liquid/LiquidReveal'
import { manifesto, pillars, type Pillar } from '../../data/home'
import Picture from '../ui/Picture'

function ThesisCard({ pillar }: { pillar: Pillar }) {
  return (
    <div className="liquid-thesis-card">
      <ScrollAccent
        className="liquid-thesis-number block font-hanken font-semibold"
        restColor="#2C2C2A"
        accentColor="#0C1A22"
      >
        {pillar.index}
      </ScrollAccent>
      <div className="liquid-thesis-text">
        <h3 className="liquid-thesis-title font-hanken font-semibold">{pillar.title}</h3>
        <p className="liquid-thesis-desc">{pillar.body}</p>
      </div>
    </div>
  )
}

export default function ThesisSection() {
  const [p1, p2, p3, p4] = pillars

  return (
    <section id="pensar" className="py-20 md:py-32 overflow-hidden" style={{ background: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <LiquidReveal>
          <p className="liquid-type-manifesto text-balance" style={{ color: '#0C1A22' }}>
            {manifesto.lead} <strong>{manifesto.strong}</strong>
          </p>
        </LiquidReveal>

        {/* Node 235:299 (Figma, reconferido): 3 FAIXAS empilhadas, sem
            sobreposição — fileira 01+03, depois a onda (full-bleed, largura
            do frame), depois fileira 02+04. No mobile a ordem de leitura é
            corrigida via CSS (display:contents + order) pra 01,02,onda,03,04
            — ver .liquid-thesis-row-top/-bottom em liquid-glass.css. */}
        <div className="liquid-thesis-grid mt-16 md:mt-24">
          <div className="liquid-thesis-row liquid-thesis-row-top">
            {/* I4 (correção 12): blur tirado dos cards — filter animado é
                caro (repaint de GPU a cada frame) e a orientação do
                briefing é reservar blur pra títulos/elementos pequenos,
                não pra cards de grid. opacity+y (sem blur) continuam
                baratos e preservam a entrada. */}
            <LiquidReveal delay={0}>
              <ThesisCard pillar={p1} />
            </LiquidReveal>
            <LiquidReveal delay={0.12}>
              <ThesisCard pillar={p3} />
            </LiquidReveal>
          </div>

          {/* Fundo da SEÇÃO, não conteúdo do container — mesma arquitetura
              da Trajetória (.liquid-trajectory-glass-zone/-bg): a zona
              reserva o espaço vertical entre as fileiras, e a imagem
              (position:absolute, width:100vw, sem max-width) ultrapassa
              a grid de 1440 e continua crescendo com a viewport. */}
          <div className="liquid-thesis-bg-zone" aria-hidden="true">
            <div className="liquid-thesis-bg">
              <Picture src="/onda-faixa-horizontal.webp" sizes="(min-width: 768px) 120vw, 116vw" alt="" loading="lazy" decoding="async" />
            </div>
          </div>

          <div className="liquid-thesis-row liquid-thesis-row-bottom">
            <LiquidReveal delay={0.24}>
              <ThesisCard pillar={p2} />
            </LiquidReveal>
            <LiquidReveal delay={0.36}>
              <ThesisCard pillar={p4} />
            </LiquidReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
