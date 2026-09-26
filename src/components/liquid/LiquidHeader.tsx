import { useState } from 'react'
import { useScrolled } from '../../hooks/useScrolled'

const defaultNavLinks = [
  { id: 'projetos', label: 'Projetos' },
  { id: 'trajetoria', label: 'Trajetória' },
  { id: 'sobre', label: 'Sobre' },
]

type Props = {
  activeSection: string | null
  navItems?: { id: string; label: string }[]
  /** Fora da Home (ex.: páginas de case), os links precisam apontar de
      volta pra Home antes da âncora ("/#projetos"), não só "#projetos"
      (que tentaria rolar dentro da própria página de case). Default ''
      preserva 100% o comportamento atual na Home. */
  basePath?: string
  /** D7 (correção 02): o CTA da navbar é "Contato" na Home, mas no case
      Gabriel o Figma pede "Ver todos os projetos" + seta, apontando de
      volta pro grid de projetos da Home. Prop em vez de hardcode pra não
      afetar a Home nem o Sona — só o Gabriel passa override. Default
      preserva 100% o comportamento atual. */
  ctaLabel?: string
  ctaHref?: string
  ctaArrow?: boolean
  /** Case SYSMED (Figma 1138:1138): mesma nav sobre fundo escuro. Só
      troca logo, cor, borda e vidro (CSS .liquid-header--escuro).
      Default 'claro' preserva a Home, o Sona e o Gabriel. */
  tema?: 'claro' | 'escuro'
}

// logo-mark*: viewBox recortado no monograma, pra ele ocupar os 38×24
// inteiros (Figma 290:281 e 1138:1141).
const logoSrc = {
  claro: '/logo/svg/logo-mark.svg',
  escuro: '/logo/svg/logo-mark-dark.svg',
}
const contatoColor = '#0C1A22'

export default function LiquidHeader({
  activeSection, navItems = defaultNavLinks, basePath = '',
  ctaLabel = 'Contato', ctaHref, ctaArrow = false, tema = 'claro',
}: Props) {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const mobileNavItems = [...navItems, { id: 'contato', label: 'Contato' }]

  return (
    <div className={`fixed top-4 md:top-7 left-4 right-4 md:left-12 md:right-12 z-40 ${tema === 'escuro' ? 'liquid-header--escuro' : ''}`}>
      {/* Refinamento §9: lâmina fina — grid de 3 colunas pra centralizar
          o menu de verdade (não compensar com margens), largura igual
          ao container das seções (max-w-6xl), não a viewport inteira. */}
      <nav
        className={`liquid-navbar rounded-glass-lg max-w-6xl mx-auto flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between md:justify-normal px-6 py-4 ${scrolled ? 'is-scrolled' : ''}`}
      >
        {/* Mobile: grupo esquerdo (logo + hamburger, gap pequeno) vira um
            único item flex; md:contents devolve os dois filhos direto pro
            grid de 3 colunas do desktop (o hamburger é md:hidden, então
            não consome coluna). */}
        <div className="flex items-center gap-3 md:contents">
          {/* E3 (correção 03): 38×24 real. logo-mark* já vem recortado
              em 38×24 (o logo-icon tinha viewBox 107×120, com margem, e o
              monograma saía com metade do tamanho). */}
          <a href={basePath || '#'} aria-label="Andreo Barbosa" className="flex items-center justify-self-start w-[38px] h-6">
            <img src={logoSrc[tema]} alt="Andreo Barbosa" width={38} height={24} className="w-full h-full" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="liquid-mobile-menu"
            className="liquid-mobile-menu-btn md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full shrink-0"
          >
            <span className={`liquid-hamburger ${menuOpen ? 'is-open' : ''}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
        <ul className="hidden md:flex items-center gap-6 justify-self-center" role="list">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`${basePath}#${item.id}`}
                className={`liquid-type-nav-link liquid-nav-link ${activeSection === item.id ? 'is-active' : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 justify-self-end">
          <a
            href={ctaHref ?? `${basePath}#contato`}
            className="inline-flex items-center gap-2 liquid-navbar-cta liquid-type-nav justify-center px-4 py-3 rounded-full"
            style={tema === 'claro' ? { color: contatoColor } : undefined}
          >
            {ctaLabel}
            {ctaArrow && <span aria-hidden="true">→</span>}
          </a>
        </div>
      </nav>

      {/* Menu mobile — lâmina de vidro que abre logo abaixo da navbar,
          mesmo max-w-6xl pra alinhar as bordas. Só existe < md. */}
      <div
        id="liquid-mobile-menu"
        className={`liquid-mobile-menu md:hidden max-w-6xl mx-auto rounded-glass-lg ${menuOpen ? 'is-open' : ''}`}
      >
        <ul role="list" className="flex flex-col px-6 py-2">
          {mobileNavItems.map((item) => (
            <li key={item.id}>
              <a
                href={`${basePath}#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className={`liquid-type-nav-link liquid-nav-link liquid-mobile-nav-link ${activeSection === item.id ? 'is-active' : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
