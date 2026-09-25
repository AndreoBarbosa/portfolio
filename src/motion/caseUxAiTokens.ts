/**
 * Motion tokens do case UX + AI — blueprint seção 14.1.
 *
 * Arquivo próprio, não `src/motion/tokens.ts`: aquele arquivo já existe e é a
 * fonte única de motion do resto do portfólio (Home, AnimateOnScroll,
 * LiquidReveal — ver o comentário no topo dele). Os dois sistemas têm
 * valores parecidos mas não idênticos e servem páginas com identidade
 * visual diferente; nomear este por página evita que uma mudança num
 * sistema mude o outro por acidente.
 */

export const EASE = {
  enter: [0.16, 1, 0.3, 1],   // entradas, desaceleração longa
  state: [0.65, 0, 0.35, 1],  // troca de estado, morph
  micro: [0.2, 0, 0, 1],      // hover, pressionado
  exit: [0.4, 0, 1, 1],       // saídas, sempre mais curtas
} as const

export const DUR = {
  micro: 0.16,
  hover: 0.2,
  state: 0.32,
  exit: 0.24,
  enter: 0.64,
  headline: 0.8,
  data: 1.0,
  hero: 1.2,
} as const

export const STAGGER = {
  cell: 0.04,
  item: 0.064,
  line: 0.08,
  stat: 0.12,
} as const

/** Distância de deslocamento, sempre em px (teto §14.2: texto nunca sobe mais que mv.md). */
export const MOVE = {
  xs: 8,
  sm: 16,
  md: 24,  // teto para texto
  lg: 32,  // motivo A (divergência) na S05 — MOTION-SPEC-SYSMED.md §6, S05: "32px cada"
  obj: 80, // teto para objeto CGI em parallax desktop
} as const

/** Vídeo do hero. Ao trocar o arquivo, remedir e atualizar SÓ este bloco:
 *  o resto da sequência é derivado daqui. */
export const HERO_VIDEO = {
  webm: '/case-ux-ai/hero-v2.webm',
  mp4: '/case-ux-ai/hero-v2.mp4',
  /** Duração do arquivo, em segundos. */
  duration: 10.0,
  /** Pico do gesto de abertura do objeto. */
  motionPeak: 0.4,
  /** Instante em que o gesto de abertura assenta. */
  motionEnd: 1.2,
} as const

/** Imagem estática do hero: aparece antes do play e depois do fim do vídeo. */
export const HERO_STATIC = {
  avif: { '1x': '/case-ux-ai/hero-static-1440.avif', '2x': '/case-ux-ai/hero-static-2880.avif' },
  webp: { '1x': '/case-ux-ai/hero-static-1440.webp', '2x': '/case-ux-ai/hero-static-2880.webp' },
  largura: 1440,
  altura: 1080,
  /** Saída do poster quando o primeiro quadro do vídeo aparece. */
  fadeOut: 0.24,
  /** Entrada da imagem no fim do vídeo. */
  fadeIn: 0.7,
  /** Desaceleração no fim do vídeo. */
  desacelera: { ultimos: 1.2, taxaMinima: 0.4 },
} as const

/** Sequência do hero, derivada de HERO_VIDEO. Não hardcodar segundos aqui. */
export const HERO_BEAT = {
  video: 0,
  chip: HERO_VIDEO.motionPeak * 0.25, // 0.10s
  headline: HERO_VIDEO.motionPeak * 0.4, // 0.16s
  subtitle: HERO_VIDEO.motionPeak * 0.95, // 0.38s
  columns: HERO_VIDEO.motionEnd * 0.63, // 0.76s
  stats: HERO_VIDEO.motionEnd * 0.75, // 0.90s
  hook: HERO_VIDEO.motionEnd * 1.06, // 1.27s
} as const

/** Gatilho de entrada padrão — elemento com topo em 85% da viewport, uma vez só. */
export const VIEWPORT = { once: true, margin: '0px 0px -15% 0px' } as const

/** Suavização de valores ligados ao scroll (scrub). */
export const SCRUB_SPRING = { stiffness: 120, damping: 30, mass: 0.4 } as const

/** Teto de parallax de objeto CGI por breakpoint — seção 18.1. */
export const PARALLAX_OBJECT = {
  xl: 80,
  l: 64,
  m: 32,
  s: 24,
} as const

/** Durações próprias do hero, da tabela de beats (MOTION-SPEC-SYSMED.md §6,
 *  S01). Não estão em DUR porque só o hero usa. */
export const HERO_DUR = {
  /** Fade de entrada do vídeo. */
  video: 0.5,
  /** Desenho da treliça, em paralelo com tudo, nunca bloqueia. */
  lattice: 2.4,
  /** Fade da frase-gancho. */
  hook: 0.4,
  /** Contagem dos stats, em ms (useCountUp). */
  countMs: 800,
} as const

/** Parallax do objeto do hero — só case-xl com ponteiro fino (isDesktop). */
export const HERO_PARALLAX = {
  /** Deslocamento máximo pelo mouse, na direção oposta ao cursor. */
  mouse: MOVE.xs,
  /** Objeto anda a 0.85x do texto: sobra 0.15 do scroll como deslocamento. */
  scrollRate: 0.85,
  /** Teto do deslocamento de scroll, em px. */
  scrollMax: 40,
  /** Suavização forte do mouse: rígida baixa, amortecimento alto. */
  spring: { stiffness: 40, damping: 20, mass: 1 },
} as const

/** Reduced motion: toda entrada vira este fade (CONTRATO-RESPONSIVO §6). */
export const REDUCED_FADE = 0.2

