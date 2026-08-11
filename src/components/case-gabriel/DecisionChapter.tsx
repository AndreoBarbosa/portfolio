import LiquidReveal from '../liquid/LiquidReveal'
import NoteBox from './NoteBox'
import { gabrielAccent } from '../../data/gabriel'

type BodyBlock = { label?: string; text: string }

type Props = {
  eyebrow: string
  title: string
  subtitle: string
  body: BodyBlock[]
  image: string
  imageAlt: string
  /** Decisão 02 inverte a ordem: imagem à esquerda, texto à direita
      (confirmado via get_design_context, nó 691:1077 — não é o mesmo
      layout espelhado por CSS, a ordem dos nós é literalmente invertida). */
  reverse?: boolean
  /** Decisão 02 tem uma régua de topo separando do capítulo anterior;
      Decisão 01 não tem (é o primeiro capítulo). */
  bordered?: boolean
  note?: string
  /** 640×440 na Decisão 01; 640×338 com object-fit:cover na Decisão 02
      (crop real confirmado via MCP — a imagem passa das bordas do frame,
      não é só um hint de CSS). */
  imageAspect: string
  imageWidth: number
  imageHeight: number
}

export default function DecisionChapter({
  eyebrow, title, subtitle, body, image, imageAlt, reverse = false, bordered = false, note, imageAspect, imageWidth, imageHeight,
}: Props) {
  const textBlock = (
    <LiquidReveal className={`flex flex-col gap-5 w-full lg:w-[496px] shrink-0 ${reverse ? 'lg:order-2' : ''}`}>
      <h3
        className="font-hanken font-semibold leading-[1.15] text-[28px]"
        style={{ color: 'var(--text-strong)', letterSpacing: '-0.56px' }}
      >
        {title}
      </h3>
      <p className="font-outfit text-lg leading-[1.5]" style={{ color: 'var(--secundaria-500)' }}>
        {subtitle}
      </p>
      <div className="flex flex-col gap-5">
        {body.map((b) => (
          <div key={b.text} className="flex flex-col gap-1.5">
            {b.label && (
              <p className="font-outfit font-semibold text-xs uppercase" style={{ color: 'var(--text-strong)', letterSpacing: '0.24px' }}>
                {b.label}
              </p>
            )}
            <p className="font-outfit text-base leading-[1.5]" style={{ color: gabrielAccent.textMuted }}>
              {b.text}
            </p>
          </div>
        ))}
      </div>
    </LiquidReveal>
  )

  const imageBlock = (
    <LiquidReveal delay={0.1} className={`w-full lg:w-[640px] shrink-0 ${reverse ? 'lg:order-1' : ''}`}>
      <div
        className="rounded-[20px] overflow-hidden border"
        style={{ borderColor: gabrielAccent.cardBorder, boxShadow: '0px 24px 60px 0px rgba(12,26,34,0.1)', aspectRatio: imageAspect }}
      >
        <img src={image} alt={imageAlt} width={imageWidth} height={imageHeight} loading="lazy" className="w-full h-full object-cover" />
      </div>
    </LiquidReveal>
  )

  return (
    <div className={`flex flex-col gap-6 w-full pt-2 pb-12 ${bordered ? 'border-t pt-12' : ''}`} style={{ borderColor: gabrielAccent.divider }}>
      <LiquidReveal>
        <span className="font-outfit font-semibold text-xs uppercase" style={{ color: 'var(--secundaria-500)', letterSpacing: '0.24px' }}>
          {eyebrow}
        </span>
      </LiquidReveal>
      {/* Ordem no DOM é sempre texto → imagem (mobile empilha texto
          primeiro, regra do briefing). No desktop, quando reverse=true
          (Decisão 02), lg:order-* inverte visualmente sem mexer no DOM. */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
        {textBlock}
        {imageBlock}
      </div>
      {note && (
        <LiquidReveal delay={0.15}>
          <NoteBox variant="blue" textColor={gabrielAccent.noteBlue} fontSize="15px" className="inline-block w-auto px-5 py-4">
            {note}
          </NoteBox>
        </LiquidReveal>
      )}
    </div>
  )
}
