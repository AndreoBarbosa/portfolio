import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

// Card escuro "vidro fumê" — substitui o retângulo escuro sólido antigo.
// Extraído do Figma (case Gabriel, seção 04 · Briefing, nó 659:997):
//   - rounded-[24px], padding 40px (24px no mobile, ver B6/responsivo),
//     gradiente linear 135deg #21323B → #122028, borda
//     1px rgba(255,255,255,0.14), sombra 0 24px 60px rgba(12,26,34,0.18).
//   - Brilho óptico: elipse 900×520 ancorada em left:520/top:-240 de um
//     card de referência 1200×284 (nó 659:1019) — SVG real extraído via
//     MCP: radial branco 16%→0% de opacidade, centrado na própria
//     elipse. Convertido para % do card (43.333% / -84.507% / 75% /
//     183.099%) pra escalar com o container em vez de travar px; cortado
//     pelo overflow:hidden do card.
//
// Só a casca visual mora aqui — layout interno (grid de itens, colunas,
// divisórias) é responsabilidade de quem consome o componente. Isso é
// proposital: o Sona tem dois formatos internos diferentes sobre o
// mesmo fundo (Briefing = 5 colunas soltas, Princípios = 4 colunas com
// borda e divisória) e vai reaproveitar esta casca em commit separado,
// sem duplicar a receita do gradiente/brilho.
export default function DarkGradientCard({ children, className = '' }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] p-6 md:p-10 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #21323B 0%, #122028 100%)',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 24px 60px rgba(12,26,34,0.18)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: '43.333%',
          top: '-84.507%',
          width: '75%',
          height: '183.099%',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 100%)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
