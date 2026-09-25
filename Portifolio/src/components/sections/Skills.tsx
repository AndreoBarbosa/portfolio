import { Search, Layers, GitBranch, Wrench, Code2, Sparkles, type LucideIcon } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import AnimateOnScroll from '../ui/AnimateOnScroll'

type SkillGroup = {
  category: string
  icon: LucideIcon
  skills: string[]
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Pesquisa & Estratégia',
    icon: Search,
    skills: ['User Journey Mapping', 'Personas', 'Arquitetura da Informação'],
  },
  {
    category: 'UX/UI Design',
    icon: Layers,
    skills: ['Wireframes', 'Prototipação', 'Design de Interfaces', 'UI Design'],
  },
  {
    category: 'Métodos',
    icon: GitBranch,
    skills: ['Testes de Usabilidade', 'Design Thinking', 'Design Centrado no Usuário'],
  },
  {
    category: 'Ferramentas',
    icon: Wrench,
    skills: ['Figma', 'FigJam', 'Miro'],
  },
  {
    category: 'Dev',
    icon: Code2,
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Deploy (cPanel)', 'Git'],
  },
  {
    category: 'Extras',
    icon: Sparkles,
    skills: ['Geração de imagem por IA', 'Excel / Power BI', 'Python (básico)'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 lg:py-32 border-t border-cream/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionLabel index="/02" label="Skills" />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {skillGroups.map((group, i) => {
            const Icon = group.icon
            return (
              <AnimateOnScroll key={group.category} delay={i * 0.07} className="h-full">
                <div className="h-full glass rounded-card p-5 lg:p-6 flex flex-col gap-4 hover:border-amber/20 transition-colors duration-300">
                  {/* Cabeçalho da categoria */}
                  <div className="flex items-center gap-2">
                    <Icon size={13} className="text-amber/60 shrink-0" aria-hidden="true" />
                    <h3 className="font-mono text-xs text-amber tracking-widest uppercase">
                      {group.category}
                    </h3>
                  </div>

                  {/* Divisor */}
                  <div className="h-px bg-cream/5" aria-hidden="true" />

                  {/* Chips de skill */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-block font-body text-sm text-cream/70 border border-cream/10 px-3.5 py-1.5 rounded-chip transition-all duration-200 hover:border-amber/30 hover:text-cream hover:bg-amber/5 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
