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
      <div className="max-w-[1199px] mx-auto px-4 md:px-8">
        <LiquidReveal blur>
          <LiquidSectionHeading id="sobre-title" number="/03" label="Sobre mim" />
        </LiquidReveal>

        <div className="mt-8 flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-0">
          {/* Coluna esquerda — 586px no Figma */}
          <LiquidReveal delay={0.1} className="flex flex-col gap-14 lg:w-[586px] lg:flex-none">
            <div>
              <h2 className="liquid-type-section-title" style={{ color: '#0C1A22' }}>
                Cheguei ao
                <br />
                Product Design
                <br />
                pelo <span style={{ color: '#355972' }}>suporte técnico.</span>
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
                    <item.icon size={40} strokeWidth={1.5} color="#0C1A22" aria-hidden="true" />
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

      {/* Composição do líquido fora do grid de texto (max-w-[1199px]) de
          propósito — ela precisa ocupar 100% da largura da seção, não a
          largura do conteúdo. A foto ganha seu próprio frame com o MESMO
          max-w-[1199px] px-4 md:px-8 do grid de texto, só pra preservar
          exatamente o cálculo de largura (min(1358px,94%)) que ela já
          tinha — sem isso, 94% passaria a ser relativo à seção inteira
          (quase a viewport), e a foto cresceria além do aprovado. */}
      <LiquidReveal delay={0.2} className="mt-16 md:mt-20 liquid-about-composition">
        <div className="liquid-about-bg" aria-hidden="true">
          <img src="/fundo-sobre.png" alt="" />
        </div>
        <div className="w-full max-w-[1199px] mx-auto px-4 md:px-8 flex justify-center">
          <img src="/perfil.png" alt="Foto de Andreo Barbosa" className="liquid-about-photo" loading="lazy" />
        </div>
      </LiquidReveal>
    </section>
  )
}
