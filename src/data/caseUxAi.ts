/**
 * Conteúdo do case UX + AI — blueprint §23. Todo texto vem do Figma
 * (nó a nó, onde citado no blueprint) ou, na ausência de acesso ao nó
 * exato, do texto já aprovado e ao vivo em CaseSysmed.tsx/data/sysmed.ts
 * (mesmo case, mesma pesquisa). Nada aqui foi inventado.
 *
 * Itens marcados [VERIFICAR FIGMA] usam a segunda fonte porque a sessão
 * de implementação perdeu a conexão com o Figma desktop antes de
 * confirmar o nó exato — replaceable sem mudar estrutura quando a conexão
 * voltar. Ver seção 12.6 do blueprint para as correções de digitação já
 * aplicadas (marcadas [SUGESTÃO DE COPY] no blueprint — tipográficas,
 * não interpretativas, sinalizar para aprovação do Andreo).
 */

export type Source = { ref: string }

export type Stat = {
  value: number
  decimals?: 0 | 1
  suffix?: '%'
  label: string[]
  source: Source
}

export type SeverityLevel = 1 | 2 | 3 | 4
export const SEVERITY_LABEL: Record<SeverityLevel, string> = {
  1: 'Cosmético',
  2: 'Pequeno',
  3: 'Grande',
  4: 'Catastrófico',
}

// linhas = humano, colunas = IA — blueprint §23, nós 909:1207 a 909:1240.
// Invariantes (testadas em caseUxAi.test.ts): soma 75 · diagonal 36 (48,0%)
// · acima da diagonal 34 (45,3%) · abaixo 5 (6,7%) · linha 4 soma 7 · (4,4) = 3.
export const severityMatrix: number[][] = [
  [12, 14, 6, 2],
  [1, 12, 9, 0],
  [0, 0, 9, 3],
  [0, 0, 4, 3],
]

export const heroStats: Stat[] = [
  { value: 89, label: ['problemas de usabilidade', 'analisados'], source: { ref: 'TCC' } },
  { value: 11, label: ['profissionais', 'entrevistados'], source: { ref: 'TCC' } },
  { value: 68, suffix: '%', label: ['concordância na heurística', 'humano vs IA'], source: { ref: 'TCC' } },
  { value: 48, suffix: '%', label: ['concordância na severidade', 'humano vs IA'], source: { ref: 'TCC' } },
]

// ── 01 · Hero + Stats — blueprint §11.01 ─────────────────────────────────
export const hero = {
  chip: 'UX RESEARCH · IA APLICADA · HEALTHTECH',
  // H1 nó do hero — "IA" e "sistemas hospitalares" são as palavras em
  // destaque, em gradiente (.texto-gradiente, BRIEF-S01-HERO §5 — a D2,
  // que pedia acao-link sólido, foi revogada em 24 set 2026). Quebra
  // de linha reconstruída a partir da largura 64px/2 linhas descrita no
  // blueprint; confirmar contra o nó exato quando o Figma reconectar.
  headline: {
    lines: ['Onde a IA erra ao avaliar', 'sistemas hospitalares'],
    highlight: ['IA', 'sistemas hospitalares'],
  },
  // Texto exato do Figma (nó 802:1039, conferido via get_design_context
  // em 23 set 2026) — substitui o texto provisório copiado de CaseSysmed.tsx.
  subtitle:
    'O estudo mostrou que reconhecer uma falha é apenas parte do trabalho. Priorizá-la exige contexto, e é justamente aí que humanos e IA começam a tomar decisões diferentes.',
  // Rótulos IA/Humanos — texto exato do Figma, com as correções de
  // digitação do blueprint §12.6 (typo, concordância verbal e espaço
  // final) já aplicadas. [SUGESTÃO DE COPY] no blueprint — sinalizar.
  sideIA: {
    label: 'IA',
    text: 'Ferramenta poderosa, mas que ainda falha em contextos críticos.',
  },
  sideHumanos: {
    label: 'Humanos',
    text: 'Experiência e contexto que continuam sendo insubstituíveis.',
  },
  // Texto exato do Figma (nó 802:1063) — sem destaque de cor nos números,
  // ao contrário do que a versão anterior deste arquivo presumia.
  hookSentence: {
    text: 'A diferença entre 68% e 48% é a história deste case.',
  },
}

