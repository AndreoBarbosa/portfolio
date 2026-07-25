import SectionLabel from '../ui/SectionLabel'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import Container from '../ui/Container'

const questions = [
  { index: '01', text: 'Estamos resolvendo o problema certo?' },
  { index: '02', text: 'O que as evidências realmente mostram?' },
  { index: '03', text: 'Qual decisão terá maior impacto para o usuário?' },
  { index: '04', text: 'Como garantir que essa solução continue evoluindo?' },
]

export default function Beliefs() {
  return (
    <section id="no-que-acredito" className="section-shell border-t border-cream/5">
      <Container>
        <AnimateOnScroll>
          <SectionLabel index="/05" label="No que acredito" />
        </AnimateOnScroll>

        {/* Card único: a tese domina o bloco, as quatro perguntas ficam
            claramente subordinadas a ela — não é uma lista de 4 títulos
            soltos, é uma sequência de perguntas dentro de um princípio. */}
        <AnimateOnScroll>
          <div className="relative glass rounded-2xl p-8 lg:p-12 overflow-hidden">
            {/* Acento geométrico discreto — evita o vácuo da metade direita
                do card num viewport largo, sem competir com o texto. */}
            <svg
              viewBox="0 0 400 400"
              className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 w-[320px] h-[320px] pointer-events-none"
              aria-hidden="true"
            >
              <circle cx="360" cy="200" r="180" fill="none" stroke="#D99A4E" strokeWidth="0.5" opacity="0.08" />
              <circle cx="360" cy="200" r="120" fill="none" stroke="#D99A4E" strokeWidth="0.5" opacity="0.1" />
              <circle cx="360" cy="200" r="60" fill="none" stroke="#9A9384" strokeWidth="0.5" opacity="0.12" />
            </svg>

            {/* Título dividido: a primeira frase é a constatação (cream), a
                segunda é a virada (amber) — deixa de ler como bloco único. */}
            <div className="relative max-w-[65ch] mb-10 lg:mb-12">
              <p
                className="font-satoshi font-semibold text-balance"
                style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', lineHeight: 1.3, letterSpacing: '-0.01em' }}
              >
                <span className="text-cream">Bons produtos não são aqueles que oferecem mais funcionalidades. </span>
                <span className="text-amber">São aqueles que tornam decisões difíceis mais simples.</span>
              </p>
              <p className="text-cream/70 text-[15px] leading-[1.6] text-pretty mt-4">
                Essa ideia orienta todos os meus projetos. Independentemente do contexto,
                procuro responder às mesmas perguntas antes de propor qualquer solução.
              </p>
            </div>

            <div className="relative">
              {questions.map((q, i) => (
                <div
                  key={q.index}
                  className={`flex items-center gap-6 py-5 ${
                    i > 0 ? 'border-t border-muted/15' : ''
                  }`}
                >
                  <span
                    className="font-mono text-amber tracking-wider shrink-0"
                    style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1 }}
                  >
                    {q.index}
                  </span>
                  <p className="font-satoshi font-medium text-cream/90 text-lg lg:text-xl leading-[1.4]">
                    {q.text}
                  </p>
                </div>
              ))}
            </div>

            <p className="relative text-muted text-sm leading-[1.5] max-w-[52ch] mt-8 pt-6 border-t border-muted/15">
              Essas perguntas orientam a forma como pesquiso, priorizo e projeto produtos.
            </p>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  )
}
