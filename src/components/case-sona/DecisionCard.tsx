import type { LucideIcon } from 'lucide-react'
import { sonaAccent } from '../../data/sona'

type Props = {
  icon: LucideIcon
  title: string
  problem: string
  decision: string
  impact: string
  image: string
  imageWidth: number
  imageHeight: number
}

// Card Problema/Decisão/Impacto + tela — S11. Confirmado via
// get_design_context (nó 577:2308): bg branco, borda var(--surface-1)
// (#EAE9E7 — mesmo tom exato de um token real da Home), radius 16px,
// ícone em caixa clara 28px, tela ao lado do texto (row), altura 345px
// declarada no Figma nos 3 cards.
//
// R2.4/R3 (Ajustes 03): o Ajustes 02 tinha restruturado isso em coluna
// (texto em cima, imagem embaixo via margin-top:auto) pra forçar altura
// igual — revertido. Estrutura volta a ser row, como o Figma. Altura
// igual agora vem só do grid (items-stretch no container + h-full aqui)
// + items-center pra centralizar o conteúdo verticalmente — a diferença
// vira espaço em branco simétrico acima/abaixo, sem restruturar nada.
// Labels Problema/Decisão/Impacto não são mono (fora da allowlist do R1).
export default function DecisionCard({ icon: Icon, title, problem, decision, impact, image, imageWidth, imageHeight }: Props) {
  return (
    <div
      className="bg-white rounded-2xl p-6 h-full flex items-center gap-3"
      style={{ border: '1px solid var(--surface-1)' }}
    >
      <div className="flex flex-col gap-4 flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0" style={{ background: sonaAccent.hypothesisBg }} aria-hidden="true">
            <Icon size={15} style={{ color: sonaAccent.blue }} strokeWidth={2} />
          </span>
          <p className="font-outfit font-semibold text-base flex-1" style={{ color: 'var(--text-strong)' }}>
            {title}
          </p>
        </div>
        {[
          { label: 'Problema', body: problem },
          { label: 'Decisão', body: decision },
          { label: 'Impacto', body: impact },
        ].map((f) => (
          <div key={f.label} className="flex flex-col gap-1">
            <p className="font-outfit font-semibold text-xs" style={{ color: 'var(--text-strong)' }}>
              {f.label}
            </p>
            <p className="font-outfit text-xs leading-[1.5]" style={{ color: sonaAccent.textSecondary }}>
              {f.body}
            </p>
          </div>
        ))}
      </div>
      <img
        src={image}
        alt=""
        width={imageWidth}
        height={imageHeight}
        loading="lazy"
        className="w-[100px] sm:w-[120px] h-auto rounded-lg shrink-0 object-contain"
      />
    </div>
  )
}
