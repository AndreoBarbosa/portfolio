import { Fragment, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, BatteryLow, Layers, Lock, Calculator } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Callout from '../components/ui/Callout'
import ProjectImage from '../components/ui/ProjectImage'
import Button from '../components/ui/Button'
import AnimateOnScroll from '../components/ui/AnimateOnScroll'
import { DashList, DashItem } from '../components/ui/DashList'
import { FigmaIcon } from '../components/ui/SocialIcons'
import usePageMeta from '../hooks/usePageMeta'
import useCountUp from '../hooks/useCountUp'
import CaseSection from '../components/case/CaseSection'
import SectionHeading from '../components/case/SectionHeading'
import GuidelineAccordion from '../components/case/GuidelineAccordion'
import InsightGrid from '../components/case/InsightGrid'
import IframeDemo from '../components/case/IframeDemo'
import ImageLightbox from '../components/case/ImageLightbox'
import ReadingProgress from '../components/case/ReadingProgress'
import SectionIndex from '../components/case/SectionIndex'
import { decisions, demoScript, figmaToCode, figmaToCodeClosing, journeyNodes, sectionIndex } from '../data/sona'

const IMG = '/projects/sona'
const TEXT_COL = 'max-w-[68ch]'

const PROTOTYPE_URL = 'https://sona-app-two.vercel.app/?reset=1'
const FIGMA_URL =
  'https://www.figma.com/design/JH7ZB20Ofzt3cgdFnxGrPW/SONA---Planejador-Financeiro?m=auto&t=MrxcASAIUAliQyOX-1'

const heroSpecs = [
  { label: 'Categoria', value: 'UX Research · Product Design · Fintech' },
  { label: 'Duração', value: '3 meses' },
  { label: 'Meu papel', value: 'UX Research · UX/UI Design · Arquitetura da Informação · Design System' },
]

const tldrScreens = [
  { src: `${IMG}/home.png`, alt: 'Tela Home do Sona, com diagnóstico financeiro e atalhos' },
  { src: `${IMG}/metas-duas.png`, alt: 'Tela de Metas do Sona com duas metas e divisão automática da sobra' },
]

const resultScreens = [
  { src: `${IMG}/home.png`, alt: 'Home do Sona', caption: 'Home — saúde financeira no topo, não saldo' },
  { src: `${IMG}/diagnostico.png`, alt: 'Diagnóstico financeiro do Sona', caption: 'Diagnóstico — resposta em linguagem humana antes do dado' },
  { src: `${IMG}/metas-duas.png`, alt: 'Metas com duas metas simultâneas e sobra dividida', caption: 'Metas — o plano como divisão automática da sobra' },
  { src: `${IMG}/privacidade.png`, alt: 'Tela de perfil com permissões e privacidade do Open Finance', caption: 'Privacidade — permissões granulares, revogáveis a um toque' },
  { src: `${IMG}/historico.png`, alt: 'Histórico de movimentações do Sona', caption: 'Histórico — a trilha que sustenta a confiança no diagnóstico' },
  { src: `${IMG}/onboarding-1.png`, alt: 'Primeira tela de onboarding do Sona', caption: 'Onboarding — vende a visão sem prometer milagre' },
]

const nextSteps: { title: string; body: ReactNode }[] = [
  {
    title: 'Testar com gente de verdade',
    body: 'Teste de usabilidade moderado nos fluxos de conexão bancária e divisão de sobra: as duas maiores apostas de design.',
  },
  {
    title: 'Completar o mapa',
    body: (
      <>
        As telas marcadas como pendentes na{' '}
        <a href="#arquitetura-informacao" className="underline hover:text-amber">
          arquitetura da informação
        </a>{' '}
        (diagnóstico semanal recorrente, detalhe de categoria, empty states, edição de meta).
      </>
    ),
  },
  {
    title: 'Validar as suposições da CSD',
    body: 'Especialmente "usuários confiam conta bancária a marca nova": a suposição mais perigosa do produto.',
  },
]

const designSystemDetail = [
  'Botões: 4 tipos × 3 estados',
  'Inputs: 8 variantes com validação e estados desabilitados',
  'Cards de meta: 10 variantes',
  'Loading: 35 variantes entre porcentagem, barra e labels',
  'Finance Health: 6 variantes',
  'Insights: 4 tons (atenção, positivo, info, neutro)',
  'Proporção de uso documentada: 25% azul · 12% verde · 8% coral · 55% neutros',
]

// ── Style tile nativo do Sona — cores e tipografia reais, não um print. ──
const sonaBrandColors = [
  { name: 'Azul Petróleo', hex: '#0C1A22', role: 'Primária · UI · Texto' },
  { name: 'Verde Principal', hex: '#628E70', role: 'Secundária · Ações · Texto' },
  { name: 'Coral Quente', hex: '#C96040', role: 'Acento · CTAs' },
  { name: 'Branco', hex: '#FFFFFF', role: 'Fundo · Cards' },
  { name: 'Off White', hex: '#FAFAF8', role: 'Base · Fundo geral' },
]

const sonaUsageBar = [
  { label: 'Azul Petróleo', value: 25, hex: '#0C1A22' },
  { label: 'Verde', value: 12, hex: '#628E70' },
  { label: 'Coral', value: 8, hex: '#C96040' },
  { label: 'Neutros', value: 55, hex: '#8A8880' },
]

type ColorStep = { step: string; hex: string; key?: boolean }

