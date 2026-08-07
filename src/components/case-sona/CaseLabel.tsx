import type { ElementType, ReactNode } from 'react'

// R1 (Ajustes 03): escopo travado. JetBrains Mono só em rótulo de dado
// dentro de card — cabeçalho de coluna de tabela, "Hipótese de design" +
// "Direção", "O que entrou" + "O que ficou de fora", labels inline da
// tabela em mobile. Eyebrow de seção, título de card e qualquer texto
// corrido NUNCA usam este componente (o Ajustes 02 tinha ido longe demais
// aplicando isso em todo label da página — revertido).
//
// A variante "on-dark" (criada no Ajustes 02 pra "BRIEFING" e "Como
// investigaria") foi removida: os dois usos que a motivavam voltaram pra
// tipografia original nesta rodada, então ficaria morta no componente.
type Variant = 'section' | 'column' | 'column-on-tint' | 'muted' | 'state-in' | 'state-out'

type Props = {
  as?: ElementType
  variant: Variant
  children: ReactNode
  className?: string
}

// Exportado à parte pro único caso que não pode usar <CaseLabel> como
// elemento (precisa de motion.p pra animação de entrada no load — o
// eyebrow do hero). Mesma receita, aplicada via style spread.
export function caseLabelStyle(variant: Variant) {
  const { fontSize, letterSpacing, color } = styles[variant]
  return {
    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    lineHeight: 1.2,
    margin: 0,
    fontSize,
    letterSpacing,
    color,
  }
}

const styles: Record<Variant, { fontSize: string; letterSpacing: string; color: string }> = {
  section: { fontSize: '12px', letterSpacing: '0.14em', color: '#00648C' },
  column: { fontSize: '11px', letterSpacing: '0.12em', color: '#00648C' },
  'column-on-tint': { fontSize: '11px', letterSpacing: '0.12em', color: '#0A4E6E' },
  muted: { fontSize: '11px', letterSpacing: '0.12em', color: '#6E7F86' },
  'state-in': { fontSize: '11px', letterSpacing: '0.12em', color: '#3F6B4D' },
  'state-out': { fontSize: '11px', letterSpacing: '0.12em', color: '#8A422B' },
}

// Label de dado dentro de card — uso travado pelo R1 (Ajustes 03). Não
// aplicar em nada novo sem antes checar a allowlist / perguntar.
//
// Nota estrutural: margin:0 é proposital (o componente não deve carregar
// espaçamento próprio — quem posiciona é o pai). Nunca aplique uma classe
// mb-*/mt-* direto no <CaseLabel>: style inline sempre vence className,
// a margem seria descartada em silêncio. Envolva num wrapper com a
// margem em vez disso (ver HypothesisCard.tsx, "Direção").
export default function CaseLabel({ as: Tag = 'span', variant, children, className = '' }: Props) {
  return (
    <Tag className={className} style={caseLabelStyle(variant)}>
      {children}
    </Tag>
  )
}
