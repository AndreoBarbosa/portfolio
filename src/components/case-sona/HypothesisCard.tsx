import { Lightbulb } from 'lucide-react'
import { caseLabelStyle } from './CaseLabel'

type Props = {
  label: string
  question: string
  answer: string
}

// Card "Hipótese de design", destaque principal do case (Figma 549:1336,
// vidro fumê; Direção A escolhida em 28 set). O rótulo fica fora do cartão,
// na mesma linha do "O que a pesquisa revelou:" ao lado, e o cartão estica
// até a base da lista (h-full + flex-1; a grade da seção usa
// lg:items-stretch). Texto sempre petróleo sobre o vidro: o rótulo
// "Direção" deixou o cinza #6E7F86, que não passava de 3:1 aqui.
export default function HypothesisCard({ label, question, answer }: Props) {
  return (
    <div className="flex h-full flex-col">
      <p className="mb-6 font-outfit text-base font-semibold" style={{ color: '#3B3F46' }}>
        {label}
      </p>
      <div className="vidro-fume flex flex-1 flex-col gap-6 rounded-[20px] p-8">
        <span className="vidro-fume-chip" aria-hidden="true">
          <Lightbulb size={24} strokeWidth={1.5} color="#0C1A22" />
        </span>
        <div className="flex flex-col gap-5">
          <p className="font-hanken text-2xl font-semibold leading-[30px] tracking-[-0.01em]" style={{ color: '#0C1A22' }}>
            {question}
          </p>
          <span className="h-px w-full" style={{ background: 'rgba(12, 26, 34, 0.14)' }} aria-hidden="true" />
          <div className="flex flex-col gap-2">
            <span style={{ ...caseLabelStyle('muted'), color: 'rgba(12, 26, 34, 0.72)' }}>Direção</span>
            <p className="font-outfit text-base leading-6" style={{ color: 'rgba(12, 26, 34, 0.8)' }}>
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
