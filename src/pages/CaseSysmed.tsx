import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { LinkedInIcon } from '../components/icons/LinkedInIcon'
import usePageMeta from '../hooks/usePageMeta'
import CaseSection from '../components/case/CaseSection'
import SectionHeading from '../components/case/SectionHeading'
import MetricStrip from '../components/case/MetricStrip'
import InsightCard from '../components/case/InsightCard'
import ComparisonCards from '../components/case/ComparisonCards'
import SeverityMatrix from '../components/case/SeverityMatrix'
import HeuristicChart from '../components/case/HeuristicChart'
import ProcessTimeline from '../components/case/ProcessTimeline'
import ModelSteps from '../components/case/ModelSteps'
import GuidelineAccordion from '../components/case/GuidelineAccordion'
import SkillChips from '../components/case/SkillChips'
import ReadingProgress from '../components/case/ReadingProgress'
import SectionIndex from '../components/case/SectionIndex'
import { criticalViolations, divergencePatterns, learnings, whatIdDoDifferently } from '../data/sysmed'

const TEXT_COL = 'max-w-[68ch]'

const heroMeta = [
  { label: 'Papel', value: 'Pesquisador UX · Análise · Síntese' },
  { label: 'Contexto', value: 'Hospital regional · mais de 800 colaboradores' },
  { label: 'Período', value: '2025–2026' },
  { label: 'Métodos', value: 'Avaliação heurística · Entrevistas · Análise assistida por IA' },
]

const rolesDid = [
  'Conduzi as 11 entrevistas',
  'Participei da avaliação heurística (3 avaliadores)',
  'Estruturei os dados para reanálise',
  'Desenhei o experimento',
  'Validei item a item as 89 classificações',
  'Propus o modelo final',
]

