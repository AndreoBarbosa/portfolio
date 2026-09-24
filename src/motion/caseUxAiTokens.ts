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
  webm: '/case-ux-ai/hero-motion.webm',
  mp4: '/case-ux-ai/hero-motion.mp4',
  poster: '/case-ux-ai/hero-poster.webp',
  /** Duração do arquivo, em segundos. */
  duration: 2.0,
  /** Instante do pico de movimento do objeto. */
  motionPeak: 0.8,
  /** Instante em que o objeto para. */
  motionEnd: 1.6,
} as const

/** Sequência do hero, derivada de HERO_VIDEO. Não hardcodar segundos aqui. */
export const HERO_BEAT = {
  video: 0,
  chip: HERO_VIDEO.motionPeak * 0.25, // 0.20s
  headline: HERO_VIDEO.motionPeak * 0.4, // 0.32s
  subtitle: HERO_VIDEO.motionPeak * 0.95, // 0.76s
  columns: HERO_VIDEO.motionEnd * 0.63, // 1.00s
  stats: HERO_VIDEO.motionEnd * 0.75, // 1.20s
  hook: HERO_VIDEO.motionEnd * 1.06, // 1.70s
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
