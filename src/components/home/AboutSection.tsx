import { Fragment } from 'react'
import { Eye, Brain, Wrench } from 'lucide-react'
import LiquidReveal from '../liquid/LiquidReveal'
import LiquidSectionHeading from '../liquid/LiquidSectionHeading'

const principles = [
  {
    icon: Eye,
    title: 'Foco no usuário',
    description: 'Empatia e pesquisa como ponto de partida',
  },
  {
    icon: Brain,
    title: 'Pensamento crítico',
    description: 'Análise de dados e decisões estratégicas',
  },
  {
    icon: Wrench,
    title: 'Soluções práticas',
    description: 'Design funcional que gera resultados',
  },
]

export default function AboutSection() {
  return (
    <section id="sobre" className="pt-20 md:pt-32 overflow-x-hidden">
      <div className="liquid-about-text max-w-[1199px] mx-auto px-4 md:px-8">
        <LiquidReveal blur>
          <LiquidSectionHeading id="sobre-title" number="/03" label="Sobre mim" />
        </LiquidReveal>

        <div className="mt-8 flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-0">
          {/* Coluna esquerda — 586px no Figma */}
          <LiquidReveal delay={0.1} className="flex flex-col gap-14 lg:w-[586px] lg:flex-none">
            <div>
              <h2 className="liquid-type-section-title" style={{ color: 'var(--text-strong)' }}>
                Cheguei ao
                <br />
                Product Design
                <br />
                pelo <span style={{ color: 'var(--secundaria-500)' }}>suporte técnico.</span>
              </h2>
              <div className="mt-8 flex flex-col gap-4 max-w-[385px]">
                <p className="liquid-type-body-sm" style={{ color: '#0C1A22' }}>
                  Durante mais de 5 anos em um hospital de alta complexidade, acompanhei como sistemas
                  influenciam decisões críticas todos os dias.
                </p>
                <p className="liquid-type-body-sm" style={{ color: '#0C1A22' }}>
                  Participei da implantação de sistemas hospitalares, atendi mais de 20 mil chamados e
                  descobri que muitos problemas atribuídos à tecnologia eram, na verdade, problemas de
                  produto.
                </p>
              </div>
            </div>

            <div className="liquid-about-principles" role="list">
              {principles.map((item, i) => (
                <Fragment key={item.title}>
                  {i > 0 && <span className="liquid-about-divider" aria-hidden="true" />}
                  <div role="listitem" className="liquid-about-principle">
                    {/* D6 (correção 02): stroke migrado pra secundaria-500. */}
                    <item.icon size={40} strokeWidth={1.5} color="var(--secundaria-500)" aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </Fragment>
              ))}
            </div>
          </LiquidReveal>

          {/* Coluna direita — 382px no Figma */}
          <LiquidReveal delay={0.18} className="lg:w-[382px] lg:flex-none">
            <span className="liquid-about-quote-mark" aria-hidden="true">
              &ldquo;
            </span>
            <p className="liquid-about-highlight" style={{ color: '#0C1A22' }}>
              Foi aí que comecei a investigar pessoas antes de interfaces.
            </p>
            <p className="mt-8 liquid-type-body-sm" style={{ color: '#0C1A22' }}>
              Hoje uno minha experiência técnica, a formação em Computação pelo IFRJ e a
              pós-graduação em UX Design pela PUCRS para transformar pesquisa em decisões de produto
              que reduzem complexidade e ajudam pessoas a{' '}
              <span style={{ fontWeight: 600 }}>decidir melhor.</span>
            </p>
          </LiquidReveal>
        </div>
      </div>

      {/* Fundo (onda + foto) — correção 09 (G2). A correção 07 prendeu o
          bloco de imagem dentro do container max-w-[1199px] do grid de
          texto, o que travava a onda na borda da grid em vez de sangrar
          — regressão. Volta pra MESMA arquitetura já validada em
          .liquid-thesis-bg-zone/.liquid-thesis-bg e .liquid-trajectory-bg
          (ver liquid-glass.css): uma ZONA em fluxo normal (reserva o
          espaço vertical, preserva o respiro de 96px desktop/64px tablet
          e mobile aprovado na correção 07 — sem position:absolute na
          zona, sem deslocamento negativo) + a imagem em position:absolute,
          width:100vw SEM max-width, centralizada por left:50%+translateX,
          ultrapassando a grid de 1199px igual à Tese/Trajetória. A foto
          acompanha a onda (não a grid): também centralizada e dimensionada
          em vw dentro da zona, escala junto com o fundo em qualquer
          viewport — ver nota em .liquid-about-photo sobre abandonar o
          deslocamento assimétrico do Figma (calculado pra uma onda
          contida em 1441px, sem sentido com a onda em 100vw). */}
      <LiquidReveal delay={0.2} className="mt-16 lg:mt-24 liquid-about-image-zone">
        <div className="liquid-about-bg" aria-hidden="true">
          <img src="/fundo-sobre.webp" alt="" loading="lazy" decoding="async" />
        </div>
        <img
          src="/perfil.webp"
          alt="Foto de Andreo Barbosa"
          className="liquid-about-photo"
          loading="lazy"
          decoding="async"
          width={2048}
          height={1152}
        />
      </LiquidReveal>
    </section>
  )
}
