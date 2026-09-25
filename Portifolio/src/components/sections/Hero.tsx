import { motion } from 'framer-motion'
import { ArrowDown, Mail, Linkedin } from 'lucide-react'
import Button from '../ui/Button'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-amber/3 blur-[100px]" />
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        {/* Eyebrow */}
        <motion.p
          {...fadeUp(0)}
          className="font-mono text-xs text-amber tracking-widest uppercase mb-6"
        >
          UX/UI Designer · Pesquisa + Produto
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-satoshi font-semibold text-cream leading-[1.1] tracking-tight text-5xl sm:text-6xl lg:text-7xl max-w-3xl mb-6"
          style={{ letterSpacing: '-0.02em' }}
        >
          Designer que une{' '}
          <span className="text-amber">estratégia</span>,{' '}
          usabilidade e código.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-muted text-lg leading-relaxed max-w-xl mb-10"
        >
          Antes de projetar interfaces, passei anos resolvendo os problemas de quem
          usava as ruins. Hoje desenho experiências centradas no usuário — da pesquisa
          à prototipação — com a vantagem de quem também sabe construir.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3 mb-12">
          <Button
            variant="primary"
            href="#projetos"
          >
            Ver projetos
            <ArrowDown size={14} />
          </Button>
          <Button
            variant="secondary"
            href="/curriculo-andreo.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Baixar currículo
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div {...fadeUp(0.4)} className="flex items-center gap-5">
          <a
            href="https://linkedin.com/in/andreo-barbosa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Andreo Barbosa"
            className="flex items-center gap-2 font-mono text-xs text-muted hover:text-amber transition-colors duration-200"
          >
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </a>
          <div className="w-px h-4 bg-cream/10" aria-hidden="true" />
          <a
            href="mailto:andreosnsd@gmail.com"
            aria-label="E-mail de Andreo Barbosa"
            className="flex items-center gap-2 font-mono text-xs text-muted hover:text-amber transition-colors duration-200"
          >
            <Mail size={14} />
            <span>andreosnsd@gmail.com</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
