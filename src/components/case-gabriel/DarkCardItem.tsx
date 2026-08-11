import type { LucideIcon } from 'lucide-react'
import { gabrielAccent } from '../../data/gabriel'

type Props = {
  icon: LucideIcon
  title: string
  body: string
  /** 1ª coluna do Briefing usa um tom levemente diferente no Figma
      (tokenizado, segundária-100) — ver data/gabriel.ts. */
  bodyColor?: string
}

// Item de coluna do card escuro (04 · Briefing, nó 659:1004 e irmãos).
// Ícone solto 48px branco, título SemiBold branco, corpo no tom
// definido por bodyColor (default = valor solto do Figma).
export default function DarkCardItem({ icon: Icon, title, body, bodyColor }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Icon size={28} strokeWidth={1.5} color={gabrielAccent.darkCardTitle} aria-hidden="true" />
      <div className="flex flex-col gap-2">
        <p className="font-outfit font-semibold text-base" style={{ color: gabrielAccent.darkCardTitle }}>
          {title}
        </p>
        <p className="font-outfit text-sm leading-[1.5]" style={{ color: bodyColor ?? gabrielAccent.darkCardBody }}>
          {body}
        </p>
      </div>
    </div>
  )
}
