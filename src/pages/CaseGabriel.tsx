import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, ArrowRight, ArrowDown, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SectionLabel from '../components/ui/SectionLabel'
import AnimateOnScroll from '../components/ui/AnimateOnScroll'
import Callout from '../components/ui/Callout'
import ProjectImage from '../components/ui/ProjectImage'
import { DashList, DashItem } from '../components/ui/DashList'
import GabrielSection from '../components/ui/GabrielSection'
import { LinkedInIcon } from '../components/icons/LinkedInIcon'
import usePageMeta from '../hooks/usePageMeta'

const IMG = '/projects/gabriel'
const TEXT_COL = 'max-w-[70ch]'

const eyebrowLine = 'UX RESEARCH · PRODUCT DESIGN · BRANDING · FRONT-END'

const quickInfo = [
  { label: 'Cliente', value: 'Gabriel Alves — Psicólogo Clínico' },
  { label: 'Duração', value: '1 mês' },
  { label: 'Meu papel', value: 'UX Research · Product Design · Branding · Front-end' },
]

// Doc §10 "A descoberta" — três comportamentos que mudaram a hierarquia da página.
const findings = [
  {
    n: '01',
    label: 'As pessoas não sabem como começar',
    body: 'Para quem nunca fez terapia, a dúvida principal não era escolher um profissional. Era entender o que aconteceria depois do primeiro contato.',
  },
  {
    n: '02',
    label: 'A decisão acontece no celular',
    body: 'Grande parte das pessoas pesquisa profissionais em momentos de vulnerabilidade, quase sempre pelo smartphone. Isso tornou mobile-first uma decisão de produto, não apenas técnica.',
  },
  {
    n: '03',
    label: 'Segurança vem antes da credibilidade',
    body: 'Antes de avaliar formação, currículo ou metodologia, as pessoas precisavam sentir que encontrariam um ambiente seguro. Essa descoberta redefiniu a ordem das informações.',
  },
]

const infoOrderSteps = [
  'Esse profissional atende pessoas como eu?',
  'Posso confiar nele?',
  'Como funciona?',
  'Quanto custa?',
  'Como entro em contato?',
]

// Duas camadas: performance (o que a decisão de HTML/CSS puro comprou) tem
// mais peso visual que qualidade (bom, mas não é a tese do case). "1 CTA
// único" saiu daqui — não é métrica de performance, é apoio qualitativo.
const performanceMetrics = [
  { value: '0', label: 'de layout shift' },
  { value: '0ms', label: 'de bloqueio de interação' },
]

const qualityMetrics = [
  { value: '90', label: 'em acessibilidade' },
  { value: '92', label: 'em SEO' },
]

// Swatches do style tile — hex reais, mapeados para os tokens `gabriel-*`
// já existentes quando batem; valores sem token viram classe arbitrária.
// Borda 1px na própria cor do swatch em todos — os claros (Off-white acima
// de tudo) quase somem contra o contêiner off-white do tile sem ela.
const colorSwatches = [
  { name: 'Sage', hex: '#8FAF9A', className: 'bg-gabriel-sage', borderClassName: 'border-gabriel-sage', dark: false },
  { name: 'Moss', hex: '#4F6B58', className: 'bg-gabriel-moss', borderClassName: 'border-gabriel-moss', dark: true },
  { name: 'Moss Dark', hex: '#3A5142', className: 'bg-gabriel-mossDark', borderClassName: 'border-gabriel-mossDark', dark: true },
  { name: 'Sage Light', hex: '#B5CCB9', className: 'bg-[#B5CCB9]', borderClassName: 'border-[#B5CCB9]', dark: false },
  { name: 'Light Green', hex: '#DDE9E1', className: 'bg-[#DDE9E1]', borderClassName: 'border-[#DDE9E1]', dark: false },
  { name: 'Off-white', hex: '#F8F8F5', className: 'bg-gabriel-offwhite', borderClassName: 'border-gabriel-mossDark/25', dark: false },
  { name: 'Beige', hex: '#EFEAE3', className: 'bg-gabriel-beige', borderClassName: 'border-[#EFEAE3]', dark: false },
  { name: 'Sand', hex: '#E5DDD2', className: 'bg-gabriel-sand', borderClassName: 'border-[#E5DDD2]', dark: false },
  { name: 'Dark', hex: '#2E2E2E', className: 'bg-gabriel-dark', borderClassName: 'border-gabriel-dark', dark: true },
  { name: 'Text Muted', hex: '#7A7A72', className: 'bg-[#7A7A72]', borderClassName: 'border-[#7A7A72]', dark: true },
]

