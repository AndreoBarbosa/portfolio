// Conteúdo do case SONA — reescrito a partir do nó 577:2013 do Figma
// (arquivo "Portifolio", frame "Sona — Case Page"), lido literalmente via
// MCP. Cada bloco abaixo corresponde a uma seção do mapa do briefing
// (S02–S17). Não editar copy aqui sem conferir o nó de origem — texto
// duplicado ou truncado deve ser resolvido no Figma, não aqui.
//
// Preenchido incrementalmente por checkpoint (B2: S02–S05). Blocos
// S06–S17 chegam nos próximos checkpoints (B3–B5).

export type IconCardItem = {
  icon: string
  title: string
  body: string
}

// Cores exclusivas do conteúdo do case SONA — não existem nos tokens
// globais do site (liquid-glass.css). Usadas só dentro de componentes de
// conteúdo desta página (eyebrow, callouts, painéis escuros, cards),
// nunca em chrome (navbar/footer/botão global). Ver B0 §6 do briefing.
export const sonaAccent = {
  /** segundária-500 — eyebrow, ícones de callout, texto de chip informativo */
  blue: '#355972',
  /** segundária-50 — fundo do callout */
  blueSoft: '#EBEEF1',
  /** border/card — borda de callout e superfícies claras */
  cardBorder: '#EDEAE3',
  /** segundária-900 — fundo dos painéis escuros (Briefing, Princípios) */
  panelBg: '#162530',
  /** text/secondary — corpo de texto dentro de cards claros */
  textSecondary: '#6B7280',
  /** text/faint (Figma) — legendas pequenas sobre fundo claro */
  textFaint: '#9CA3AF',
  /** brand/green real do Sona (pós-fix de contraste, ver S12) */
  green: '#628E70',
  /** segundária-700 — divisória sutil dentro de painéis claros (S06, S09) */
  beforeBorder: '#263F51',
  /** segundária-100 (claro) — cartão "Hipótese de design" (S06) e painel
      "Decisão" (S09); mesmo tom, dois contextos */
  hypothesisBg: '#DFEBF3',
  /** text/secondary escuro usado nas linhas da tabela S08 */
  tableBody: '#4C515B',
  /** "O que entrou" (S09) — verde real do Sona */
  enteredTitle: '#628E70',
  /** "O que ficou de fora" (S09) — terracota */
  excludedTitle: '#8F3A22',
  /** Borda dos cards de contraste (S12) — tom quase idêntico a
      cardBorder, mas distinto no Figma (#EFEFEE vs #EDEAE3) */
  contrastBorder: '#EFEFEE',
} as const

// ---------------------------------------------------------------------
// S02 — Hero
// ---------------------------------------------------------------------
export const hero = {
  eyebrow: 'UX Research · Product Design · Fintech',
  title: 'Decidir é mais difícil que calcular.',
  body: 'Um planejador financeiro que transforma dados bancários em direção, ajudando pessoas a entender quanto podem usar, onde alocar e qual decisão tomar a seguir.',
  primaryCta: { label: 'Ver o protótipo' },
  secondaryCta: { label: 'Ver no Figma' },
}

// ---------------------------------------------------------------------
// S03 — Visão Geral
// ---------------------------------------------------------------------
export const overview = {
  eyebrow: 'VISÃO GERAL',
  title: 'Dados financeiros não faltam. Clareza para decidir, sim.',
  body: 'O Sona utiliza Open Finance para consolidar dados, gerar um diagnóstico e ajudar o usuário a distribuir sua renda entre objetivos financeiros.',
  features: [
    { icon: 'PenLine', title: 'Menos trabalho manual', body: 'Os dados vêm das contas conectadas, reduzindo a necessidade de registrar movimentações.' },
    { icon: 'Lightbulb', title: 'Clareza antes da profundidade', body: 'O produto prioriza o que ajuda na próxima decisão antes de apresentar mais informação.' },
    { icon: 'SlidersHorizontal', title: 'Orientação sem retirar controle', body: 'O sistema sugere uma distribuição, mas a decisão final continua sendo do usuário.' },
    { icon: 'Handshake', title: 'Confiança como requisito', body: 'Permissões, erros e consequências precisam ser compreensíveis antes da automação.' },
  ] satisfies IconCardItem[],
}

