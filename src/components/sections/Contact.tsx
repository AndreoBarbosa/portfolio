import { motion, useReducedMotion } from 'framer-motion'
import { FilledLinkedInIcon } from '../ui/SocialIcons'
import SectionLabel from '../ui/SectionLabel'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import Container from '../ui/Container'

function ContactPattern() {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      className="relative w-full max-w-sm"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay: 0.5 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <pattern
            id="contact-dots"
            x="0" y="0" width="24" height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1" fill="rgba(154,147,132,0.12)" />
          </pattern>
        </defs>

        {/* Dot grid — estático */}
        <rect width="400" height="400" fill="url(#contact-dots)" />

        {/* ── Anéis externos + crosshair — rotação CW 60s ── */}
        <g>
          {!shouldReduce && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="60s"
              repeatCount="indefinite"
            />
          )}
          <circle cx="200" cy="200" r="178" stroke="rgba(154,147,132,0.06)" strokeWidth="0.75" />
          <circle cx="200" cy="200" r="160" stroke="rgba(200,169,110,0.07)" strokeWidth="0.75" strokeDasharray="5 9" />
          <circle cx="200" cy="200" r="140" stroke="rgba(200,169,110,0.09)" strokeWidth="0.75" />
          <line x1="200" y1="22"  x2="200" y2="378" stroke="rgba(200,169,110,0.05)" strokeWidth="0.75" />
          <line x1="22"  y1="200" x2="378" y2="200" stroke="rgba(200,169,110,0.05)" strokeWidth="0.75" />
          <line x1="42"  y1="358" x2="120" y2="280" stroke="rgba(200,169,110,0.07)" strokeWidth="0.75" />
          <line x1="358" y1="42"  x2="280" y2="120" stroke="rgba(200,169,110,0.07)" strokeWidth="0.75" />
        </g>

        {/* ── Anel interno — rotação CW 45s ── */}
        <g>
          {!shouldReduce && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="45s"
              repeatCount="indefinite"
            />
          )}
          <circle cx="200" cy="200" r="100" stroke="rgba(200,169,110,0.13)" strokeWidth="0.75" />
        </g>

        {/* ── Diamond — rotação CCW 90s ── */}
        <g>
          {!shouldReduce && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="-360 200 200"
              dur="90s"
              repeatCount="indefinite"
            />
          )}
          <rect
            x="152" y="152" width="96" height="96"
            stroke="rgba(200,169,110,0.18)"
            strokeWidth="0.75"
            transform="rotate(45 200 200)"
          />
        </g>

        {/* ── Marcas de canto — estáticas ── */}
        <path d="M 22 54 L 22 22 L 54 22"      stroke="rgba(200,169,110,0.22)" strokeWidth="1" strokeLinecap="round" />
        <path d="M 346 22 L 378 22 L 378 54"   stroke="rgba(200,169,110,0.22)" strokeWidth="1" strokeLinecap="round" />
        <path d="M 22 346 L 22 378 L 54 378"   stroke="rgba(200,169,110,0.22)" strokeWidth="1" strokeLinecap="round" />
        <path d="M 378 346 L 378 378 L 346 378" stroke="rgba(200,169,110,0.22)" strokeWidth="1" strokeLinecap="round" />

        {/* ── Pulso sonar 1 — expande e desaparece ── */}
        <circle cx="200" cy="200" r="1" fill="none" stroke="rgba(200,169,110,0.32)" strokeWidth="0.75">
          {!shouldReduce && (
            <>
              <animate attributeName="r"       values="2;170"    dur="3.5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.2 0 0.4 1" />
              <animate attributeName="opacity" values="0.32;0"   dur="3.5s" repeatCount="indefinite" />
            </>
          )}
        </circle>

        {/* ── Pulso sonar 2 — defasado 1.75s ── */}
        <circle cx="200" cy="200" r="1" fill="none" stroke="rgba(200,169,110,0.32)" strokeWidth="0.75">
          {!shouldReduce && (
            <>
              <animate attributeName="r"       values="2;170"    dur="3.5s" begin="1.75s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.2 0 0.4 1" />
              <animate attributeName="opacity" values="0.32;0"   dur="3.5s" begin="1.75s" repeatCount="indefinite" />
            </>
          )}
        </circle>

        {/* ── Ponto central — pulso de opacidade ── */}
        <circle cx="200" cy="200" r="3.5" fill="rgba(200,169,110,0.28)">
          {!shouldReduce && (
            <animate attributeName="opacity" values="0.28;0.70;0.28" dur="3.5s" repeatCount="indefinite" />
          )}
        </circle>
        {/* Núcleo fixo */}
        <circle cx="200" cy="200" r="1.5" fill="rgba(200,169,110,0.65)" />
      </svg>
    </motion.div>
  )
}

export default function Contact() {
  return (
    <section
      id="contato"
      className="py-16 md:py-20 lg:py-32 border-t border-cream/5 relative overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] rounded-full bg-amber/4 blur-[140px]" />
        <div className="absolute top-1/3 left-0 w-[350px] h-[300px] rounded-full bg-amber/3 blur-[120px]" />
      </div>

      <Container className="relative">
        <AnimateOnScroll>
          <SectionLabel index="/05" label="Contato" />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Esquerda: conteúdo ── */}
          <div>
            <AnimateOnScroll>
              <h2
                className="font-satoshi font-bold text-cream leading-none mb-6"
                style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.03em' }}
              >
                Vamos<br />conversar?
              </h2>
              <p className="text-muted text-base lg:text-lg leading-relaxed mb-10 max-w-md">
                Aberto a oportunidades, freelas e boas conversas sobre design e produto.
              </p>
            </AnimateOnScroll>

            {/* Ícones de contato — preenchidos âmbar, sem label, sem moldura */}
            <AnimateOnScroll delay={0.1}>
              <div className="flex gap-4 mb-10">
                <a
                  href="https://linkedin.com/in/andreo-barbosa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn de Andreo Barbosa"
                  className="text-amber hover:scale-110 transition-transform duration-200"
                >
                  <FilledLinkedInIcon size={36} />
                </a>
              </div>
            </AnimateOnScroll>
          </div>

          {/* ── Direita: padrão geométrico — alinhado à direita (some no mobile) ── */}
          <div className="hidden lg:flex items-center justify-end">
            <ContactPattern />
          </div>

        </div>
      </Container>
    </section>
  )
}
