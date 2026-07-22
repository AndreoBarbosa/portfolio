import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SectionLabel from '../components/ui/SectionLabel'
import AnimateOnScroll from '../components/ui/AnimateOnScroll'
import Callout from '../components/ui/Callout'
import ProjectImage from '../components/ui/ProjectImage'
import GabrielSection from '../components/ui/GabrielSection'
import { LinkedInIcon } from '../components/icons/LinkedInIcon'
import usePageMeta from '../hooks/usePageMeta'

const IMG = '/projects/gabriel'
const TEXT_COL = 'max-w-[720px]'

const metaTagsLine = 'UX/UI Design · Pesquisa com usuário · Identidade visual · Front-end e Deploy'

const quickInfo = [
  { label: 'Papel', value: 'UX/UI Designer e Front-end (solo)' },
  { label: 'Cliente', value: 'Gabriel Alves, Psicólogo Clínico' },
  { label: 'Entregável', value: 'Landing page responsiva em domínio próprio' },
  { label: 'Duração', value: '1 mês' },
]

const principles = [
  {
    n: '01',
    label: 'Um único objetivo, sem distrações',
    body: 'A página inteira gira em torno de uma ação: agendar a primeira conversa. O botão de WhatsApp aparece no topo e se repete na rolagem, com linguagem convidativa ("Agendar minha primeira conversa") em vez de fria.',
  },
  {
    n: '02',
    label: 'Acolhimento como tom de voz',
    body: 'A chamada principal, "Um espaço seguro para você ser quem é", comunica segurança antes de qualquer informação técnica. O emocional vem primeiro, o racional confirma.',
  },
  {
    n: '03',
    label: 'Confiança através de credenciais visíveis',
    body: 'Formação na PUC-Rio, CRP, modalidades de atendimento e o atendimento afirmativo LGBTQIA+ posicionados logo no início da página. O visitante confirma a credibilidade sem precisar procurar.',
  },
  {
    n: '04',
    label: 'Estrutura que responde às dúvidas na ordem certa',
    body: 'Áreas de atuação → sobre o profissional → como funciona → FAQ. Cada seção antecipa a próxima pergunta natural do visitante.',
  },
]

