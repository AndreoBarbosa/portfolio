import AnimateOnScroll from '../ui/AnimateOnScroll'
import Container from '../ui/Container'

type Principle = {
  index: string
  title: string
  body: string
}

// Quatro princípios cobrindo momentos distintos: enquadrar → investigar → decidir → sustentar.
const principles: Principle[] = [
  {
    index: '01',
    title: 'Enquadrar antes de resolver',
    body: 'O problema apresentado raramente é o problema real. Antes de pensar em soluções, procuro entender qual decisão precisa melhorar e qual pergunta vale a pena responder.',
  },
  {
    index: '02',
    title: 'Pesquisa muda produtos',
    body: 'Pesquisa não existe para validar ideias. Existe para desafiar certezas. As decisões mais importantes que tomei nasceram de hipóteses abandonadas, não confirmadas.',
  },
  {
    index: '03',
    title: 'Reduzir esforço mental',
    body: 'Meu objetivo não é diminuir cliques. É diminuir a carga cognitiva necessária para alguém compreender uma situação e decidir com clareza.',
  },
  {
    index: '04',
    title: 'Projetar para evoluir',
    body: 'Projeto produtos como sistemas. Documento decisões, estruturo componentes e mantenho consistência mesmo quando o time muda.',
  },
]

export default function HowIThink() {
  return (
    // Bloco de manifesto — deliberadamente sem índice /0X de seção,
    // não faz parte da numeração de navegação da home.
    <section id="como-eu-penso" className="section-shell">
      <Container>
        <AnimateOnScroll>
          <h2
            className="font-satoshi font-bold text-cream text-balance section-label-gap max-w-2xl"
            style={{ fontSize: 'clamp(32px, 4vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.01em' }}
          >
            Como eu penso
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {principles.map((principle, i) => (
            <AnimateOnScroll key={principle.index} delay={i * 0.08} className="h-full">
              <div className="h-full glass rounded-card p-6 lg:p-7 flex flex-col gap-4">
                <span className="font-mono text-xs text-amber tracking-widest">/{principle.index}</span>
                <h3
                  className="font-satoshi font-semibold text-cream text-xl leading-tight"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {principle.title}
                </h3>
                <p className="text-cream/70 text-[15px] leading-[1.6]">
                  {principle.body}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
