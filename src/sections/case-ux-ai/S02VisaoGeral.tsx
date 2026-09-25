import { useRef, type KeyboardEvent, type PointerEvent } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import Container from '../../components/case-ux-ai/layout/Container'
import { visaoGeral } from '../../data/caseUxAi'
import { useCaseMotion } from '../../motion/CaseUxAiMotionProvider'
import { CAPACIDADES_PLAYER, EASE } from '../../motion/caseUxAiTokens'
import useCapacidadesPlayer from './s02/useCapacidadesPlayer'

/** Deslizar no toque (brief §9): mais de 48px e mais horizontal que vertical. */
const SWIPE_MIN = 48

/**
 * Estado inicial de slides e vídeos: só o 01 visível. Depois do mount, quem
 * mexe em opacidade, escala e visibilidade é a coreografia do player (§19),
 * direto no elemento — por isso a classe depende só do índice, nunca do
 * ativo, e o React não sobrescreve o que o animate escreveu.
 */
const inicial = (i: number) => (i === 0 ? '' : 'invisible opacity-0')

/** Parte a linha do título nos trechos em destaque (gradiente do hero, .texto-gradiente). */
function renderTitleLine(line: string) {
  const terms: readonly string[] = visaoGeral.title.highlight
  // Termos são palavras literais do conteúdo, sem metacaractere de regex.
  return line.split(new RegExp(`(${terms.join('|')})`)).map((part, i) =>
    terms.includes(part) ? (
      <span key={i} className="texto-gradiente">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

/** Ícone de pausa do botão (brief §10): duas barras 4×14, raio 1, 4 de espaço, em 20px. */
function IconePausa() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <rect x="4" y="3" width="4" height="14" rx="1" fill="currentColor" />
      <rect x="12" y="3" width="4" height="14" rx="1" fill="currentColor" />
    </svg>
  )
}

/** Ícone de play do botão (brief §10): triângulo em 20px. */
function IconePlay() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M6 3.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 6 3.5Z" fill="currentColor" />
    </svg>
  )
}

/** Enchimento da cápsula: degradê fixo em 48px revelado por clip-path, nunca scaleX (brief §10). */
function Enchimento({ progresso }: { progresso: MotionValue<number> }) {
  const clipPath = useTransform(progresso, (p) => `inset(0 ${(1 - p) * 100}% 0 0 round 4px)`)
  return (
    <motion.span
      className="absolute inset-y-0 left-0 block w-12 bg-[linear-gradient(90deg,var(--gradiente-destaque-de),var(--gradiente-destaque-para))]"
      style={{ clipPath }}
    />
  )
}

/**
 * 02 · Visão Geral (v3, explorador com vídeo) — docs/BRIEF-S02-VISAO-GERAL.md,
 * frames 1022:1356 / 1022:1475 / 1022:1584 / 1022:1693.
 * Etapa 2: player (s02/useCapacidadesPlayer), paginação e teclado, com a
 * coreografia de troca da §19. Sem entrada e sem responsivo ainda.
 *
 * Painel (brief §4): grade `1fr 432px`, gap 64, padding só na horizontal
 * (48), altura 272. O palco usa a altura toda do painel: encosta no topo e
 * na base. Os quatro slides de texto e os quatro vídeos ficam empilhados na
 * mesma célula (grid-area 1/1); inativo é `opacity: 0` + `visibility:
 * hidden`, nunca `display: none`, para a altura nunca mudar.
 *
 * Vídeo (brief §5): o quadro inteiro sempre aparece. `width`/`height` do
 * arquivo reservam a proporção; no CSS, `auto` limitado por max-width e
 * max-height 100% do palco — a caixa do elemento é exatamente o quadro
 * desenhado, sem faixa vazia, e a máscara de borda (`.palco-video`) cai na
 * margem de fundo do arquivo. Fundo dos arquivos = --superficie-elevada.
 */
