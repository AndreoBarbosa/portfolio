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
