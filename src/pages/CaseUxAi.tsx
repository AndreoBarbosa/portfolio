import '../styles/case-ux-ai-tokens.css'
import { CaseUxAiMotionProvider } from '../motion/CaseUxAiMotionProvider'
import NavBar from '../components/case-ux-ai/layout/NavBar'
import S01Hero from '../sections/case-ux-ai/S01Hero'

/**
 * Blueprint IMPLEMENTATION BLUEPRINT — CASE UX + AI. Construída seção por
 * seção (§24.1); ver o comentário de rota em App.tsx sobre quando isto
 * substitui CaseSysmed.tsx nas rotas reais.
 */
export default function CaseUxAi() {
  return (
    <CaseUxAiMotionProvider>
      <main className="case-uxai-root min-h-screen">
        <div className="grain-layer" />
        <NavBar />
        <S01Hero />
      </main>
    </CaseUxAiMotionProvider>
  )
}
