import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import '../styles/liquid-glass.css'
import { useActiveSection } from '../hooks/useActiveSection'
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

  // Scroll suave (Lenis) — nunca trava o scroll nativo, e nem inicializa
  // com reduced-motion (o usuário pediu para não ter esse tipo de efeito).
  useEffect(() => {
    if (shouldReduceMotion) return

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
