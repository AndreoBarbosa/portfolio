import { motion } from 'framer-motion'
import { useCaseMotion } from '../../../motion/CaseUxAiMotionProvider'
import { enterDraw } from '../../../motion/caseUxAiRecipes'
import { STAGGER } from '../../../motion/caseUxAiTokens'

/**
 * Motivo B — a treliça (MOTION-SPEC-SYSMED.md §1 e §6: "malha de linhas
 * finas do fundo das seções 01 e 08 desenha o traço uma única vez, devagar,
 * a 5% de opacidade. Nunca entra em loop"). Coordenadas e opacidades vindas
 * direto do Figma (nó 836:1224, file BPffDtLmobPgTMqljJPBoj) — não
 * aproximadas. As opacidades já vêm corretas no próprio dado (stroke 6%
 * branco, pontos 14% azul); não aplicar um multiplicador extra por cima.
 */
const LINES = [
  'M437.963 26.8949L621.432 59.9133',
  'M1084.06 200.845L1274.04 257.98',
  'M1084.06 200.845L900.296 256.11',
  'M702.667 772.956L659.642 877.735',
  'M1404.23 206.235L1274.04 257.98',
  'M936.778 906.25L1050.89 954.21',
  'M985.012 443.826L1039.38 627.872',
  'M988.148 704.162L1039.38 627.872',
  'M178.605 845.393L250.58 733.283',
  'M386.185 606.371L250.58 733.283',
  'M621.432 59.9133L582.259 41.0118',
]

const DOTS: [number, number][] = [
  [228.247, 475.624],
  [437.963, 26.8949],
  [1084.06, 200.845],
  [702.667, 772.956],
  [1404.23, 206.235],
  [1274.04, 257.98],
  [637.827, 977.58],
  [835.691, 988.177],
  [1192.07, 871.3],
  [338.086, 942.999],
  [936.778, 906.25],
  [985.012, 443.826],
  [988.148, 704.162],
  [178.605, 845.393],
  [1323.14, 391.396],
  [386.185, 606.371],
  [1278.86, 441.034],
  [178.951, 59.7289],
  [1050.89, 954.21],
  [445.79, 596.082],
  [621.432, 59.9133],
  [582.259, 41.0118],
  [1039.38, 627.872],
  [250.58, 733.283],
  [900.296, 256.11],
  [659.642, 877.735],
]

// Some abaixo de 768 (BRIEF-S01-HERO §8): desenhada para 1440, em tela
// pequena vira sujeira. Entre 768 e 1439 o hero é fluxo e mais alto que
// 1440×1024, então `slice` em vez de `none`: mantém pontos redondos e
// ângulos das linhas; em 1440×1024 exatos é idêntico ao Figma.
export default function LatticeBackground({ animate = true }: { animate?: boolean }) {
  const { reduced } = useCaseMotion()

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[2] hidden h-full w-full md:block"
      viewBox="0 0 1440 1024"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {LINES.map((d, i) =>
        reduced || !animate ? (
          <path key={i} d={d} stroke="white" strokeOpacity={0.06} />
        ) : (
          <motion.path
            key={i}
            d={d}
            stroke="white"
            strokeOpacity={0.06}
            initial="hidden"
            animate="visible"
            variants={enterDraw}
            transition={{ duration: 2.4, delay: i * STAGGER.line, ease: [0.65, 0, 0.35, 1] }}
          />
        ),
      )}
      {DOTS.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={1.25} fill="#2F82D6" fillOpacity={0.14} />
      ))}
    </svg>
  )
}