// ---------------------------------------------------------------------
// S04 — O Desafio
// ---------------------------------------------------------------------
export const challenge = {
  eyebrow: 'O DESAFIO',
  title: 'O problema parecia ser organização financeira. A pesquisa apontou para decisão.',
  // A2 (rodada de ajustes 01): bloco Antes/Depois passou de componente
  // codificado para a imagem exportada do Figma (mais fiel, sem duplicar
  // a lógica de composição). Slot 568×190 no Figma (nó 577:2060) — asset
  // em 1139×384 (~2x).
  beforeAfterImage: '/projects/sona/desafio/antes-depois.webp',
  beforeAfterAlt:
    'Reposicionamento do projeto: de Economic+, metas financeiras em grupo, para Sona, planejamento financeiro orientado por decisões.',
  paragraphs: [
    'Minha hipótese inicial era o Economic+, um aplicativo para criar metas financeiras compartilhadas entre casais e amigos. Mas a investigação mudou a direção do projeto.',
    'Os sinais encontrados apontam menos para uma dificuldade de criar objetivos e mais para o esforço envolvido em responder perguntas recorrentes:',
  ],
  chips: [
    'quanto posso usar?',
    'quanto deveria guardar?',
    'qual objetivo priorizar?',
    'o que faço com o dinheiro que sobrou?',
  ],
  changedQuestionLabel: 'Isso mudou a pergunta de design:',
  callout: 'Como reduzir o esforço necessário para transformar informação financeira em uma decisão?',
}

// ---------------------------------------------------------------------
// S05 — Briefing
// ---------------------------------------------------------------------
export const briefing = {
  eyebrow: 'BRIEFING',
  items: [
    { icon: 'Flag', title: 'Desafio', body: 'Transformar dados financeiros dispersos em uma experiência que ajude o usuário a decidir o próximo passo.' },
    { icon: 'Users', title: 'Usuário', body: 'Pessoas que conseguem acessar seus dados financeiros, mas têm dificuldade em transformá-los em planejamento.' },
    { icon: 'Target', title: 'Objetivo do produto', body: 'Reduzir esforço manual e apoiar decisões financeiras recorrentes com clareza e confiança.' },
    { icon: 'UserCog', title: 'Minha atuação', body: 'UX Research · IA · Arquitetura da Informação · UX/UI Design · Design System · Prototipação' },
    { icon: 'Layers', title: 'Escopo', body: 'Projeto conceitual desenvolvido end-to-end.' },
  ] satisfies IconCardItem[],
}

// ---------------------------------------------------------------------
// S06 — Pesquisa e Descoberta
// ---------------------------------------------------------------------
export const research = {
  eyebrow: 'PESQUISA E DESCOBERTA',
  title: 'Antes de desenhar a solução, eu precisava desafiar a hipótese.',
  body: 'Investigação exploratória com avaliações de apps financeiros, referências do Banco Central e Open Finance, e discussões em comunidades online.',
  // Larguras desiguais no Figma (item 01 = 1100px, itens 02–04 = 680px) —
  // confirmado acidente de layout (ponto 8.3 do briefing). Igualadas aqui.
  list: [
    { n: '01', title: 'Manutenção gera abandono', body: 'Quanto mais depende de registros manuais, maior o esforço para manter útil.' },
    { n: '02', title: 'Informação não é clareza', body: 'Mais gráficos e números não necessariamente ajudam a decidir.' },
    { n: '03', title: 'Confiança precede conexão', body: 'Antes de compartilhar dados, o usuário precisa compreender acesso e controle.' },
    { n: '04', title: 'A dificuldade está na decisão', body: 'Criar uma meta é simples. Definir quanto destinar a cada objetivo é o desafio.' },
  ],
  hypothesis: {
    label: 'Hipótese de design',
    question: 'Como reduzir o esforço necessário para transformar informação financeira em uma decisão?',
    answer: 'A solução deve transformar dados em clareza, priorizar o que importa e guiar próximos passos com confiança.',
  },
}