// ── 02 · Visão Geral · Figma 1022:1356, 1022:1475, 1022:1584, 1022:1693 ──
const CAPACIDADES_BASE = '/case-ux-ai/capacidades/'

export const visaoGeral = {
  eyebrow: 'VISÃO GERAL',
  title: {
    lines: ['IA pode acelerar a análise.', 'Mas acelerar não significa decidir melhor.'],
    highlight: ['decidir melhor'],
  },
  body:
    'Modelos de linguagem conseguem processar grandes volumes de informação e ' +
    'encontrar padrões rapidamente. Em sistemas hospitalares, porém, uma decisão ' +
    'de UX pode depender de fatores que não estão visíveis na interface.',
  explorador: {
    ariaLabel: 'Quatro capacidades',
    rotulo: 'ETAPA ATIVA',
    controles: { pausar: 'Pausar', reproduzir: 'Reproduzir' },
    base: CAPACIDADES_BASE,
    capacidades: [
      { n: '01', nome: 'Reconhecer',     descricao: 'Identificar qual princípio de usabilidade está sendo violado.',
        video: { slug: 'cap-01-reconhecer',     largura: 618, altura: 544, duracao: 5.0 } },
      { n: '02', nome: 'Classificar',    descricao: 'Organizar grandes volumes de problemas e encontrar padrões.',
        video: { slug: 'cap-02-classificar',    largura: 602, altura: 544, duracao: 4.0 } },
      { n: '03', nome: 'Priorizar',      descricao: 'Determinar o que precisa ser resolvido primeiro.',
        video: { slug: 'cap-03-priorizar',      largura: 622, altura: 544, duracao: 4.0 } },
      { n: '04', nome: 'Contextualizar', descricao: 'Considerar rotina, frequência, impacto clínico e risco.',
        video: { slug: 'cap-04-contextualizar', largura: 544, altura: 544, duracao: 4.0 } },
    ],
  },
} as const

// ── 03–04 · O Desafio e o Briefing · Figma 1052:1139 (Proposta B, 25 set) ──
export const desafio = {
  eyebrow: 'O DESAFIO',
  intro:
    'Em sistemas hospitalares, uma avaliação heurística pode revelar dezenas de ' +
    'problemas de usabilidade. Mas uma equipe não consegue tratar tudo ao mesmo ' +
    'tempo. É preciso decidir o que corrigir primeiro.',
  pergunta: {
    eyebrow: 'A PERGUNTA DO ESTUDO',
    /** Quebras do Figma (1053:1146), usadas a partir de 1280. Abaixo disso o texto flui. */
    linhas: [
      'Até que ponto uma IA consegue',
      'apoiar a análise de problemas de',
      'usabilidade sem perder o',
      'contexto necessário para',
      'priorizá-los?',
    ],
    destaque: 'priorizá-los?',
  },
  intencao: {
    texto:
      'A intenção não era provar que a IA poderia substituir pesquisadores, nem ' +
      'provar que não poderia. O objetivo era descobrir em quais decisões ela ' +
      'seria confiável.',
    destaque: 'era descobrir em quais decisões ela seria confiável.',
  },
  /** Ficha 2×2 (1054:1138): dois textos em cima, duas listas de chips embaixo. */
  briefing: {
    titulo: 'BRIEFING',
    textos: [
      { rotulo: 'PROBLEMA', texto: 'Avaliações geram grande volume de dados qualitativos que precisam ser classificados e priorizados.' },
      { rotulo: 'CONTEXTO', texto: 'Sistemas hospitalares, onde impacto e frequência podem alterar completamente a gravidade de uma falha.' },
    ],
    listas: [
      { rotulo: 'MINHA ATUAÇÃO', itens: ['UX Research', 'Análise comparativa', 'IA aplicada'] },
      { rotulo: 'MÉTODOS', itens: ['Entrevistas', 'Avaliação heurística', 'Experimento comparativo', 'Análise quantitativa'] },
    ],
  },
  pilula: {
    rotulo: 'BRIEFING',
    texto: 'Onde a IA pode apoiar a análise sem substituir contexto por inferência?',
    ariaLabel: 'Voltar ao briefing',
  },
} as const