export default function S02VisaoGeral() {
  const { eyebrow, title, body, explorador } = visaoGeral
  const { capacidades, base, rotulo, controles } = explorador
  const { reduced } = useCaseMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const swipe = useRef<{ x: number; y: number } | null>(null)

  // Etapa 3 liga isto ao fim da entrada da seção. Por enquanto não há entrada.
  const player = useCapacidadesPlayer({ total: capacidades.length, sectionRef, reduced, entradaConcluida: true })
  const { ativo, tocando, vistos } = player

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = capacidades.length - 1
    // Sem volta no teclado: na ponta, a seta não faz nada (brief §11).
    const alvo = (
      { ArrowRight: Math.min(i + 1, last), ArrowLeft: Math.max(i - 1, 0), Home: 0, End: last } as Record<string, number>
    )[e.key]
    if (alvo === undefined) return
    e.preventDefault()
    if (alvo !== ativo) player.irParaTeclado(alvo)
    tabs.current[alvo]?.focus()
  }

  const onPainelPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    swipe.current = e.pointerType === 'touch' ? { x: e.clientX, y: e.clientY } : null
  }
  const onPainelPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const inicio = swipe.current
    swipe.current = null
    if (!inicio || !window.matchMedia('(pointer: coarse)').matches) return
    const dx = e.clientX - inicio.x
    const dy = e.clientY - inicio.y
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy)) return
    // Esquerda vai para a próxima, direita volta, com ciclo nas pontas.
    const n = capacidades.length
    player.irParaPonteiro((ativo + (dx < 0 ? 1 : -1) + n) % n)
  }

  return (
    <section
      ref={sectionRef}
      id="visao-geral"
      aria-labelledby="visao-geral-heading"
      className="bg-[var(--fundo-pagina)] py-12 md:py-16"
    >
      <Container>
        <hr className="h-px border-0 bg-[var(--superficie-hover)]" />

        <p className="mt-8 text-[12px] font-semibold leading-[1.5] tracking-[0.02em] text-[var(--acao-link)]">
          {eyebrow}
        </p>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-2 lg:gap-16 case-xl:grid-cols-[608px_528px]">
          <h2
            id="visao-geral-heading"
            className="f-display text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--texto-principal)] md:text-[32px]"
          >
            {title.lines.map((line, i) => (
              <span key={i} className="block">
                {renderTitleLine(line)}
              </span>
            ))}
          </h2>
          <p className="text-[16px] leading-[1.5] text-[var(--texto-apoio)]">{body}</p>
        </div>

        <div role="group" aria-roledescription="carrossel" aria-label={explorador.ariaLabel} className="mt-16">
          {/* Painel: borda de 1px por dentro (inset), sem backdrop-filter. pan-y: o deslizar horizontal é nosso. */}
          <div
            className="grid h-[272px] touch-pan-y grid-cols-[1fr_432px] grid-rows-1 items-center gap-x-16 overflow-hidden rounded-[24px] bg-[var(--superficie-elevada)] px-12 shadow-[inset_0_0_0_1px_var(--borda-padrao)]"
            onPointerDown={onPainelPointerDown}
            onPointerUp={onPainelPointerUp}
            onPointerCancel={() => (swipe.current = null)}
          >
            <div className="grid py-12" aria-live={tocando ? 'off' : 'polite'}>
              {capacidades.map((c, i) => (
                <div
                  key={c.n}
                  ref={player.slideRef(i)}
                  role="tabpanel"
                  id={`cap-${c.n}`}
                  aria-labelledby={`tab-${c.n}`}
                  className={`flex flex-col gap-4 [grid-area:1/1] ${inicial(i)}`}
                >
                  <p className="f-mono text-[12px] leading-[16px] tracking-[1.5px] text-[var(--acao-hover)]">{rotulo}</p>
                  <h3 className="text-[24px] font-semibold leading-[32px] text-[var(--texto-principal)]">
                    {c.n}. {c.nome}
                  </h3>
                  <p className="text-[16px] leading-[24px] text-[var(--texto-apoio)]">{c.descricao}</p>
                </div>
              ))}
            </div>

            {/* grid-rows-1/grid-cols-1 (minmax(0, 1fr)): sem isso a linha e a coluna
                do palco são `auto`, o max-height/max-width 100% do vídeo não tem
                referência e o quadro passa do painel, cortando o objeto. */}
            <div className="grid h-full grid-cols-1 grid-rows-1 place-items-center" aria-hidden="true">
              {capacidades.map((c, i) => {
                const src = `${base}${c.video.slug}`
                return (
                  <video
                    key={c.n}
                    ref={player.videoRef(i)}
                    className={`palco-video block h-auto max-h-full w-auto max-w-full bg-transparent [grid-area:1/1] ${inicial(i)}`}
                    muted
                    playsInline
                    disablePictureInPicture
                    disableRemotePlayback
                    preload="none"
                    tabIndex={-1}
                    width={c.video.largura}
                    height={c.video.altura}
                    poster={`${src}-poster.webp`}
                    onEnded={() => player.onEnded(i)}
                  >
                    <source src={`${src}.webm`} type="video/webm; codecs=vp9" />
                    <source src={`${src}.mp4`} type='video/mp4; codecs="avc1.64001F"' />
                  </video>
                )
              })}
            </div>
          </div>

          {/* Navegação (brief §10): pílula 56 de altura, 24 da borda à primeira peça, 16 entre peças; botão 56 a 16 da pílula. */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div
              role="tablist"
              aria-label="Capacidades"
              className="flex h-14 items-center gap-4 rounded-[28px] bg-[var(--superficie-elevada)] px-6 [--hit:24px] [@media(pointer:coarse)]:[--hit:44px]"
              onFocus={(e) => player.onFocoPaginacao(e.target)}
            >
              {capacidades.map((c, i) => {
                const isAtivo = i === ativo
                const visto = vistos.has(i)
                return (
                  <button
                    key={c.n}
                    ref={(el) => {
                      tabs.current[i] = el
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${c.n}`}
                    aria-controls={`cap-${c.n}`}
                    aria-selected={isAtivo}
                    aria-label={`${c.n}. ${c.nome}`}
                    tabIndex={isAtivo ? 0 : -1}
                    // Área de clique de --hit (24 fino, 44 grosso) por pseudo-elemento, centrada na peça visível.
                    // O anel de foco vai no <span> visível (group-focus-visible), não no botão.
                    className="group relative flex items-center focus-visible:!outline-none before:absolute before:left-1/2 before:top-1/2 before:h-[var(--hit)] before:w-[max(var(--hit),100%)] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']"
                    onClick={(e) => {
                      // detail 0 = clique sintetizado por Enter/Espaço; teclado não liga o player.
                      if (e.detail !== 0) player.irParaPonteiro(i)
                    }}
                    onKeyDown={(e) => onTabKeyDown(e, i)}
                  >
                    <motion.span
                      layout
                      transition={{ layout: { duration: reduced ? 0 : CAPACIDADES_PLAYER.transicao.capsula, ease: EASE.state } }}
                      style={{ borderRadius: 4 }}
                      className={`relative block h-2 overflow-hidden outline-offset-[3px] group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-[var(--acao-foco)] ${
                        isAtivo
                          ? 'w-12 bg-[var(--controle-inativo)]'
                          : visto
                            ? 'w-2 bg-[var(--acao-link)] [@media(hover:hover)]:group-hover:bg-[var(--acao-hover)]'
                            : 'w-2 bg-[var(--controle-inativo)] [@media(hover:hover)]:group-hover:bg-[var(--texto-metadado)]'
                      }`}
                    >
                      {isAtivo && <Enchimento progresso={player.progresso} />}
                    </motion.span>
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              aria-label={tocando ? controles.pausar : controles.reproduzir}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--superficie-elevada)] text-[var(--texto-principal)] transition-colors duration-[var(--d-hover)] ease-[var(--ease-micro)] [@media(hover:hover)]:hover:bg-[var(--superficie-hover)]"
              onClick={player.alternar}
            >
              {tocando ? <IconePausa /> : <IconePlay />}
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
