/**
 * Fonte única de motion do portfólio.
 *
 * Antes desta camada existiam dois conjuntos de valores em paralelo:
 * AnimateOnScroll rodava ease [0.22, 1, 0.36, 1] com stagger de 60ms, e
 * LiquidReveal rodava ease [0.16, 1, 0.3, 1] com stagger de 80ms. Duas
 * curvas diferentes na mesma página é exatamente o que o master proíbe na
 * seção 7 (consistência). Os valores abaixo são os do master, seção 6.1,
 * e nenhum componente deve declarar duração ou curva por conta própria.
 */

/** cubic-bezier(0.16, 1, 0.3, 1) — arranque rápido, cauda longa de desaceleração. */
export const EASE = [0.16, 1, 0.3, 1] as const

export const DUR = {
  /** micro-interações: hover, cor, foco */
  micro: 0.2,
  /** reveal de bloco ao entrar na viewport */
  reveal: 0.6,
  /** transição de página */
  page: 0.7,
  /** entrada do hero no load */
  hero: 0.8,
} as const

/** Atraso entre itens de uma cascata. Master seção 6.1: 40 a 80ms. */
export const STAGGER = 0.06

/** Deslocamento vertical de entrada. Curto de propósito: o master pede contenção. */
export const OFFSET = 24

/**
 * Dispara um pouco antes do elemento estar totalmente visível, para o
 * usuário ver a animação acontecer em vez de encontrar o resultado pronto.
 */
export const VIEWPORT = { once: true, margin: '-10% 0px -10% 0px' } as const

/** Suavização do scrub (lerp por quadro). Abaixo de 0.10 vira arrasto, acima de 0.15 cola no dedo. */
export const SCRUB_LERP = 0.12
