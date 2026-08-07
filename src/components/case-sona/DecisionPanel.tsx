import { Check, X, type LucideIcon } from 'lucide-react'
import LiquidReveal from '../liquid/LiquidReveal'
import CaseLabel from './CaseLabel'

type EnteredItem = { icon: LucideIcon; title: string; body: string }

type Props = {
  entered: { label: string; items: EnteredItem[] }
  excluded: { label: string; body: string }
}

// Conteúdo do card "Decisão" — B3 (Ajustes 02). O card interno azul saiu:
// agora é um card só (a casca fica em BorderedCard). Os 3 itens de "O que
// entrou" ficam em largura cheia empilhados (eliminava o órfão da 2ª
// linha em 2 colunas). "O que ficou de fora" é deliberadamente mais
// quieto — não equalizar o tratamento com "entrou".
export default function DecisionPanel({ entered, excluded }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-[18px]">
        <span className="flex items-center justify-center w-5 h-5 rounded-full shrink-0" style={{ background: '#628E70' }} aria-hidden="true">
          <Check size={11} color="#FFFFFF" strokeWidth={3} />
        </span>
        <CaseLabel variant="state-in">{entered.label}</CaseLabel>
      </div>

      <LiquidReveal stagger className="grid gap-[2px] rounded-[10px] overflow-hidden bg-[#E4E9EC]">
        {entered.items.map((item) => (
          <div key={item.title} className="flex items-start gap-3 px-[18px] py-4" style={{ background: '#EDF3F7' }}>
            <item.icon size={18} className="shrink-0 mt-0.5" style={{ color: '#0C1A22' }} aria-hidden="true" />
            <div>
              <p className="font-hanken font-semibold text-[15px] mb-0.5" style={{ color: '#0C1A22', letterSpacing: '-0.005em' }}>
                {item.title}
              </p>
              <p className="font-outfit font-light text-sm" style={{ color: '#6E7F86', lineHeight: 1.45 }}>
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </LiquidReveal>

      <div className="h-px" style={{ background: '#E4E9EC', margin: '28px 0' }} aria-hidden="true" />

      <div className="flex items-center gap-2.5 mb-[18px]">
        <span className="flex items-center justify-center w-5 h-5 rounded-full shrink-0" style={{ background: '#C96040' }} aria-hidden="true">
          <X size={11} color="#FFFFFF" strokeWidth={3} />
        </span>
        <CaseLabel variant="state-out">{excluded.label}</CaseLabel>
      </div>
      <p
        className="font-outfit font-light text-[15px]"
        style={{ color: '#6E7F86', lineHeight: 1.55, borderLeft: '2px solid #C96040', padding: '2px 0 2px 16px' }}
      >
        {excluded.body}
      </p>
    </div>
  )
}
