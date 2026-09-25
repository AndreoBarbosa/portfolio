import SectionLabel from '../ui/SectionLabel'
import AnimateOnScroll from '../ui/AnimateOnScroll'

const stats = [
  { value: '20.000+', label: 'chamados que viraram aprendizado de UX' },
  { value: '5+ anos', label: 'com usuários reais em ambiente crítico' },
  { value: 'Comp. + UX', label: 'dupla formação, da base ao produto' },
]

export default function About() {
  return (
    <section id="sobre" className="py-16 md:py-24 lg:py-32 border-t border-cream/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionLabel index="/04" label="Sobre" />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Photo */}
          <AnimateOnScroll direction="up">
            <div className="relative max-w-xs">
              {/* Offset frame — behind photo */}
              <div
                className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 border border-amber/30 rounded-badge pointer-events-none"
                aria-hidden="true"
              />
              {/* Photo in front */}
              <div className="relative z-10 aspect-[3/4] bg-cream/5 rounded-badge overflow-hidden">
                <img
                  src="/perfil.jpg"
                  alt="Foto de Andreo Barbosa"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </AnimateOnScroll>

          {/* Text */}
          <AnimateOnScroll delay={0.15}>
            <div className="space-y-6">
              <p className="text-cream/90 text-lg leading-relaxed">
                Sou Product/UX Designer com uma origem incomum: cheguei ao design
                pela porta dos fundos — a do suporte técnico. Durante mais de 5 anos
                em um hospital de alta complexidade — com{' '}
                <span className="text-cream font-medium">1400 colaboradores e cerca
                de 700 usuários ativos por dia</span> — atendi mais de{' '}
                <span className="text-cream font-medium">20.000 chamados técnicos</span>.
                E aprendi algo que nenhum curso ensina: a maioria deles não era problema
                de hardware. Era problema de experiência.
              </p>

              <p className="text-muted leading-relaxed">
                Sistemas difíceis de navegar, fluxos que não faziam sentido para quem
                precisava decidir rápido, treinamentos que só existiam porque o produto
                não era intuitivo o suficiente. Vendo isso todo dia, comecei a enxergar
                padrões de fricção e os "contornos" que as pessoas inventavam para driblar
                sistemas mal projetados. Foi ali que virei designer —{' '}
                <em className="text-cream/80 not-italic">antes mesmo de saber que era
                isso que eu estava fazendo</em>.
              </p>

              <p className="text-muted leading-relaxed">
                Tenho Licenciatura em Computação (IFRJ) e pós-graduação em UX Design
                (PUCRS). Essa base técnica não é detalhe: ela me permite desenhar
                experiências bonitas que também funcionam de verdade, conversar de igual
                para igual com desenvolvedores e tomar decisões de design fundamentadas
                no que é realmente possível construir.
              </p>

              <p className="text-muted leading-relaxed">
                Hoje projeto produtos digitais a partir de dados, comportamento e
                necessidades reais — do discovery à prototipação no Figma. Tenho
                interesse especial por healthtech e saúde digital, terreno que conheço
                de perto. Sério no trabalho, curioso por natureza, e divertido no resto.
              </p>

              {/* Stats */}
              <div className="pt-4 border-t border-cream/5 grid grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <div key={stat.value}>
                    <p className="font-satoshi font-semibold text-amber text-lg leading-tight mb-1" style={{ letterSpacing: '-0.01em' }}>
                      {stat.value}
                    </p>
                    <p className="font-mono text-xs text-muted tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
