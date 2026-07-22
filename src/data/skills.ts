export type IconName = 'search' | 'layers' | 'flow' | 'tool' | 'code' | 'sparkle'

export type SkillGroup = {
  icon: IconName
  label: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    icon: 'search',
    label: 'Pesquisa & Estratégia',
    skills: [
      'UX Research',
      'Personas',
      'Desk Research',
      'Design Thinking',
      'User Journey Mapping',
      'Design Centrado no Usuário',
      'Arquitetura da Informação',
      'Entrevistas em Profundidade',
    ],
  },
  {
    icon: 'layers',
    label: 'UX/UI Design',
    skills: [
      'UI Design',
      'Wireframes',
      'UX Writing',
      'Prototipação',
      'Design System',
      'Design de Interfaces',
    ],
  },
  {
    icon: 'flow',
    label: 'Métodos',
    skills: [
      'Análise de Severidade',
      'Avaliação Heurística',
      'Design de Experimento',
      'Testes de Usabilidade',
    ],
  },
  {
    icon: 'tool',
    label: 'Ferramentas',
    skills: ['Miro', 'Figma', 'FigJam'],
  },
  {
    icon: 'code',
    label: 'Dev',
    skills: ['Git', 'CSS', 'HTML', 'JavaScript', 'TypeScript', 'Deploy (cPanel)'],
  },
  {
    icon: 'sparkle',
    label: 'Extras',
    skills: [
      'IA Aplicada a UX',
      'Python (básico)',
      'Excel / Power BI',
      'Engenharia de Prompt',
      'Geração de imagem por IA',
    ],
  },
]
