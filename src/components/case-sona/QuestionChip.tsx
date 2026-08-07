import { sonaAccent } from '../../data/sona'

type Props = {
  children: string
}

// Pill de pergunta — S04. Confirmado via get_design_context (nó 577:2081):
// bg #EBEEF1, radius 16px, padding 12px/6px, texto Outfit SemiBold 16px
// #0C1A22 (texto forte — diferente do azul usado no IconCallout).
export default function QuestionChip({ children }: Props) {
  return (
    <span
      className="inline-flex items-center rounded-2xl px-3 py-1.5 font-outfit font-semibold text-base whitespace-nowrap"
      style={{ background: sonaAccent.blueSoft, color: 'var(--text-strong)' }}
    >
      {children}
    </span>
  )
}
