// Conteúdo real da home publicada, reorganizado para a Fase 1 (Liquid
// Glass). Texto literal — nenhum número/cargo/tese foi inventado aqui,
// só migrado de src/components/sections/{Timeline,Projects}.tsx (Fase 0)
// e do texto final entregue no brief (pilares/perguntas).

export type Pillar = {
  index: string
  title: string
  body: string
  question: string
}

export const manifesto = {
  lead: 'Bons produtos não adicionam escolhas.',
  strong: 'Reduzem a complexidade das decisões.',
}

export const pillars: Pillar[] = [
  {
    index: '01',
    title: 'Enquadrar antes de resolver',
    body: 'O problema apresentado raramente é o problema real. Antes de pensar em soluções, procuro entender qual decisão precisa melhorar e qual pergunta vale a pena responder.',
    question: 'Estamos resolvendo o problema certo?',
  },
  {
    index: '02',
    title: 'Pesquisa muda produtos',
    body: 'Pesquisa não existe para validar ideias. Existe para desafiar certezas. As decisões mais importantes que tomei nasceram de hipóteses abandonadas, não confirmadas.',
    question: 'O que as evidências realmente mostram?',
  },
  {
    index: '03',
    title: 'Reduzir esforço mental',
    body: 'Meu objetivo não é diminuir cliques. É diminuir a carga cognitiva necessária para alguém compreender uma situação e decidir com clareza.',
    question: 'Qual decisão terá maior impacto para o usuário?',
  },
  {
    index: '04',
    title: 'Projetar para evoluir',
    body: 'Projeto produtos como sistemas. Documento decisões, estruturo componentes e mantenho consistência mesmo quando o time muda.',
    question: 'Como garantir que essa solução continue evoluindo?',
  },
]

export type ProjectMedia = {
  /** WebP com alpha real, objeto de vidro estático — mostrado em repouso. */
  static: string
  /** WebM com alpha, sem áudio — troca a estática no hover/toque. */
  hover: string
}

export type Project = {
  id: string
  index: string
  title: string
  tese: string
  tags: string[]
  context: string
  badge?: string
  caseRoute: string
  /** Objeto de vidro (estática + vídeo alpha de hover), sobre o chão
     claro de .liquid-project-media — ver liquid-glass.css. Ausente =
     card cai no padrão geométrico neutro. */
  media?: ProjectMedia
}

export const projects: Project[] = [
  {
    id: 'sona',
    index: '/01',
    title: 'Sona — plataforma de clareza financeira',
    tese: 'O problema não era organizar dinheiro. Era decidir o que fazer com ele.',
    tags: ['Discovery', 'Product Strategy', 'Design System'],
    context: 'Case conceitual · Fintech',
    caseRoute: '/case/sona',
    media: { static: '/projects/sona/static.png', hover: '/projects/sona/hover.webm' },
  },
  {
    id: 'sysmed',
    index: '/02',
    title: 'Os limites da IA na avaliação hospitalar',
    tese: 'O problema não era identificar falhas. Era entender o contexto delas.',
    tags: ['UX Research', 'IA Aplicada', 'Healthtech'],
    context: 'Pesquisa aplicada · IA',
    badge: 'NOVO',
    caseRoute: '/case/ia-hospitalar',
    // D8 (correção 02): era '.mp4', mas o arquivo real em
    // public/projects/sysmed/ é hover.webm — o <video> nunca tinha uma
    // fonte válida (404 silencioso), por isso não disparava no hover.
    media: { static: '/projects/sysmed/static.png', hover: '/projects/sysmed/hover.webm' },
  },
  {
    id: 'gabriel-alves',
    index: '/03',
    title: 'Landing page para psicólogo clínico',
    tese: 'O problema não era a interface. Era a confiança.',
    tags: ['Product Thinking', 'Conversão', 'UX Writing'],
    context: 'Landing page · Saúde',
    caseRoute: '/case/gabriel',
    media: { static: '/projects/gabriel/static.png', hover: '/projects/gabriel/hover.webm' },
  },
]

export type TimelineItem = {
  year: string
  role: string
  description: string
  icon: 'faturamento' | 'suporte' | 'graduacao' | 'pos' | 'hoje'
}

// Texto real extraído do node 64:526 (Frame 74) do Figma — cada marco da
// linha do tempo horizontal, com pequenas correções ortográficas
// (acentuação/crase) sobre o texto-fonte do arquivo de design.
export const timeline: TimelineItem[] = [
  {
    year: '2020',
    role: 'Auxiliar de Faturamento',
    description: 'Início da jornada profissional, entendendo processos, fluxos e a importância da organização e da clareza.',
    icon: 'faturamento',
  },
  {
    year: '2021',
    role: 'Analista de Suporte de TI',
    description: 'Atendimento a sistemas críticos e profissionais da saúde. Mais de 20 mil chamados resolvidos.',
    icon: 'suporte',
  },
  {
    year: '2024',
    role: 'Graduação em Computação',
    description: 'Base técnica para entender sistemas, estruturar soluções e conectar tecnologias às necessidades reais.',
    icon: 'graduacao',
  },
  {
    year: '2025',
    role: 'Pós em User Experience',
    description: 'Pesquisa, metodologias de Design Centrado no Usuário e descoberta de oportunidades.',
    icon: 'pos',
  },
  {
    year: 'Hoje',
    role: 'Product Designer',
    description: 'Unindo pesquisa e pensamento analítico para criar produtos digitais com impacto real.',
    icon: 'hoje',
  },
]

export type TrajectoryStat = {
  value: string
  unit: string
  label: string
}

export const trajectoryStats: TrajectoryStat[] = [
  { value: '+5', unit: 'anos', label: 'em ambiente hospitalar crítico' },
  { value: '20 mil+', unit: 'interações', label: 'com usuários reais e chamados resolvidos' },
]

export type EducationItem = {
  /** Rótulo curto acima do título — "Pós-graduação" / "Graduação" (node 65:872). */
  category: string
  year: string
  role: string
  org: string
  description?: string | null
}

export const education: EducationItem[] = [
  {
    category: 'Pós-graduação',
    year: 'Concluída em 2026',
    role: 'User Experience Design and Beyond',
    org: 'PUCRS',
    description: null,
  },
  {
    category: 'Graduação',
    year: '2018 – 2024',
    role: 'Licenciatura em Computação',
    org: 'IFRJ, Campus Pinheiral',
    description: 'TCC: Pesquisa de UX em Ambiente Hospitalar (IHC), aprovado com louvor.',
  },
]

export type Certification = {
  /** Título curto exibido no card (a linha da fonte/data já diferencia). */
  shortLabel: string
  label: string
  source: string
  date: string
  icon: 'figma' | 'ux' | 'data' | 'award'
}

export const certifications: Certification[] = [
  { shortLabel: 'Figma', label: 'Curso de Figma', source: 'Intuitive Start', date: 'mai 2026', icon: 'figma' },
  { shortLabel: 'UX Design', label: 'UX Design: entenda a área da User Experience', source: 'Alura', date: 'out 2025', icon: 'ux' },
  { shortLabel: 'Excel & Power BI', label: 'Introdução ao Excel e Power BI Dashboards com a Klabin', source: 'DIO', date: 'set 2025', icon: 'data' },
  { shortLabel: 'UX Design', label: 'Conceitos básicos do Design de Experiência do Usuário (UX)', source: 'Google', date: 'dez 2024', icon: 'award' },
]

export const contact = {
  email: 'andreosnsd@gmail.com',
  linkedin: 'https://linkedin.com/in/andreo-barbosa/',
  resume: '/curriculo-andreo.pdf',
}