// ---------------------------------------------------------------------
// S07 — A Principal Decisão do Projeto
// ---------------------------------------------------------------------
export const mainDecision = {
  eyebrow: 'A PRINCIPAL DECISÃO DO PROJETO',
  title: 'A pesquisa não validou minha ideia. Ela tornou a ideia original desnecessária.',
  paragraphs: [
    'Abandonar uma solução já estruturada custou trabalho, mas insistir nela custaria o produto.',
    'A partir daqui, o projeto deixou de perguntar "como facilitar metas compartilhadas?" e passou a perguntar "como ajudar alguém a decidir o que fazer com o dinheiro disponível?"',
  ],
  // A3: imagem exportada já traz a composição completa (2 telas, sem
  // card/sombra separados a mais) — slot 500×311 no Figma (nó 577:2154),
  // asset em 1000×622 (2x). frame={false} na página: sem wrapper.
  image: '/projects/sona/decisao/principal-decisao.webp',
  imageAlt: 'Tela de metas do Economic+ com metas em grupo, ao lado da tela do Sona mostrando a sobra do mês dividida entre reserva e viagem',
}

// ---------------------------------------------------------------------
// S08 — Tabela de evidências (sem eyebrow — mesma seção Figma de S09/S10)
// ---------------------------------------------------------------------
export const evidence = {
  // A7: quebra autoral no Figma (nó 577:2159, dois <p> reais) — não é
  // wrap automático. "critério." também é a única palavra em destaque
  // azul (#355972) no título, o resto no texto forte padrão.
  titleLine1: 'Nem toda descoberta precisava virar funcionalidade.',
  titleLine2: 'Precisava virar ',
  titleHighlight: 'critério.',
  body: 'Sintetizei as evidências da pesquisa e as transformei em escolhas de design com impacto direto ao produto.',
  columns: ['EVIDÊNCIAS', 'O QUE ISSO SIGNIFICA', 'DECISÃO DE PRODUTO'],
  rows: [
    {
      // B2 (Ajustes 02): decisão corrigida no Figma (nó 585:3457) — era
      // "Manutenção gera abandono", duplicada com a linha 2.
      icon: 'Layers',
      evidence: 'Muita informação, pouca Clareza',
      meaning: 'Os dados existem, mas não estão organizados de forma que ajude a entender o que importa.',
      decision: 'Priorizar o que importa',
      decisionBody: 'Destacar exceções e o que exige atenção agora.',
    },
    {
      // B2: decisão corrigida no Figma (nó 585:3458) — era "Manutenção
      // gera abandono", duplicada com a linha 1.
      icon: 'CircleHelp',
      evidence: 'Perguntas recorrentes, respostas difíceis',
      meaning: 'As mesmas dúvidas aparecem sempre e consomem tempo e energia mental.',
      decision: 'Dar direção, não só informação',
      decisionBody: 'Transformar dados em respostas e próximos passos.',
    },
    {
      icon: 'Brain',
      evidence: 'Esforço mental para decidir',
      meaning: 'As pessoas gastam energia interprete nado números e comparando cenários.',
      decision: 'Reduzir carga cognitiva',
      decisionBody: 'Simplificar a leitura e guiar a decisão com contexto.',
    },
    {
      icon: 'ShieldAlert',
      evidence: 'Decisão com medo de errar',
      meaning: 'A falta de confiança em fazer escolhas certas gera insegurança e procrastinação.',
      decision: 'Construir confiança',
      decisionBody: 'Comunicar impacto e consequência antes da ação.',
    },
  ],
}

// ---------------------------------------------------------------------
// S09 — Priorização (matriz CSD) + Decisão
// ---------------------------------------------------------------------
export const priorityDecision = {
  priority: {
    title: 'Priorização',
    // Matriz CSD é gráfico vetorial complexo (eixos, 8 pontos, legenda) —
    // exportada do Figma como imagem, conforme decidido em B1.
    image: '/projects/sona/csd-matriz-priorizacao.webp',
    imageAlt: 'Matriz de priorização certeza/suposição/dúvida por impacto e viabilidade, com 8 funcionalidades posicionadas',
  },
  decision: {
    title: 'Decisão',
    entered: {
      label: 'O que entrou',
      items: [
        { icon: 'Bell', title: 'Priorização de alertas', body: 'Foco no que exige atenção agora.' },
        { icon: 'Compass', title: 'Orientação contextual', body: 'Respostas claras para as perguntas recorrentes.' },
        { icon: 'PersonStanding', title: 'Orientação para metas', body: 'Foco nos objetivos do usuário.' },
      ],
    },
    excluded: {
      label: 'O que ficou de fora',
      body: 'Funcionalidades que aumentavam o esforço decisório do usuário ou seria somente uma função acessório',
    },
  },
}

