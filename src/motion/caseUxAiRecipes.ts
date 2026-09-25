/**
 * Receitas de motion do case UX + AI — blueprint seção 14.3, categoria
 * 01 · ENTER. Cada receita é um `Variants` do framer-motion, para usar com
 * `initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={...}`.
 *
 * `enter-fade-up` não é o padrão universal (ver blueprint): títulos usam
 * `lineMask`, linhas de SVG usam `enterDraw`, cards usam `enterCard`,
 * divisores usam `enterRule`. Escolher a receita pelo tipo de elemento,
 * não por conveniência.
 */
import type { Variants } from 'framer-motion'
import { DUR, EASE, MOVE, REDUCED_FADE } from './caseUxAiTokens'

/** Texto de apoio, parágrafos, itens de lista. Nunca sobe mais que MOVE.md. */
export const enterFadeUp: Variants = {
  hidden: { opacity: 0, y: MOVE.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.enter, ease: EASE.enter },
  },
}

/** Cards e superfícies — opacidade + leve subida + leve escala. */
export const enterCard: Variants = {
  hidden: { opacity: 0, y: MOVE.md, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DUR.enter, ease: EASE.enter },
  },
}

/** Divisores — cresce a partir da esquerda (ou do topo, se vertical). */
export const enterRule: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: DUR.enter, ease: EASE.enter },
  },
}

export const enterRuleVertical: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: DUR.enter, ease: EASE.enter },
  },
}

/** Linhas de SVG (lattice, diagramas) — desenho por pathLength. */
export const enterDraw: Variants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: DUR.headline, ease: EASE.state },
  },
}

/**
 * Título por máscara — uma linha por elemento (ver components/type/LineMask.tsx,
 * que faz o split real). O container escalona os filhos; cada linha entra
 * com clip-path + y curto.
 */
export const lineMaskContainer = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
})

export const lineMaskLine: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', y: MOVE.xs },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    y: 0,
    transition: { duration: DUR.headline, ease: EASE.enter },
    // Solta a máscara ao pousar: com entrelinha 1.1 o clip no box cortaria
    // descendentes (o "p" de "hospitalares" no H1 do hero).
    transitionEnd: { clipPath: 'none' },
  },
}

/** Container genérico para cascatas (stats, células, itens de lista). */
export const staggerContainer = (staggerChildren: number, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
})

/**
 * Motivo A — a divergência (MOTION-SPEC-SYSMED.md §1 e §6). Dois elementos
 * nascem deslocados `distance` para dentro, um em direção ao outro, e se
 * afastam em direções opostas até a posição de layout. Implementação única,
 * usada nas três aparições do motivo: S01 (colunas), S05 (especialistas/IA)
 * e S09 (linhas de divisão de trabalho).
 *
 * O spec escreve `x: 0 → ±distância`. Invertido aqui de propósito: o
 * elemento termina em x:0, ou seja, exatamente na geometria do Figma, em vez
 * de ficar parado 24px fora dela. O afastamento percorrido é o mesmo.
 */
export const enterDivergence = (direction: 'left' | 'right', distance: number = MOVE.md): Variants => ({
  hidden: { x: direction === 'left' ? distance : -distance, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: DUR.enter, ease: EASE.enter },
  },
})

/** Estado atenuado (§14.2): opacidade 0.3 em objeto, 0.85 em texto. */
export const DIMMED_OBJECT_OPACITY = 0.3
export const DIMMED_TEXT_OPACITY = 0.85

/** Fade puro, sem deslocamento (chip do hero, eyebrows, legendas). */
export const enterFade = (duration: number = DUR.enter): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration, ease: EASE.enter } },
})

/** Reduced motion: toda entrada vira fade de REDUCED_FADE, sem atraso nem cascata (contrato §6 e §7). */
export const reducedFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: REDUCED_FADE } },
}

/** Acrescenta um atraso (o beat da seção) ao `transition` do estado `visible` de uma receita. */
export function atBeat(variants: Variants, delay: number): Variants {
  const visible = variants.visible as { transition?: object }
  return { ...variants, visible: { ...visible, transition: { ...visible.transition, delay } } }
}
