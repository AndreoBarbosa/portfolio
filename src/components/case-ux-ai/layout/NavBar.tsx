import { ArrowUpRight } from 'lucide-react'
import Container from './Container'
import { nav } from '../../../data/caseUxAi'

/**
 * Blueprint §8, nó 802:1033. Estático por enquanto — o vidro médio ao
 * rolar e o esconder/mostrar por direção de scroll são MI-04, fase de
 * motion (§24.1 passo 4), não a construção estática.
 *
 * No Figma o nav é filho do frame Hero, em y0, por cima do vídeo
 * (docs/BRIEF-S01-HERO.md §10 item 5): sobrepõe, não empurra. O header
 * continua sticky, mas com altura 0 — não ocupa espaço no fluxo e o
 * conteúdo transborda por cima do que estiver embaixo. Quem reserva o
 * espaço do nav é o próprio hero (y142 do chip em case-xl, padding-top
 * abaixo disso).
 */
export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 h-0">
      <Container className="flex items-center justify-between py-6">
        <a href="/" className="f-display font-semibold text-[20px] text-[var(--texto-principal)]" aria-label="Andreo Barbosa">
          {nav.logo}
        </a>

        <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-8">
          {nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[14px] text-[var(--texto-apoio)] hover:text-[var(--texto-principal)] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={nav.cta.href}
          className="inline-flex items-center gap-1.5 rounded-[var(--r-pill)] border border-[var(--borda-padrao)] px-4 py-2 text-[14px] text-[var(--texto-apoio)] hover:text-[var(--texto-principal)] hover:border-[var(--borda-vidro)] transition-colors duration-200"
        >
          {nav.cta.label}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </Container>
    </header>
  )
}