// ---------------------------------------------------------------------
// S10 — Princípios que guiaram o design
// ---------------------------------------------------------------------
export const principles = {
  title: 'Princípios que guiaram o design',
  items: [
    { icon: 'Zap', title: 'Automatizar o que é repetitivo.', body: 'Reduzir o esforço manual em tarefas operacionais libera tempo e atenção para decisões melhores.' },
    { icon: 'ShieldCheck', title: 'Explicar antes de pedir confiança.', body: 'Transparência gera segurança. O usuário entende o que acontece antes de confiar no que o sistema sugere.' },
    { icon: 'MessageCircleQuestion', title: 'Sugerir sem retirar autonomia.', body: 'As sugestões orientam, mas o controle permanece com o usuário em cada decisão importante.' },
    { icon: 'Eye', title: 'Mostrar apenas o necessário para decidir.', body: 'Menos informação, quando bem escolhida, aumenta a clareza e a qualidade da decisão.' },
  ] satisfies IconCardItem[],
}

// ---------------------------------------------------------------------
// S11 — Design e Prototipação
// ---------------------------------------------------------------------
export const prototyping = {
  eyebrow: 'DESIGN E PROTOTIPAÇÃO',
  title: 'Cada decisão de interface precisava reduzir uma decisão desnecessária.',
  cards: [
    {
      icon: 'Zap',
      title: 'Automatizar em vez de exigir manutenção',
      problem: 'Registros manuais aumentam o esforço para manter o planejamento atualizado.',
      decision: 'Usei Open Finance para atualizar os dados sem exigir preenchimento recorrente.',
      impact: 'Menos manutenção e uma experiência útil entre sessões.',
      image: '/projects/sona/prototipacao/01-automatizar.webp',
      imageDims: { width: 320, height: 552 },
    },
    {
      icon: 'ShieldCheck',
      title: 'Construir confiança antes da permissão',
      problem: 'Conectar uma conta bancária envolve percepção de risco.',
      decision: 'Expliquei quais dados serão acessados, para quê e como o acesso pode ser revogado.',
      impact: 'Confiança construída antes da autorização.',
      image: '/projects/sona/prototipacao/02-confianca.webp',
      imageDims: { width: 320, height: 546 },
    },
    {
      icon: 'MessageCircleQuestion',
      title: 'Sugerir sem decidir pelo usuário',
      problem: 'O usuário sabe criar uma meta, mas não sabe quanto destinar a cada uma.',
      decision: 'O Sona sugere uma distribuição, mantendo a decisão final com o usuário.',
      impact: 'Orientação com autonomia.',
      image: '/projects/sona/prototipacao/03-sugerir.webp',
      imageDims: { width: 320, height: 548 },
    },
  ],
  // A4: as 3 imagens têm proporção ligeiramente distinta entre si
  // (1.725 / 1.706 / 1.716) — normalizado pela altura no DecisionCard
  // (mesma altura de exibição nos 3 cards, object-cover). Reportado.
  systemRule: 'Regra do sistema: a alocação é virtual. Nenhum dinheiro é movimentado. Pausar ou excluir uma meta devolve o valor para a sobra disponível.',
}

// ---------------------------------------------------------------------
// S12 — Design System
// ---------------------------------------------------------------------
export const designSystem = {
  eyebrow: 'DESIGN SYSTEM',
  title: 'Consistência começa pelas regras, não pelas telas.',
  paragraphs: [
    'Durante a auditoria identifiquei que a cor principal da marca não possuía contraste suficiente para uso em textos e ações.',
    'Em vez de corrigir cada interface manualmente, atualizei o token, defini sua responsabilidade e documentei a regra no Design System.',
  ],
  contrast: {
    before: { label: 'ANTES', name: 'Verde original da marca', hex: '#7EA88A', swatch: '#7EA88A', ratio: '4.12 : 1', verdict: 'Não atende WCAG AA', pass: false },
    after: { label: 'DEPOIS', name: 'Verde para texto e ações', hex: '#628E70', swatch: '#628E70', ratio: '5.32 : 1', verdict: 'Atende WCAG AA', pass: true },
  },
  callout: 'Uma única alteração passou a beneficiar todas as telas atuais e futuras.',
}