// ── 05 · Desenho do experimento · Figma 1055:1138 (Proposta B, 25 set) ───
export const experimento = {
  eyebrow: 'DESENHO DO EXPERIMENTO',
  titulo: {
    texto: 'Para comparar decisões, os dois lados precisavam partir do mesmo problema.',
    destaque: 'mesmo problema.',
  },
  metodo:
    'O estudo começou com entrevistas e avaliações heurísticas que resultaram em 89 ' +
    'problemas de usabilidade. Antes de enviar o material ao modelo, removi todas as ' +
    'classificações feitas pelos especialistas. A IA recebeu apenas a descrição dos ' +
    'problemas, as heurísticas de Nielsen, a escala de severidade e a instrução de ' +
    'justificar cada decisão.',
  quadro: {
    total: 89,
    unidade: 'problemas',
    lados: [
      { rotulo: 'ESPECIALISTAS', modo: 'classificação · heurística + severidade' },
      { rotulo: 'IA (MODELO DE LINGUAGEM)', modo: 'classificação independente · heurística + severidade' },
    ],
    ligacao: 'mesmo problema',
    ariaLabel:
      'Os 89 problemas de usabilidade partem de um único conjunto e se dividem em dois ' +
      'campos iguais: a classificação dos especialistas e a classificação independente da IA. ' +
      'O mesmo problema aparece em destaque nos dois lados.',
  },
  etapasRotulo: 'O EXPERIMENTO',
  etapas: [
    { n: '01', nome: 'Descrição do problema', icone: 'documento' },
    { n: '02', nome: 'Heurísticas utilizadas', icone: 'checklist' },
    { n: '03', nome: 'Escala de severidade', icone: 'escala', destaque: true },
    { n: '04', nome: 'Classificação', icone: 'rotulo' },
  ],
  comparacao: {
    rotulo: 'COMPARAÇÃO PAR A PAR',
    /** Total = quadro.total × dimensoes (178). Nada escrito à mão. */
    dimensoes: 2,
    unidade: 'comparações',
    texto: '89 problemas × 2 dimensões: heurística (tipo de problema) e severidade (gravidade).',
  },
} as const

// ── 06 · O primeiro sinal (clímax) · Figma 800:1046 + dados da 11 (800:1060) ──
// A 11 ("O resultado") repetia 68% e 48% em cartões. Os números dela que não
// estavam na 06 (90,7% e 45,3%) entram aqui, como nota de cada linha.
export const descoberta = {
  eyebrow: 'O PRIMEIRO SINAL',
  titulo: 'A IA reconhecia melhor o problema do que sua gravidade.',
  linhas: [
    {
      verbo: 'CLASSIFICAR',
      rotulo: 'concordância na heurística',
      valor: 68,
      nota: { valor: '90,7%', texto: 'considerando sobreposição entre princípios' },
    },
    {
      verbo: 'PRIORIZAR',
      rotulo: 'concordância na severidade',
      valor: 48,
      nota: { valor: '45,3%', texto: 'dos casos superestimados' },
    },
  ],
  distancia: { rotulo: 'pontos de distância' },
  fecho: {
    texto: 'Reconhecer “o que está errado” e decidir “o quanto isso importa” são tarefas diferentes.',
    destaque: '“o quanto isso importa”',
  },
} as const

