import { GraduationCap, Briefcase, Award } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import Container from '../ui/Container'

const education = [
  {
    year: 'Concluída em 2026',
    role: 'Pós-graduação em User Experience Design and Beyond',
    org: 'PUCRS',
    description: null,
  },
  {
    year: '2018 – 2024',
    role: 'Licenciatura em Computação',
    org: 'IFRJ, Campus Pinheiral',
    description: 'TCC: Pesquisa de UX em Ambiente Hospitalar (IHC), aprovado com louvor.',
  },
]

const certifications = [
  { label: 'Curso de Figma', source: 'Intuitive Start', date: 'mai 2026' },
  { label: 'UX Design: entenda a área da User Experience', source: 'Alura', date: 'out 2025' },
  { label: 'Introdução ao Excel e Power BI Dashboards com a Klabin', source: 'DIO', date: 'set 2025' },
  { label: 'Conceitos básicos do Design de Experiência do Usuário (UX)', source: 'Google', date: 'dez 2024' },
]

const experience = [
  {
    year: '2021 – Atual',
    role: 'Analista de Suporte de TI',
    org: 'Hospital Regional Zilda Arns',
    bullets: [
      'Mais de 800 colaboradores · ~700 usuários ativos/dia · ambiente crítico',
      '20.000+ chamados atendidos (~650/mês); suporte N1/N2 a sistemas hospitalares',
      'Implantação dos sistemas MV e SoulMV; Active Directory, M365, GLPI',
      'Mapeamento de padrões de fricção e usabilidade em sistemas críticos',
    ],
  },
  {
    year: '2020 – 2021',
    role: 'Auxiliar de Faturamento',
    org: 'Hospital Municipal Dr. Munir Rafful',
    bullets: [
      'Fluxo completo de prontuários e conformidade documental, zero falhas no período',
      'Visão de processos ponta a ponta e onde os fluxos travam',
    ],
  },
]

type TimelineColumnProps = {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
}

function BlockHeader({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      <span className="text-amber/50 shrink-0" aria-hidden="true">{icon}</span>
      <span className="font-mono text-xs text-muted tracking-widest uppercase">{label}</span>
      <div className="h-px flex-1 bg-cream/5" aria-hidden="true" />
    </div>
  )
}

function TimelineColumn({ label, icon, children }: TimelineColumnProps) {
  return (
    <div>
      <BlockHeader label={label} icon={icon} />

      {/* Itens com linha vertical */}
      <div className="relative">
        <div className="absolute left-0 top-2 bottom-0 w-px bg-cream/10" aria-hidden="true" />
        <div className="space-y-8 pl-7">
          {children}
        </div>
      </div>
    </div>
  )
}

type TimelineItemProps = {
  year: string
  role: string
  org: string
  description?: string | null
  bullets?: string[]
}

function TimelineItem({ year, role, org, description, bullets }: TimelineItemProps) {
  return (
    <div className="relative">
      {/* Ponto âmbar */}
      <div
        className="absolute -left-[1.9rem] top-[0.35rem] w-2 h-2 rounded-full bg-amber border-2 border-ink"
        aria-hidden="true"
      />

      <span className="font-mono text-xs text-amber tracking-wider">{year}</span>
      <h3
        className="font-satoshi font-semibold text-cream text-base mt-0.5 mb-1"
        style={{ letterSpacing: '-0.01em' }}
      >
        {role}
      </h3>
      <p className="font-mono text-xs text-muted tracking-wide mb-2">{org}</p>

      {description && (
        <p className="text-sm text-muted leading-[1.5]">{description}</p>
      )}

      {bullets && bullets.length > 0 && (
        <ul className="space-y-1.5 mt-1">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-sm text-muted leading-[1.5]">
              <span className="text-amber/40 font-mono shrink-0 mt-[2px]" aria-hidden="true">—</span>
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Timeline() {
  return (
    <section id="trajetoria" className="section-shell border-t border-cream/5">
      <Container>
        <AnimateOnScroll>
          <SectionLabel index="/04" label="Trajetória" />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Coluna esquerda — Formação acadêmica + Certificações (blocos irmãos) */}
          <AnimateOnScroll>
            <TimelineColumn
              label="Formação acadêmica"
              icon={<GraduationCap size={13} />}
            >
              {education.map((item) => (
                <TimelineItem
                  key={item.role}
                  year={item.year}
                  role={item.role}
                  org={item.org}
                  description={item.description}
                />
              ))}
            </TimelineColumn>

            {/* Bloco irmão, não continuação da lista acima — mesmo tratamento de cabeçalho */}
            <div className="mt-12">
              <BlockHeader label="Certificações" icon={<Award size={13} />} />
              <div className="flex flex-col">
                {certifications.map((cert, i) => (
                  <div
                    key={`${cert.label}-${cert.source}`}
                    className={`flex flex-wrap items-baseline gap-2 py-4 ${
                      i < certifications.length - 1 ? 'border-b border-muted/[0.12]' : ''
                    }`}
                  >
                    <span className="font-body text-base leading-[1.4] text-cream">
                      {cert.label}
                    </span>
                    <span className="font-mono text-xs tracking-[0.06em] text-muted whitespace-nowrap">
                      · {cert.source} · {cert.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Coluna direita — Experiência profissional */}
          <AnimateOnScroll delay={0.12}>
            <TimelineColumn
              label="Experiência profissional"
              icon={<Briefcase size={13} />}
            >
              {experience.map((item) => (
                <TimelineItem
                  key={item.role}
                  year={item.year}
                  role={item.role}
                  org={item.org}
                  bullets={item.bullets}
                />
              ))}
            </TimelineColumn>
          </AnimateOnScroll>

        </div>
      </Container>
    </section>
  )
}
