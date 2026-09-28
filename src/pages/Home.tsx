import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import '../styles/liquid-glass.css'
import { useActiveSection } from '../hooks/useActiveSection'
import usePageMeta from '../hooks/usePageMeta'
import LiquidHeader from '../components/liquid/LiquidHeader'
import LiquidHero from '../components/liquid/LiquidHero'
import LiquidFooter from '../components/liquid/LiquidFooter'
import ThesisSection from '../components/home/ThesisSection'
import ProjectsGrid from '../components/home/ProjectsGrid'
import TrajectorySkills from '../components/home/TrajectorySkills'
import AboutSection from '../components/home/AboutSection'
import ContactSection from '../components/home/ContactSection'

const NAV_SECTIONS = ['projetos', 'trajetoria', 'sobre']

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null)
  const activeSection = useActiveSection(NAV_SECTIONS)
  const shouldReduceMotion = useReducedMotion()

  // Mesmo título e mesma descrição que já estão no index.html: nada muda na
  // página. A Home passa pelo hook para o page_view do GA4 sair do mesmo
  // lugar que o dos cases, logo depois do título.
  usePageMeta({
    title: 'Andreo Barbosa · Product/UX Designer',
    description:
      'Andreo Barbosa — Product/UX Designer com raiz técnica e 5+ anos vivendo a dor real do usuário em saúde digital.',
  })

  // Scroll suave (Lenis) — nunca trava o scroll nativo, e nem inicializa
  // com reduced-motion (o usuário pediu para não ter esse tipo de efeito).
  useEffect(() => {
    if (shouldReduceMotion) return

    // index.css declara `html { scroll-behavior: smooth }`. Enquanto o Lenis
    // é dono do scroll, os dois disputam a mesma posição: o navegador anima
    // por conta própria e o Lenis corrige de volta a cada frame, o que
    // aparece como tranco em âncora e em scrollTo. O Lenis precisa de
    // scroll-behavior auto. Restaurado no cleanup para as rotas de case, que
    // não instanciam Lenis e continuam usando o smooth nativo.
    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let frameId: number
    function raf(time: number) {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    // I3 (correção 12): "Ver todos os projetos" do Sona/Gabriel é um <a>
    // comum (não <Link>) — sair de /case/* pra cá com hash na URL é
    // navegação de página cheia, a Home monta do zero. O ScrollToTop
    // (App.tsx) já tenta um scrollIntoView nativo pro alvo, mas o Lenis
    // "dono" do scroll a partir daqui rejeita: a cada frame ele força o
    // scrollTop de volta pro próprio targetScroll (0, se nada chamou
    // lenis.scrollTo), desfazendo o salto nativo pouco depois. Só
    // lenis.scrollTo atualiza esse alvo interno de verdade.
    if (window.location.hash) {
      const target = document.getElementById(window.location.hash.slice(1))
      if (target) lenis.scrollTo(target, { immediate: true })
    }

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
      root.style.scrollBehavior = previousScrollBehavior
    }
  }, [shouldReduceMotion])

  return (
    <div ref={rootRef} className="liquid-root min-h-screen">
      <LiquidHeader activeSection={activeSection} />
      <LiquidHero />
      <ThesisSection />
      <ProjectsGrid />
      <TrajectorySkills />
      <AboutSection />
      <ContactSection />
      <LiquidFooter />
    </div>
  )
}
