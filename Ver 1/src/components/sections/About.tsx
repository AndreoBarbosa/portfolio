import SectionLabel from '../ui/SectionLabel'
import AnimateOnScroll from '../ui/AnimateOnScroll'

const stats = [
  { value: 'Computação + UX', label: 'Dupla formação' },
  { value: '1400+', label: 'Usuários impactados' },
  { value: 'Louvor', label: 'TCC aprovado com' },
]

export default function About() {
  return (
    <section id="sobre" className="py-24 lg:py-32 border-t border-cream/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionLabel index="/04" label="Sobre" />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Photo */}
          <AnimateOnScroll direction="up">
            <div className="relative">
              <div className="aspect-[3/4] max-w-xs bg-cream/5 border border-cream/10 rounded-sm overflow-hidden">
                <img
                  src="/perfil.jpg"
                  alt="Foto de Andreo Barbosa"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* fallback shown while image loads or if missing */}
              </div>
              {/* Decorative amber border accent */}
              <div className="absolute -bottom-3 -right-3 w-full h-full max-w-xs aspect-[3/4] border border-amber/20 rounded-sm pointer-events-none" aria-hidden="true" />
            </div>
          </AnimateOnScroll>

          {/* Text */}
          <AnimateOnScroll delay={0.15}>
            <div className="space-y-6">
              <p className="text-cream/90 text-lg leading-relaxed">
                Sou designer com formação em{' '}
                <span className="text-cream font-medium">Computação pelo IFRJ</span> e
                pós-graduação em <span className="text-cream font-medium">UX Design pela PUCRS</span>.
                Essa combinação não é acidente — ela é o que me diferencia.
              </p>

              <p className="text-muted leading-relaxed">
                Enquanto a maioria dos designers aprende sobre viabilidade técnica de forma
                indireta, eu <em className="text-cream/80 not-italic">sei construir</em>.
                Isso me permite desenhar experiências bonitas que também funcionam de verdade,
                conversar de igual com desenvolvedores e tomar decisões de design fundamentadas
                no que é realmente possível.
              </p>

              <p className="text-muted leading-relaxed">
                Trabalho como Analista de Suporte de TI no Hospital Regional Zilda Arns —
                um ambiente com 1400+ colaboradores e ~700 usuários ativos por dia. O contato
                diário com problemas reais de usabilidade em sistemas críticos me deu uma
                empatia genuína com o usuário e visão prática sobre o que realmente{' '}
                <em className="text-cream/80 not-italic">trava as pessoas</em>.
              </p>

              <p className="text-muted leading-relaxed">
                Meu TCC foi sobre IHC em contexto hospitalar — aprovado com louvor. Curioso,
                gosto de resolver problemas. Sério no trabalho, divertido no resto.
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
