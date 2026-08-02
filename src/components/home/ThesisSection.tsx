import ScrollAccent from '../liquid/ScrollAccent'
import LiquidReveal from '../liquid/LiquidReveal'
import { manifesto, pillars, type Pillar } from '../../data/home'

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
            do frame), depois fileira 02+04. Mesma ordem no mobile (01,03,
            onda,02,04), sem nenhum truque de order/display:contents. */}
        <div className="liquid-thesis-grid mt-16 md:mt-24">
          <div className="liquid-thesis-row liquid-thesis-row-top">
            <LiquidReveal blur delay={0}>
              <ThesisCard pillar={p1} />
            </LiquidReveal>
            <LiquidReveal blur delay={0.12}>
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
              <img src="/onda-faixa-horizontal.png" alt="" />
            </div>
          </div>

          <div className="liquid-thesis-row liquid-thesis-row-bottom">
            <LiquidReveal blur delay={0.24}>
              <ThesisCard pillar={p2} />
            </LiquidReveal>
            <LiquidReveal blur delay={0.36}>
              <ThesisCard pillar={p4} />
            </LiquidReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
