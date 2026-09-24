import { motion } from 'framer-motion'
import '../styles/case-ux-ai-tokens.css'
import { CaseUxAiMotionProvider, useCaseMotion } from '../motion/CaseUxAiMotionProvider'
import { enterFadeUp, enterCard, enterRule, enterDraw, staggerContainer } from '../motion/caseUxAiRecipes'
import { VIEWPORT } from '../motion/caseUxAiTokens'
import Container from '../components/case-ux-ai/layout/Container'
import Section from '../components/case-ux-ai/layout/Section'
import GlassSurface from '../components/case-ux-ai/surface/GlassSurface'
import LineMask from '../components/case-ux-ai/type/LineMask'

/**
 * Página de teste — FASE 01 do blueprint (§24.1, passo 1): "Tokens, fontes,
 * grão, Container, Section, GlassSurface, receitas de motion, MotionProvider.
 * Entregar uma página de teste com tokens e receitas."
 *
 * Não é uma seção do case. Rota temporária de revisão, removida quando o
 * layout estático da página real (FASE 02) entrar.
 */
const COLOR_GROUPS: Array<{ title: string; vars: string[] }> = [
  { title: 'Fundo e superfície', vars: ['--fundo-pagina', '--fundo-faixa', '--superficie-card', '--superficie-elevada', '--superficie-hover'] },
  { title: 'Texto', vars: ['--texto-principal', '--texto-apoio', '--texto-metadado', '--texto-inativo'] },
  { title: 'Ação', vars: ['--acao-link', '--acao-hover', '--acao-pressionado', '--acao-botao-fundo'] },
  { title: 'Dado', vars: ['--dado-nivel-1', '--dado-nivel-2', '--dado-nivel-3', '--dado-nivel-4', '--dado-neutro'] },
]

const RADII = ['--r-xs', '--r-sm', '--r-md', '--r-lg', '--r-pill']
const SPACING = ['--sp-8', '--sp-16', '--sp-24', '--sp-32', '--sp-40', '--sp-48', '--sp-64', '--sp-80', '--sp-96', '--sp-120']

function Swatch({ varName }: { varName: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 shrink-0 rounded-[var(--r-sm)] border border-[var(--borda-padrao)]"
        style={{ background: `var(${varName})` }}
      />
      <code className="text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {varName}
      </code>
    </div>
  )
}

