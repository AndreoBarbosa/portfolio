import { ArrowRight } from 'lucide-react'
import { sonaAccent } from '../../data/sona'

type Swatch = {
  label: string
  name: string
  hex: string
  swatch: string
  ratio: string
  verdict: string
  pass: boolean
}

type Props = {
  before: Swatch
  after: Swatch
}

function Card({ s }: { s: Swatch }) {
  return (
    <div className="flex-1 min-w-0 rounded-[20px] p-5 flex flex-col gap-4" style={{ border: `1px solid ${sonaAccent.contrastBorder}` }}>
      <div className="flex items-center gap-2">
        <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ background: s.pass ? '#4A7258' : '#A84830' }} aria-hidden="true" />
        {/* R1 (Ajustes 03): não é mono, fora da allowlist — revertido pro
            Outfit original. Figma usa #D3D6D9 aqui — 1.3:1 sobre fundo
            branco, reprova AA (pensado pro fundo escuro #162530 do S10,
            não pro branco deste card). Mantive sonaAccent.textSecondary
            (~4.8:1, fix da rodada Ajustes 01) em vez de restaurar o valor
            que falha — reverter a fonte não deveria reintroduzir o bug de
            contraste. */}
        <p className="font-outfit font-semibold text-xs" style={{ color: sonaAccent.textSecondary, letterSpacing: '0.24px' }}>
          {s.label}
        </p>
      </div>
      <div className="rounded-2xl p-5 flex flex-col gap-3.5 bg-white">
        <div>
          <p className="font-outfit font-semibold text-base" style={{ color: 'var(--text-strong)' }}>
            {s.name}
          </p>
          <p className="font-outfit text-sm" style={{ color: sonaAccent.textSecondary }}>
            {s.hex}
          </p>
        </div>
        <div className="h-[110px] rounded-xl flex items-center justify-center" style={{ background: s.swatch }}>
          <span className="font-hanken text-4xl text-white">Aa</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="font-outfit text-[13px]" style={{ color: sonaAccent.textSecondary }}>
              Contraste como texto
            </p>
            <span
              className="font-outfit font-medium text-[13px] px-2.5 py-1 rounded-md"
              style={{
                background: s.pass ? '#EAF3EC' : '#FAE8E2',
                color: s.pass ? '#4A7258' : '#A84830',
              }}
            >
              {s.ratio}
            </span>
          </div>
          <p className="font-outfit font-semibold text-xs" style={{ color: s.pass ? '#4A7258' : '#A84830', letterSpacing: '0.24px' }}>
            {s.verdict}
          </p>
        </div>
      </div>
    </div>
  )
}

// Par Antes/Depois de contraste — S12. Confirmado via get_design_context
// (nó 577:2370): labels "ANTES"/"DEPOIS" em cinza claro #D3D6D9 (legível
// no tamanho real, conferido via screenshot — não é resíduo de bug).
export default function ContrastPair({ before, after }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
      <Card s={before} />
      <span
        className="flex items-center justify-center w-11 h-11 rounded-full bg-white shrink-0 self-center rotate-90 sm:rotate-0"
        style={{ border: '1px solid var(--surface-2)' }}
        aria-hidden="true"
      >
        <ArrowRight size={20} style={{ color: 'var(--text-strong)' }} />
      </span>
      <Card s={after} />
    </div>
  )
}
