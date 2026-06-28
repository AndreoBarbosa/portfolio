import SectionLabel from '../ui/SectionLabel'
import AnimateOnScroll from '../ui/AnimateOnScroll'

const timelineItems = [
  {
    year: '2024 →',
    role: 'Pós-graduação em UX Design',
    org: 'Beyond · PUCRS',
    description: null,
  },
  {
    year: '2021 →',
    role: 'Analista de Suporte de TI',
    org: 'Hospital Regional Zilda Arns',
    description:
      'Ambiente com 1400+ colaboradores e ~700 usuários ativos/dia. Apoio na implantação dos sistemas hospitalares MV e SoulMV; suporte a sistemas críticos de equipes médicas e administrativas.',
  },
  {
    year: '2019 →',
    role: 'Licenciatura em Computação',
    org: 'IFRJ — Campus Pinheiral',
    description: 'TCC em IHC no contexto hospitalar — aprovado com louvor.',
  },
]

const certifications = [
  { label: 'Google UX Certificate', source: 'Coursera' },
  { label: 'Excel & Power BI', source: 'Klabin' },
  { label: 'Python', source: 'Fundação Bradesco' },
  { label: 'Python', source: 'DIO — em andamento' },
]

export default function Timeline() {
  return (
    <section id="trajetoria" className="py-24 lg:py-32 border-t border-cream/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionLabel index="/03" label="Trajetória" />
        </AnimateOnScroll>

        {/* Timeline */}
        <div className="relative max-w-2xl">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-0 w-px bg-cream/10" aria-hidden="true" />

          <div className="space-y-10 pl-8">
            {timelineItems.map((item, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div className="relative">
                  {/* Amber dot */}
                  <div
                    className="absolute -left-[2.15rem] top-1.5 w-2 h-2 rounded-full bg-amber border-2 border-ink"
                    aria-hidden="true"
                  />

                  <span className="font-mono text-xs text-amber tracking-wider">
                    {item.year}
                  </span>
                  <h3 className="font-satoshi font-semibold text-cream text-lg mt-0.5 mb-0.5" style={{ letterSpacing: '-0.01em' }}>
                    {item.role}
                  </h3>
                  <p className="font-mono text-xs text-muted mb-2 tracking-wide">
                    {item.org}
                  </p>
                  {item.description && (
                    <p className="text-sm text-muted/80 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <AnimateOnScroll delay={0.3}>
          <div className="mt-16 pt-10 border-t border-cream/5">
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-5">
              Certificações
            </p>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={`${cert.label}-${cert.source}`}
                  className="inline-flex items-center gap-1.5 font-body text-sm text-cream/60 border border-cream/10 px-3 py-1.5 rounded-sm"
                >
                  {cert.label}
                  <span className="text-muted/50 text-xs">· {cert.source}</span>
                </span>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
