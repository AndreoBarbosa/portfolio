import { sonaAccent } from '../../data/sona'

type Props = {
  n: string
  title: string
  body: string
}

// Item de lista numerada — S06. Confirmado via get_design_context (nó
// 577:2119): card branco border #EEF0F2 radius 12px, badge de número
// bg #162530 radius 8px 42×42, divisória vertical entre título e corpo.
// Larguras originais eram desiguais no Figma (item 01 = 1100px, demais
// 680px) — confirmado acidente de layout (briefing §8.3); aqui os 4
// itens dividem a mesma largura do container.
//
// A6.1 (rodada de ajustes): badge esticava porque a linha usava
// items-stretch — o badge herdava a altura da linha (~88px) em vez de
// manter os 42×42 fixos do Figma. Trocado para items-center + h/w
// explícitos e iguais (nunca padding assimétrico).
//
// A6.3: coluna de descrição usava minmax(140px,210px) — cada linha
// calculava a largura da coluna de forma independente (grid próprio por
// linha), o que podia desalinhar a régua de texto entre as 4 linhas.
// Trocado para 210px fixo, batendo com o valor exato do Figma nas 4
// instâncias (w-[210px] em todas).
export default function NumberedListItem({ n, title, body }: Props) {
  return (
    <div
      className="flex items-center gap-4 rounded-xl px-4 py-2 bg-white"
      style={{ border: `1px solid ${sonaAccent.cardBorder}` }}
    >
      <span
        className="flex items-center justify-center w-[42px] h-[42px] shrink-0 rounded-lg font-hanken font-semibold text-2xl leading-[1.1]"
        style={{ background: sonaAccent.panelBg, color: '#FCFDFD' }}
      >
        {n}
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-[210px_1px_1fr] gap-3 sm:gap-4 items-center py-3 flex-1 min-w-0">
        <p className="font-outfit font-semibold text-base" style={{ color: 'var(--text-strong)' }}>
          {title}
        </p>
        <span className="hidden sm:block self-stretch w-px" style={{ background: sonaAccent.cardBorder }} aria-hidden="true" />
        <p className="font-outfit text-base leading-[1.5]" style={{ color: sonaAccent.textSecondary }}>
          {body}
        </p>
      </div>
    </div>
  )
}
