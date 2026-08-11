// Conteúdo do case GABRIEL — reescrito a partir do nó 595:1048 do Figma
// (arquivo "Portifolio", frame "Gabriel Alves — Case Page"), lido
// literalmente via MCP (get_design_context/get_metadata/get_variable_defs).
// V1 (Ver 1/ e o CaseGabriel.tsx antigo) serve só de referência de fatos
// do projeto (cliente, métricas reais) — a copy exata de cada bloco vem
// do Figma, que já foi escrito para esta estrutura nova. Não editar copy
// aqui sem conferir o nó de origem.
//
// Preenchido incrementalmente por checkpoint (B2: Hero, 01, 02-03).
// Blocos 04-12 chegam em B3-B5.

export type FeatureItem = { icon: string; title: string; body: string }

// Cores exclusivas do conteúdo do case GABRIEL — não existem nos tokens
// globais do site (liquid-glass.css), com exceção de --secundaria-500
// (esse sim é token global, ver B1). Usadas só dentro de componentes de
// conteúdo desta página, nunca em chrome (navbar/footer/botão global).
export const gabrielAccent = {
  /** text/text-500 — corpo de texto padrão sobre fundo claro */
  textMuted: '#6B7280',
  /** text/text-600 — nota de fechamento (02-03), mais escuro que textMuted */
  textSubtle: '#616874',
  /** border/subtle — divisor de topo de seção, linhas internas de lista */
  divider: '#E3E8ED',
  /** border/card — cards brancos com borda (card de princípios) */
  cardBorder: '#EAEEF2',
  /** régua das 3 citações da seção O Desafio */
  quoteRule: '#C3D3E0',
  /** fundo das caixas de nota/pergunta de design (bg azul claro) */
  noteBg: '#E4ECF3',
  /** texto da pergunta de design (02-03) e nota da Decisão 02 (06) */
  noteBlue: '#2E5A82',
  /** título sobre o card escuro (04) */
  darkCardTitle: '#FFFFFF',
  /** corpo da 1ª coluna do card escuro (04) — tokenizada no Figma (segundária-100) */
  darkCardBodyFirst: '#C0CCD3',
  /** corpo das colunas 2-5 do card escuro (04) — valor solto no Figma,
      diferente de darkCardBodyFirst; mantido literal por decisão do Andreo
      (ver B0, pergunta sobre inconsistência do arquivo) */
  darkCardBody: '#B7C7D1',
  /** eyebrow "BRIEFING" sobre o card escuro (04) */
  darkCardEyebrow: '#EBF1F6',
  /** bg/subtle — card claro da seção 05 */
  subtleBg: '#F4F6F8',
  /** borda suave dos cards ANTES/DEPOIS (05) */
  cardBorderSoft: '#EEF0F2',
  /** fundo do card de resultado/citação (05) */
  resultBg: '#DFEBF3',
  /** label mono "__ Resultado" e aspas gigantes (05) */
  resultLabel: '#00648C',
  /** nota da seção 11 e pergunta final da seção 12 — token distinto de
      noteBlue, mesma família mas passo diferente da escala (Foundation/
      New seg/new seg-600); não confundir os dois ao aplicar cor. */
  noteBlueAlt: '#366496',
} as const

export const PROJECT_URL = 'https://psicologogabrielalves.com.br'

// ---------------------------------------------------------------------
// Hero (nó 669:3801)
// ---------------------------------------------------------------------
export const hero = {
  eyebrow: 'UX RESEARCH · PRODUCT DESIGN · BRANDING · FRONT-END',
  titleBefore: 'Quando a ',
  titleHighlight: 'confiança',
  titleAfter: ' começa antes da primeira sessão.',
  body: 'Redesenhei a presença digital de um psicólogo clínico para reduzir a incerteza do primeiro contato e transformar acolhimento, clareza e previsibilidade em decisões de experiência.',
  primaryCta: { label: 'Ver projeto no ar', href: PROJECT_URL },
  secondaryCta: { label: 'Explorar o case', href: '#visao-geral' },
}

// ---------------------------------------------------------------------
// 01 — Visão Geral (nó 595:1129)
// ---------------------------------------------------------------------
export const overview = {
  eyebrow: 'VISÃO GERAL',
  titleBefore: 'Antes de escolher um psicólogo, existe uma decisão mais difícil: ',
  titleHighlight: 'começar.',
  body: 'O site precisava fazer mais do que apresentar serviços. Precisava responder às dúvidas que aparecem quando alguém ainda está decidindo se se sente seguro o suficiente para iniciar uma conversa.',
  features: [
    { icon: 'Users', title: 'Pertencimento antes da credencial', body: 'A primeira mensagem precisa responder: "esse espaço é para mim?"' },
    { icon: 'Route', title: 'Previsibilidade reduz ansiedade', body: 'Explicar o que acontece depois do contato reduz a sensação de dar um salto no escuro.' },
    { icon: 'Smartphone', title: 'Mobile como contexto de decisão', body: 'A experiência precisa funcionar especialmente bem em momentos rápidos e pessoais.' },
    { icon: 'MessageCircle', title: 'Uma ação principal', body: 'Todo o conteúdo converge para iniciar uma conversa, sem competir por atenção.' },
  ] satisfies FeatureItem[],
}

