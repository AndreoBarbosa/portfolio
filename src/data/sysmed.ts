// Todos os números deste case vêm da pesquisa e não foram alterados.
// Ver nota de integridade dos dados no brief: 89 = total consolidado (hero/métricas),
// 75 = pares humano-IA usados na reanálise (percentuais de concordância/divergência),
// 124 = atribuições heurísticas (75 registros podem receber mais de uma heurística).

export type Metric = {
  value: number
  suffix: string
  label: string
}

export const metrics: Metric[] = [
  { value: 89, suffix: '', label: 'violações analisadas' },
  { value: 11, suffix: '', label: 'profissionais entrevistados' },
  { value: 68, suffix: '%', label: 'concordância na classificação\nhumano vs IA' },
  { value: 48, suffix: '%', label: 'concordância na priorização\nhumano vs IA' },
]

export const metricsFootnote = 'A diferença entre esses dois números é o case inteiro.'

export type HeuristicRow = {
  name: string
  count: number
  avgSeverity: number
}

// Ordenado por nº de atribuições (desc) — soma 124, conforme nota de integridade dos dados.
export const heuristicData: HeuristicRow[] = [
  { name: 'Simplicidade e linguagem natural', count: 37, avgSeverity: 1.51 },
  { name: 'Reconhecimento', count: 30, avgSeverity: 2.33 },
  { name: 'Linguagem do usuário', count: 24, avgSeverity: 1.75 },
  { name: 'Prevenir erros', count: 12, avgSeverity: 3.5 },
  { name: 'Controle e liberdade', count: 8, avgSeverity: 3.0 },
  { name: 'Consistência', count: 5, avgSeverity: 1.8 },
  { name: 'Feedback', count: 4, avgSeverity: 2.75 },
  { name: 'Boas mensagens de erro', count: 2, avgSeverity: 3.5 },
  { name: 'Atalhos', count: 1, avgSeverity: 1.0 },
  { name: 'Ajuda e documentação', count: 1, avgSeverity: 2.0 },
]

export const criticalViolations: string[] = [
  'Seleção de paciente sem confirmação visual de que ocorreu',
  'Formulários que aceitam condições clínicas mutuamente excludentes marcadas ao mesmo tempo',
  'Campo de valor volumétrico que aceita letras',
  'Salvamento sem confirmação e sem validação de campos',
  'Caixas de seleção cujo estado vazio parece preenchido',
]

export type ProcessStep = {
  n: string
  title: string
  subtitle: string
  body: string
}

export const processSteps: ProcessStep[] = [
  {
    n: '/01',
    title: 'Pesquisa com usuários',
    subtitle: '11 profissionais · entrevistas presenciais com o sistema aberto',
    body: 'Abordagem mestre-aprendiz: eu como aprendiz, o usuário como especialista na própria rotina.',
  },
  {
    n: '/02',
    title: 'Avaliação heurística',
    subtitle: '3 avaliadores independentes · 10 heurísticas de Nielsen',
    body: '89 violações consolidadas por consenso, com severidade de 1 a 4.',
  },
  {
    n: '/03',
    title: 'Preparação do experimento',
    subtitle: 'Remoção de heurística e severidade de cada registro',
    body: 'A IA recebeu só a descrição do problema. Nenhuma pista.',
  },
  {
    n: '/04',
    title: 'Análise assistida',
    subtitle: '89 itens submetidos em lotes heterogêneos',
    body: 'Taxonomia completa no prompt. Justificativa obrigatória para cada atribuição.',
  },
  {
    n: '/05',
    title: 'Validação pareada',
    subtitle: 'Comparação item a item',
    body: 'Concordância, direção da divergência e leitura das justificativas nos casos discordantes.',
  },
]

export const comparisonCards = {
  classify: {
    label: 'Classificar',
    value: 68,
    sublabel: 'concordância na heurística',
    note: '90,7% considerando sobreposição entre princípios',
  },
  prioritize: {
    label: 'Priorizar',
    value: 48,
    sublabel: 'concordância na severidade',
    note: 'Superestimou em 45,3% dos casos. Subestimou em 6,7%.',
  },
}

export type DivergencePattern = {
  n: string
  title: string
  body: string
}

export const divergencePatterns: DivergencePattern[] = [
  {
    n: '1',
    title: 'Superestimação do trivial',
    body: 'Dos 34 problemas cosméticos, a IA elevou 22 de grau — 64,7%. Entre eles, botões de equipamentos que o hospital não possui. Os usuários simplesmente ignoram esses controles. A IA os classificou como graves. Não tinha como saber.',
  },
  {
    n: '2',
    title: 'Rebaixamento do crítico',
    body: 'Das 7 violações catastróficas, a IA rebaixou 4 — 57,1%. Nenhuma foi elevada.',
  },
  {
    n: '3',
    title: 'Compressão da escala',
    body: '72% das violações foram para os dois graus do meio. O grau 1 caiu de 34 para 13 casos.',
  },
]

// Matriz de correspondência: linha = severidade humana, coluna = severidade IA
export const severityMatrixLabels = ['1 · Cosmético', '2 · Pequeno', '3 · Grande', '4 · Catastrófico']

export const severityMatrix: number[][] = [
  [12, 14, 6, 2],
  [1, 12, 9, 0],
  [0, 0, 9, 3],
  [0, 0, 4, 3],
]

export const severityMatrixColTotals = [13, 26, 28, 8]
export const severityMatrixTotal = 75

