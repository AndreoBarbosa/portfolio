export type JourneyNode = {
  step: string
  delivers: string
}

// Uma sequência só, em dois registros: o passo do produto (step) e o que ele
// entrega em valor (delivers). Duas cadeias separadas (produto vs. valor)
// empilhadas liam como repetição — fundidas em um nó de dois níveis, não.
export const journeyNodes: JourneyNode[] = [
  { step: 'Open Finance', delivers: 'conexão' },
  { step: 'Diagnóstico', delivers: 'clareza' },
  { step: 'Plano', delivers: 'direção' },
  { step: 'Meta', delivers: 'decisão' },
  { step: 'Acompanhamento', delivers: 'progresso' },
]

export type Decision = {
  n: string
  title: string
  body: string
  why: string
}

export const decisions: Decision[] = [
  {
    n: '01',
    title: 'Alocação virtual: nada sai da conta',
    body: 'Mover dinheiro de verdade exigiria operar como instituição financeira e transformaria erro de planejamento em prejuízo real. Organizar o destino entrega a clareza sem o risco.',
    why: 'Mantém o Sona fora da categoria "banco" — que é justamente o que ele não quer ser.',
  },
  {
    n: '02',
    title: 'Toda meta é estruturalmente igual',
    body: 'Em determinado momento a reserva de emergência foi protegida contra exclusão. Parecia responsável, mas contradizia o princípio do produto — o Sona propõe, o usuário decide — e tornava o gesto imprevisível, com cada card revelando ações diferentes. A regra foi revogada.',
    why: 'Toda meta tem as mesmas ações e a mesma estrutura de tela. A diferença vive no conteúdo, nunca na estrutura.',
  },
  {
    n: '03',
    title: 'Reconciliação sem culpa',
    body: 'Quando o saldo real não bate com o valor reservado, a maioria dos apps trata como erro do usuário. O Sona trata como informação: dinheiro na conta é dinheiro vivo, o que importa é o plano refletir a realidade. A tela oferece três saídas: repor, estender o prazo ou aceitar o novo valor.',
    why: 'Nenhuma das três é repreensão.',
  },
  {
    n: '04',
    title: 'Peso visual inversamente proporcional à irreversibilidade',
    body: 'Excluir uma meta é a ação mais destrutiva da tela e por isso tem o menor peso visual: um link de texto. Botão sólido fica reservado para o que faz o plano avançar.',
    why: 'A hierarquia visual comunica consequência antes de qualquer texto de confirmação.',
  },
  {
    n: '05',
    title: 'Sem iconografia financeira',
    body: 'Moeda, cifrão, cofrinho e gráfico com seta comunicam acumulação, mercado e especulação. O Sona comunica clareza e direção. Recusar essa gramática visual foi decisão consciente, não omissão.',
    why: 'Manteve o produto fora da estética de fintech tradicional — coerente com um posicionamento que não é sobre dinheiro, é sobre entendimento.',
  },
]

export type FigmaToCodeItem = {
  title: string
  body: string
}

export const figmaToCode: FigmaToCodeItem[] = [
  {
    title: 'Links sem destino',
    body: 'Três links de "Detalhes" não levavam a lugar nenhum. No protótipo pareciam completos; na implementação, criavam becos sem saída justamente na tela mais importante do produto.',
  },
  {
    title: 'Dados inconsistentes',
    body: 'As porcentagens do plano não correspondiam aos valores exibidos. A implementação revelou uma inconsistência que passou despercebida no protótipo e precisou ser corrigida para preservar a confiança nas informações.',
  },
  {
    title: 'Lógica da alocação',
    body: 'O plano destinava 100% da sobra automaticamente para as metas. No código, isso eliminava qualquer saldo disponível e tornava impossível exibir o card Próxima ação, uma das principais funcionalidades da experiência.',
  },
  {
    title: 'Números incompatíveis',
    body: 'O patrimônio total era de R$ 12.450, mas as metas somavam R$ 23.300. A inconsistência só apareceu quando todos os dados foram conectados e validados em conjunto.',
  },
]

export const figmaToCodeClosing = 'Nenhum desses aparece numa tela estática. Todos apareceram no primeiro minuto de uso real.'

export type DemoStep = {
  text: string
}

export const demoScript: DemoStep[] = [
  { text: 'Conecte só um banco e veja o patrimônio e o score se ajustarem.' },
  { text: 'Crie uma meta e acompanhe a sobra sendo alocada em tempo real.' },
  { text: 'Exclua a meta e veja o dinheiro voltar para a sobra sem destino.' },
]

export const sectionIndex = [
  { id: 'hipotese', label: 'A Hipótese' },
  { id: 'descoberta', label: 'A Descoberta' },
  { id: 'decisoes', label: 'As Decisões' },
  { id: 'resultado', label: 'O Resultado' },
  { id: 'aprendizado', label: 'O Aprendizado' },
]
