import { gabrielAccent } from '../../data/gabriel'

type Props = {
  n: string
  question: string
  section: string
  first?: boolean
}

// Linha do "mapa de dúvidas" (05, nó 662:990 e irmãos): número · pergunta
// · nome da seção alinhado à direita, separadas por régua de 1px.
export default function SequenceRow({ n, question, section, first = false }: Props) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-5 py-4 w-full ${first ? '' : 'border-t'}`}
      style={{ borderColor: gabrielAccent.divider }}
    >
      {/* Número + pergunta ficam juntos numa linha mesmo no mobile; só o
          nome da seção vira uma segunda linha própria (regra do
          briefing, item 6 · mapa de 6 dúvidas). */}
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <p className="font-outfit font-semibold leading-none text-[13px] w-6 shrink-0" style={{ color: 'var(--secundaria-500)' }}>
          {n}
        </p>
        <p className="flex-1 font-outfit font-semibold leading-[1.4] text-base" style={{ color: 'var(--text-strong)' }}>
          {question}
        </p>
      </div>
      <p className="pl-11 sm:pl-0 font-outfit leading-[1.4] text-sm sm:text-right sm:w-[190px] shrink-0" style={{ color: gabrielAccent.textMuted }}>
        {section}
      </p>
    </div>
  )
}
