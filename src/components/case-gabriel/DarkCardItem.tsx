import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  title: string
  body: string
}

// Item do Briefing sobre o vidro fumê (Figma 659:997): ícone, título Outfit
// SemiBold 16 e corpo Outfit 14/21, tudo em petróleo.
export default function DarkCardItem({ icon: Icon, title, body }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Icon size={28} strokeWidth={1.5} color="#0C1A22" aria-hidden="true" />
      <div className="flex flex-col gap-2">
        <p className="font-outfit font-semibold text-base" style={{ color: '#0C1A22' }}>
          {title}
        </p>
        <p className="font-outfit text-sm leading-[1.5]" style={{ color: '#0C1A22' }}>
          {body}
        </p>
      </div>
    </div>
  )
}
