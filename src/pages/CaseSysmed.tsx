import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { LinkedInIcon } from '../components/icons/LinkedInIcon'
import usePageMeta from '../hooks/usePageMeta'
import { DashList, DashItem } from '../components/ui/DashList'
import CaseSection from '../components/case/CaseSection'
import SectionHeading from '../components/case/SectionHeading'
import MetricStrip from '../components/case/MetricStrip'
import InsightCard from '../components/case/InsightCard'
import ComparisonCards from '../components/case/ComparisonCards'
import SeverityMatrix from '../components/case/SeverityMatrix'
import HeuristicChart from '../components/case/HeuristicChart'
import ModelSteps from '../components/case/ModelSteps'
import ReadingProgress from '../components/case/ReadingProgress'
import SectionIndex from '../components/case/SectionIndex'

const TEXT_COL = 'max-w-[68ch]'

const heroMeta = [
  { label: 'Categoria', value: 'UX Research • IA Aplicada • HealthTech' },
  { label: 'Período', value: '2025–2026' },
  { label: 'Meu papel', value: 'UX Researcher' },
  { label: 'Métodos', value: 'Avaliação Heurística • Entrevistas • Experimento Comparativo • IA Generativa' },
]

const sectionIndex = [
  { id: 'metricas', label: 'Números' },
  { id: 'hipotese', label: 'A hipótese' },
  { id: 'descoberta', label: 'A descoberta' },
  { id: 'decisoes', label: 'As decisões' },
  { id: 'resultado', label: 'O resultado' },
  { id: 'aprendizado', label: 'O aprendizado' },
]

function HeroMatrix() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 4 }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={10 + c * 46}
            y={10 + r * 46}
            width={40}
            height={40}
            rx={6}
            fill="none"
            stroke="#D99A4E"
            strokeOpacity={0.15 + ((r + c) % 4) * 0.12}
            strokeWidth={1}
          />
        ))
      )}
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 100 100"
        to="360 100 100"
        dur="90s"
        repeatCount="indefinite"
      />
    </svg>
  )
}

