import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import CaseGabriel from './pages/CaseGabriel'
import CaseSona from './pages/CaseSona'
import CaseSysmed from './pages/CaseSysmed'
import DesignSystemShowcase from './pages/DesignSystemShowcase'
import CaseUxAiFoundations from './pages/CaseUxAiFoundations'
import CaseUxAi from './pages/CaseUxAi'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/gabriel" element={<CaseGabriel />} />
        <Route path="/case/sona" element={<CaseSona />} />
        <Route path="/case/ia-hospitalar" element={<CaseSysmed />} />
        <Route path="/case/sysmed" element={<CaseSysmed />} />
        <Route path="/design-system" element={<DesignSystemShowcase />} />
        {/* Temporário — checkpoint da FASE 01 do blueprint case-ux-ai (tokens
            e receitas de motion). Remover quando a página real substituir
            CaseSysmed nas rotas /case/sysmed e /case/ia-hospitalar. */}
        <Route path="/dev/case-ux-ai-foundations" element={<CaseUxAiFoundations />} />
        <Route path="/dev/case-ux-ai" element={<CaseUxAi />} />
      </Routes>
    </BrowserRouter>
  )
}