// ── 07 · A matriz de severidade · Figma 800:1049 ─────────────────────────
export const matriz = {
  eyebrow: 'MOSTRE OS DADOS',
  titulo: 'O modelo convergia para o meio da escala.',
  texto:
    'Especialistas distribuíram os problemas entre diferentes níveis de severidade. A IA ' +
    'apresentou maior concentração nas classificações intermediárias, reduzindo a separação ' +
    'entre problemas cosméticos, relevantes e críticos.',
  eixoIa: 'SEVERIDADE ATRIBUÍDA PELA IA',
  eixoHumano: 'ESPECIALISTAS',
  rotulosMarginais: { humano: 'especialistas', ia: 'IA' },
  regioes: [
    { valor: '45,3%', texto: 'dos casos foram superestimados', regiao: 'acima' },
    { valor: '6,7%', texto: 'foram subestimados', regiao: 'abaixo' },
  ],
  catastrofico:
    '7 problemas foram classificados como catastróficos pelos especialistas. Na matriz, ' +
    'apenas 3 permaneceram nessa categoria pela IA.',
  fecho: {
    linhas: ['O erro mais importante não estava em reconhecer a interface.', 'Estava em estimar sua consequência.'],
  },
} as const

// ── 08 · A descoberta central · Figma 800:1052 ───────────────────────────
export const contexto = {
  eyebrow: 'A DESCOBERTA CENTRAL',
  titulo: { ia: 'A IA tinha a interface.', humano: 'Os profissionais tinham o contexto.' },
  texto:
    'Ao analisar as justificativas, percebi que o modelo conseguia descrever muitos problemas ' +
    'corretamente. O que ele não possuía era informação suficiente sobre como aquela interface ' +
    'participava do trabalho real.',
  quadro: 'A INTERFACE',
  fatores: [
    { nome: 'Frequência', pergunta: 'Quantas vezes essa tarefa acontece durante um turno?' },
    { nome: 'Impacto clínico', pergunta: 'O que acontece quando a informação é registrada incorretamente?' },
    { nome: 'Risco', pergunta: 'Esse erro pode afetar outra decisão ou chegar ao paciente?' },
    { nome: 'Contorno', pergunta: 'Existe uma forma segura de o profissional continuar trabalhando?' },
  ],
} as const

// ── 09–10 · Da descoberta para uma decisão + proposta de fluxo ───────────
// Figma 800:1055 e 800:1057. As duas linhas da 09 ("IA → velocidade e
// escala", "Humano → contexto e julgamento") viram os rótulos das raias.
export const divisao = {
  eyebrow: 'DA DESCOBERTA PARA UMA DECISÃO',
  pergunta: 'Se a IA não deve decidir tudo, onde ela realmente agrega valor?',
  resposta:
    'A resposta não foi remover a IA do processo. Foi redesenhar a divisão de trabalho entre IA e pesquisador.',
  fluxo: {
    eyebrow: 'UMA PROPOSTA DE FLUXO',
    titulo: { texto: 'Automatizar o repetitivo. Preservar julgamento onde contexto importa.', destaque: 'contexto' },
  },
  raias: {
    maquina: { rotulo: 'IA', papel: 'velocidade e escala' },
    humano: { rotulo: 'Humano', papel: 'contexto e julgamento' },
  },
  etapas: [
    { n: '01', nome: 'Preparação', texto: 'Padronizar registros e garantir rastreabilidade.', dono: 'HUMANO', raia: 'humano' },
    { n: '02', nome: 'Instrução', texto: 'Definir taxonomia, escala e critérios.', dono: 'HUMANO', raia: 'humano' },
    { n: '03', nome: 'Classificação', texto: 'Processar grandes volumes sem acesso à referência.', dono: 'IA', raia: 'maquina' },
    { n: '04', nome: 'Consolidação', texto: 'Parear resultados e organizar divergências.', dono: 'AUTOMATIZADO', raia: 'maquina' },
    { n: '05', nome: 'Validação', texto: 'Revisar decisões em que contexto altera a prioridade.', dono: 'HUMANO OBRIGATÓRIO', raia: 'humano', obrigatorio: true },
    { n: '06', nome: 'Documentação', texto: 'Registrar instruções, decisões e intervenções.', dono: 'HUMANO', raia: 'humano' },
  ],
  fecho: {
    ia: 'A IA reduz o volume que precisa ser processado.',
    humano: 'O pesquisador continua responsável pelo significado da decisão.',
  },
} as const