// ---------------------------------------------------------------------
// 02-03 — Desafio e Descoberta (nó 595:1160, uma única seção Figma —
// sem divisor/eyebrow próprio por coluna, as duas colunas dividem a
// mesma régua de topo).
// ---------------------------------------------------------------------
export const challengeDiscovery = {
  challenge: {
    eyebrow: 'O DESAFIO',
    title: 'O problema não era falta de informação. Era a ordem em que ela aparecia.',
    leadSemibold: 'Gabriel já tinha formação, posicionamento e uma proposta de atendimento definida.',
    paragraphs: [
      'Mas sua presença digital tratava a escolha de um psicólogo como uma decisão predominantemente racional: apresentava informações antes de construir segurança.',
      'Para alguém considerando terapia pela primeira vez, outras perguntas podem vir antes:',
    ],
    quotes: [
      'Esse profissional atende pessoas como eu?',
      'Vou me sentir seguro?',
      'O que acontece se eu mandar mensagem?',
    ],
    transitionLine: 'O desafio deixou de ser redesenhar uma página. Passou a ser:',
    designQuestion: 'Como reduzir a incerteza do primeiro contato antes mesmo da primeira conversa?',
  },
  discovery: {
    eyebrow: 'A DESCOBERTA',
    title: 'Entender antes de projetar.',
    paragraphs: [
      'Conduzi uma entrevista em profundidade com Gabriel para compreender sua abordagem clínica, seu posicionamento e o tipo de experiência que queria proporcionar antes mesmo da sessão.',
      'A conversa revelou três princípios que passaram a orientar o projeto:',
    ],
    principles: [
      { n: '01', icon: 'ShieldCheck', title: 'Segurança', body: 'O site precisava comunicar explicitamente que diferentes identidades e experiências seriam acolhidas.' },
      { n: '02', icon: 'Sparkles', title: 'Clareza', body: 'O processo de iniciar terapia precisava deixar de parecer desconhecido.' },
      { n: '03', icon: 'Sprout', title: 'Proximidade', body: 'A comunicação deveria parecer humana sem perder profissionalismo.' },
    ],
    closingNote: 'Esses princípios deixaram de ser atributos de marca e passaram a orientar decisões concretas de conteúdo e interface.',
  },
}

// ---------------------------------------------------------------------
// 04 — Briefing (nó 659:996/997 — card escuro em gradiente, sem eyebrow
// de seção nem divisor externo: o card é a própria quebra visual).
// ---------------------------------------------------------------------
export const briefing = {
  eyebrow: 'BRIEFING',
  items: [
    { icon: 'Flag', title: 'Desafio', body: 'A presença digital informava, mas não construía confiança antes do contato.', bodyColor: 'darkCardBodyFirst' },
    { icon: 'Users', title: 'Usuário', body: 'Pessoas considerando iniciar terapia, inclusive público LGBTQIA+.' },
    { icon: 'Target', title: 'Objetivo', body: 'Reduzir incerteza e tornar o primeiro contato mais compreensível.' },
    { icon: 'UserCog', title: 'Minha atuação', body: 'Research · estratégia · UX/UI · identidade · desenvolvimento' },
    { icon: 'Layers', title: 'Restrição', body: 'Experiência simples, rápida e fácil de manter.' },
  ] as { icon: string; title: string; body: string; bodyColor?: 'darkCardBodyFirst' }[],
}