// Ramp aproximado — não são os 40 valores originais do arquivo de design
// (fora de alcance aqui), e sim uma interpolação plausível ancorada nos 4
// tons-chave reais (marcados com ★), suficiente para demonstrar a estrutura
// da escala sem fabricar dados que pareçam mais precisos do que são.
const sonaColorScales: { name: string; steps: ColorStep[] }[] = [
  {
    name: 'Primária',
    steps: [
      { step: '50', hex: '#EAF0F2' }, { step: '100', hex: '#CFDBDF' },
      { step: '200', hex: '#A8BFC6' }, { step: '300', hex: '#7C9CA6' },
      { step: '400', hex: '#567985' }, { step: '500', hex: '#395C68' },
      { step: '600', hex: '#23404B' }, { step: '700', hex: '#0C1A22', key: true },
      { step: '800', hex: '#081319' }, { step: '900', hex: '#040A0D' },
    ],
  },
  {
    name: 'Secundária',
    steps: [
      { step: '50', hex: '#EDF3EF' }, { step: '100', hex: '#D3E3D8' },
      { step: '200', hex: '#B0CDBB' }, { step: '300', hex: '#8CB69D' },
      { step: '400', hex: '#79A184' }, { step: '500', hex: '#628E70', key: true },
      { step: '600', hex: '#4E7359' }, { step: '700', hex: '#3B5844' },
      { step: '800', hex: '#283C2E' }, { step: '900', hex: '#141E17' },
    ],
  },
  {
    name: 'Terciária',
    steps: [
      { step: '50', hex: '#FBEEEA' }, { step: '100', hex: '#F5D5CA' },
      { step: '200', hex: '#EAB09C' }, { step: '300', hex: '#DE8B6E' },
      { step: '400', hex: '#C96040', key: true }, { step: '500', hex: '#A84830' },
      { step: '600', hex: '#8A3A27' }, { step: '700', hex: '#6B2C1E' },
      { step: '800', hex: '#4D1F15' }, { step: '900', hex: '#2F130D' },
    ],
  },
  {
    name: 'Base',
    steps: [
      { step: '50', hex: '#FFFFFF' }, { step: '100', hex: '#FAFAF8' },
      { step: '200', hex: '#F0EDE6', key: true }, { step: '300', hex: '#E4DFD5' },
      { step: '400', hex: '#D4D0C8' }, { step: '500', hex: '#B5B0A6' },
      { step: '600', hex: '#8A8880' }, { step: '700', hex: '#605E58' },
      { step: '800', hex: '#3A3835' }, { step: '900', hex: '#1D1C1A' },
    ],
  },
]

const sonaContrastRules = [
  { hex: '#628E70', step: '500', rule: 'Verde principal: ações, links, texto. Passa contraste sobre fundos claros.' },
  { hex: '#7EA88A', step: '400', rule: 'Apenas elemento visual/ilustrações. Não usar como texto: contraste insuficiente.' },
  { hex: '#C96040', step: '400', rule: 'Coral: CTAs e destaques.' },
  { hex: '#A84830', step: '500', rule: 'Coral para texto sobre fundos claros.' },
  { hex: '#8A8880', step: '600', rule: 'Texto de apoio (padrão secundário).' },
  { hex: '#605E58', step: '700', rule: 'Texto enfatizado.' },
  { hex: '#D4D0C8', step: '400', rule: 'Texto desativado.' },
]

// Contraste real (WCAG luminância relativa) decide texto claro/escuro por
// swatch — mais confiável que supor um corte fixo na escala.
function isDarkSwatch(hex: string) {
  const c = hex.replace('#', '')
  const rgb = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16) / 255)
  const lin = rgb.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  const luminance = 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]
  return luminance < 0.4
}

