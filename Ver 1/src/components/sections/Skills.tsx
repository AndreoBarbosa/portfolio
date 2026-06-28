import SectionLabel from '../ui/SectionLabel'
import AnimateOnScroll from '../ui/AnimateOnScroll'

const skillGroups = [
  {
    category: 'Pesquisa & Estratégia',
    skills: ['User Journey Mapping', 'Personas', 'Arquitetura da Informação'],
  },
  {
    category: 'UX/UI Design',
    skills: ['Wireframes', 'Prototipação', 'Design de Interfaces', 'UI Design'],
  },
  {
    category: 'Métodos',
    skills: ['Testes de Usabilidade', 'Design Thinking', 'Design Centrado no Usuário'],
  },
  {
    category: 'Ferramentas',
    skills: ['Figma', 'FigJam', 'Miro'],
  },
  {
    category: 'Dev',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Deploy (cPanel)', 'Git'],
  },
  {
    category: 'Extras',
    skills: ['Geração de imagem por IA', 'Excel / Power BI', 'Python (básico)'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32 border-t border-cream/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionLabel index="/02" label="Skills" />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, i) => (
            <AnimateOnScroll key={group.category} delay={i * 0.07}>
              <div className="space-y-3">
                <h3 className="font-mono text-xs text-amber tracking-wider uppercase">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block font-body text-sm text-cream/70 border border-cream/10 px-3 py-1.5 rounded-sm transition-all duration-200 hover:border-amber/30 hover:text-cream cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