// ---------------------------------------------------------------------
// 05 — A Principal Mudança (nó 595:1222). Card claro (bg/subtle) com
// título 2 linhas, ANTES→DEPOIS + card de resultado/citação, e abaixo o
// mapa de 6 dúvidas por seção.
// ---------------------------------------------------------------------
export const mainChange = {
  eyebrow: 'A PRINCIPAL MUDANÇA',
  titleLine1: 'Parei de organizar a página pelo profissional.',
  titleLine2: 'Passei a organizá-la pelas dúvidas de quem chega.',
  before: {
    label: 'ANTES',
    steps: ['Quem sou', 'Formação', 'Especialidades', 'Contato'],
  },
  after: {
    label: 'DEPOIS',
    steps: [
      { n: '01', label: 'Esse espaço é para mim?' },
      { n: '02', label: 'Posso confiar?' },
      { n: '03', label: 'Como funciona?' },
      { n: '04', label: 'Como ele pode me ajudar?' },
      { n: '05', label: 'Como começo?' },
    ],
  },
  result: {
    label: '__ Resultado',
    quoteBefore: 'A página deixou de ser uma sequência de seções e passou a funcionar como uma ',
    quoteHighlight: 'sequência de decisões.',
  },
  sequenceTitle: 'Cada seção responde uma dúvida antes que a próxima apareça.',
  sequence: [
    { n: '01', question: 'Esse espaço é para mim?', section: 'Hero + posicionamento' },
    { n: '02', question: 'Posso confiar?', section: 'Sobre + abordagem' },
    { n: '03', question: 'Como funciona?', section: 'Processo' },
    { n: '04', question: 'Ele pode me ajudar?', section: 'Áreas de atuação' },
    { n: '05', question: 'Ainda tenho dúvidas?', section: 'FAQ' },
    { n: '06', question: 'Quero conversar.', section: 'WhatsApp' },
  ],
}

// ---------------------------------------------------------------------
// 06 — Decisões de Projeto (nó 595:1261). 2 capítulos com layouts
// diferentes: Decisão 01 (texto esquerda, imagem direita), Decisão 02
// (imagem esquerda, texto direita — ORDEM INVERTIDA, confirmada via MCP;
// o "fluxo de 4 etapas" citado no briefing não existe como estrutura
// viva no Figma, é a própria screenshot 640×338 com crop real).
// ---------------------------------------------------------------------
export const projectDecisions = {
  eyebrow: 'DECISÕES DE PROJETO',
  intro: 'Cada decisão foi tomada para reduzir esforço, responder dúvidas e aumentar confiança até o primeiro contato.',
  decision01: {
    eyebrow: 'DECISÃO 01',
    title: 'Construir confiança antes de apresentar credenciais',
    subtitle: 'A primeira dobra não vende currículo. Ela responde: "posso me sentir seguro aqui?"',
    problem: 'Começar pela formação do profissional respondia a uma pergunta que não necessariamente era a primeira do usuário.',
    decision: 'O hero passou a comunicar acolhimento e pertencimento antes de apresentar formação, abordagem ou experiência.',
    image: `${'/projects/gabriel'}/desktop-areas.png`,
    imageAlt: 'Hero da landing page do psicólogo Gabriel Alves',
  },
  decision02: {
    eyebrow: 'DECISÃO 02',
    title: 'Reduzir incerteza',
    subtitle: 'Se o próximo passo é desconhecido, o CTA exige mais coragem.',
    problem: 'Em vez de pedir imediatamente que alguém "agende uma sessão", criei uma seção que explica o que acontece depois do primeiro contato.',
    image: `${'/projects/gabriel'}/desktop-como-funciona.png`,
    imageAlt: 'Seção "Como funciona" da landing page, com as etapas do processo até a primeira sessão',
    note: 'O objetivo não era adicionar etapas. Era tornar visíveis as etapas que já existiam.',
  },
}

// ---------------------------------------------------------------------
// 07 — Identidade Visual (nó 653:982). 3 colunas: par de amostras +
// título + justificativa.
// ---------------------------------------------------------------------
export const identity = {
  eyebrow: 'IDENTIDADE VISUAL',
  title: 'Calma sem parecer clínica. Acolhimento sem parecer informal.',
  body: 'A identidade precisava equilibrar duas percepções que poderiam facilmente entrar em conflito: segurança emocional e profissionalismo.',
  columns: [
    {
      title: 'Sage / Moss',
      body: 'Criam uma atmosfera mais calma sem recorrer ao azul tradicional da saúde.',
      swatches: [
        { name: 'Sage', hex: '#8FAF9A', textColor: '#2E2E2E' },
        { name: 'Moss', hex: '#4F6B58', textColor: '#FFFFFF' },
      ],
    },
    {
      title: 'Off-white / Beige',
      body: 'Reduzem o contraste agressivo de fundos totalmente brancos.',
      swatches: [
        { name: 'Off-white', hex: '#F8F8F5', textColor: '#2E2E2E', border: '#E3E8ED' },
        { name: 'Beige', hex: '#EFEAE3', textColor: '#2E2E2E' },
      ],
    },
    {
      title: 'Serif + Sans-serif',
      body: 'A serifada adiciona personalidade e proximidade; a sans-serif mantém a leitura funcional.',
      // par tipográfico, não cor sólida — tratado à parte no componente
      typePair: { serifBg: '#DDE9E1', serifColor: '#3A5142', sansBg: '#EFEAE3', sansColor: '#2E2E2E' },
    },
  ],
}

