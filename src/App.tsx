import { lazy, Suspense, useEffect, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import TituloDaRota from './components/TituloDaRota'
import Home from './pages/Home'

// Cada case é um arquivo JS à parte: quem abre a Home não baixa o código
// dos cases. A Home continua no pacote principal.
const carregar = {
  gabriel: () => import('./pages/CaseGabriel'),
  sona: () => import('./pages/CaseSona'),
  uxai: () => import('./pages/CaseUxAi'),
  ds: () => import('./pages/DesignSystemShowcase'),
}
const CaseGabriel = lazy(carregar.gabriel)
const CaseSona = lazy(carregar.sona)
const CaseUxAi = lazy(carregar.uxai)
const DesignSystemShowcase = lazy(carregar.ds)

const CLARO = '#FFFFFF'
const ESCURO = '#050B0E' // --fundo-pagina do case SYSMED

/** Enquanto o arquivo do case chega: a tela fica na cor de fundo do próprio
 *  case, sem piscar o fundo escuro do body. */
function Case({ fundo, children }: { fundo: string; children: ReactNode }) {
  return <Suspense fallback={<div className="min-h-screen" style={{ background: fundo }} />}>{children}</Suspense>
}

/** Depois que a página termina de carregar e o navegador fica livre, baixa
 *  os três cases em segundo plano: o clique no card abre sem espera. */
function PreCarregarCases() {
  useEffect(() => {
    const agendar = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2000))
    const cancelar = window.cancelIdleCallback ?? window.clearTimeout
    const id = agendar(() => {
      carregar.sona()
      carregar.gabriel()
      carregar.uxai()
    })
    return () => cancelar(id)
  }, [])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <TituloDaRota />
      <PreCarregarCases />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/gabriel" element={<Case fundo={CLARO}><CaseGabriel /></Case>} />
        <Route path="/case/sona" element={<Case fundo={CLARO}><CaseSona /></Case>} />
        {/* Case SYSMED novo (case UX + IA) no lugar de CaseSysmed.tsx desde
            25 set 2026. O arquivo antigo fica no repositório, fora das rotas. */}
        <Route path="/case/ia-hospitalar" element={<Case fundo={ESCURO}><CaseUxAi /></Case>} />
        <Route path="/case/sysmed" element={<Case fundo={ESCURO}><CaseUxAi /></Case>} />
        <Route path="/design-system" element={<Case fundo={CLARO}><DesignSystemShowcase /></Case>} />
        {/* Endereço de revisão, mantido para links antigos. */}
        <Route path="/dev/case-ux-ai" element={<Case fundo={ESCURO}><CaseUxAi /></Case>} />
      </Routes>
    </BrowserRouter>
  )
}
