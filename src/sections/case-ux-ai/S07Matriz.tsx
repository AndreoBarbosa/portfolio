import { motion, type Variants } from 'framer-motion'
import Container from '../../components/case-ux-ai/layout/Container'
import { matriz, severityMatrix, SEVERITY_LABEL, type SeverityLevel } from '../../data/caseUxAi'
import { useCaseMotion } from '../../motion/CaseUxAiMotionProvider'
import { atBeat, enterFade, enterFadeUp, reducedFade } from '../../motion/caseUxAiRecipes'
import { DUR, EASE, STAGGER, VIEWPORT } from '../../motion/caseUxAiTokens'
import './secoes-finais.css'

const NIVEIS: SeverityLevel[] = [1, 2, 3, 4]
const MAX = Math.max(...severityMatrix.flat())
const totalLinha = severityMatrix.map((l) => l.reduce((a, b) => a + b, 0))
const totalColuna = NIVEIS.map((_, c) => severityMatrix.reduce((a, l) => a + l[c], 0))
const MAX_MARGINAL = Math.max(...totalLinha, ...totalColuna)

/** Intensidade da célula: uma cor só (acao-link), opacidade pela contagem. */
const fundo = (v: number) => (v === 0 ? 'transparent' : `rgba(74, 155, 245, ${(0.08 + 0.62 * (v / MAX)).toFixed(3)})`)

/** Glifo 4×4 que marca a região (acima ou abaixo da diagonal) de cada percentual. */
function GlifoRegiao({ regiao }: { regiao: 'acima' | 'abaixo' }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" focusable="false" className="shrink-0">
      {NIVEIS.map((_, r) =>
        NIVEIS.map((__, c) => {
          const ativa = regiao === 'acima' ? c > r : c < r
          const diag = c === r
          return (
            <rect
              key={`${r}${c}`}
              x={c * 8 + 1}
              y={r * 8 + 1}
              width={6}
              height={6}
              rx={1.5}
              style={{
                fill: ativa ? 'var(--acao-link)' : diag ? 'transparent' : 'var(--borda-padrao)',
                stroke: diag ? 'var(--texto-principal)' : 'none',
                strokeWidth: 1,
              }}
            />
          )
        }),
      )}
    </svg>
  )
}

/**
 * 07 · A matriz de severidade — docs/BRIEF-S06-S15.md §S07. Figma 800:1049.
 *
 * O Figma punha a matriz num cartão, dividindo a tela com um vidro grande. O
 * título afirma uma distribuição ("convergia para o meio da escala"), e a
 * matriz sozinha não mostra isso. Aqui:
 *  - sem cartão: a matriz é a figura da seção, em escala maior;
 *  - intensidade da célula pela contagem (uma cor só);
 *  - marginais nas bordas: à direita, como os especialistas distribuíram cada
 *    nível (neutro, o humano); embaixo, como a IA distribuiu (azul, a máquina).
 *    Os totais são somas das próprias células, nenhum número novo;
 *  - a linha catastrófica em destaque, com a nota do Figma.
 */
