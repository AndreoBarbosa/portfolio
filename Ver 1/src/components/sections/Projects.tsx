import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import Tag from '../ui/Tag'
import AnimateOnScroll from '../ui/AnimateOnScroll'

const projects = [
  {
    id: 'gabriel-alves',
    title: 'Landing page para psicólogo clínico',
    description:
      'Landing page que transforma a primeira impressão digital em acolhimento e converte visitantes em pacientes.',
    image: '/projects/gabriel/desktop-hero.png',
    tags: ['UX/UI', 'Pesquisa', 'Front-end', 'Deploy'],
    caseRoute: '/case/gabriel',
    liveUrl: 'https://psicologogabrielalves.com.br',
  },
]

export default function Projects() {
  return (
    <section id="projetos" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionLabel index="/01" label="Projetos" />
        </AnimateOnScroll>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <AnimateOnScroll key={project.id} delay={i * 0.1}>
              <motion.article
                className="group relative bg-cream/[0.03] border border-cream/10 rounded-lg overflow-hidden hover:border-amber/20 transition-all duration-300 hover:bg-cream/[0.05]"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {/* Project image */}
                <div className="aspect-[16/7] overflow-hidden bg-ink">
                  <img
                    src={project.image}
                    alt={`Mockup do projeto: ${project.title}`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>

                  <h3 className="font-satoshi font-semibold text-cream text-xl lg:text-2xl mb-3 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
                    {project.title}
                  </h3>

                  <p className="text-muted text-sm leading-relaxed max-w-2xl mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      to={project.caseRoute}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-amber hover:text-amber/70 transition-colors duration-200"
                    >
                      Ver case completo
                      <ArrowUpRight size={12} />
                    </Link>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-cream transition-colors duration-200"
                    >
                      Ver site ao vivo
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* Amber accent — top edge on hover */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
