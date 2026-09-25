import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import Tag from '../ui/Tag'
import AnimateOnScroll from '../ui/AnimateOnScroll'

const projects = [
  {
    id: 'gabriel-alves',
    index: '/01',
    title: 'Landing page para psicólogo clínico',
    description:
      'Landing page que transforma a primeira impressão digital em acolhimento e converte visitantes em pacientes.',
    tags: ['UX/UI', 'Pesquisa', 'Front-end', 'Deploy'],
    caseRoute: '/case/gabriel',
  },
]

function CardPattern({ id }: { id: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`dots-${id}`}
          x="0" y="0" width="28" height="28"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.5" cy="1.5" r="1.2" fill="rgba(154,147,132,0.18)" />
        </pattern>
      </defs>

      {/* Grid de pontos */}
      <rect width="100%" height="100%" fill={`url(#dots-${id})`} />

      {/* Arcos concêntricos — canto superior direito */}
      <circle cx="100%" cy="0" r="90"  fill="none" stroke="rgba(200,169,110,0.14)" strokeWidth="1" />
      <circle cx="100%" cy="0" r="170" fill="none" stroke="rgba(200,169,110,0.08)" strokeWidth="1" />
      <circle cx="100%" cy="0" r="250" fill="none" stroke="rgba(154,147,132,0.06)" strokeWidth="1" />
      <circle cx="100%" cy="0" r="330" fill="none" stroke="rgba(154,147,132,0.04)" strokeWidth="1" />

      {/* Linha diagonal sutil */}
      <line
        x1="0%" y1="105%"
        x2="60%" y2="0%"
        stroke="rgba(200,169,110,0.07)" strokeWidth="0.75"
      />
    </svg>
  )
}

export default function Projects() {
  return (
    <section id="projetos" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionLabel index="/01" label="Projetos" />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <AnimateOnScroll key={project.id} delay={i * 0.1}>
              <Link to={project.caseRoute} className="block group">
                <motion.article
                  className="relative glass rounded-card overflow-hidden hover:border-amber/30 transition-colors duration-300"
                  whileHover={{ y: -6, boxShadow: '0 24px 64px rgba(0,0,0,0.55)' }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {/* Capa — padrão geométrico */}
                  <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-[#1E1B16] to-[#13110E]">

                    {/* Padrão SVG — fica mais visível no hover */}
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CardPattern id={project.id} />
                    </motion.div>

                    {/* Número do case — marca d'água */}
                    <span
                      className="absolute inset-0 flex items-center justify-center font-satoshi font-semibold select-none pointer-events-none"
                      style={{
                        fontSize: 'clamp(5rem, 16vw, 10rem)',
                        lineHeight: 1,
                        color: 'rgba(245,240,232,0.04)',
                        letterSpacing: '-0.04em',
                      }}
                      aria-hidden="true"
                    >
                      {project.index}
                    </span>

                    {/* Borda inferior âmbar — sempre visível */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/30 to-transparent" />
                    {/* Borda superior âmbar — aparece no hover */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Acento geométrico — canto sup. esq. */}
                    <motion.div
                      className="absolute top-5 left-5 w-6 h-6 border border-amber/25 rounded-sm"
                      whileHover={{ rotate: 45, borderColor: 'rgba(200,169,110,0.5)' }}
                      transition={{ duration: 0.35 }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="p-5 lg:p-6">
                    {/* Índice + tags */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="font-mono text-xs text-amber tracking-wider">{project.index}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    </div>

                    <h3
                      className="font-satoshi font-semibold text-cream text-lg lg:text-xl mb-2"
                      style={{ letterSpacing: '-0.01em' }}
                    >
                      {project.title}
                    </h3>

                    <p className="text-muted text-sm leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* CTA */}
                    <div className="inline-flex items-center gap-1.5 font-mono text-xs text-amber font-medium">
                      Ver case completo
                      <ArrowUpRight
                        size={12}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </motion.article>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
