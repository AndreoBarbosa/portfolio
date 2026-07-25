import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Button from '../ui/Button'
import Container from '../ui/Container'
import { LinkedInIcon } from '../icons/LinkedInIcon'

const HeroGeometry = lazy(() => import('../ui/HeroGeometry'))

// Icosaedro 2D: projeção ortográfica (Rx=0.5, Ry=0.3) pré-calculada.
// Outer radius 1.8, escala 90, viewBox 400×400, centro (200,200).
// Inner radius 1.0 = 0.555× outer. 30 arestas cada.
// SMIL animateTransform — zero JS no thread principal.
function HeroMobileIcosahedron() {
  const shouldReduce = useReducedMotion()

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-[560px] h-[560px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="200" cy="200" r="187" stroke="rgba(217,154,78,0.07)" strokeWidth="0.8" />

      {/* Externo — CW 130 s */}
      <g stroke="rgba(217,154,78,0.32)" strokeWidth="1.0">
        {!shouldReduce && (
          <animateTransform attributeName="transform" type="rotate"
            from="0 200 200" to="360 200 200" dur="130s" repeatCount="indefinite" />
        )}
        <line x1="251" y1="191" x2="225" y2="349" />
        <line x1="251" y1="191" x2="307" y2="72"  />
        <line x1="251" y1="191" x2="135" y2="72"  />
        <line x1="251" y1="191" x2="363" y2="243" />
        <line x1="251" y1="191" x2="84"  y2="243" />
        <line x1="225" y1="349" x2="265" y2="328" />
        <line x1="225" y1="349" x2="93"  y2="328" />
        <line x1="225" y1="349" x2="363" y2="243" />
        <line x1="225" y1="349" x2="84"  y2="243" />
        <line x1="175" y1="51"  x2="150" y2="209" />
        <line x1="175" y1="51"  x2="307" y2="72"  />
        <line x1="175" y1="51"  x2="135" y2="72"  />
        <line x1="175" y1="51"  x2="316" y2="157" />
        <line x1="175" y1="51"  x2="38"  y2="157" />
        <line x1="150" y1="209" x2="265" y2="328" />
        <line x1="150" y1="209" x2="93"  y2="328" />
        <line x1="150" y1="209" x2="316" y2="157" />
        <line x1="150" y1="209" x2="38"  y2="157" />
        <line x1="307" y1="72"  x2="135" y2="72"  />
        <line x1="307" y1="72"  x2="363" y2="243" />
        <line x1="307" y1="72"  x2="316" y2="157" />
        <line x1="135" y1="72"  x2="84"  y2="243" />
        <line x1="135" y1="72"  x2="38"  y2="157" />
        <line x1="265" y1="328" x2="93"  y2="328" />
        <line x1="265" y1="328" x2="363" y2="243" />
        <line x1="265" y1="328" x2="316" y2="157" />
        <line x1="93"  y1="328" x2="84"  y2="243" />
        <line x1="93"  y1="328" x2="38"  y2="157" />
        <line x1="363" y1="243" x2="316" y2="157" />
        <line x1="84"  y1="243" x2="38"  y2="157" />
      </g>

      {/* Interno — CCW 190 s */}
      <g stroke="rgba(242,237,227,0.12)" strokeWidth="0.8">
        {!shouldReduce && (
          <animateTransform attributeName="transform" type="rotate"
            from="0 200 200" to="-360 200 200" dur="190s" repeatCount="indefinite" />
        )}
        <line x1="228" y1="195" x2="214" y2="283" />
        <line x1="228" y1="195" x2="259" y2="129" />
        <line x1="228" y1="195" x2="164" y2="129" />
        <line x1="228" y1="195" x2="291" y2="224" />
        <line x1="228" y1="195" x2="136" y2="224" />
        <line x1="214" y1="283" x2="236" y2="271" />
        <line x1="214" y1="283" x2="141" y2="271" />
        <line x1="214" y1="283" x2="291" y2="224" />
        <line x1="214" y1="283" x2="136" y2="224" />
        <line x1="186" y1="117" x2="172" y2="205" />
        <line x1="186" y1="117" x2="259" y2="129" />
        <line x1="186" y1="117" x2="164" y2="129" />
        <line x1="186" y1="117" x2="264" y2="176" />
        <line x1="186" y1="117" x2="110" y2="176" />
        <line x1="172" y1="205" x2="236" y2="271" />
        <line x1="172" y1="205" x2="141" y2="271" />
        <line x1="172" y1="205" x2="264" y2="176" />
        <line x1="172" y1="205" x2="110" y2="176" />
        <line x1="259" y1="129" x2="164" y2="129" />
        <line x1="259" y1="129" x2="291" y2="224" />
        <line x1="259" y1="129" x2="264" y2="176" />
        <line x1="164" y1="129" x2="136" y2="224" />
        <line x1="164" y1="129" x2="110" y2="176" />
        <line x1="236" y1="271" x2="141" y2="271" />
        <line x1="236" y1="271" x2="291" y2="224" />
        <line x1="236" y1="271" x2="264" y2="176" />
        <line x1="141" y1="271" x2="136" y2="224" />
        <line x1="141" y1="271" x2="110" y2="176" />
        <line x1="291" y1="224" x2="264" y2="176" />
        <line x1="136" y1="224" x2="110" y2="176" />
      </g>

      <circle cx="200" cy="200" r="2.5" fill="rgba(217,154,78,0.45)" />
    </svg>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    // Sem flex — block puro, igual a todas as outras seções.
    // Isso garante que o Container use mx-auto de block (não flex-item),
    // alinhando a margem esquerda com header, footer e todas as seções.
    <section className="relative min-h-[88vh] overflow-hidden">

      {/* ── Gradientes de fundo ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/3 w-[600px] h-[320px] rounded-full bg-amber/8 blur-[100px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[220px] rounded-full bg-cream/[0.03] blur-[80px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-amber/3 blur-[100px]" />
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* ── MOBILE: icosaedro — absolute, topo do hero ──
          mask-image dissolve a metade inferior do elemento para transparente,
          revelando o fundo ink (#13110E) da section logo abaixo.
          O texto começa em mt-[48vh], onde o elemento já está quase invisível. */}
      <div
        className="absolute top-0 left-0 right-0 h-[50vh] flex items-center justify-center overflow-hidden pointer-events-none lg:hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)',
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-72 h-72 rounded-full bg-amber/10 blur-[80px]" />
        </div>
        <HeroMobileIcosahedron />
      </div>

      {/* Overlay ink — sobe de baixo e cobre a zona de sobreposição,
          eliminando qualquer conflito visual entre as linhas e o texto. */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none lg:hidden"
        style={{
          top: '36vh',
          background: 'linear-gradient(to bottom, transparent 0%, #13110E 32%)',
        }}
        aria-hidden="true"
      />

      {/* ── DESKTOP: canvas 3D — absolute, lado direito ── */}
      <div
        className="absolute inset-y-0 right-0 w-[65%] pointer-events-none hidden lg:block"
        style={{
          WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent 85%)',
          maskImage: 'linear-gradient(to left, black 40%, transparent 85%)',
        }}
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <HeroGeometry />
        </Suspense>
      </div>

      {/* ── Conteúdo de texto ──
          Mobile: mt-[38vh] posiciona o texto sobrepondo a base do icosaedro.
          Desktop: pt-32 posiciona abaixo do header fixo (64px) com folga. */}
      <Container className="relative z-10 mt-[42vh] pb-12 lg:mt-0 lg:pt-32 lg:pb-16">
        <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0" aria-hidden="true" />
          <div className="h-px flex-1 max-w-[48px] bg-amber/30" aria-hidden="true" />
          <span className="font-mono text-xs text-amber tracking-widest uppercase">
            UX/UI Designer · Pesquisa + Produto
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="font-satoshi font-bold text-cream max-w-[800px] mb-8 text-balance"
          style={{
            fontSize: 'clamp(56px, 6.5vw, 88px)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
          }}
        >
          Transformo complexidade em clareza.
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="text-cream/70 text-[17px] leading-[1.6] max-w-[52ch] text-pretty"
        >
          Product Designer com base em UX Research. Transformo pesquisa em decisões
          de produto que reduzem esforço e simplificam experiências complexas.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="action-gap flex flex-wrap gap-3 mb-8">
          <Button variant="solid" href="#projetos">
            Ver projetos
            <ArrowDown size={14} />
          </Button>
          <Button variant="secondary" href="#sobre">
            Conhecer minha trajetória
          </Button>
        </motion.div>

        <motion.div {...fadeUp(0.4)} className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/andreo-barbosa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Andreo Barbosa"
            className="social-link social-link--hero"
          >
            <LinkedInIcon />
          </a>
        </motion.div>
      </Container>

      {/* Scroll indicator — apenas desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-0 right-0 hidden lg:flex justify-center pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-muted/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
