import { gabrielAccent } from '../../data/gabriel'

type Swatch = { name: string; hex: string; textColor: string; border?: string }
type TypePair = { serifBg: string; serifColor: string; sansBg: string; sansColor: string }

type Props = {
  title: string
  body: string
  swatches?: Swatch[]
  typePair?: TypePair
}

// Coluna de identidade visual (07, nó 653:992 e irmãos): par de amostras
// 124×88 rounded-12 + título + justificativa. A 3ª coluna troca o par de
// cores por um par tipográfico ("Aa" serifada/sans) — mesmo formato de
// caixa, conteúdo diferente.
export default function IdentityColumn({ title, body, swatches, typePair }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center gap-5">
      <div className="flex gap-3 items-center">
        {swatches?.map((s) => (
          <div
            key={s.name}
            className="w-[124px] h-[88px] rounded-xl flex flex-col justify-end pb-2.5 pl-3 shrink-0"
            style={{ background: s.hex, border: s.border ? `1px solid ${s.border}` : undefined }}
          >
            <span className="font-outfit font-semibold text-xs leading-none" style={{ color: s.textColor, letterSpacing: '0.24px' }}>
              {s.name}
            </span>
          </div>
        ))}
        {typePair && (
          <>
            <div className="w-[124px] h-[88px] rounded-xl flex items-center justify-center shrink-0" style={{ background: typePair.serifBg }}>
              <span className="font-source-serif font-bold text-4xl leading-none" style={{ color: typePair.serifColor }}>Aa</span>
            </div>
            <div className="w-[124px] h-[88px] rounded-xl flex items-center justify-center shrink-0" style={{ background: typePair.sansBg }}>
              <span className="font-outfit text-4xl leading-none" style={{ color: typePair.sansColor }}>Aa</span>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="font-outfit font-semibold text-base" style={{ color: 'var(--text-strong)' }}>{title}</p>
        <p className="font-outfit text-base leading-[1.5]" style={{ color: gabrielAccent.textMuted }}>{body}</p>
      </div>
    </div>
  )
}
