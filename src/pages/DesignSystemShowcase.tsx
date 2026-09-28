import { useRef } from 'react'
import '../styles/liquid-glass.css'
import LiquidHero from '../components/liquid/LiquidHero'
import LiquidHeader from '../components/liquid/LiquidHeader'
import GlassSurface from '../components/liquid/GlassSurface'
import LiquidButton from '../components/liquid/LiquidButton'
import LiquidArrowLink from '../components/liquid/LiquidArrowLink'
import LiquidCard from '../components/liquid/LiquidCard'
import LiquidSectionHeading from '../components/liquid/LiquidSectionHeading'
import { useActiveSection } from '../hooks/useActiveSection'
import usePageMeta from '../hooks/usePageMeta'

const SECTIONS = [
  { id: 'paleta', label: 'Paleta' },
  { id: 'tipografia', label: 'Tipografia' },
  { id: 'vidro', label: 'Vidro' },
  { id: 'botões', label: 'Botões' },
  { id: 'contraste', label: 'Contraste' },
]

// Sistema monocromático: cinza-vidro + cinzas glass + petróleo. Zero verde/teal.
const paletteLight = [
  { name: '--bg', hex: '#DCDCDA' },
  { name: '--surface-1', hex: '#EAE9E7' },
  { name: '--surface-2', hex: '#CFCECB' },
  { name: '--neutral-mid', hex: '#D9D5D2' },
  { name: '--neutral-faint', hex: '#BFBAB8' },
  { name: '--text-strong', hex: '#0C1A22' },
  { name: '--text-body', hex: '#2C2C2A' },
  { name: '--text-muted', hex: '#4A4946' },
  { name: '--text-faint', hex: '#625F5D' },
  { name: '--accent', hex: '#0C1A22' },
  { name: '--accent-glass', hex: 'rgba(12,26,34,0.72)' },
  { name: '--accent-glass-soft', hex: 'rgba(12,26,34,0.10)' },
]

const typeScale = [14, 16, 18, 20, 24, 32, 40, 48, 64, 80, 96]

const contrastPairs = [
  { label: 'text-strong sobre bg (cinza-vidro)', ratio: '12.9:1' },
  { label: 'text-body sobre bg', ratio: '10.2:1' },
  { label: 'text-muted sobre bg', ratio: '9.0:1' },
  { label: 'text-faint sobre bg', ratio: '4.6:1' },
  { label: 'branco sobre preenchimento hover (petróleo glass 72%)', ratio: '8.3:1' },
  { label: 'text-strong sobre preenchimento hover secundário (10%)', ratio: '10.6:1' },
]

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="liquid-card !p-0 overflow-hidden">
      <div className="h-20" style={{ background: hex.startsWith('rgba') ? `linear-gradient(${hex}, ${hex}), repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 50% / 12px 12px` : hex, borderBottom: '1px solid var(--surface-2)' }} />
      <div className="p-4">
        <p className="text-sm font-medium" style={{ color: 'var(--text-strong)' }}>{name}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>{hex}</p>
      </div>
    </div>
  )
}


