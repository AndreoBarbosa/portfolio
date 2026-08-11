import { gabrielAccent } from '../../data/gabriel'

type Props = {
  title: string
  body: string
}

// Item da grade 2×2 de atributos — seção 09 (nó 649:994 e irmãos).
// Régua 1px no topo + título + corpo.
export default function AttributeItem({ title, body }: Props) {
  return (
    <div className="flex-1 flex flex-col gap-3">
      <div className="h-px w-full" style={{ background: gabrielAccent.divider }} aria-hidden="true" />
      <p className="font-outfit font-semibold text-base" style={{ color: 'var(--text-strong)' }}>{title}</p>
      <p className="font-outfit text-sm leading-[1.5]" style={{ color: gabrielAccent.textMuted }}>{body}</p>
    </div>
  )
}