export default function CaseSysmed() {
  usePageMeta({
    title: 'Case: Onde a IA erra ao avaliar um sistema hospitalar — Andreo Barbosa',
    description:
      'A IA identifica problemas. O contexto decide quais realmente importam. Comparei a análise de 89 problemas de usabilidade feita por especialistas com a classificação produzida por um modelo de linguagem.',
    ogImage: '/og/sysmed.png',
    canonical: 'https://andreobarbosa.com/case/ia-hospitalar',
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Onde a IA erra ao avaliar sistemas hospitalares',
      author: { '@type': 'Person', name: 'Andreo Barbosa' },
      about: ['UX Research', 'Healthcare UX', 'Artificial Intelligence'],
      datePublished: '2026-07-21',
    },
  })

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:bg-amber focus:text-ink focus:px-4 focus:py-2 focus:rounded-sm font-mono text-xs"
      >
        Pular para o conteúdo
      </a>
      <ReadingProgress />
      <SectionIndex items={sectionIndex} />
      <Header />
      <main id="conteudo">
        <article>
          {/* ── HERO ── */}
          <CaseSection id="hero" className="pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-12 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/#projetos"
                className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-cream transition-colors duration-200 mb-16 group"
              >
                <ArrowLeft size={12} className="transition-transform duration-200 group-hover:-translate-x-1" />
                Voltar aos projetos
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
              <div className={TEXT_COL}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="flex flex-wrap items-center gap-3 mb-4"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0" aria-hidden="true" />
                  <div className="h-px w-[48px] bg-amber/30" aria-hidden="true" />
                  <span className="font-mono text-[12px] text-muted tracking-[0.12em] uppercase">UX Research</span>
                  <span className="font-mono text-[12px] text-muted/40" aria-hidden="true">·</span>
                  <span className="font-mono text-[12px] text-muted tracking-[0.12em] uppercase">IA aplicada</span>
                  <span className="font-mono text-[12px] text-muted/40" aria-hidden="true">·</span>
                  <span className="font-mono text-[12px] text-muted tracking-[0.12em] uppercase">Healthtech</span>
                </motion.div>

                <header>
                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="font-satoshi font-bold text-cream text-[34px] md:text-[64px] leading-[1.1] mb-6 max-w-[14ch] text-balance"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    Onde a IA erra ao avaliar sistemas hospitalares
                  </motion.h1>
                </header>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-cream/75 text-[20px] leading-[1.6] mb-6 max-w-[45ch] text-pretty"
                >
                  Identificar problemas é diferente de compreender contexto.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="space-y-4 text-cream/70 text-base leading-[1.6] max-w-[60ch] mb-8"
                >
                  <p>
                    Comparei especialistas e um modelo de linguagem na análise de{' '}
                    <strong className="text-cream font-medium">89 problemas de usabilidade</strong> para
                    investigar até onde a IA pode apoiar pesquisas de UX em ambientes críticos.
                  </p>
                  <p>
                    O estudo mostrou que reconhecer uma falha é apenas parte do trabalho. Priorizá-la
                    exige contexto, e é justamente aí que humanos e IA começam a tomar decisões
                    diferentes.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="max-w-[640px] border-t border-cream/10 mb-8"
                />

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="max-w-[640px] grid grid-cols-2 gap-x-16 gap-y-6"
                >
                  {heroMeta.map((item) => (
                    <div key={item.label}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                        {item.label}
                      </p>
                      <p className="text-cream text-sm mt-2 leading-[1.5]">{item.value}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto max-w-[280px] w-full mt-10 hidden lg:block"
                aria-hidden="true"
              >
                <div className="absolute inset-0 -m-8 rounded-full bg-amber/10 blur-[80px]" />
                <HeroMatrix />
              </motion.div>
            </div>
          </CaseSection>

          {/* ── NÚMEROS-CHAVE ── */}
          <CaseSection id="metricas" aria-labelledby="metricas-heading" className="pt-0">
            <h2 id="metricas-heading" className="sr-only">
              Números-chave
            </h2>
            <MetricStrip />
          </CaseSection>

          {/* ── A HIPÓTESE ── */}
          <CaseSection id="hipotese" aria-labelledby="hipotese-heading">
            <SectionHeading index="/01" label="A hipótese" heading="A hipótese" id="hipotese-heading" />
            <div className={`${TEXT_COL} space-y-6 text-cream/75 leading-[1.6] text-base`}>
              <p>
                Em sistemas hospitalares, pequenos problemas de usabilidade afetam diretamente a
                rotina de médicos e enfermeiros. Avaliações heurísticas identificam esses
                problemas, mas geram dezenas de registros qualitativos que precisam ser
                organizados, interpretados e priorizados.
              </p>
              <p>
                Com a popularização dos modelos de linguagem, a pergunta era inevitável: a IA
                consegue apoiar essa etapa sem comprometer a qualidade das decisões?
              </p>
            </div>

            <InsightCard variant="quote" label="A pergunta do estudo">
              <p className="font-satoshi font-medium text-amber text-xl leading-[1.4]">
                Até que ponto um modelo de linguagem consegue apoiar a análise de problemas de
                usabilidade sem perder o contexto necessário para priorizá-los?
              </p>
            </InsightCard>

            <div className={`${TEXT_COL} text-cream/75 leading-[1.6] text-base`}>
              <p>
                Não queria provar que a IA substituiria pesquisadores. Também não queria concluir o
                contrário. Queria descobrir onde estavam seus limites.
              </p>
            </div>
          </CaseSection>

          {/* ── A DESCOBERTA ── */}
          <CaseSection id="descoberta" aria-labelledby="descoberta-heading">
            <SectionHeading
              index="/02"
              label="A descoberta"
              heading="O que mudou minha forma de enxergar o problema"
              id="descoberta-heading"
            />

            <div className={`${TEXT_COL} space-y-6`}>
              <div>
                <h3 className="font-satoshi font-medium text-cream text-2xl mb-3">
                  Como construí o experimento
                </h3>
                <p className="text-cream/75 leading-[1.6]">
                  Desenhei um experimento comparando especialistas e IA sobre exatamente o mesmo
                  conjunto de dados. O estudo começou com entrevistas e avaliações heurísticas que
                  resultaram em 89 problemas de usabilidade.
                </p>
                <p className="text-cream/75 leading-[1.6] mt-4">
                  Antes de enviar o material ao modelo, removi todas as classificações feitas
                  pelos especialistas. A IA recebeu apenas a descrição dos problemas, as
                  heurísticas de Nielsen, a escala de severidade e a instrução de justificar cada
                  decisão — garantindo que cada classificação fosse construída de forma
                  independente.
                </p>
              </div>
            </div>

            {/* Suporte visual: distribuição dos 89 problemas por heurística — o material bruto
                que entrou no experimento, antes de qualquer classificação por IA. */}
            <div className="block-gap max-w-[1100px]">
              <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
                Os 89 problemas de usabilidade, por heurística
              </p>
              <HeuristicChart />
            </div>

            <div className={`${TEXT_COL} space-y-6 mt-12`}>
              <div>
                <h3 className="font-satoshi font-medium text-cream text-2xl mb-3">
                  O que descobri
                </h3>
                <p className="text-cream/75 leading-[1.6]">
                  A IA identificava corretamente a natureza da maioria dos problemas. A limitação
                  apareceu numa pergunta mais difícil: qual problema deve ser resolvido primeiro?
                </p>
                <p className="text-cream/75 leading-[1.6] mt-4">
                  Enquanto especialistas diferenciavam claramente problemas cosméticos de
                  problemas críticos, o modelo concentrava boa parte das respostas nos níveis
                  intermediários da escala.
                </p>
              </div>
            </div>

            <InsightCard variant="amber">
              <p className="font-satoshi font-medium text-cream text-lg">
                A IA entendia o problema, mas não compreendia seu impacto.
              </p>
            </InsightCard>

            <div className="block-gap max-w-[900px]">
              <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
                Severidade atribuída por humanos × IA, par a par
              </p>
              <SeverityMatrix />
            </div>

            <div className="block-gap">
              <ComparisonCards />
            </div>

            <div className={`${TEXT_COL} space-y-6 mt-12`}>
              <div>
                <h3 className="font-satoshi font-medium text-cream text-2xl mb-3">
                  O contexto mudou tudo
                </h3>
                <p className="text-cream/75 leading-[1.6]">
                  Ao analisar as justificativas do modelo, percebi que ele descrevia corretamente
                  as falhas da interface. O que faltava não era interpretação — era contexto. A IA
                  não conseguia inferir frequência de uso, impacto clínico, risco para o paciente
                  ou facilidade de contorno pelos profissionais.
                </p>
              </div>

              <DashList>
                <DashItem>
                  <strong className="text-cream font-medium">Frequência</strong> depende de quantas
                  vezes por turno o profissional executa aquela tarefa
                </DashItem>
                <DashItem>
                  <strong className="text-cream font-medium">Impacto clínico</strong> depende do
                  que acontece com a informação registrada errada
                </DashItem>
                <DashItem>
                  <strong className="text-cream font-medium">Risco para o paciente</strong> raramente
                  está descrito no próprio problema de interface
                </DashItem>
                <DashItem>
                  <strong className="text-cream font-medium">Facilidade de contorno</strong> depende
                  da rotina real dos profissionais, não da tela isolada
                </DashItem>
              </DashList>

              <p className="text-cream/75 leading-[1.6]">
                Essas informações fazem parte da rotina hospitalar e dificilmente aparecem na
                descrição textual de um problema. Foi exatamente nesse ponto que humanos e IA
                passaram a decidir diferente.
              </p>
            </div>
          </CaseSection>

          {/* ── AS DECISÕES ── */}
          <CaseSection id="decisoes" aria-labelledby="decisoes-heading">
            <SectionHeading
              index="/03"
              label="As decisões"
              heading="As decisões que mudaram a pesquisa"
              id="decisoes-heading"
            />

            <div className="rounded-card border-l-[3px] border-l-amber bg-slate/60 backdrop-blur-md py-6 px-8 mb-12 max-w-[68ch]">
              <span className="block font-mono text-[11px] text-amber tracking-[0.12em] uppercase mb-3">
                Transformar a descoberta em método
              </span>
              <p className="text-cream/80 text-sm leading-[1.6] mb-4">
                <strong className="text-cream font-medium">Descoberta</strong> — Modelos de
                linguagem aceleram etapas operacionais, mas falham quando a decisão depende de
                contexto de uso.
              </p>
              <p className="text-cream text-[17px] leading-[1.6]">
                <strong className="text-cream font-medium">Decisão</strong> — Estruturei um fluxo
                híbrido em seis etapas, no qual a IA assume tarefas repetitivas e especialistas
                concentram o tempo nas decisões que exigem contexto.
              </p>
            </div>

            <ModelSteps />
          </CaseSection>

          {/* ── O RESULTADO ── */}
          <CaseSection id="resultado" aria-labelledby="resultado-heading">
            <SectionHeading index="/04" label="O resultado" heading="O resultado" id="resultado-heading" />
            <div className={`${TEXT_COL} text-cream/75 leading-[1.6] text-base mb-12`}>
              <p>
                Mais do que responder se a IA funciona para UX Research, o estudo definiu em quais
                etapas ela agrega valor e onde o julgamento humano continua essencial.
              </p>
            </div>

            {/* A tese do case — a IA concorda no quê (heurística) mas diverge em quão grave
                (severidade). Era rodapé centralizado em mono; é o achado, não uma legenda. */}
            <InsightCard variant="quote" label="A leitura">
              <p className="font-satoshi font-medium text-amber text-xl leading-[1.4]">
                A diferença entre esses dois números é o case inteiro.
              </p>
              <p className="text-cream/70 text-base leading-[1.6]">
                A IA concordou no que era o problema — 68% na heurística. Divergiu em quão grave
                ele era — 48% na severidade. Entendia o problema, não compreendia seu impacto.
              </p>
            </InsightCard>

            <div className="block-gap">
              <MetricStrip showFootnote={false} />
              <p className="text-cream/70 text-sm leading-[1.6] mt-8 max-w-[60ch]">
                89 problemas de usabilidade analisados · 1 experimento comparativo entre
                especialistas e IA · 6 etapas estruturadas para um fluxo híbrido · 1 método proposto
                para pesquisa em sistemas críticos.
              </p>
            </div>
          </CaseSection>

          {/* ── O APRENDIZADO ──
              pb reduzido e forçado (!important) por cima do padding grande do
              section-shell: como padding não colapsa entre <section>s
              adjacentes, o pb cheio daqui somado ao pt cheio do CTA logo
              abaixo dobrava para 256px — o buraco antes dos botões do
              fechamento. Reduzido para --space-block (72px). */}
          <CaseSection
            id="aprendizado"
            aria-labelledby="aprendizado-heading"
            className="!pb-11 md:!pb-14 lg:!pb-18"
          >
            <SectionHeading index="/05" label="O aprendizado" heading="O aprendizado" id="aprendizado-heading" />
            <div className={`${TEXT_COL} space-y-6 text-cream/75 leading-[1.6] text-base`}>
              <p>
                Este projeto mudou minha forma de enxergar Inteligência Artificial aplicada ao
                Design. Antes, minha pergunta era se a IA conseguiria substituir parte do trabalho
                de pesquisa. Hoje pergunto outra coisa: em quais decisões ela realmente agrega
                valor?
              </p>
              <p>
                Passei a tratar IA como ferramenta para ampliar a capacidade analítica dos
                pesquisadores, não para substituir o julgamento necessário em problemas complexos.
              </p>
              <p className="text-cream font-medium">
                No fim, a principal descoberta não foi sobre tecnologia. Foi sobre Design.
              </p>
            </div>
          </CaseSection>

          {/* ── CTA ── */}
          <CaseSection id="cta" className="pt-0 pb-24 md:pb-32">
            <div className={TEXT_COL}>
              <h2 className="font-satoshi font-bold text-cream text-[34px] md:text-[40px] leading-[1.15] mb-6">
                Vamos conversar?
              </h2>
              <p className="text-cream/75 leading-[1.6] text-base max-w-[560px]">
                Estou em transição de TI para Product Design, com foco em healthtech e pesquisa.
                Se o seu time trabalha com sistemas onde a experiência tem consequência, quero
                saber.
              </p>
              <div className="action-gap flex flex-wrap items-center gap-4 mb-12">
                <a
                  href="https://linkedin.com/in/andreo-barbosa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn de Andreo Barbosa"
                  className="social-link social-link--cta"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-cream/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Link
                to="/#projetos"
                className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-cream transition-colors duration-200"
              >
                <ArrowLeft size={12} />
                Voltar aos projetos
              </Link>
              <Link
                to="/case/gabriel"
                className="inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-cream transition-colors duration-200 whitespace-nowrap"
              >
                Próximo case → Landing page para psicólogo clínico
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </CaseSection>
        </article>
      </main>
      <Footer />
    </>
  )
}
