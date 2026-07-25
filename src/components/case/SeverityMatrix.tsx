import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  severityMatrix,
  severityMatrixLabels,
  severityMatrixColTotals,
  severityMatrixTotal,
} from '../../data/sysmed'

const CELL = 96
const HEADER_W = 132
const HEADER_H = 56
const TOTAL_W = 72

const maxCount = Math.max(...severityMatrix.flat())

export default function SeverityMatrix() {
  const [hovered, setHovered] = useState<{ r: number; c: number } | null>(null)

  const width = HEADER_W + severityMatrixLabels.length * CELL + TOTAL_W
  const height = HEADER_H + severityMatrixLabels.length * CELL + HEADER_H

  const rowTotals = severityMatrix.map((row) => row.reduce((a, b) => a + b, 0))

  return (
    <div>
      <div className="overflow-x-auto pb-2" style={{ scrollSnapType: 'x mandatory' }}>
        <svg
          role="img"
          aria-label={`Matriz de correspondência entre severidade humana e severidade da IA, em ${severityMatrixTotal} pares. A concentração de células cai sobre a diagonal central: a IA superestima problemas cosméticos e rebaixa problemas catastróficos, esvaziando o canto inferior direito.`}
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          className="min-w-[560px]"
          style={{ scrollSnapAlign: 'start' }}
        >
          {/* Header: eixo IA */}
          <text
            x={HEADER_W + (severityMatrixLabels.length * CELL) / 2}
            y={20}
            textAnchor="middle"
            className="fill-muted font-mono"
            style={{ fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' }}
          >
            Severidade atribuída pela IA
          </text>

          {severityMatrixLabels.map((label, c) => (
            <text
              key={label}
              x={HEADER_W + c * CELL + CELL / 2}
              y={HEADER_H - 12}
              textAnchor="middle"
              className="fill-cream/70 font-mono"
              style={{ fontSize: 11 }}
            >
              {label.split(' · ')[0]}
            </text>
          ))}

          {/* Linha vertical do rótulo do eixo Y (severidade humana) */}
          <text
            x={16}
            y={HEADER_H + (severityMatrixLabels.length * CELL) / 2}
            textAnchor="middle"
            className="fill-muted font-mono"
            style={{ fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' }}
            transform={`rotate(-90 16 ${HEADER_H + (severityMatrixLabels.length * CELL) / 2})`}
          >
            Severidade humana
          </text>

          {severityMatrix.map((row, r) => (
            <g key={r}>
              <text
                x={HEADER_W - 12}
                y={HEADER_H + r * CELL + CELL / 2 + 4}
                textAnchor="end"
                className="fill-cream/70 font-mono"
                style={{ fontSize: 11 }}
              >
                {severityMatrixLabels[r].split(' · ')[0]}
              </text>

              {row.map((count, c) => {
                const isDiagonal = r === c
                const opacity = count === 0 ? 0.03 : 0.15 + 0.75 * (count / maxCount)
                const isHovered = hovered?.r === r && hovered?.c === c
                return (
                  <g
                    key={c}
                    onMouseEnter={() => setHovered({ r, c })}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: 'default' }}
                  >
                    <title>{`Humano: ${r + 1} · IA: ${c + 1} · ${count} problemas`}</title>
                    <motion.rect
                      x={HEADER_W + c * CELL + 3}
                      y={HEADER_H + r * CELL + 3}
                      width={CELL - 6}
                      height={CELL - 6}
                      rx={8}
                      fill="#D99A4E"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (r + c) * 0.04 }}
                      stroke={isDiagonal ? '#D99A4E' : isHovered ? '#F2EDE3' : 'transparent'}
                      strokeWidth={isDiagonal ? 1.5 : 2}
                      strokeDasharray={isDiagonal ? '4 3' : undefined}
                      transform={isHovered ? `translate(0, -2)` : undefined}
                    />
                    <text
                      x={HEADER_W + c * CELL + CELL / 2}
                      y={HEADER_H + r * CELL + CELL / 2 + 5}
                      textAnchor="middle"
                      className="fill-cream font-satoshi font-bold"
                      style={{ fontSize: 18 }}
                    >
                      {count}
                    </text>
                  </g>
                )
              })}

              {/* Total da linha */}
              <text
                x={HEADER_W + severityMatrixLabels.length * CELL + TOTAL_W / 2}
                y={HEADER_H + r * CELL + CELL / 2 + 5}
                textAnchor="middle"
                className="fill-muted font-mono"
                style={{ fontSize: 13 }}
              >
                {rowTotals[r]}
              </text>
            </g>
          ))}

          {/* Totais de coluna */}
          {severityMatrixColTotals.map((total, c) => (
            <text
              key={c}
              x={HEADER_W + c * CELL + CELL / 2}
              y={HEADER_H + severityMatrixLabels.length * CELL + 28}
              textAnchor="middle"
              className="fill-muted font-mono"
              style={{ fontSize: 13 }}
            >
              {total}
            </text>
          ))}

          <text
            x={HEADER_W - 12}
            y={HEADER_H + severityMatrixLabels.length * CELL + 28}
            textAnchor="end"
            className="fill-muted font-mono uppercase"
            style={{ fontSize: 10, letterSpacing: '0.06em' }}
          >
            Total
          </text>
          <text
            x={HEADER_W + severityMatrixLabels.length * CELL + TOTAL_W / 2}
            y={HEADER_H + severityMatrixLabels.length * CELL + 28}
            textAnchor="middle"
            className="fill-cream font-mono font-bold"
            style={{ fontSize: 13 }}
          >
            {severityMatrixTotal}
          </text>
        </svg>
      </div>

      {/* Leitura-chave da matriz — não é legenda de rodapé, é a interpretação central
          do achado, por isso peso de corpo de texto e alinhada como o resto da seção. */}
      <p className="block-gap max-w-[60ch] text-cream/75 text-base leading-[1.6]">
        Tudo acima da diagonal é superestimação. Tudo abaixo é rebaixamento. Note que o canto
        inferior direito — os catastróficos — esvaziou.
      </p>

      <table className="sr-only">
        <caption>Matriz de correspondência: severidade humana × severidade atribuída pela IA</caption>
        <thead>
          <tr>
            <th>Severidade humana \ IA</th>
            {severityMatrixLabels.map((l) => (
              <th key={l}>{l}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {severityMatrix.map((row, r) => (
            <tr key={r}>
              <th scope="row">{severityMatrixLabels[r]}</th>
              {row.map((count, c) => (
                <td key={c}>{count}</td>
              ))}
              <td>{rowTotals[r]}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">Total</th>
            {severityMatrixColTotals.map((t, i) => (
              <td key={i}>{t}</td>
            ))}
            <td>{severityMatrixTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
