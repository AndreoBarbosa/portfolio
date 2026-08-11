import type { LucideIcon } from 'lucide-react'
import LiquidReveal from '../liquid/LiquidReveal'
import CaseLabel from './CaseLabel'

type Row = {
  icon: LucideIcon
  evidence: string
  meaning: string
  decision: string
  decisionBody: string
}

type Props = {
  columns: [string, string, string]
  rows: Row[]
}

// 26fr/34fr/32fr — Tailwind arbitrary value, espaço vira "_". Só ativa a
// partir de 860px; abaixo disso a linha é bloco normal (cada célula
// empilha em document flow, sem grid nenhum).
const ROW_GRID = 'min-[860px]:grid min-[860px]:grid-cols-[minmax(0,26fr)_minmax(0,34fr)_minmax(0,32fr)]'
const ROW_BORDER = '#E4E9EC'

// Evidência → significado → decisão — B2 (Ajustes 02). Painel único
// (antes eram 4 cards soltos com cabeçalho flutuante, sem amarração
// visual com as colunas). Semântica de tabela via role (não <table> —
// precisa de CSS Grid pras proporções 26/34/32fr, que <table> nativo não
// sustenta), navegável e legível por leitor de tela. Abaixo de 860px:
// empilha em cards com o rótulo de cada coluna acima do conteúdo, sem
// scroll horizontal (a leitura linear é o ponto da seção).
export default function EvidenceTable({ columns, rows }: Props) {
  return (
    <div role="table" aria-label="Evidências, significado e decisão de produto" className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${ROW_BORDER}` }}>
      {/* Cabeçalho — só a partir de 860px */}
      <div role="row" className={`hidden min-[860px]:grid min-[860px]:grid-cols-[minmax(0,26fr)_minmax(0,34fr)_minmax(0,32fr)]`}>
        <div role="columnheader" className="px-6 py-4 bg-white" style={{ borderBottom: '1px solid #CFD8DD' }}>
          <CaseLabel variant="column-accent">{columns[0]}</CaseLabel>
        </div>
        <div role="columnheader" className="px-6 py-4 bg-white" style={{ borderBottom: '1px solid #CFD8DD' }}>
          <CaseLabel variant="column-accent">{columns[1]}</CaseLabel>
        </div>
        <div role="columnheader" className="px-6 py-4" style={{ background: '#DDE9F0', borderBottom: '1px solid #BFD3DF' }}>
          <CaseLabel variant="column-accent">{columns[2]}</CaseLabel>
        </div>
      </div>

      <LiquidReveal stagger>
        {rows.map((row, i) => {
          const topBorder = i > 0 ? { borderTop: `1px solid ${ROW_BORDER}` } : undefined
          return (
            <div role="row" key={row.evidence} className={ROW_GRID}>
              {/* Coluna 1 — evidência */}
              <div role="cell" className="flex items-start gap-3.5 px-[18px] py-4 min-[860px]:px-6 min-[860px]:py-5" style={topBorder}>
                <span
                  className="hidden min-[860px]:flex items-center justify-center w-9 h-9 rounded-[10px] shrink-0"
                  style={{ background: '#0C1A22' }}
                  aria-hidden="true"
                >
                  <row.icon size={18} color="#FFFFFF" strokeWidth={1.75} />
                </span>
                <div>
                  <div className="min-[860px]:hidden mb-1.5">
                    <CaseLabel variant="muted">{columns[0]}</CaseLabel>
                  </div>
                  <p
                    className="font-hanken font-semibold text-base min-[860px]:pt-1.5"
                    style={{ color: '#0C1A22', lineHeight: 1.35, letterSpacing: '-0.005em' }}
                  >
                    {row.evidence}
                  </p>
                </div>
              </div>

              {/* Coluna 2 — significado */}
              <div role="cell" className="px-[18px] py-4 min-[860px]:px-6 min-[860px]:py-5" style={topBorder}>
                <div className="min-[860px]:hidden mb-1.5">
                  <CaseLabel variant="muted">{columns[1]}</CaseLabel>
                </div>
                <p className="font-outfit font-light text-[15px]" style={{ color: '#6E7F86', lineHeight: 1.5 }}>
                  {row.meaning}
                </p>
              </div>

              {/* Coluna 3 — decisão, faixa tintada contínua */}
              <div
                role="cell"
                className="px-[18px] py-4 min-[860px]:px-6 min-[860px]:py-5"
                style={{ background: '#EDF3F7', borderTop: `1px solid ${ROW_BORDER}` }}
              >
                <div className="min-[860px]:hidden mb-1.5">
                  <CaseLabel variant="muted">{columns[2]}</CaseLabel>
                </div>
                <div className="flex items-start gap-3">
                  <span
                    className="shrink-0"
                    style={{ width: 2, alignSelf: 'stretch', background: '#00648C', borderRadius: 2, marginTop: 3 }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-hanken font-semibold text-[15px]" style={{ color: '#0C1A22', lineHeight: 1.35, letterSpacing: '-0.005em' }}>
                      {row.decision}
                    </p>
                    <p className="font-outfit font-light text-sm mt-0.5" style={{ color: '#6E7F86', lineHeight: 1.45 }}>
                      {row.decisionBody}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </LiquidReveal>
    </div>
  )
}
