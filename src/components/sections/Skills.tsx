import { Search, Layers, GitBranch, Wrench, Code2, Sparkles, type LucideIcon } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import Container from '../ui/Container'
import { skillGroups, type IconName } from '../../data/skills'

const icons: Record<IconName, LucideIcon> = {
  search: Search,
  layers: Layers,
  flow: GitBranch,
  tool: Wrench,
  code: Code2,
  sparkle: Sparkles,
}

export default function Skills() {
  return (
    <section id="skills" className="section-shell border-t border-cream/5">
      <Container>
        <AnimateOnScroll>
          <SectionLabel index="/02" label="Skills" />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon]
            // Curtos primeiro: melhora o empacotamento do flex-wrap e reduz espaço morto.
            // Ordenado aqui (não no dado) para que novas skills se encaixem sozinhas.
            const sortedSkills = [...group.skills].sort((a, b) => a.length - b.length)
            return (
              <AnimateOnScroll key={group.label} delay={i * 0.06} className="h-full">
                <div className="h-full glass rounded-card p-5 lg:p-6 flex flex-col gap-4 hover:border-amber/20 transition-colors duration-300">
                  {/* Cabeçalho da categoria */}
                  <div className="flex items-center gap-2">
                    <Icon size={13} className="text-amber/60 shrink-0" aria-hidden="true" />
                    <h3 className="font-mono text-xs text-amber tracking-widest uppercase">
                      {group.label}
                    </h3>
                  </div>

                  {/* Divisor */}
                  <div className="h-px bg-cream/5" aria-hidden="true" />

                  {/* Chips de skill */}
                  <div className="flex flex-wrap gap-2">
                    {sortedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-block font-body text-sm text-cream/70 border border-cream/10 px-4 py-2 rounded-chip transition-all duration-200 hover:border-amber/30 hover:text-cream hover:bg-amber/5 cursor-default"
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
      </Container>
    </section>
  )
}
