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

// ── Nav — blueprint §8, nó 802:1033 ──────────────────────────────────────
export const nav = {
  logo: 'AB',
  links: [
    { label: 'Projetos', href: '/#projetos' },
    { label: 'Trajetória', href: '/#trajetoria' },
    { label: 'Sobre', href: '/#sobre' },
  ],
  cta: { label: 'Ver todos os projetos', href: '/#projetos' },
}

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