function FoundationsInner() {
  const { reduced, isDesktop } = useCaseMotion()

  return (
    <main className="case-uxai-root min-h-screen">
      <div className="grain-layer" />

      <Section id="status" labelledBy="status-heading">
        <Container>
          <p className="f-mono text-[12px] tracking-[0.03em] text-[var(--acao-hover)] mb-4">
            CASE UX + AI · FUNDAÇÃO
          </p>
          <LineMask
            id="status-heading"
            as="h1"
            lines={['Tokens, receitas de motion', 'e superfícies de vidro.']}
            className="f-display font-semibold text-[40px] leading-[1.1] tracking-[-0.03em] case-xl:text-[64px] mb-4"
          />
          <p className="paragraph text-[var(--texto-apoio)] text-[16px] leading-[1.5]">
            reduced motion: <strong className="text-[var(--texto-principal)]">{String(reduced)}</strong> · desktop
            (sticky/scrub habilitado): <strong className="text-[var(--texto-principal)]">{String(isDesktop)}</strong>
          </p>
        </Container>
      </Section>

      <Section id="colors" labelledBy="colors-heading">
        <Container>
          <h2 id="colors-heading" className="f-display font-semibold text-[32px] mb-8">
            Cor
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 case-xl:grid-cols-4 gap-8">
            {COLOR_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="text-[12px] font-semibold tracking-[0.02em] text-[var(--texto-metadado)] mb-3">
                  {group.title.toUpperCase()}
                </p>
                <div className="flex flex-col gap-3">
                  {group.vars.map((v) => (
                    <Swatch key={v} varName={v} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="type" labelledBy="type-heading">
        <Container>
          <h2 id="type-heading" className="f-display font-semibold text-[32px] mb-8">
            Tipografia
          </h2>
          <div className="flex flex-col gap-4">
            <p className="f-display font-semibold text-[64px] leading-[1.1] tracking-[-0.03em]">heading/h1 · Hanken 600</p>
            <p className="f-display font-semibold text-[40px] leading-[1.1]">heading/h4 · Hanken 600 -3%</p>
            <p className="text-[18px] leading-[1.5]">body/large · Outfit 400</p>
            <p className="text-[16px] leading-[1.5] text-[var(--texto-apoio)]">body/body · Outfit 400 — texto-apoio</p>
            <p className="f-mono text-[12px] tracking-[0.03em] text-[var(--texto-metadado)]">mono/meta · JetBrains 400</p>
            <p className="f-mono text-[22px] tracking-[0.02em]">01 · mono/index · JetBrains 500</p>
          </div>
        </Container>
      </Section>

      <Section id="glass" labelledBy="glass-heading">
        <Container>
          <h2 id="glass-heading" className="f-display font-semibold text-[32px] mb-8">
            Vidro e raios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <GlassSurface level="leve" className="rounded-[var(--r-md)] p-6">
              <p className="text-[14px]">glass-leve · blur 14</p>
            </GlassSurface>
            <GlassSurface level="medio" className="rounded-[var(--r-md)] p-6">
              <p className="text-[14px]">glass-medio · blur 22</p>
            </GlassSurface>
            <GlassSurface level="forte" className="rounded-[var(--r-md)] p-6">
              <p className="text-[14px]">glass-forte · blur 30</p>
            </GlassSurface>
          </div>
          <div className="flex flex-wrap gap-6">
            {RADII.map((r) => (
              <div key={r} className="flex flex-col items-center gap-2">
                <div className="h-16 w-16 bg-[var(--superficie-elevada)]" style={{ borderRadius: `var(${r})` }} />
                <code className="f-mono text-[11px] text-[var(--texto-metadado)]">{r}</code>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="spacing" labelledBy="spacing-heading">
        <Container>
          <h2 id="spacing-heading" className="f-display font-semibold text-[32px] mb-8">
            Espaçamento
          </h2>
          <div className="flex flex-col gap-2">
            {SPACING.map((s) => (
              <div key={s} className="flex items-center gap-4">
                <code className="f-mono text-[11px] w-16 text-[var(--texto-metadado)]">{s}</code>
                <div className="h-3 bg-[var(--acao-link)]" style={{ width: `var(${s})` }} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="motion" labelledBy="motion-heading">
        <Container>
          <h2 id="motion-heading" className="f-display font-semibold text-[32px] mb-8">
            Receitas de motion
          </h2>
          <p className="paragraph text-[var(--texto-apoio)] mb-8">
            Role para disparar cada receita. Uma vez só, como em toda a página real.
          </p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
            variants={staggerContainer(0.064)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.div variants={enterCard}>
              <GlassSurface level="medio" className="rounded-[var(--r-lg)] p-6 h-24 flex items-center justify-center">
                enter-card
              </GlassSurface>
            </motion.div>
            <motion.div variants={enterFadeUp}>
              <GlassSurface level="medio" className="rounded-[var(--r-lg)] p-6 h-24 flex items-center justify-center">
                enter-fade-up
              </GlassSurface>
            </motion.div>
            <motion.div variants={enterCard} transition={{ delay: 0.128 }}>
              <GlassSurface level="medio" className="rounded-[var(--r-lg)] p-6 h-24 flex items-center justify-center">
                stagger 64ms
              </GlassSurface>
            </motion.div>
          </motion.div>

          <motion.div
            className="h-px bg-[var(--borda-padrao)] origin-left mb-12"
            variants={enterRule}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          />

          <svg width="200" height="80" viewBox="0 0 200 80" aria-hidden="true">
            <motion.path
              d="M10 40 L190 40"
              stroke="var(--acao-link)"
              strokeWidth={2}
              fill="none"
              variants={enterDraw}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            />
          </svg>
        </Container>
      </Section>
    </main>
  )
}

export default function CaseUxAiFoundations() {
  return (
    <CaseUxAiMotionProvider>
      <FoundationsInner />
    </CaseUxAiMotionProvider>
  )
}
