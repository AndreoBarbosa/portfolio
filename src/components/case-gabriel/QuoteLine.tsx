import { gabrielAccent } from '../../data/gabriel'

type Props = {
  children: string
}

// Citação com régua — seção O Desafio (nó 664:1419 e irmãos). Régua 2px
// #C3D3E0, texto Outfit Regular 18px #0C1A22.
export default function QuoteLine({ children }: Props) {
  return (
    <div className="flex gap-4 items-start w-full">
      <span className="self-stretch shrink-0 w-[2px]" style={{ background: gabrielAccent.quoteRule }} aria-hidden="true" />
      <p className="flex-1 font-outfit text-lg leading-[1.5]" style={{ color: 'var(--text-strong)' }}>
        &ldquo;{children}&rdquo;
      </p>
    </div>
  )
}