export type ModelStep = {
  n: string
  title: string
  body: string
  mode: 'Humano' | 'Automatizado' | 'Operacional' | 'Humano obrigatório'
  highlight?: 'auto' | 'human'
}

export const modelSteps: ModelStep[] = [
  {
    n: '01',
    title: 'Preparação',
    body: 'Registros em formato uniforme, com ID único por item.',
    mode: 'Humano',
  },
  {
    n: '02',
    title: 'Instrução',
    body: 'Taxonomia completa, escala definida, justificativa obrigatória. O prompt é instrumento de pesquisa.',
    mode: 'Humano',
  },
  {
    n: '03',
    title: 'Classificação',
    body: 'Lotes heterogêneos, sem acesso a respostas de referência.',
    mode: 'Automatizado',
    highlight: 'auto',
  },
  {
    n: '04',
    title: 'Consolidação',
    body: 'Saídas pareadas com a referência. Organização, não julgamento.',
    mode: 'Operacional',
  },
  {
    n: '05',
    title: 'Validação diferenciada',
    body: 'Taxonomia: revisar por exceção (só as divergências). Severidade: revisar tudo. Inclusive as concordâncias — acerto por compressão não é acerto.',
    mode: 'Humano obrigatório',
    highlight: 'human',
  },
  {
    n: '06',
    title: 'Documentação',
    body: 'Instruções, saídas, intervenções e o porquê de cada uma.',
    mode: 'Humano',
  },
]

export type Guideline = {
  n: string
  title: string
  body: string
  why: string
}

export const guidelines: Guideline[] = [
  {
    n: '01',
    title: 'Confirmação explícita de estado',
    body: 'Identificação persistente do paciente ativo. Confirmação de salvamento com horário. Sinalização de campos inválidos no momento da tentativa.',
    why: 'Ausência de confirmação na seleção admite registro em prontuário errado.',
  },
  {
    n: '02',
    title: 'Restrição de entrada nos formulários clínicos',
    body: 'Campos numéricos aceitam só número. Condições excludentes viram seleção única. Caixas de seleção com estado vazio visualmente distinto do marcado.',
    why: 'Cobre as 12 violações de prevenção de erros, todas em grau 3 ou 4.',
  },
  {
    n: '03',
    title: 'Redução de densidade e hierarquia visual',
    body: 'Agrupamento funcional, espaçamento uniforme, hierarquia tipográfica entre título, rótulo e conteúdo. Remoção de elementos sem função no contexto.',
    why: 'Responde à totalidade das avaliações negativas de atratividade.',
  },
  {
    n: '04',
    title: 'Correção da navegação inoperante',
    body: 'Consolidar botões duplicados. Corrigir ou remover controles que não executam a função esperada.',
    why: 'Um controle presente e inerte é pior que sua ausência.',
  },
  {
    n: '05',
    title: 'Material de apoio ao usuário',
    body: 'Textos de auxílio contextuais e referência acessível pelo próprio sistema.',
    why: 'Achado que veio das entrevistas, não da inspeção.',
  },
]

export type Learning = {
  title: string
  body: string
}

export const learnings: Learning[] = [
  {
    title: 'Escolher o eixo certo de comparação vale mais que ampliar a amostra.',
    body: 'Comparar severidade em vez de "acurácia geral" foi a decisão que produziu o achado. Severidade é onde o julgamento contextual mora.',
  },
  {
    title: 'Justificativa obrigatória virou o instrumento de análise.',
    body: 'Pedi justificativa para melhorar o resultado. Acabou sendo o material que permitiu entender por que a IA errava — e não só que ela errava.',
  },
  {
    title: 'Um número sozinho não é achado.',
    body: '48% de concordância é um dado morto. A direção da divergência é a descoberta.',
  },
  {
    title: 'Automatizar sem entender a natureza da tarefa é transferir o erro, não eliminá-lo.',
    body: 'Ganho de tempo em dimensão operacional não compensa perda em dimensão analítica.',
  },
]

export const whatIdDoDifferently =
  'Um segundo validador cego. Eu conhecia as classificações originais e participei da coleta — isso é risco de viés de confirmação na leitura qualitativa. Mitiguei nas etapas mensuráveis, mas não elimina.'

// Só o que foi de fato usado neste projeto — listar mais enfraquece a credibilidade das que foram.
export const skills: string[] = [
  'UX Research',
  'Avaliação Heurística',
  'Análise de Severidade',
  'Entrevistas em Profundidade',
  'Pesquisa Qualitativa',
  'Síntese de Pesquisa',
  'Design de Experimento',
  'Engenharia de Prompt',
  'IA Aplicada a UX',
  'Análise de Dados',
  'Priorização',
  'Healthtech',
  'Sistemas Críticos',
  'Interação Humano-Computador',
]

export const sectionIndex = [
  { id: 'metricas', label: 'Números' },
  { id: 'contexto', label: 'Contexto' },
  { id: 'problema', label: 'Problema' },
  { id: 'papel', label: 'Meu papel' },
  { id: 'processo', label: 'Processo' },
  { id: 'diagnostico', label: 'Diagnóstico' },
  { id: 'experimento', label: 'Experimento' },
  { id: 'achado', label: 'O achado' },
  { id: 'por-que', label: 'Por que a IA erra' },
  { id: 'modelo', label: 'O modelo' },
  { id: 'diretrizes', label: 'Diretrizes' },
  { id: 'aprendizados', label: 'Aprendizados' },
  { id: 'competencias', label: 'Competências' },
]
