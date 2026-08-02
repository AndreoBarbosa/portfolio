import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import CaseGabriel from './pages/CaseGabriel'
import CaseSona from './pages/CaseSona'
import CaseSysmed from './pages/CaseSysmed'
import DesignSystemShowcase from './pages/DesignSystemShowcase'

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
      </Routes>
    </BrowserRouter>
  )
}
