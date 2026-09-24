import { motion } from 'framer-motion'
import { useCaseMotion } from '../../../motion/CaseUxAiMotionProvider'
import { enterDraw } from '../../../motion/caseUxAiRecipes'
import { DUR, EASE, HERO_DUR, STAGGER } from '../../../motion/caseUxAiTokens'

/**
 * Treliça do hero — public/case-ux-ai/lattice-hero.svg, exportado do nó
 * 836:1224 (BRIEF-S01-HERO §7). Inline, não <img>: a Etapa D anima
 * `pathLength` em cada <path>. Coordenadas copiadas do arquivo sem
 * arredondar; o bloco <metadata> (manifesto C2PA) fica de fora.
 *
 * Cores via token, com o mesmo resultado do export: traço branco a 6% é
 * exatamente --borda-sutil; ponto #2F82D6 a 14% é --dado-nivel-3 com
 * fill-opacity 0.14.
 *
 * Some abaixo de 768 (§8): desenhada para 1440, em tela pequena vira
 * sujeira. Entre 768 e 1439 o hero é fluxo e mais alto que 1440×1024,
 * então `slice` mantém pontos redondos; em 1440×1024 é idêntico ao Figma.
 *
 * Motion (MOTION-SPEC §6, S01): os 11 paths desenham com `enterDraw` em
 * HERO_DUR.lattice, a partir de t0, em paralelo com o resto — nada espera
 * por ela. Os 26 pontos entram em fade juntos, sem stagger próprio.
 * Reduced motion: já desenhada.
 */
export const LATTICE_PATHS = [
  'M437.963 26.8949L621.432 59.9133',
  'M1084.06 200.845L1274.04 257.98',
  'M1084.06 200.845L900.297 256.11',
  'M702.667 772.956L659.643 877.735',
  'M1404.23 206.235L1274.04 257.98',
  'M936.777 906.25L1050.89 954.21',
  'M985.012 443.826L1039.38 627.872',
  'M988.148 704.162L1039.38 627.872',
  'M178.605 845.393L250.581 733.283',
  'M386.185 606.371L250.58 733.283',
  'M621.433 59.9133L582.26 41.0118',
] as const

export const LATTICE_DOTS: readonly (readonly [number, number])[] = [
  [228.246, 475.624],
  [437.963, 26.8949],
  [1084.06, 200.845],
  [702.666, 772.956],
  [1404.23, 206.235],
  [1274.04, 257.98],
  [637.828, 977.58],
  [835.691, 988.177],
  [1192.07, 871.3],
  [338.086, 942.999],
  [936.777, 906.25],
  [985.012, 443.826],
  [988.148, 704.162],
  [178.605, 845.393],
  [1323.14, 391.396],
  [386.186, 606.371],
  [1278.86, 441.034],
  [178.951, 59.7289],
  [1050.89, 954.21],
  [445.791, 596.082],
  [621.432, 59.9133],
  [582.26, 41.0118],
  [1039.38, 627.872],
  [250.58, 733.283],
  [900.297, 256.11],
  [659.643, 877.735],
]

export default function LatticeHero() {
  const { reduced } = useCaseMotion()
  const animated = !reduced

  return (
    <motion.svg
      className="pointer-events-none absolute inset-0 z-[2] hidden h-full w-full md:block"
      viewBox="0 0 1440 1024"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
      focusable="false"
      initial={animated ? 'hidden' : false}
      animate="visible"
    >
      {LATTICE_PATHS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          style={{ stroke: 'var(--borda-sutil)' }}
          variants={enterDraw}
          transition={{ duration: HERO_DUR.lattice, delay: i * STAGGER.line, ease: EASE.state }}
        />
      ))}
      {LATTICE_DOTS.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={1.25}
          fillOpacity={0.14}
          style={{ fill: 'var(--dado-nivel-3)' }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: DUR.enter, ease: EASE.enter } } }}
        />
      ))}
    </motion.svg>
  )
}
