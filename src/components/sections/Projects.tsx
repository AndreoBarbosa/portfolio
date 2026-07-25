import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import Container from '../ui/Container'
import SectionLabel from '../ui/SectionLabel'

type Project = {
  id: string
  index: string
  category: string
  context: string
  badge?: string
  tese: string
  title: string
  caseRoute: string
}

const projects: Project[] = [
  {
    id: 'sona',
    index: '/01',
    category: 'DISCOVERY · PRODUCT STRATEGY · DESIGN SYSTEM',
    context: 'CASE CONCEITUAL · FINTECH',
    tese: 'O problema não era organizar dinheiro. Era decidir o que fazer com ele.',
    title: 'Sona — plataforma de clareza financeira',
    caseRoute: '/case/sona',
  },
  {
    id: 'sysmed',
    index: '/02',
    category: 'UX RESEARCH · IA APLICADA · HEALTHTECH',
    context: 'PESQUISA APLICADA · IA',
    badge: 'NOVO',
    tese: 'O problema não era identificar falhas. Era entender o contexto delas.',
    title: 'Onde a IA erra ao avaliar um sistema hospitalar',
    caseRoute: '/case/ia-hospitalar',
  },
  {
    id: 'gabriel-alves',
    index: '/03',
    category: 'PRODUCT THINKING · CONVERSÃO · UX WRITING',
    context: 'LANDING PAGE · SAÚDE',
    tese: 'O problema não era a interface. Era a confiança.',
    title: 'Landing page para psicólogo clínico',
    caseRoute: '/case/gabriel',
  },
]

function CardPattern({ id }: { id: string }) {
  return (
    <svg
      viewBox="0 0 460 440"
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={`cardgrid-${id}`}
          width="24" height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.5" cy="1.5" r="1" fill="#D99A4E" opacity="0.12" />
        </pattern>
      </defs>

      {/* Dot grid */}
      <rect width="460" height="440" fill={`url(#cardgrid-${id})`} />

      {/* Arcos concêntricos — canto superior direito */}
      <circle cx="370" cy="120" r="120" fill="none" stroke="#D99A4E" strokeWidth="0.5" opacity="0.18" />
      <circle cx="370" cy="120" r="80"  fill="none" stroke="#D99A4E" strokeWidth="0.5" opacity="0.22" />
      <circle cx="370" cy="120" r="40"  fill="none" stroke="#9A9384" strokeWidth="0.5" opacity="0.25" />

      {/* Linha diagonal */}
      <line x1="0" y1="60" x2="460" y2="300" stroke="#D99A4E" strokeWidth="0.5" opacity="0.10" />

      {/* Losango */}
      <rect
        x="340" y="90" width="60" height="60"
        fill="none" stroke="#9A9384" strokeWidth="0.5" opacity="0.20"
        transform="rotate(45 370 120)"
      />
    </svg>
  )
}

export default function Projects() {
  return (
    <section id="projetos" className="section-shell">
      <Container>
        <AnimateOnScroll>
          <SectionLabel index="/01" label="Projetos" />
        </AnimateOnScroll>

        {/* Grade de 2 colunas — com 3 projetos, o 3º fica sozinho na 2ª linha (assimetria intencional) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <AnimateOnScroll key={project.id} delay={i * 0.1} className="h-full">
              <Link to={project.caseRoute} className="block h-full group">
                <motion.article
                  className="relative glass-card rounded-card border overflow-hidden flex flex-col h-full min-h-[440px]"
                  animate={{ borderColor: 'rgba(242,237,227,0.12)' }}
                  whileHover={{
                    y: -4,
                    boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
                    borderColor: 'rgba(200,169,110,0.30)',
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {/* Padrão geométrico — fundo absoluto */}
                  <div className="absolute inset-0 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <CardPattern id={project.id} />
                  </div>

                  {/* Conteúdo — relativo, por cima do padrão */}
                  <div className="relative flex flex-col flex-1 p-8">

                    {/* ── Topo: rótulo duplo ── */}
                    <div className="pr-[72px]">
                      {/* Linha 1: índice + categoria */}
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-xs text-amber tracking-wider">
                          {project.index}
                        </span>
                        <span className="w-px h-3 bg-cream/20" aria-hidden="true" />
                        <span className="font-mono text-xs text-cream/90 tracking-widest uppercase">
                          {project.category}
                        </span>
                      </div>
                      {/* Linha 2: contexto */}
                      <p className="font-mono text-[10px] text-muted/60 tracking-widest uppercase">
                        {project.context}
                      </p>
                    </div>

                    {/* Badge — posição absoluta, não empurra o layout */}
                    {project.badge && (
                      <span className="absolute top-4 right-4 font-mono text-[10px] tracking-widest uppercase bg-amber text-ink px-2.5 py-1 rounded-chip">
                        {project.badge}
                      </span>
                    )}

                    {/* ── Conteúdo: tese (hero do card), título, divisor e CTA — ancorado ao rodapé ──
                        Tese abre o card — mesma estrutura nos três projetos, o que transforma
                        padrão de escrita em assinatura. Título vem depois, menor. */}
                    <div className="mt-auto flex flex-col gap-3">
                      <p
                        className="font-satoshi font-medium text-cream text-lg lg:text-xl leading-[1.3] max-w-sm"
                        style={{ letterSpacing: '-0.01em' }}
                      >
                        {project.tese}
                      </p>

                      <h3 className="font-satoshi font-medium text-muted text-sm leading-[1.4] max-w-[22ch]">
                        {project.title}
                      </h3>

                      <div className="mt-6 mb-4 border-t border-muted/15" aria-hidden="true" />

                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-amber tracking-widest uppercase">
                          Ver case completo
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="text-amber/50 group-hover:text-amber group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                        />
                      </div>
                    </div>

                  </div>
                </motion.article>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
