/**
 * Ícones das etapas da S05 — BRIEF-S05-EXPERIMENTO v2 §4. Trocados em
 * 25 set 2026 (pedido do Andreo: os anteriores não diziam o que cada etapa é).
 * Cada ícone mostra o próprio insumo:
 *
 *   01 Descrição do problema   documento com texto (o relato do problema)
 *   02 Heurísticas utilizadas  checklist (a avaliação heurística é uma lista de princípios)
 *   03 Escala de severidade    quatro barras crescentes, preenchimento subindo com o nível
 *   04 Classificação           etiqueta (cada problema recebe heurística e severidade)
 *
 * Grade de 24, traço 1,5, pontas redondas, `currentColor` (o token vem do pai,
 * --acao-hover). Renderizados a 22px, como no Figma.
 */
import type { SVGProps } from 'react'

const base: SVGProps<SVGSVGElement> = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export function IconeDocumento() {
  return (
    <svg {...base}>
      <path d="M14 2.75H6.75a2 2 0 0 0-2 2v14.5a2 2 0 0 0 2 2h10.5a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2.75V8h5.25" />
      <path d="M8.5 12.5h7M8.5 16h7M8.5 9h2.5" />
    </svg>
  )
}

export function IconeChecklist() {
  return (
    <svg {...base}>
      <path d="m3.25 6.5 1.75 1.75 3.25-3.25M3.25 16.5l1.75 1.75 3.25-3.25" />
      <path d="M12 6.5h8.75M12 12h8.75M12 17.5h8.75" />
    </svg>
  )
}

/** Escala 1 a 4: o preenchimento sobe com o nível, como a gravidade. */
export function IconeEscala() {
  return (
    <svg {...base}>
      <rect x="2.75" y="16" width="3.5" height="4.75" rx="1" />
      <rect x="7.75" y="12.25" width="3.5" height="8.5" rx="1" fill="currentColor" fillOpacity="0.3" />
      <rect x="12.75" y="8.25" width="3.5" height="12.5" rx="1" fill="currentColor" fillOpacity="0.6" />
      <rect x="17.75" y="3.25" width="3.5" height="17.5" rx="1" fill="currentColor" />
    </svg>
  )
}

export function IconeEtiqueta() {
  return (
    <svg {...base}>
      <path d="M12.59 3.34a2 2 0 0 0-1.42-.59H4.75a2 2 0 0 0-2 2v6.42a2 2 0 0 0 .59 1.42l8.2 8.2a2.3 2.3 0 0 0 3.25 0l5.87-5.87a2.3 2.3 0 0 0 0-3.25Z" />
      <circle cx="7.75" cy="7.75" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  )
}

export const ICONES_ETAPA = {
  documento: IconeDocumento,
  checklist: IconeChecklist,
  escala: IconeEscala,
  rotulo: IconeEtiqueta,
} as const