export default function DesignSystemShowcase() {
  const rootRef = useRef<HTMLDivElement>(null)
  const activeSection = useActiveSection(SECTIONS.map((s) => s.id))

  usePageMeta({
    title: 'Design System · Andreo Barbosa',
    description: 'Paleta, tipografia, vidro, botões e contraste do sistema visual do portfólio.',
  })

  return (
    <div ref={rootRef} className="liquid-root min-h-screen">
      <LiquidHeader activeSection={activeSection} navItems={SECTIONS} />
      <LiquidHero />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col gap-24">
        {/* Paleta */}
        <section id="paleta">
          <LiquidSectionHeading id="paleta-title" number="/01" label="Paleta" />
          <p className="mt-3 max-w-[60ch]" style={{ color: 'var(--text-muted)' }}>
            Repouso é cinza-vidro + cinzas glass, sem cor nenhuma. Petróleo só existe como resposta a
            interação — veja a seção Botões — e sempre como glass translúcido, nunca chapado.
            Nenhum verde/teal no sistema.
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {paletteLight.map((s) => <Swatch key={s.name} {...s} />)}
          </div>
        </section>

        {/* Tipografia */}
        <section id="tipografia">
          <LiquidSectionHeading id="tipografia-title" number="/02" label="Tipografia" />
          <p className="mt-3 max-w-[60ch]" style={{ color: 'var(--text-muted)' }}>
            Display: Hanken Grotesk (600/700). Corpo: Outfit (400/500). Escala par completa.
          </p>
          <div className="mt-10 flex flex-col gap-6">
            <div>
              <p className="text-xs uppercase tracking-wide mb-3" style={{ color: 'var(--text-faint)' }}>
                Hanken Grotesk — display
              </p>
              {typeScale.map((size) => (
                <p
                  key={`hanken-${size}`}
                  className="font-hanken font-semibold"
                  style={{ color: 'var(--text-strong)', fontSize: `${size}px`, lineHeight: size >= 32 ? 1.05 : 1.3, letterSpacing: size >= 32 ? '-0.02em' : undefined }}
                >
                  Aa {size}px
                </p>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide mb-3" style={{ color: 'var(--text-faint)' }}>
                Outfit — corpo
              </p>
              {typeScale.map((size) => (
                <p
                  key={`outfit-${size}`}
                  className="font-outfit font-normal"
                  style={{ color: 'var(--text-body)', fontSize: `${size}px`, lineHeight: size >= 32 ? 1.1 : 1.6 }}
                >
                  Aa {size}px
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Vidro */}
        <section id="vidro">
          <LiquidSectionHeading id="vidro-title" number="/03" label="Vidro" />
          <p className="mt-3 max-w-[60ch]" style={{ color: 'var(--text-muted)' }}>
            Um padrão único de superfície translúcida, reusado em nav, card e chip. Sempre neutro
            em repouso — a cor nunca mora na superfície, só na interação.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-6 items-start">
            <GlassSurface variant="nav">
              <span className="font-hanken font-semibold" style={{ color: 'var(--text-strong)' }}>Nav</span>
            </GlassSurface>
            <GlassSurface variant="card">
              <p className="font-hanken font-semibold" style={{ color: 'var(--text-strong)' }}>Card</p>
              <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                Superfície de vidro padrão, blur 16px, borda clara.
              </p>
            </GlassSurface>
            <div>
              <GlassSurface variant="chip" className="inline-flex">
                <span className="text-xs font-medium" style={{ color: 'var(--text-body)' }}>Chip</span>
              </GlassSurface>
            </div>
          </div>
        </section>

        {/* Botões */}
        <section id="botões">
          <LiquidSectionHeading id="botoes-title" number="/04" label="Botões" />
          <p className="mt-3 max-w-[60ch]" style={{ color: 'var(--text-muted)' }}>
            Em repouso, nenhum botão tem cor — inclusive o CTA de nav/hero. Petróleo glass
            translúcido (nunca chapado) acende no hover, no toque (
            <code className="text-[13px]" style={{ color: 'var(--text-strong)' }}>:active</code>,
            mesma regra do hover — teste tocando num dispositivo touch) e no foco por teclado
            (pressione Tab).
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <LiquidButton variant="primary">Primário</LiquidButton>
            <LiquidButton variant="secondary">Secundário</LiquidButton>
            <LiquidArrowLink href="#">Ver projeto</LiquidArrowLink>
          </div>
          <p className="mt-14 text-sm font-medium" style={{ color: 'var(--text-faint)' }}>
            Card de case — repouso neutro; hover/toque acende borda petróleo, sombra sobe, seta escurece.
          </p>
          <div className="mt-4 max-w-md">
            <LiquidCard
              title="Case exemplo"
              description="Passe o mouse (ou toque) para ver o estado de interação do card."
            />
          </div>
        </section>

        {/* Contraste */}
        <section id="contraste">
          <LiquidSectionHeading id="contraste-title" number="/05" label="Contraste" />
          <p className="mt-3 max-w-[60ch]" style={{ color: 'var(--text-muted)' }}>
            Razões calculadas (fórmula WCAG de luminância relativa). Mínimo AA para texto normal:
            4.5:1. Os preenchimentos de hover são translúcidos, então a razão é calculada sobre a
            cor resultante do blend, não sobre o hex "puro" do token.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {contrastPairs.map((p) => (
              <div key={p.label} className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--surface-2)' }}>
                <span className="text-sm" style={{ color: 'var(--text-body)' }}>{p.label}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{p.ratio} ✓</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
