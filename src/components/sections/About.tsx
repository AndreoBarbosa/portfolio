import { Download } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import Container from '../ui/Container'
import Button from '../ui/Button'

const statPrimary = { value: '5+ anos', label: 'com usuários reais' }
const statsSecondary = [
  { value: '20.000+', label: 'chamados atendidos' },
  { value: 'Computação + UX', label: 'dupla formação' },
]

export default function About() {
  return (
    <section id="sobre" className="section-shell border-t border-cream/5">
      <Container>
        <AnimateOnScroll>
          <SectionLabel index="/03" label="Sobre" />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Coluna esquerda: foto + stats ── */}
          <AnimateOnScroll direction="up">
            <div>
              <div className="space-y-8">
              {/* Foto com moldura offset */}
              <div className="relative max-w-xs">
                <div
                  className="absolute inset-0 translate-x-4 translate-y-4 sm:translate-x-5 sm:translate-y-5 border border-amber/30 rounded-2xl pointer-events-none z-0"
                  aria-hidden="true"
                />
                <div className="relative z-10 aspect-[3/4] bg-cream/5 rounded-2xl overflow-hidden">
                  <img
                    src="/perfil.jpg"
                    alt="Foto de Andreo Barbosa"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Stats — card com glass, pertence visualmente ao bloco da foto.
                  Grid alinhado por baseline, "5+ anos" é o número âncora
                  (maior), os outros dois secundários no mesmo tamanho entre si. */}
              <div className="max-w-xs glass rounded-2xl p-6">
                <div className="mb-5">
                  <p className="font-satoshi font-bold text-cream text-3xl leading-none mb-2">
                    {statPrimary.value}
                  </p>
                  <p className="font-mono text-xs text-muted tracking-widest uppercase leading-none">
                    {statPrimary.label}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-cream/10">
                  {statsSecondary.map((stat) => (
                    <div key={stat.value}>
                      <p className="font-satoshi font-semibold text-cream/80 text-sm leading-none mb-2 whitespace-nowrap">
                        {stat.value}
                      </p>
                      <p className="font-mono text-xs text-muted tracking-widest uppercase leading-none">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* CTA — separado do bloco foto+stats por --space-block: é uma
                mudança de categoria (dado → ação), não mais um item da coluna. */}
            <Button
              href="/curriculo-andreo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="action-gap max-w-xs w-full justify-center"
            >
              Baixar currículo (PDF)
              <Download size={14} />
            </Button>
            </div>
          </AnimateOnScroll>

          {/* ── Coluna direita: narrativa ── */}
          <AnimateOnScroll delay={0.15}>
            <div>
              <div className="space-y-6">
                <p className="text-cream/85 text-[17px] leading-[1.6]">
                  Cheguei ao Product Design pelo suporte técnico.
                </p>
                <p className="text-cream/85 text-[17px] leading-[1.6]">
                  Durante mais de <strong className="text-amber font-semibold">cinco anos</strong> em
                  um hospital de alta complexidade, acompanhei como sistemas influenciam decisões
                  tomadas diariamente por profissionais da saúde. Nesse período participei da
                  implantação de sistemas hospitalares, atendi mais de{' '}
                  <strong className="text-amber font-semibold">20 mil chamados</strong> e percebi um
                  padrão: muitos problemas atribuídos à tecnologia eram, na verdade,{' '}
                  <strong className="text-amber font-semibold">problemas de produto</strong>.
                </p>
                <p className="text-cream/85 text-[17px] leading-[1.6]">
                  Antes mesmo de conhecer UX, eu já investigava por que as pessoas se perdiam nas
                  interfaces, quais caminhos criavam para contornar dificuldades e como pequenas
                  mudanças reduziam esse esforço. Essa curiosidade me levou ao Design.
                </p>
                <p className="text-cream/85 text-[17px] leading-[1.6]">
                  Minha formação em <strong className="text-amber font-semibold">Computação pelo IFRJ</strong>{' '}
                  e a <strong className="text-amber font-semibold">pós-graduação em UX Design pela PUCRS</strong>{' '}
                  transformaram essa experiência prática em método.
                </p>
                <p className="text-cream/85 text-[17px] leading-[1.6]">
                  Hoje atuo como{' '}
                  <strong className="text-amber font-semibold">Product Designer com forte base em UX Research</strong>,
                  utilizando pesquisa para transformar descobertas em decisões de produto que reduzem
                  complexidade e ajudam pessoas a decidir melhor.
                </p>
              </div>
            </div>
          </AnimateOnScroll>

        </div>
      </Container>
    </section>
  )
}
