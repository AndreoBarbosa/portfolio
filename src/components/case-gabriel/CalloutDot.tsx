type Props = {
  children: string
}

// Callout com marcador — seção 08 (nó 648:993 e irmãos). O marcador é
// uma cápsula 8×16 decorativa (nó "dot" no Figma); reproduzida como
// forma sólida em vez de baixar o SVG — é puramente geométrica (mesma
// convenção de marcador já usada no site, ex. eyebrow do hero da V1),
// sem detalhe visual que se perderia na simplificação.
export default function CalloutDot({ children }: Props) {
  return (
    <div className="flex gap-3 items-start w-full">
      <span
        className="shrink-0 rounded-full mt-0.5"
        style={{ width: 8, height: 16, background: 'var(--secundaria-500)' }}
        aria-hidden="true"
      />
      <p className="flex-1 font-outfit font-semibold text-base leading-[1.5]" style={{ color: 'var(--text-strong)' }}>
        {children}
      </p>
    </div>
  )
}