// ── 12 · Implicações para UX · Figma 800:1062 ────────────────────────────
export const implicacoes = {
  eyebrow: 'IMPLICAÇÕES PARA UX',
  titulo: 'O risco não está apenas no erro da IA. Está em delegar a ela a decisão errada.',
  lead: 'O estudo sugere três implicações para equipes que utilizam IA em pesquisa:',
  itens: [
    {
      n: '01',
      titulo: 'Automatize classificação antes de priorização',
      texto: 'Tarefas estruturadas oferecem critérios mais explícitos para comparação.',
    },
    {
      n: '02',
      titulo: 'Trate concordância como sinal, não como validação',
      texto: 'Duas classificações iguais podem ter sido produzidas por raciocínios diferentes.',
    },
    {
      n: '03',
      titulo: 'Preserve contexto nas decisões de severidade',
      texto: 'Frequência, risco e impacto precisam ser informados ou avaliados por quem conhece o ambiente.',
    },
  ],
} as const

// ── 13 · O que este estudo não responde · Figma 800:1064 ─────────────────
export const limites = {
  eyebrow: 'O QUE ESTE ESTUDO NÃO RESPONDE',
  titulo: 'Um experimento também é definido pelo que ele ainda não consegue afirmar.',
  itens: [
    { nome: 'Um modelo', texto: 'Os resultados não representam todo modelo de linguagem.' },
    { nome: 'Um contexto', texto: 'O estudo está concentrado em sistemas hospitalares.' },
    {
      nome: 'Contexto limitado para a IA',
      texto: 'O modelo recebeu descrições dos problemas, não toda a realidade operacional dos profissionais.',
    },
    {
      nome: 'Sem validação longitudinal',
      texto: 'O estudo compara classificações, não mede o impacto da adoção desse fluxo por equipes reais ao longo do tempo.',
    },
  ],
  fecho: 'Essas limitações não invalidam a descoberta. Elas definem até onde posso levá-la.',
} as const

// ── 14–15 · Aprendizado e contato · Figma 800:1066 e 800:1068 ────────────
export const aprendizado = {
  eyebrow: 'APRENDIZADO',
  linhas: ['Parei de perguntar o que a IA consegue fazer.', 'Passei a perguntar qual decisão posso confiar a ela.'],
  texto:
    'Comecei investigando se modelos de linguagem poderiam apoiar a análise de UX. Terminei ' +
    'entendendo que a pergunta mais importante não era sobre capacidade, mas sobre ' +
    'responsabilidade. A IA pode acelerar classificação, organização e comparação. Mas, quando ' +
    'uma decisão depende de contexto que não está nos dados, eficiência não substitui julgamento.',
  fecho:
    'No fim, este projeto não mudou apenas minha visão sobre IA. Mudou minha forma de pensar ' +
    'sobre o papel do designer em sistemas críticos.',
} as const

export const contatoFinal = {
  titulo: 'Vamos conversar?',
  texto:
    'Tenho interesse em Product Design, UX Research e produtos em que compreender o contexto é ' +
    'tão importante quanto desenhar a interface. Se o seu time trabalha com problemas complexos, ' +
    'quero conhecê-los.',
  cta: { rotulo: 'Entrar em contato', href: 'https://linkedin.com/in/andreo-barbosa/' },
} as const
