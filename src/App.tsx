import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import CaseGabriel from './pages/CaseGabriel'
import CaseSona from './pages/CaseSona'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/gabriel" element={<CaseGabriel />} />
        <Route path="/case/sona" element={<CaseSona />} />
      </Routes>
    </BrowserRouter>
  )
}
