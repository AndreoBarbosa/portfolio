import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import CaseGabriel from './pages/CaseGabriel'
import CaseSona from './pages/CaseSona'
import DesignSystemShowcase from './pages/DesignSystemShowcase'
import CaseUxAi from './pages/CaseUxAi'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/gabriel" element={<CaseGabriel />} />
        <Route path="/case/sona" element={<CaseSona />} />
        {/* Case SYSMED novo (case UX + IA) no lugar de CaseSysmed.tsx desde
            25 set 2026. O arquivo antigo fica no repositório, fora das rotas. */}
        <Route path="/case/ia-hospitalar" element={<CaseUxAi />} />
        <Route path="/case/sysmed" element={<CaseUxAi />} />
        <Route path="/design-system" element={<DesignSystemShowcase />} />
        {/* Endereço de revisão, mantido para links antigos. */}
        <Route path="/dev/case-ux-ai" element={<CaseUxAi />} />
      </Routes>
    </BrowserRouter>
  )
}
