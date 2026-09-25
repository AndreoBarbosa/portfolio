import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Projetos', hash: 'projetos' },
  { label: 'Skills', hash: 'skills' },
  { label: 'Trajetória', hash: 'trajetoria' },
  { label: 'Sobre', hash: 'sobre' },
  { label: 'Contato', hash: 'contato' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMobileOpen(false)
  const navHref = (hash: string) => isHome ? `#${hash}` : `/#${hash}`

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b ${
        scrolled
          ? 'bg-[rgba(19,17,14,0.85)] border-cream/8'
          : 'bg-[rgba(19,17,14,0.4)] border-cream/5'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" aria-label="Andreo Barbosa — início">
          <img
            src="/logo/logo-ab-colorida.png"
            alt="AB — Andreo Barbosa"
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navItems.map((item) => (
            <li key={item.hash}>
              <a
                href={navHref(item.hash)}
                className="text-sm text-muted hover:text-cream transition-colors duration-200 tracking-wide"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-cream/70 hover:text-cream transition-colors p-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-ink/95 backdrop-blur-md border-b border-cream/5"
          >
            <ul className="px-6 py-4 flex flex-col gap-4" role="list">
              {navItems.map((item) => (
                <li key={item.hash}>
                  <a
                    href={navHref(item.hash)}
                    onClick={closeMenu}
                    className="block text-sm text-muted hover:text-cream transition-colors duration-200 py-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