// ---------------------------------------------------------------------
// 08 — Da Estratégia à Interface (nó 648:982). Screenshot flutuante +
// 5 callouts, onda de liquid glass ao fundo. padding-bottom 96px
// (exceção confirmada via MCP).
// ---------------------------------------------------------------------
export const strategyToInterface = {
  eyebrow: 'DA ESTRATÉGIA À INTERFACE',
  title: 'O visual precisava desaparecer o suficiente para a mensagem aparecer.',
  image: `${'/projects/gabriel'}/cover.png`,
  imageAlt: 'Homepage da landing page do psicólogo Gabriel Alves',
  callouts: [
    'Mensagem de pertencimento',
    'CTA principal',
    'Prova de especialização',
    'Processo previsível',
    'WhatsApp persistente',
  ],
}

// ---------------------------------------------------------------------
// 09 — Do Figma ao Navegador (nó 649:982). Texto + grade 2×2 de
// atributos.
// ---------------------------------------------------------------------
export const figmaToBrowser = {
  eyebrow: 'DO FIGMA AO NAVEGADOR',
  title: 'Implementar também foi uma decisão de design.',
  body: 'Desenvolvi a experiência em HTML e CSS, mantendo a estrutura leve e reduzindo dependências externas. Isso me permitiu acompanhar o projeto além do handoff e observar como decisões de layout, responsividade, conteúdo e acessibilidade se comportavam no produto funcionando.',
  attributes: [
    { title: 'Responsivo', body: 'Layout adaptado aos principais breakpoints.' },
    { title: 'Leve', body: 'Poucas dependências.' },
    { title: 'Manutenível', body: 'Estrutura simples para um site de pequeno porte.' },
    { title: 'Acessível', body: 'Semântica e contraste considerados durante a implementação.' },
  ],
}

// ---------------------------------------------------------------------
// 10 — Resultado (nó 649:1011). Dois painéis lado a lado, mesma
// largura — a distinção "rebaixado/elevado" é de peso visual (fundo
// plano vs. borda+sombra), não de tamanho.
// ---------------------------------------------------------------------
export const result = {
  eyebrow: 'RESULTADO',
  title: 'A entrega não foi apenas uma nova interface. Foi um caminho mais claro até o primeiro contato.',
  technical: {
    label: 'MÉTRICAS TÉCNICAS · LIGHTHOUSE',
    stats: [
      { value: '90', label: 'Acessibilidade' },
      { value: '92', label: 'SEO' },
      { value: '0', label: 'Layout Shift medido' },
    ],
  },
  design: {
    label: 'RESULTADOS DE DESIGN',
    items: [
      'Uma hierarquia orientada pelas dúvidas do usuário.',
      'Um único caminho principal de conversão.',
      'Uma experiência responsiva implementada e publicada.',
      'Uma identidade criada especificamente para o posicionamento do profissional.',
    ],
  },
}

// ---------------------------------------------------------------------
// 11 — Próximo Passo (nó 650:982). 4 métricas numeradas + faixa de
// ressalva — explicitamente prospectivo, não resultado obtido.
// ---------------------------------------------------------------------
export const nextStep = {
  eyebrow: 'PRÓXIMO PASSO',
  title: 'Publicar a experiência não encerra a hipótese.',
  lead: 'Com dados de uso, eu acompanharia:',
  metrics: [
    { n: '01', title: 'Conversão para WhatsApp', body: 'Quantas visitas chegam ao início de conversa.' },
    { n: '02', title: 'Profundidade de scroll', body: 'Quais informações são consumidas antes do contato.' },
    { n: '03', title: 'Origem da conversão', body: 'Em qual seção o usuário decide iniciar a conversa.' },
    { n: '04', title: 'Mobile × desktop', body: 'Como comportamento e conversão variam entre dispositivos.' },
  ],
  note: 'Métricas que seriam acompanhadas, não resultados já obtidos.',
}

// ---------------------------------------------------------------------
// 12 — Aprendizado (nó 650:1010). Fechamento com whitespace grande +
// composição de liquid glass. Última seção da página — nada depois além
// do footer global. padding 96/120/128, gap 48 (exceção confirmada).
// ---------------------------------------------------------------------
export const learning = {
  eyebrow: 'APRENDIZADO',
  title: 'Confiança não é algo que a interface cria. É algo que ela pode deixar de atrapalhar.',
  body: 'Este projeto mudou minha forma de pensar experiências em contextos de vulnerabilidade. Percebi que clareza, previsibilidade e linguagem não são apenas decisões de comunicação. Elas alteram o esforço necessário para continuar.',
  leadIn: 'Desde então, uma pergunta passou a acompanhar meu processo:',
  question: 'O que essa pessoa precisa compreender, e sentir, antes de conseguir tomar a próxima decisão?',
}