/** S02: player do explorador das capacidades. O tempo de cada slide é a duração do vídeo. */
export const CAPACIDADES_PLAYER = {
  /** Fração da seção visível para o player rodar. */
  visibleRatio: 0.5,
  /** Espera depois que a entrada da seção termina, em segundos. */
  startDelay: 0.4,
  /** Distância da viewport em que os vídeos começam a carregar. */
  preloadMargin: '600px',
  /** A troca começa este tanto antes do fim do vídeo, em segundos. */
  antecipa: 0.5,
  /** Coreografia da troca de slide (seção 19). Segundos e px. */
  transicao: {
    video: 0.9,
    escalaEntrada: 1.03,
    /** Vídeo que sai: 1 → 0.98 (tabela da seção 19; não estava no bloco da seção 9). */
    escalaSaida: 0.98,
    textoSai: 0.28,
    textoEntra: 0.48,
    textoAtraso: 0.24,
    textoDesloc: 8,
    capsula: 0.6,
  },
} as const

/** S03–04: sequência de entrada (BRIEF-S03-DESAFIO v2 §7). Segundos. */
export const S03_BEAT = {
  vidro: 0,
  eyebrow: 0,
  intro: 0.12,
  eyebrowPergunta: 0.36,
  /** Linha 1 da pergunta; as outras seguem em STAGGER.line. */
  pergunta: 0.44,
  /** "priorizá-los?" chega este tanto depois da linha dele (linha 5 → 0.88s). */
  destaqueAposLinha: 0.12,
  intencao: 1.1,
  /** Ficha, com gatilho próprio: régua do topo, rótulo, depois as quatro células em STAGGER.item. */
  ficha: { regua: 0, titulo: 0.16, celulas: 0.24 },
} as const

export const S03_DUR = {
  vidro: DUR.hero, // 1.2
  eyebrow: 0.4,
  destaque: 0.48,
} as const

/** Parallax do vidro: 0.9x da rolagem, teto de 40px. */
export const S03_PARALLAX = { taxa: 0.9, teto: 40 } as const

/** Pílula de briefing (BRIEF-S03-DESAFIO §10, MOTION-SPEC §5). */
export const BRIEFING_PILULA = {
  /** Entrada: opacity e y, EASE.state. */
  entra: 0.3,
  /** Saída: o inverso, EASE.exit. */
  sai: 0.2,
  desloc: MOVE.xs, // 8
  /** Ao voltar, o topo do painel fica a esta distância do topo da tela (abaixo da nav). */
  topoAoVoltar: 96,
  /** Some quando o fim do trecho chega a esta fração da altura da tela. */
  fimEm: 0.6,
} as const

/** S05: entrada do cabeçalho e das etapas (BRIEF-S05-EXPERIMENTO v2 §7). Segundos. */
export const S05_BEAT = {
  eyebrow: 0,
  titulo: 0.12,
  metodo: 0.24,
  /** Etapa k em k × STAGGER.line; a seta k desenha 40ms depois da etapa dela. */
  setaAposEtapa: 0.04,
  seta: 0.3,
  comparacao: 0.32,
} as const

/**
 * S05: linha do tempo do quadro (BRIEF-S05-EXPERIMENTO v2 §5). Segundos.
 * Os 89 pontos nascem juntos no eixo e se dividem nos dois campos.
 */
export const S05_QUADRO = {
  /** Fade de cada ponto do conjunto de origem, em ordem sorteada. */
  entradaPonto: { dur: 0.25, passo: 0.005 },
  /** Divisão, do centro da grade para fora. */
  divisao: { inicio: 0.7, passo: 0.0016, dur: 0.9 },
  halo: { inicio: 1.3, dur: 0.7 },
  rotuloEspecialistas: { inicio: 1.44, dur: 0.4 },
  ancoras: { inicio: 1.5, dur: 0.4 },
  vs: { inicio: 1.5, dur: 0.3 },
  /** Divisor desenhando (pathLength). */
  divisor: { inicio: 1.56, dur: 0.7 },
  /** Azul do campo da IA, do eixo para a borda. */
  azul: { inicio: 1.62, passo: 0.0012, dur: 0.6 },
  rotuloIA: { inicio: 1.7, dur: 0.4 },
  /** Totais sobem 8px; o da IA 80ms depois. */
  totais: { inicio: 1.9, passo: 0.08, dur: 0.64 },
  /** Ligação "mesmo problema" desenhando entre as duas âncoras. */
  ligacao: { inicio: 2.1, dur: 0.9 },
  rotuloLigacao: { inicio: 2.6, dur: 0.4 },
} as const

/**
 * S06: o clímax (BRIEF-S06-S15 §S06). Progresso de 0 a 1: no desktop vem da
 * rolagem (seção presa na tela); fora dele, do tempo, depois que a seção
 * entra. As faixas dizem em que trecho do progresso cada coisa acontece.
 */
export const S06_CLIMAX = {
  /** Altura do trecho de rolagem com a seção presa, em vh. */
  alturaScroll: 260,
  /** 68%: o número conta, a haste desce, o ponto acende na crista alta. */
  linha1: [0.06, 0.34],
  /** 48%: o mesmo, na crista baixa. */
  linha2: [0.38, 0.64],
  /** As guias tracejadas marcam o vão de 20 pontos entre as cristas. */
  distancia: [0.66, 0.8],
  /** Frase de fecho. */
  fecho: [0.8, 0.94],
  /** Sem rolagem presa: o mesmo progresso, em segundos. */
  tempo: 3.4,
} as const
