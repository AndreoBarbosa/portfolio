import { motion, type Variants } from 'framer-motion'
import type { Stat } from '../../../data/caseUxAi'
import { useCaseMotion } from '../../../motion/CaseUxAiMotionProvider'
import { DUR, EASE, HERO_DUR } from '../../../motion/caseUxAiTokens'
import useCountUp from './useCountUp'

function formatValue(value: number, stat: Stat) {
  const formatted = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: stat.decimals ?? 0,
    maximumFractionDigits: stat.decimals ?? 0,
  }).format(value)
  return `${formatted}${stat.suffix ?? ''}`
}

type Props = {
  stat: Stat
  /** Dispara a contagem de 0 até `stat.value` (decisão: sempre começa em zero). */
  active?: boolean
  /**
   * S01: hover/foco nas colunas IA/Humanos realça 68% e 48% fazendo os
   * outros dois (89, 11) recuarem — não o inverso. A escala de texto só tem
   * 4 degraus e o número já nasce no topo (--texto-principal), então não há
   * um 5º degrau para "subir": o realce é relativo, por recuo dos vizinhos,
   * nunca por troca de matiz (regra transversal §3.4).
   */
  emphasis?: 'up' | 'down'
  /** Receita de entrada; o estado vem do container (staggerContainer). */
  variants?: Variants
  /** Segundos até este item entrar na cascata; a contagem começa junto. */
  delay?: number
}

/**
 * Figma nó 802:1048/1052/1056/1060 (BPffDtLmobPgTMqljJPBoj) — só a coluna
 * (número + legenda). Os divisores verticais (802:1051/1055/1059) são
 * irmãos dela na linha, não filhos: quem os desenha é o container em
 * S01Hero.tsx, não este componente (ver docs/BRIEF-S01-HERO.md §3).
 */
export default function StatItem({ stat, active = true, emphasis = 'up', variants, delay = 0 }: Props) {
  const { reduced } = useCaseMotion()
  const value = useCountUp(stat.value, active, HERO_DUR.countMs, stat.decimals ?? 0, delay)

  return (
    <motion.div variants={variants} className="flex flex-1 flex-col items-center gap-3 px-6 text-center">
      <p
        className="f-display font-semibold text-[40px] md:text-[48px] case-xl:text-[56px] leading-[1.1] tracking-[-0.03em] tabular-nums"
        style={{
          color: emphasis === 'down' ? 'var(--texto-apoio)' : 'var(--texto-principal)',
          // Reduced motion: troca de estado instantânea (contrato §6).
          transition: reduced ? 'none' : `color ${DUR.hover}s cubic-bezier(${EASE.micro.join(',')})`,
        }}
      >
        {formatValue(value, stat)}
      </p>
      <p className="text-[14px] leading-[1.5] text-[var(--texto-apoio)]">
        {stat.label.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </p>
    </motion.div>
  )
}
