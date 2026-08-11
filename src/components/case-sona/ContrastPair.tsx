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

// F1 (correção 06): os dois níveis de card já existiam — o que faltava
// era um MÍNIMO de largura. No Figma os dois cards usam flex-[1_0_0]
// (crescem pra preencher o par de 632px), não largura fixa; 274/234px é
// só o valor computado nesse frame de referência, confirmado via MCP
// (nó 577:2370). min-w-0 permitia encolher abaixo do que o conteúdo
// interno (a linha de contraste, 194px) precisa — daí o transbordo.
// min-w trava o piso sem perder o crescimento flex-1 em telas maiores;
// se o pai ficar mais estreito que os 632px de referência, é a LINHA
// que deve crescer além da coluna (nunca o conteúdo encolher pra
// caber), exatamente como o briefing pede.
//
// Preenchimento é assimétrico entre ANTES e DEPOIS nos dois níveis —
// conferido nó a nó, não assumido: ANTES sem bg (transparente) nos dois
// níveis; DEPOIS com bg branco nos dois níveis. Borda #EFEFEE e raios
// 20/14 são iguais nos dois.
function Card({ s, filled }: { s: Swatch; filled: boolean }) {
  return (
    <div
      className="w-full lg:flex-1 lg:min-w-[274px] rounded-[20px] p-5 flex flex-col gap-4"
      style={{ border: `1px solid ${sonaAccent.contrastBorder}`, background: filled ? '#FFFFFF' : undefined }}
    >
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
      <div
        className="w-full lg:min-w-[234px] rounded-[14px] p-5 flex flex-col gap-[14px]"
        style={{ background: filled ? '#FFFFFF' : undefined }}
      >
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
          {/* F1: linha em 194px só a partir de lg (onde o mínimo dos
              cards acima garante espaço real pra isso). Abaixo de lg os
              cards viram w-full/fluidos — aqui a linha acompanha: flex-
              wrap deixa o rótulo (sem nowrap forçado) quebrar pra uma
              segunda linha ACIMA do badge quando não couber, badge
              nunca encolhe nem sai do card. */}
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-x-3 gap-y-1 w-full lg:w-[194px]">
            <p
              className="flex-1 min-w-[80px] lg:flex-none lg:w-[125px] lg:shrink-0 lg:whitespace-nowrap font-outfit text-[13px]"
              style={{ color: sonaAccent.textSecondary }}
            >
              Contraste como texto
            </p>
            <span
              className="w-14 h-6 shrink-0 flex items-center justify-center font-outfit font-medium text-[13px] rounded-md"
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
// Empilha abaixo de lg (1024px, confirmado no briefing — não sm/640
// como estava antes).
export default function ContrastPair({ before, after }: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-5">
      <Card s={before} filled={false} />
      <span
        className="flex items-center justify-center w-11 h-11 rounded-full bg-white shrink-0 self-center rotate-90 lg:rotate-0"
        style={{ border: '1px solid var(--surface-2)' }}
        aria-hidden="true"
      >
        <ArrowRight size={20} style={{ color: 'var(--text-strong)' }} />
      </span>
      <Card s={after} filled />
    </div>
  )
}
