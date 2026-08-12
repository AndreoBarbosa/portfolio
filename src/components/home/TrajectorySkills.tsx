import { Fragment } from 'react'
import { FileText, Headphones, Monitor, GraduationCap, User, Figma, PenTool, BarChart3, Award } from 'lucide-react'
import LiquidReveal from '../liquid/LiquidReveal'
import LiquidSectionHeading from '../liquid/LiquidSectionHeading'
import { timeline, trajectoryStats, education, certifications } from '../../data/home'

const timelineIcons = {
  faturamento: FileText,
  suporte: Headphones,
  graduacao: Monitor,
  pos: GraduationCap,
  hoje: User,
}

const certIcons = {
  figma: Figma,
  ux: PenTool,
  data: BarChart3,
  award: Award,
}

const educationIcons = [GraduationCap, Monitor]

function TimelineItem({ item, isLast }: { item: (typeof timeline)[number]; isLast: boolean }) {
  const Icon = timelineIcons[item.icon]
  return (
    <div className={`liquid-timeline-item ${item.icon === 'hoje' ? 'is-current' : ''}`}>
      {!isLast && <div className="liquid-timeline-track" aria-hidden="true" />}
      <div className="liquid-timeline-icon">
        <Icon size={24} strokeWidth={1.75} />
      </div>
      {/* Marcador tem a MESMA largura do ícone acima e centraliza o dot
          nele via flex — garante o mesmo eixo vertical/horizontal do
          ícone independente de qualquer arredondamento de layout. */}
      <div className="liquid-timeline-marker" aria-hidden="true">
        <div className="liquid-timeline-dot" />
      </div>
      <p className="liquid-timeline-year mt-6">{item.year}</p>
      <p className="liquid-timeline-role mt-2">{item.role}</p>
      <p className="liquid-timeline-desc mt-4 max-w-[220px]">{item.description}</p>
    </div>
  )
}

export default function TrajectorySkills() {
  return (
    <section id="trajetoria" className="py-20 md:py-32 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8 liquid-trajectory-content">
        {/* Fundo de vidro (node 133:276 do Figma) — cobre da metade do
            cabeçalho até além da linha de Cursos & Certificações
            (mesmo enquadramento do Figma: começa ANTES da timeline,
            termina DEPOIS dos cards), não apenas a zona da timeline. */}
        <div className="liquid-trajectory-bg" aria-hidden="true">
          <img src="/fundo-trajetoria.webp" alt="" loading="lazy" decoding="async" />
        </div>

        <LiquidReveal blur>
          <LiquidSectionHeading id="trajetoria-title" number="/02" label="Minha trajetória" />
          <h2 className="liquid-type-section-title text-balance mt-6 max-w-[560px]" style={{ color: '#0C1A22' }}>
            Da tecnologia ao Product Design
          </h2>
          {/* D9 (correção 02): gap-[16px] confirmado via MCP (nó 133:283) — era mt-6 (24px). */}
          <p className="liquid-type-body mt-4 max-w-[358px]" style={{ color: 'var(--text-muted)' }}>
            Cinco anos em sistemas críticos me ensinaram que bons produtos reduzem esforço, não erros.
          </p>
        </LiquidReveal>

        {/* Stats-âncora — números grandes com divisor central. Sem blur
            (I4, correção 12): é um bloco largo, não um título pequeno —
            opacity+y bastam pra entrada. */}
        <LiquidReveal className="mt-16">
          <div className="liquid-trajectory-stats">
            {trajectoryStats.map((stat, i) => (
              <Fragment key={stat.value}>
                <div className="liquid-trajectory-stat">
                  <span className="liquid-type-stat liquid-trajectory-stat-value">{stat.value}</span>
                  <span className="flex flex-col liquid-trajectory-stat-desc">
                    <span className="liquid-trajectory-stat-unit">{stat.unit}</span>
                    <span className="liquid-trajectory-stat-label">{stat.label}</span>
                  </span>
                </div>
                {i < trajectoryStats.length - 1 && <div className="liquid-trajectory-divider" />}
              </Fragment>
            ))}
          </div>
        </LiquidReveal>

        {/* Zona sobre a imagem de vidro de fundo — é aqui que a
            legibilidade quebra sem o tint+dessaturação, por isso
            timeline-panel/education-card usam esse tratamento em vez do
            glass claro padrão (Brief MESTRE §4). */}
        {/* D9 (correção 02): gap-[193px] confirmado via MCP (nó 133:277,
            raiz — entre o bloco de cabeçalho+stats e a zona da timeline)
            — era mt-16/mt-20 (64/80px), bem mais comprimido que o
            Figma. Mantido um valor menor no mobile (não é o alvo do
            Figma, que é desktop-only) e o real a partir de lg. */}
        <div className="liquid-trajectory-glass-zone mt-16 lg:mt-[193px]">
          {/* Linha do tempo horizontal (texto real, node 64:526). */}
          <LiquidReveal stagger>
            <div className="liquid-timeline-panel">
              <div className="liquid-timeline-row">
                {timeline.map((item, i) => (
                  <TimelineItem key={item.year + item.role} item={item} isLast={i === timeline.length - 1} />
                ))}
              </div>
            </div>
          </LiquidReveal>

          {/* Formação — 2 cards lado a lado. */}
          <LiquidReveal delay={0.1} className="mt-16">
            <p className="liquid-type-body-sm font-semibold mb-4" style={{ color: '#0C1A22' }}>
              Formação
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {education.map((item, i) => {
                const Icon = educationIcons[i]
                return (
                  <div key={item.role} className="liquid-education-card">
                    <div className="liquid-education-icon">
                      <Icon size={46} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="liquid-type-body-sm" style={{ color: '#0C1A22' }}>
                        {item.category}
                      </p>
                      <p className="liquid-cert-title mt-2">
                        {item.role}
                      </p>
                      <p className="liquid-type-body-sm mt-2" style={{ color: '#0C1A22' }}>{item.org}</p>
                      {item.description && (
                        <p className="text-xs mt-2 max-w-[42ch]" style={{ color: 'var(--text-faint)' }}>
                          {item.description}
                        </p>
                      )}
                      <span className="liquid-education-pill">{item.year}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </LiquidReveal>

          {/* Cursos & Certificações — mesmo sistema de card da Formação
              (glass translúcido/borda/radius/sombra idênticos, ver
              .liquid-cert-item em liquid-glass.css), não mais uma lista
              com divisores. */}
          <LiquidReveal delay={0.15} className="mt-16">
            <p className="liquid-type-body-sm font-semibold mb-4" style={{ color: '#0C1A22' }}>
              Cursos &amp; Certificações
            </p>
            <div className="liquid-cert-row">
              {certifications.map((cert) => {
                const Icon = certIcons[cert.icon]
                return (
                  <div key={cert.label} className="liquid-cert-item">
                    <div className="liquid-cert-icon">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <div className="liquid-cert-text">
                      <p className="liquid-cert-title">
                        {cert.shortLabel}
                      </p>
                      <p className="liquid-cert-source">{cert.source}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </LiquidReveal>
        </div>
      </div>
    </section>
  )
}