function SonaStyleTile() {
  return (
    <div className="rounded-card border border-cream/10 p-6 lg:p-8" style={{ background: '#0C1A22' }}>
      <p className="font-mono text-xs text-cream/40 uppercase tracking-widest mb-8">
        Identidade visual — cores e tipografia
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        {/* Cores da marca */}
        <div>
          <p className="font-mono text-xs text-[#8FB99E] tracking-widest uppercase mb-4">Brand Colors</p>
          <div className="grid grid-cols-1 gap-2">
            {sonaBrandColors.map((c) => {
              const dark = isDarkSwatch(c.hex)
              return (
                <div
                  key={c.hex}
                  className="rounded-badge px-4 py-3 flex items-center justify-between border border-cream/10"
                  style={{ background: c.hex }}
                >
                  <span className={`font-mono text-[12px] ${dark ? 'text-cream/90' : 'text-ink/80'}`}>
                    {c.name} · {c.hex}
                  </span>
                  <span className={`font-mono text-[10px] uppercase tracking-wide ${dark ? 'text-cream/50' : 'text-ink/50'}`}>
                    {c.role}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Proporção de uso */}
          <p className="font-mono text-[10px] text-cream/40 uppercase tracking-widest mt-6 mb-2">Proporção de uso</p>
          <div className="flex h-2.5 rounded-full overflow-hidden border border-cream/10">
            {sonaUsageBar.map((seg) => (
              <div key={seg.label} style={{ width: `${seg.value}%`, background: seg.hex }} title={`${seg.label} · ${seg.value}%`} />
            ))}
          </div>
          <p className="font-mono text-[10px] text-cream/40 mt-2">
            {sonaUsageBar.map((s) => `${s.value}% ${s.label}`).join(' · ')}
          </p>
        </div>

        {/* Tipografia — Outfit, amostras vivas */}
        <div>
          <p className="font-mono text-xs text-[#8FB99E] tracking-widest uppercase mb-4">Tipografia — Outfit</p>
          <div className="space-y-1.5 mb-4">
            <p className="font-outfit text-cream leading-none" style={{ fontWeight: 200, fontSize: '40px', letterSpacing: '-0.03em' }}>
              Display <span className="font-mono text-[10px] text-cream/40 tracking-wide">40/200/-3%</span>
            </p>
            <p className="font-outfit text-cream leading-none" style={{ fontWeight: 200, fontSize: '32px', letterSpacing: '-0.025em' }}>
              H1 <span className="font-mono text-[10px] text-cream/40 tracking-wide">32/200/-2.5%</span>
            </p>
            <p className="font-outfit text-cream leading-none" style={{ fontWeight: 300, fontSize: '24px', letterSpacing: '-0.02em' }}>
              H2 <span className="font-mono text-[10px] text-cream/40 tracking-wide">24/300/-2%</span>
            </p>
            <p className="font-outfit text-cream leading-none" style={{ fontWeight: 300, fontSize: '20px', letterSpacing: '-0.015em' }}>
              H3 <span className="font-mono text-[10px] text-cream/40 tracking-wide">20/300/-1.5%</span>
            </p>
            <p className="font-outfit text-cream leading-none" style={{ fontWeight: 500, fontSize: '16px' }}>
              H4 <span className="font-mono text-[10px] text-cream/40 tracking-wide">16/500</span>
            </p>
          </div>
          <div className="pt-4 border-t border-cream/10 space-y-1.5">
            <p className="font-outfit text-cream/75" style={{ fontWeight: 300, fontSize: '18px', lineHeight: 1.6 }}>
              Body large 18/300/160%
            </p>
            <p className="font-outfit text-cream/75" style={{ fontWeight: 400, fontSize: '16px', lineHeight: 1.6 }}>
              Body 16/400/160%
            </p>
            <p className="font-outfit text-cream/60" style={{ fontWeight: 400, fontSize: '14px', lineHeight: 1.5 }}>
              Small 14/400/150%
            </p>
            <p className="font-outfit text-cream/50 uppercase" style={{ fontWeight: 300, fontSize: '12px', letterSpacing: '0.04em' }}>
              Caption 12/300/+4%
            </p>
          </div>
        </div>
      </div>

      {/* 4 escalas de 10 steps */}
      <p className="font-mono text-[10px] text-cream/40 uppercase tracking-widest mb-3">
        4 escalas · 10 steps · ★ tons-chave reais
      </p>
      <div className="grid grid-cols-1 gap-3 mb-10">
        {sonaColorScales.map((scale) => (
          <div key={scale.name}>
            <p className="font-mono text-[10px] text-cream/40 tracking-wide mb-1.5">{scale.name}</p>
            <div className="grid grid-cols-10 gap-0.5">
              {scale.steps.map((s) => (
                <div
                  key={s.step}
                  className="h-8 rounded-sm border border-cream/10 flex items-end justify-center pb-0.5 relative"
                  style={{ background: s.hex }}
                  title={`${scale.name} ${s.step} · ${s.hex}`}
                >
                  {s.key && <span className="absolute -top-3.5 text-[9px] text-amber">★</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Uso & contraste — a regra que sustenta a decisão de design */}
      <p className="font-mono text-[10px] text-cream/40 uppercase tracking-widest mb-3">Uso &amp; contraste</p>
      <div className="space-y-2.5">
        {sonaContrastRules.map((r) => (
          <div key={r.hex + r.step} className="flex items-start gap-3">
            <span
              className="w-4 h-4 rounded-sm border border-cream/15 shrink-0 mt-0.5"
              style={{ background: r.hex }}
              aria-hidden="true"
            />
            <p className="text-cream/70 text-[13px] leading-[1.5]">
              <span className="font-mono text-cream/50">{r.hex}·{r.step}</span> — {r.rule}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

type Metric = { value: number; suffix: string; label: string }

const metrics: Metric[] = [
  { value: 40, suffix: '+', label: 'telas desenhadas' },
  { value: 40, suffix: '', label: 'tokens de cor\nem 4 escalas de 10 steps' },
  { value: 15, suffix: '', label: 'tokens tipográficos\ndocumentados' },
  { value: 100, suffix: '+', label: 'variantes de componente\ncom estados' },
  { value: 3, suffix: '', label: 'versões da\narquitetura da informação' },
  { value: 6, suffix: '', label: 'ilustrações de tela,\nincluindo estados de falha' },
  { value: 1, suffix: '', label: 'virada completa\nde posicionamento' },
]

function MetricCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(value, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-card px-6 py-8 text-center"
    >
      <p className="font-satoshi font-bold text-amber text-[40px] md:text-[48px] leading-none mb-4">
        {count}
        {suffix}
      </p>
      <p className="font-mono text-[11px] text-muted tracking-wide uppercase leading-[1.5] whitespace-pre-line">
        {label}
      </p>
    </motion.div>
  )
}

// Único lugar do case onde a animação é o conteúdo: o conector se desenha no
// scroll (stroke-dasharray via framer-motion), não só aparece.
function JourneyConnector() {
  const shouldReduce = useReducedMotion()
  const lineProps = shouldReduce
    ? { pathLength: 1 }
    : {
        initial: { pathLength: 0 },
        whileInView: { pathLength: 1 },
        viewport: { once: true, margin: '-40px' },
        transition: { duration: 0.5, ease: 'easeInOut' as const },
      }

  return (
    <div className="shrink-0 flex items-center justify-center text-muted/50 py-1 md:py-0 md:px-3" aria-hidden="true">
      <svg width="10" height="28" viewBox="0 0 10 28" className="md:hidden overflow-visible">
        <motion.path d="M5 0 V28" stroke="currentColor" strokeWidth="1.5" fill="none" {...lineProps} />
      </svg>
      <svg width="32" height="10" viewBox="0 0 32 10" className="hidden md:block overflow-visible">
        <motion.path d="M0 5 H32" stroke="currentColor" strokeWidth="1.5" fill="none" {...lineProps} />
      </svg>
    </div>
  )
}

// Acento geométrico discreto no canto do card — versão simplificada/menor do
// padrão usado nos cards de projeto da home (Projects.tsx `CardPattern`).
function DiscoveryPattern() {
  return (
    <svg
      viewBox="0 0 300 200"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="272" cy="18" r="70" fill="none" stroke="#C8A96E" strokeWidth="0.5" opacity="0.12" />
      <circle cx="272" cy="18" r="44" fill="none" stroke="#C8A96E" strokeWidth="0.5" opacity="0.16" />
      <circle cx="272" cy="18" r="20" fill="none" stroke="#9A9384" strokeWidth="0.5" opacity="0.18" />
    </svg>
  )
}

type DiscoveryPatternItem = {
  icon: typeof BatteryLow
  title: string
  body: string
  highlight?: boolean
}

// Os 4 padrões da Descoberta em grid 2×2 (em vez de empilhados), com ícone +
// acento geométrico para sair do "card idêntico, só texto". O card que conecta
// à ilustração de falha de conexão ("Confiança...") carrega peso levemente maior.
const discoveryPatterns: DiscoveryPatternItem[] = [
  {
    icon: BatteryLow,
    title: 'Organizar dinheiro exige esforço',
    body: 'Apps que dependiam de registros manuais eram abandonados rapidamente. O problema não era disciplina, era o esforço constante para manter tudo atualizado.',
  },
  {
    icon: Layers,
    title: 'Excesso de informação gera ansiedade',
    body: 'Mais dados não significavam mais clareza. Interfaces carregadas dificultavam a compreensão e aumentavam a sensação de descontrole.',
  },
  {
    icon: Lock,
    title: 'Confiança vem antes da tecnologia',
    body: 'Conectar uma conta bancária era uma decisão emocional. Antes de autorizar o Open Finance, as pessoas queriam entender quais dados seriam compartilhados e por quê.',
    highlight: true,
  },
  {
    icon: Calculator,
    title: 'O problema não era calcular',
    body: 'Definir uma meta era simples. O difícil era decidir quanto dinheiro deveria ir para cada uma. As pessoas precisavam de orientação, não de mais números.',
  },
]

function DiscoveryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
      {discoveryPatterns.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.title}
            className={`relative overflow-hidden rounded-card border p-6 ${
              item.highlight ? 'border-amber/35 bg-amber/[0.04]' : 'border-muted/15 bg-slate/40'
            }`}
          >
            <DiscoveryPattern />
            <div className="relative">
              <Icon
                size={20}
                className={item.highlight ? 'text-amber mb-4' : 'text-amber/60 mb-4'}
                aria-hidden="true"
              />
              <p className="text-cream/85 text-base font-medium leading-[1.4] mb-2">{item.title}</p>
              <p className="text-cream/70 text-sm leading-[1.5]">{item.body}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Linha de duas colunas para "As Decisões" — texto de um lado, mockup do
// outro, alternando o lado a cada decisão (zigue-zague). Usa a largura toda
// da seção em vez de empilhar imagens estreitas centralizadas com muito
// vazio lateral; cada visual continua controlando sua própria largura
// (ProjectImage/IframeDemo já se auto-limitam), a row só posiciona o par.
function DecisionRow({ reverse, children }: { reverse?: boolean; children: [ReactNode, ReactNode] }) {
  const [text, visual] = children
  return (
    <div className={`relative flex flex-col lg:items-center gap-8 lg:gap-14 ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
      {/* Glow âmbar baixíssima opacidade atrás do mockup, alternando de lado
          com o zigue-zague — reforça a separação entre decisões sem depender
          de uma faixa de fundo full-bleed (a section não tem esse breakout
          disponível sem reestruturar o container). Fica atrás por ordem no
          DOM, não por z-index. */}
      <div
        className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full bg-amber/[0.035] blur-[90px] pointer-events-none ${
          reverse ? 'left-0 -translate-x-1/4' : 'right-0 translate-x-1/4'
        }`}
        aria-hidden="true"
      />
      <div className="relative flex-1 min-w-0">{text}</div>
      <div className="relative w-full lg:w-auto flex justify-center shrink-0">{visual}</div>
    </div>
  )
}

export default function CaseSona() {
  usePageMeta({
    title: 'Sona: Case de Product Design | Andreo Barbosa',
    description:
      'A pesquisa mostrou que eu estava resolvendo o problema errado. Como simplifiquei o planejamento financeiro sem simplificar as decisões — um case de UX Research e Product Design.',
    ogImage: `${IMG}/home.png`,
    canonical: 'https://andreobarbosa.com/case/sona',
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Decidir é mais difícil que calcular.',
      author: { '@type': 'Person', name: 'Andreo Barbosa' },
      about: ['Product Design', 'UX Research', 'Fintech'],
      datePublished: '2026-07-24',
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
          <CaseSection id="hero" className="pt-24 lg:pt-32 pb-12 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <Link
                to="/#projetos"
                className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-cream transition-colors duration-200 mb-16 group"
              >
                <ArrowLeft size={12} className="transition-transform duration-200 group-hover:-translate-x-1" />
                Voltar aos projetos
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16">
              <div className={TEXT_COL}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0" aria-hidden="true" />
                  <div className="h-px flex-1 max-w-[48px] bg-amber/30" aria-hidden="true" />
                  <span className="font-mono text-xs text-muted tracking-widest uppercase">
                    UX Research · Product Design · Fintech
                  </span>
                </motion.div>

                <header>
                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="font-satoshi font-bold text-cream text-[30px] md:text-[46px] leading-[1.15] mb-6 text-balance"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    Decidir é mais difícil que calcular.
                  </motion.h1>
                </header>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="text-cream/75 text-[20px] leading-[1.6] max-w-[45ch]"
                >
                  A pesquisa mostrou que eu estava resolvendo o problema errado.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="action-gap flex flex-wrap items-center gap-6 mb-12"
                >
                  <Button href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer" variant="primary">
                    Abrir o protótipo
                    <ArrowUpRight size={12} />
                  </Button>
                  <a
                    href={FIGMA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver projeto no Figma"
                    title="Ver projeto no Figma"
                    className="inline-flex items-center justify-center p-2 -m-2 text-cream/70 hover:text-cream transition-colors duration-200"
                  >
                    <FigmaIcon size={28} />
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="max-w-[520px] rounded-card border border-muted/15 bg-slate/40 px-6 py-6 mb-12"
                >
                  <p className="font-mono text-xs text-amber tracking-widest uppercase mb-4">
                    Experimente
                  </p>
                  <DashList className="text-cream/75 text-sm leading-[1.5]">
                    {demoScript.map((step) => (
                      <DashItem key={step.text}>{step.text}</DashItem>
                    ))}
                  </DashList>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="max-w-[640px] border-t border-cream/10 pt-6 flex flex-col sm:grid sm:grid-cols-3 gap-x-10 gap-y-6"
                >
                  {heroSpecs.map((item) => (
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
                className="relative mx-auto max-w-[280px] w-full"
              >
                <div className="absolute inset-0 -m-8 rounded-full bg-amber/10 blur-[80px]" aria-hidden="true" />
                <div className="relative rounded-[2.5rem] border-4 border-muted/20 bg-slate shadow-[0_40px_80px_rgba(0,0,0,0.55)] overflow-hidden">
                  <img
                    src={`${IMG}/home.png`}
                    alt="Tela Home do Sona em destaque, mostrando diagnóstico financeiro e metas"
                    loading="lazy"
                    className="w-full block"
                  />
                </div>
              </motion.div>
            </div>
          </CaseSection>

          {/* ── TL;DR ── */}
          <CaseSection id="tldr" className="pt-0">
            <div className="rounded-card border border-amber/30 bg-amber/[0.04] p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-amber/90 tracking-widest uppercase">TL;DR</span>
                <div className="h-px flex-1 max-w-[48px] bg-amber/30" aria-hidden="true" />
                <span className="font-mono text-xs text-muted tracking-widest uppercase">
                  Para quem tem 30 segundos
                </span>
              </div>
              <div className={`${TEXT_COL} space-y-6 text-cream/80 text-base leading-[1.6] mb-8`}>
                <p>
                  O problema não era organizar dinheiro. Era decidir o que fazer com ele. O Sona
                  conecta as contas via Open Finance, lê tudo sozinho e transforma dados em
                  direção: onde você está, onde quer chegar e o caminho pra chegar lá.
                </p>
                <p>
                  Neste case eu fiz o ciclo completo: pesquisa, definição, identidade de marca,
                  design system, +40 telas com estados de erro e edge cases. E a decisão mais
                  difícil foi <strong className="text-cream font-medium">abandonar a ideia
                  original</strong> quando a pesquisa mostrou que ela estava errada.
                </p>
              </div>
              <AnimateOnScroll stagger className="grid grid-cols-2 gap-6 max-w-[600px]">
                {tldrScreens.map((s) => (
                  <div
                    key={s.src}
                    className="mx-auto w-full max-w-[280px] rounded-badge overflow-hidden border border-muted/20 shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
                  >
                    <img src={s.src} alt={s.alt} loading="lazy" className="w-full block" />
                  </div>
                ))}
              </AnimateOnScroll>
            </div>
          </CaseSection>

          {/* ── /01 A HIPÓTESE ── */}
          <CaseSection id="hipotese" aria-labelledby="hipotese-heading">
            <SectionHeading
              index="/01"
              label="A Hipótese"
              heading="Planejar finanças parece um problema de organização. Não era."
              id="hipotese-heading"
            />
            <div className={`${TEXT_COL} space-y-6 text-cream/75 leading-[1.6] text-base`}>
              <p>
                Minha hipótese inicial seguia esse caminho: o{' '}
                <strong className="text-cream font-medium">Economic+</strong>, um aplicativo de
                metas financeiras compartilhadas entre casais e amigos. Fazia sentido no papel.
              </p>
              <p>
                A pesquisa mostrou outra realidade. As pessoas não tinham dificuldade para
                compartilhar objetivos — tinham dificuldade para decidir.
              </p>
              <p>
                Foi nesse momento que abandonei completamente a ideia original. O Economic+
                deixou de existir e o Sona nasceu com outro propósito: ajudar pessoas a tomar
                decisões financeiras com mais clareza e menos esforço. Essa foi a decisão mais
                importante do projeto.
              </p>
            </div>

            <div className="grid sm:grid-cols-[1fr_auto_1fr] items-center gap-4 max-w-[68ch] pt-11 md:pt-14 lg:pt-18 mb-12">
              <div className="rounded-card border border-muted/10 p-7 opacity-55">
                <p className="font-mono text-xs text-muted/40 tracking-widest uppercase mb-4">Antes</p>
                <p className="text-cream/55 text-xl font-medium">Economic+</p>
                <p className="text-muted/40 text-sm mt-3">Metas financeiras em grupo</p>
              </div>

              <div className="text-muted/40 text-xl justify-self-center rotate-90 sm:rotate-0" aria-hidden="true">
                →
              </div>

              <div className="rounded-card border border-amber/35 bg-amber/[0.04] p-7">
                <p className="font-mono text-xs text-amber/80 tracking-widest uppercase mb-4">Depois</p>
                <p className="text-cream text-3xl font-semibold">Sona</p>
                <p className="text-cream/65 text-[15px] mt-3">Automação financeira individual</p>
              </div>
            </div>

            <Callout label="A pergunta que guiou o resto" className="mt-11 md:mt-14 lg:mt-18 mb-11 md:mb-14 lg:mb-18">
              <p className="text-cream/90 text-[17px] leading-[1.5]">
                Como transformar um processo cheio de cálculos e dúvidas em uma experiência que
                ajude as pessoas a decidir com mais clareza e menos esforço?
              </p>
            </Callout>

            <ProjectImage
              src={`${IMG}/briefing-capa.png`}
              alt="Capa do briefing do projeto, com o card de evolução de Economic+ para Sona"
              size="wide"
            />
          </CaseSection>

          {/* ── /02 A DESCOBERTA ── */}
          <CaseSection id="descoberta" aria-labelledby="descoberta-heading" className="border-y border-amber/15 bg-slate/20">
            <SectionHeading
              index="/02"
              label="A Descoberta"
              heading="O que mudou minha forma de enxergar o problema"
              id="descoberta-heading"
            />
            <div className={`${TEXT_COL} space-y-6 text-cream/75 leading-[1.6] text-base mb-11 md:mb-14 lg:mb-18`}>
              <p>
                Por ser um projeto conceitual, conduzi desk research sobre avaliações de
                aplicativos financeiros, estudos do Banco Central, documentação do Open Finance
                Brasil e discussões em comunidades como o Reddit. Quatro comportamentos apareciam
                repetidamente, independentemente da fonte — e redefiniram o produto.
              </p>
            </div>

            <DiscoveryGrid />

            <div className={`${TEXT_COL} space-y-6 text-cream/75 leading-[1.6] text-base mt-11 md:mt-14 lg:mt-18 mb-12`}>
              <p>
                Estruturei tudo em Matriz CSD (certezas, suposições e dúvidas, inclusive as que
                só um MVP real responderia), 4 personas comportamentais, Jobs to Be Done e mapa
                de empatia. Dali saíram 9 perguntas How Might We, organizadas em 5 territórios —
                que convergiram numa jornada só, fixa, que não se inverte:
              </p>
            </div>

            {/* Diagrama único: passo do produto + o que ele entrega.
                Respiro generoso (.block-gap) acima e abaixo — o card final
                ("Acompanhamento") é o clímax da jornada, não só mais um passo. */}
            <div
              className="block-gap mb-11 md:mb-14 lg:mb-18 flex flex-col md:flex-row md:items-stretch gap-3 md:gap-0 max-w-[1000px]"
              role="img"
              aria-label="Jornada do Sona: Open Finance entrega conexão, Diagnóstico entrega clareza, Plano entrega direção, Meta entrega decisão, Acompanhamento entrega progresso"
            >
              {journeyNodes.map((node, i) => {
                const isLast = i === journeyNodes.length - 1
                return (
                  <Fragment key={node.step}>
                    <div
                      className={`flex-1 basis-0 min-w-0 flex flex-col justify-center items-center text-center rounded-lg border min-h-[120px] ${
                        isLast
                          ? 'border-amber/40 bg-amber/[0.06] px-4 py-8 min-h-[132px]'
                          : 'border-muted/25 px-3 py-6'
                      }`}
                    >
                      <p className="font-satoshi font-light text-cream text-[17px] leading-[1.2] whitespace-nowrap">
                        {node.step}
                      </p>
                      <p
                        className={`font-mono text-[10px] tracking-widest uppercase mt-3 ${
                          isLast ? 'text-amber/70' : 'text-muted/45'
                        }`}
                      >
                        {node.delivers}
                      </p>
                    </div>
                    {!isLast && <JourneyConnector />}
                  </Fragment>
                )
              })}
            </div>

            {/* Artefatos densos — thumbnail 2×2 + lightbox: ilegíveis em
                miniatura, quebravam o layout em tamanho grande. Clique expande. */}
            <div id="arquitetura-informacao" className="mt-4">
              <ImageLightbox
                images={[
                  {
                    src: `${IMG}/sintese-pesquisa-hmw.png`,
                    alt: 'Board de How Might We derivado da síntese de pesquisa',
                    caption: 'Board de HMW: 9 perguntas em 5 territórios',
                  },
                  {
                    src: `${IMG}/matriz-csd.png`,
                    alt: 'Matriz CSD do Sona: certezas, suposições e dúvidas',
                    caption: 'Matriz CSD',
                  },
                  {
                    src: `${IMG}/personas.png`,
                    alt: 'Quatro personas comportamentais do Sona',
                    caption: 'Personas',
                  },
                  {
                    src: `${IMG}/arquitetura-informacao.png`,
                    alt: 'Arquitetura da informação v2 do Sona, com badges indicando telas pendentes',
                    caption: 'Arquitetura da Informação v2',
                  },
                ]}
              />
            </div>
          </CaseSection>

          {/* ── /03 AS DECISÕES QUE MUDARAM O PRODUTO ── */}
          <CaseSection id="decisoes" aria-labelledby="decisoes-heading">
            <SectionHeading
              index="/03"
              label="As Decisões"
              heading="As decisões que mudaram o produto"
              id="decisoes-heading"
            />

            <div className="space-y-11 md:space-y-14 lg:space-y-18 text-cream/75 leading-[1.6] text-base">
              {/* Decisão 1 — Automatizar — texto esquerda / print direita */}
              <DecisionRow>
                <div className="max-w-[54ch]">
                  <h3 className="font-satoshi font-semibold text-cream text-lg mb-3">
                    Automatizar em vez de pedir mais trabalho
                  </h3>
                  <p className="mb-4">
                    <strong className="text-cream font-medium">Descoberta</strong> — Aplicativos
                    que dependiam de registros manuais eram rapidamente abandonados.
                  </p>
                  <p>
                    <strong className="text-cream font-medium">Decisão</strong> — Substituí o
                    preenchimento manual pela integração com Open Finance, reduzindo o esforço
                    necessário para manter o planejamento atualizado.
                  </p>
                </div>
                <div className="max-w-[300px]">
                  <ProjectImage
                    src={`${IMG}/home.png`}
                    alt="Home do Sona com diagnóstico financeiro automatizado, sem input manual"
                    caption="Home — diagnóstico automatizado, sem input manual"
                  />
                </div>
              </DecisionRow>

              {/* Decisão 2 — Confiança — print esquerda / texto direita */}
              <div>
                <DecisionRow reverse>
                  <div className="max-w-[54ch]">
                    <h3 className="font-satoshi font-semibold text-cream text-lg mb-3">
                      Construir confiança antes da conexão bancária
                    </h3>
                    <p className="mb-4">
                      <strong className="text-cream font-medium">Descoberta</strong> — Conectar
                      uma conta bancária era uma decisão emocional, não técnica.
                    </p>
                    <p>
                      <strong className="text-cream font-medium">Decisão</strong> — Transformei o
                      onboarding em um processo de construção de confiança. Expliquei quais dados
                      seriam acessados, por que eram necessários e como poderiam ser revogados,
                      antes de solicitar qualquer permissão. Os estados de erro seguiram a mesma
                      lógica: quando a conexão falha, o sistema assume a responsabilidade, explica
                      o que aconteceu e oferece um caminho para continuar.
                    </p>
                  </div>
                  <div className="max-w-[300px]">
                    <ProjectImage
                      src={`${IMG}/conexao-falha.png`}
                      alt="Estado de erro na conexão bancária, com retry e modo limitado"
                      caption="Conexão bancária falha — o app assume a responsabilidade"
                    />
                  </div>
                </DecisionRow>
                <Callout label="Princípio" className="max-w-[54ch] mt-8">
                  <p className="text-cream/90 text-[17px] leading-[1.5]">
                    Confiança não é construída quando tudo funciona. Ela é construída quando algo
                    dá errado.
                  </p>
                </Callout>
              </div>

              {/* Decisão 3 — Funcionalidade principal — texto esquerda / demo direita */}
              <div>
                <DecisionRow>
                  <div className="max-w-[54ch]">
                    <h3 className="font-satoshi font-semibold text-cream text-lg mb-3">
                      A funcionalidade principal nasceu da pesquisa
                    </h3>
                    <p className="mb-4">
                      <strong className="text-cream font-medium">Descoberta</strong> — O problema
                      nunca foi criar metas. Era decidir quanto dinheiro colocar em cada uma
                      delas.
                    </p>
                    <p>
                      <strong className="text-cream font-medium">Decisão</strong> — Projetei uma
                      funcionalidade que sugere automaticamente a distribuição do dinheiro
                      disponível entre diferentes objetivos. O usuário continua tomando a decisão
                      final, mas deixa de começar do zero todos os meses.
                    </p>
                  </div>
                  <IframeDemo
                    src="https://sona-app-two.vercel.app/embed/alocacao"
                    title="Demonstração interativa: motor de alocação do Sona"
                    externalHref={PROTOTYPE_URL}
                    fallbackImage={`${IMG}/metas-duas.png`}
                    fallbackAlt="Tela de Metas do Sona com a sobra sendo dividida entre duas metas"
                    caption="Uma ação, três telas respondendo."
                  />
                </DecisionRow>
                <p className="max-w-[54ch] mt-8">
                  O detalhe que amarra o sistema é que a alocação é{' '}
                  <strong className="text-cream font-medium">virtual</strong>. Nada sai da conta.
                  O Sona apenas organiza o destino do dinheiro. Por isso excluir ou pausar uma
                  meta não destrói nada: devolve o aporte para a sobra sem destino, que volta a
                  pedir uma decisão.
                </p>
              </div>

              {/* Decisão 4 — Mostrar menos — print esquerda / texto direita */}
              <DecisionRow reverse>
                <div className="max-w-[54ch]">
                  <h3 className="font-satoshi font-semibold text-cream text-lg mb-3">
                    Mostrar menos para ajudar mais
                  </h3>
                  <p className="mb-4">
                    <strong className="text-cream font-medium">Descoberta</strong> — Interfaces
                    carregadas aumentavam a ansiedade em vez de reduzi-la.
                  </p>
                  <p>
                    <strong className="text-cream font-medium">Decisão</strong> — No diagnóstico
                    financeiro, priorizei poucas informações por tela em vez de dezenas de
                    gráficos simultâneos. O objetivo nunca foi mostrar tudo — era mostrar o
                    suficiente para o usuário saber qual era o próximo passo.
                  </p>
                </div>
                <div className="max-w-[300px]">
                  <ProjectImage
                    src={`${IMG}/diagnostico.png`}
                    alt="Diagnóstico financeiro do Sona"
                    caption="Diagnóstico — poucas informações, uma direção clara"
                  />
                </div>
              </DecisionRow>

              {/* Decisão 5 — Projetar para evoluir — sem print pareado, segue
                  direto para o Callout de swatches abaixo (que já varia o
                  padrão sozinho); full-width quebra a repetição do zigue-zague. */}
              <div className="max-w-[54ch]">
                <h3 className="font-satoshi font-semibold text-cream text-lg mb-3">
                  Projetar para evoluir
                </h3>
                <p className="mb-4">
                  <strong className="text-cream font-medium">Descoberta</strong> — Na auditoria
                  final, a cor principal da identidade não atendia ao contraste mínimo.
                </p>
                <p>
                  <strong className="text-cream font-medium">Decisão</strong> — Em vez de corrigir
                  uma tela, revisei todo o sistema de cores e incorporei a regra de contraste ao
                  Design System, documentando quais tons servem para texto e quais são apenas
                  visuais. Corrigir a origem impede que o problema volte.
                </p>
              </div>
            </div>

            {/* Mudança de categoria: de texto de decisão comum para bloco
                destacado (grid + citação) — respiro além do --space-block
                mínimo, na faixa 56/72/96. */}
            <Callout
              label="Decisão"
              headline="A decisão que mais me orgulha aqui é a menos glamourosa"
              className="mt-14 md:mt-18 lg:mt-24 mb-14 md:mb-18 lg:mb-24"
            >
              {/* Bloco herói: o comparativo visual vem primeiro, o texto é apoio.
                  Sem ratio numérico no swatch: #628E70 fica em ~3.6-3.7:1 contra fundo claro
                  (WebAIM), abaixo do 4.5:1 de AA para texto normal — só o qualitativo é seguro. */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-card border border-muted/15 p-6 opacity-60">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="w-10 h-10 rounded-full border border-cream/15 shrink-0"
                      style={{ background: '#7EA88A' }}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[15px] text-cream/90">#7EA88A</span>
                  </div>
                  <p className="text-cream/70 text-sm mb-2">Verde sage</p>
                  <p className="text-[13px] flex items-center gap-1.5">
                    <span style={{ color: '#C4574E' }} aria-hidden="true">✕</span>
                    Falha contraste como texto
                  </p>
                </div>
                <div className="rounded-card border border-amber/35 bg-amber/[0.03] p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="w-10 h-10 rounded-full border border-cream/15 shrink-0"
                      style={{ background: '#628E70' }}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[15px] text-cream/90">#628E70</span>
                  </div>
                  <p className="text-cream/70 text-sm mb-2">Verde texto</p>
                  <p className="text-[13px] flex items-center gap-1.5">
                    <span style={{ color: '#7FA87F' }} aria-hidden="true">✓</span>
                    Passa como texto
                  </p>
                </div>
              </div>

              <p className="mb-4">
                Auditando as telas finais, o verde sage, a cor "da marca", não passava contraste
                como texto sobre fundos claros. Em vez de fingir que não vi, reestruturei o
                token: o verde principal desceu pra uma versão que passa, e o sage foi rebaixado
                a elemento visual e ilustração.
              </p>
              <p className="mb-6">
                A regra está documentada no style guide, com os papéis de cada tom de texto
                (apoio, enfatizado, desativado).
              </p>

              <p className="text-cream/80 text-[17px] italic border-l-2 border-amber/60 pl-6">
                Identidade bonita que não é legível não é identidade. É decoração.
              </p>
            </Callout>

            <SonaStyleTile />

            <div className="mt-11 md:mt-14 lg:mt-18">
              <p className={`${TEXT_COL} font-mono text-xs text-muted tracking-widest uppercase mb-6`}>
                Outras decisões que sustentam o produto
              </p>
              <GuidelineAccordion items={decisions} />
            </div>
          </CaseSection>

          {/* ── /04 O RESULTADO ── */}
          <CaseSection id="resultado" aria-labelledby="resultado-heading" className="border-y border-amber/15 bg-slate/20">
            <SectionHeading
              index="/04"
              label="O Resultado"
              heading="De aplicativo de metas compartilhadas a planejador orientado por decisões"
              id="resultado-heading"
            />
            <div className={`${TEXT_COL} space-y-6 text-cream/75 leading-[1.6] text-base mb-11 md:mb-14 lg:mb-18`}>
              <p>
                O Sona deixou de ser um aplicativo de metas compartilhadas e se tornou um
                planejador orientado por decisões. Mais do que organizar informação, ele reduz o
                esforço mental de planejar.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
              {metrics.map((m, i) => (
                <MetricCard key={m.label} value={m.value} suffix={m.suffix} label={m.label} delay={i * 0.06} />
              ))}
            </div>
            <p className="text-center font-mono text-xs text-muted tracking-wide mb-11 md:mb-14 lg:mb-18">
              Métricas de design — números reais, verificados no arquivo
            </p>

            <div className={`${TEXT_COL} mb-11 md:mb-14 lg:mb-18`}>
              <p className="font-mono text-xs text-amber tracking-widest uppercase mb-6">
                Detalhamento do Design System
              </p>
              <DashList className="text-cream/75 text-sm leading-[1.6]">
                {designSystemDetail.map((item) => (
                  <DashItem key={item}>{item}</DashItem>
                ))}
              </DashList>
            </div>

            <p className={`${TEXT_COL} text-muted text-sm mb-8`}>
              A solução completa, tela a tela. As demais telas estão no protótipo.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 mb-11 md:mb-14 lg:mb-18">
              {resultScreens.map((s) => (
                <ProjectImage key={s.src} src={s.src} alt={s.alt} caption={s.caption} size="narrow" />
              ))}
            </div>

            <div className={`${TEXT_COL} space-y-6 text-cream/75 leading-[1.6] text-base mb-12`}>
              <p className="font-medium text-cream">
                O que só aparece quando o produto roda de verdade
              </p>
              <p>Construir o protótipo funcional expôs problemas que o arquivo estático escondia:</p>
            </div>
            <InsightGrid items={figmaToCode} />

            {/* Pull quote — é a tese do bloco, não uma nota de rodapé. Respiro
                maior que o block-gap padrão: uma citação espremida entre dois
                blocos densos deixa de funcionar como pausa. */}
            <p className="text-cream/80 text-xl leading-[1.4] italic border-l-2 border-amber/60 pl-6 my-11 md:my-14 lg:my-18 max-w-[52ch]">
              {figmaToCodeClosing}
            </p>

            {/* Lista full-width, não grid 2×2 — 3 itens (ímpar) deixariam
                buraco no grid, e um quarto grid seguido enjoaria (diretriz 2). */}
            <div className="block-gap">
              <p className={`${TEXT_COL} font-medium text-cream mb-6`}>
                Se eu continuasse, o que eu faria a seguir
              </p>
              <div className={TEXT_COL}>
                {nextSteps.map((item, i) => (
                  <div
                    key={item.title}
                    className={`flex gap-6 py-6 ${i > 0 ? 'border-t border-muted/15' : ''}`}
                  >
                    <span className="font-mono text-amber text-2xl lg:text-3xl leading-none shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-cream/90 text-base font-medium mb-1.5">{item.title}</p>
                      <p className="text-cream/70 text-sm leading-[1.5]">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CaseSection>

          {/* ── /05 O APRENDIZADO ──
              pb reduzido e forçado (!important) por cima do padding grande do
              section-shell: conteúdo curto (2 parágrafos) não pode herdar a
              mesma folga de 128px de uma seção densa — isso é que criava o
              vazio antes dos botões do fechamento logo abaixo. Ainda assim,
              texto → botões (mudança de categoria) precisa do degrau
              --space-block (72px), não menos. */}
          <CaseSection
            id="aprendizado"
            aria-labelledby="aprendizado-heading"
            className="!pb-11 md:!pb-14 lg:!pb-18"
          >
            <SectionHeading
              index="/05"
              label="O Aprendizado"
              heading="O que o Sona mudou na minha forma de trabalhar"
              id="aprendizado-heading"
            />
            <div className={`${TEXT_COL} space-y-6 text-cream/75 leading-[1.6] text-base`}>
              <p>
                Até então, eu enxergava pesquisa como etapa de validação. Hoje ela é o principal
                instrumento para desafiar hipóteses e redirecionar produtos.
              </p>
              <p>
                Desde esse projeto, passei a medir o sucesso de uma solução menos pela quantidade
                de funcionalidades entregues e mais pela qualidade das decisões que ela ajuda as
                pessoas a tomar.
              </p>
            </div>
          </CaseSection>

          {/* ── FECHAMENTO ── */}
          <CaseSection id="cta" className="pt-0 pb-24 md:pb-32">
            <div className={TEXT_COL}>
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <Button href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer" variant="primary">
                  Abrir o protótipo
                  <ArrowUpRight size={12} />
                </Button>
                <Button href={FIGMA_URL} target="_blank" rel="noopener noreferrer" variant="secondary">
                  Ver o projeto no Figma
                  <ArrowUpRight size={12} />
                </Button>
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
                to="/case/ia-hospitalar"
                className="inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-cream transition-colors duration-200 whitespace-nowrap"
              >
                Próximo case → Onde a IA erra ao avaliar um sistema hospitalar
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
