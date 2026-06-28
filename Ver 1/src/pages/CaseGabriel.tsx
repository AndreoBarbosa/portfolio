import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SectionLabel from '../components/ui/SectionLabel'
import AnimateOnScroll from '../components/ui/AnimateOnScroll'
import Callout from '../components/ui/Callout'
import ProjectImage from '../components/ui/ProjectImage'

const metaTags = [
  'UX/UI Design',
  'Pesquisa com usuário',
  'Identidade visual',
  'Front-end (HTML/CSS/JS)',
  'Deploy',
]

const quickInfo = [
  { label: 'Papel', value: 'UX/UI Designer e Front-end (solo)' },
  { label: 'Cliente', value: 'Gabriel Alves — Psicólogo Clínico' },
  { label: 'Entregável', value: 'Landing page responsiva em domínio próprio' },
  { label: 'Duração', value: '1 mês' },
]

export default function CaseGabriel() {
  return (
    <>
      <Header />
      <main className="pt-20">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-amber/4 blur-[140px]" />
          </div>

          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/#projetos"
                className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-cream transition-colors duration-200 mb-10 group"
              >
                <ArrowLeft size={12} className="transition-transform duration-200 group-hover:-translate-x-1" />
                Voltar aos projetos
              </Link>
            </motion.div>

            <div className="max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="font-mono text-xs text-amber tracking-widest uppercase mb-5"
              >
                CASE STUDY · 01
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-satoshi font-semibold text-cream text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Landing page para psicólogo clínico
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-muted text-lg leading-relaxed mb-8"
              >
                Como transformar uma identidade digital desatualizada em uma experiência
                que acolhe, transmite confiança e converte visitantes em pacientes.
              </motion.p>

              {/* Meta tags */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-2 mb-10"
              >
                {metaTags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-muted border border-muted/20 px-2.5 py-1 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-5"
              >
                <a
                  href="https://psicologogabrielalves.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-amber hover:text-amber/70 border border-amber/30 hover:border-amber/60 px-4 py-2 rounded-sm transition-all duration-200"
                >
                  Ver projeto no ar
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href="#visao-geral"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-cream transition-colors duration-200"
                >
                  Ler o case
                  <ChevronDown size={12} />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── HERO IMAGE ── */}
        <AnimateOnScroll>
          <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-4">
            <ProjectImage
              src="/projects/gabriel/desktop-hero.png"
              alt="Hero da landing page do Psicólogo Gabriel Alves — visão desktop"
              size="wide"
            />
          </div>
        </AnimateOnScroll>

        {/* ── FICHA RÁPIDA ── */}
        <AnimateOnScroll>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 mb-20">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-cream/5 rounded-sm overflow-hidden border border-cream/5">
              {quickInfo.map((item) => (
                <div key={item.label} className="bg-ink px-5 py-5">
                  <p className="font-mono text-xs text-muted tracking-wider uppercase mb-1.5">
                    {item.label}
                  </p>
                  <p className="text-cream text-sm leading-snug">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* ── CONTENT COLUMN ── */}
        <div id="visao-geral" className="max-w-3xl mx-auto px-6 lg:px-8 space-y-20 pb-32">

          {/* /01 — Visão Geral */}
          <AnimateOnScroll>
            <section>
              <SectionLabel index="/01" label="Visão Geral" />
              <div className="prose-case">
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
                  foi uma landing page enxuta, com um único objetivo claro — levar o visitante a
                  agendar a primeira conversa pelo WhatsApp.
                </p>
              </div>
            </section>
          </AnimateOnScroll>

          {/* /02 — O Problema */}
          <AnimateOnScroll>
            <section>
              <SectionLabel index="/02" label="O Problema" />
              <div className="prose-case">
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
                <Callout label="A pergunta que guiou o projeto">
                  Como transformar a primeira impressão digital em uma sensação de acolhimento
                  e confiança que leve a pessoa a dar o primeiro passo?
                </Callout>
              </div>
            </section>
          </AnimateOnScroll>

          {/* /03 — Pesquisa e Descoberta */}
          <AnimateOnScroll>
            <section>
              <SectionLabel index="/03" label="Pesquisa e Descoberta" />
              <div className="prose-case">
                <p>
                  Antes de desenhar qualquer tela, conduzi uma entrevista com o Gabriel para
                  entender três coisas: quem ele é como profissional, quem é o paciente que ele
                  quer atrair, e qual estética representa esses dois lados. A entrevista cobriu
                  identidade profissional, público-alvo (incluindo o atendimento afirmativo
                  LGBTQIA+ como diferencial central) e gosto estético.
                </p>
                <Callout label="Decisão de pesquisa">
                  Em vez de partir de suposições sobre "como um site de psicólogo deve ser",
                  deixei o conteúdo e a estética emergirem de quem o Gabriel realmente é e de
                  quem ele quer atender. Isso é o que separou o projeto de um template genérico.
                </Callout>
              </div>
            </section>
          </AnimateOnScroll>

          {/* Persona — wide image */}
          <AnimateOnScroll>
            <ProjectImage
              src="/projects/gabriel/Persona — Rafael Santos.png"
              alt="Persona Rafael Santos — público-alvo do Psicólogo Gabriel Alves"
              caption="Persona Rafael Santos — sintetiza o público-alvo e guiou todas as decisões de UX"
              size="wide"
            />
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="prose-case">
              <p>
                Três achados que guiaram o projeto: o público "não sabe onde buscar ajuda",
                o que reforçou a necessidade de um CTA óbvio e da seção "Como funciona";
                ele busca informação no celular, o que confirmou a prioridade mobile; e a
                sensibilidade a julgamento ancourou o tom acolhedor e o destaque afirmativo
                em posição de destaque.
              </p>
            </div>
          </AnimateOnScroll>

          {/* /04 — Estratégia e Decisões de UX */}
          <AnimateOnScroll>
            <section>
              <SectionLabel index="/04" label="Estratégia e Decisões de UX" />
              <div className="prose-case">
                <p>
                  Quatro princípios guiaram cada decisão ao longo do projeto:
                </p>

                <div className="space-y-1 mt-6">
                  <Callout label="Um único objetivo, sem distrações">
                    A página inteira gira em torno de uma ação: agendar a primeira conversa.
                    O botão de WhatsApp aparece no topo e se repete na rolagem, com linguagem
                    convidativa ("Agendar minha primeira conversa") em vez de fria.
                  </Callout>

                  <Callout label="Acolhimento como tom de voz">
                    A chamada principal — "Um espaço seguro para você ser quem é" — comunica
                    segurança antes de qualquer informação técnica. O emocional vem primeiro,
                    o racional confirma.
                  </Callout>

                  <Callout label="Confiança através de credenciais visíveis">
                    Formação na PUC-Rio, CRP, modalidades de atendimento e o atendimento
                    afirmativo LGBTQIA+ posicionados logo no início da página — o visitante
                    confirma a credibilidade sem precisar procurar.
                  </Callout>

                  <Callout label="Estrutura que responde às dúvidas na ordem certa">
                    Áreas de atuação → sobre o profissional → como funciona → FAQ. Cada seção
                    antecipa a próxima pergunta natural do visitante.
                  </Callout>
                </div>
              </div>
            </section>
          </AnimateOnScroll>

        </div>

        {/* Prints full-width */}
        <AnimateOnScroll>
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <ProjectImage
              src="/projects/gabriel/desktop-areas.png"
              alt="Seção de áreas de atuação da landing page — 6 cards com especialidades"
              caption="Áreas de atuação — 6 cards, escaneáveis, com linguagem direta"
              size="wide"
            />
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <ProjectImage
              src="/projects/gabriel/desktop-como-funciona.png"
              alt="Seção 'Como funciona' — etapas do processo de agendamento"
              caption="Como funciona — elimina a incerteza sobre o processo"
              size="wide"
            />
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-4">
            <ProjectImage
              src="/projects/gabriel/desktop-faq.png"
              alt="Seção de FAQ — perguntas frequentes em formato acordeão"
              caption="FAQ — responde as dúvidas antes que virem objeções"
              size="wide"
            />
          </div>
        </AnimateOnScroll>

        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-20 pb-32">

          {/* /05 — Identidade Visual */}
          <AnimateOnScroll>
            <section>
              <SectionLabel index="/05" label="Identidade Visual" />
              <div className="prose-case">
                <p>
                  As escolhas visuais emergiram diretamente da entrevista com o Gabriel — não
                  de um moodboard genérico de "sites de psicólogo":
                </p>
                <p>
                  <strong className="text-cream font-medium">Tipografia:</strong> Sentient
                  (serifada) nos títulos — humanidade e cuidado; Plus Jakarta Sans (sem-serifa)
                  no corpo — legibilidade e modernidade. O contraste entre as duas cria hierarquia
                  sem precisar de recursos gráficos pesados.
                </p>
                <p>
                  <strong className="text-cream font-medium">Paleta:</strong> verdes (sage, moss)
                  e terrosos (sand, beige) — calma, equilíbrio e acolhimento. Tons que remetem
                  à natureza e ao cuidado, sem o estereótipo clínico do branco e azul.
                </p>
                <p>
                  As imagens foram geradas por IA com prompts próprios, mantendo controle total
                  da estética e garantindo coerência — eliminando a genericidade dos bancos de
                  imagem. Muito espaço em branco reforça a sensação de calma que o serviço
                  precisa transmitir.
                </p>
                <Callout label="Decisão de design">
                  Usei geração de imagens por IA com prompts próprios para manter controle
                  total da estética e garantir coerência visual — uma alternativa eficiente a
                  bancos de imagem que quase sempre entregam rostos genéricos e cenas artificiais.
                </Callout>
              </div>
            </section>
          </AnimateOnScroll>

          {/* /06 — Execução Técnica */}
          <AnimateOnScroll>
            <section>
              <SectionLabel index="/06" label="Execução Técnica" />
              <div className="prose-case">
                <p>
                  Desenvolvi a landing em <strong className="text-cream font-medium">HTML e
                  CSS puros</strong>, sem WordPress nem construtores de página. Decisão
                  deliberada: performance (página estática carrega rápido), controle total
                  (cada detalhe como planejado) e manutenção simples e barata (sem plugins
                  ou vulnerabilidades de CMS).
                </p>
                <p>
                  Totalmente responsiva (mobile-first), com cinco breakpoints, ajustando
                  tipografia, espaçamentos e a posição dos botões. Intersection Observer
                  para revelar elementos no scroll, e um acordeão para o FAQ — detalhes
                  que dão vida sem comprometer a performance. Publicada em domínio próprio.
                </p>
                <Callout label="Decisão técnica">
                  Abrir mão do WordPress foi escolher simplicidade e performance. Para uma
                  landing de objetivo único, o CMS só adicionaria peso e pontos de falha.
                  HTML/CSS estático carrega mais rápido, não tem plugin para atualizar,
                  não tem vulnerabilidade de segurança para monitorar.
                </Callout>
              </div>
            </section>
          </AnimateOnScroll>

        </div>

        {/* Responsive print — wide */}
        <AnimateOnScroll>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-4">
            <ProjectImage
              src="/projects/gabriel/responsive-desktop-mobile.png"
              alt="Comparativo desktop e mobile — responsividade da landing page"
              caption="Mobile-first — a maior parte do tráfego por terapia vem do celular"
              size="wide"
            />
          </div>
        </AnimateOnScroll>

        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-20 pb-32">

          {/* /07 — Resultado */}
          <AnimateOnScroll>
            <section>
              <SectionLabel index="/07" label="Resultado" />
              <div className="prose-case">
                <p>
                  Uma landing page no ar, responsiva e alinhada à identidade do Gabriel,
                  com um caminho claro do visitante até o agendamento.
                </p>
                <ul className="space-y-2 mt-4">
                  <li>Comunica acolhimento e profissionalismo desde o primeiro scroll</li>
                  <li>Caminho de conversão direto e sem distrações — CTA de WhatsApp</li>
                  <li>Carregamento rápido e experiência otimizada para mobile</li>
                  <li>Custo de manutenção mínimo — sem dependências de CMS</li>
                </ul>
                <p className="text-muted/60 text-sm mt-8 border border-cream/5 px-4 py-3 rounded-sm">
                  Espaço reservado para métricas e depoimento do cliente — a adicionar.
                </p>
              </div>
            </section>
          </AnimateOnScroll>

          {/* /08 — Aprendizados */}
          <AnimateOnScroll>
            <section>
              <SectionLabel index="/08" label="Aprendizados" />
              <div className="prose-case">
                <p>
                  <strong className="text-cream font-medium">A entrevista guiou tudo.</strong>{' '}
                  As decisões mais fortes vieram de entender quem era o Gabriel e quem ele
                  queria atender — foi o que impediu o projeto de virar template.
                </p>
                <p>
                  <strong className="text-cream font-medium">Em saúde mental, sentir vem
                  antes de entender.</strong> Priorizei o tom emocional tanto quanto a
                  informação — a hierarquia do conteúdo reflete isso.
                </p>
                <p>
                  <strong className="text-cream font-medium">Simplicidade com propósito.</strong>{' '}
                  Página única, um CTA, HTML/CSS em vez de WordPress — escolhas conscientes
                  a favor do objetivo.
                </p>
                <Callout label="O que eu faria diferente">
                  Gostaria de ter testado a página com pessoas reais do público-alvo antes
                  de publicar, mesmo com a aprovação do cliente. Aprovação do cliente confirma
                  se a página agrada <em>a ele</em>; testar com usuários reais traria uma
                  métrica concreta de impacto e ajudaria a expor possíveis vieses meus.
                  Aprovação e validação respondem perguntas diferentes — e eu só tinha a primeira.
                </Callout>
              </div>
            </section>
          </AnimateOnScroll>

          {/* Closing */}
          <AnimateOnScroll>
            <section className="pt-4 border-t border-cream/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://psicologogabrielalves.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-amber hover:text-amber/70 border border-amber/30 hover:border-amber/60 px-4 py-2 rounded-sm transition-all duration-200"
                  >
                    Ver projeto no ar
                    <ArrowUpRight size={12} />
                  </a>
                  <Link
                    to="/#projetos"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-cream transition-colors duration-200"
                  >
                    <ArrowLeft size={12} />
                    Voltar aos projetos
                  </Link>
                </div>

                {/* Placeholder for next case */}
                <div className="font-mono text-xs text-muted/30 tracking-wide cursor-not-allowed">
                  Próximo case → em breve
                </div>
              </div>
            </section>
          </AnimateOnScroll>

        </div>
      </main>
      <Footer />
    </>
  )
}