// ---------------------------------------------------------------------
// S13 — Consistência para escalar com qualidade (sub-bloco de S12)
// ---------------------------------------------------------------------
export const consistency = {
  title: 'Consistência para escalar com qualidade',
  colorTokens: {
    label: 'TOKENS DE COR',
    items: [
      { swatch: '#0C1A22', title: 'Dados sensíveis', body: 'Ações envolvendo dados sensíveis' },
      { swatch: '#628E70', title: 'Progresso positivo', body: 'Progresso de ações já iniciadas' },
      { swatch: '#C96040', title: 'Conversão leves', body: 'Ações de conversão leve' },
    ],
  },
  typography: {
    label: 'Tipografia',
    family: 'Outfit',
    rows: [
      { role: 'H1', spec: '40/32 E. Light' },
      { role: 'H2', spec: '24/20 Light' },
      { role: 'Body', spec: '16/14 Regular' },
    ],
  },
  // Ícones de metas e componentes: exportados do Figma como imagem — são
  // peças reais do design system do Sona, não fotos de tela, mas também
  // não glifos genéricos (decidido em B1).
  goalIcons: {
    label: 'Ícones metas',
    image: '/projects/sona/ds-icones-metas.webp',
    imageAlt: 'Quatro ícones de categoria de meta financeira: investir, viajar, comprar imóvel, comprar carro',
    dims: { width: 452, height: 438 },
  },
  components: {
    label: 'COMPONENTES',
    image: '/projects/sona/ds-componentes.webp',
    imageAlt: 'Card de saúde financeira e variantes de card de meta (padrão e selecionado) do design system do Sona',
    dims: { width: 455, height: 427 },
  },
  closing: 'Sistema completo no Figma - Design tokens, componentes e guidelines.',
}

// ---------------------------------------------------------------------
// S14 — Resultado do Projeto
// ---------------------------------------------------------------------
export const result = {
  eyebrow: 'RESULTADO DO PROJETO',
  title: 'De uma hipótese sobre metas para um sistema orientado por decisões.',
  body: 'O principal resultado não foi a quantidade de telas produzidas. Foi chegar a um produto fundamentalmente diferente daquele que eu imaginava no início, porque a investigação mudou o problema que valia a pena resolver.',
  stats: [
    { value: 40, suffix: '+', label: 'Telas e estados projetados' },
    { value: 100, suffix: '+', label: 'Variantes de componentes' },
    { value: 3, suffix: '', label: 'Iterações de arquitetura' },
    { value: 1, suffix: '', label: 'Mudança completa de direção' },
  ],
}

// ---------------------------------------------------------------------
// S15 — Do Conceito à Realidade
// ---------------------------------------------------------------------
export const conceptToReality = {
  eyebrow: 'DO CONCEITO À REALIDADE',
  title: 'Do Figma ao comportamento',
  lead: 'Uma interface pode parecer pronta até começar a funcionar.',
  body: 'Transformar o fluxo em um protótipo funcional revelou inconsistências que as telas isoladas escondiam.',
  // 4 itens no Figma (o mapa do briefing previa 5 — a diferença está
  // registrada, não é omissão: só existem 4 nós de conteúdo no nó 577:2523).
  items: [
    { icon: 'Navigation', title: 'Navegação', body: 'Links aparentemente completos terminavam em becos sem saída.' },
    { icon: 'Code2', title: 'Dados', body: 'Percentuais e valores não correspondiam entre si.' },
    { icon: 'ChartNoAxesCombined', title: 'Regra de negócio', body: 'Alocar 100% da sobra eliminava o estado necessário para a próxima decisão.' },
    { icon: 'GalleryHorizontal', title: 'Consistência sistêmica', body: 'Valores plausíveis isoladamente se tornavam contraditórios quando analisados juntos.' },
  ],
  // Asset local já traz a composição completa (2 telas + 3 anotações
  // vermelhas + linhas pontilhadas de conexão) — não recriada em código.
  image: '/projects/sona/12 - DO FIGMA AO COMPORTAMENTO.webp',
  imageAlt: 'Duas telas do app Sona mostrando a divisão de uma sobra entre duas metas, com três anotações: fluxo leva a um alerta que não permite continuar; percentuais não batiam com os valores exibidos; alocar 100% quebrava o cenário necessário para a próxima ação',
  imageDims: { width: 1365, height: 1077 },
  // Mesmo conteúdo do alt, em lista — cobre leitor de tela que trunca alt longo.
  annotations: [
    'Fluxo leva a um alerta que não permite continuar.',
    'Percentuais não batiam com os valores exibidos.',
    'Alocar 100% quebrava o cenário necessário para a próxima ação.',
  ],
  closing: 'Projetar a tela resolveu a aparência. Fazer o sistema funcionar testou a lógica.',
}

