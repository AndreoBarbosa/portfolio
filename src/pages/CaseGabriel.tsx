import { motion, useReducedMotion } from 'framer-motion'
import {
  Users, Route, Smartphone, MessageCircle, ShieldCheck, Sparkles, Sprout,
  Flag, Target, UserCog, Layers,
} from 'lucide-react'
import '../styles/liquid-glass.css'
import LiquidHeader from '../components/liquid/LiquidHeader'
import LiquidFooter from '../components/liquid/LiquidFooter'
import LiquidReveal from '../components/liquid/LiquidReveal'
import CaseSection from '../components/case-gabriel/CaseSection'
import FeatureCard from '../components/case-gabriel/FeatureCard'
import QuoteLine from '../components/case-gabriel/QuoteLine'
import NoteBox from '../components/case-gabriel/NoteBox'
import PrincipleList from '../components/case-gabriel/PrincipleList'
import DarkGradientCard from '../components/case-gabriel/DarkGradientCard'
import DarkCardItem from '../components/case-gabriel/DarkCardItem'
import SequenceRow from '../components/case-gabriel/SequenceRow'
import DecisionChapter from '../components/case-gabriel/DecisionChapter'
import IdentityColumn from '../components/case-gabriel/IdentityColumn'
import CalloutDot from '../components/case-gabriel/CalloutDot'
import AttributeItem from '../components/case-gabriel/AttributeItem'
import usePageMeta from '../hooks/usePageMeta'
import {
  hero, overview, challengeDiscovery, briefing, mainChange, projectDecisions,
  identity, strategyToInterface, figmaToBrowser, result, nextStep, learning, gabrielAccent,
} from '../data/gabriel'

const IMG = '/projects/gabriel'

const overviewIcons = { Users, Route, Smartphone, MessageCircle }
const principleIcons = { ShieldCheck, Sparkles, Sprout }
const briefingIcons = { Flag, Users, Target, UserCog, Layers }

const EASE = [0.16, 1, 0.3, 1] as const

