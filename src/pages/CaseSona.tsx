import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SectionLabel from '../components/ui/SectionLabel'
import AnimateOnScroll from '../components/ui/AnimateOnScroll'
import Callout from '../components/ui/Callout'
import ProjectImage from '../components/ui/ProjectImage'
import SonaSection from '../components/ui/SonaSection'
import { FigmaIcon } from '../components/ui/SocialIcons'
import { LinkedInIcon } from '../components/icons/LinkedInIcon'
import usePageMeta from '../hooks/usePageMeta'

const IMG = '/projects/sona'
const TEXT_COL = 'max-w-[720px]'

const heroSpecs = [
  { label: 'Papel', value: 'Product Designer (solo)' },
  { label: 'Tipo', value: 'Case conceitual end-to-end' },
  { label: 'Duração', value: '3 meses' },
  { label: 'Ferramentas', value: 'Figma · Claude' },
]

const tldrScreens = [
  { src: `${IMG}/home.png`, alt: 'Tela Home do Sona, com diagnóstico financeiro e atalhos' },
  { src: `${IMG}/metas-duas.png`, alt: 'Tela de Metas do Sona com duas metas e divisão automática da sobra' },
  { src: `${IMG}/diagnostico.png`, alt: 'Tela de Diagnóstico financeiro do Sona' },
  { src: `${IMG}/onboarding-1.png`, alt: 'Primeira tela de onboarding do Sona' },
]

const onboardingScreens = [
  { src: `${IMG}/onboarding-1.png`, alt: 'Onboarding 1, apresentação da proposta do Sona' },
  { src: `${IMG}/login.png`, alt: 'Tela de login e conexão bancária via Open Finance' },
  { src: `${IMG}/conexao-falha.png`, alt: 'Estado de erro: falha na conexão bancária, com retry e modo limitado' },
  { src: `${IMG}/privacidade.png`, alt: 'Tela de perfil com permissões e privacidade do Open Finance' },
]

const diagnosticoScreens = [
  { src: `${IMG}/diagnostico.png`, alt: 'Tela de diagnóstico com score de saúde financeira' },
  { src: `${IMG}/home.png`, alt: 'Home completa do Sona após o diagnóstico' },
]

const metasScreens = [
  { src: `${IMG}/metas-uma.png`, alt: 'Tela de Metas do Sona com uma única meta' },
  { src: `${IMG}/metas-duas.png`, alt: 'Tela de Metas "Uma sobra, dois destinos", com duas metas simultâneas' },
  { src: `${IMG}/historico.png`, alt: 'Tela de Histórico de movimentações do Sona' },
]

