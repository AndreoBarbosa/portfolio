import {
  PenLine, Lightbulb, SlidersHorizontal, Handshake,
  Flag, Users, Target, UserCog, Layers,
  Layers as LayersIcon, CircleHelp, Brain, ShieldAlert,
  Bell, Compass, PersonStanding,
  Zap, ShieldCheck, MessageCircleQuestion, Eye,
  Navigation, Code2, ChartNoAxesCombined, GalleryHorizontal,
  UserCheck, Clock, MessagesSquare, FlaskConical, CalendarClock,
  Search, ArrowLeftRight, Check,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import '../styles/liquid-glass.css'
import LiquidHeader from '../components/liquid/LiquidHeader'
import LiquidFooter from '../components/liquid/LiquidFooter'
import LiquidReveal from '../components/liquid/LiquidReveal'
import SonaSection from '../components/case-sona/SonaSection'
import SonaHeading from '../components/case-sona/SonaHeading'
import IconCard from '../components/case-sona/IconCard'
import IconCallout from '../components/case-sona/IconCallout'
import QuestionChip from '../components/case-sona/QuestionChip'
import DarkPanel from '../components/case-sona/DarkPanel'
import CaseImage from '../components/case-sona/CaseImage'
import NumberedListItem from '../components/case-sona/NumberedListItem'
import HypothesisCard from '../components/case-sona/HypothesisCard'
import BorderedCard from '../components/case-sona/BorderedCard'
import EvidenceTable from '../components/case-sona/EvidenceTable'
import DecisionPanel from '../components/case-sona/DecisionPanel'
import DecisionCard from '../components/case-sona/DecisionCard'
import ContrastPair from '../components/case-sona/ContrastPair'
import MiniCard from '../components/case-sona/MiniCard'
import StatItem from '../components/case-sona/StatItem'
import IconRow from '../components/case-sona/IconRow'
import NextStepCard from '../components/case-sona/NextStepCard'
import InvestigationStrip from '../components/case-sona/InvestigationStrip'
import { caseLabelStyle } from '../components/case-sona/CaseLabel'
import usePageMeta from '../hooks/usePageMeta'
import {
  hero, overview, challenge, briefing, research, mainDecision, evidence, priorityDecision, principles,
  prototyping, designSystem, consistency, result, conceptToReality, nextSteps, learning,
  PROTOTYPE_URL, FIGMA_URL,
} from '../data/sona'

const IMG = '/projects/sona'

const overviewIcons = { PenLine, Lightbulb, SlidersHorizontal, Handshake }
const briefingIcons = { Flag, Users, Target, UserCog, Layers }
const evidenceIcons = { Layers: LayersIcon, CircleHelp, Brain, ShieldAlert }
const enteredIcons = { Bell, Compass, PersonStanding }
const principleIcons = { Zap, ShieldCheck, MessageCircleQuestion, Eye }
const prototypingIcons = { Zap, ShieldCheck, MessageCircleQuestion }
const realityIcons = { Navigation, Code2, ChartNoAxesCombined, GalleryHorizontal }
const nextStepIcons = { UserCheck, ShieldCheck, Users, Clock }
const investigationIcons = { MessagesSquare, Users, FlaskConical, CalendarClock }
const learningIcons = { Search, ArrowLeftRight, Check }

const EASE = [0.16, 1, 0.3, 1] as const

export default function CaseSona() {
  usePageMeta({
    title: 'Sona — Planejador financeiro orientado por decisões · Andreo Barbosa',
    description: hero.body,
    ogImage: `${IMG}/1 - HERO.webp`,
  })

  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="liquid-root min-h-screen">
      <LiquidHeader activeSection={null} basePath="/" />

      <main id="conteudo">
        {/* S02 — Hero. LCP: imagem sem lazy, entrada no load (não no
            scroll) — eyebrow → título → parágrafo → botões em sequência
            curta, mockup em paralelo. Ver B1 §5. */}
        <section id="hero" className="pt-32 md:pt-40 pb-16 md:pb-20">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              {/* R4.2 (Ajustes 03): gap eyebrow→h1 confirmado via get_metadata
                  (nós 577:2019 → 577:2020, dentro de "Hero Left") = 24px
                  exatos. Mesma causa do bug do "BRIEFING" (R0): o
                  margin:0 de caseLabelStyle matava a mb-4 que já estava
                  no motion.p (e 16px seria o valor errado de qualquer
                  forma). Margem movida pro wrapper. */}
              <motion.div
                className="mb-6"
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p style={caseLabelStyle('section')}>{hero.eyebrow}</p>
              </motion.div>
              <motion.div
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
              >
                <SonaHeading as="h1" size="hero">
                  {hero.title}
                </SonaHeading>
              </motion.div>
              <motion.p
                className="mt-6 font-outfit text-base leading-[1.6] max-w-[46ch]"
                style={{ color: 'var(--text-body)' }}
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
                {/* R4.1 (Ajustes 03): a sombra sob o botão era
                    box-shadow: var(--glass-shadow) da classe
                    .liquid-btn-primary (componente LiquidButton) — estilo
                    de glass card, não de botão de hero. O Figma (nó
                    577:2024) não tem sombra: fundo sólido, borda creme.
                    Trocado pro mesmo padrão que o hero da Home já usa
                    (LiquidHero.tsx: <a> cru com liquid-hero-btn-primary/
                    secondary), em vez de alterar a classe compartilhada
                    .liquid-btn-primary (usada pelo Design System
                    Showcase) ou o componente LiquidButton. */}
                <a
                  href={PROTOTYPE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-hero-btn-primary liquid-type-btn inline-flex items-center gap-2 px-8 py-3"
                >
                  {hero.primaryCta.label} <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={FIGMA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-hero-btn-secondary liquid-type-btn inline-flex items-center gap-2 px-8 py-3"
                >
                  {hero.secondaryCta.label}
                </a>
              </motion.div>
            </div>
            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.03 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            >
              <CaseImage
                src={`${IMG}/1 - HERO.webp`}
                alt="Três telas do app Sona: home com diagnóstico financeiro, tela de metas com progresso e tela de nova meta"
                width={1120}
                height={728}
                priority
                frame={false}
              />
            </motion.div>
          </div>
        </section>

        {/* S03 — Visão Geral */}
        <SonaSection id="visao-geral" eyebrow={overview.eyebrow}>
          <LiquidReveal className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <SonaHeading>{overview.title}</SonaHeading>
            <p className="font-outfit text-base leading-[1.5] self-start" style={{ color: 'var(--text-body)' }}>
              {overview.body}
            </p>
          </LiquidReveal>
          {/* R5 (Ajustes 03): mt-14 (56px) → mt-8 (32px). Head Row →
              Feature Grid no Figma (nó 577:2037) = 32px exatos. */}
          <LiquidReveal stagger className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {overview.features.map((f) => (
              <IconCard
                key={f.title}
                icon={overviewIcons[f.icon as keyof typeof overviewIcons]}
                title={f.title}
                body={f.body}
              />
            ))}
          </LiquidReveal>
        </SonaSection>

        {/* S04 — O Desafio */}
        <SonaSection id="desafio" eyebrow={challenge.eyebrow}>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <LiquidReveal>
              <SonaHeading>{challenge.title}</SonaHeading>
              {/* R5 (Ajustes 03): mt-10 (40px) → mt-16 (64px). Título →
                  imagem antes/depois no Figma (nó 577:2057) = 64px. */}
              <div className="mt-16">
                <CaseImage
                  src={challenge.beforeAfterImage}
                  alt={challenge.beforeAfterAlt}
                  width={1139}
                  height={384}
                  frame={false}
                />
              </div>
            </LiquidReveal>
            <LiquidReveal delay={0.1} className="flex flex-col gap-6">
              {challenge.paragraphs.map((p) => (
                <p key={p} className="font-outfit text-base leading-[1.5]" style={{ color: 'var(--text-body)' }}>
                  {p}
                </p>
              ))}
              <div className="flex flex-wrap gap-2">
                {challenge.chips.map((chip) => (
                  <QuestionChip key={chip}>{chip}</QuestionChip>
                ))}
              </div>
              <p className="font-outfit text-base" style={{ color: 'var(--text-body)' }}>
                {challenge.changedQuestionLabel}
              </p>
              <IconCallout>{challenge.callout}</IconCallout>
            </LiquidReveal>
          </div>
        </SonaSection>

        {/* S05 — Briefing. Painel escuro autocontido: o eyebrow "BRIEFING"
            vive dentro do próprio card (confirmado via get_design_context,
            nó 577:2098) — não há régua/eyebrow branco acima, diferente do
            padrão das outras seções. */}
        <section id="briefing" className="pb-20 md:pb-32">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <LiquidReveal>
              <DarkPanel
                title={briefing.eyebrow}
                cols={5}
                items={briefing.items.map((item) => ({
                  icon: briefingIcons[item.icon as keyof typeof briefingIcons],
                  title: item.title,
                  body: item.body,
                }))}
              />
            </LiquidReveal>
          </div>
        </section>

        {/* S06 — Pesquisa e Descoberta */}
        <SonaSection id="pesquisa" eyebrow={research.eyebrow}>
          <LiquidReveal className="max-w-[68ch]">
            <SonaHeading>{research.title}</SonaHeading>
            <p className="mt-6 font-outfit text-base leading-[1.5]" style={{ color: 'var(--text-body)' }}>
              {research.body}
            </p>
          </LiquidReveal>
          <div className="mt-10 grid lg:grid-cols-[1fr_378px] gap-10 items-start">
            <div>
              {/* B5 (Ajustes 02) + R2.3 (Ajustes 03): "O que a pesquisa
                  revelou:" — nó 585:3639 no Figma, elemento que faltava
                  (ausência reportada). String literal do nó: "O que a
                  pesquisa revelou :   " (espaço antes dos dois-pontos e
                  espaços à direita — artefato de autoria, não copy real;
                  usando a forma limpa). Tipografia real do nó: Outfit
                  SemiBold 16px, #3B3F46 — NÃO é mono (revertido no R2.3;
                  o Ajustes 02 tinha essa parte errada). */}
              <LiquidReveal>
                <p className="font-outfit font-semibold text-base mb-6" style={{ color: '#3B3F46' }}>
                  O que a pesquisa revelou:
                </p>
              </LiquidReveal>
              <LiquidReveal stagger className="flex flex-col gap-3">
                {research.list.map((item) => (
                  <NumberedListItem key={item.n} n={item.n} title={item.title} body={item.body} />
                ))}
              </LiquidReveal>
            </div>
            <LiquidReveal delay={0.15}>
              <HypothesisCard
                label={research.hypothesis.label}
                question={research.hypothesis.question}
                answer={research.hypothesis.answer}
              />
            </LiquidReveal>
          </div>
        </SonaSection>

        {/* S07 — A Principal Decisão do Projeto */}
        <SonaSection id="decisao-principal" eyebrow={mainDecision.eyebrow}>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <LiquidReveal>
              <SonaHeading>{mainDecision.title}</SonaHeading>
              <div className="mt-6 flex flex-col gap-4">
                {mainDecision.paragraphs.map((p) => (
                  <p key={p} className="font-outfit text-base leading-[1.5]" style={{ color: 'var(--text-body)' }}>
                    {p}
                  </p>
                ))}
              </div>
            </LiquidReveal>
            <CaseImage
              src={mainDecision.image}
              alt={mainDecision.imageAlt}
              width={1000}
              height={622}
              frame={false}
            />
          </div>
        </SonaSection>

        {/* S08 + S09 + S10 — mesma seção Figma (sem eyebrow própria, uma
            única régua no topo: nó 577:2155). Tabela de evidências →
            priorização/decisão → princípios (painel escuro). */}
        <section id="decisoes-produto" className="py-20 md:py-32">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <LiquidReveal>
              <div className="border-t pt-6 md:pt-8" style={{ borderColor: 'var(--surface-2)' }} />
            </LiquidReveal>

            {/* A7: sem max-w — no Figma (nó 577:2158) título e corpo usam a
                largura cheia da seção (1200px), não uma coluna de leitura
                estreita. O max-w-[68ch] que estava aqui não vem do Figma
                e forçava uma quebra a mais na primeira linha do título. */}
            {/* R5 (Ajustes 03): removido o mt-6/md:mt-10 daqui. Essa seção
                não tem eyebrow própria (nó 577:2155) — o pt-6/md:pt-8 da
                régua acima já é o gap completo até o título (32px no
                Figma). O mt-10 extra empilhava por cima e somava ~72px
                renderizados (confirmado via screenshot, ~76px), quase o
                dobro do valor real. */}
            <LiquidReveal>
              <SonaHeading>
                {evidence.titleLine1}
                <br />
                {evidence.titleLine2}
                <span style={{ color: '#355972' }}>{evidence.titleHighlight}</span>
              </SonaHeading>
              <p className="mt-6 max-w-[68ch] font-outfit text-base leading-[1.5]" style={{ color: 'var(--text-body)' }}>
                {evidence.body}
              </p>
            </LiquidReveal>

            <div className="mt-10">
              <EvidenceTable
                columns={evidence.columns as [string, string, string]}
                rows={evidence.rows.map((r) => ({
                  ...r,
                  icon: evidenceIcons[r.icon as keyof typeof evidenceIcons],
                }))}
              />
            </div>

            <LiquidReveal stagger className="mt-16 grid md:grid-cols-2 gap-8">
              <BorderedCard title={priorityDecision.priority.title}>
                <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid #EEF0F2`, background: '#FFFFFF' }}>
                  <CaseImage
                    src={priorityDecision.priority.image}
                    alt={priorityDecision.priority.imageAlt}
                    width={1120}
                    height={768}
                    frame={false}
                  />
                </div>
              </BorderedCard>
              <BorderedCard title={priorityDecision.decision.title}>
                <DecisionPanel
                  entered={{
                    label: priorityDecision.decision.entered.label,
                    items: priorityDecision.decision.entered.items.map((i) => ({
                      ...i,
                      icon: enteredIcons[i.icon as keyof typeof enteredIcons],
                    })),
                  }}
                  excluded={priorityDecision.decision.excluded}
                />
              </BorderedCard>
            </LiquidReveal>

            <div className="mt-16">
              <DarkPanel
                title={principles.title}
                variant="boxed"
                cols={4}
                items={principles.items.map((item) => ({
                  icon: principleIcons[item.icon as keyof typeof principleIcons],
                  title: item.title,
                  body: item.body,
                }))}
              />
            </div>
          </div>
        </section>

        {/* S11 — Design e Prototipação */}
        <SonaSection id="prototipacao" eyebrow={prototyping.eyebrow}>
          <LiquidReveal className="max-w-[68ch]">
            <SonaHeading>{prototyping.title}</SonaHeading>
          </LiquidReveal>
          {/* B6: items-stretch explícito — é o default do CSS grid, mas
              declarado pra não depender de "ninguém mudar sem perceber". */}
          {/* R5 (Ajustes 03): mt-10 (40px) → mt-8 (32px). Título → cards
              no Figma (nó 577:2303) = 32px. */}
          <LiquidReveal stagger className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {prototyping.cards.map((card) => (
              <DecisionCard
                key={card.title}
                icon={prototypingIcons[card.icon as keyof typeof prototypingIcons]}
                title={card.title}
                problem={card.problem}
                decision={card.decision}
                impact={card.impact}
                image={card.image}
                imageWidth={card.imageDims.width}
                imageHeight={card.imageDims.height}
              />
            ))}
          </LiquidReveal>
          {/* R5 (Ajustes 03): mt-6 (24px) → mt-8 (32px). Cards → regra do
              sistema no Figma (nó 577:2303) = 32px. */}
          <LiquidReveal delay={0.1} className="mt-8 flex items-center gap-3 rounded-xl px-5 py-4 bg-[#F7F8F9]">
            <span className="w-5 h-5 rounded-full shrink-0" style={{ background: '#628E70' }} aria-hidden="true" />
            <p className="font-outfit font-medium text-[13px] leading-[1.5]" style={{ color: 'var(--text-strong)' }}>
              {prototyping.systemRule}
            </p>
          </LiquidReveal>
        </SonaSection>

        {/* S12 — Design System (+ S13 sub-bloco "Consistência para escalar
            com qualidade", mesma seção Figma, sem régua própria entre os
            dois). */}
        <SonaSection id="design-system" eyebrow={designSystem.eyebrow}>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <LiquidReveal>
              <SonaHeading>{designSystem.title}</SonaHeading>
              <div className="mt-6 flex flex-col gap-4">
                {designSystem.paragraphs.map((p) => (
                  <p key={p} className="font-outfit text-base leading-[1.5]" style={{ color: 'var(--text-body)' }}>
                    {p}
                  </p>
                ))}
              </div>
            </LiquidReveal>
            <LiquidReveal delay={0.1} className="flex flex-col gap-6">
              <ContrastPair before={designSystem.contrast.before} after={designSystem.contrast.after} />
              <IconCallout>
                Uma única alteração passou a beneficiar <strong>todas as telas atuais e futuras.</strong>
              </IconCallout>
            </LiquidReveal>
          </div>

          {/* R5 (Ajustes 03): md:mt-20 (80px) → md:mt-16 (64px, igual ao
              mobile). Bloco de contraste → "Consistência..." no Figma
              (nó 577:2359) = 64px. */}
          <div className="mt-16">
            <LiquidReveal>
              {/* R5: mb-8 (32px) → mb-6 (24px). Título → cards = 24px. */}
              <p className="font-outfit font-semibold text-lg mb-6" style={{ color: 'var(--text-strong)' }}>
                {consistency.title}
              </p>
            </LiquidReveal>
            <LiquidReveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MiniCard label={consistency.colorTokens.label}>
                <div className="flex flex-col gap-4">
                  {consistency.colorTokens.items.map((item) => (
                    <div key={item.title} className="flex items-center gap-3">
                      <span className="w-11 h-11 rounded-full shrink-0" style={{ background: item.swatch }} aria-hidden="true" />
                      <div>
                        <p className="font-outfit font-semibold text-sm" style={{ color: 'var(--text-strong)' }}>
                          {item.title}
                        </p>
                        <p className="font-outfit text-xs" style={{ color: 'var(--text-faint)' }}>
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </MiniCard>

              <MiniCard label={consistency.typography.label}>
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-14 h-14 rounded-xl shrink-0" style={{ background: 'rgba(168,168,168,0.13)' }}>
                    <span className="font-outfit text-2xl" style={{ color: 'var(--text-strong)' }}>Aa</span>
                  </span>
                  <span className="font-outfit text-xl" style={{ color: 'var(--text-strong)' }}>{consistency.typography.family}</span>
                </div>
                <div className="flex flex-col gap-3">
                  {consistency.typography.rows.map((row) => (
                    <div key={row.role} className="flex items-center gap-2">
                      <span className="font-hanken font-semibold w-11" style={{ color: 'var(--text-strong)' }}>{row.role}</span>
                      <span className="font-outfit text-sm" style={{ color: 'var(--text-faint)' }}>{row.spec}</span>
                    </div>
                  ))}
                </div>
              </MiniCard>

              <MiniCard label={consistency.goalIcons.label}>
                <img
                  src={consistency.goalIcons.image}
                  alt={consistency.goalIcons.imageAlt}
                  width={consistency.goalIcons.dims.width}
                  height={consistency.goalIcons.dims.height}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </MiniCard>

              <MiniCard label={consistency.components.label}>
                <img
                  src={consistency.components.image}
                  alt={consistency.components.imageAlt}
                  width={consistency.components.dims.width}
                  height={consistency.components.dims.height}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </MiniCard>
            </LiquidReveal>
          </div>

          {/* R5 (Ajustes 03): mt-10 (40px) → mt-8 (32px). Cards → callout
              de fechamento no Figma (nó 577:2359) = 32px. */}
          <LiquidReveal delay={0.1} className="mt-8">
            <IconCallout>{consistency.closing}</IconCallout>
          </LiquidReveal>
        </SonaSection>

        {/* S14 — Resultado do Projeto */}
        <SonaSection id="resultado" eyebrow={result.eyebrow}>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <LiquidReveal>
              <SonaHeading>{result.title}</SonaHeading>
              {/* R5 (Ajustes 03): mt-6 (24px) → mt-4 (16px). Título →
                  parágrafo no Figma (nó 577:2495) = 16px. */}
              <p className="mt-4 font-outfit text-base leading-[1.5] max-w-[52ch]" style={{ color: 'var(--text-body)' }}>
                {result.body}
              </p>
            </LiquidReveal>
            <LiquidReveal stagger delay={0.1} className="grid grid-cols-2 gap-x-8 gap-y-10">
              {result.stats.map((s) => (
                <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </LiquidReveal>
          </div>
        </SonaSection>

        {/* S15 — Do Conceito à Realidade */}
        <SonaSection id="realidade" eyebrow={conceptToReality.eyebrow}>
          {/* A7: colunas assimétricas no Figma (nó 577:2518) — texto 473px,
              imagem 663px — não 50/50. fr ratio não bastou: o padding do
              container (px-4 md:px-8) tira ~64px da largura de conteúdo
              vs. o total de 1200px do Figma, então a coluna de texto
              ainda ficava estreita demais. Largura fixa reproduz o valor
              real do Figma independente desse padding. */}
          {/* B7 (Ajustes 02): items-center só nesta seção — imagem
              centralizada em relação à coluna de texto. Não mexi nas
              outras seções de 2 colunas (S02, S07, S12, S17). */}
          <div className="grid lg:grid-cols-[473px_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <LiquidReveal>
                <SonaHeading>{conceptToReality.title}</SonaHeading>
                <p className="mt-6 font-outfit text-lg" style={{ color: 'var(--text-strong)' }}>
                  {conceptToReality.lead}
                </p>
                {/* R5 (Ajustes 03): mt-3 (12px) → mt-6 (24px). Lead →
                    corpo no Figma (nó 577:2519) = 24px. */}
                <p className="mt-6 font-outfit text-base leading-[1.5]" style={{ color: 'var(--text-body)' }}>
                  {conceptToReality.body}
                </p>
              </LiquidReveal>
              {/* R5 (Ajustes 03): mt-4 (16px) → mt-6 (24px). Corpo → lista
                  de itens no Figma (nó 577:2519) = 24px. */}
              <LiquidReveal stagger className="mt-6 flex flex-col divide-y divide-[color:var(--surface-2)]">
                {conceptToReality.items.map((item) => (
                  <IconRow
                    key={item.title}
                    icon={realityIcons[item.icon as keyof typeof realityIcons]}
                    title={item.title}
                    body={item.body}
                  />
                ))}
              </LiquidReveal>
              <LiquidReveal delay={0.1} className="mt-6 max-w-[395px]">
                <IconCallout>{conceptToReality.closing}</IconCallout>
              </LiquidReveal>
            </div>
            <div>
              {/* Composição já traz as 2 telas + as 3 anotações vermelhas
                  conectadas por linha pontilhada, exportada do Figma como
                  uma peça só — ver nota em data/sona.ts. */}
              <CaseImage
                src={conceptToReality.image}
                alt={conceptToReality.imageAlt}
                width={conceptToReality.imageDims.width}
                height={conceptToReality.imageDims.height}
                frame={false}
              />
            </div>
          </div>
        </SonaSection>

        {/* S16 — Próximos Passos */}
        <SonaSection id="proximos-passos" eyebrow={nextSteps.eyebrow}>
          <LiquidReveal>
            <SonaHeading>{nextSteps.title}</SonaHeading>
            {/* R5 (Ajustes 03): mt-6 (24px) → mt-12 (48px). Título → bloco
                de leads no Figma (nó 577:2601) = 48px. */}
            <p className="mt-12 font-outfit font-semibold text-base" style={{ color: 'var(--text-strong)' }}>
              {nextSteps.lead}
            </p>
            {/* R5: mt-1 (4px) → mt-3 (12px). Lead → sub-lead = 12px. */}
            <p className="mt-3 font-outfit text-base" style={{ color: 'var(--text-body)' }}>
              {nextSteps.subLead}
            </p>
          </LiquidReveal>

          {/* R5 (Ajustes 03): mt-14 (56px) → mt-8 (32px). Sub-lead → grid
              de cards no Figma (nó 577:2601) = 32px. */}
          <LiquidReveal stagger className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nextSteps.cards.map((card) => (
              <NextStepCard
                key={card.title}
                icon={nextStepIcons[card.icon as keyof typeof nextStepIcons]}
                title={card.title}
                body={card.body}
              />
            ))}
          </LiquidReveal>

          {/* R5 (Ajustes 03): NÃO CORRIGIDO — reportado, não ajustado.
              O Figma (nó 577:2601, Frame 398) mede gap = 0px entre a
              linha de cards e a faixa "Como investigaria" (elas ficam
              encostadas; a separação visual vem das linhas conectoras
              verticais entre os dois blocos, não de espaço em branco).
              Isso diverge tanto do mt-10 atual (40px) que prefiro
              confirmar antes de zerar — pode ser leitura errada da
              hierarquia do nó da minha parte. Mantido como está. */}
          <LiquidReveal delay={0.1} className="mt-10">
            <InvestigationStrip
              label={nextSteps.investigationLabel}
              items={nextSteps.investigation.map((i) => ({
                ...i,
                icon: investigationIcons[i.icon as keyof typeof investigationIcons],
              }))}
            />
          </LiquidReveal>
        </SonaSection>

        {/* S17 — Aprendizado (última seção da página; sem CTA extra além
            do footer global, conforme o mapa do briefing). */}
        <SonaSection id="aprendizado" eyebrow={learning.eyebrow} className="pb-24 md:pb-32">
          {/* A7: colunas assimétricas no Figma (nó 577:2685) — texto 696px,
              imagem 440px — não 50/50. Largura fixa pelo mesmo motivo do
              S15 (fr ratio não compensava o padding do container). */}
          <div className="grid lg:grid-cols-[696px_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <LiquidReveal>
                <SonaHeading>{learning.title}</SonaHeading>
              </LiquidReveal>
              <LiquidReveal stagger className="mt-6 flex flex-col divide-y divide-[color:var(--surface-2)]">
                {learning.items.map((item) => (
                  <IconRow
                    key={item.body}
                    icon={learningIcons[item.icon as keyof typeof learningIcons]}
                    body={item.body}
                  />
                ))}
              </LiquidReveal>
            </div>
            <CaseImage
              src={learning.image}
              alt={learning.imageAlt}
              width={learning.imageDims.width}
              height={learning.imageDims.height}
              frame={false}
            />
          </div>
          {/* R5 (Ajustes 03): mt-10 (40px) → mt-8 (32px). Itens → callout
              de fechamento no Figma (nó 577:2682) = 32px. */}
          <LiquidReveal delay={0.1} className="mt-8">
            <IconCallout>{learning.closing}</IconCallout>
          </LiquidReveal>
        </SonaSection>
      </main>

      <LiquidFooter />
    </div>
  )
}