export default function S07Matriz() {
  const { eyebrow, titulo, texto, eixoIa, eixoHumano, rotulosMarginais, regioes, catastrofico, fecho } = matriz
  const { reduced } = useCaseMotion()
  const v = (variants: Variants, beat: number) => (reduced ? reducedFade : atBeat(variants, beat))

  const celula = (i: number): Variants =>
    reduced
      ? reducedFade
      : {
          hidden: { opacity: 0, scale: 0.92 },
          visible: { opacity: 1, scale: 1, transition: { duration: DUR.enter, ease: EASE.enter, delay: 0.2 + i * STAGGER.cell } },
        }
  const anel = (delay: number): Variants =>
    reduced
      ? reducedFade
      : { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: DUR.state, ease: EASE.state, delay } } }
  const barra = (eixo: 'x' | 'y', delay: number): Variants =>
    reduced
      ? reducedFade
      : {
          hidden: eixo === 'x' ? { scaleX: 0 } : { scaleY: 0 },
          visible: {
            ...(eixo === 'x' ? { scaleX: 1 } : { scaleY: 1 }),
            transition: { duration: DUR.data, ease: EASE.enter, delay },
          },
        }
  const DIAGONAL = 0.2 + 16 * STAGGER.cell + 0.1
  const MARGINAIS = DIAGONAL + 0.2
  const CATASTROFICO = MARGINAIS + 0.6

  return (
    <section id="matriz" aria-labelledby="matriz-titulo" className="relative bg-[var(--fundo-pagina)] py-[var(--ritmo-secao)]">
      <Container>
        <div className="grid gap-y-[var(--ritmo-cabeca)] lg:grid-cols-[minmax(0,400fr)_minmax(0,712fr)] lg:gap-x-16 xl:gap-x-[88px]">
          {/* Texto e os dois percentuais das regiões */}
          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <motion.p
              className="text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--acao-link)]"
              variants={v(enterFade(0.4), 0)}
            >
              {eyebrow}
            </motion.p>
            <motion.h2
              id="matriz-titulo"
              className="f-display mt-4 text-[32px] font-bold leading-[1.1] tracking-[-0.01em] text-[var(--texto-principal)] md:text-[clamp(32px,2.78vw,40px)]"
              variants={v(enterFadeUp, 0.12)}
            >
              {titulo}
            </motion.h2>
            <motion.p className="mt-6 text-[16px] leading-[1.5] text-[var(--texto-apoio)]" variants={v(enterFadeUp, 0.24)}>
              {texto}
            </motion.p>

            <dl className="mt-10 flex flex-col gap-6 border-t border-[var(--borda-padrao)] pt-8">
              {regioes.map((r, k) => (
                <motion.div key={r.valor} className="flex items-start gap-4" variants={v(enterFadeUp, 0.36 + k * STAGGER.item)}>
                  <span className="mt-1.5">
                    <GlifoRegiao regiao={r.regiao} />
                  </span>
                  <div>
                    <dt className="f-display text-[40px] font-semibold leading-[44px] tracking-[-0.02em] text-[var(--texto-principal)]">
                      {r.valor}
                    </dt>
                    <dd className="text-[14px] leading-[20px] text-[var(--texto-apoio)]">
                      {r.texto}, {r.regiao === 'acima' ? 'acima da diagonal' : 'abaixo da diagonal'}
                    </dd>
                  </div>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          {/* A figura */}
          <motion.figure className="m-0 min-w-0" initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            {/* Tabela real para leitor de tela; a grade visual é aria-hidden. O
                sr-only fica num div: tabela não encolhe abaixo do conteúdo. */}
            <div className="sr-only">
            <table>
              <caption>
                Severidade atribuída pelos especialistas (linhas) e pela IA (colunas), em número de problemas.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Especialistas</th>
                  {NIVEIS.map((n) => (
                    <th key={n} scope="col">
                      IA: {n} · {SEVERITY_LABEL[n]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {severityMatrix.map((linha, r) => (
                  <tr key={r}>
                    <th scope="row">
                      {NIVEIS[r]} · {SEVERITY_LABEL[NIVEIS[r]]}
                    </th>
                    {linha.map((n, c) => (
                      <td key={c}>{n}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            <div aria-hidden="true" className="s07-grade">
              {/* Eixo da IA */}
              <motion.p className="s07-eixo-ia" variants={v(enterFade(0.4), 0.1)}>
                {eixoIa} →
              </motion.p>
              <motion.p className="s07-eixo-humano" variants={v(enterFade(0.4), 0.1)}>
                {eixoHumano} ↓
              </motion.p>
              <motion.p className="s07-marg-titulo s07-marg-titulo--humano" variants={v(enterFade(0.4), MARGINAIS)}>
                {rotulosMarginais.humano}
              </motion.p>

              {/* Cabeçalho das colunas */}
              {NIVEIS.map((n, c) => (
                <motion.p key={`c${n}`} className="s07-cab" style={{ gridColumn: c + 2, gridRow: 2 }} variants={v(enterFade(0.4), 0.1)}>
                  <span className="s07-cab-n">{n}</span>
                  <span className="s07-cab-nome">{SEVERITY_LABEL[n]}</span>
                </motion.p>
              ))}

              {severityMatrix.map((linha, r) => (
                <div key={r} className="contents">
                  <motion.p
                    className={`s07-linha ${r === 3 ? 's07-linha--destaque' : ''}`}
                    style={{ gridColumn: 1, gridRow: r + 3 }}
                    variants={v(enterFade(0.4), r === 3 ? CATASTROFICO : 0.1)}
                  >
                    <span className="s07-cab-n">{NIVEIS[r]}</span>
                    <span className="s07-cab-nome">{SEVERITY_LABEL[NIVEIS[r]]}</span>
                  </motion.p>
                  {linha.map((n, c) => (
                    <motion.div
                      key={c}
                      className={`s07-celula ${n === 0 ? 's07-celula--zero' : ''}`}
                      style={{ gridColumn: c + 2, gridRow: r + 3, background: fundo(n) }}
                      variants={celula(r * 4 + c)}
                    >
                      {r === c && <motion.span className="s07-diagonal" variants={anel(DIAGONAL + r * STAGGER.line)} />}
                      {n}
                    </motion.div>
                  ))}
                  {/* Marginal à direita: especialistas, neutro. */}
                  <div className="s07-marg-x" style={{ gridColumn: 6, gridRow: r + 3 }}>
                    <motion.span
                      className="s07-barra s07-barra--humano origin-left"
                      style={{ width: `calc(var(--s07-marg) * ${(totalLinha[r] / MAX_MARGINAL).toFixed(3)})` }}
                      variants={barra('x', MARGINAIS + r * STAGGER.item)}
                    />
                    <motion.span className="s07-marg-n" variants={v(enterFade(0.4), MARGINAIS + 0.4)}>
                      {totalLinha[r]}
                    </motion.span>
                  </div>
                </div>
              ))}

              {/* Anel da linha catastrófica */}
              <motion.span className="s07-anel-linha" style={{ gridRow: 6 }} variants={anel(CATASTROFICO)} />

              {/* Marginal embaixo: IA, azul. */}
              {NIVEIS.map((_, c) => (
                <div key={`m${c}`} className="s07-marg-y" style={{ gridColumn: c + 2, gridRow: 7 }}>
                  <motion.span
                    className="s07-barra s07-barra--ia origin-top"
                    style={{ height: `calc(var(--s07-marg-y) * ${(totalColuna[c] / MAX_MARGINAL).toFixed(3)})` }}
                    variants={barra('y', MARGINAIS + c * STAGGER.item)}
                  />
                  <motion.span className="s07-marg-n" variants={v(enterFade(0.4), MARGINAIS + 0.4)}>
                    {totalColuna[c]}
                  </motion.span>
                </div>
              ))}
              <motion.p className="s07-marg-titulo s07-marg-titulo--ia" variants={v(enterFade(0.4), MARGINAIS)}>
                {rotulosMarginais.ia}
              </motion.p>
            </div>

            <p aria-hidden="true" className="mt-4 text-[12px] leading-[1.5] text-[var(--texto-metadado)] md:hidden">
              {NIVEIS.map((n) => `${n} ${SEVERITY_LABEL[n]}`).join(' · ')}
            </p>
            <motion.figcaption
              className="mt-8 max-w-[560px] text-[16px] leading-[1.5] text-[var(--texto-apoio)]"
              variants={v(enterFadeUp, CATASTROFICO + 0.1)}
            >
              <span className="text-[var(--acao-hover)]">4 · {SEVERITY_LABEL[4]}.</span> {catastrofico}
            </motion.figcaption>
            {/* Conclusão do dado, dentro da figura: a frase grande seguinte é da S08. */}
            <motion.p
              className="mt-6 max-w-[640px] text-[20px] font-semibold leading-[1.4] text-[var(--texto-principal)] md:text-[24px]"
              variants={v(enterFadeUp, CATASTROFICO + 0.3)}
            >
              {fecho.linhas.join(' ')}
            </motion.p>
          </motion.figure>
        </div>

      </Container>
    </section>
  )
}