export default function CaseSona() {
  usePageMeta({
    title: 'Sona: Case de Product Design | Andreo Barbosa',
    description:
      'Pessoas não desistem de organizar dinheiro por falta de disciplina. Desistem porque os apps exigem trabalho demais. O Sona automatiza tudo via Open Finance e transforma dados em direção.',
    ogImage: `${IMG}/home.png`,
  })

  return (
    <>
      <Header />
      <main>

        {/* ── HERO ── */}
        <SonaSection tone="dark" className="pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/#projetos"
                className="inline-flex items-center gap-2 font-mono text-xs text-sona-off/60 hover:text-sona-off transition-colors duration-200 mb-16 group"
              >
                <ArrowLeft size={12} className="transition-transform duration-200 group-hover:-translate-x-1" />
                Voltar aos projetos
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16">
              <div className={TEXT_COL}>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="flex items-center gap-2 font-mono text-case-xs text-sona-off/70 tracking-widest uppercase mb-6"
                >
                  <span className="w-2 h-2 rounded-sm bg-sona-coral" aria-hidden="true" />
                  Case · Product Design · UX Research
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-outfit font-normal text-sona-off text-case-5xl lg:text-case-8xl leading-none mb-4"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  Sona
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="font-outfit font-light text-sona-green text-case-lg lg:text-case-2xl leading-tight mb-8"
                >
                  o app financeiro que trabalha enquanto você vive
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="text-sona-off/70 text-case-base leading-relaxed mb-12 max-w-[640px]"
                >
                  Um planejador financeiro automatizado via Open Finance, desenhado do zero: da
                  pesquisa que matou a primeira ideia até um design system com decisões de
                  acessibilidade documentadas.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="max-w-[640px] border-t border-sona-off/10 pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6"
                >
                  {heroSpecs.map((item) => (
                    <div key={item.label}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-sona-off/50">
                        {item.label}
                      </p>
                      <p className="font-outfit font-normal text-[14px] text-sona-off mt-4">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-10"
                >
                  <a
                    href="https://www.figma.com/design/JH7ZB20Ofzt3cgdFnxGrPW/SONA---Planejador-Financeiro?m=auto&t=MrxcASAIUAliQyOX-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver projeto no Figma"
                    title="Ver projeto no Figma"
                    className="inline-flex items-center justify-center p-2 -m-2 text-sona-off opacity-70 hover:opacity-100 transition-opacity duration-200"
                  >
                    <FigmaIcon size={32} />
                  </a>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto max-w-[280px] w-full"
              >
                <div className="absolute inset-0 -m-8 rounded-full bg-sona-green/10 blur-[80px]" aria-hidden="true" />
                <div className="relative rounded-[2.5rem] border-4 border-sona-off/10 bg-sona-navy shadow-[0_40px_80px_rgba(0,0,0,0.55)] overflow-hidden">
                  <img
                    src={`${IMG}/home.png`}
                    alt="Tela Home do Sona em destaque, mostrando diagnóstico financeiro e metas"
                    loading="lazy"
                    className="w-full block"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </SonaSection>

        {/* ── TL;DR ── */}
        <SonaSection tone="dark" className="pt-0 pb-20 md:pb-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="rounded-card border border-sona-coral/30 bg-sona-off/[0.04] p-8 md:p-12">
                <p className="font-mono text-case-xs text-sona-coral/90 tracking-widest uppercase mb-6">
                  TL;DR: para quem tem 30 segundos
                </p>
                <div className={`${TEXT_COL} space-y-6 text-sona-off/80 text-case-base leading-relaxed mb-10`}>
                  <p>
                    Pessoas não desistem de organizar dinheiro por falta de disciplina.
                    Desistem porque os apps exigem trabalho demais. O Sona inverte a lógica:
                    conecta as contas via Open Finance, lê tudo sozinho e transforma dados em
                    direção: onde você está, onde quer chegar e o caminho pra chegar lá.
                  </p>
                  <p>
                    Neste case eu fiz o ciclo completo: desk research, definição, identidade de
                    marca, design system, +40 telas com estados de erro e edge cases. E a
                    decisão mais difícil foi <strong className="text-sona-off font-medium">abandonar
                    a ideia original</strong> quando a pesquisa mostrou que ela estava errada.
                  </p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {tldrScreens.map((s) => (
                    <div
                      key={s.src}
                      className="mx-auto w-full max-w-[280px] rounded-badge overflow-hidden border border-sona-off/15 shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
                    >
                      <img src={s.src} alt={s.alt} loading="lazy" className="w-full block" />
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </SonaSection>

        {/* ── O PROBLEMA ── */}
        <SonaSection tone="light">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <SectionLabel index="/01" label="O Problema" tone="sona-light" />
                <div className="space-y-6 text-sona-navy/90 text-case-base leading-relaxed">
                  <p>
                    O Brasil vive um boom de bancos digitais, e um paradoxo: nunca foi tão fácil
                    movimentar dinheiro, e nunca foi tão difícil enxergar o todo. Com a vida
                    financeira espalhada entre 3, 4 bancos e carteiras digitais, a pessoa não sabe
                    quanto realmente tem, pra onde o dinheiro vai, nem quanto pode destinar aos
                    seus objetivos.
                  </p>
                  <p>
                    Os apps de controle financeiro existentes pedem o oposto do que deveriam:
                    alimentação manual constante. Registrar cada gasto, categorizar cada despesa,
                    atualizar cada meta. O resultado é previsível: a maioria abandona nos primeiros
                    30 dias. Não é preguiça. É um produto que transformou organização financeira num
                    segundo emprego.
                  </p>
                  <p>
                    E tem a camada emocional, que quase ninguém desenha de propósito: gráficos de
                    gastos geram ansiedade, números demais geram culpa, e culpa gera abandono.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/problema.png`}
                alt="Página 'Problema' do Figma, com o diagnóstico do cenário financeiro brasileiro"
                size="wide"
                tone="sona-light"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/sintese-pesquisa-hmw.png`}
                alt="Síntese de pesquisa com estatísticas de abandono e principais motivos"
                caption="Síntese de pesquisa: panorama de abandono nos primeiros 30 dias"
                size="wide"
                tone="sona-light"
              />
            </AnimateOnScroll>
          </div>
        </SonaSection>

        {/* ── A VIRADA ── */}
        <SonaSection tone="dark" className="border-y border-sona-coral/20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <SectionLabel index="/02" label="A Virada: de Economic+ a Sona" tone="sona-dark" />
                <div className="space-y-6 text-sona-off/80 text-case-base leading-relaxed">
                  <p>
                    O projeto não nasceu Sona. Nasceu <strong className="text-sona-off font-medium">Economic+</strong>:
                    um app de metas financeiras compartilhadas: casais e grupos de amigos
                    economizando juntos, com transparência e acompanhamento coletivo.
                  </p>
                  <p>
                    A pesquisa desmontou a premissa. Os sinais estavam em todo lugar: o problema
                    central dos usuários não era colaborar: era{' '}
                    <strong className="text-sona-off font-medium">sustentar a organização sozinho</strong>,
                    sem esforço. Metas em grupo eram um caso de borda emocionalmente delicado
                    (cobranças constrangem, conflito afasta); a dor universal era outra: input
                    manual, fragmentação entre bancos e a sobrecarga de decidir quanto alocar quando
                    existe mais de uma meta ao mesmo tempo.
                  </p>
                  <p>
                    Eu tinha duas opções: forçar a ideia original e desenhar um produto bonito pro
                    problema errado, ou recomeçar o posicionamento com o que a pesquisa mostrou.
                    Escolhi a segunda. O Economic+ virou Sona: individual, automatizado,
                    emocionalmente leve.
                  </p>
                  <p className="text-sona-off font-medium">
                    Errar cedo e barato é exatamente pra isso que discovery serve.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 pt-4">
                    <div className="rounded-card border border-sona-off/15 p-6">
                      <p className="font-mono text-case-xs text-sona-off/50 tracking-widest uppercase mb-2">
                        Antes
                      </p>
                      <p className="text-sona-off text-case-lg font-medium">Economic+</p>
                      <p className="text-sona-off/60 text-case-sm mt-2">Metas financeiras em grupo</p>
                    </div>
                    <div className="rounded-card border border-sona-coral/50 p-6">
                      <p className="font-mono text-case-xs text-sona-off/50 tracking-widest uppercase mb-2">
                        Depois
                      </p>
                      <p className="text-sona-off text-case-lg font-medium">Sona</p>
                      <p className="text-sona-off/60 text-case-sm mt-2">Automação financeira individual</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/briefing-capa.png`}
                alt="Capa do briefing do projeto, com o card de evolução de Economic+ para Sona"
                size="wide"
                tone="sona-dark"
              />
            </AnimateOnScroll>
          </div>
        </SonaSection>

        {/* ── PESQUISA ── */}
        <SonaSection tone="light">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <SectionLabel index="/03" label="Pesquisa" tone="sona-light" />
                <div className="space-y-6 text-sona-navy/90 text-case-base leading-relaxed">
                  <p>
                    Como case conceitual, o discovery foi via desk research: reviews de App Store e
                    Google Play, comunidades (Reddit), relatórios do Banco Central e Open Finance
                    Brasil, benchmarks de fintechs (Nubank, Mobills, Guiabolso, YNAB).
                  </p>
                  <p>
                    Sou transparente sobre as limitações: dados secundários não substituem pesquisa
                    quantitativa ampla, e relatos espontâneos em fóruns carregam viés de
                    autosseleção. Mas quando os mesmos padrões se repetem em fontes independentes,
                    você tem sinal, e sinal suficiente pra decisões de produto em estágio
                    conceitual.
                  </p>
                  <p className="font-medium text-sona-navy">Os insights que guiaram tudo:</p>
                  <ul className="space-y-2">
                    {[
                      'Automação reduz fricção comportamental: apps que dependem de input manual morrem.',
                      'Clareza reduz ansiedade: interface técnica demais é sobrecarga, não sofisticação.',
                      'Confiança é pré-requisito: conectar conta bancária a um app novo exige transparência radical sobre dados.',
                      'Metas têm apelo emocional: viagem, reserva, casa própria são sonhos, não linhas de planilha.',
                      'Múltiplas metas simultâneas confundem: "quanto vai pra cada uma?" é decisão que o produto deveria tomar pelo usuário.',
                    ].map((item) => (
                      <li key={item} className="pl-4 relative">
                        <span className="absolute left-0 text-sona-coral" aria-hidden="true">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p>
                    Estruturei tudo em Matriz CSD (certezas, suposições e dúvidas, inclusive as que
                    só um MVP real responderia), 4 personas comportamentais, Jobs to Be Done e mapa
                    de empatia.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/matriz-csd.png`}
                alt="Matriz CSD do Sona: certezas, suposições e dúvidas"
                caption="Matriz CSD"
                size="wide"
                tone="sona-light"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/personas.png`}
                alt="Quatro personas comportamentais do Sona"
                caption="Personas"
                size="wide"
                tone="sona-light"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/jtbd.png`}
                alt="Jobs to Be Done do Sona: cinco jobs identificados"
                caption="Jobs to Be Done"
                size="wide"
                tone="sona-light"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/mapa-empatia.png`}
                alt="Mapa de empatia do usuário do Sona"
                caption="Mapa de Empatia"
                size="wide"
                tone="sona-light"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/desk-research-doc.png`}
                alt="Tabela de insight para decisão de design, da desk research"
                caption="Desk research: de insight a decisão de design"
                size="wide"
                tone="sona-light"
              />
            </AnimateOnScroll>
          </div>
        </SonaSection>

        {/* ── DEFINIÇÃO ── */}
        <SonaSection tone="dark">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <SectionLabel index="/04" label="Definição" tone="sona-dark" />
                <div className="space-y-6 text-sona-off/80 text-case-base leading-relaxed">
                  <p>
                    Dos insights saíram 9 perguntas How Might We, organizadas em 5 territórios:
                    Automação, Confiança, UX/Clareza, Motivação e Planejamento. Elas viraram o
                    filtro de todas as decisões de tela dali em diante.
                  </p>
                  <p>
                    A arquitetura de informação passou por 3 versões até a final: Splash →
                    Onboarding → Cadastro → Conexão bancária (com estado de falha e modo limitado) →
                    Diagnóstico → Home → Metas → Histórico → Perfil e privacidade. Na v2 final,
                    marquei honestamente as telas que ainda não existem. Roadmap de verdade
                    tem lacunas mapeadas, não fingidas.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/sintese-pesquisa-hmw.png`}
                alt="Board de How Might We derivado da síntese de pesquisa"
                caption="Board de HMW: 9 perguntas em 5 territórios"
                size="wide"
                tone="sona-dark"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <div id="arquitetura-informacao">
                <ProjectImage
                  src={`${IMG}/arquitetura-informacao.png`}
                  alt="Arquitetura da informação v2 do Sona, com badges indicando telas pendentes"
                  caption="Arquitetura da Informação v2, com legenda e badges de telas pendentes"
                  size="wide"
                  tone="sona-dark"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </SonaSection>

        {/* ── IDENTIDADE E DESIGN SYSTEM ── */}
        <SonaSection tone="light">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <SectionLabel index="/05" label="Identidade e Design System" tone="sona-light" />
                <div className="space-y-6 text-sona-navy/90 text-case-base leading-relaxed">
                  <p>
                    O Sona precisava soar como o oposto de banco: humano, calmo, com sensação de
                    progresso. A direção visual que persegui foi "céu aberto de manhã cedo antes de
                    embarcar": leveza, confiança, controle sem pressão.
                  </p>
                  <ul className="space-y-4">
                    <li>
                      <strong className="text-sona-navy font-medium">Paleta:</strong> azul petróleo
                      profundo (#0C1A22) como base, verde sage e coral queimado como acentos,
                      off-white e areia como respiro. Deliberadamente longe do azul-fintech-genérico.
                    </li>
                    <li>
                      <strong className="text-sona-navy font-medium">Tipografia:</strong> Outfit em
                      toda a hierarquia, do ExtraLight nos displays ao Medium nos labels, com contraste
                      por peso, não por família.
                    </li>
                    <li>
                      <strong className="text-sona-navy font-medium">Sistema:</strong> escalas de cor
                      50–900 para as 4 famílias, componentes com variantes e estados (botões em 4
                      tipos × 3 estados, inputs com erro, cards de meta em 10 variantes), ícones de
                      categoria e metas, ilustrações próprias de onboarding.
                    </li>
                  </ul>
                </div>

                <Callout label="A decisão que mais me orgulha aqui é a menos glamourosa" tone="sona-light">
                  <p className="mb-4">
                    Auditando as telas finais, o verde sage, a cor "da marca", não passava
                    contraste como texto sobre fundos claros. Em vez de fingir que não vi,
                    reestruturei o token: o verde principal desceu pra uma versão que passa, e o
                    sage foi rebaixado a elemento visual e ilustração.
                  </p>
                  <div className="flex flex-wrap gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-4 h-4 rounded-full bg-[#7EA88A]" aria-hidden="true" />
                      <span className="font-mono text-case-xs">#7EA88A: falha como texto</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-4 h-4 rounded-full bg-sona-green" aria-hidden="true" />
                      <span className="font-mono text-case-xs">#628E70: passa como texto</span>
                    </div>
                  </div>
                  <p>
                    A regra está documentada no style guide, com os papéis de cada tom de texto
                    (apoio, enfatizado, desativado). Identidade bonita que não é legível não é
                    identidade. É decoração.
                  </p>
                </Callout>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/styleguide-cores.png`}
                alt="Card de cores do style guide do Sona, com escalas 50 a 900 e uso e contraste"
                caption="Cores: escalas e card de Uso & Contraste"
                size="wide"
                tone="sona-light"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/styleguide-tipografia.png`}
                alt="Card de tipografia do style guide, com a fonte Outfit em toda a hierarquia"
                caption="Tipografia"
                size="wide"
                tone="sona-light"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/ilustracoes-icones.png`}
                alt="Grid de ícones de categoria e ilustrações de onboarding do Sona"
                caption="Ícones e ilustrações"
                size="wide"
                tone="sona-light"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/logo-variacoes.png`}
                alt="Variações da marca Sona"
                caption="Variações de logo"
                size="wide"
                tone="sona-light"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/botoes-estados.png`}
                alt="Componentes de botão do Sona em 4 tipos e 3 estados cada"
                caption="Botões: 4 tipos × 3 estados"
                size="wide"
                tone="sona-light"
              />
            </AnimateOnScroll>
          </div>
        </SonaSection>

        {/* ── A SOLUÇÃO ── */}
        <SonaSection tone="dark">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <SectionLabel index="/06" label="A Solução" tone="sona-dark" />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="mb-16">
                <div className={TEXT_COL}>
                  <h3 className="font-outfit font-medium text-sona-off text-case-xl mb-4">
                    Onboarding e confiança
                  </h3>
                  <p className="text-sona-off/80 text-case-base leading-relaxed mb-8">
                    Três telas que vendem a visão sem prometer milagre, e um fluxo de conexão
                    bancária que trata o medo de frente: permissões explicadas em linguagem humana,
                    controle granular do que o app pode ler, e revogação a um toque. Desenhei também
                    o caminho infeliz: se a conexão falha, o app assume a culpa técnica ("não é algo
                    que você fez"), oferece retry e um modo limitado com dados de exemplo. Confiança
                    se constrói nos estados de erro, não nos de sucesso.
                  </p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {onboardingScreens.map((s) => (
                    <ProjectImage key={s.src} src={s.src} alt={s.alt} size="narrow" tone="sona-dark" />
                  ))}
                </div>
                <p className="text-case-xs text-sona-off/50 text-center mt-4">
                  Do primeiro contato ao controle total: onboarding, autenticação, falha tratada
                  com honestidade e permissões revogáveis a um toque.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="mb-16">
                <div className={TEXT_COL}>
                  <h3 className="font-outfit font-medium text-sona-off text-case-xl mb-4">
                    Diagnóstico: de dados a direção
                  </h3>
                  <p className="text-sona-off/80 text-case-base leading-relaxed mb-8">
                    Depois de conectar, o Sona lê tudo e devolve um diagnóstico: score de saúde
                    financeira, capacidade mensal (quanto sobra de verdade), e onde o dinheiro mais
                    vai. Poucos números por tela, hierarquia clara, zero tom de julgamento. O app não
                    diz "você gastou demais". Diz "alimentação cresceu 18% em relação à sua média.
                    Revisar orçamento →".
                  </p>
                </div>
                <div className="flex flex-wrap gap-6">
                  {diagnosticoScreens.map((s) => (
                    <ProjectImage key={s.src} src={s.src} alt={s.alt} size="narrow" tone="sona-dark" />
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div>
                <div className={TEXT_COL}>
                  <h3 className="font-outfit font-medium text-sona-off text-case-xl mb-4">
                    Metas: a sobra vira plano
                  </h3>
                  <p className="text-sona-off/80 text-case-base leading-relaxed mb-8">
                    O coração do produto. O usuário define objetivos (reserva, viagem, o que for) e
                    o Sona propõe automaticamente como dividir a sobra do mês entre eles, com
                    previsão de conclusão por meta e ajuste manual quando quiser. É a resposta direta
                    ao insight mais forte da pesquisa: decidir alocação manualmente toda vez é a
                    sobrecarga que mata a disciplina. E quando o mês aperta e o plano desvia, existe
                    fluxo de ajuste de rota, porque plano financeiro real não é linha reta.
                  </p>
                </div>
                <div className="flex flex-wrap gap-6">
                  {metasScreens.map((s) => (
                    <ProjectImage key={s.src} src={s.src} alt={s.alt} size="narrow" tone="sona-dark" />
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </SonaSection>

        {/* ── O QUE EU FARIA A SEGUIR ── */}
        <SonaSection tone="light">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <SectionLabel index="/07" label="O que eu faria a seguir" tone="sona-light" />
                <ul className="space-y-4 text-sona-navy/90 text-case-base leading-relaxed">
                  <li className="pl-4 relative">
                    <span className="absolute left-0 text-sona-coral" aria-hidden="true">—</span>
                    <strong className="text-sona-navy font-medium">Testar com gente de verdade:</strong>{' '}
                    teste de usabilidade moderado nos fluxos de conexão bancária e divisão de sobra:
                    as duas maiores apostas de design.
                  </li>
                  <li className="pl-4 relative">
                    <span className="absolute left-0 text-sona-coral" aria-hidden="true">—</span>
                    <strong className="text-sona-navy font-medium">Completar o mapa:</strong> as telas
                    marcadas como pendentes na{' '}
                    <a href="#arquitetura-informacao" className="underline hover:text-sona-coral">
                      arquitetura da informação
                    </a>{' '}
                    (diagnóstico semanal recorrente, detalhe de categoria, empty states, edição de
                    meta).
                  </li>
                  <li className="pl-4 relative">
                    <span className="absolute left-0 text-sona-coral" aria-hidden="true">—</span>
                    <strong className="text-sona-navy font-medium">Validar as suposições da CSD:</strong>{' '}
                    especialmente "usuários confiam conta bancária a marca nova": a suposição mais
                    perigosa do produto.
                  </li>
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </SonaSection>

        {/* ── FECHAMENTO ── */}
        <SonaSection tone="dark" className="pb-24 md:pb-32">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <p className="text-sona-off/80 text-case-base leading-relaxed mb-10">
                  O Sona resume como eu trabalho: pesquisa que tem coragem de contradizer a ideia
                  inicial, decisões documentadas (inclusive as chatas, como contraste), e obsessão
                  por reduzir o esforço de quem usa. Foi atendendo mais de 20.000 chamados
                  de suporte que eu aprendi que quase todo "problema do usuário" é, na verdade, um
                  problema de design.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Closing */}
            <AnimateOnScroll>
              <div className="pt-4 border-t border-sona-off/10">
                <div className="mt-10 flex flex-col gap-8">
                  {/* Linha 1: CTAs */}
                  <div className="flex items-center gap-4">
                    <a
                      href="https://www.figma.com/design/JH7ZB20Ofzt3cgdFnxGrPW/SONA---Planejador-Financeiro?m=auto&t=MrxcASAIUAliQyOX-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs text-sona-off border border-sona-off/30 hover:border-sona-coral/60 px-4 py-2 rounded-sm transition-all duration-200"
                    >
                      Ver o projeto no Figma
                      <ArrowUpRight size={12} />
                    </a>
                    <a
                      href="https://linkedin.com/in/andreo-barbosa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn de Andreo Barbosa"
                      className="text-sona-off/60 hover:text-sona-coral transition-colors duration-200"
                    >
                      <LinkedInIcon className="w-[18px] h-[18px]" />
                    </a>
                  </div>

                  {/* Linha 2: navegação entre cases */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                    <Link
                      to="/#projetos"
                      className="inline-flex items-center gap-2 font-mono text-xs text-sona-off/60 hover:text-sona-off transition-colors duration-200"
                    >
                      <ArrowLeft size={12} />
                      Voltar aos projetos
                    </Link>

                    <Link
                      to="/case/sysmed"
                      className="font-mono text-xs text-sona-off/60 hover:text-sona-off transition-colors duration-200 whitespace-nowrap"
                    >
                      Próximo case → Onde a IA erra ao avaliar um sistema hospitalar
                    </Link>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </SonaSection>

      </main>
      <Footer />
    </>
  )
}