export default function CaseGabriel() {
  usePageMeta({
    title: 'Landing page para psicólogo clínico: Case | Andreo Barbosa',
    description:
      'Como transformar a primeira impressão digital em uma decisão mais fácil: confiança antes da primeira sessão.',
    ogImage: `${IMG}/desktop-hero.png`,
  })

  return (
    <>
      <Header />
      <main>

        {/* ── HERO ── */}
        <GabrielSection tone="dark" className="pt-32 md:pt-40">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/#projetos"
                className="inline-flex items-center gap-2 font-mono text-xs text-gabriel-offwhite/60 hover:text-gabriel-offwhite transition-colors duration-200 mb-16 group"
              >
                <ArrowLeft size={12} className="transition-transform duration-200 group-hover:-translate-x-1" />
                Voltar aos projetos
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 md:items-center">
              <div className={TEXT_COL}>
                {/* Eyebrow de disciplinas — páginas de case não têm número, o índice
                    /0X só existe nos cards de projeto da home. */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gabriel-sage shrink-0" aria-hidden="true" />
                  <div className="h-px flex-1 max-w-[48px] bg-gabriel-sage/40" aria-hidden="true" />
                  <span className="font-mono text-case-xs text-gabriel-sage tracking-widest uppercase">
                    {eyebrowLine}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-outfit font-light text-gabriel-offwhite text-case-3xl md:text-case-5xl leading-[1.1] mb-6 max-w-[20ch] text-balance"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  Quando a confiança começa antes da primeira sessão
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-gabriel-offwhite/70 text-case-lg leading-[1.6] max-w-[45ch] mb-8 text-pretty"
                >
                  Como transformei a primeira impressão em uma decisão mais fácil.
                </motion.p>

                {/* Botões logo após o subtítulo — texto → ação é a maior
                    mudança de categoria, vem antes da régua e dos metadados,
                    não depois (ordem alinhada com os heros de Sona e IA). */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="flex flex-wrap gap-6 action-gap"
                >
                  <a
                    href="https://psicologogabrielalves.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs text-gabriel-sage hover:text-gabriel-sage/70 bg-gabriel-sage/[0.06] backdrop-blur-sm border border-gabriel-sage/30 hover:border-gabriel-sage/50 hover:bg-gabriel-sage/[0.1] px-4 py-2 rounded-full transition-all duration-150"
                  >
                    Ver projeto no ar
                    <ArrowUpRight size={12} />
                  </a>
                  <a
                    href="#hipotese"
                    className="inline-flex items-center gap-2 font-mono text-xs text-gabriel-offwhite/60 hover:text-gabriel-offwhite transition-colors duration-200"
                  >
                    Ler o case
                    <ChevronDown size={12} />
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="max-w-[560px] border-t border-gabriel-offwhite/10 pt-6 mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6"
                >
                  {quickInfo.map((item) => (
                    <div key={item.label}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-gabriel-offwhite/50">
                        {item.label}
                      </p>
                      <p className="font-outfit font-normal text-[14px] text-gabriel-offwhite mt-4 leading-[1.4]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="absolute inset-0 md:-m-8 rounded-full bg-gabriel-sage/10 blur-[100px]" aria-hidden="true" />
                <div className="relative rounded-card overflow-hidden border border-gabriel-offwhite/15 shadow-[0_24px_64px_rgba(0,0,0,0.35)]">
                  <div className="flex items-center gap-2 px-4 py-4 bg-gabriel-dark border-b border-gabriel-offwhite/10">
                    <span className="w-2 h-2 rounded-full bg-gabriel-offwhite/15" aria-hidden="true" />
                    <span className="w-2 h-2 rounded-full bg-gabriel-offwhite/15" aria-hidden="true" />
                    <span className="w-2 h-2 rounded-full bg-gabriel-offwhite/15" aria-hidden="true" />
                  </div>
                  <img
                    src={`${IMG}/desktop-hero.png`}
                    alt="Hero da landing page do Psicólogo Gabriel Alves, visão desktop"
                    loading="lazy"
                    className="w-full h-auto block"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </GabrielSection>

        {/* ── /01 A HIPÓTESE ── */}
        <GabrielSection tone="light" id="hipotese">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <div className="mb-6">
                  <SectionLabel index="/01" label="A Hipótese" tone="gabriel-light" />
                </div>

                <div className="relative pl-6 border-l-2 border-gabriel-moss/40 mb-8">
                  <p className="text-gabriel-mossDark/80 italic text-case-base leading-[1.6] mb-3">
                    Buscar terapia raramente começa pela escolha de um profissional. Antes disso
                    existe uma decisão muito mais difícil: pedir ajuda.
                  </p>
                  <p className="text-gabriel-mossDark/80 italic text-case-base leading-[1.6]">
                    O desafio não era redesenhar uma landing page. Era criar uma experiência capaz
                    de reduzir a ansiedade do primeiro contato e transmitir confiança suficiente
                    para alguém dar o primeiro passo.
                  </p>
                </div>

                <div className="space-y-6 text-gabriel-mossDark text-case-base leading-[1.6]">
                  <p>
                    Gabriel já oferecia atendimento qualificado e tinha posicionamento claro como
                    psicólogo afirmativo para pessoas LGBTQIA+. Mas sua presença digital transmitia
                    outra impressão: o site apresentava informações importantes sem comunicar
                    acolhimento, clareza ou segurança — justamente os fatores que influenciam quem
                    está considerando iniciar terapia.
                  </p>
                  <p>
                    A pergunta deixou de ser &ldquo;como criar uma landing page melhor?&rdquo;.
                  </p>
                </div>

                <Callout label="A pergunta que guiou o projeto" tone="gabriel-light">
                  Como reduzir a ansiedade do primeiro contato antes mesmo da primeira conversa?
                </Callout>
              </div>
            </AnimateOnScroll>
          </div>
        </GabrielSection>

        {/* ── /02 A DESCOBERTA ── */}
        <GabrielSection tone="dark">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <div className="mb-6">
                  <SectionLabel index="/02" label="A Descoberta" tone="gabriel-dark" />
                </div>
                <p className="text-gabriel-offwhite/80 text-case-base leading-[1.6] mb-10">
                  Antes de abrir o Figma, conduzi uma entrevista em profundidade para entender como
                  Gabriel conduzia seus atendimentos e quais sentimentos gostaria de despertar. A
                  pesquisa revelou três comportamentos que mudaram a hierarquia da página.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll stagger className="grid gap-4">
              {findings.map(({ n, label, body }) => (
                <div
                  key={n}
                  className="rounded-card border border-gabriel-offwhite/10 bg-gabriel-offwhite/[0.04] px-6 py-6 flex gap-6 items-start"
                >
                  <span
                    className="font-mono text-gabriel-sage/40 font-bold leading-none shrink-0 select-none text-case-2xl"
                    style={{ letterSpacing: '-0.02em' }}
                    aria-hidden="true"
                  >
                    {n}
                  </span>
                  <div className={TEXT_COL}>
                    <p className="font-mono text-case-sm text-gabriel-sage tracking-widest uppercase mb-2">
                      {label}
                    </p>
                    <p className="text-gabriel-offwhite/70 leading-[1.6] text-case-base">{body}</p>
                  </div>
                </div>
              ))}
            </AnimateOnScroll>
          </div>
        </GabrielSection>

        {/* ── /03 AS DECISÕES ── */}
        <GabrielSection tone="light">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={`${TEXT_COL} mb-4`}>
                <SectionLabel index="/03" label="As Decisões" tone="gabriel-light" />
              </div>
            </AnimateOnScroll>

            <div className="block-gap space-y-11 md:space-y-14 lg:space-y-18">
              {/* Decisão 1 — Construir confiança antes de credenciais */}
              <AnimateOnScroll>
                <div className={TEXT_COL}>
                  <h3 className="font-outfit font-medium text-gabriel-mossDark text-case-lg mb-3">
                    Construir confiança antes de apresentar credenciais
                  </h3>
                  <p className="text-gabriel-mossDark/70 text-case-sm leading-[1.6] mb-4">
                    <strong className="text-gabriel-mossDark font-medium">Descoberta</strong> — As
                    pessoas buscavam acolhimento antes de buscar informação.
                  </p>
                  <p className="text-gabriel-mossDark text-case-base leading-[1.6]">
                    <strong className="text-gabriel-mossDark font-medium">Decisão</strong> — Inverti
                    a lógica tradicional das landing pages. A primeira mensagem passou a comunicar
                    pertencimento e segurança; formação, experiência e modalidades de atendimento
                    vêm depois.
                  </p>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <ProjectImage
                  src={`${IMG}/desktop-hero.png`}
                  alt="Hero da landing page: primeira mensagem comunica pertencimento e segurança"
                  caption="Hero da landing: a primeira mensagem é de acolhimento, não de credencial"
                  size="wide"
                  tone="gabriel-light"
                />
              </AnimateOnScroll>

              {/* Decisão 2 — Tornar o processo previsível */}
              <AnimateOnScroll>
                <div className={TEXT_COL}>
                  <h3 className="font-outfit font-medium text-gabriel-mossDark text-case-lg mb-3">
                    Tornar o processo previsível
                  </h3>
                  <p className="text-gabriel-mossDark/70 text-case-sm leading-[1.6] mb-4">
                    <strong className="text-gabriel-mossDark font-medium">Descoberta</strong> — A
                    incerteza sobre o que acontece depois da primeira mensagem aumentava a ansiedade.
                  </p>
                  <p className="text-gabriel-mossDark text-case-base leading-[1.6]">
                    <strong className="text-gabriel-mossDark font-medium">Decisão</strong> — Criei
                    uma seção dedicada a explicar todo o processo até a primeira sessão. Quando as
                    pessoas entendem o caminho, a decisão deixa de parecer um salto no escuro.
                  </p>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <ProjectImage
                  src={`${IMG}/desktop-como-funciona.png`}
                  alt="Seção 'Como funciona', com as etapas do processo até a primeira sessão"
                  caption="Seção 'Como funciona': elimina a incerteza sobre o processo"
                  size="wide"
                  tone="gabriel-light"
                />
              </AnimateOnScroll>

              {/* Decisão 3 — Organizar o conteúdo na ordem das dúvidas.
                  Sequência conectada, não grid 2×2 — reforça que é uma ordem
                  de raciocínio, não um conjunto de itens paralelos. */}
              <AnimateOnScroll>
                <div>
                  <div className={`${TEXT_COL} mb-8`}>
                    <h3 className="font-outfit font-medium text-gabriel-mossDark text-case-lg mb-3">
                      Organizar o conteúdo na ordem das dúvidas
                    </h3>
                    <p className="text-gabriel-mossDark text-case-base leading-[1.6]">
                      <strong className="text-gabriel-mossDark font-medium">Decisão</strong> — A
                      arquitetura da informação seguiu o raciocínio natural de quem chega ao site,
                      respondendo cada pergunta antes da próxima surgir:
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-stretch gap-2 sm:gap-0 max-w-5xl">
                    {infoOrderSteps.map((step, i) => (
                      <Fragment key={step}>
                        <div className="flex-1 sm:basis-0 min-w-0 rounded-card border border-gabriel-mossDark/15 bg-white/60 px-6 py-6 flex flex-col gap-3">
                          <span
                            className="font-outfit font-light text-gabriel-moss/45 text-case-3xl leading-none"
                            aria-hidden="true"
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="text-gabriel-mossDark text-case-sm leading-[1.4] text-balance">{step}</p>
                        </div>
                        {i < infoOrderSteps.length - 1 && (
                          <div
                            className="shrink-0 flex items-center justify-center text-gabriel-moss/40 py-1 sm:py-0 sm:px-2"
                            aria-hidden="true"
                          >
                            <ArrowRight size={16} className="hidden sm:block" />
                            <ArrowDown size={16} className="sm:hidden" />
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Decisão 4 — Um único objetivo */}
              <AnimateOnScroll>
                <div className={TEXT_COL}>
                  <h3 className="font-outfit font-medium text-gabriel-mossDark text-case-lg mb-3">
                    Um único objetivo
                  </h3>
                  <p className="text-gabriel-mossDark text-case-base leading-[1.6]">
                    <strong className="text-gabriel-mossDark font-medium">Decisão</strong> — Todo
                    elemento conduz a uma única ação: iniciar conversa pelo WhatsApp. Eliminei
                    distrações, reduzi caminhos concorrentes e distribuí CTAs apenas quando o
                    usuário já tinha informação suficiente para decidir.
                  </p>
                </div>
              </AnimateOnScroll>

              {/* Decisão 5 — A identidade visual também comunica confiança */}
              <AnimateOnScroll>
                <div className={TEXT_COL}>
                  <h3 className="font-outfit font-medium text-gabriel-mossDark text-case-lg mb-3">
                    A identidade visual também comunica confiança
                  </h3>
                  <p className="text-gabriel-mossDark text-case-base leading-[1.6]">
                    <strong className="text-gabriel-mossDark font-medium">Decisão</strong> — Construí
                    a linguagem visual para transmitir calma sem recorrer aos clichês de produtos de
                    saúde. A combinação entre serifada e sans-serif equilibra acolhimento e
                    legibilidade; as imagens foram geradas especificamente para o projeto.
                  </p>
                </div>
              </AnimateOnScroll>

              {/* Style tile nativo — cores e tipografia reais, não um print.
                  Título ("Sentient") ainda não verificado contra a landing
                  publicada (fetch automatizado bloqueado pelo site); usa
                  fallback sans-serif caso o CDN falhe ou a fonte mude depois. */}
              <AnimateOnScroll>
                <div className="rounded-card border border-gabriel-mossDark/15 bg-white/40 p-6 lg:p-8">
                  <p className="font-mono text-case-xs text-gabriel-mossDark/50 uppercase tracking-widest mb-8">
                    Identidade visual — cores e tipografia
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Cores */}
                    <div>
                      <p className="font-mono text-case-xs text-gabriel-moss tracking-widest uppercase mb-4">
                        Cores
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-2 gap-2">
                        {colorSwatches.map((swatch) => (
                          <div
                            key={swatch.hex}
                            className={`${swatch.className} ${swatch.borderClassName} border rounded-badge px-3 py-4 flex flex-col justify-end min-h-[76px]`}
                          >
                            <p
                              className={`font-mono text-[11px] leading-[1.3] ${
                                swatch.dark ? 'text-gabriel-offwhite/90' : 'text-gabriel-mossDark/90'
                              }`}
                            >
                              {swatch.name}
                              <br />
                              {swatch.hex}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tipografia — amostras vivas, não descrição em prosa */}
                    <div>
                      <p className="font-mono text-case-xs text-gabriel-moss tracking-widest uppercase mb-4">
                        Tipografia
                      </p>
                      <div className="space-y-5">
                        <div>
                          <p className="font-mono text-[10px] text-gabriel-mossDark/40 tracking-widest uppercase mb-2">
                            Títulos
                          </p>
                          <div className="flex items-baseline gap-3 mb-2">
                            <p
                              className="text-gabriel-mossDark leading-none break-words"
                              style={{ fontFamily: "'Sentient', Outfit, serif", fontWeight: 700, fontSize: 'clamp(40px, 6vw, 64px)' }}
                            >
                              Aa
                            </p>
                            <span className="font-mono text-[10px] text-gabriel-mossDark/40 tracking-wide">H1 · 64/Bold</span>
                          </div>
                          <div className="flex items-baseline gap-3 mb-2">
                            <p
                              className="text-gabriel-mossDark leading-none"
                              style={{ fontFamily: "'Sentient', Outfit, serif", fontWeight: 700, fontSize: 'clamp(32px, 4.5vw, 48px)' }}
                            >
                              Aa
                            </p>
                            <span className="font-mono text-[10px] text-gabriel-mossDark/40 tracking-wide">H2 · 48/Bold</span>
                          </div>
                          <div className="flex items-baseline gap-3">
                            <p
                              className="text-gabriel-mossDark leading-none"
                              style={{ fontFamily: "'Sentient', Outfit, serif", fontWeight: 600, fontSize: '32px' }}
                            >
                              Aa
                            </p>
                            <span className="font-mono text-[10px] text-gabriel-mossDark/40 tracking-wide">H3 · 32/SemiBold</span>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gabriel-mossDark/10">
                          <p className="font-mono text-[10px] text-gabriel-mossDark/40 tracking-widest uppercase mb-2">
                            Corpo
                          </p>
                          <p className="font-outfit font-normal text-gabriel-mossDark/80 text-[18px] leading-[1.4] mb-1">
                            Body Large 18/Regular
                          </p>
                          <p className="font-outfit font-normal text-gabriel-mossDark/80 text-[16px] leading-[1.4] mb-1">
                            Body Base 16/Regular
                          </p>
                          <p className="font-outfit font-medium text-gabriel-mossDark/60 text-[13px] leading-[1.4]">
                            Caption 13/Medium
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Decisão 6 — Simplicidade também é uma decisão */}
              <AnimateOnScroll>
                <div className={TEXT_COL}>
                  <h3 className="font-outfit font-medium text-gabriel-mossDark text-case-lg mb-3">
                    Simplicidade também é uma decisão
                  </h3>
                  <p className="text-gabriel-mossDark text-case-base leading-[1.6]">
                    <strong className="text-gabriel-mossDark font-medium">Decisão</strong> —
                    Desenvolvi a landing em HTML e CSS puros. Além de reduzir dependências, a
                    escolha melhorou desempenho, facilitou manutenção e deu mais controle sobre a
                    experiência.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </GabrielSection>

        {/* ── PRINTS: ÁREAS · FAQ · RESPONSIVO ── */}
        <GabrielSection tone="dark">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/desktop-areas.png`}
                alt="Seção de áreas de atuação da landing page, com 6 cards de especialidades"
                caption="Áreas de atuação: 6 cards, escaneáveis, com linguagem direta"
                size="wide"
                tone="gabriel-dark"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/desktop-faq.png`}
                alt="Seção de FAQ, com perguntas frequentes em formato acordeão"
                caption="FAQ: responde as dúvidas antes que virem objeções"
                size="wide"
                tone="gabriel-dark"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/responsive-desktop-mobile.png`}
                alt="Comparativo desktop e mobile: responsividade da landing page"
                caption="Mobile-first: a maior parte do tráfego por terapia vem do celular"
                size="wide"
                tone="gabriel-dark"
              />
            </AnimateOnScroll>
          </div>
        </GabrielSection>

        {/* ── /04 O RESULTADO ── */}
        <GabrielSection tone="light">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <div className="mb-6">
                  <SectionLabel index="/04" label="O Resultado" tone="gabriel-light" />
                </div>
                <p className="text-gabriel-mossDark text-case-base leading-[1.6] mb-10">
                  Mais do que apresentar um profissional, a landing passou a apoiar uma decisão
                  emocional.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Métricas em duas camadas: performance (a tese do "HTML/CSS puro")
                domina; qualidade é secundária, cards menores. "1 CTA único" não
                é métrica de performance — vive na lista qualitativa abaixo. */}
            <AnimateOnScroll>
              <div className="grid grid-cols-2 gap-4 max-w-md mb-4">
                {performanceMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-card border border-gabriel-mossDark/15 bg-white/60 px-6 py-6"
                  >
                    <p className="font-satoshi font-bold text-gabriel-mossDark text-4xl leading-none mb-2">
                      {metric.value}
                    </p>
                    <p className="font-mono text-[11px] text-gabriel-mossDark/60 tracking-wide uppercase leading-[1.4]">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="grid grid-cols-2 gap-3 max-w-xs mb-10">
                {qualityMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-badge border border-gabriel-mossDark/10 px-4 py-3"
                  >
                    <p className="font-satoshi font-semibold text-gabriel-mossDark/80 text-xl leading-none mb-1">
                      {metric.value}
                    </p>
                    <p className="font-mono text-[10px] text-gabriel-mossDark/50 tracking-wide uppercase leading-[1.3]">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <DashList>
                  {[
                    'Comunica acolhimento e profissionalismo desde o primeiro scroll',
                    'Caminho de conversão direto e sem distrações, com CTA único de WhatsApp',
                    'Custo de manutenção mínimo, sem dependências de CMS',
                  ].map((item) => (
                    <DashItem key={item} markerClassName="text-gabriel-moss">{item}</DashItem>
                  ))}
                </DashList>
              </div>
            </AnimateOnScroll>
          </div>
        </GabrielSection>

        {/* ── /05 O APRENDIZADO ── */}
        <GabrielSection tone="dark" className="pb-24 md:pb-32">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <div className="mb-6">
                  <SectionLabel index="/05" label="O Aprendizado" tone="gabriel-dark" />
                </div>
                <div className="space-y-6 text-gabriel-offwhite/80 text-case-base leading-[1.6] mb-8">
                  <p>
                    Este projeto mudou minha forma de enxergar produtos digitais para saúde. Percebi
                    que interfaces não conquistam confiança — elas apenas criam as condições para
                    que ela aconteça.
                  </p>
                  <p>
                    Quando alguém chega a um produto em momento de vulnerabilidade, a primeira
                    necessidade não é encontrar funcionalidades. É sentir segurança para seguir em
                    frente.
                  </p>
                </div>
                <p className="text-gabriel-offwhite/90 text-[17px] italic border-l-2 border-gabriel-sage/60 pl-6">
                  Desde então, olho para cada interface com uma pergunta diferente: o que essa
                  pessoa precisa sentir antes de conseguir decidir?
                </p>
              </div>
            </AnimateOnScroll>

            {/* Closing */}
            <AnimateOnScroll>
              <div className="pt-4 mt-12 border-t border-gabriel-offwhite/10">
                <div className="mt-12 flex flex-col gap-8">
                  {/* Linha 1: CTAs */}
                  <div className="flex items-center gap-4">
                    <a
                      href="https://psicologogabrielalves.com.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs text-gabriel-sage hover:text-gabriel-sage/70 bg-gabriel-sage/[0.06] backdrop-blur-sm border border-gabriel-sage/30 hover:border-gabriel-sage/50 hover:bg-gabriel-sage/[0.1] px-4 py-2 rounded-full transition-all duration-150"
                    >
                      Ver projeto no ar
                      <ArrowUpRight size={12} />
                    </a>
                    <a
                      href="https://linkedin.com/in/andreo-barbosa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn de Andreo Barbosa"
                      className="text-gabriel-offwhite/60 hover:text-gabriel-sage transition-colors duration-200"
                    >
                      <LinkedInIcon className="w-[18px] h-[18px]" />
                    </a>
                  </div>

                  {/* Linha 2: navegação entre cases */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                    <Link
                      to="/#projetos"
                      className="inline-flex items-center gap-2 font-mono text-xs text-gabriel-offwhite/60 hover:text-gabriel-offwhite transition-colors duration-200"
                    >
                      <ArrowLeft size={12} />
                      Voltar aos projetos
                    </Link>

                    <Link
                      to="/case/sona"
                      className="font-mono text-xs text-gabriel-offwhite/60 hover:text-gabriel-offwhite transition-colors duration-200 whitespace-nowrap"
                    >
                      Próximo case → Sona
                    </Link>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </GabrielSection>

      </main>
      <Footer />
    </>
  )
}
