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
    <section id="sobre" className="py-16 md:py-20 lg:py-32 border-t border-cream/5">
      <Container>
        <AnimateOnScroll>
          <SectionLabel index="/04" label="Sobre" />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Coluna esquerda: foto + stats ── */}
          <AnimateOnScroll direction="up">
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

              {/* Stats abaixo da foto */}
              <div className="max-w-xs border-t border-cream/5 pt-4 space-y-4">
                {/* Destaque: 5+ anos */}
                <div>
                  <p className="font-satoshi font-semibold text-cream text-2xl leading-none mb-1.5">
                    {statPrimary.value}
                  </p>
                  <p className="font-mono text-[10px] text-muted/60 tracking-widest uppercase leading-none">
                    {statPrimary.label}
                  </p>
                </div>

                {/* Secundários: lado a lado */}
                <div className="grid grid-cols-2 gap-3">
                  {statsSecondary.map((stat) => (
                    <div key={stat.value}>
                      <p className="font-satoshi font-medium text-muted text-sm leading-none mb-1.5">
                        {stat.value}
                      </p>
                      <p className="font-mono text-[9px] text-muted/35 tracking-widest uppercase leading-none">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* ── Coluna direita: texto + CTAs ── */}
          <AnimateOnScroll delay={0.15}>
            <div className="space-y-5">

              {/* P1 — gancho principal */}
              <p
                className="text-cream text-xl sm:text-2xl leading-relaxed font-medium"
                style={{ letterSpacing: '-0.01em' }}
              >
                Cheguei ao design pela porta dos fundos: o suporte técnico. Em 5+ anos
                num hospital de alta complexidade, atendi mais de{' '}
                <span className="text-amber font-semibold">20.000 chamados</span>{' '}
                e aprendi algo que nenhum curso ensina: a maioria não era problema
                de hardware. Era{' '}
                <span className="text-amber font-semibold">problema de experiência</span>.
              </p>

              {/* P2 — a virada */}
              <p className="text-cream/80 leading-relaxed">
                Vendo isso todo dia, comecei a enxergar os padrões de fricção e os
                contornos que as pessoas criavam para driblar sistemas mal projetados.
                Virei designer antes mesmo de saber que era isso que eu fazia.
              </p>

              {/* P3 — formação + foco */}
              <p className="text-cream/80 leading-relaxed">
                Tenho{' '}
                <span className="text-amber">Computação (IFRJ)</span>{' '}
                e pós em{' '}
                <span className="text-amber">UX Design (PUCRS)</span>.
                É a base técnica que me deixa desenhar experiências que também funcionam
                de verdade. Hoje projeto produtos a partir de pesquisa e dados, com
                foco em{' '}
                <span className="text-amber">healthtech</span>.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-3">
                <Button href="#contato" variant="primary">
                  Entrar em contato
                </Button>
                <Button
                  href="/curriculo-andreo.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                >
                  Baixar currículo
                </Button>
              </div>

            </div>
          </AnimateOnScroll>

        </div>
      </Container>
    </section>
  )
}