// ---------------------------------------------------------------------
// S16 — Próximos Passos
// ---------------------------------------------------------------------
export const nextSteps = {
  eyebrow: 'PRÓXIMOS PASSOS',
  title: 'O que eu validaria em um produto real',
  lead: 'O projeto termina. As perguntas mais importantes, não.',
  subLead: 'Como próximo passo, eu priorizaria:',
  cards: [
    { icon: 'UserCheck', title: 'Teste de usabilidade', body: 'Conexão bancária e distribuição da sobra, as duas principais apostas da experiência.' },
    { icon: 'ShieldCheck', title: 'Validação de confiança', body: 'Entender se usuários realmente conectariam suas contas a uma marca ainda desconhecida.' },
    { icon: 'Users', title: 'Compreensão da recomendação', body: 'Investigar se a sugestão de distribuição é percebida como ajuda ou como perda de controle.' },
    { icon: 'Clock', title: 'Uso longitudinal', body: 'Avaliar se o diagnóstico continua útil depois que a novidade inicial desaparece.' },
  ] satisfies IconCardItem[],
  investigationLabel: 'Como investigaria',
  investigation: [
    { icon: 'MessagesSquare', title: 'Testes moderados', sub: '5–8 usuários' },
    { icon: 'Users', title: 'Entrevistas', sub: 'Confiança e percepção' },
    { icon: 'FlaskConical', title: 'Teste de conceito', sub: 'Comparação de alternativas' },
    { icon: 'CalendarClock', title: 'Diários ou follow-up', sub: '2–4 semanas' },
  ],
}

// ---------------------------------------------------------------------
// S17 — Aprendizado
// ---------------------------------------------------------------------
export const learning = {
  // Ponto 8.4 do briefing: o Figma repetia o eyebrow de S15 ("DO CONCEITO
  // À REALIDADE") aqui. Corrigido no arquivo (nó 577:2684) — já bate com
  // o valor usado no código.
  eyebrow: 'APRENDIZADO',
  title: 'Meu trabalho não é defender a primeira solução. É descobrir quando ela deixou de fazer sentido.',
  items: [
    { icon: 'Search', body: 'Comecei o projeto acreditando que pesquisa serviria para validar uma ideia.' },
    { icon: 'ArrowLeftRight', body: 'Terminei entendendo o contrário.' },
    { icon: 'Check', body: 'Pesquisa é também o mecanismo que permite abandonar uma solução antes de investir ainda mais nela.' },
  ],
  image: '/projects/sona/14 - APRENDIZADO.webp',
  imageAlt: 'Tela do app Sona sobre uma composição líquida, mostrando o fluxo de conexão segura com o banco via Open Finance',
  imageDims: { width: 880, height: 806 },
  closing: 'Hoje avalio uma experiência menos pela quantidade de funcionalidades que consigo desenhar e mais pela qualidade das decisões que ela ajuda pessoas a tomar.',
}

// Links reais do case (preservados da implementação anterior).
export const PROTOTYPE_URL = 'https://sona-app-two.vercel.app/?reset=1'
export const FIGMA_URL =
  'https://www.figma.com/design/JH7ZB20Ofzt3cgdFnxGrPW/SONA---Planejador-Financeiro?m=auto&t=MrxcASAIUAliQyOX-1'

export const sectionIndex = [
  { id: 'visao-geral', label: 'Visão Geral' },
  { id: 'desafio', label: 'O Desafio' },
  { id: 'pesquisa', label: 'Pesquisa e Descoberta' },
  { id: 'decisao-principal', label: 'A Decisão' },
  { id: 'design-system', label: 'Design System' },
  { id: 'resultado', label: 'Resultado' },
  { id: 'realidade', label: 'Do Conceito à Realidade' },
  { id: 'proximos-passos', label: 'Próximos Passos' },
  { id: 'aprendizado', label: 'Aprendizado' },
]