export default function CaseGabriel() {
  usePageMeta({
    title: 'Gabriel Alves — Landing page para psicólogo clínico · Andreo Barbosa',
    description: hero.body,
    ogImage: `${IMG}/cover.png`,
  })

  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="liquid-root min-h-screen">
      {/* D7 (correção 02): CTA da navbar troca "Contato" por "Ver todos
          os projetos" → volta pro grid de projetos da Home. Só o
          Gabriel — Home e Sona mantêm o default do componente. */}
      <LiquidHeader activeSection={null} basePath="/" ctaLabel="Ver todos os projetos" ctaHref="/#projetos" ctaArrow />

      <main id="conteudo">
        {/* Hero — LCP: imagem sem lazy, entrada no load (não no scroll),
            eyebrow → título → corpo → CTAs em sequência curta, mockup em
            paralelo. Sem linha de metadados — removida de propósito no
            Figma (nó 669:3801), não reintroduzir a partir da V1. Fundo:
            wash branco quase horizontal (linear-gradient) confirmado via
            MCP. */}
        <section
          id="hero"
          className="pt-32 md:pt-40 pb-16 md:pb-20"
          style={{ backgroundImage: 'linear-gradient(-89.8deg, rgba(255,255,255,0) 0.76%, rgba(255,255,255,1) 62.48%)' }}
        >
          <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
            <div>
              <motion.div
                className="mb-6"
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p
                  className="font-outfit text-xs uppercase whitespace-nowrap"
                  style={{ color: 'var(--secundaria-500)', letterSpacing: '0.96px' }}
                >
                  {hero.eyebrow}
                </p>
              </motion.div>
              <motion.h1
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
                className="font-newsreader text-[clamp(34px,4.4vw,48px)] leading-[1.125]"
                style={{ color: 'var(--text-strong)' }}
              >
                {hero.titleBefore}
                <em className="italic" style={{ color: 'var(--secundaria-500)', fontStyle: 'italic' }}>
                  {hero.titleHighlight}
                </em>
                {hero.titleAfter}
              </motion.h1>
              <motion.p
                className="mt-6 font-outfit text-base leading-[1.5] max-w-[46ch]"
                style={{ color: gabrielAccent.textMuted }}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
              >
                {hero.body}
              </motion.p>
              <motion.div
                className="mt-8 flex flex-wrap gap-4"
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.24 }}
              >
                <a
                  href={hero.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-outfit font-semibold text-[15px] rounded-full px-7 py-4"
                  style={{ background: 'var(--text-strong)', color: '#E5E7EB' }}
                >
                  {hero.primaryCta.label} <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="inline-flex items-center gap-2 font-outfit font-semibold text-[15px] rounded-full px-7 py-4 border"
                  style={{ borderColor: '#D9DEE3', color: 'var(--text-strong)' }}
                >
                  {hero.secondaryCta.label} <span aria-hidden="true" style={{ color: gabrielAccent.textMuted }}>↓</span>
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.03 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ boxShadow: '0px 24px 60px 0px rgba(26,51,77,0.18)' }}
            >
              <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: '#F4F6F8' }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#D9DEE3' }} aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#D9DEE3' }} aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#D9DEE3' }} aria-hidden="true" />
              </div>
              <img
                src={`${IMG}/cover.png`}
                alt="Landing page do psicólogo Gabriel Alves, visão desktop: hero com a mensagem 'Um espaço seguro para você ser quem é'"
                width={611}
                height={386}
                fetchPriority="high"
                className="w-full h-auto block object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* 01 — Visão Geral */}
        <CaseSection id="visao-geral" eyebrow={overview.eyebrow}>
          <LiquidReveal className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <h2
              className="font-hanken font-semibold leading-[1.1] text-[clamp(24px,3.4vw,32px)]"
              style={{ color: 'var(--text-strong)', letterSpacing: '-0.64px' }}
            >
              {overview.titleBefore}
              <span style={{ color: 'var(--secundaria-500)' }}>{overview.titleHighlight}</span>
            </h2>
            <p className="font-outfit text-base leading-[1.5] self-start" style={{ color: gabrielAccent.textMuted }}>
              {overview.body}
            </p>
          </LiquidReveal>
          <LiquidReveal stagger className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {overview.features.map((f) => (
              <FeatureCard
                key={f.title}
                icon={overviewIcons[f.icon as keyof typeof overviewIcons]}
                title={f.title}
                body={f.body}
              />
            ))}
          </LiquidReveal>
        </CaseSection>

        {/* 02-03 — Desafio e Descoberta (nó 595:1160, uma única seção
            Figma — sem eyebrow de topo própria; cada coluna carrega o
            seu, "O DESAFIO" / "A DESCOBERTA"). */}
        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <LiquidReveal>
              <div className="border-t" style={{ borderColor: gabrielAccent.divider }} />
            </LiquidReveal>

            <div className="mt-8 grid lg:grid-cols-2 gap-10 lg:gap-16">
              {/* O Desafio */}
              <LiquidReveal className="flex flex-col h-full justify-between gap-8">
                <span
                  className="font-outfit font-semibold text-xs uppercase"
                  style={{ color: 'var(--secundaria-500)', letterSpacing: '0.24px' }}
                >
                  {challengeDiscovery.challenge.eyebrow}
                </span>

                <div className="flex flex-col gap-6">
                  <h2
                    className="font-hanken font-semibold leading-[1.1] text-2xl max-w-[473px]"
                    style={{ color: 'var(--text-strong)' }}
                  >
                    {challengeDiscovery.challenge.title}
                  </h2>
                  <p className="font-outfit font-semibold text-base leading-[1.5]" style={{ color: gabrielAccent.textMuted }}>
                    {challengeDiscovery.challenge.leadSemibold}
                  </p>
                  <div className="flex flex-col gap-4">
                    {challengeDiscovery.challenge.paragraphs.map((p) => (
                      <p key={p} className="font-outfit text-base leading-[1.5]" style={{ color: gabrielAccent.textMuted }}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {challengeDiscovery.challenge.quotes.map((q) => (
                    <QuoteLine key={q}>{q}</QuoteLine>
                  ))}
                </div>

                <p className="font-outfit text-base leading-[1.5]" style={{ color: gabrielAccent.textMuted }}>
                  {challengeDiscovery.challenge.transitionLine}
                </p>

                <NoteBox variant="blue" fontSize="18px">
                  {challengeDiscovery.challenge.designQuestion}
                </NoteBox>
              </LiquidReveal>

              {/* A Descoberta */}
              <LiquidReveal delay={0.1} className="flex flex-col gap-8">
                <span
                  className="font-outfit font-semibold text-xs uppercase"
                  style={{ color: 'var(--secundaria-500)', letterSpacing: '0.24px' }}
                >
                  {challengeDiscovery.discovery.eyebrow}
                </span>

                <div className="flex flex-col gap-6">
                  <h2 className="font-hanken font-semibold leading-[1.1] text-2xl" style={{ color: 'var(--text-strong)' }}>
                    {challengeDiscovery.discovery.title}
                  </h2>
                  <div className="flex flex-col gap-4">
                    {challengeDiscovery.discovery.paragraphs.map((p) => (
                      <p key={p} className="font-outfit text-base leading-[1.5]" style={{ color: gabrielAccent.textMuted }}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>

                <PrincipleList
                  items={challengeDiscovery.discovery.principles.map((p) => ({
                    ...p,
                    icon: principleIcons[p.icon as keyof typeof principleIcons],
                  }))}
                />

                <NoteBox variant="white" fontSize="16px">
                  {challengeDiscovery.discovery.closingNote}
                </NoteBox>
              </LiquidReveal>
            </div>
          </div>
        </section>

        {/* 04 — Briefing (nó 659:996). Card escuro em gradiente, sem
            divisor/eyebrow de seção externo — o card é a própria quebra
            visual (confirmado via MCP, igual ao Sona/Briefing). */}
        <section id="briefing" className="py-16">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <LiquidReveal>
              <DarkGradientCard>
                <p
                  className="font-outfit font-semibold text-xs uppercase mb-8"
                  style={{ color: gabrielAccent.darkCardEyebrow, letterSpacing: '0.24px' }}
                >
                  {briefing.eyebrow}
                </p>
                <LiquidReveal stagger className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
                  {briefing.items.map((item) => (
                    <DarkCardItem
                      key={item.title}
                      icon={briefingIcons[item.icon as keyof typeof briefingIcons]}
                      title={item.title}
                      body={item.body}
                      bodyColor={item.bodyColor === 'darkCardBodyFirst' ? gabrielAccent.darkCardBodyFirst : undefined}
                    />
                  ))}
                </LiquidReveal>
              </DarkGradientCard>
            </LiquidReveal>
          </div>
        </section>

        {/* 05 — A Principal Mudança (nó 595:1222). Card claro
            ANTES→DEPOIS + card de resultado, depois o mapa de 6 dúvidas.
            Gap interno 48px (exceção confirmada via MCP). */}
        <section id="mudanca" className="py-16">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col gap-12">
            <LiquidReveal>
              <div className="rounded-[20px] p-6 md:p-12 flex flex-col gap-8" style={{ background: gabrielAccent.subtleBg }}>
                <span className="font-outfit font-semibold text-xs uppercase" style={{ color: 'var(--secundaria-500)', letterSpacing: '0.24px' }}>
                  {mainChange.eyebrow}
                </span>
                <h2 className="font-outfit font-semibold text-2xl leading-8" style={{ color: 'var(--text-strong)' }}>
                  {mainChange.titleLine1}{' '}
                  <span style={{ color: 'var(--secundaria-500)' }}>{mainChange.titleLine2}</span>
                </h2>

                <div className="flex flex-wrap items-center justify-between gap-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center">
                      <div
                        className="bg-white rounded-2xl p-8 flex flex-col gap-3 items-center mr-[-8px]"
                        style={{ border: `1px solid ${gabrielAccent.cardBorderSoft}` }}
                      >
                        <p className="font-outfit font-semibold text-xs self-start" style={{ color: gabrielAccent.textMuted, letterSpacing: '0.24px' }}>
                          {mainChange.before.label}
                        </p>
                        {mainChange.before.steps.map((step, i) => (
                          <div key={step} className="flex flex-col items-center gap-2.5">
                            <p className="font-outfit font-medium text-sm whitespace-nowrap" style={{ color: gabrielAccent.textMuted }}>
                              {step}
                            </p>
                            {i < mainChange.before.steps.length - 1 && (
                              <span aria-hidden="true" className="text-sm" style={{ color: gabrielAccent.textMuted }}>↓</span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div
                        className="rounded-full flex items-center justify-center shrink-0 bg-white"
                        style={{ width: 64, height: 64, border: '1.5px solid var(--secundaria-500)' }}
                        aria-hidden="true"
                      >
                        <span className="text-[22px]" style={{ color: 'var(--secundaria-500)' }}>→</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-8 flex flex-col gap-3" style={{ border: `1px solid ${gabrielAccent.cardBorderSoft}` }}>
                      <p className="font-outfit font-semibold text-xs" style={{ color: 'var(--secundaria-500)', letterSpacing: '0.24px' }}>
                        {mainChange.after.label}
                      </p>
                      {mainChange.after.steps.map((step) => (
                        <div key={step.n} className="flex items-center gap-4 rounded-[10px] px-5 py-3.5">
                          <p className="font-outfit font-semibold text-sm" style={{ color: 'var(--secundaria-500)' }}>{step.n}</p>
                          <p className="font-outfit font-medium text-sm whitespace-nowrap" style={{ color: 'var(--text-strong)' }}>{step.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl pt-8 px-8 pb-16 flex flex-col gap-8" style={{ background: gabrielAccent.resultBg }}>
                    <p className="font-mono text-xs uppercase" style={{ color: gabrielAccent.resultLabel }}>
                      {mainChange.result.label}
                    </p>
                    <div className="flex flex-col gap-1">
                      <p className="font-hanken font-semibold text-5xl leading-none" style={{ color: 'rgba(0,100,140,0.1)' }} aria-hidden="true">
                        &ldquo;
                      </p>
                      <p className="font-hanken font-semibold text-2xl leading-[1.1] max-w-[314px]" style={{ color: 'var(--text-strong)' }}>
                        {mainChange.result.quoteBefore}
                        <span style={{ color: 'var(--secundaria-500)' }}>{mainChange.result.quoteHighlight}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </LiquidReveal>

            <LiquidReveal stagger className="flex flex-col gap-6">
              <p className="font-outfit font-semibold text-lg" style={{ color: 'var(--text-strong)' }}>
                {mainChange.sequenceTitle}
              </p>
              <div className="flex flex-col w-full">
                {mainChange.sequence.map((row, i) => (
                  <SequenceRow key={row.n} n={row.n} question={row.question} section={row.section} first={i === 0} />
                ))}
              </div>
            </LiquidReveal>
          </div>
        </section>

        {/* 06 — Decisões de Projeto (nó 595:1261). 2 capítulos com
            layouts diferentes — Decisão 02 inverte imagem/texto e usa
            object-fit:cover real. Gap interno 40px (exceção do briefing). */}
        <CaseSection id="decisoes" eyebrow={projectDecisions.eyebrow} contentClassName="mt-10">
          <LiquidReveal>
            <h2 className="font-hanken font-semibold leading-[1.1] text-2xl mb-10" style={{ color: 'var(--text-strong)' }}>
              {projectDecisions.intro}
            </h2>
          </LiquidReveal>

          <DecisionChapter
            eyebrow={projectDecisions.decision01.eyebrow}
            title={projectDecisions.decision01.title}
            subtitle={projectDecisions.decision01.subtitle}
            body={[
              { label: 'Problema', text: projectDecisions.decision01.problem },
              { label: 'Decisão', text: projectDecisions.decision01.decision },
            ]}
            image={projectDecisions.decision01.image}
            imageAlt={projectDecisions.decision01.imageAlt}
            imageAspect="640 / 440"
            imageWidth={640}
            imageHeight={440}
          />
          <DecisionChapter
            eyebrow={projectDecisions.decision02.eyebrow}
            title={projectDecisions.decision02.title}
            subtitle={projectDecisions.decision02.subtitle}
            body={[{ text: projectDecisions.decision02.problem }]}
            image={projectDecisions.decision02.image}
            imageAlt={projectDecisions.decision02.imageAlt}
            imageAspect="640 / 338"
            imageWidth={640}
            imageHeight={338}
            reverse
            bordered
            note={projectDecisions.decision02.note}
          />
        </CaseSection>

        {/* 07 — Identidade Visual (nó 653:982). 3 colunas: amostra +
            título + justificativa. */}
        <CaseSection id="identidade" eyebrow={identity.eyebrow}>
          <LiquidReveal className="flex flex-col gap-6 w-full lg:w-[760px]">
            <h2 className="font-hanken font-semibold leading-[1.1] text-[clamp(24px,3.4vw,32px)]" style={{ color: 'var(--text-strong)', letterSpacing: '-0.64px' }}>
              {identity.title}
            </h2>
            <p className="font-outfit text-base leading-[1.5] max-w-[620px]" style={{ color: gabrielAccent.textMuted }}>
              {identity.body}
            </p>
          </LiquidReveal>
          <LiquidReveal stagger className="mt-8 flex flex-col sm:flex-row gap-8">
            {identity.columns.map((col) => (
              <IdentityColumn key={col.title} title={col.title} body={col.body} swatches={col.swatches} typePair={col.typePair} />
            ))}
          </LiquidReveal>
        </CaseSection>

        {/* 08 — Da Estratégia à Interface (nó 648:982). Screenshot
            flutuante + 5 callouts, onda de liquid glass ao fundo
            (opacidade 70%, overflow:hidden na seção). padding-bottom
            96px (exceção confirmada via MCP).

            D10 (correção 02): a onda NÃO é mais ancorada no topo da
            seção — isso só reproduzia o Figma quando a seção tinha
            exatamente 865px (a altura do arquivo); qualquer variação de
            altura (quebra de título, padding responsivo, breakpoint)
            escorregava a onda pra baixo até sumir. Confirmado via MCP
            (nó 648:989, metadata): o card do screenshot vive em y=249
            dentro da seção, a onda em y=0 — deslocamento fixo de
            -249px/-120px entre os dois. Reancorada dentro do container
            "Composição" (que embrulha o card), não da seção: onde quer
            que esse container caia verticalmente (independente da
            altura do título acima), a onda cai junto, sempre no mesmo
            deslocamento relativo ao card. Largura em vw (não % do
            container) pra continuar proporcional à seção/viewport, não
            ao card de 800px.

            D11 (correção 02): abaixo de lg a onda some (escolhi ocultar,
            não reposicionar em fluxo — um elemento decorativo bleeding
            de 1610px não fecha bem em nenhuma largura de mobile/tablet
            sem arriscar encostar nos callouts; a regra do projeto é
            vidro nunca sobre texto, perder o enfeite é a opção mais
            segura). Confirmado que a composição da seção 12 não tem o
            mesmo risco — ela já é um item de fluxo, nunca absolute,
            sempre depois do texto no mobile. */}
        {/* E2 (correção 03): eyebrow/título lavados — causa era stacking
            implícito (position sem z-index explícito + motion.div do
            LiquidReveal, que pode isolar seu próprio contexto de
            empilhamento via transform/opacity do Framer Motion,
            deixando a ordem final ambígua). isolate no container cria
            UM contexto de empilhamento comum pra tudo dentro dele
            (inclusive a onda, aninhada mais fundo, dentro de
            "Composição"), e -z-10 explícito na onda garante que ela
            pinta abaixo de qualquer outro conteúdo desse contexto,
            sem depender de ordem de DOM. */}
        <section className="relative overflow-hidden pt-16 pb-24">
          <div className="relative isolate max-w-[1200px] mx-auto px-4 md:px-8">
            <LiquidReveal>
              <div className="border-t pt-6 md:pt-8" style={{ borderColor: gabrielAccent.divider }}>
                <span className="block font-outfit font-semibold text-xs uppercase" style={{ color: 'var(--secundaria-500)', letterSpacing: '0.24px' }}>
                  {strategyToInterface.eyebrow}
                </span>
              </div>
            </LiquidReveal>
            <LiquidReveal delay={0.05}>
              <h2 className="mt-8 font-hanken font-semibold leading-[1.1] text-[clamp(24px,3.4vw,32px)] max-w-[760px]" style={{ color: 'var(--text-strong)', letterSpacing: '-0.64px' }}>
                {strategyToInterface.title}
              </h2>
            </LiquidReveal>
            {/* Mobile empilha texto antes de imagem (regra do briefing) —
                no Figma a imagem vem antes visualmente (desktop, lg:), a
                ordem no DOM é invertida via order-* pra achar as duas
                coisas ao mesmo tempo. */}
            <div className="relative mt-8 flex flex-col lg:flex-row gap-8 items-start">
              <img
                src="/gabriel-liquid-wave.png"
                alt=""
                width={1610}
                height={1610}
                loading="lazy"
                aria-hidden="true"
                className="hidden lg:block pointer-events-none absolute -z-10 opacity-70"
                style={{ left: -120, top: -249, width: '111.8vw', height: 'auto', aspectRatio: '1 / 1', maxWidth: 'none' }}
              />
              {/* relative: garante que o card pinte acima da onda (irmãs
                  absolute/relative pintam por ordem de DOM; sem isso um
                  item de flex não-posicionado pintaria por baixo dela
                  mesmo vindo depois no DOM). */}
              <LiquidReveal delay={0.1} className="relative order-2 lg:order-1 w-full lg:w-[800px] shrink-0">
                <div
                  className="rounded-[20px] overflow-hidden border"
                  style={{ borderColor: gabrielAccent.cardBorder, boxShadow: '0px 24px 30px 0px rgba(12,26,34,0.1)', aspectRatio: '800 / 520' }}
                >
                  <img
                    src={strategyToInterface.image}
                    alt={strategyToInterface.imageAlt}
                    width={800}
                    height={520}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </LiquidReveal>
              <LiquidReveal stagger delay={0.15} className="relative order-1 lg:order-2 flex flex-col gap-6 w-full lg:w-[368px]">
                {strategyToInterface.callouts.map((c) => (
                  <CalloutDot key={c}>{c}</CalloutDot>
                ))}
              </LiquidReveal>
            </div>
          </div>
        </section>

        {/* 09 — Do Figma ao Navegador (nó 649:982). Texto + grade 2×2 de
            atributos, gap de 80px entre colunas (exceção confirmada via
            MCP). */}
        <CaseSection id="implementacao" eyebrow={figmaToBrowser.eyebrow}>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
            <LiquidReveal className="flex flex-col gap-6 w-full lg:w-[540px] shrink-0">
              <h2 className="font-hanken font-semibold leading-[1.1] text-[clamp(24px,3.4vw,32px)]" style={{ color: 'var(--text-strong)', letterSpacing: '-0.64px' }}>
                {figmaToBrowser.title}
              </h2>
              <p className="font-outfit text-base leading-[1.5]" style={{ color: gabrielAccent.textMuted }}>
                {figmaToBrowser.body}
              </p>
            </LiquidReveal>
            <LiquidReveal stagger className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {figmaToBrowser.attributes.map((a) => (
                <AttributeItem key={a.title} title={a.title} body={a.body} />
              ))}
            </LiquidReveal>
          </div>
        </CaseSection>

        {/* 10 — Resultado (nó 649:1011). Dois painéis de mesma largura —
            "rebaixado" (fundo plano) × "elevado" (borda + sombra). */}
        <CaseSection id="resultado" eyebrow={result.eyebrow}>
          <LiquidReveal>
            <h2 className="font-hanken font-semibold leading-[1.1] text-[clamp(24px,3.4vw,32px)] max-w-[760px]" style={{ color: 'var(--text-strong)', letterSpacing: '-0.64px' }}>
              {result.title}
            </h2>
          </LiquidReveal>
          <LiquidReveal stagger className="mt-8 flex flex-col md:flex-row gap-8">
            <div className="flex-1 rounded-2xl p-8 flex flex-col gap-8" style={{ background: gabrielAccent.subtleBg }}>
              <p className="font-outfit font-semibold text-xs leading-none uppercase" style={{ color: gabrielAccent.textSubtle, letterSpacing: '0.26px' }}>
                {result.technical.label}
              </p>
              <div className="flex gap-6">
                {result.technical.stats.map((s) => (
                  <div key={s.label} className="flex-1 flex flex-col gap-2">
                    <p className="font-hanken font-semibold leading-[1.1] text-6xl" style={{ color: 'var(--secundaria-500)', letterSpacing: '-1.92px' }}>
                      {s.value}
                    </p>
                    <p className="font-outfit text-sm" style={{ color: gabrielAccent.textMuted }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="flex-1 rounded-2xl p-8 flex flex-col gap-6 bg-white"
              style={{ border: `1px solid ${gabrielAccent.cardBorder}`, boxShadow: '0px 16px 40px 0px rgba(12,26,34,0.08)' }}
            >
              <p className="font-outfit font-semibold text-xs" style={{ color: 'var(--secundaria-500)', letterSpacing: '0.24px' }}>
                {result.design.label}
              </p>
              <ul className="flex flex-col gap-6">
                {result.design.items.map((item) => (
                  <li key={item} className="font-outfit text-base leading-[1.5]" style={{ color: 'var(--text-strong)' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </LiquidReveal>
        </CaseSection>

        {/* 11 — Próximo Passo (nó 650:982). Explicitamente prospectivo —
            "métricas que seriam acompanhadas", não resultado obtido. */}
        <CaseSection id="proximo-passo" eyebrow={nextStep.eyebrow}>
          <LiquidReveal className="flex flex-col gap-4 max-w-[760px]">
            <h2 className="font-hanken font-semibold leading-[1.1] text-[clamp(24px,3.4vw,32px)]" style={{ color: 'var(--text-strong)', letterSpacing: '-0.64px' }}>
              {nextStep.title}
            </h2>
            <p className="font-outfit text-base leading-[1.5]" style={{ color: gabrielAccent.textMuted }}>
              {nextStep.lead}
            </p>
          </LiquidReveal>
          <LiquidReveal stagger className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nextStep.metrics.map((m) => (
              <div key={m.n} className="flex flex-col gap-3">
                <p className="font-outfit font-semibold text-xs" style={{ color: 'var(--secundaria-500)', letterSpacing: '0.24px' }}>{m.n}</p>
                <p className="font-outfit font-semibold text-base" style={{ color: 'var(--text-strong)' }}>{m.title}</p>
                <p className="font-outfit text-sm leading-[1.5]" style={{ color: gabrielAccent.textMuted }}>{m.body}</p>
              </div>
            ))}
          </LiquidReveal>
          <LiquidReveal delay={0.1} className="mt-8">
            <NoteBox variant="blue" textColor={gabrielAccent.noteBlueAlt} fontSize="14px" className="inline-block w-auto px-5 py-4">
              {nextStep.note}
            </NoteBox>
          </LiquidReveal>
        </CaseSection>

        {/* 12 — Aprendizado (nó 650:1010). Última seção — nada depois
            além do footer. Composição de vidro (assests 7 → renomeado
            gabriel-liquid-composition.png) implementada via flex, não
            pixel absoluto do Figma — os dois extratores MCP discordavam
            na posição vertical (ver B0); ajustado visualmente. */}
        <section id="aprendizado" className="relative overflow-hidden pt-24 pb-32">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <LiquidReveal>
              <div className="border-t pt-6 md:pt-8" style={{ borderColor: gabrielAccent.divider }}>
                <span className="block font-outfit font-semibold text-xs uppercase" style={{ color: 'var(--secundaria-500)', letterSpacing: '0.24px' }}>
                  {learning.eyebrow}
                </span>
              </div>
            </LiquidReveal>

            <div className="mt-12 flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex flex-col gap-12 w-full lg:w-[720px] shrink-0">
                <LiquidReveal className="flex flex-col gap-8">
                  <h2 className="font-hanken font-semibold leading-[1.1] text-[clamp(32px,4.4vw,48px)]" style={{ color: 'var(--text-strong)', letterSpacing: '-0.96px' }}>
                    {learning.title}
                  </h2>
                  <p className="font-outfit text-lg leading-[1.5] max-w-[680px]" style={{ color: gabrielAccent.textMuted }}>
                    {learning.body}
                  </p>
                </LiquidReveal>
                <LiquidReveal delay={0.1} className="flex flex-col gap-5 pt-10">
                  <span className="block h-0.5 w-16" style={{ background: 'var(--secundaria-500)' }} aria-hidden="true" />
                  <p className="font-outfit text-base leading-[1.5]" style={{ color: gabrielAccent.textMuted }}>
                    {learning.leadIn}
                  </p>
                  <p className="font-hanken font-semibold leading-[1.1] text-[clamp(24px,3vw,32px)]" style={{ color: gabrielAccent.noteBlueAlt, letterSpacing: '-0.64px' }}>
                    {learning.question}
                  </p>
                </LiquidReveal>
              </div>

              <motion.div
                className="flex-1 flex justify-center lg:justify-end w-full"
                initial={shouldReduceMotion ? undefined : { opacity: 0 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
                viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <img
                  src="/gabriel-liquid-composition.png"
                  alt=""
                  width={620}
                  height={620}
                  loading="lazy"
                  aria-hidden="true"
                  className="w-full max-w-[420px] lg:max-w-[500px] h-auto"
                  style={{ opacity: 0.9, transform: 'rotate(-24.7deg)' }}
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <LiquidFooter />
    </div>
  )
}
