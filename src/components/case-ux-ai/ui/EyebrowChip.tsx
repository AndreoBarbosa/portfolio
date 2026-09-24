type Props = {
  children: string
}

/**
 * Chip mono do hero — Figma nó 802:1036 (BPffDtLmobPgTMqljJPBoj), conferido
 * via get_design_context: cor --acao-hover (não --texto-apoio), raio 16
 * (--r-md, não --r-sm), padding 10px.
 */
export default function EyebrowChip({ children }: Props) {
  return (
    <span className="f-mono inline-block text-[12px] tracking-[0.03em] text-[var(--acao-hover)] border border-[var(--borda-padrao)] rounded-[var(--r-md)] p-[10px]">
      {children}
    </span>
  )
}
