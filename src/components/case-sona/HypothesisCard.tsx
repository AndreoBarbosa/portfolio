import CaseLabel from './CaseLabel'

type Props = {
  label: string
  question: string
  answer: string
}

// Card "Hipótese de design" — B4 (Ajustes 02). O círculo preto com o
// ícone de lâmpada saiu. O label que antes vivia FORA do card (parágrafo
// irmão acima dele) agora é o kicker da própria zona superior — mudança
// estrutural pedida no B4, não um desvio meu. O card mantém a mesma
// posição/largura/sobreposição com a lista 01–04 (não mexi nisso); o que
// mudou foi o conteúdo interno, que agora INCLUI o que antes era um
// elemento irmão externo.
//
// Pergunta sem trecho em destaque por enquanto — o nó atual do Figma
// (585:3664) não mostra nenhum recorte colorido; aguardando o recorte
// exato combinado com o autor do briefing (ver relatório da rodada).
export default function HypothesisCard({ label, question, answer }: Props) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #E4E9EC' }}>
      <div className="px-7 pt-7 pb-[26px]" style={{ background: '#EDF3F7', borderBottom: '1px solid #E4E9EC' }}>
        <div className="flex items-center gap-2.5 mb-[18px]">
          <span className="w-6 h-px shrink-0" style={{ background: '#00648C', opacity: 0.5 }} aria-hidden="true" />
          <CaseLabel variant="column">{label}</CaseLabel>
        </div>
        <span
          aria-hidden="true"
          className="font-hanken font-bold block"
          style={{ fontSize: '48px', lineHeight: 1, color: '#00648C', opacity: 0.22, marginBottom: '-6px' }}
        >
          &ldquo;
        </span>
        <p
          className="font-hanken font-semibold"
          style={{ fontSize: '24px', lineHeight: 1.28, letterSpacing: '-0.02em', color: '#0C1A22' }}
        >
          {question}
        </p>
      </div>
      <div className="px-7 pt-[22px] pb-[26px]">
        {/* R0 (Ajustes 03): margin:0 do CaseLabel matava o mb-2 quando
            aplicado direto nele (inline style sempre vence className) —
            mesma causa do bug do "BRIEFING". Corrigido envolvendo num
            wrapper com a margem, em vez de aplicar direto no CaseLabel. */}
        <div className="mb-2">
          <CaseLabel variant="muted">Direção</CaseLabel>
        </div>
        <p className="font-outfit font-light text-[15px]" style={{ lineHeight: 1.6, color: '#2C3B43' }}>
          {answer}
        </p>
      </div>
    </div>
  )
}