const rolesDidNot = [
  'Não desenhei a interface',
  'Não implementei nada em código',
  'Não usei API nem pipeline',
  'Não trabalhei com dados de pacientes',
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
      'Comparei 89 problemas de usabilidade classificados por avaliadores humanos e por um modelo de linguagem em um sistema hospitalar. A IA acerta a classificação e falha na priorização — de forma sistemática.',
    ogImage: '/og/sysmed.png',
    canonical: 'https://andreobarbosa.com/case/sysmed',
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Onde a IA erra ao avaliar um sistema hospitalar',
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
      <SectionIndex />
      <Header />
      <main id="conteudo">
        <article>
          {/* ── 01 HERO ── */}
          <CaseSection id="hero" className="pt-24 md:pt-[128px] pb-16 md:pb-[144px]">
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
                  className="flex flex-wrap items-center gap-2 mb-10"
                >
                  <span className="w-1.5 h-1.5 bg-amber shrink-0" aria-hidden="true" />
                  <span className="font-mono text-[12px] text-muted tracking-[0.12em] uppercase">UX Research</span>
                  <span className="font-mono text-[12px] text-muted/40" aria-hidden="true">·</span>
                  <span className="font-mono text-[12px] text-muted tracking-[0.12em] uppercase">Healthtech</span>
                  <span className="font-mono text-[12px] text-muted/40" aria-hidden="true">·</span>
                  <span className="font-mono text-[12px] text-muted tracking-[0.12em] uppercase">IA aplicada</span>
                </motion.div>

                <header>
                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="font-satoshi font-bold text-cream text-[34px] md:text-[64px] leading-[1.05] mb-8 max-w-[14ch] text-balance"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    Onde a IA erra ao avaliar um sistema hospitalar
                  </motion.h1>
                </header>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-cream/75 text-[20px] leading-[1.6] mb-16 max-w-[52ch]"
                >
                  Comparei 89 problemas de usabilidade classificados por avaliadores humanos e
                  por um modelo de linguagem. A IA acertou o que era o problema. Errou o quanto
                  ele importava.
                </motion.p>

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
                      <p className="text-cream text-sm mt-2 leading-snug">{item.value}</p>
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

          {/* ── 02 NÚMEROS-CHAVE ── */}
          <CaseSection id="metricas" aria-labelledby="metricas-heading" className="pt-0">
            <h2 id="metricas-heading" className="sr-only">
              Números-chave
            </h2>
            <MetricStrip />
          </CaseSection>

          {/* ── 03 O CONTEXTO ── */}
          <CaseSection id="contexto" aria-labelledby="contexto-heading">
            <SectionHeading
              index="/03"
              label="O contexto"
              heading="Um sistema que 700 pessoas usam por dia"
              id="contexto-heading"
            />
            <div className={`${TEXT_COL} space-y-5 text-cream/75 leading-[1.7] text-base`}>
              <p>
                O SYSMED é a plataforma de gestão do Hospital Regional do Médio Paraíba.
                Prontuário eletrônico, prescrição, solicitação de exames, registro cirúrgico,
                faturamento.
              </p>
              <p>
                Médicos, enfermeiros, técnicos e equipe administrativa operam o sistema
                continuamente. O módulo que avaliei — Evolução do Paciente — é onde a condição
                clínica é registrada, da admissão até a alta.
              </p>
              <p>
                Em software comum, uma falha de interface gera frustração. Aqui, ela entra na
                informação sobre a qual{' '}
                <strong className="text-amber font-medium">decisões clínicas são tomadas</strong>.
              </p>
            </div>

            <div
              className="mt-12 flex flex-col md:flex-row md:items-center w-full max-w-[1100px]"
              role="img"
              aria-label="Fluxo: Login, Unidade, Paciente, Evolução (destacada), Salvamento"
            >
              {['Login', 'Unidade', 'Paciente', 'Evolução', 'Salvamento'].map((step, i, arr) => {
                const isHighlight = step === 'Evolução'
                return (
                  <Fragment key={step}>
                    <div
                      className={`w-full md:flex-1 md:min-w-0 text-center whitespace-nowrap rounded-lg px-4 py-4 font-mono text-[13px] border ${
                        isHighlight
                          ? 'bg-amber text-ink border-amber'
                          : 'text-cream border-muted/40'
                      }`}
                    >
                      {step}
                    </div>
                    {i < arr.length - 1 && (
                      <div
                        className="shrink-0 bg-muted/40 w-px h-6 mx-auto md:mx-0 md:w-6 md:h-px"
                        aria-hidden="true"
                      />
                    )}
                  </Fragment>
                )
              })}
            </div>
          </CaseSection>

          {/* ── 04 O PROBLEMA ── */}
          <CaseSection id="problema" aria-labelledby="problema-heading">
            <SectionHeading
              index="/04"
              label="O problema"
              heading="O gargalo não era encontrar problemas. Era decidir quais resolver primeiro."
              id="problema-heading"
            />
            <div className={`${TEXT_COL} space-y-5 text-cream/75 leading-[1.7] text-base`}>
              <p>
                Uma avaliação de usabilidade produz muito texto. Descrições, transcrições,
                registros. Organizar isso, achar padrões e transformar em prioridade é trabalho
                lento e dependente de julgamento.
              </p>
              <p>
                A pergunta que me interessava era outra: até onde um modelo de linguagem pode
                assumir esse trabalho sem comprometer a análise?
              </p>
              <p>E, principalmente: em que ponto exato ele deixa de ser útil?</p>
            </div>

            <InsightCard label="Pergunta de pesquisa">
              Como a IA pode apoiar a análise de dados de UX em sistemas hospitalares — sem
              comprometer a interpretação contextual que ambientes críticos exigem?
            </InsightCard>
          </CaseSection>

          {/* ── 05 MEU PAPEL ── */}
          <CaseSection id="papel" aria-labelledby="papel-heading">
            <SectionHeading index="/05" label="Meu papel" heading="Meu papel" id="papel-heading" />
            <div className="grid sm:grid-cols-2 gap-10">
              <div>
                <p className="font-mono text-xs text-amber tracking-widest uppercase mb-4">Fiz</p>
                <ul className="space-y-2">
                  {rolesDid.map((item) => (
                    <li key={item} className="pl-4 relative text-cream/75 text-sm leading-relaxed">
                      <span className="absolute left-0 text-amber/60" aria-hidden="true">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">Não fiz</p>
                <ul className="space-y-2">
                  {rolesDidNot.map((item) => (
                    <li key={item} className="pl-4 relative text-muted/80 text-sm leading-relaxed">
                      <span className="absolute left-0 text-muted/50" aria-hidden="true">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CaseSection>

          {/* ── 06 O PROCESSO ── */}
          <CaseSection id="processo" aria-labelledby="processo-heading">
            <SectionHeading index="/06" label="O processo" heading="O processo" id="processo-heading" />
            <ProcessTimeline />
            <div className="rounded-card border-l-[3px] border-l-amber bg-slate/60 backdrop-blur-md py-6 px-8 mt-12 max-w-[60ch]">
              <span className="block font-mono text-[11px] text-amber tracking-[0.12em] uppercase mb-3">
                Decisão de escopo
              </span>
              <p className="text-cream text-[17px] leading-[1.6]">
                A remoção das classificações originais foi o que tornou o experimento possível.
                Sem isso, o modelo teria reproduzido a resposta em vez de produzir a dele.
              </p>
            </div>
          </CaseSection>

          {/* ── 07 DIAGNÓSTICO DO SISTEMA ── */}
          <CaseSection id="diagnostico" aria-labelledby="diagnostico-heading">
            <SectionHeading
              index="/07"
              label="Diagnóstico do sistema"
              heading="O que os dados mostraram sobre o sistema"
              id="diagnostico-heading"
            />

            <div className={`${TEXT_COL} space-y-8`}>
              <div>
                <h3 className="font-satoshi font-medium text-cream text-2xl mb-3">
                  Os problemas não estavam em uma tela ruim
                </h3>
                <p className="text-cream/75 leading-[1.7]">
                  89 violações espalhadas por 36 contextos diferentes. Nenhuma tela concentrava a
                  falha. O padrão era sistêmico.
                </p>
              </div>

              <div>
                <h3 className="font-satoshi font-medium text-cream text-2xl mb-3">
                  Três heurísticas concentraram 73% das violações
                </h3>
                <p className="text-cream/75 leading-[1.7]">
                  Simplicidade e linguagem natural · Reconhecimento · Linguagem do usuário.
                </p>
                <p className="text-cream/75 leading-[1.7] mt-3">
                  Todas as três dizem a mesma coisa por ângulos diferentes: o problema é como a
                  informação aparece e é nomeada na tela.
                </p>
              </div>

              <div>
                <h3 className="font-satoshi font-medium text-cream text-2xl mb-3">
                  A relação entre frequência e gravidade é inversa
                </h3>
                <p className="text-cream/75 leading-[1.7]">
                  A heurística mais violada tinha a segunda menor severidade média. A menos
                  violada — prevenção de erros — tinha a maior. Doze violações, todas em grau 3
                  ou 4. Nenhuma abaixo disso.
                </p>
              </div>
            </div>

            <div className="mt-12 max-w-[1100px]">
              <HeuristicChart />
            </div>

            <div className={`${TEXT_COL} mt-12`}>
              <h3 className="font-satoshi font-medium text-cream text-2xl mb-4">
                As sete violações críticas se concentram no núcleo clínico
              </h3>
              <ul className="space-y-2 mb-6">
                {criticalViolations.map((item) => (
                  <li key={item} className="pl-4 relative text-cream/75 text-sm leading-relaxed">
                    <span className="absolute left-0 text-amber/60" aria-hidden="true">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-cream/75 leading-[1.7]">
                Os problemas mais graves não estavam distribuídos ao acaso. Estavam exatamente
                onde o profissional registra ou confirma informação sobre o paciente.
              </p>
            </div>

            <InsightCard variant="quote" label="Evidência qualitativa">
              <p className="font-satoshi font-medium text-cream text-lg">
                100% dos entrevistados avaliaram negativamente a apresentação visual do sistema.
              </p>
              <p>
                Nenhuma resposta positiva. Nenhuma neutra. Em uma amostra com cargos, formações e
                tempos de uso diferentes, unanimidade não é preferência pessoal. É sintoma
                estrutural.
              </p>
            </InsightCard>

            <InsightCard>
              Nenhum treinamento formal. Nenhum material de apoio. Usuários novos aprendem por
              transmissão informal entre colegas. A inspeção registrou isso uma vez. As
              entrevistas mostraram que era o problema inteiro.
            </InsightCard>
          </CaseSection>

          {/* ── 08 O EXPERIMENTO ── */}
          <CaseSection id="experimento" aria-labelledby="experimento-heading">
            <SectionHeading index="/08" label="O experimento" heading="O teste" id="experimento-heading" />
            <div className={`${TEXT_COL} space-y-5 text-cream/75 leading-[1.7] text-base`}>
              <p>
                Peguei as mesmas 89 violações que os avaliadores humanos haviam classificado.
                Removi as respostas.
              </p>
              <p>
                Enviei ao modelo apenas a descrição do problema e o local na interface. Junto, a
                taxonomia completa: as dez heurísticas e a escala de severidade de 1 a 4, com os
                três fatores que compõem a atribuição.
              </p>
              <p>
                Exigi justificativa escrita para cada decisão. Não para melhorar o resultado —
                para poder auditar o raciocínio depois.
              </p>
              <p>
                Nenhuma informação sobre as classificações originais foi fornecida em momento
                algum.
              </p>
            </div>

            <div className="mt-12 rounded-card border border-muted/15 bg-slate/40 p-6 md:p-10 max-w-[820px]">
              <p className="font-mono text-xs text-muted tracking-widest uppercase text-center mb-6">
                Dados brutos (89 violações)
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-card border border-muted/25 p-6 text-center">
                  <p className="font-mono text-xs text-cream/70 tracking-widest uppercase mb-2">
                    Trilha humana
                  </p>
                  <p className="text-cream/60 text-sm">3 avaliadores → consenso → classificação A</p>
                </div>
                <div className="rounded-card border border-amber/40 p-6 text-center">
                  <p className="font-mono text-xs text-amber tracking-widest uppercase mb-2">
                    Trilha assistida
                  </p>
                  <p className="text-cream/60 text-sm">LLM, sem contexto → classificação B</p>
                </div>
              </div>
              <p className="font-mono text-xs text-muted tracking-widest uppercase text-center">
                ↓ Comparação pareada, item a item
              </p>
            </div>
          </CaseSection>

          {/* ── 09 O ACHADO — CLÍMAX ── */}
          <CaseSection
            id="achado"
            aria-labelledby="achado-heading"
            className="border-y border-amber/15 bg-slate/20"
          >
            <SectionHeading
              index="/09"
              label="O achado"
              heading="A IA sabe o que é o problema. Não sabe o quanto ele importa."
              id="achado-heading"
            />

            <p className="font-satoshi font-medium text-amber text-xl mb-10">
              E errou sempre na mesma direção.
            </p>

            <ComparisonCards />

            <div className={`${TEXT_COL} mt-14`}>
              <h3 className="font-satoshi font-medium text-cream text-2xl mb-6">
                Três padrões na divergência
              </h3>
              <div className="space-y-8">
                {divergencePatterns.map((p) => (
                  <div key={p.n} className="flex gap-6">
                    <span className="font-mono text-amber/50 text-xl font-bold shrink-0" aria-hidden="true">
                      {p.n}
                    </span>
                    <div>
                      <p className="font-satoshi font-medium text-cream text-lg mb-2">{p.title}</p>
                      <p className="text-cream/75 leading-[1.7] text-base">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14 max-w-[900px]">
              <SeverityMatrix />
            </div>

            <InsightCard variant="amber">
              <p className="font-satoshi font-bold text-cream text-xl mb-3">
                O movimento é sempre em direção ao centro da escala.
              </p>
              <p className="mb-3">A IA infla o irrelevante e amortece o crítico.</p>
              <p>
                Uma escala de severidade existe para separar o que corrige agora do que pode
                esperar. Quando 72% dos itens ocupam dois graus vizinhos, ela deixou de cumprir
                essa função.
              </p>
            </InsightCard>

            <InsightCard label="O achado mais grave do case">
              <p className="mb-3">
                Prevenção de erros foi a única heurística em que a IA atribuiu severidade{' '}
                <strong className="text-amber font-medium">menor</strong> que a humana.
              </p>
              <p className="mb-3">
                É exatamente a heurística cujas violações, neste sistema, se materializam em
                registro clínico incorreto.
              </p>
              <p>O erro do procedimento assistido se concentra onde as consequências são maiores.</p>
            </InsightCard>
          </CaseSection>

          {/* ── 10 POR QUE A IA ERRA ── */}
          <CaseSection id="por-que" aria-labelledby="por-que-heading">
            <SectionHeading
              index="/10"
              label="Por que a IA erra"
              heading="A falha não é de identificação. É de informação."
              id="por-que-heading"
            />
            <div className={`${TEXT_COL} space-y-5 text-cream/75 leading-[1.7] text-base`}>
              <p>
                Li as justificativas de todos os casos divergentes. A IA descreveu corretamente a
                natureza de cada problema — inclusive nos casos em que errou a severidade.
              </p>
              <p>
                O erro está no passo seguinte: converter descrição em julgamento de consequência.
              </p>
              <p>
                Severidade, na escala de Nielsen, combina três fatores: frequência, impacto e
                persistência.
              </p>
              <p className="font-medium text-cream">Nenhum dos três está na descrição do problema.</p>
              <ul className="space-y-3">
                <li className="pl-4 relative">
                  <span className="absolute left-0 text-amber/60" aria-hidden="true">—</span>
                  <strong className="text-cream font-medium">Frequência</strong> depende de quantas
                  vezes por turno o profissional executa aquela tarefa
                </li>
                <li className="pl-4 relative">
                  <span className="absolute left-0 text-amber/60" aria-hidden="true">—</span>
                  <strong className="text-cream font-medium">Impacto</strong> depende do que
                  acontece com a informação registrada errada
                </li>
                <li className="pl-4 relative">
                  <span className="absolute left-0 text-amber/60" aria-hidden="true">—</span>
                  <strong className="text-cream font-medium">Persistência</strong> depende de o
                  usuário conseguir contornar o problema nas condições reais de trabalho
                </li>
              </ul>
              <p>
                Privada desses dados, a IA opera sobre o que restou: a intensidade da linguagem da
                descrição.
              </p>
              <p>
                Descrições com "ausência", "falha", "impossibilidade" foram lidas como graves.
                Descrições com "redundante" ou "desalinhado" foram lidas como menores.
              </p>
              <p>O resultado reflete o tom do texto, não a criticidade do problema.</p>
            </div>

            <InsightCard label="O caso que resume tudo">
              <p className="mb-3">
                Em quatro violações catastróficas rebaixadas, a IA argumentou que o profissional
                pode verificar manualmente.
              </p>
              <p className="mb-3">Logicamente correto. Materialmente impossível.</p>
              <p>
                Verificação manual em plantão hospitalar é precisamente o que a pressão de tempo
                impede. A IA propôs como solução a carga cognitiva extra que é a causa do
                problema.
              </p>
            </InsightCard>

            <div className={`${TEXT_COL} mt-12`}>
              <h3 className="font-satoshi font-medium text-cream text-2xl mb-4">
                Erro sistemático não se corrige rodando de novo
              </h3>
              <div className="space-y-4 text-cream/75 leading-[1.7] text-base">
                <p>
                  Erro aleatório se dilui com repetição. É o princípio por trás de usar múltiplos
                  avaliadores humanos.
                </p>
                <p>
                  Erro direcional não. Dez execuções produzem dez distribuições comprimidas na
                  mesma direção.
                </p>
                <p>
                  Isso muda o que a validação humana significa no processo: deixa de ser controle
                  de qualidade por amostragem e passa a ser componente obrigatório do método.
                </p>
              </div>
            </div>
          </CaseSection>

          {/* ── 11 O MODELO PROPOSTO ── */}
          <CaseSection id="modelo" aria-labelledby="modelo-heading">
            <SectionHeading
              index="/11"
              label="O modelo proposto"
              heading="O que fazer com isso"
              id="modelo-heading"
            />
            <div className={`${TEXT_COL} space-y-5 text-cream/75 leading-[1.7] text-base mb-12`}>
              <p>
                A conclusão não é "não use IA". Nem "use com cuidado". É mais específica:
              </p>
              <p>
                Automatize as etapas em que a informação necessária à decisão está dentro do
                material analisado. Mantenha humano onde ela está fora.
              </p>
            </div>

            <ModelSteps />

            <InsightCard variant="amber">
              A Etapa 5 é a contribuição real do estudo. Ela não estava prevista no desenho
              inicial — surgiu dos dados. Validação genérica não resolve um erro que é sistemático
              em uma dimensão e marginal na outra.
            </InsightCard>
          </CaseSection>

          {/* ── 12 DIRETRIZES DE CORREÇÃO ── */}
          <CaseSection id="diretrizes" aria-labelledby="diretrizes-heading">
            <SectionHeading
              index="/12"
              label="Diretrizes de correção"
              heading="O que recomendei para o sistema"
              id="diretrizes-heading"
            />
            <GuidelineAccordion />
          </CaseSection>

          {/* ── 13 APRENDIZADOS ── */}
          <CaseSection id="aprendizados" aria-labelledby="aprendizados-heading">
            <SectionHeading
              index="/13"
              label="Aprendizados"
              heading="O que levo daqui"
              id="aprendizados-heading"
            />
            <div className={`${TEXT_COL} space-y-8`}>
              {learnings.map((l) => (
                <div key={l.title}>
                  <p className="font-satoshi font-medium text-cream text-lg mb-2">{l.title}</p>
                  <p className="text-cream/75 leading-[1.7] text-base">{l.body}</p>
                </div>
              ))}
            </div>

            <InsightCard label="O que eu faria diferente">{whatIdDoDifferently}</InsightCard>
          </CaseSection>

          {/* ── 14 COMPETÊNCIAS ── */}
          <CaseSection id="competencias" aria-labelledby="competencias-heading">
            <SectionHeading
              index="/14"
              label="Competências"
              heading="Competências aplicadas"
              id="competencias-heading"
            />
            <SkillChips />
          </CaseSection>

          {/* ── 15 CTA ── */}
          <CaseSection id="cta" className="pb-24 md:pb-32">
            <div className={TEXT_COL}>
              <h2 className="font-satoshi font-bold text-cream text-[34px] md:text-[40px] leading-[1.15] mb-6">
                Vamos conversar?
              </h2>
              <p className="text-cream/75 leading-[1.7] text-base mb-10 max-w-[560px]">
                Estou em transição de TI para Product Design, com foco em healthtech e pesquisa.
                Se o seu time trabalha com sistemas onde a experiência tem consequência, quero
                saber.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-16">
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
