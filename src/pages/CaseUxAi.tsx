import '../styles/case-ux-ai-tokens.css'
import usePageMeta from '../hooks/usePageMeta'
import { CaseUxAiMotionProvider } from '../motion/CaseUxAiMotionProvider'
import '../styles/liquid-glass.css'
import LiquidHeader from '../components/liquid/LiquidHeader'
import BriefingPill from '../components/case-ux-ai/layout/BriefingPill'
import S01Hero from '../sections/case-ux-ai/S01Hero'
import S02VisaoGeral from '../sections/case-ux-ai/S02VisaoGeral'
import S03Desafio from '../sections/case-ux-ai/S03Desafio'
import S05Experimento from '../sections/case-ux-ai/S05Experimento'
import S06Descoberta from '../sections/case-ux-ai/S06Descoberta'
import S07Matriz from '../sections/case-ux-ai/S07Matriz'
import S08Contexto from '../sections/case-ux-ai/S08Contexto'
import S09Divisao from '../sections/case-ux-ai/S09Divisao'
import { S12Implicacoes, S13Limites } from '../sections/case-ux-ai/S12Implicacoes'
import S14Fechamento from '../sections/case-ux-ai/S14Fechamento'

/**
 * Blueprint IMPLEMENTATION BLUEPRINT — CASE UX + AI. Construída seção por
 * seção (§24.1); ver o comentário de rota em App.tsx sobre quando isto
 * substitui CaseSysmed.tsx nas rotas reais.
 */
export default function CaseUxAi() {
  // Mesmos metadados da página antiga (CaseSysmed.tsx), que esta substitui
  // em /case/ia-hospitalar e /case/sysmed. Título sem travessão.
  usePageMeta({
    title: 'Case: Onde a IA erra ao avaliar sistemas hospitalares · Andreo Barbosa',
    description:
      'A IA identifica problemas. O contexto decide quais realmente importam. Comparei a análise de 89 problemas de usabilidade feita por especialistas com a classificação produzida por um modelo de linguagem.',
    ogImage: '/og/sysmed.png',
    canonical: 'https://andreobarbosa.com/case/ia-hospitalar',
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Onde a IA erra ao avaliar sistemas hospitalares',
      author: { '@type': 'Person', name: 'Andreo Barbosa' },
      about: ['UX Research', 'Healthcare UX', 'Artificial Intelligence'],
      datePublished: '2026-07-21',
    },
  })

  return (
    <CaseUxAiMotionProvider>
      <main className="case-uxai-root min-h-screen">
        <div className="grain-layer" />
        <LiquidHeader tema="escuro" activeSection={null} basePath="/" ctaLabel="Ver todos os projetos" ctaHref="/#projetos" ctaArrow />
        <S01Hero />
        <S02VisaoGeral />
        <S03Desafio />
        <S05Experimento />
        <S06Descoberta />
        <S07Matriz />
        <S08Contexto />
        <S09Divisao />
        <S12Implicacoes />
        <S13Limites />
        <S14Fechamento />
        {/* Persistente, fora das seções: acompanha a leitura de 05 a 08. */}
        <BriefingPill />
      </main>
    </CaseUxAiMotionProvider>
  )
}