export default function CaseGabriel() {
  usePageMeta({
    title: 'Landing page para psicólogo clínico: Case | Andreo Barbosa',
    description:
      'Como transformar uma identidade digital desatualizada em uma experiência que acolhe, transmite confiança e converte visitantes em pacientes.',
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
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="font-mono text-case-xs text-gabriel-sage tracking-widest uppercase mb-6"
                >
                  Case Study · 03
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-outfit font-light text-gabriel-offwhite text-case-3xl md:text-case-5xl leading-[1.1] mb-6"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  Landing page para psicólogo clínico
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-gabriel-offwhite/70 text-[18px] md:text-case-lg leading-[1.5] max-w-[560px] mb-12"
                >
                  Como transformar uma identidade digital desatualizada em uma experiência
                  que acolhe, transmite confiança e converte visitantes em pacientes.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="max-w-[640px] border-t border-gabriel-offwhite/10 pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6"
                >
                  {quickInfo.map((item) => (
                    <div key={item.label}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-gabriel-offwhite/50">
                        {item.label}
                      </p>
                      <p className="font-outfit font-normal text-[14px] text-gabriel-offwhite mt-4">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="font-mono text-case-xs uppercase tracking-widest leading-[1.8] text-gabriel-offwhite/50 mt-6 mb-10"
                >
                  {metaTagsLine}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap gap-6"
                >
                  <a
                    href="https://psicologogabrielalves.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs text-gabriel-sage hover:text-gabriel-sage/70 border border-gabriel-sage/30 hover:border-gabriel-sage/60 px-4 py-2 rounded-sm transition-all duration-200"
                  >
                    Ver projeto no ar
                    <ArrowUpRight size={12} />
                  </a>
                  <a
                    href="#visao-geral"
                    className="inline-flex items-center gap-2 font-mono text-xs text-gabriel-offwhite/60 hover:text-gabriel-offwhite transition-colors duration-200"
                  >
                    Ler o case
                    <ChevronDown size={12} />
                  </a>
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

        {/* ── /01 VISÃO GERAL ── */}
        <GabrielSection tone="light" id="visao-geral">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <SectionLabel index="/01" label="Visão Geral" tone="gabriel-light" />
                <div className="space-y-6 text-gabriel-mossDark text-case-base leading-relaxed">
                  <p>
                    Gabriel Alves é psicólogo clínico (CRP 05/62312), formado pela PUC-Rio, que
                    atende online para todo o Brasil e presencialmente no centro do Rio de Janeiro,
                    com foco em atendimento afirmativo para pessoas LGBTQIA+. Ele tinha um site
                    antigo que não comunicava o valor do seu trabalho nem ajudava a converter
                    visitantes em pacientes.
                  </p>
                  <p>
                    Minha atuação foi integral: definição de público, decisões de identidade visual,
                    redação da estrutura da página, desenvolvimento front-end e publicação. O resultado
                    foi uma landing page enxuta, com um único objetivo claro: levar o visitante a
                    agendar a primeira conversa pelo WhatsApp.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </GabrielSection>

        {/* ── /02 O PROBLEMA ── */}
        <GabrielSection tone="dark">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <SectionLabel index="/02" label="O Problema" tone="gabriel-dark" />
                <div className="space-y-6 text-gabriel-offwhite/80 text-case-base leading-relaxed">
                  <p>
                    O site existente era visualmente datado e não transmitia a essência do trabalho
                    do Gabriel. Para um profissional de saúde mental, isso é crítico: a decisão de
                    procurar terapia é sensível e emocional, e o primeiro contato com o profissional
                    muitas vezes acontece pelo site. Um site frio ou amador gera desconfiança e afasta
                    o paciente antes mesmo da primeira mensagem.
                  </p>
                  <p>
                    Havia três problemas centrais: o site não comunicava valor nem personalidade;
                    havia ausência de um caminho claro para agendamento; e a estética estava
                    desalinhada do público que ele queria atender.
                  </p>
                </div>
                <Callout label="A pergunta que guiou o projeto" tone="gabriel-dark">
                  Como transformar a primeira impressão digital em uma sensação de acolhimento
                  e confiança que leve a pessoa a dar o primeiro passo?
                </Callout>
              </div>
            </AnimateOnScroll>
          </div>
        </GabrielSection>

        {/* ── /03 PESQUISA E DESCOBERTA ── */}
        <GabrielSection tone="light">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <SectionLabel index="/03" label="Pesquisa e Descoberta" tone="gabriel-light" />
                <div className="space-y-6 text-gabriel-mossDark text-case-base leading-relaxed">
                  <p>
                    Antes de desenhar qualquer tela, conduzi uma entrevista com o Gabriel para
                    entender três coisas: quem ele é como profissional, quem é o paciente que ele
                    quer atrair, e qual estética representa esses dois lados. A entrevista cobriu
                    identidade profissional, público-alvo (incluindo o atendimento afirmativo
                    LGBTQIA+ como diferencial central) e gosto estético.
                  </p>
                </div>
                <Callout label="Decisão de pesquisa" tone="gabriel-light">
                  Em vez de partir de suposições sobre "como um site de psicólogo deve ser",
                  deixei o conteúdo e a estética emergirem de quem o Gabriel realmente é e de
                  quem ele quer atender. Isso é o que separou o projeto de um template genérico.
                </Callout>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/Persona — Rafael Santos.png`}
                alt="Persona Rafael Santos, público-alvo do Psicólogo Gabriel Alves"
                caption="Persona Rafael Santos: sintetiza o público-alvo e guiou todas as decisões de UX"
                size="wide"
                tone="gabriel-light"
              />
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className={`${TEXT_COL} text-gabriel-mossDark text-case-base leading-relaxed`}>
                <p>
                  Três achados que guiaram o projeto: o público "não sabe onde buscar ajuda",
                  o que reforçou a necessidade de um CTA óbvio e da seção "Como funciona";
                  ele busca informação no celular, o que confirmou a prioridade mobile; e a
                  sensibilidade a julgamento ancorou o tom acolhedor e o destaque afirmativo
                  em posição de destaque.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </GabrielSection>

        {/* ── /04 ESTRATÉGIA E DECISÕES DE UX ── */}
        <GabrielSection tone="dark">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <SectionLabel index="/04" label="Estratégia e Decisões de UX" tone="gabriel-dark" />
                <p className="text-gabriel-offwhite/80 text-case-base leading-relaxed mb-8">
                  Quatro princípios guiaram cada decisão ao longo do projeto:
                </p>
              </div>

              <div className="grid gap-4">
                {principles.map(({ n, label, body }) => (
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
                      <p className="font-mono text-case-xs text-gabriel-sage tracking-widest uppercase mb-2">
                        {label}
                      </p>
                      <p className="text-gabriel-offwhite/70 leading-relaxed text-case-sm">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </GabrielSection>

        {/* ── PRINTS: ÁREAS · COMO FUNCIONA · FAQ ── */}
        <GabrielSection tone="light">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/desktop-areas.png`}
                alt="Seção de áreas de atuação da landing page, com 6 cards de especialidades"
                caption="Áreas de atuação: 6 cards, escaneáveis, com linguagem direta"
                size="wide"
                tone="gabriel-light"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/desktop-como-funciona.png`}
                alt="Seção 'Como funciona', com as etapas do processo de agendamento"
                caption="Como funciona: elimina a incerteza sobre o processo"
                size="wide"
                tone="gabriel-light"
              />
            </AnimateOnScroll>
            <AnimateOnScroll>
              <ProjectImage
                src={`${IMG}/desktop-faq.png`}
                alt="Seção de FAQ, com perguntas frequentes em formato acordeão"
                caption="FAQ: responde as dúvidas antes que virem objeções"
                size="wide"
                tone="gabriel-light"
              />
            </AnimateOnScroll>
          </div>
        </GabrielSection>

        {/* ── /05 IDENTIDADE VISUAL ── */}
        <GabrielSection tone="dark">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <SectionLabel index="/05" label="Identidade Visual" tone="gabriel-dark" />
                <div className="space-y-6 text-gabriel-offwhite/80 text-case-base leading-relaxed">
                  <p>
                    As escolhas visuais emergiram diretamente da entrevista com o Gabriel, não
                    de um moodboard genérico de "sites de psicólogo":
                  </p>
                  <p>
                    <strong className="text-gabriel-offwhite font-medium">Tipografia:</strong> Sentient
                    (serifada) nos títulos: humanidade e cuidado; Plus Jakarta Sans (sem-serifa)
                    no corpo: legibilidade e modernidade. O contraste entre as duas cria hierarquia
                    sem precisar de recursos gráficos pesados.
                  </p>
                  <p>
                    <strong className="text-gabriel-offwhite font-medium">Paleta:</strong> verdes (sage, moss)
                    e terrosos (sand, beige): calma, equilíbrio e acolhimento. Tons que remetem
                    à natureza e ao cuidado, sem o estereótipo clínico do branco e azul.
                  </p>
                  <p>
                    As imagens foram geradas por IA com prompts próprios, mantendo controle total
                    da estética e garantindo coerência, eliminando a genericidade dos bancos de
                    imagem. Muito espaço em branco reforça a sensação de calma que o serviço
                    precisa transmitir.
                  </p>
                </div>
                <Callout label="Decisão de design" tone="gabriel-dark">
                  Usei geração de imagens por IA com prompts próprios para manter controle
                  total da estética e garantir coerência visual: uma alternativa eficiente a
                  bancos de imagem que quase sempre entregam rostos genéricos e cenas artificiais.
                </Callout>
              </div>
            </AnimateOnScroll>
          </div>
        </GabrielSection>

        {/* ── /06 EXECUÇÃO TÉCNICA ── */}
        <GabrielSection tone="light">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <SectionLabel index="/06" label="Execução Técnica" tone="gabriel-light" />
                <div className="space-y-6 text-gabriel-mossDark text-case-base leading-relaxed">
                  <p>
                    Desenvolvi a landing em <strong className="text-gabriel-mossDark font-medium">HTML e
                    CSS puros</strong>, sem WordPress nem construtores de página. Decisão
                    deliberada: performance (página estática carrega rápido), controle total
                    (cada detalhe como planejado) e manutenção simples e barata (sem plugins
                    ou vulnerabilidades de CMS).
                  </p>
                  <p>
                    Totalmente responsiva (mobile-first), com cinco breakpoints, ajustando
                    tipografia, espaçamentos e a posição dos botões. Intersection Observer
                    para revelar elementos no scroll, e um acordeão para o FAQ, detalhes
                    que dão vida sem comprometer a performance. Publicada em domínio próprio.
                  </p>
                </div>
                <Callout label="Decisão técnica" tone="gabriel-light">
                  Abrir mão do WordPress foi escolher simplicidade e performance. Para uma
                  landing de objetivo único, o CMS só adicionaria peso e pontos de falha.
                  HTML/CSS estático carrega mais rápido, não tem plugin para atualizar,
                  não tem vulnerabilidade de segurança para monitorar.
                </Callout>
              </div>
            </AnimateOnScroll>
          </div>
        </GabrielSection>

        {/* ── RESPONSIVE PRINT ── */}
        <GabrielSection tone="dark">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
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

        {/* ── /07 RESULTADO ── */}
        <GabrielSection tone="light">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <SectionLabel index="/07" label="Resultado" tone="gabriel-light" />
                <div className="text-gabriel-mossDark text-case-base leading-relaxed">
                  <p className="mb-6">
                    Uma landing page no ar, responsiva e alinhada à identidade do Gabriel,
                    com um caminho claro do visitante até o agendamento.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Comunica acolhimento e profissionalismo desde o primeiro scroll',
                      'Caminho de conversão direto e sem distrações, com CTA de WhatsApp',
                      'Carregamento rápido e experiência otimizada para mobile',
                      'Custo de manutenção mínimo, sem dependências de CMS',
                    ].map((item) => (
                      <li key={item} className="pl-4 relative">
                        <span className="absolute left-0 text-gabriel-moss" aria-hidden="true">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gabriel-mossDark text-case-sm mt-8 border border-gabriel-mossDark/15 px-4 py-4 rounded-sm">
                    Espaço reservado para métricas e depoimento do cliente, a adicionar.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </GabrielSection>

        {/* ── /08 APRENDIZADOS ── */}
        <GabrielSection tone="dark" className="pb-24 md:pb-32">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <AnimateOnScroll>
              <div className={TEXT_COL}>
                <SectionLabel index="/08" label="Aprendizados" tone="gabriel-dark" />
                <div className="space-y-6 text-gabriel-offwhite/80 text-case-base leading-relaxed">
                  <p>
                    <strong className="text-gabriel-offwhite font-medium">A entrevista guiou tudo.</strong>{' '}
                    As decisões mais fortes vieram de entender quem era o Gabriel e quem ele
                    queria atender. Foi o que impediu o projeto de virar template.
                  </p>
                  <p>
                    <strong className="text-gabriel-offwhite font-medium">Em saúde mental, sentir vem
                    antes de entender.</strong> Priorizei o tom emocional tanto quanto a
                    informação. A hierarquia do conteúdo reflete isso.
                  </p>
                  <p>
                    <strong className="text-gabriel-offwhite font-medium">Simplicidade com propósito.</strong>{' '}
                    Página única, um CTA, HTML/CSS em vez de WordPress: escolhas conscientes
                    a favor do objetivo.
                  </p>
                </div>
                <Callout label="O que eu faria diferente" tone="gabriel-dark">
                  Gostaria de ter testado a página com pessoas reais do público-alvo antes
                  de publicar, mesmo com a aprovação do cliente. Aprovação do cliente confirma
                  se a página agrada <em>a ele</em>; testar com usuários reais traria uma
                  métrica concreta de impacto e ajudaria a expor possíveis vieses meus.
                  Aprovação e validação respondem perguntas diferentes. E eu só tinha a primeira.
                </Callout>
              </div>
            </AnimateOnScroll>

            {/* Closing */}
            <AnimateOnScroll>
              <div className="pt-4 border-t border-gabriel-offwhite/10">
                <div className="mt-10 flex flex-col gap-8">
                  {/* Linha 1: CTAs */}
                  <div className="flex items-center gap-4">
                    <a
                      href="https://psicologogabrielalves.com.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs text-gabriel-sage hover:text-gabriel-sage/70 border border-gabriel-sage/30 hover:border-gabriel-sage/60 px-4 py-2 rounded-sm transition-all duration-200"
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
